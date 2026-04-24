import { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

export default function NewIncidentCard({ onAddIncident }) {
  const [type, setType] = useState('accidente');
  const [locationText, setLocationText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locationText.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Append municipality for better geocoding accuracy
      const searchQuery = `${locationText}, Aranzazu, Caldas, Colombia`;
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        onAddIncident({
          id: Date.now().toString(),
          type,
          location: locationText,
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          timestamp: new Date().toISOString()
        });
        setLocationText('');
      } else {
        setError('No se pudo encontrar la ubicación. Intenta ser más específico.');
      }
    } catch (err) {
      setError('Error al conectar con el servicio de mapas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card__header">
        <PlusCircle className="card__icon" size={20} />
        Nueva Incidencia
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="incident-type">Tipo de Incidencia</label>
          <select 
            id="incident-type" 
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="accidente">Accidente</option>
            <option value="derrumbe">Derrumbe</option>
            <option value="vía cerrada">Vía Cerrada</option>
            <option value="hueco profundo">Hueco Profundo</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="incident-location">Ubicación (Ej: Calle 5 con Carrera 4)</label>
          <input 
            type="text" 
            id="incident-location" 
            className="form-input" 
            placeholder="Dirección o lugar específico"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            required
          />
          {error && <p className="text-error">{error}</p>}
        </div>

        <button type="submit" className="btn" disabled={loading || !locationText.trim()}>
          {loading ? <Loader2 className="animate-spin" size={16} /> : 'Reportar Incidencia'}
        </button>
      </form>
    </div>
  );
}
