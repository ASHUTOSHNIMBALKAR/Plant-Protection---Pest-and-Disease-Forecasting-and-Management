export const sensorData = [
  { time: '08:00', temp: 24, humidity: 65, risk: 12, predicted: 15 },
  { time: '10:00', temp: 26, humidity: 60, risk: 15, predicted: 18 },
  { time: '12:00', temp: 29, humidity: 55, risk: 18, predicted: 22 },
  { time: '14:00', temp: 31, humidity: 50, risk: 22, predicted: 28 },
  { time: '16:00', temp: 30, humidity: 52, risk: 25, predicted: 32 },
  { time: '18:00', temp: 28, humidity: 58, risk: 30, predicted: 38 },
  { time: '20:00', temp: 26, humidity: 62, risk: 35, predicted: 45 },
];

export const activeAlerts = [
  {
    id: 1,
    type: 'Pest',
    title: 'Brown Planthopper Detected',
    location: 'Sector 4B - East',
    severity: 'high',
    timestamp: '10 mins ago',
    confidence: 0.98,
    action: 'Biological Control'
  },
  {
    id: 2,
    type: 'Disease',
    title: 'Blast Risk Increased',
    location: 'Sector 2A - West',
    severity: 'med',
    timestamp: '1 hour ago',
    confidence: 0.85,
    action: 'Precision Fungicide'
  },
  {
    id: 3,
    type: 'Weather',
    title: 'High Humidity Forecast',
    location: 'Regional',
    severity: 'low',
    timestamp: '2 hours ago',
    confidence: 0.92,
    action: 'Monitoring'
  }
];
