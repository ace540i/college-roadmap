variable "app_name" {
  description = "Base name used to construct Azure resource names."
  type        = string
  default     = "college-roadmap"
}

variable "resource_group_name" {
  description = "Name of the resource group for all project resources (separate from the Terraform state RG)."
  type        = string
  default     = "college-rg1"
}

variable "location" {
  description = "Azure region for all resources."
  type        = string
  default     = "eastus"
}

variable "environment" {
  description = "Deployment environment. Passed in via the GitHub Actions workflow input."
  type        = string
  default     = "prod"

  validation {
    condition     = contains(["prod", "staging"], var.environment)
    error_message = "environment must be 'prod' or 'staging'."
  }
}

variable "sku_name" {
  description = <<-EOT
    App Service Plan SKU. Common values:
      F1   — Free (no custom domain TLS, no always-on)
      B1   — Basic (recommended minimum for production)
      P1v3 — Premium v3 (best price/performance for production)
  EOT
  type        = string
  default     = "B1"
}

variable "node_version" {
  description = "Node.js version string for the App Service runtime stack."
  type        = string
  default     = "20-lts"
}

variable "name_suffix" {
  description = "Fixed suffix appended to resource names to ensure global uniqueness. Change only if there is a name collision in Azure."
  type        = string
  default     = "cr1"
}

# ---------------------------------------------------------------------------
# Cosmos DB variables
# ---------------------------------------------------------------------------
variable "cosmosdb_free_tier" {
  description = "Enable the Cosmos DB free tier (1,000 RU/s + 25 GB free). Only one free tier account is allowed per subscription."
  type        = bool
  default     = true
}

variable "db_name" {
  description = "Name of the Cosmos DB (MongoDB) database to create inside the account."
  type        = string
  default     = "collegeroadmap"
}
