import React from 'react';
import { ShieldAlert, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar glass" style={{ width: '260px', height: '100vh', padding: '2rem 1rem' }}>
      <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem' }}>
        <div style={{ background: 'var(--accent-green)', padding: '8px', borderRadius: '8px' }}>
          <ShieldAlert color="white" size={24} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Pestra <span style={{ color: 'var(--accent-green)' }}>AI</span></h2>
      </div>
    </div>
  );
};

export default Sidebar;
