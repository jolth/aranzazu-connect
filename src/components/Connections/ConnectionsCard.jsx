import { Activity } from 'lucide-react';

export default function ConnectionsCard({ activeIncidentsCount }) {
  return (
    <div className="card">
      <h2 className="card__header">
        <Activity className="card__icon" size={20} />
        Conexiones en Vivo
      </h2>
      
      <div style={{ marginTop: '1rem' }}>
        <div className="stat-row">
          <span className="stat-label">Incidencias Activas</span>
          <span className="stat-value live">
            <span className="pulse"></span>
            {activeIncidentsCount}
          </span>
        </div>
        
        <div className="stat-row">
          <span className="stat-label">Usuarios Conectados</span>
          <span className="stat-value">24</span>
        </div>
        
        <div className="stat-row">
          <span className="stat-label">Último Reporte</span>
          <span className="stat-value" style={{ fontSize: '0.875rem' }}>
            Hace 2 min
          </span>
        </div>
      </div>
    </div>
  );
}
