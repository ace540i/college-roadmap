import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Show sidebar by default on desktop, check screen size
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    const isDesktop = window.innerWidth > 768;
    
    // On desktop, default to showing sidebar unless explicitly collapsed
    // On mobile, default to collapsed unless explicitly opened
    setSidebarCollapsed(isDesktop ? savedCollapsed : true);
  }, []);

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
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

      {/* Sidebar - conditionally rendered */}
      {!sidebarCollapsed && (
        <Sidebar 
          collapsed={false}
          onToggle={toggleSidebarCollapse}
        />
      )}

      {/* Main Content */}
      <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
