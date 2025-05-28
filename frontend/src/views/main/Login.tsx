import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import '../../assets/main/styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rol: 'estudiante' // 'estudiante' o 'profesor'
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: '', message: '', type: '' });

  const showToast = (title: string, message: string, type: string) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      showToast('Error', 'Por favor complete todos los campos', 'danger');
      return;
    }

    try {
      // Simulamos un login exitoso sin validar el correo
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('userName', formData.email.split('@')[0]);
      localStorage.setItem('userRole', formData.rol);

      if (formData.rol === 'profesor') {
        navigate('/Perfilprofesor');
      } else {
        navigate('/Perfilestudiante');
      }
      
      showToast('Éxito', 'Inicio de sesión exitoso', 'success');
    } catch (error) {
      showToast('Error', 'Error al iniciar sesión', 'danger');
    }
  };

  return (
    <div className="auth-container">
      <div className="login-container">
        {showAlert && (
          <div className={`login-message ${alertMessage.type}`} role="alert">
            <strong>{alertMessage.title}</strong> {alertMessage.message}
            <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
          </div>
        )}

        <div className="login-wrapper">
          <div className="login-left-side">
            <h1>Bienvenido</h1>
            <p className="login-subtitle">Sistema de Gestión Educativa</p>
            <div className="login-image-container">
              <img src="/logo.png" alt="Logo" className="login-image" />
            </div>
            <p className="login-helper-text">
              ¿Necesitas ayuda? <Link to="/contacto" className="login-link">Contáctanos</Link>
            </p>
          </div>

          <div className="login-right-side">
            <div className="login-form-card">
              <h2>Iniciar Sesión</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">
                    <FaUser className="me-2" />
                    Correo Institucional
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ejemplo@iejavieralondonobarriosevilla.edu.co"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaLock className="me-2" />
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Seleccione su rol</label>
                  <div className="rol-selector">
                    <div 
                      className={`rol-option ${formData.rol === 'estudiante' ? 'selected' : ''}`}
                      onClick={() => setFormData({...formData, rol: 'estudiante'})}
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="estudiante"
                        name="rol"
                        value="estudiante"
                        checked={formData.rol === 'estudiante'}
                        onChange={() => {}}
                      />
                      <div className="rol-content">
                        <FaUserGraduate className="rol-icon" />
                        <span>Estudiante</span>
                      </div>
                    </div>
                    <div 
                      className={`rol-option ${formData.rol === 'profesor' ? 'selected' : ''}`}
                      onClick={() => setFormData({...formData, rol: 'profesor'})}
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="profesor"
                        name="rol"
                        value="profesor"
                        checked={formData.rol === 'profesor'}
                        onChange={() => {}}
                      />
                      <div className="rol-content">
                        <FaChalkboardTeacher className="rol-icon" />
                        <span>Profesor</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="login-button">
                  Iniciar Sesión
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
