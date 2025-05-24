import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Badge, Button, ProgressBar } from 'react-bootstrap';
import { FaChalkboardTeacher } from 'react-icons/fa';
import '../../assets/main/styles/PerfilUsuario.css';

interface TeacherProfile {
  name: string;
  email: string;
  avatar: string;
}

const PerfilProfesor: React.FC = () => {
  const [teacherProfile] = useState<TeacherProfile>({
    name: 'María González',
    email: 'maria@ejemplo.com',
    avatar: '',
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
                  src={teacherProfile.avatar}
                  alt="Foto de perfil"
                  className="rounded-circle profile-avatar mb-3"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <div className="mt-2">
                  <Badge bg="primary" className="px-3 py-2">
                    <FaChalkboardTeacher className="me-1" /> Profesor
                  </Badge>
                </div>
              </Col>
              <Col md={9}>
                <h2 className="mb-1">{teacherProfile.name}</h2>
                <p className="text-muted mb-3">{teacherProfile.email}</p>
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
                  <Nav.Link eventKey="students">Mis Estudiantes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="courses">Cursos Impartidos</Nav.Link>
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
                              <strong>Nombre Completo:</strong> {teacherProfile.name}
                            </li>
                            <li className="mb-2">
                              <strong>Email:</strong> {teacherProfile.email}
                            </li>
                            <li className="mb-2">
                              <strong>Teléfono:</strong> +34 987 654 321
                            </li>
                            <li className="mb-2">
                              <strong>Ubicación:</strong> Barcelona, España
                            </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="border-0 bg-light">
                        <Card.Body>
                          <h5 className="mb-3">Estadísticas</h5>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <span>Cursos Activos</span>
                              <span>5</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <span>Estudiantes Totales</span>
                              <span>120</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <span>Valoración Media</span>
                              <span>4.8/5</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab.Pane>

                {/* Estudiantes */}
                <Tab.Pane eventKey="students">
                  <h4 className="mb-4">Mis Estudiantes</h4>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Estudiante</th>
                          <th>Curso</th>
                          <th>Progreso</th>
                          <th>Última Actividad</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3].map((_, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="https://via.placeholder.com/40"
                                  alt="Student"
                                  className="rounded-circle me-2"
                                />
                                <div>
                                  <div>Estudiante {index + 1}</div>
                                  <small className="text-muted">ID: {1000 + index}</small>
                                </div>
                              </div>
                            </td>
                            <td>Desarrollo Web</td>
                            <td>
                              <ProgressBar now={75} variant="success" style={{height: '8px'}} />
                            </td>
                            <td>Hace 2 días</td>
                            <td>
                              <Button variant="outline-primary" size="sm">Ver Detalles</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab.Pane>

                {/* Cursos */}
                <Tab.Pane eventKey="courses">
                  <h4 className="mb-4">Cursos Impartidos</h4>
                  <Row className="g-4">
                    {['Desarrollo Web', 'JavaScript Avanzado', 'React Fundamentals'].map((course, index) => (
                      <Col md={4} key={index}>
                        <Card className="border-0 shadow-sm h-100">
                          <Card.Img variant="top" src={`https://via.placeholder.com/300x200?text=${course}`} />
                          <Card.Body>
                            <h5>{course}</h5>
                            <p className="text-muted">24 estudiantes inscritos</p>
                            <Button variant="outline-primary" size="sm">
                              Ver Detalles
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
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
                            <td>HTML</td>
                            <td>CSS</td>
                            <td>JavaScript</td>
                            <td>React</td>
                            <td>Proyecto</td>
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

export default PerfilProfesor; 