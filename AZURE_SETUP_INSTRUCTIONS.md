# Azure App Registration & Secrets Setup Instructions

Follow these steps to create an Azure App Registration, generate credentials, and prepare your GitHub Actions secrets for deployment.

---

## 1. Install Azure CLI

- Go to: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
- Follow instructions for your OS (macOS, Windows, Linux)
- After installation, verify with:
  ```sh
  az --version
  ```

## 2. Login to Azure

```sh
az login
```

## 3. Set Variables (Edit These)

Replace the values in quotes with your own:
```sh
APP_NAME="college-roadmap-app"           # Name for your app registration
SUBSCRIPTION_ID="your-subscription-id"   # Your Azure Subscription ID
```

## 4. Create the App Registration

```sh
az ad app create --display-name "$APP_NAME"
```

## 5. Get the Application (client) ID

```sh
APP_ID=$(az ad app list --display-name "$APP_NAME" --query "[0].appId" -o tsv)
echo "ARM_CLIENT_ID=$APP_ID"
```

## 6. Create a Service Principal for the App

```sh
az ad sp create --id "$APP_ID"
```

## 7. Create a Client Secret

```sh
CLIENT_SECRET=$(az ad app credential reset --id "$APP_ID" --append --query "password" -o tsv)
echo "ARM_CLIENT_SECRET=$CLIENT_SECRET"
```

## 8. Assign a Role to the Service Principal

```sh
az role assignment create --assignee "$APP_ID" --role "Contributor" --subscription "$SUBSCRIPTION_ID"
```

## 9. Get Tenant ID

```sh
TENANT_ID=$(az account show --query tenantId -o tsv)
echo "ARM_TENANT_ID=$TENANT_ID"
```

## 10. Output All Secrets for GitHub

```sh
echo "ARM_CLIENT_ID=$APP_ID"
echo "ARM_CLIENT_SECRET=$CLIENT_SECRET"
echo "ARM_TENANT_ID=$TENANT_ID"
echo "ARM_SUBSCRIPTION_ID=$SUBSCRIPTION_ID"
```

Copy these values and add them as GitHub Actions secrets in your repository settings.

---

**Note:** If you need B2C or web app secrets, see previous instructions for those values.
