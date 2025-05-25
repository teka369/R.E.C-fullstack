import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaEdit, FaSave, FaChartLine, FaUserGraduate, FaCalendarCheck } from 'react-icons/fa';

const Reportes: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <div className="bg-light min-vh-100">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1 text-primary">Reportes y Estadísticas</h2>
            <p className="text-muted mb-0">Análisis detallado del rendimiento académico</p>
          </div>
          <div className="d-flex gap-2">
            <Button 
              variant={isEditing ? "success" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
              className="d-flex align-items-center gap-2 px-4"
            >
              {isEditing ? (
                <>
                  <FaSave /> Guardar Cambios
                </>
              ) : (
                <>
                  <FaEdit /> Editar Estadísticas
                </>
              )}
            </Button>
          </div>
        </div>

        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100 hover-card">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-circle bg-primary bg-opacity-10 me-3">
                    <FaUserGraduate className="text-primary" size={20} />
                  </div>
                  <h5 className="mb-0">Rendimiento Académico</h5>
                </div>
                <div className="d-flex flex-column gap-3">
                  <div className="stat-item">
                    <span className="text-muted">Promedio General</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={estadisticas.promedioGeneral}
                        onChange={(e) => handleEstadisticaChange('promedioGeneral', parseFloat(e.target.value))}
                        className="stat-input"
                      />
                    ) : (
                      <span className="stat-value">{estadisticas.promedioGeneral.toFixed(1)}</span>
                    )}
                  </div>
                  <div className="stat-item">
                    <span className="text-muted">Porcentaje de Aprobación</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={estadisticas.aprobacion}
                        onChange={(e) => handleEstadisticaChange('aprobacion', parseInt(e.target.value))}
                        className="stat-input"
                      />
                    ) : (
                      <span className="stat-value">{estadisticas.aprobacion}%</span>
                    )}
                  </div>
                  <div className="stat-item">
                    <span className="text-muted">Mejor Curso</span>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        value={estadisticas.mejorCurso}
                        onChange={(e) => handleEstadisticaChange('mejorCurso', e.target.value)}
                        className="stat-input"
                      />
                    ) : (
                      <span className="stat-value">{estadisticas.mejorCurso}</span>
                    )}
                  </div>
                  <div className="stat-item">
                    <span className="text-muted">Mejor Asignatura</span>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        value={estadisticas.mejorAsignatura}
                        onChange={(e) => handleEstadisticaChange('mejorAsignatura', e.target.value)}
                        className="stat-input"
                      />
                    ) : (
                      <span className="stat-value">{estadisticas.mejorAsignatura}</span>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100 hover-card">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-circle bg-success bg-opacity-10 me-3">
                    <FaCalendarCheck className="text-success" size={20} />
                  </div>
                  <h5 className="mb-0">Asistencia</h5>
                </div>
                <div className="d-flex flex-column gap-3">
                  <div className="stat-item">
                    <span className="text-muted">Asistencia Promedio</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={estadisticas.asistenciaPromedio}
                        onChange={(e) => handleEstadisticaChange('asistenciaPromedio', parseInt(e.target.value))}
                        className="stat-input"
                      />
                    ) : (
                      <span className="stat-value">{estadisticas.asistenciaPromedio}%</span>
                    )}
                  </div>
                  <div className="stat-item">
                    <span className="text-muted">Inasistencias Justificadas</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={estadisticas.inasistenciasJustificadas}
                        onChange={(e) => handleEstadisticaChange('inasistenciasJustificadas', parseInt(e.target.value))}
                        className="stat-input"
                      />
                    ) : (
                      <span className="stat-value">{estadisticas.inasistenciasJustificadas}%</span>
                    )}
                  </div>
                  <div className="stat-item">
                    <span className="text-muted">Inasistencias Injustificadas</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={estadisticas.inasistenciasInjustificadas}
                        onChange={(e) => handleEstadisticaChange('inasistenciasInjustificadas', parseInt(e.target.value))}
                        className="stat-input"
                      />
                    ) : (
                      <span className="stat-value">{estadisticas.inasistenciasInjustificadas}%</span>
                    )}
                  </div>
                  <div className="stat-item">
                    <span className="text-muted">Curso con Mayor Asistencia</span>
                    {isEditing ? (
                      <div className="d-flex gap-2">
                        <Form.Control
                          type="text"
                          value={estadisticas.cursoMayorAsistencia}
                          onChange={(e) => handleEstadisticaChange('cursoMayorAsistencia', e.target.value)}
                          className="stat-input"
                        />
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          value={estadisticas.porcentajeCursoMayorAsistencia}
                          onChange={(e) => handleEstadisticaChange('porcentajeCursoMayorAsistencia', parseInt(e.target.value))}
                          className="stat-input"
                        />
                      </div>
                    ) : (
                      <span className="stat-value">{estadisticas.cursoMayorAsistencia} ({estadisticas.porcentajeCursoMayorAsistencia}%)</span>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100 hover-card">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-circle bg-info bg-opacity-10 me-3">
                    <FaChartLine className="text-info" size={20} />
                  </div>
                  <h5 className="mb-0">Comparativo con Periodo Anterior</h5>
                </div>
                <div className="d-flex flex-column gap-3">
                  <div className="stat-item">
                    <span className="text-muted">Variación en Promedio</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        step="0.1"
                        value={estadisticas.variacionPromedio}
                        onChange={(e) => handleEstadisticaChange('variacionPromedio', parseFloat(e.target.value))}
                        className="stat-input"
                      />
                    ) : (
                      <span className="stat-value text-success">+{estadisticas.variacionPromedio}</span>
                    )}
                  </div>
                  <div className="stat-item">
                    <span className="text-muted">Variación en Aprobación</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        value={estadisticas.variacionAprobacion}
                        onChange={(e) => handleEstadisticaChange('variacionAprobacion', parseInt(e.target.value))}
                        className="stat-input"
                      />
                    ) : (
                      <span className="stat-value text-success">+{estadisticas.variacionAprobacion}%</span>
                    )}
                  </div>
                  <div className="stat-item">
                    <span className="text-muted">Reducción de Ausencias</span>
                    {isEditing ? (
                      <Form.Control
                        type="number"
                        value={estadisticas.reduccionAusencias}
                        onChange={(e) => handleEstadisticaChange('reduccionAusencias', parseInt(e.target.value))}
                        className="stat-input"
                      />
                    ) : (
                      <span className="stat-value text-success">-{estadisticas.reduccionAusencias}%</span>
                    )}
                  </div>
                  <div className="stat-item">
                    <span className="text-muted">Tendencia General</span>
                    {isEditing ? (
                      <Form.Select
                        value={estadisticas.tendenciaGeneral}
                        onChange={(e) => handleEstadisticaChange('tendenciaGeneral', e.target.value)}
                        className="stat-input"
                      >
                        <option value="Positiva">Positiva</option>
                        <option value="Negativa">Negativa</option>
                        <option value="Estabilizada">Estabilizada</option>
                      </Form.Select>
                    ) : (
                      <span className="stat-value text-success">{estadisticas.tendenciaGeneral}</span>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .hover-card {
          transition: transform 0.2s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-5px);
        }
        .icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .stat-item:last-child {
          border-bottom: none;
        }
        .stat-value {
          font-weight: 600;
          font-size: 1.1rem;
        }
        .stat-input {
          width: 100px;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default Reportes;
