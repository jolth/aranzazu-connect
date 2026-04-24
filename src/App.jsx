import { useState, useEffect } from 'react';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';
import FloatingMenu from './components/FloatingMenu/FloatingMenu';

const INITIAL_INCIDENTS = [
  {
    id: '1',
    type: 'accidente',
    location: 'Calle 5 Carrera 4, Aranzazu',
    lat: 5.2818,
    lng: -75.4839,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 min ago
  },
  {
    id: '2',
    type: 'derrumbe',
    location: 'Vía Neira - Aranzazu Km 10',
    lat: 5.262036,
    lng: -75.499370,
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() // 2 hours ago
  },
  {
    id: '3',
    type: 'vía cerrada',
    location: 'Parque Principal Aranzazu',
    lat: 5.2835,
    lng: -75.4820,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  }
];

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('map'); // 'map', 'new', 'history', 'connections'
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle window resize to reset mobile tabs
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && activeTab !== 'map') {
        // En desktop no usamos tabs, mostramos todo
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddIncident = (newIncident) => {
    setIncidents(prev => [...prev, newIncident]);
    if (window.innerWidth <= 768) {
      setActiveTab('map'); // Return to map view on mobile after adding
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        activeTab={activeTab}
        onAddIncident={handleAddIncident}
        activeIncidentsCount={incidents.length}
      />
      <Map incidents={incidents} />
      <FloatingMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
