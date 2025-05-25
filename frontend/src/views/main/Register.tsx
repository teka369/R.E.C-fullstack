import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import api from '../../services/Axios_Api'; // Eliminado
import '../../assets/main/styles/Login.css';

const Register: React.FC = () => {
  const navigate = useNavigate();

  // States for Registration form
  const [regNombre, setRegNombre] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRol, setRegRol] = useState('estudiante');
  const [regEspecialidad, setRegEspecialidad] = useState('');
  const [regGrado, setRegGrado] = useState('6-1');
  const [regGradosProfesor, setRegGradosProfesor] = useState<string[]>([]);
  const [selectedGrados, setSelectedGrados] = useState<{ [key: string]: boolean }>({});
  
  // Estados para manejo de errores y loading
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Estados para validación de contraseña
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

  // Función para validar la contraseña en tiempo real
  useEffect(() => {
    setPasswordChecks({
      length: regPassword.length >= 8,
      uppercase: /[A-Z]/.test(regPassword),
      lowercase: /[a-z]/.test(regPassword),
      number: /[0-9]/.test(regPassword)
    });
  }, [regPassword]);

  // Función para redireccionar según rol
  const redirectBasedOnRole = (rol: string) => {
    switch (rol) {
      case 'admin':
        navigate('/admin');
        break;
      case 'profesor':
        navigate('/PerfilProfesor');
        break;
      case 'estudiante':
        navigate('/PerfilEstudiante');
        break;
      default:
        navigate('/');
    }
  };

  // Function to handle Registration form submission
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Simulación de registro exitoso
      // En un caso real, aquí se enviaría la solicitud al backend
      // Guardar datos del usuario en localStorage
      localStorage.setItem('userId', '12345');
      localStorage.setItem('userRol', regRol);
      if (regRol === 'profesor') {
        localStorage.setItem('userGrados', JSON.stringify(regGradosProfesor));
      }
      // Redirigir según el rol
      redirectBasedOnRole(regRol);
    } catch (error: any) {
      if (error.response) {
        // El servidor respondió con un código de error
        setError(error.response.data.message || 'Error al registrar usuario');
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        setError('No se pudo conectar con el servidor');
      } else {
        // Algo sucedió al configurar la petición
        setError('Error al procesar la solicitud');
      }
    } finally {
      setLoading(false);
    }
  };

  // Generar opciones de grado
  const generarOpcionesGrado = () => {
    const grados = [6, 7, 8, 9, 10, 11];
    const grupos = ['1', '2', '3'];
    const opciones = [];

    for (const grado of grados) {
      for (const grupo of grupos) {
        opciones.push(`${grado}-${grupo}`);
      }
    }

    return opciones;
  };

  // Manejar selección de grados con checkboxes
  const handleGradoCheckboxChange = (grado: string) => {
    setSelectedGrados(prev => {
      const newSelected = { ...prev, [grado]: !prev[grado] };
      const selectedGrados = Object.entries(newSelected)
        .filter(([_, isSelected]) => isSelected)
        .map(([grado]) => grado);
      setRegGradosProfesor(selectedGrados);
      return newSelected;
    });
  };

  // Seleccionar todos los grados de un nivel
  const handleSelectAllGrados = (nivel: number) => {
    const gradosNivel = generarOpcionesGrado().filter(g => g.startsWith(`${nivel}-`));
    const newSelected: { [key: string]: boolean } = { ...selectedGrados };
    const allSelected = gradosNivel.every(g => selectedGrados[g]);

    gradosNivel.forEach(grado => {
      newSelected[grado] = !allSelected;
    });

    setSelectedGrados(newSelected);
    const selectedGradosArray = Object.entries(newSelected)
      .filter(([_, isSelected]) => isSelected)
      .map(([grado]) => grado);
    setRegGradosProfesor(selectedGradosArray);
  };

  // Renderizar grados por nivel
  const renderGradosPorNivel = () => {
    const niveles = [6, 7, 8, 9, 10, 11];
    return niveles.map(nivel => (
      <div key={nivel} className="grado-nivel">
        <div className="grado-nivel-header">
          <h4>Grado {nivel}</h4>
          <button
            type="button"
            className="btn-select-all"
            onClick={() => handleSelectAllGrados(nivel)}
          >
            {generarOpcionesGrado()
              .filter(g => g.startsWith(`${nivel}-`))
              .every(g => selectedGrados[g])
              ? 'Deseleccionar Todo'
              : 'Seleccionar Todo'}
          </button>
        </div>
        <div className="grado-grupos">
          {generarOpcionesGrado()
            .filter(g => g.startsWith(`${nivel}-`))
            .map(grado => (
              <div key={grado} className="grado-checkbox">
                <input
                  type="checkbox"
                  id={grado}
                  checked={selectedGrados[grado] || false}
                  onChange={() => handleGradoCheckboxChange(grado)}
                />
                <label htmlFor={grado}>Grupo {grado.split('-')[1]}</label>
              </div>
            ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="auth-container">
      <div className="login-container">
        {error && (
          <div className="login-message error">
            <i className="bi bi-exclamation-triangle-fill"></i>
            {error}
          </div>
        )}

        <div className="login-wrapper">
          <div className="login-left-side">
            <h1>Crear Cuenta</h1>
            <p className="login-subtitle">
              Regístrate para acceder a todas nuestras funciones y servicios. Es rápido y sencillo.
            </p>
            <div className="login-image-container">
              <img src="/image.png" alt="Visual de registro" className="login-image" />
            </div>
            <p className="login-helper-text">
              ¿Ya tienes una cuenta? <Link to="/" className="login-link">Iniciar Sesión</Link>
            </p>
          </div>
          <div className="login-right-side register-side">
            <div className="login-form-card">
              <h2>Registro</h2>
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    placeholder="Ingresa tu nombre completo"
                    value={regNombre}
                    onChange={(e) => setRegNombre(e.target.value)}
                    required
                    minLength={3}
                    maxLength={100}
                  />
                </div>
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rol</label>
                  <select
                    value={regRol}
                    onChange={(e) => setRegRol(e.target.value)}
                    required
                  >
                    <option value="estudiante">Estudiante</option>
                    <option value="profesor">Profesor</option>
                  </select>
                </div>
                {regRol === 'profesor' && (
                  <>
                    <div className="form-group">
                      <label>Especialidad</label>
                      <input
                        type="text"
                        placeholder="Ej: Matemáticas, Ciencias, etc."
                        value={regEspecialidad}
                        onChange={(e) => setRegEspecialidad(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group grados-profesor">
                      <label>Grados a Cargo</label>
                      <div className="grados-container">
                        {renderGradosPorNivel()}
                      </div>
                      <small className="form-text text-muted">
                        Selecciona los grados que impartirás
                      </small>
                    </div>
                  </>
                )}
                {regRol === 'estudiante' && (
                  <div className="form-group">
                    <label>Grado</label>
                    <select
                      value={regGrado}
                      onChange={(e) => setRegGrado(e.target.value)}
                      required
                    >
                      {generarOpcionesGrado().map((grado) => (
                        <option key={grado} value={grado}>
                          {grado}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    placeholder="Crea una contraseña segura"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    minLength={8}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                    title="La contraseña debe cumplir con los siguientes requisitos:
• Mínimo 8 caracteres
• Al menos una letra mayúscula
• Al menos una letra minúscula
• Al menos un número"
                  />
                  <div className="password-requirements">
                    <div className={`requirement ${passwordChecks.length ? 'valid' : ''}`}>
                      <i className={`bi ${passwordChecks.length ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                      <span>Mínimo 8 caracteres</span>
                    </div>
                    <div className={`requirement ${passwordChecks.uppercase ? 'valid' : ''}`}>
                      <i className={`bi ${passwordChecks.uppercase ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                      <span>Al menos una mayúscula</span>
                    </div>
                    <div className={`requirement ${passwordChecks.lowercase ? 'valid' : ''}`}>
                      <i className={`bi ${passwordChecks.lowercase ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                      <span>Al menos una minúscula</span>
                    </div>
                    <div className={`requirement ${passwordChecks.number ? 'valid' : ''}`}>
                      <i className={`bi ${passwordChecks.number ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                      <span>Al menos un número</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Confirmar Contraseña</label>
                  <input
                    type="password"
                    placeholder="Confirma tu contraseña"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                  />
                  {regConfirmPassword && (
                    <div className="password-match">
                      <i className={`bi ${regPassword === regConfirmPassword ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                      <span>{regPassword === regConfirmPassword ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}</span>
                    </div>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : 'Crear Cuenta'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
