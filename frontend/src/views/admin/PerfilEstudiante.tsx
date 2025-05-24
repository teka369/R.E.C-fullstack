import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Badge, Button, ProgressBar } from 'react-bootstrap';
import { FaUserGraduate } from 'react-icons/fa';
import '../../assets/main/styles/PerfilUsuario.css';

interface StudentProfile {
  name: string;
  email: string;
  avatar: string;
}

const PerfilEstudiante: React.FC = () => {
  const [studentProfile] = useState<StudentProfile>({
    name: 'Carlos Rodríguez',
    email: 'carlos@ejemplo.com',
    avatar: 'https://via.placeholder.com/150',
  });

  return (
    <div className="profile-page bg-light py-5">
      <Container>
        {/* Perfil Header */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={3} className="text-center">
                <img
                  src={studentProfile.avatar}
                  alt="Foto de perfil"
                  className="rounded-circle profile-avatar mb-3"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <div className="mt-2">
                  <Badge bg="success" className="px-3 py-2">
                    <FaUserGraduate className="me-1" /> Estudiante
                  </Badge>
                </div>
              </Col>
              <Col md={9}>
                <h2 className="mb-1">{studentProfile.name}</h2>
                <p className="text-muted mb-3">{studentProfile.email}</p>
                <div className="d-flex gap-3">
                  <Button variant="outline-primary">
                    Editar Perfil
                  </Button>
                  <Button variant="outline-secondary">
                    Cambiar Contraseña
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Contenido Principal */}
        <Tab.Container defaultActiveKey="overview">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <Nav variant="tabs" className="border-bottom-0">
                <Nav.Item>
                  <Nav.Link eventKey="overview">Vista General</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="courses">Mis Cursos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="progress">Progreso Académico</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="schedule">Horario</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body className="p-4">
              <Tab.Content>
                {/* Vista General */}
                <Tab.Pane eventKey="overview">
                  <h4 className="mb-4">Información General</h4>
                  <Row>
                    <Col md={6}>
                      <Card className="border-0 bg-light mb-4">
                        <Card.Body>
                          <h5 className="mb-3">Datos Personales</h5>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <strong>Nombre Completo:</strong> {studentProfile.name}
                            </li>
                            <li className="mb-2">
                              <strong>Email:</strong> {studentProfile.email}
                            </li>
                            <li className="mb-2">
                              <strong>Teléfono:</strong> +34 612 345 678
                            </li>
                            <li className="mb-2">
                              <strong>Ubicación:</strong> Madrid, España
                            </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="border-0 bg-light">
                        <Card.Body>
                          <h5 className="mb-3">Estadísticas Académicas</h5>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <span>Cursos Inscritos</span>
                              <span>4</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <span>Cursos Completados</span>
                              <span>2</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <span>Promedio General</span>
                              <span>8.5/10</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab.Pane>

                {/* Cursos */}
                <Tab.Pane eventKey="courses">
                  <h4 className="mb-4">Mis Cursos</h4>
                  <Row className="g-4">
                    {[
                      { name: 'Desarrollo Web', progress: 75 },
                      { name: 'JavaScript Avanzado', progress: 40 },
                      { name: 'React Fundamentals', progress: 20 }
                    ].map((course, index) => (
                      <Col md={4} key={index}>
                        <Card className="border-0 shadow-sm h-100">
                          <Card.Img variant="top" src={`https://via.placeholder.com/300x200?text=${course.name}`} />
                          <Card.Body>
                            <h5>{course.name}</h5>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <small className="text-muted">Progreso</small>
                              <small>{course.progress}%</small>
                            </div>
                            <ProgressBar now={course.progress} variant="success" style={{height: '8px'}} className="mb-3" />
                            <Button variant="outline-primary" size="sm">
                              Continuar Curso
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>

                {/* Progreso Académico */}
                <Tab.Pane eventKey="progress">
                  <h4 className="mb-4">Mi Progreso Académico</h4>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Curso</th>
                          <th>Profesor</th>
                          <th>Progreso</th>
                          <th>Calificación</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { course: 'Desarrollo Web', teacher: 'María González', progress: 75, grade: '8.5/10', status: 'En Curso' },
                          { course: 'JavaScript Avanzado', teacher: 'Pedro López', progress: 40, grade: '7.8/10', status: 'En Curso' },
                          { course: 'HTML y CSS', teacher: 'Ana Martínez', progress: 100, grade: '9.2/10', status: 'Completado' }
                        ].map((item, index) => (
                          <tr key={index}>
                            <td>{item.course}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="https://via.placeholder.com/40"
                                  alt="Teacher"
                                  className="rounded-circle me-2"
                                />
                                <div>{item.teacher}</div>
                              </div>
                            </td>
                            <td>
                              <ProgressBar now={item.progress} variant="success" style={{height: '8px'}} />
                            </td>
                            <td>{item.grade}</td>
                            <td>
                              <Badge bg={item.status === 'Completado' ? 'success' : 'primary'}>
                                {item.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab.Pane>

                {/* Horario */}
                <Tab.Pane eventKey="schedule">
                  <h4 className="mb-4">Mi Horario de Clases</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Hora</th>
                          <th>Lunes</th>
                          <th>Martes</th>
                          <th>Miércoles</th>
                          <th>Jueves</th>
                          <th>Viernes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {['9:00 - 10:30', '11:00 - 12:30', '13:00 - 14:30'].map((time, index) => (
                          <tr key={index}>
                            <td>{time}</td>
                            <td>
                              {index === 0 ? 'HTML' : index === 1 ? 'JavaScript' : ''}
                            </td>
                            <td>
                              {index === 1 ? 'React' : ''}
                            </td>
                            <td>
                              {index === 0 ? 'CSS' : index === 2 ? 'Proyecto' : ''}
                            </td>
                            <td>
                              {index === 2 ? 'JavaScript' : ''}
                            </td>
                            <td>
                              {index === 0 ? 'React' : index === 1 ? 'Proyecto' : ''}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default PerfilEstudiante;