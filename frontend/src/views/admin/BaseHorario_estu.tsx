import React from 'react';
import { Container, Table, Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Clase {
    materia: string;
    profesor: string;
    aula: string;
    hora: string;
    dia: string;
    color: string;
}

const Horarioestu: React.FC = () => {
    const clases: Clase[] = [
        { materia: 'Matemáticas', profesor: 'Juan Pérez', aula: '101', hora: '7:00 - 8:30', dia: 'Lunes', color: 'primary' },
        { materia: 'Español', profesor: 'María González', aula: '102', hora: '8:30 - 10:00', dia: 'Lunes', color: 'success' },
        { materia: 'Ciencias', profesor: 'Carlos Rodríguez', aula: '103', hora: '10:30 - 12:00', dia: 'Lunes', color: 'danger' },
        { materia: 'Historia', profesor: 'Ana Martínez', aula: '104', hora: '12:00 - 13:30', dia: 'Lunes', color: 'warning' },

        { materia: 'Inglés', profesor: 'Pedro Sánchez', aula: '201', hora: '7:00 - 8:30', dia: 'Martes', color: 'info' },
        { materia: 'Física', profesor: 'Laura Torres', aula: '202', hora: '8:30 - 10:00', dia: 'Martes', color: 'primary' },
        { materia: 'Química', profesor: 'Roberto Díaz', aula: '203', hora: '10:30 - 12:00', dia: 'Martes', color: 'success' },
        { materia: 'Educación Física', profesor: 'Javier López', aula: 'Gimnasio', hora: '12:00 - 13:30', dia: 'Martes', color: 'danger' },

        { materia: 'Matemáticas', profesor: 'Juan Pérez', aula: '101', hora: '7:00 - 8:30', dia: 'Miércoles', color: 'primary' },
        { materia: 'Español', profesor: 'María González', aula: '102', hora: '8:30 - 10:00', dia: 'Miércoles', color: 'success' },
        { materia: 'Artes', profesor: 'Sofía Ramírez', aula: '301', hora: '10:30 - 12:00', dia: 'Miércoles', color: 'warning' },
        { materia: 'Tecnología', profesor: 'Miguel Ángel', aula: 'Sala Comp.', hora: '12:00 - 13:30', dia: 'Miércoles', color: 'info' },

        { materia: 'Inglés', profesor: 'Pedro Sánchez', aula: '201', hora: '7:00 - 8:30', dia: 'Jueves', color: 'info' },
        { materia: 'Física', profesor: 'Laura Torres', aula: '202', hora: '8:30 - 10:00', dia: 'Jueves', color: 'primary' },
        { materia: 'Química', profesor: 'Roberto Díaz', aula: '203', hora: '10:30 - 12:00', dia: 'Jueves', color: 'success' },
        { materia: 'Tutoría', profesor: 'Ana Martínez', aula: '104', hora: '12:00 - 13:30', dia: 'Jueves', color: 'secondary' },

        { materia: 'Matemáticas', profesor: 'Juan Pérez', aula: '101', hora: '7:00 - 8:30', dia: 'Viernes', color: 'primary' },
        { materia: 'Historia', profesor: 'Ana Martínez', aula: '104', hora: '8:30 - 10:00', dia: 'Viernes', color: 'warning' },
        { materia: 'Ciencias', profesor: 'Carlos Rodríguez', aula: '103', hora: '10:30 - 12:00', dia: 'Viernes', color: 'danger' },
        { materia: 'Educación Física', profesor: 'Javier López', aula: 'Gimnasio', hora: '12:00 - 13:30', dia: 'Viernes', color: 'danger' },
    ];

    // Horas de clase
    const horas = ['7:00 - 8:30', '8:30 - 10:00', '10:30 - 12:00', '12:00 - 13:30'];

    // Días de la semana
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    // Función para obtener la clase según el día y la hora
    const getClase = (dia: string, hora: string) => {
        return clases.find(clase => clase.dia === dia && clase.hora === hora);
    };

    return (
        <div className="bg-light min-vh-100">
            <Container className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Horario de Clases</h2>
                    <Link to="/editar-horario">

                    </Link>
                </div>

                <Card className="border-0 shadow-sm">
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <Table bordered hover className="mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="text-center" style={{ width: '10%' }}>Hora</th>
                                        {dias.map((dia, index) => (
                                            <th key={index} className="text-center">{dia}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {horas.map((hora, horaIndex) => (
                                        <tr key={horaIndex}>
                                            <td className="text-center align-middle bg-light fw-bold">{hora}</td>
                                            {dias.map((dia, diaIndex) => {
                                                const clase = getClase(dia, hora);
                                                return (
                                                    <td key={diaIndex} className="p-2">
                                                        {clase ? (
                                                            <div className={`p-2 rounded bg-${clase.color} bg-opacity-10 border border-${clase.color} h-100`}>
                                                                <div className="d-flex justify-content-between align-items-start mb-1">
                                                                    <Badge bg={clase.color}>{clase.materia}</Badge>
                                                                    <small className="text-muted">Aula: {clase.aula}</small>
                                                                </div>
                                                                <small className="d-block text-muted">{clase.profesor}</small>
                                                            </div>
                                                        ) : (
                                                            <div className="p-2 text-center text-muted">-</div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>

                <Row className="mt-4">
                    <Col md={6}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body>
                                <h5 className="mb-3">Información del Horario</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <strong>Grado:</strong> 10° A
                                    </li>
                                    <li className="mb-2">
                                        <strong>Año Escolar:</strong> 2024
                                    </li>
                                    <li className="mb-2">
                                        <strong>Director de Grupo:</strong> María González
                                    </li>
                                    <li className="mb-2">
                                        <strong>Aula Principal:</strong> 102
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body>
                                <h5 className="mb-3">Notas Importantes</h5>
                                <ul>
                                    <li className="mb-2">El recreo es de 10:00 a 10:30 todos los días.</li>
                                    <li className="mb-2">Las clases de Educación Física requieren uniforme deportivo.</li>
                                    <li className="mb-2">La sala de computación estará disponible durante los recreos para trabajos.</li>
                                    <li className="mb-2">Las tutorías adicionales se programan los viernes en la tarde.</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Horarioestu;