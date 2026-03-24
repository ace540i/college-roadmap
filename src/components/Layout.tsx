import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const MOBILE_BREAKPOINT = 768;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  return (
    <div className="app-shell">
      <NavBar />

      <div className={`app-layout ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-open'}`}>
        {/* Desktop-only: floating toggle when sidebar is closed */}
        {!isMobile && sidebarCollapsed && (
          <button className="sidebar-toggle-fixed" onClick={toggleSidebar} title="Show Sidebar">
            <span className="hamburger-icon">☰</span>
          </button>
        )}

        {/* Overlay (desktop + tablet when sidebar open) */}
        {!isMobile && !sidebarCollapsed && (
          <div className="sidebar-overlay" onClick={toggleSidebar} />
        )}

        {/* Sidebar — desktop only */}
        {!isMobile && !sidebarCollapsed && (
          <Sidebar collapsed={false} onToggle={toggleSidebar} />
        )}

        <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <main className="main-inner">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
