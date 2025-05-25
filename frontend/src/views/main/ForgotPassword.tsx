import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/main/styles/Login.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Aquí iría la lógica de recuperación de contraseña
      // Por ahora, simulamos una respuesta exitosa
      setMessage('Se ha enviado un correo con las instrucciones para recuperar tu contraseña');
      setMessageType('success');
      setShowMessage(true);
    } catch (error) {
      setMessage('Error al procesar la solicitud. Por favor, intenta nuevamente.');
      setMessageType('error');
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="login-container">
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
            <h1>Recuperar Contraseña</h1>
            <p className="login-subtitle">
              Ingresa tu correo electrónico y te enviaremos las instrucciones para recuperar tu contraseña
            </p>
            <div className="login-image-container">
              <img src="/image.png" alt="Recuperar contraseña" className="login-image" />
            </div>
            <p className="login-helper-text">
              ¿Recordaste tu contraseña? <Link to="/" className="login-link">Iniciar Sesión</Link>
            </p>
          </div>
          <div className="login-right-side">
            <div className="login-form-card">
              <h2>Recuperación de Contraseña</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <div className="input-with-icon">
                    <input
                      type="email"
                      placeholder="Ingresa tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <span className="input-icon">
                      <i className="bi bi-envelope"></i>
                    </span>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="login-button" 
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Instrucciones'}
                </button>
                <div className="text-center mt-3">
                  <Link to="/login" className="login-link">
                    <i className="bi bi-arrow-left"></i> Volver al inicio de sesión
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 