import { useState } from 'react';
import amanteService from '../services/amanteService';

export default function CrearPage() {
  const [form, setForm] = useState({ nombre: '', edad: '', intereses: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(null);

    const interesesArr = form.intereses
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    try {
      const data = await amanteService.crear({
        nombre: form.nombre,
        edad: Number(form.edad),
        intereses: interesesArr,
      });
      setSuccess(data);
      setForm({ nombre: '', edad: '', intereses: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <p className="page-subtitle">Comparte quién eres</p>
        <h2 className="page-title">Crear Perfil</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label className="label">Nombre completo</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Edad</label>
          <input
            name="edad"
            type="number"
            value={form.edad}
            onChange={handleChange}
            placeholder="18 - 120"
            className="input"
            min={18}
            max={120}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Intereses</label>
          <input
            name="intereses"
            value={form.intereses}
            onChange={handleChange}
            placeholder="café, senderismo, yoga (separados por coma)"
            className="input"
            required
          />
          <span className="hint">Separa cada interés con una coma</span>
        </div>

        {error && <p className="error-msg">⚠️ {error}</p>}

        {success && (
          <div className="success-msg">
            <span>💘</span>
            <span>¡Perfil de <strong>{success.nombre}</strong> registrado con éxito!</span>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar perfil 💘'}
        </button>
      </form>
    </div>
  );
}
