terraform {
  required_version = ">= 1.5"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }

  # storage_account_name, container_name, and key are fixed here.
  # Only resource_group_name is supplied at init time via -backend-config
  # (set TF_BACKEND_RESOURCE_GROUP secret in GitHub Actions).
  backend "azurerm" {
    storage_account_name = "tfstatecollege1"
    container_name       = "college-cont-tfstate1"
    key                  = "pro-college.tfstate"
  }
}

provider "azurerm" {
  features {}
}

locals {
  common_tags = {
    project     = var.app_name
    environment = var.environment
    managed_by  = "terraform"
  }
}

# ---------------------------------------------------------------------------
# Resource Group
# ---------------------------------------------------------------------------
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
  tags     = local.common_tags
}

# ---------------------------------------------------------------------------
# App Service Plan (Linux)
# ---------------------------------------------------------------------------
resource "azurerm_service_plan" "main" {
  name                = "asp-${var.app_name}-${var.environment}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  os_type             = "Linux"
  sku_name            = var.sku_name
  tags                = local.common_tags
}

# ---------------------------------------------------------------------------
# App Service — Combined React + API
#
# Runs a Node.js Express server (ts-node server/index.ts) that:
#   • Serves the compiled React build from /build
#   • Handles /api/* routes for the backend
# ---------------------------------------------------------------------------
resource "azurerm_linux_web_app" "main" {
  name                = "app-${var.app_name}-${var.name_suffix}-${var.environment}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.main.id
  https_only          = true

  site_config {
    # always_on is not supported on the Free (F1) tier
    always_on     = var.sku_name != "F1"
    http2_enabled = true

    application_stack {
      node_version = var.node_version
    }

    # Runs the compiled Express server. dist/ and node_modules/ are at wwwroot root.
    app_command_line = "node dist/index.js"
  }

  app_settings = {
    # Tell Node.js it's in production so Express disables error stack traces, etc.
    NODE_ENV = var.environment == "prod" ? "production" : "development"

    # Disable Oryx build on deployment — we ship a pre-built artifact with node_modules.
    SCM_DO_BUILD_DURING_DEPLOYMENT = "false"

    # Cosmos DB (MongoDB API) connection string consumed by Mongoose/Prisma in the Express server.
    DATABASE_URL = "mongodb://${azurerm_cosmosdb_account.main.name}:${azurerm_cosmosdb_account.main.primary_key}@${azurerm_cosmosdb_account.main.name}.mongo.cosmos.azure.com:10255/${var.db_name}?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${azurerm_cosmosdb_account.main.name}@"
  }

  tags = local.common_tags
}

# ---------------------------------------------------------------------------
# Azure Cosmos DB — MongoDB API
#
# Free tier: 1,000 RU/s + 25 GB storage (one free tier account per subscription).
# No regional provisioning restrictions like Azure SQL Server.
# ---------------------------------------------------------------------------
resource "azurerm_cosmosdb_account" "main" {
  name                 = "cosmos-${var.app_name}-${var.name_suffix}-${var.environment}"
  location             = azurerm_resource_group.main.location
  resource_group_name  = azurerm_resource_group.main.name
  offer_type           = "Standard"
  kind                 = "MongoDB"
  mongo_server_version = "4.2"
  free_tier_enabled    = var.cosmosdb_free_tier

  # MongoDB API capability
  capabilities {
    name = "EnableMongo"
  }

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = azurerm_resource_group.main.location
    failover_priority = 0
  }

  tags = local.common_tags
}

resource "azurerm_cosmosdb_mongo_database" "main" {
  name                = var.db_name
  resource_group_name = azurerm_resource_group.main.name
  account_name        = azurerm_cosmosdb_account.main.name

  # Shared throughput at the database level — all containers share this pool.
  # 400 RU/s is well within the free tier's 1,000 RU/s allowance regardless
  # of how many collections Mongoose creates.
  throughput = 400
}
