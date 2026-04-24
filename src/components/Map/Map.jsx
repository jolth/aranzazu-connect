import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { AlertTriangle, MapPin, XCircle, AlertCircle, Mountain } from 'lucide-react';

const ARANZAZU_COORDS = [5.2818, -75.4839];

// Helper to get lucide icons as leaflet custom markers
const getIconSvg = (type) => {
  let iconElement;
  let color;
  switch (type) {
    case 'accidente':
      iconElement = <AlertTriangle size={32} color="#ef4444" />;
      break;
    case 'derrumbe':
      iconElement = <Mountain size={32} color="#f59e0b" />;
      break;
    case 'vía cerrada':
      iconElement = <XCircle size={32} color="#000000" />;
      break;
    case 'hueco profundo':
      iconElement = <AlertCircle size={32} color="#3b82f6" />;
      break;
    default:
      iconElement = <MapPin size={32} color="#10b981" />;
  }
  
  return L.divIcon({
    html: renderToStaticMarkup(iconElement),
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

export default function Map({ incidents }) {
  return (
    <div className="map-container">
      <MapContainer 
        center={ARANZAZU_COORDS} 
        zoom={14} 
        scrollWheelZoom={true} 
        className="leaflet-container"
        zoomControl={false}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Calles (OSM)">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satélite (Esri)">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {incidents.map((incident) => (
          <Marker 
            key={incident.id} 
            position={[incident.lat, incident.lng]}
            icon={getIconSvg(incident.type)}
          >
            <Popup>
              <h3 className="incident-popup__title">{incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}</h3>
              <p className="incident-popup__desc">{incident.location}</p>
              <p className="incident-popup__desc" style={{marginTop: '4px'}}>
                <em>Reportado: {new Date(incident.timestamp).toLocaleString()}</em>
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
