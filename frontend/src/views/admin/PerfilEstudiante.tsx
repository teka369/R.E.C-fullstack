import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
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

        {/* Información Principal */}
        <Row>
          <Col md={6}>
            <Card className="border-0 shadow-sm mb-4">
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
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Resumen Académico</h5>
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
      </Container>
    </div>
  );
};

export default PerfilEstudiante;