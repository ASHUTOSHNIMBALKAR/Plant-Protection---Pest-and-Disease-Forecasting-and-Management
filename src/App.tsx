import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="app-container" style={{ display: 'flex' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainDashboard activeTab={activeTab} />
    </div>
  )
}

export default App;
