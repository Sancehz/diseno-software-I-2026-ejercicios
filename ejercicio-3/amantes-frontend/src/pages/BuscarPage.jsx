import { useState } from 'react';
import amanteService from '../services/amanteService';
import AmanteCard from '../components/AmanteCard';

export default function BuscarPage() {
  const [interes, setInteres] = useState('');
  const [resultados, setResultados] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!interes.trim()) return;
    setLoading(true);
    setError('');
    setBuscado(false);
    try {
      const data = await amanteService.buscarPorInteres(interes.trim());
      setResultados(data);
      setBuscado(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sugerencias = ['café', 'yoga', 'viajes', 'música', 'fotografía', 'lectura', 'arte', 'cine'];

  return (
    <div className="page">
      <div className="page-header">
        <p className="page-subtitle">Encuentra almas afines</p>
        <h2 className="page-title">Buscar por Interés</h2>
      </div>

      <form onSubmit={handleBuscar} className="search-form">
        <div className="search-row">
          <input
            type="text"
            value={interes}
            onChange={(e) => setInteres(e.target.value)}
            placeholder="Ej: café, senderismo, música..."
            className="input"
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar 🔍'}
          </button>
        </div>
        <div className="sugerencias">
          <span className="sugerencias-label">Sugerencias:</span>
          {sugerencias.map((s) => (
            <button
              key={s}
              type="button"
              className="tag tag-clickable"
              onClick={() => setInteres(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </form>

      {error && <p className="error-msg">⚠️ {error}</p>}

      {buscado && (
        <div className="results-section">
          <p className="results-count">
            {resultados.length === 0
              ? `Sin resultados para "${interes}"`
              : `${resultados.length} amante${resultados.length !== 1 ? 's' : ''} con interés en "${interes}"`}
          </p>
          {resultados.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">💔</span>
              <p>Nadie comparte ese interés aún. ¡Sé el primero en registrarte!</p>
            </div>
          ) : (
            <div className="cards-grid">
              {resultados.map((amante) => (
                <AmanteCard key={amante._id} amante={amante} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
