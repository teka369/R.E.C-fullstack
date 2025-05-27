import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/main/styles/Login.css';

const LoginSecretaria: React.FC = () => {
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

  // Function to handle Login form submission
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulamos un login exitoso sin validar el correo
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('userRole', 'secretario');
      localStorage.setItem('userName', loginUsername.split('@')[0]);
      
      setMessage('Inicio de sesión exitoso');
      setMessageType('success');
      setShowMessage(true);
      setTimeout(() => navigate('/registro-estudiantes'), 1200);
    } catch (error) {
      setMessage('Error al iniciar sesión');
      setMessageType('error');
      setShowMessage(true);
    }
    
    setLoading(false);
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
            <h1>Acceso Secretaría</h1>
            <p className="login-subtitle">
              Accede al sistema para gestionar el registro de estudiantes
            </p>
            <div className="login-image-container">
              <img src="/image.png" alt="Visual de inicio de sesión" className="login-image" />
            </div>
            <p className="login-helper-text">
              ¿Eres estudiante? <Link to="/Principal" className="login-link">Volver a la página principal</Link>
            </p>
          </div>
          <div className="login-right-side">
            <div className="login-form-card">
              <h2>Información de Secretaría</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label>Correo Institucional</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      placeholder="secretaria@iejavieralondonobarriosevilla.edu.co"
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

export default LoginSecretaria; 