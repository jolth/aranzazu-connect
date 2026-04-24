import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import NewIncidentCard from '../Incidents/NewIncidentCard';
import HistoryCard from '../History/HistoryCard';
import ConnectionsCard from '../Connections/ConnectionsCard';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export default function Sidebar({ theme, toggleTheme, activeTab, onAddIncident, activeIncidentsCount }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSidebarVisible = !isMobile || activeTab !== 'map';

  return (
    <aside className={`sidebar ${isSidebarVisible ? 'sidebar--open' : ''}`}>
      <div className="sidebar__header">
        <h1 className="sidebar__title">
          <MapPin className="sidebar__title-icon" size={28} />
          Aranzazu Connect
        </h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      <div className="sidebar__content">
        {/* En desktop mostramos todo, en mobile solo la tab activa */}
        {(!isMobile || activeTab === 'new') && (
          <NewIncidentCard onAddIncident={onAddIncident} />
        )}
        
        {(!isMobile || activeTab === 'history') && (
          <HistoryCard theme={theme} />
        )}
        
        {(!isMobile || activeTab === 'connections') && (
          <ConnectionsCard activeIncidentsCount={activeIncidentsCount} />
        )}
      </div>
    </aside>
  );
}
