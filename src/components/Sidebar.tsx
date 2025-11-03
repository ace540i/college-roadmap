import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  items?: SubMenuItem[];
  link?: string;
}

interface SubMenuItem {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('expandedMenus');
    return saved ? new Set(JSON.parse(saved)) : new Set(['grade-levels']);
  });
  const location = useLocation();

  // Persist expanded menus to localStorage
  useEffect(() => {
    localStorage.setItem('expandedMenus', JSON.stringify(Array.from(expandedMenus)));
  }, [expandedMenus]);

  const menuItems: MenuItem[] = [
    {
      id: 'academic-planning',
      title: 'Academic Planning',
      icon: '📚',
      items: [
        {
          id: 'course-selection',
          title: 'Course Selection',
          description: 'Choose classes aligned with your goals',
          link: '/course-selection'
        },
        {
          id: 'degree-requirements',
          title: 'Degree Requirements',
          description: 'Track graduation prerequisites',
          link: '/degree-requirements'
        },
        {
          id: 'schedule-planning',
          title: 'Schedule Planning',
          description: 'Optimize your class schedule',
          link: '/schedule-planning'
        }
      ]
    },
    {
      id: 'grade-levels',
      title: 'Grade Levels',
      icon: '🎓',
      items: [
        {
          id: 'grade-9',
          title: '9th Grade',
          description: 'Foundation Building',
          link: '/grade-9'
        },
        {
          id: 'grade-10',
          title: '10th Grade',
          description: 'Exploration & Growth',
          link: '/grade-10'
        },
        {
          id: 'grade-11',
          title: '11th Grade',
          description: 'Preparation Intensive',
          link: '/grade-11'
        },
        {
          id: 'grade-12',
          title: '12th Grade',
          description: 'Application & Decision',
          link: '/grade-12'
        }
      ]
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: '📖',
      items: [
        {
          id: 'timeline',
          title: 'Timeline',
          description: 'View your complete roadmap',
          link: '/timeline'
        },
        {
          id: 'study-materials',
          title: 'Study Materials',
          description: 'Access helpful resources',
          link: '/resources'
        },
        {
          id: 'college-search',
          title: 'College Search Tools',
          description: 'Find the right colleges for you',
          link: '/college-search'
        }
      ]
    },
    {
      id: 'quick-actions',
      title: 'Quick Actions',
      icon: '⚡',
      items: [
        {
          id: 'application-tracker',
          title: 'Application Tracker',
          description: 'Monitor application progress',
          link: '/application-tracker'
        },
        {
          id: 'test-prep',
          title: 'Test Prep',
          description: 'SAT/ACT preparation resources',
          link: '/test-prep'
        },
        {
          id: 'financial-aid',
          title: 'Financial Aid',
          description: 'Scholarships and FAFSA help',
          link: '/financial-aid'
        }
      ]
    }
  ];

  const toggleMenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const isActiveLink = (link: string) => {
    return location.pathname === link;
  };

  return (
    <>
      {/* Sidebar */}
      <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <button className="sidebar-hamburger" onClick={onToggle}>
            <span className="hamburger-icon">
              {collapsed ? '☰' : '✕'}
            </span>
          </button>
          <Link to="/" className="sidebar-logo">
            <span className="logo-icon">🎯</span>
            <span className="logo-text">College Roadmap</span>
          </Link>
        </div>

        <div className="sidebar-content">
          {/* Home Link */}
          <Link 
            to="/" 
            className={`sidebar-home-link ${isActiveLink('/') ? 'active' : ''}`}
            onClick={onToggle}
          >
            <span className="home-icon">🏠</span>
            <span>Home</span>
          </Link>

          {/* Menu Items */}
          <div className="menu-items">
            {menuItems.map((menu) => (
              <div key={menu.id} className="menu-item">
                <div 
                  className="menu-header" 
                  onClick={() => toggleMenu(menu.id)}
                >
                  <div className="menu-title">
                    <span className="menu-icon">{menu.icon}</span>
                    <span className="menu-text">{menu.title}</span>
                  </div>
                  <span className={`menu-arrow ${expandedMenus.has(menu.id) ? 'expanded' : ''}`}>
                    ▼
                  </span>
                </div>

                {/* Submenu */}
                <div className={`submenu ${expandedMenus.has(menu.id) ? 'expanded' : ''}`}>
                  {menu.items?.map((item) => (
                    <Link 
                      key={item.id}
                      to={item.link}
                      className={`submenu-item ${isActiveLink(item.link) ? 'active' : ''}`}
                      onClick={onToggle}
                    >
                      <div className="submenu-content">
                        <span className="submenu-title">{item.title}</span>
                        <span className="submenu-description">{item.description}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <span className="user-name">Student</span>
              <span className="user-status">High School</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
