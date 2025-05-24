import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaDownload, FaPrint, FaFileExport, FaPlus, FaEdit, FaSave } from 'react-icons/fa';
import { useReporteModals, Reporte } from './components/modals/ReportesModals';

const Reportes: React.FC = () => {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('2024-1');
  const [cursoSeleccionado, setCursoSeleccionado] = useState('Todos');
  const [tipoReporteSeleccionado, setTipoReporteSeleccionado] = useState('Todos');
  const [isEditing, setIsEditing] = useState(false);
  const [reportes, setReportes] = useState<Reporte[]>([
    {
      id: 1,
      titulo: 'Reporte de Rendimiento Académico',
      tipo: 'academico',
      periodo: '2024-1',
      curso: '11°A',
      fecha: '15/03/2024',
      descripcion: 'Análisis detallado del rendimiento académico del curso 11°A en el primer periodo de 2024.',
      estado: 'generado',
      formato: 'pdf'
    },
    {
      id: 2,
      titulo: 'Reporte de Asistencia',
      tipo: 'asistencia',
      periodo: '2024-1',
      curso: '10°B',
      fecha: '14/03/2024',
      descripcion: 'Estadísticas de asistencia y ausencias del curso 10°B en el primer periodo de 2024.',
      estado: 'pendiente',
      formato: 'excel'
    },
    {
      id: 3,
      titulo: 'Reporte de Comportamiento',
      tipo: 'comportamiento',
      periodo: '2024-1',
      curso: '9°A',
      fecha: '13/03/2024',
      descripcion: 'Evaluación del comportamiento y disciplina del curso 9°A en el primer periodo de 2024.',
      estado: 'archivado',
      formato: 'pdf'
    }
  ]);
  
  const { 
    modals, 
    handleViewReporte: mostrarVer, 
    handleEditReporte: mostrarEditar, 
    handleDeleteReporte: mostrarEliminar 
  } = useReporteModals();

  // Datos para las estadísticas de resumen
  const [estadisticas, setEstadisticas] = useState({
    promedioGeneral: 3.8,
    asistenciaPromedio: 92,
    aprobacion: 85,
    mejorCurso: '11°A',
    mejorAsignatura: 'Matemáticas',
    estudiantesDestacados: 45,
    inasistenciasJustificadas: 65,
    inasistenciasInjustificadas: 35,
    cursoMayorAsistencia: '10°B',
    porcentajeCursoMayorAsistencia: 96,
    variacionPromedio: 0.3,
    variacionAprobacion: 5,
    reduccionAusencias: 8,
    tendenciaGeneral: 'Positiva'
  });

  const handleEstadisticaChange = (campo: string, valor: string | number) => {
    setEstadisticas(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleSaveReporte = (reporte: Reporte) => {
    if (reporte.id) {
      setReportes(prev => prev.map(r => 
        r.id === reporte.id ? reporte : r
      ));
    } else {
      setReportes(prev => [...prev, reporte]);
    }
  };

  const handleDeleteReporte = (reporte: Reporte) => {
    setReportes(prev => prev.filter(r => r.id !== reporte.id));
  };

  return (
    <div className="bg-light min-vh-100">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Reportes y Estadísticas</h2>
          <div className="d-flex gap-2">
            <Button 
              variant={isEditing ? "success" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <FaSave className="me-1" /> Guardar Cambios
                </>
              ) : (
                <>
                  <FaEdit className="me-1" /> Editar Estadísticas
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Periodo Académico</Form.Label>
                  <Form.Select 
                    value={periodoSeleccionado}
                    onChange={(e) => setPeriodoSeleccionado(e.target.value)}
                  >
                    <option value="Todos">Todos los periodos</option>
                    <option value="2024-1">2024 - Primer Periodo</option>
                    <option value="2023-4">2023 - Cuarto Periodo</option>
                    <option value="2023-3">2023 - Tercer Periodo</option>
                    <option value="2023-2">2023 - Segundo Periodo</option>
                    <option value="2023-1">2023 - Primer Periodo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Curso</Form.Label>
                  <Form.Select 
                    value={cursoSeleccionado}
                    onChange={(e) => setCursoSeleccionado(e.target.value)}
                  >
                    <option value="Todos">Todos los cursos</option>
                    <option value="11A">11°A</option>
                    <option value="11B">11°B</option>
                    <option value="10A">10°A</option>
                    <option value="10B">10°B</option>
                    <option value="9A">9°A</option>
                    <option value="9B">9°B</option>
                    <option value="8A">8°A</option>
                    <option value="8B">8°B</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Tipo de Reporte</Form.Label>
                  <Form.Select 
                    value={tipoReporteSeleccionado}
                    onChange={(e) => setTipoReporteSeleccionado(e.target.value)}
                  >
                    <option value="Todos">Todos los tipos</option>
                    <option value="academico">Académico</option>
                    <option value="asistencia">Asistencia</option>
                    <option value="comportamiento">Comportamiento</option>
                    <option value="evaluacion">Evaluación</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Tarjetas de estadísticas */}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h5 className="mb-3">Rendimiento Académico</h5>
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Promedio General:</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={estadisticas.promedioGeneral}
                        onChange={(e) => handleEstadisticaChange('promedioGeneral', parseFloat(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span className="fw-bold">{estadisticas.promedioGeneral.toFixed(1)}</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Porcentaje de Aprobación:</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={estadisticas.aprobacion}
                        onChange={(e) => handleEstadisticaChange('aprobacion', parseInt(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span className="fw-bold">{estadisticas.aprobacion}%</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Mejor Curso:</span>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        value={estadisticas.mejorCurso}
                        onChange={(e) => handleEstadisticaChange('mejorCurso', e.target.value)}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span className="fw-bold">{estadisticas.mejorCurso}</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Mejor Asignatura:</span>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        value={estadisticas.mejorAsignatura}
                        onChange={(e) => handleEstadisticaChange('mejorAsignatura', e.target.value)}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span className="fw-bold">{estadisticas.mejorAsignatura}</span>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h5 className="mb-3">Asistencia</h5>
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Asistencia Promedio:</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={estadisticas.asistenciaPromedio}
                        onChange={(e) => handleEstadisticaChange('asistenciaPromedio', parseInt(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span className="fw-bold">{estadisticas.asistenciaPromedio}%</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Inasistencias Justificadas:</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={estadisticas.inasistenciasJustificadas}
                        onChange={(e) => handleEstadisticaChange('inasistenciasJustificadas', parseInt(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span className="fw-bold">{estadisticas.inasistenciasJustificadas}%</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Inasistencias Injustificadas:</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={estadisticas.inasistenciasInjustificadas}
                        onChange={(e) => handleEstadisticaChange('inasistenciasInjustificadas', parseInt(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span className="fw-bold">{estadisticas.inasistenciasInjustificadas}%</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Curso con Mayor Asistencia:</span>
                    {isEditing ? (
                      <div className="d-flex gap-2">
                        <Form.Control
                          type="text"
                          value={estadisticas.cursoMayorAsistencia}
                          onChange={(e) => handleEstadisticaChange('cursoMayorAsistencia', e.target.value)}
                          style={{ width: '60px' }}
                        />
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          value={estadisticas.porcentajeCursoMayorAsistencia}
                          onChange={(e) => handleEstadisticaChange('porcentajeCursoMayorAsistencia', parseInt(e.target.value))}
                          style={{ width: '60px' }}
                        />
                      </div>
                    ) : (
                      <span className="fw-bold">{estadisticas.cursoMayorAsistencia} ({estadisticas.porcentajeCursoMayorAsistencia}%)</span>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h5 className="mb-3">Comparativo con Periodo Anterior</h5>
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Variación en Promedio:</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        step="0.1"
                        value={estadisticas.variacionPromedio}
                        onChange={(e) => handleEstadisticaChange('variacionPromedio', parseFloat(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span className="fw-bold text-success">+{estadisticas.variacionPromedio}</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Variación en Aprobación:</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        value={estadisticas.variacionAprobacion}
                        onChange={(e) => handleEstadisticaChange('variacionAprobacion', parseInt(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span className="fw-bold text-success">+{estadisticas.variacionAprobacion}%</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Reducción de Ausencias:</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        value={estadisticas.reduccionAusencias}
                        onChange={(e) => handleEstadisticaChange('reduccionAusencias', parseInt(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <span className="fw-bold text-success">-{estadisticas.reduccionAusencias}%</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Tendencia General:</span>
                    {isEditing ? (
                      <Form.Select
                        value={estadisticas.tendenciaGeneral}
                        onChange={(e) => handleEstadisticaChange('tendenciaGeneral', e.target.value)}
                        style={{ width: '120px' }}
                      >
                        <option value="Positiva">Positiva</option>
                        <option value="Negativa">Negativa</option>
                        <option value="Estabilizada">Estabilizada</option>
                      </Form.Select>
                    ) : (
                      <span className="fw-bold text-success">{estadisticas.tendenciaGeneral}</span>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Renderizar modales */}
        {modals}
      </Container>
    </div>
  );
};

export default Reportes;
