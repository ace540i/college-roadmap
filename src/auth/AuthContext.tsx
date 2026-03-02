import React, { createContext, useContext, ReactNode } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { AccountInfo, InteractionStatus } from '@azure/msal-browser';
import { msalInstance, loginRequest } from './msalConfig';

interface AuthContextValue {
  user: AccountInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = inProgress !== InteractionStatus.None;
  const user = accounts[0] ?? null;

  const login = async () => {
    await msalInstance.loginRedirect(loginRequest);
  };

  const logout = () => {
    msalInstance.logoutRedirect({ account: user });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
