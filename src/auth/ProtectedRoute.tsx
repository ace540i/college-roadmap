import React, { ReactNode, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const IDLE_TIMEOUT_MS = 15 * 60 * 1000;
const IDLE_EVENTS = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'] as const;

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const logoutRef = useRef(logout);
  useEffect(() => { logoutRef.current = logout; }, [logout]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => logoutRef.current(), IDLE_TIMEOUT_MS);
    };
    IDLE_EVENTS.forEach(e => window.addEventListener(e, reset, true));
    reset();
    return () => {
      clearTimeout(timer);
      IDLE_EVENTS.forEach(e => window.removeEventListener(e, reset, true));
    };
  }, [isAuthenticated]);

  if (isLoading) {
    return <div className="auth-loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
