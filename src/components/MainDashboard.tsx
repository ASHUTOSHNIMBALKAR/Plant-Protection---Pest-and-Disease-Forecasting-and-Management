import React, { useState } from 'react';
import { 
  Thermometer, 
  Droplets, 
  ShieldCheck, 
  ShieldAlert,
  Zap, 
  MapPin, 
  Map as MapIcon,
  Bug,
  Activity,
  TrendingUp, 
  Monitor,
  Eye,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { 
  sensorData, 
  activeAlerts, 
  spraySchedule, 
  regionalRisk, 
  impactMetrics, 
  detectionGallery 
} from '../data/mockData';

interface MainDashboardProps {
  activeTab: string;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ activeTab }) => {
  const [showToast, setShowToast] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  const handleAction = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const renderOverview = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2rem',
    }}>
      {/* LEFT COLUMN: Sensors & Edge Vision */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card gradient-bg" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
            <Bug size={20} className="gradient-text" /> Edge Vision (Active)
          </h3>
          <div className="edge-vision-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--glass-border)', background: '#000' }}>
            <div className="scan-line"></div>
            <img 
              src="/pest_detection_edge_ai.png" 
              alt="Edge AI detection" 
              style={{ width: '100%', display: 'block', opacity: 0.8 }}
            />
            <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.65rem', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
              REC • Node_Pune_4B
            </div>
          </div>
          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)' }}>Last Target</p>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Brown Planthopper</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Confidence</p>
              <p style={{ fontWeight: 700, color: 'var(--accent-green)' }}>98.4%</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Climate Intelligence</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Thermometer size={16} color="#f59e0b" style={{ marginBottom: '8px' }} />
              <p style={{ fontSize: '1.75rem', fontWeight: 700 }}>31.2°C</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Air Temperature</p>
            </div>
            <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Droplets size={16} color="#3b82f6" style={{ marginBottom: '8px' }} />
              <p style={{ fontSize: '1.75rem', fontWeight: 700 }}>72%</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Soil Moisture</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CENTER COLUMN: Risk GIS & Forecasting */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="card glass" style={{ height: '420px', padding: '1.3rem', borderRadius: '16px', overflow: 'hidden' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
            <MapIcon size={20} className="gradient-text" /> Regional Surveillance GIS
          </h3>
          <div style={{ height: '320px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
            <MapContainer center={[18.5204, 73.8567]} zoom={11} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {regionalRisk.map((risk, idx) => (
                <Circle 
                  key={idx}
                  center={risk.coordinates as [number, number]} 
                  radius={2000 * (risk.score / 100)} 
                  pathOptions={{ 
                    color: risk.score > 80 ? 'var(--accent-red)' : risk.score > 50 ? 'var(--accent-orange)' : 'var(--accent-green)', 
                    fillColor: risk.score > 80 ? 'var(--accent-red)' : risk.score > 50 ? 'var(--accent-orange)' : 'var(--accent-green)', 
                    fillOpacity: 0.3 
                  }} 
                >
                  <Popup>
                    <div style={{ color: '#000' }}>
                      <strong>{risk.region}</strong><br/>
                      Risk Score: {risk.score}%<br/>
                      Status: {risk.status}
                    </div>
                  </Popup>
                </Circle>
              ))}
            </MapContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} className="gradient-text" /> LSTM Outbreak Predictor
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>Model Accuracy: 94.2%</span>
          </div>
          <div style={{ height: '160px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sensorData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-red)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-red)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="risk" stroke="var(--accent-red)" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={3} name="Real-time Risk" />
                <Area type="monotone" dataKey="predicted" stroke="var(--accent-blue)" fillOpacity={1} fill="url(#colorPredicted)" strokeDasharray="5 5" strokeWidth={2} name="AI Prediction" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: Alerts & Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} className="gradient-text" /> Hotspot Alerts
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', cursor: 'pointer' }}>View Map</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeAlerts.map(alert => (
              <div 
                key={alert.id} 
                className="alert-item"
                onClick={() => setSelectedAlert(alert.id)}
                style={{ 
                  padding: '12px', 
                  borderRadius: '12px', 
                  background: selectedAlert === alert.id ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.02)', 
                  borderLeft: `4px solid ${alert.severity === 'high' ? 'var(--accent-red)' : alert.severity === 'med' ? 'var(--accent-orange)' : 'var(--accent-blue)'}`,
                  cursor: 'pointer',
                  border: selectedAlert === alert.id ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{alert.title}</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{alert.timestamp}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <MapPin size={12} color="var(--text-secondary)" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{alert.location}</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 600 }}>{Math.round(alert.confidence * 100)}% Match</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card gradient-bg" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="var(--accent-green)" /> Next Precision Mission
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {spraySchedule.map((s, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '12px', 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  <Calendar size={20} color="var(--accent-green)" />
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>{s.time}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.chemical} • {s.area}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={handleAction}
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            <ShieldCheck size={18} /> Deploy AI Response
          </button>
        </motion.div>
      </div>
    </div>
  );

  const renderImpactHub = () => (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {impactMetrics.map((metric, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card impact-card"
            style={{ borderTop: `4px solid ${metric.color}`, padding: '1.5rem' }}
          >
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{metric.label}</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: metric.color }}>{metric.value}</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600, marginTop: '0.5rem' }}>{metric.trend}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="card glass" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={20} className="gradient-text" /> Sustainable Agriculture Trend
          </h3>
          <ResponsiveContainer width="100%" height="80%">
             <AreaChart data={sensorData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="risk" stroke="var(--accent-green)" fill="var(--accent-green)" fillOpacity={0.1} />
                <Area type="monotone" dataKey="predicted" stroke="var(--accent-blue)" fill="var(--accent-blue)" fillOpacity={0.05} />
             </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card gradient-bg">
          <h3 style={{ marginBottom: '1rem' }}>Success Stories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             {[1,2,3].map(i => (
               <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Farmer Ramdas, Haveli</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Saved 30% on pesticides using Pestra AI local alerts.</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEdgeVision = () => (
    <div className="card glass" style={{ height: '82vh', overflow: 'hidden', padding: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', height: '100%' }}>
         <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#000' }}>
            <div className="scan-line"></div>
            <img src="/disease_scan_result.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
               <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>AI Diagnosis: <span style={{ color: 'var(--accent-orange)' }}>Early Blight</span></h2>
                      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Pathogen: Alternaria solani • Confidence: 95.4%</p>
                    </div>
                    <button className="btn-primary">View Treatment</button>
                  </div>
               </div>
            </div>
         </div>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Monitor size={20} className="gradient-text" /> Analysis Pipeline
            </h3>
            {detectionGallery.map(item => (
              <div key={item.id} style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <p style={{ fontWeight: 700 }}>{item.name}</p>
                    <span className="badge-risk-low" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>{item.status}</span>
                 </div>
                 <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Species: <i>{item.species}</i></p>
                 <div style={{ marginTop: '1rem', height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${item.confidence * 100}%`, background: 'var(--accent-green)', borderRadius: '2px' }}></div>
                 </div>
                 <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>AI Confidence: {Math.round(item.confidence * 100)}%</p>
              </div>
            ))}
            <div className="card gradient-bg" style={{ marginTop: 'auto' }}>
               <p style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Eye size={16} color="var(--accent-blue)" /> Active Surveillance
               </p>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>42 Edge nodes currently streaming multispectral data to Pune Central Hub.</p>
            </div>
         </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return renderOverview();
      case 'Edge Vision': return renderEdgeVision();
      case 'Risk GIS': return <div className="card glass" style={{ height: '82vh', overflow: 'hidden', padding: 0 }}>
          <MapContainer center={[18.5204, 73.8567]} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {regionalRisk.map((r, i) => (
              <Circle 
                key={i}
                center={r.coordinates as [number, number]} 
                radius={2000 * (r.score / 100)} 
                pathOptions={{ 
                  color: r.score > 80 ? 'var(--accent-red)' : r.score > 50 ? 'var(--accent-orange)' : 'var(--accent-green)', 
                  fillColor: r.score > 80 ? 'var(--accent-red)' : r.score > 50 ? 'var(--accent-orange)' : 'var(--accent-green)', 
                  fillOpacity: 0.5 
                }} 
              >
                <Popup>
                  <div style={{ color: '#000' }}>
                    <strong>Region: {r.region}</strong><br/>
                    Risk Score: {r.score}%<br/>
                    Status: {r.status}
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>;
      case 'Forecasting': return <div className="card glass" style={{ height: '82vh', padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
             <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Probabilistic Outbreak Engine</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Multi-layered GRU & LSTM architecture using Sentinel-2 and Weather.com API</p>
             </div>
             <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="card glass" style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)' }}>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Model Confidence</p>
                   <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-green)' }}>96.8%</p>
                </div>
                <div className="card glass" style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)' }}>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Next 48h Risk</p>
                   <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-blue)' }}>Moderate</p>
                </div>
             </div>
          </div>
          <div style={{ height: '480px' }}>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sensorData}>
                  <defs>
                    <linearGradient id="mainRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Area type="monotone" dataKey="risk" stroke="var(--accent-green)" fill="url(#mainRisk)" strokeWidth={4} />
                  <Area type="monotone" dataKey="predicted" stroke="var(--accent-blue)" fill="transparent" strokeDasharray="10 10" strokeWidth={2} />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>;
      case 'Impact Hub': return renderImpactHub();
      default: return renderOverview();
    }
  };

  return (
    <div className="main-dashboard" style={{
      marginLeft: '260px',
      padding: '2rem',
      backgroundColor: 'var(--bg-primary)',
      minHeight: '100vh',
      width: 'calc(100% - 260px)'
    }}>
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '50%' }}
            animate={{ opacity: 1, y: 0, x: '50%' }}
            exit={{ opacity: 0, y: 50, x: '50%' }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '50%',
              transform: 'translateX(50%)',
              background: 'var(--accent-green)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 1000,
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)'
            }}>
            <CheckCircle size={24} />
            <span style={{ fontWeight: 600 }}>Precision Mission Authorised Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            {activeTab} <span className="gradient-text">Module</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Regional Surveillance • Active Districts: 14</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="card glass" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-green)', animation: 'pulse 2s infinite' }}></div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Network Status: Stable</span>
          </div>
          <button onClick={handleAction} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} />
            <span>Generate Analysis</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainDashboard;

