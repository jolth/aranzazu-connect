import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';

const mockData = [
  { name: 'Lun', reportes: 4 },
  { name: 'Mar', reportes: 7 },
  { name: 'Mié', reportes: 2 },
  { name: 'Jue', reportes: 5 },
  { name: 'Vie', reportes: 9 },
  { name: 'Sáb', reportes: 12 },
  { name: 'Dom', reportes: 8 },
];

export default function HistoryCard({ theme }) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="card">
      <h2 className="card__header">
        <BarChart2 className="card__icon" size={20} />
        Historial (Última Semana)
      </h2>
      
      <div style={{ width: '100%', height: 200, marginTop: '1rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} width={30} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: gridColor,
                color: isDark ? '#f8fafc' : '#0f172a',
                borderRadius: '8px'
              }}
              cursor={{ fill: isDark ? '#334155' : '#f1f5f9' }}
            />
            <Bar dataKey="reportes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Día más activo:</span>
          <strong style={{ marginLeft: '0.5rem', color: 'var(--color-text-primary)' }}>Sábado (12)</strong>
        </div>
        <div style={{ fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Mes pico:</span>
          <strong style={{ marginLeft: '0.5rem', color: 'var(--color-text-primary)' }}>Abril</strong>
        </div>
      </div>
    </div>
  );
}
