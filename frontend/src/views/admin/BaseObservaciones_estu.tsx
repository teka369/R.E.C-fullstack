import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Table, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaPlus, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaStar } from 'react-icons/fa';

interface Observacion {
  id: number;
  estudiante: string;
  curso: string;
  fecha: string;
  tipo: 'positiva' | 'negativa' | 'informativa' | 'seguimiento';
  asignatura: string;
  profesor: string;
  descripcion: string;
  estado: 'pendiente' | 'atendida' | 'archivada';
}

const Observacionesestu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todas');
  const [filterEstado, setFilterEstado] = useState('todos');

  const observaciones: Observacion[] = [
    {
      id: 1001,
      estudiante: 'Carlos Martínez',
      curso: '10°A',
      fecha: '15/03/2024',
      tipo: 'positiva',
      asignatura: 'Matemáticas',
      profesor: 'Juan Pérez',
      descripcion: 'Excelente participación en clase. Ha mostrado gran interés y dedicación en los temas de álgebra.',
      estado: 'atendida'
    },
    {
      id: 1002,
      estudiante: 'Ana Rodríguez',
      curso: '9°B',
      fecha: '14/03/2024',
      tipo: 'negativa',
      asignatura: 'Español',
      profesor: 'María González',
      descripcion: 'No entregó el trabajo final de literatura. Se requiere comunicación con los padres.',
      estado: 'pendiente'
    },
    {
      id: 1003,
      estudiante: 'Sofía López',
      curso: '11°A',
      fecha: '12/03/2024',
      tipo: 'informativa',
      asignatura: 'Física',
      profesor: 'Roberto Díaz',
      descripcion: 'Se le ha recomendado asistir a las tutorías de refuerzo los martes y jueves.',
      estado: 'atendida'
    },
    {
      id: 1004,
      estudiante: 'Daniel Torres',
      curso: '8°C',
      fecha: '10/03/2024',
      tipo: 'seguimiento',
      asignatura: 'Ciencias',
      profesor: 'Laura Sánchez',
      descripcion: 'Continúa su progreso en el proyecto de investigación. Se observa mejora en su metodología.',
      estado: 'pendiente'
    },
    {
      id: 1005,
      estudiante: 'Valentina Gómez',
      curso: '10°A',
      fecha: '09/03/2024',
      tipo: 'positiva',
      asignatura: 'Inglés',
      profesor: 'Pedro Ramírez',
      descripcion: 'Obtuvo la calificación más alta en la presentación oral. Excelente dominio del idioma.',
      estado: 'archivada'
    },
    {
      id: 1006,
      estudiante: 'Mateo Hernández',
      curso: '9°B',
      fecha: '08/03/2024',
      tipo: 'negativa',
      asignatura: 'Historia',
      profesor: 'Ana Martínez',
      descripcion: 'Comportamiento disruptivo durante la clase. Se sugiere cita con el departamento de orientación.',
      estado: 'atendida'
    },
    {
      id: 1007,
      estudiante: 'Isabella Castro',
      curso: '11°A',
      fecha: '07/03/2024',
      tipo: 'informativa',
      asignatura: 'Química',
      profesor: 'Carlos Rodríguez',
      descripcion: 'Se le ha autorizado plazo adicional para la entrega del laboratorio debido a su incapacidad médica.',
      estado: 'archivada'
    },
    {
      id: 1008,
      estudiante: 'Santiago Morales',
      curso: '8°C',
      fecha: '06/03/2024',
      tipo: 'seguimiento',
      asignatura: 'Educación Física',
      profesor: 'Javier López',
      descripcion: 'Continúa su recuperación de la lesión. Participa en actividades adaptadas según recomendación médica.',
      estado: 'pendiente'
    },
  ];

  // Filtrar observaciones según búsqueda y filtros
  const filteredObservaciones = observaciones.filter(obs => {
    const matchesSearch = obs.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          obs.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          obs.profesor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          obs.asignatura.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTipo = filterTipo === 'todas' || obs.tipo === filterTipo;
    const matchesEstado = filterEstado === 'todos' || obs.estado === filterEstado;
    
    return matchesSearch && matchesTipo && matchesEstado;
  });

  // Función para obtener el icono según el tipo de observación
  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return <FaCheckCircle className="me-1" />;
      case 'negativa':
        return <FaExclamationTriangle className="me-1" />;
      case 'informativa':
        return <FaInfoCircle className="me-1" />;
      case 'seguimiento':
        return <FaStar className="me-1" />;
      default:
        return <FaInfoCircle className="me-1" />;
    }
  };

  // Función para obtener el color del badge según el tipo
  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return 'success';
      case 'negativa':
        return 'danger';
      case 'informativa':
        return 'info';
      case 'seguimiento':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  // Función para obtener el color del badge según el estado
  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'warning';
      case 'atendida':
        return 'success';
      case 'archivada':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <Container className="py-5">

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded shadow-sm p-3 mb-4">
          <Row className="g-3">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Buscar por estudiante, profesor, asignatura..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select 
                  value={filterTipo}
                  onChange={(e) => setFilterTipo(e.target.value)}
                >
                  <option value="todas">Todos los tipos</option>
                  <option value="positiva">Positivas</option>
                  <option value="negativa">Negativas</option>
                  <option value="informativa">Informativas</option>
                  <option value="seguimiento">Seguimiento</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select 
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                >
                  <option value="todos">Todos los estados</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="atendida">Atendidas</option>
                  <option value="archivada">Archivadas</option>
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
        </div>

        {/* Tabla de observaciones */}
        <div className="bg-white rounded shadow-sm overflow-hidden">
          <Table hover responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Estudiante</th>
                <th>Curso</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Asignatura</th>
                <th>Profesor</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredObservaciones.length > 0 ? (
                filteredObservaciones.map((observacion) => (
                  <tr key={observacion.id}>
                    <td>{observacion.id}</td>
                    <td>{observacion.estudiante}</td>
                    <td>{observacion.curso}</td>
                    <td>{observacion.fecha}</td>
                    <td>
                      <Badge bg={getTipoBadgeColor(observacion.tipo)}>
                        {getTipoIcon(observacion.tipo)} {observacion.tipo.charAt(0).toUpperCase() + observacion.tipo.slice(1)}
                      </Badge>
                    </td>
                    <td>{observacion.asignatura}</td>
                    <td>{observacion.profesor}</td>
                    <td>
                      <Badge bg={getEstadoBadgeColor(observacion.estado)}>
                        {observacion.estado.charAt(0).toUpperCase() + observacion.estado.slice(1)}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          style={{width: '100px'}}
                          onClick={() => alert(`Ver detalles de: ${observacion.id}`)}
                        >
                          <FaEye className="me-1" /> Ver
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    No se encontraron observaciones con los criterios de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Detalles de la observación seleccionada */}
        <Row className="mt-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Detalle de la Observación</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-0">Seleccione una observación para ver los detalles completos.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Resumen de observaciones */}
        <Row className="mt-4 g-3">
          <Col md={3}>
            <div className="bg-white rounded shadow-sm p-3 text-center">
              <h4 className="mb-0">{observaciones.length}</h4>
              <p className="text-muted mb-0">Total de observaciones</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="bg-white rounded shadow-sm p-3 text-center">
              <h4 className="mb-0">{observaciones.filter(o => o.tipo === 'positiva').length}</h4>
              <p className="text-muted mb-0">Observaciones positivas</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="bg-white rounded shadow-sm p-3 text-center">
              <h4 className="mb-0">{observaciones.filter(o => o.tipo === 'negativa').length}</h4>
              <p className="text-muted mb-0">Observaciones negativas</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="bg-white rounded shadow-sm p-3 text-center">
              <h4 className="mb-0">{observaciones.filter(o => o.estado === 'pendiente').length}</h4>
              <p className="text-muted mb-0">Observaciones pendientes</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Observacionesestu;
