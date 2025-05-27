import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import '../../assets/main/styles/RegistroProfesores.css';

interface GradoGrupo {
  grado: string;
  grupos: string[];
}

interface Profesor {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  especialidad: string;
  telefono: string;
  gradosGrupos: GradoGrupo[];
  estado?: 'pendiente' | 'registrado' | 'error';
}

const RegistroProfesores: React.FC = () => {
  const navigate = useNavigate();
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    especialidad: '',
    telefono: '',
    gradosGrupos: [] as GradoGrupo[]
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: '', message: '', type: '' });

  const showToast = (title: string, message: string, type: string) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const validarProfesor = (profesor: Partial<Profesor>): boolean => {
    if (!profesor.nombre || !profesor.apellido || !profesor.email || 
        !profesor.especialidad || !profesor.telefono) {
      return false;
    }
    if (!profesor.email.includes('@iejavieralondonobarriosevilla.edu.co')) {
      return false;
    }
    if (!profesor.email.includes('profesor')) {
      return false;
    }
    return true;
  };

  const handleGradoGrupoChange = (grado: string, grupo: string) => {
    setFormData(prev => {
      const gradosGrupos = [...prev.gradosGrupos];
      const gradoIndex = gradosGrupos.findIndex(g => g.grado === grado);

      if (gradoIndex === -1) {
        gradosGrupos.push({ grado, grupos: [grupo] });
      } else {
        const grupos = gradosGrupos[gradoIndex].grupos;
        if (grupos.includes(grupo)) {
          gradosGrupos[gradoIndex].grupos = grupos.filter(g => g !== grupo);
          if (gradosGrupos[gradoIndex].grupos.length === 0) {
            gradosGrupos.splice(gradoIndex, 1);
          }
        } else {
          gradosGrupos[gradoIndex].grupos.push(grupo);
        }
      }

      return {
        ...prev,
        gradosGrupos
      };
    });
  };

  const isGradoGrupoSelected = (grado: string, grupo: string) => {
    return formData.gradosGrupos.some(
      gg => gg.grado === grado && gg.grupos.includes(grupo)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarProfesor(formData)) {
      showToast('Error', 'Por favor complete todos los campos correctamente', 'danger');
      return;
    }

    if (formData.gradosGrupos.length === 0) {
      showToast('Error', 'Debe seleccionar al menos un grado y grupo', 'danger');
      return;
    }

    const nuevoProfesor: Profesor = {
      id: Date.now().toString(),
      ...formData,
      estado: 'registrado'
    };

    setProfesores(prev => [...prev, nuevoProfesor]);
    showToast('Éxito', 'Profesor registrado correctamente', 'success');

    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      especialidad: '',
      telefono: '',
      gradosGrupos: []
    });
  };

  const handleDelete = (id: string) => {
    const profesorAEliminar = profesores.find(p => p.id === id);
    if (profesorAEliminar) {
      setProfesores(prev => prev.filter(prof => prof.id !== id));
      showToast(
        'Profesor eliminado',
        `${profesorAEliminar.nombre} ${profesorAEliminar.apellido} ha sido eliminado`,
        'info'
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login-secretaria');
  };

  return (
    <div className="registro-profesores">
      {showAlert && (
        <div className={`alert alert-${alertMessage.type} alert-dismissible fade show`} role="alert">
          <strong>{alertMessage.title}</strong> {alertMessage.message}
          <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}

      <div className="card">
        <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Registro de Profesores</h2>
          <div className="d-flex gap-2">
            <Link to="/registro-estudiantes" className="btn btn-light">
              <i className="bi bi-person-plus me-2"></i>
              Ir a Registro de Estudiantes
            </Link>
            <button onClick={handleLogout} className="btn btn-outline-light">
              <i className="bi bi-box-arrow-right me-2"></i>
              Cerrar Sesión
            </button>
          </div>
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
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    placeholder="Nombre del profesor"
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
                    value={formData.apellido}
                    onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                    placeholder="Apellido del profesor"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Correo Institucional</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="profesor.nombre@iejavieralondonobarriosevilla.edu.co"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Especialidad</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.especialidad}
                    onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                    placeholder="Especialidad del profesor"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    placeholder="Número de teléfono"
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">Grados y Grupos a Cargo</label>
                  <div className="grados-grupos-container">
                    {['6', '7', '8', '9', '10', '11'].map((grado) => (
                      <div key={grado} className="grado-container mb-3">
                        <h6 className="grado-title">{grado}° Grado</h6>
                        <div className="grupos-container">
                          {['1', '2', '3'].map((grupo) => (
                            <div key={`${grado}-${grupo}`} className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`grado${grado}grupo${grupo}`}
                                checked={isGradoGrupoSelected(grado, grupo)}
                                onChange={() => handleGradoGrupoChange(grado, grupo)}
                              />
                              <label className="form-check-label" htmlFor={`grado${grado}grupo${grupo}`}>
                                Grupo {grupo}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-danger w-100">
                  Registrar Profesor
                </button>
              </div>
            </div>
          </form>

          {profesores.length > 0 && (
            <div className="card mt-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  Profesores Registrados ({profesores.filter(p => p.estado === 'registrado').length})
                </h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Especialidad</th>
                        <th>Teléfono</th>
                        <th>Grados y Grupos</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profesores.map((profesor) => (
                        <tr key={profesor.id}>
                          <td>{`${profesor.nombre} ${profesor.apellido}`}</td>
                          <td>{profesor.email}</td>
                          <td>{profesor.especialidad}</td>
                          <td>{profesor.telefono}</td>
                          <td>
                            {profesor.gradosGrupos.map(gg => (
                              <div key={gg.grado} className="mb-1">
                                <span className="badge bg-primary me-1">{gg.grado}°</span>
                                {gg.grupos.map(grupo => (
                                  <span key={grupo} className="badge bg-info me-1">
                                    Grupo {grupo}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </td>
                          <td>
                            <span className={`badge bg-${profesor.estado === 'registrado' ? 'success' : profesor.estado === 'error' ? 'danger' : 'warning'}`}>
                              {profesor.estado}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(profesor.id)}
                              title="Eliminar profesor"
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
    </div>
  );
};

export default RegistroProfesores; 