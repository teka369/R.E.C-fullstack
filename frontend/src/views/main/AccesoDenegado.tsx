import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/main/styles/AccesoDenegado.css';

const AccesoDenegado: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="acceso-denegado">
      <div className="acceso-denegado-container">
        <div className="error-icon">
          <i className="bi bi-shield-lock-fill"></i>
        </div>
        <h1>Acceso Denegado</h1>
        <p>
          No tienes permisos suficientes para acceder a esta sección.
          Por favor, contacta con el administrador si crees que esto es un error.
        </p>
        <div className="acceso-buttons">
          <button 
            className="btn-volver" 
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left"></i> Volver
          </button>
          <button 
            className="btn-inicio" 
            onClick={() => navigate('/')}
          >
            <i className="bi bi-house"></i> Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccesoDenegado; 