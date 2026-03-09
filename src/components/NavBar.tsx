import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SubItem {
  label: string;
  description: string;
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
      {
        label: 'College Search',
        description: 'Search and filter 6,000+ colleges',
        link: 'https://collegescorecard.ed.gov/search/',
        external: true,
      },
      {
        label: 'Compare Colleges',
        description: 'Side-by-side cost, outcomes & more',
        link: 'https://collegescorecard.ed.gov/compare/',
        external: true,
      },
      {
        label: 'College Rankings',
        description: 'Top schools ranked by category',
        link: 'https://www.usnews.com/best-colleges',
        external: true,
      },
    ],
  },
  {
    label: 'Explore Careers',
    items: [
      {
        label: 'Career Search',
        description: 'Browse occupations by keyword or interest',
        link: 'https://www.mynextmove.org/',
        external: true,
      },
      {
        label: 'Career Outlook',
        description: 'Job growth, salary & hiring data by occupation',
        link: 'https://www.bls.gov/ooh/',
        external: true,
      },
      {
        label: 'Career Interest Quiz',
        description: 'Discover careers that fit your interests',
        link: 'https://www.mynextmove.org/explore/ip',
        external: true,
      },
    ],
  },
  {
    label: 'Plan for College',
    items: [
      {
        label: 'My Milestones',
        description: 'Track your grade-by-grade progress',
        link: '/dashboard',
      },
      {
        label: 'Timeline',
        description: 'Your full college prep roadmap',
        link: '/timeline',
      },
      {
        label: 'SAT Practice',
        description: 'Free official SAT prep with Khan Academy',
        link: 'https://www.khanacademy.org/digital-sat',
        external: true,
      },
      {
        label: 'Application Tracker',
        description: 'Monitor your college applications',
        link: '/application-tracker',
      },
    ],
  },
  {
    label: 'Pay for College',
    items: [
      {
        label: 'Financial Aid Estimator',
        description: 'Estimate your federal student aid eligibility',
        link: 'https://studentaid.gov/aid-estimator/',
        external: true,
      },
      {
        label: 'Net Price Calculator',
        description: 'See what college will actually cost you',
        link: 'https://collegescorecard.ed.gov/net-price/',
        external: true,
      },
      {
        label: 'Scholarship Search',
        description: 'Find scholarships you qualify for',
        link: 'https://bigfuture.collegeboard.org/scholarship-search',
        external: true,
      },
    ],
  },
];

const NavBar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggle = (label: string) => {
    setOpenMenu(prev => (prev === label ? null : label));
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-inner">
        {navItems.map(item => (
          <div key={item.label} className="navbar-menu">
            <button
              className={`navbar-menu-btn ${openMenu === item.label ? 'active' : ''}`}
              onClick={() => toggle(item.label)}
              aria-expanded={openMenu === item.label}
            >
              {item.label}
              <span className="navbar-caret">▾</span>
            </button>

            {openMenu === item.label && (
              <div className="navbar-dropdown">
                {item.items.map(sub =>
                  sub.external ? (
                    <a
                      key={sub.link}
                      href={sub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="navbar-dropdown-item"
                    >
                      <div className="navbar-dropdown-item-header">
                        <span className="navbar-dropdown-label">{sub.label}</span>
                        <span className="navbar-dropdown-ext">↗</span>
                      </div>
                      <span className="navbar-dropdown-desc">{sub.description}</span>
                    </a>
                  ) : (
                    <Link key={sub.link} to={sub.link} className="navbar-dropdown-item">
                      <div className="navbar-dropdown-item-header">
                        <span className="navbar-dropdown-label">{sub.label}</span>
                      </div>
                      <span className="navbar-dropdown-desc">{sub.description}</span>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
