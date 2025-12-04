import type { Property } from '../types';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function PropertyCard({ property }: { property: Property }) {
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
      api.delete(`/properties/${property.id}`).then(() => {
        window.location.reload();
      }).catch(() => {
        alert('Erreur lors de la suppression.');
      });
    }
  };

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'pointer',
        height: '300px',
        boxSizing: 'border-box',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #e0d0c0',
        background: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
      }}
      onClick={() => navigate(`/property/${property.id}`)}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <div>
          <h3
            style={{
              margin: '0 0 8px',
              fontSize: '1.2rem',
              fontWeight: '600',
              lineHeight: '1.3',
              color: '#333',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {property.title}
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              color: '#666',
            }}
          >
            <span>📍</span>
            <span>{property.city}</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #eee',
            paddingTop: '12px',
            marginTop: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: '#777' }}>Prix</div>
            <div style={{ fontWeight: 'bold', color: '#2ecc71', fontSize: '1.1rem' }}>
              {property.price.toLocaleString()} TND
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#777' }}>Surface</div>
            <div style={{ fontWeight: 'bold', color: '#3a7bd5', fontSize: '1.1rem' }}>
              {property.surface} m²
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/property/${property.id}`);
          }}
          style={{
            flex: 1,
            background: '#3a7bd5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            fontWeight: '500',
          }}
        >
          Voir
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit/${property.id}`);
          }}
          style={{
            flex: 1,
            background: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            fontWeight: '500',
          }}
        >
          Modifier
        </button>
        <button
          onClick={handleDelete}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px',
            fontWeight: '500',
            fontSize: '0.9rem',
            minWidth: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}