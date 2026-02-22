terraform {
  required_version = ">= 1.5"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
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

# Unique suffix so App Service names don't collide across Azure tenants.
resource "random_integer" "suffix" {
  min = 1000
  max = 9999
}

locals {
  name_suffix = random_integer.suffix.result
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
  name                = "app-${var.app_name}-${local.name_suffix}-${var.environment}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.main.id
  https_only          = true

  site_config {
    # always_on is not supported on the Free (F1) tier
    always_on = var.sku_name != "F1"
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

    # Run the app directly from the deployed zip package (faster cold starts).
    WEBSITE_RUN_FROM_PACKAGE = "1"

    # Disable Oryx build on deployment — we ship a pre-built artifact.
    SCM_DO_BUILD_DURING_DEPLOYMENT = "false"

    # Disable persistent storage (stateless 12-factor app).
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = "false"
  }

  tags = local.common_tags
}
