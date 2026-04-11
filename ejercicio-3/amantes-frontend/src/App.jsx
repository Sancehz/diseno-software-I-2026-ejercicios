import { useState } from 'react';
import BuscarPage from './pages/BuscarPage';
import CrearPage from './pages/CrearPage';
import './styles.css';

export default function App() {
  const [tab, setTab] = useState('buscar');

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">💘</span>
            <span className="logo-text">Amantes Ideal</span>
          </div>
          <nav className="nav">
            <button
              className={`nav-btn ${tab === 'buscar' ? 'active' : ''}`}
              onClick={() => setTab('buscar')}
            >
              🔍 Buscar
            </button>
            <button
              className={`nav-btn ${tab === 'crear' ? 'active' : ''}`}
              onClick={() => setTab('crear')}
            >
              ✨ Crear Perfil
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        {tab === 'buscar' ? <BuscarPage /> : <CrearPage />}
      </main>

      <footer className="footer">
        <p>💘 Amantes Ideal — Encuentra tu alma gemela</p>
      </footer>
    </div>
  );
}
