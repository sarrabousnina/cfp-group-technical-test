import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Property } from '../types';
import api from '../services/api';

export default function PropertyForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    price: '',
    surface: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing && id) {
      api.get<Property>(`/properties/${id}`).then((res) => {
        setFormData({
          title: res.data.title,
          city: res.data.city,
          price: res.data.price.toString(),
          surface: res.data.surface.toString(),
        });
      });
    }
  }, [id, isEditing]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'title':
        return value.trim() ? '' : 'Le titre est requis';
      case 'city':
        return value.trim() ? '' : 'La ville est requise';
      case 'price':
        const price = Number(value);
        return price > 0 ? '' : 'Le prix doit être un nombre positif';
      case 'surface':
        const surface = Number(value);
        return surface > 0 ? '' : 'La surface doit être un nombre positif';
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    for (const key in formData) {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      title: formData.title,
      city: formData.city,
      price: Number(formData.price),
      surface: Number(formData.surface),
    };

    try {
      if (isEditing) {
        await api.put(`/properties/${id}`, payload);
      } else {
        await api.post('/properties', payload);
      }
      navigate('/');
    } catch (err) {
      setErrors({ submit: 'Erreur lors de la sauvegarde. Veuillez réessayer.' });
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto', padding: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '24px' }}>
          {isEditing ? 'Modifier le bien' : 'Ajouter un bien'}
        </h1>

        {errors.submit && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              border: '1px solid #fecaca',
            }}
          >
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
              Titre
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.title ? '1px solid #ef4444' : '1px solid #ddd',
                borderRadius: '8px',
              }}
            />
            {errors.title && (
              <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.title}</div>
            )}
          </div>

          {/* City */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="city" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
              Ville
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.city ? '1px solid #ef4444' : '1px solid #ddd',
                borderRadius: '8px',
              }}
            />
            {errors.city && (
              <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.city}</div>
            )}
          </div>

          {/* Price */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="price" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
              Prix (TND)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              onBlur={handleBlur}
              min="0"
              style={{
                width: '100%',
                padding: '10px',
                border: errors.price ? '1px solid #ef4444' : '1px solid #ddd',
                borderRadius: '8px',
              }}
            />
            {errors.price && (
              <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.price}</div>
            )}
          </div>

          {/* Surface */}
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="surface" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
              Surface (m²)
            </label>
            <input
              type="number"
              id="surface"
              name="surface"
              value={formData.surface}
              onChange={handleChange}
              onBlur={handleBlur}
              min="1"
              style={{
                width: '100%',
                padding: '10px',
                border: errors.surface ? '1px solid #ef4444' : '1px solid #ddd',
                borderRadius: '8px',
              }}
            />
            {errors.surface && (
              <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.surface}</div>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                background: '#3a7bd5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              {isEditing ? 'Mettre à jour' : 'Créer'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                flex: 1,
                background: '#e0e0e0',
                color: '#333',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}