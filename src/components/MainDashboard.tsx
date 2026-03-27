import React from 'react';

interface MainDashboardProps {
  activeTab: string;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ activeTab }) => {
  return (
    <div className="main-content" style={{ flex: 1, padding: '2rem', marginLeft: '260px' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{activeTab}</h1>
      </header>
      <div className="content-body">
        <p>Loading {activeTab} module data...</p>
      </div>
    </div>
  );
};

export default MainDashboard;
