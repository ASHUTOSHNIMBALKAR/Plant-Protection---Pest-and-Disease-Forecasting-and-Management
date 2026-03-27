import React from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Map, 
  Settings, 
  HelpCircle, 
  Activity, 
  Database,
  Crosshair,
  Zap,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { icon: <ShieldAlert size={20} />, label: 'Edge Vision' },
    { icon: <Activity size={20} />, label: 'Forecasting' },
    { icon: <Zap size={20} />, label: 'Impact Hub' },
    { icon: <Map size={20} />, label: 'Risk GIS' },
    { icon: <Database size={20} />, label: 'Surveillance' },
    { icon: <Crosshair size={20} />, label: 'Drones' },
  ];

  return (
    <div className="sidebar glass" style={{
      width: '260px',
      height: '100vh',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
    }}>
      <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem' }}>
        <div style={{ background: 'var(--accent-green)', padding: '8px', borderRadius: '8px' }}>
          <ShieldAlert color="white" size={24} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Pestra <span style={{ color: 'var(--accent-green)' }}>AI</span></h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item, idx) => {
          const isActive = activeTab === item.label;
          return (
            <div 
              key={idx} 
              className={`nav-item ${isActive ? 'nav-active' : ''}`} 
              onClick={() => setActiveTab(item.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid transparent',
              }}
            >
              {item.icon}
              <span style={{ fontWeight: 500 }}>{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div className="nav-item" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
        }}>
          <Settings size={20} />
          <span>Settings</span>
        </div>
        <div className="nav-item" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
        }}>
          <HelpCircle size={20} />
          <span>Support</span>
        </div>
        
        <div className="user-profile card" style={{
          marginTop: '1rem',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent-blue)' }}></div>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Agri-Admin</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Region: Pune North</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

