import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🎓</div>
        <h1 className="auth-title">College Roadmap</h1>
        <p className="auth-subtitle">Your personalized path to college success</p>

        <button
          className="auth-btn-microsoft"
          onClick={handleLogin}
          disabled={isLoading}
        >
          Sign in / Register
        </button>

        <p className="auth-hint">New users can create an account after clicking the button above.</p>
      </div>
    </div>
  );
};

export default LoginPage;
