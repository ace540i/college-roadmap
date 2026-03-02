import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const displayName = user?.name ?? user?.username ?? 'User';
  const email = user?.username ?? '';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="topbar" ref={ref}>
      <button className="topbar-avatar-btn" onClick={() => setOpen(!open)}>
        <span className="topbar-initials">{initials}</span>
        <span className="topbar-name">{displayName}</span>
        <span className="topbar-caret">▾</span>
      </button>

      {open && (
        <div className="topbar-dropdown">
          <div className="topbar-dropdown-header">
            <span className="topbar-dropdown-name">{displayName}</span>
            <span className="topbar-dropdown-email">{email}</span>
          </div>
          <hr className="topbar-dropdown-divider" />
          <button className="topbar-dropdown-item" onClick={() => { setOpen(false); logout(); }}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
