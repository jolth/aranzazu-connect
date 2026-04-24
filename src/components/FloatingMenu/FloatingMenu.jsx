import { Map as MapIcon, PlusCircle, Activity, BarChart2 } from 'lucide-react';

export default function FloatingMenu({ activeTab, setActiveTab }) {
  return (
    <div className="floating-nav">
      <button 
        className={`floating-nav__btn ${activeTab === 'map' ? 'floating-nav__btn--active' : ''}`}
        onClick={() => setActiveTab('map')}
        title="Mapa"
      >
        <MapIcon size={24} />
      </button>
      <button 
        className={`floating-nav__btn ${activeTab === 'new' ? 'floating-nav__btn--active' : ''}`}
        onClick={() => setActiveTab('new')}
        title="Nueva Incidencia"
      >
        <PlusCircle size={24} />
      </button>
      <button 
        className={`floating-nav__btn ${activeTab === 'connections' ? 'floating-nav__btn--active' : ''}`}
        onClick={() => setActiveTab('connections')}
        title="Conexiones"
      >
        <Activity size={24} />
      </button>
      <button 
        className={`floating-nav__btn ${activeTab === 'history' ? 'floating-nav__btn--active' : ''}`}
        onClick={() => setActiveTab('history')}
        title="Historial"
      >
        <BarChart2 size={24} />
      </button>
    </div>
  );
}
