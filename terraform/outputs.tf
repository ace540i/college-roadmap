output "resource_group_name" {
  description = "Name of the provisioned resource group."
  value       = azurerm_resource_group.main.name
}

output "app_service_plan_name" {
  description = "Name of the App Service Plan."
  value       = azurerm_service_plan.main.name
}

output "app_service_name" {
  description = "Name of the App Service."
  value       = azurerm_linux_web_app.main.name
}

output "app_service_url" {
  description = "Default HTTPS URL of the App Service."
  value       = "https://${azurerm_linux_web_app.main.default_hostname}"
}

output "app_service_id" {
  description = "Full Azure resource ID of the App Service (useful for RBAC assignments)."
  value       = azurerm_linux_web_app.main.id
}
