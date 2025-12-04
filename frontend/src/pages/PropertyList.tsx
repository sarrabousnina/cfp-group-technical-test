import { useEffect, useState } from 'react';
import type { Property } from '../types';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';
import { useNavigate } from 'react-router-dom';

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Property[]>('/properties').then((res) => {
      setProperties(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(properties);
      return;
    }
    const term = search.toLowerCase();
    setFiltered(
      properties.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.city.toLowerCase().includes(term)
      )
    );
  }, [search, properties]);

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '700', marginBottom: '16px' }}>
          Biens Immobiliers
        </h1>

        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Rechercher par titre ou ville"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '1rem',
              borderRadius: '24px',
              border: '1px solid #ddd',
              background: 'white',
              color: '#333',
              outline: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'box-shadow 0.2s',
            }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)')}
            onBlur={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)')}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            color: '#777',
            fontSize: '1.1rem',
            marginTop: '48px',
            padding: '24px',
            borderRadius: '12px',
            background: '#f0f0f0',
            textAlign: 'center',
          }}
        >
          Aucun bien trouvé. Essayez un autre mot-clé.
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '24px',
          }}
        >
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}

      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <button
          onClick={() => navigate('/create')}
          style={{
            padding: '12px 24px',
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '24px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.2s',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#b91c1c';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#dc2626';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          + Ajouter un bien
        </button>
      </div>
    </div>
  );
}