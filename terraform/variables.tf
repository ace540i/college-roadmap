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
# app name suffix
variable "name_suffix" {
  description = "Fixed suffix appended to the App Service name to ensure global uniqueness. Change only if there is a name collision in Azure."
  type        = string
  default     = "cr1"
}

# ---------------------------------------------------------------------------
# Database variables
# ---------------------------------------------------------------------------
variable "db_admin_username" {
  description = "Administrator login for the PostgreSQL Flexible Server."
  type        = string
  default     = "pgadmin"
}

variable "db_admin_password" {
  description = "Administrator password for the PostgreSQL Flexible Server. Must be at least 8 characters with uppercase, lowercase, digits, and a special character. Supply via GitHub secret TF_VAR_db_admin_password."
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Name of the PostgreSQL database to create inside the server."
  type        = string
  default     = "collegeroadmap"
}
