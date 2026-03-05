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
# Runs a Node.js Express server (server/index.js) that:
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

    # Points to the Express server that serves both React and /api routes.
    # The working directory is /home/site/wwwroot after deployment.
    app_command_line = "node server/index.js"
  }

  app_settings = {
    # Tell Node.js it's in production so Express disables error stack traces, etc.
    NODE_ENV = var.environment == "prod" ? "production" : "development"

    # Disable Oryx build on deployment — we ship a pre-built artifact with node_modules.
    SCM_DO_BUILD_DURING_DEPLOYMENT = "false"

    # PostgreSQL connection string consumed by Prisma in the Express server.
    DATABASE_URL = "postgresql://${var.db_admin_username}:${var.db_admin_password}@${azurerm_postgresql_flexible_server.main.fqdn}:5432/${var.db_name}?sslmode=require"
  }

  tags = local.common_tags
}

# ---------------------------------------------------------------------------
# Azure Database for PostgreSQL Flexible Server
#
# Burstable B1ms (1 vCore, 2 GB RAM) — cheapest production-ready tier.
# ~$12–15/month. Upgrade sku_name to GP_Standard_D2s_v3 for more throughput.
# ---------------------------------------------------------------------------
resource "azurerm_postgresql_flexible_server" "main" {
  name                = "psql-${var.app_name}-${var.name_suffix}-${var.environment}"
  location            = var.db_location
  resource_group_name = azurerm_resource_group.main.name

  version                = "16"
  administrator_login    = var.db_admin_username
  administrator_password = var.db_admin_password

  storage_mb                   = 32768 # 32 GB minimum
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false

  sku_name = "B_Standard_B1ms"

  tags = local.common_tags
}

resource "azurerm_postgresql_flexible_server_database" "main" {
  name      = var.db_name
  server_id = azurerm_postgresql_flexible_server.main.id
  collation = "en_US.utf8"
  charset   = "utf8"
}

# Allow all Azure-hosted services (App Service) to reach the PostgreSQL server.
# The 0.0.0.0 → 0.0.0.0 rule is Azure's special flag for "Allow Azure services".
resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure_services" {
  name             = "allow-azure-services"
  server_id        = azurerm_postgresql_flexible_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}
