import { PublicClientApplication, Configuration } from '@azure/msal-browser';

const b2cTenant = process.env.REACT_APP_B2C_TENANT_NAME!;   // collegeroadmap.onmicrosoft.com
const b2cTenantShort = b2cTenant.split('.')[0];              // collegeroadmap

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_B2C_CLIENT_ID!,
    authority: `https://${b2cTenantShort}.ciamlogin.com/`,
    knownAuthorities: [`${b2cTenantShort}.ciamlogin.com`],
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ['openid', 'profile'],
};
