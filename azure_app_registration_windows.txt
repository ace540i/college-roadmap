@echo off
REM Azure App Registration & Secrets Setup Script (Windows)
REM Prerequisite: Azure CLI must be installed and 'az login' must be completed

REM === EDIT THESE VARIABLES ===
set APP_NAME=college-roadmap-app
set SUBSCRIPTION_ID=your-subscription-id

REM === Create the App Registration ===
echo Creating app registration: %APP_NAME%
az ad app create --display-name "%APP_NAME%"

REM === Get the Application (client) ID ===
for /f "delims=" %%A in ('az ad app list --display-name "%APP_NAME%" --query "[0].appId" -o tsv') do set APP_ID=%%A
echo ARM_CLIENT_ID=%APP_ID%

REM === Create a Service Principal for the App ===
echo Creating service principal for app...
az ad sp create --id "%APP_ID%"

REM === Create a Client Secret ===
for /f "delims=" %%A in ('az ad app credential reset --id "%APP_ID%" --append --query "password" -o tsv') do set CLIENT_SECRET=%%A
echo ARM_CLIENT_SECRET=%CLIENT_SECRET%

REM === Assign a Role to the Service Principal ===
echo Assigning Contributor role to service principal...
az role assignment create --assignee "%APP_ID%" --role "Contributor" --subscription "%SUBSCRIPTION_ID%"

REM === Get Tenant ID ===
for /f "delims=" %%A in ('az account show --query tenantId -o tsv') do set TENANT_ID=%%A
echo ARM_TENANT_ID=%TENANT_ID%

echo.
echo ====== GitHub Actions Secrets Output ======
echo ARM_CLIENT_ID=%APP_ID%
echo ARM_CLIENT_SECRET=%CLIENT_SECRET%
echo ARM_TENANT_ID=%TENANT_ID%
echo ARM_SUBSCRIPTION_ID=%SUBSCRIPTION_ID%
echo ===========================================
echo.
echo Copy these values into your GitHub repository secrets.

pause
