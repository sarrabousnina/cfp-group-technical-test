import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Property } from '../types';
import api from '../services/api';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get<Property>(`/properties/${id}`).then(res => setProperty(res.data));
    }
  }, [id]);

  if (!property) return <div style={{ textAlign: 'center', padding: '24px' }}>Chargement...</div>;

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '16px' }}>
          {property.title}
        </h1>

        <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#777' }}>Ville</div>
            <div style={{ fontWeight: '500', fontSize: '1.1rem' }}>{property.city}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#777' }}>Prix</div>
            <div style={{ fontWeight: 'bold', color: '#2ecc71', fontSize: '1.1rem' }}>
              {property.price.toLocaleString()} TND
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#777' }}>Surface</div>
            <div style={{ fontWeight: 'bold', color: '#3a7bd5', fontSize: '1.1rem' }}>
              {property.surface} m²
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={() => navigate(`/edit/${property.id}`)}
            style={{
              background: '#2ecc71',
              color: 'white',
            }}
          >
            Modifier
          </button>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#e0e0e0',
              color: '#333',
            }}
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}