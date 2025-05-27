import { useState, useRef, useEffect } from 'react';
import { FaTrash, FaCopy, FaDownload, FaPlus, FaRedo } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../assets/main/styles/RegistroEstudiantes.css';
import { Link, useNavigate } from 'react-router-dom';

interface Estudiante {
  id: string;
  nombre: string;
  apellido: string;
  documento: string;
  grado: string;
  grupo: string;
  correo: string;
  estado?: 'pendiente' | 'registrado' | 'error';
}

const RegistroEstudiantes = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    grado: '',
    grupo: '',
    correo: '',
  });
  const [masivoData, setMasivoData] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: '', message: '', type: '' });
  const [activeTab, setActiveTab] = useState('individual');
  const navigate = useNavigate();

  useEffect(() => {
    // Inicializar los tabs de Bootstrap
    const tabElList = document.querySelectorAll('button[data-bs-toggle="tab"]');
    tabElList.forEach(tabEl => {
      tabEl.addEventListener('click', (event) => {
        const target = (event.target as HTMLElement).getAttribute('data-bs-target');
        if (target) {
          setActiveTab(target.replace('#', ''));
        }
      });
    });
  }, []);

  const showToast = (title: string, message: string, type: string) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validarEstudiante = (estudiante: Partial<Estudiante>): boolean => {
    if (!estudiante.nombre || !estudiante.apellido || !estudiante.documento || 
        !estudiante.grado || !estudiante.grupo || !estudiante.correo) {
      return false;
    }
    if (!estudiante.correo.includes('@iejavieralondonobarriosevilla.edu.co')) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarEstudiante(formData)) {
      showToast('Error', 'Por favor complete todos los campos correctamente', 'danger');
      return;
    }

    const nuevoEstudiante: Estudiante = {
      id: Date.now().toString(),
      ...formData,
      estado: 'registrado'
    };

    setEstudiantes(prev => [...prev, nuevoEstudiante]);
    showToast('Éxito', 'Estudiante registrado correctamente', 'success');

    setFormData({
      nombre: '',
      apellido: '',
      documento: '',
      grado: '',
      grupo: '',
      correo: '',
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setMasivoData(text);
      handleMasivoSubmit();
    };
    reader.readAsText(file);
  };

  const handleMasivoSubmit = async () => {
    if (!masivoData.trim()) {
      showToast('Error', 'Por favor ingrese datos para el registro masivo', 'danger');
      return;
    }

    setProcesando(true);
    setProgreso(0);
    
    try {
      let lineas = masivoData.split('\n').filter(line => line.trim());
      const nuevosEstudiantes: Estudiante[] = [];
      const totalLineas = lineas.length;

      for (let i = 0; i < lineas.length; i++) {
        const linea = lineas[i];
        let datos = linea.split('\t');
        
        if (datos.length < 6) {
          datos = linea.split(',').map(item => item.trim());
        }

        if (datos.length < 6) {
          datos = linea.split(/\s+/).map(item => item.trim());
        }

        const [nombre, apellido, documento, grado, grupo, correo] = datos;
        
        const estudiante: Partial<Estudiante> = {
          id: Date.now().toString() + Math.random(),
          nombre,
          apellido,
          documento,
          grado,
          grupo,
          correo
        };

        if (validarEstudiante(estudiante)) {
          nuevosEstudiantes.push({
            ...estudiante as Estudiante,
            estado: 'registrado'
          });
        } else {
          nuevosEstudiantes.push({
            ...estudiante as Estudiante,
            estado: 'error'
          });
        }

        setProgreso(((i + 1) / totalLineas) * 100);
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      if (nuevosEstudiantes.length > 0) {
        setEstudiantes(prev => [...prev, ...nuevosEstudiantes]);
        setMasivoData('');
        
        const exitosos = nuevosEstudiantes.filter(e => e.estado === 'registrado').length;
        const errores = nuevosEstudiantes.filter(e => e.estado === 'error').length;

        showToast(
          'Proceso completado',
          `Se registraron ${exitosos} estudiantes. ${errores} con errores.`,
          exitosos > 0 ? 'success' : 'danger'
        );
      } else {
        showToast('Error', 'No se pudo procesar ningún registro. Verifique el formato de los datos', 'danger');
      }
    } catch (error) {
      showToast('Error', 'Ocurrió un error al procesar los datos', 'danger');
    } finally {
      setProcesando(false);
    }
  };

  const handleDelete = (id: string) => {
    const estudianteAEliminar = estudiantes.find(e => e.id === id);
    if (estudianteAEliminar) {
      setEstudiantes(prev => prev.filter(est => est.id !== id));
      showToast(
        'Estudiante eliminado',
        `${estudianteAEliminar.nombre} ${estudianteAEliminar.apellido} ha sido eliminado`,
        'info'
      );
    }
  };

  const exportarCredenciales = () => {
    const credenciales = estudiantes
      .filter(e => e.estado === 'registrado')
      .map(est => 
        `${est.nombre} ${est.apellido},${est.correo},${est.documento}`
      ).join('\n');
    
    navigator.clipboard.writeText(credenciales);
    showToast('Éxito', 'Credenciales copiadas al portapapeles', 'success');
  };

  const downloadTemplate = () => {
    const template = 'Nombre,Apellido,Documento,Grado,Grupo,Correo\nJuan David,Guarin Romero,123456789,6,1,juanguarinr@iejavieralondonobarriosevilla.edu.co';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_registro_estudiantes.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login-secretaria');
  };

  return (
    <div className="registro-estudiantes">
      {showAlert && (
        <div className={`alert alert-${alertMessage.type} alert-dismissible fade show`} role="alert">
          <strong>{alertMessage.title}</strong> {alertMessage.message}
          <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}

      <div className="card">
        <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Registro de Estudiantes</h2>
          <div className="d-flex gap-2">
            <Link to="/registro-profesores" className="btn btn-light">
              <i className="bi bi-person-badge me-2"></i>
              Ir a Registro de Profesores
            </Link>
            <button onClick={handleLogout} className="btn btn-outline-light">
              <i className="bi bi-box-arrow-right me-2"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>

        <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link ${activeTab === 'individual' ? 'active' : ''}`}
              id="individual-tab"
              data-bs-toggle="tab"
              data-bs-target="#individual"
              type="button"
              role="tab"
              onClick={() => setActiveTab('individual')}
            >
              Registro Individual
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link ${activeTab === 'masivo' ? 'active' : ''}`}
              id="masivo-tab"
              data-bs-toggle="tab"
              data-bs-target="#masivo"
              type="button"
              role="tab"
              onClick={() => setActiveTab('masivo')}
            >
              Registro Masivo
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div className={`tab-pane fade ${activeTab === 'individual' ? 'show active' : ''}`} id="individual" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Nuevo Estudiante</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Nombre</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Nombre del estudiante"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Apellido</label>
                        <input
                          type="text"
                          className="form-control"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleInputChange}
                          placeholder="Apellido del estudiante"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Documento de Identidad</label>
                        <input
                          type="text"
                          className="form-control"
                          name="documento"
                          value={formData.documento}
                          onChange={handleInputChange}
                          placeholder="Número de documento"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label">Grado</label>
                        <select
                          className="form-select"
                          name="grado"
                          value={formData.grado}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Seleccione el grado</option>
                          <option value="6">6°</option>
                          <option value="7">7°</option>
                          <option value="8">8°</option>
                          <option value="9">9°</option>
                          <option value="10">10°</option>
                          <option value="11">11°</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label">Grupo</label>
                        <select
                          className="form-select"
                          name="grupo"
                          value={formData.grupo}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Seleccione el grupo</option>
                          <option value="1">Grupo 1</option>
                          <option value="2">Grupo 2</option>
                          <option value="3">Grupo 3</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label">Correo Institucional</label>
                        <input
                          type="email"
                          className="form-control"
                          name="correo"
                          value={formData.correo}
                          onChange={handleInputChange}
                          placeholder="ejemplo@iejavieralondonobarriosevilla.edu.co"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100">
                        <FaPlus className="me-2" />
                        Registrar Estudiante
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className={`tab-pane fade ${activeTab === 'masivo' ? 'show active' : ''}`} id="masivo" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Registro Masivo</h5>
                <p className="text-muted mt-2 small">
                  Elija una de las siguientes opciones para registrar estudiantes:
                  <br />
                  Formatos aceptados:
                  <br />
                  - Excel: Nombre | Apellido | Documento | Grado | Grupo | Correo
                  <br />
                  - Lista: nombre,apellido,documento,grado,grupo,correo
                  <br />
                  Ejemplo: Juan David,Guarin Romero,123456789,6,1,juanguarinr@iejavieralondonobarriosevilla.edu.co
                </p>
              </div>
              <div className="card-body">
                <div className="d-flex gap-3 mb-3">
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaDownload className="me-2" />
                    Subir Archivo Excel/CSV
                  </button>
                  <button
                    className="btn btn-success flex-grow-1"
                    onClick={downloadTemplate}
                  >
                    <FaDownload className="me-2" />
                    Descargar Plantilla
                  </button>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".xlsx,.xls,.csv"
                  className="d-none"
                />

                <div className="form-group mb-3">
                  <textarea
                    className="form-control"
                    value={masivoData}
                    onChange={(e) => setMasivoData(e.target.value)}
                    placeholder="Pegue aquí los datos de los estudiantes (desde Excel o lista)"
                    rows={10}
                  />
                </div>

                {procesando && (
                  <div className="mb-3">
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${progreso}%` }}
                      >
                        {Math.round(progreso)}%
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-flex gap-3">
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={handleMasivoSubmit}
                    disabled={procesando}
                  >
                    <FaPlus className="me-2" />
                    {procesando ? 'Procesando...' : 'Registrar Estudiantes'}
                  </button>
                  <button
                    className="btn btn-secondary flex-grow-1"
                    onClick={() => setMasivoData('')}
                    disabled={procesando}
                  >
                    <FaRedo className="me-2" />
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {estudiantes.length > 0 && (
          <div className="card mt-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                Estudiantes Registrados ({estudiantes.filter(e => e.estado === 'registrado').length})
              </h5>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={exportarCredenciales}
                >
                  <FaCopy className="me-2" />
                  Exportar Credenciales
                </button>
                <button
                  className="btn btn-primary"
                  onClick={downloadTemplate}
                >
                  <FaDownload className="me-2" />
                  Descargar Plantilla
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Documento</th>
                      <th>Grado</th>
                      <th>Grupo</th>
                      <th>Correo</th>
                      <th>Contraseña</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estudiantes.map((estudiante) => (
                      <tr key={estudiante.id}>
                        <td>{`${estudiante.nombre} ${estudiante.apellido}`}</td>
                        <td>{estudiante.documento}</td>
                        <td>{estudiante.grado}°</td>
                        <td>{estudiante.grupo}</td>
                        <td>{estudiante.correo}</td>
                        <td>{estudiante.documento}</td>
                        <td>
                          <span className={`badge bg-${estudiante.estado === 'registrado' ? 'success' : estudiante.estado === 'error' ? 'danger' : 'warning'}`}>
                            {estudiante.estado}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(estudiante.id)}
                            title="Eliminar estudiante"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroEstudiantes; 