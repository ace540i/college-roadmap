import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Open on desktop, collapsed on mobile
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="app-shell">
      {/* Horizontal top nav */}
      <NavBar />

      <div className={`app-layout ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-open'}`}>
        {/* Fixed Toggle Button (visible when sidebar is collapsed) */}
        {sidebarCollapsed && (
          <button
            className="sidebar-toggle-fixed"
            onClick={toggleSidebarCollapse}
            title="Show Sidebar"
          >
            <span className="hamburger-icon">☰</span>
          </button>
        )}

        {/* Sidebar Overlay (for mobile) */}
        {!sidebarCollapsed && (
          <div className="sidebar-overlay" onClick={toggleSidebarCollapse}></div>
        )}

        {/* Sidebar */}
        {!sidebarCollapsed && (
          <Sidebar
            collapsed={false}
            onToggle={toggleSidebarCollapse}
          />
        )}

        {/* Main Content */}
        <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <main className="main-inner">
            {children}
          </main>
          <TopBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
