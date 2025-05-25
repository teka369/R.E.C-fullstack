import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
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

        {/* Información Principal */}
        <Row>
          <Col md={6}>
            <Card className="border-0 shadow-sm mb-4">
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
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Resumen</h5>
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
      </Container>
    </div>
  );
};

export default PerfilProfesor; 