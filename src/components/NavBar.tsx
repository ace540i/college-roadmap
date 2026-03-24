import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface SubItem {
  label: string;
  description?: string;
  link: string;
  external?: boolean;
}

interface NavItem {
  label: string;
  items: SubItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Explore Colleges',
    items: [
      { label: 'College Search', description: 'Search and filter 6,000+ colleges', link: 'https://collegescorecard.ed.gov/search/', external: true },
      { label: 'Compare Colleges', description: 'Side-by-side cost, outcomes & more', link: 'https://collegescorecard.ed.gov/compare/', external: true },
      { label: 'College Rankings', description: 'Top schools ranked by category', link: 'https://www.usnews.com/best-colleges', external: true },
    ],
  },
  {
    label: 'Explore Careers',
    items: [
      { label: 'Career Search', description: 'Browse occupations by keyword or interest', link: 'https://www.mynextmove.org/', external: true },
      { label: 'Career Outlook', description: 'Job growth, salary & hiring data', link: 'https://www.bls.gov/ooh/', external: true },
      { label: 'Career Interest Quiz', description: 'Discover careers that fit your interests', link: 'https://www.mynextmove.org/explore/ip', external: true },
    ],
  },
  {
    label: 'Plan for College',
    items: [
      { label: 'My Milestones', description: 'Track your grade-by-grade progress', link: '/dashboard' },
      { label: 'Timeline', description: 'Your full college prep roadmap', link: '/timeline' },
      { label: 'SAT Practice', description: 'Free official SAT prep with Khan Academy', link: 'https://www.khanacademy.org/digital-sat', external: true },
      { label: 'Application Tracker', description: 'Monitor your college applications', link: '/application-tracker' },
    ],
  },
  {
    label: 'Pay for College',
    items: [
      { label: 'Financial Aid Estimator', description: 'Estimate your federal student aid', link: 'https://studentaid.gov/aid-estimator/', external: true },
      { label: 'Net Price Calculator', description: 'See what college will actually cost you', link: 'https://collegescorecard.ed.gov/net-price/', external: true },
      { label: 'Scholarship Search', description: 'Find scholarships you qualify for', link: 'https://bigfuture.collegeboard.org/scholarship-search', external: true },
    ],
  },
];

// Mobile-only nav items mirroring the sidebar
const mobileAppNav: NavItem = {
  label: 'My Roadmap',
  items: [
    { label: 'Home', link: '/' },
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'My Profile', link: '/profile' },
    { label: '9th Grade', link: '/grade-9' },
    { label: '10th Grade', link: '/grade-10' },
    { label: '11th Grade', link: '/grade-11' },
    { label: '12th Grade', link: '/grade-12' },
    { label: 'Timeline', link: '/timeline' },
    { label: 'Resources', link: '/resources' },
  ],
};

const NavBar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { user, logout } = useAuth();

  const displayName = user?.name ?? user?.username ?? 'User';
  const initials = displayName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setUserOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleMenu = (label: string) => {
    setOpenMenu(prev => (prev === label ? null : label));
  };

  const renderSubLink = (sub: SubItem) => {
    const content = (
      <>
        <span className="navbar-dropdown-label">
          {sub.label}
          {sub.external && <span className="navbar-dropdown-ext"> ↗</span>}
        </span>
        {sub.description && <span className="navbar-dropdown-desc">{sub.description}</span>}
      </>
    );
    return sub.external ? (
      <a key={sub.link} href={sub.link} target="_blank" rel="noopener noreferrer" className="navbar-dropdown-item">
        {content}
      </a>
    ) : (
      <Link key={sub.link} to={sub.link} className="navbar-dropdown-item">
        {content}
      </Link>
    );
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-inner">

        {/* Mobile hamburger — left */}
        <button
          className="navbar-hamburger"
          onClick={() => { setMobileOpen(prev => !prev); setUserOpen(false); }}
          aria-label="Toggle menu"
        >
          <span className="navbar-hamburger-icon">{mobileOpen ? '✕' : '☰'}</span>
        </button>

        {/* Desktop menu items */}
        <div className="navbar-menus">
          {navItems.map(item => (
            <div key={item.label} className="navbar-menu">
              <button
                className={`navbar-menu-btn ${openMenu === item.label ? 'active' : ''}`}
                onClick={() => toggleMenu(item.label)}
                aria-expanded={openMenu === item.label}
              >
                {item.label}
                <span className="navbar-caret">▾</span>
              </button>

              {openMenu === item.label && (
                <div className="navbar-dropdown">
                  {item.items.map(sub => renderSubLink(sub))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User account — right */}
        <div className="navbar-user">
          <button
            className="navbar-user-btn"
            onClick={() => { setUserOpen(prev => !prev); setMobileOpen(false); }}
          >
            <span className="navbar-user-initials">{initials}</span>
            <span className="navbar-user-name">{displayName}</span>
            <span className="navbar-caret">▾</span>
          </button>
          {userOpen && (
            <div className="navbar-user-dropdown">
              <div className="navbar-user-dropdown-header">
                <span className="navbar-user-dropdown-name">{displayName}</span>
                <span className="navbar-user-dropdown-email">{user?.username ?? ''}</span>
              </div>
              <hr className="navbar-user-dropdown-divider" />
              <Link to="/profile" className="navbar-user-dropdown-item">My Profile</Link>
              <button className="navbar-user-dropdown-item" onClick={logout}>Sign Out</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile slide-down panel */}
      {mobileOpen && (
        <div className="navbar-mobile-panel">
          {/* App navigation (mirrors sidebar) */}
          <div className="navbar-mobile-section">
            <button
              className="navbar-mobile-section-btn"
              onClick={() => toggleMenu(mobileAppNav.label)}
            >
              {mobileAppNav.label}
              <span className="navbar-caret">{openMenu === mobileAppNav.label ? '▴' : '▾'}</span>
            </button>
            {openMenu === mobileAppNav.label && (
              <div className="navbar-mobile-items">
                {mobileAppNav.items.map(sub => renderSubLink(sub))}
              </div>
            )}
          </div>

          {/* Main nav menus */}
          {navItems.map(item => (
            <div key={item.label} className="navbar-mobile-section">
              <button
                className="navbar-mobile-section-btn"
                onClick={() => toggleMenu(item.label)}
              >
                {item.label}
                <span className="navbar-caret">{openMenu === item.label ? '▴' : '▾'}</span>
              </button>
              {openMenu === item.label && (
                <div className="navbar-mobile-items">
                  {item.items.map(sub => renderSubLink(sub))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
