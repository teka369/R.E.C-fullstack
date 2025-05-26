import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import api from '../../services/Axios_Api'; // Eliminado
import '../../assets/main/styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  // States for Login form
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // State for response messages
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Función para redireccionar según rol
  const redirectBasedOnRole = (rol: string) => {
    switch (rol) {
      case 'admin':
        navigate('/Principal');
        break;
      case 'profesor':
        navigate('/PerfilProfesor');
        break;
      case 'estudiante':
        navigate('/PerfilEstudiante');
        break;
    }
  };

  // Function to handle Login form submission
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Login simulado (petición deshabilitada temporalmente)');
    setMessageType('info');
    localStorage.setItem('userAuthenticated', 'true');
    setShowMessage(true);
    setLoading(false);
    setTimeout(() => redirectBasedOnRole('admin'), 1200);
  };

  return (
    <div className="auth-container">
      <div className="login-container">
        {/* Message display */}
        {showMessage && (
          <div className={`login-message ${messageType}`}>
            <i className={`bi ${
              messageType === 'success' ? 'bi-check-circle-fill' : 
              messageType === 'error' ? 'bi-exclamation-triangle-fill' : 
              'bi-info-circle-fill'
            }`}></i>
            {message}
          </div>
        )}

        <div className="login-wrapper">
          <div className="login-left-side">
            <h1>Iniciar Sesión</h1>
            <p className="login-subtitle">
              Accede a tu cuenta para gestionar todo lo relacionado con el sistema educativo
            </p>
            <div className="login-image-container">
              <img src="/image.png" alt="Visual de inicio de sesión" className="login-image" />
            </div>
            <p className="login-helper-text">
              ¿No tienes cuenta? <Link to="/register" className="login-link">Crear Cuenta</Link>
            </p>
          </div>
          <div className="login-right-side">
            <div className="login-form-card">
              <h2>Información de Usuario</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      placeholder="Correo electrónico"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      required
                    />
                    <span className="input-icon">
                      <i className="bi bi-person"></i>
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <div className="input-with-icon">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </span>
                  </div>
                </div>
                <div className="forgot-password">
                  <Link to="/forgot-password">¿Olvidaste tu Contraseña?</Link>
                </div>
                <button type="submit" className="login-button" disabled={loading}>
                  {loading ? 'Procesando...' : 'Iniciar Sesión'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
