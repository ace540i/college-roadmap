import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const domain = process.env.REACT_APP_ENTRA_DOMAIN ?? '';
const apiBase = process.env.REACT_APP_API_BASE_URL ?? '';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!displayName.trim() || !username.trim() || !password) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName, username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? 'Registration failed. Please try again.');
        return;
      }

      navigate('/login?registered=true');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🎓</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join College Roadmap today</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Jane Smith"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="auth-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="janesmith"
              value={username}
              onChange={e => setUsername(e.target.value.toLowerCase().replace(/[@\s]/g, ''))}
              autoComplete="username"
            />
            <small>Your login email will be <strong>{username || 'username'}@{domain}</strong></small>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="auth-btn-primary" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider">
          <span>Already have an account?</span>
        </div>
        <Link to="/login" className="auth-link-btn">Sign in</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
