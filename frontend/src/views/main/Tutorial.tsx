import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../assets/main/styles/Tutorial.css';

const Tutorial: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('userAuthenticated');
    setIsAuthenticated(auth === 'true');
  }, []);

  return (
    <div className="tutorial-container">
      <div className="tutorial-header">
        <div className="container">
          <h1 className="tutorial-title">Tutorial de la Plataforma</h1>
          <p className="tutorial-subtitle">Aprende a utilizar todas las funcionalidades de R.E.C</p>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          {/* Video Tutorial Section */}
          <div className="col-lg-8">
            <div className="video-container mb-4">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID"
                  title="Tutorial R.E.C"
                  allowFullScreen
                  className="rounded shadow"
                ></iframe>
              </div>
            </div>

            {/* Video Description */}
            <div className="video-description p-4 bg-white rounded shadow-sm">
              <h3>Descripción del Tutorial</h3>
              <p>
                En este video tutorial aprenderás a utilizar todas las funcionalidades de la plataforma R.E.C,
                incluyendo el acceso a materiales educativos, seguimiento académico y más.
              </p>
              <div className="video-timestamps mt-4">
                <h4>Contenido del Video:</h4>
                <ul className="list-unstyled">
                  <li><i className="bi bi-play-circle me-2"></i>00:00 - Introducción</li>
                  <li><i className="bi bi-play-circle me-2"></i>01:30 - Registro e Inicio de Sesión</li>
                  <li><i className="bi bi-play-circle me-2"></i>03:45 - Navegación Principal</li>
                  <li><i className="bi bi-play-circle me-2"></i>05:20 - Acceso a Materiales</li>
                  <li><i className="bi bi-play-circle me-2"></i>07:15 - Seguimiento Académico</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Links Sidebar */}
          <div className="col-lg-4">
            <div className="quick-links-card p-4 bg-white rounded shadow-sm">
              <h3 className="mb-4">Enlaces Rápidos</h3>
              <div className="list-group">
                {!isAuthenticated && (
                  <Link to="/login" className="list-group-item list-group-item-action">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Iniciar Sesión
                  </Link>
                )}
                <Link to="/Material" className="list-group-item list-group-item-action">
                  <i className="bi bi-book me-2"></i>
                  Materiales de Estudio
                </Link>
                <Link to="/Observaciones" className="list-group-item list-group-item-action">
                  <i className="bi bi-clipboard-check me-2"></i>
                  Observaciones
                </Link>
                <Link to="/Horario" className="list-group-item list-group-item-action">
                  <i className="bi bi-calendar-week me-2"></i>
                  Horarios
                </Link>
                <Link to="/Contacto" className="list-group-item list-group-item-action">
                  <i className="bi bi-envelope me-2"></i>
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial; 