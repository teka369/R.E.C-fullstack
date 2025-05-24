import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Badge, Accordion, Nav, Tab, Tabs } from 'react-bootstrap';
import { FaSearch, FaFilter, FaBook, FaDownload, FaEye, FaEdit, FaTrash, FaPlus, FaList, FaCalendarAlt, FaFileAlt, FaChalkboardTeacher } from 'react-icons/fa';
import { useTemarioModals, VerTemarioModal, EditarTemarioModal, EliminarTemarioModal } from './components/modals/TemarioModals';

interface Unidad {
    id: number;
    titulo: string;
    descripcion: string;
    objetivos: string[];
    contenidos: string[];
    actividades: string[];
    evaluacion: string[];
    duracion: string;
    recursos: string[];
}

interface Temario {
    id: number;
    asignatura: string;
    grado: string;
    profesor: string;
    periodo: string;
    fechaActualizacion: string;
    estado: 'activo' | 'borrador' | 'archivado';
    unidades: Unidad[];
}

// Datos para catálogos de selección
const GRADOS_CATALOGO = [
    'Preescolar',
    'Primaria 1°', 'Primaria 2°', 'Primaria 3°', 'Primaria 4°', 'Primaria 5°', 'Primaria 6°',
    'Secundaria 1°', 'Secundaria 2°', 'Secundaria 3°',
    'Bachillerato 1°', 'Bachillerato 2°', 'Bachillerato 3°'
];

const ASIGNATURAS_CATALOGO = [
    'Matemáticas', 'Español', 'Inglés', 'Ciencias Naturales', 'Historia', 'Geografía',
    'Educación Física', 'Artes', 'Formación Cívica y Ética', 'Biología', 'Física', 'Química',
    'Literatura', 'Informática', 'Educación Artística'
];

// Datos de ejemplo
const TEMARIOS_EJEMPLO: Temario[] = [
    {
        id: 1,
        asignatura: 'Matemáticas',
        grado: 'Primaria 6°',
        profesor: 'Ana Rodríguez',
        periodo: '2025-1',
        fechaActualizacion: '15/03/2025',
        estado: 'activo',
        unidades: [
            {
                id: 101,
                titulo: 'Fracciones y Decimales',
                descripcion: 'Operaciones con fracciones y conversión a decimales',
                objetivos: ['Comprender el concepto de fracciones', 'Resolver operaciones con fracciones', 'Convertir fracciones a decimales'],
                contenidos: ['Fracciones propias e impropias', 'Suma y resta de fracciones', 'Multiplicación de fracciones', 'Conversión a decimales'],
                actividades: ['Ejercicios prácticos', 'Juegos matemáticos', 'Proyecto de aplicación real'],
                evaluacion: ['Examen escrito', 'Participación en clase', 'Entrega de ejercicios'],
                duracion: '3 semanas',
                recursos: ['Libro de texto', 'Material didáctico', 'Recursos digitales']
            },
            {
                id: 102,
                titulo: 'Geometría Básica',
                descripcion: 'Estudio de figuras geométricas y sus propiedades',
                objetivos: ['Identificar figuras geométricas', 'Calcular áreas y perímetros', 'Resolver problemas geométricos'],
                contenidos: ['Figuras planas', 'Cálculo de áreas', 'Cálculo de perímetros', 'Volumen de cuerpos geométricos'],
                actividades: ['Construcción de figuras', 'Resolución de problemas', 'Proyecto colaborativo'],
                evaluacion: ['Examen práctico', 'Proyecto final', 'Participación'],
                duracion: '4 semanas',
                recursos: ['Instrumentos de geometría', 'Software educativo', 'Materiales recortables']
            }
        ]
    },
    {
        id: 2,
        asignatura: 'Español',
        grado: 'Secundaria 2°',
        profesor: 'Carlos Mendoza',
        periodo: '2025-1',
        fechaActualizacion: '10/04/2025',
        estado: 'borrador',
        unidades: [
            {
                id: 201,
                titulo: 'Géneros Literarios',
                descripcion: 'Estudio de los diferentes géneros literarios y sus características',
                objetivos: ['Identificar los géneros literarios', 'Analizar textos literarios', 'Producir textos de diferentes géneros'],
                contenidos: ['Narrativa', 'Poesía', 'Teatro', 'Ensayo'],
                actividades: ['Lectura y análisis de textos', 'Creación literaria', 'Exposiciones'],
                evaluacion: ['Examen escrito', 'Producción de textos', 'Participación'],
                duracion: '5 semanas',
                recursos: ['Antología literaria', 'Biblioteca escolar', 'Recursos audiovisuales']
            }
        ]
    },
    {
        id: 3,
        asignatura: 'Ciencias Naturales',
        grado: 'Primaria 4°',
        profesor: 'Laura Jiménez',
        periodo: '2025-1',
        fechaActualizacion: '05/04/2025',
        estado: 'activo',
        unidades: [
            {
                id: 301,
                titulo: 'El Cuerpo Humano',
                descripcion: 'Estudio de los sistemas del cuerpo humano y su funcionamiento',
                objetivos: ['Reconocer los principales sistemas del cuerpo humano', 'Comprender la función de cada sistema', 'Adoptar hábitos saludables'],
                contenidos: ['Sistema digestivo', 'Sistema respiratorio', 'Sistema circulatorio', 'Sistema nervioso'],
                actividades: ['Maquetas', 'Experimentos sencillos', 'Investigaciones'],
                evaluacion: ['Examen oral', 'Presentación de proyectos', 'Cuaderno de trabajo'],
                duracion: '6 semanas',
                recursos: ['Láminas didácticas', 'Videos educativos', 'Material de laboratorio']
            }
        ]
    }
];

const Temariosestu: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGrado, setFilterGrado] = useState('todos');
    const [filterAsignatura, setFilterAsignatura] = useState('todas');
    const [activeTab, setActiveTab] = useState('lista');
    const [temarios, setTemarios] = useState<Temario[]>([]);
    const [loading, setLoading] = useState(true);

    // Custom hook para gestionar los modales
    const { modals, handleViewTemario, handleEditTemario, handleDeleteTemario } = useTemarioModals();

    // Efecto para cargar los datos
    useEffect(() => {
        // Simulación de carga de datos desde una API
        const fetchData = async () => {
            try {
                setTimeout(() => {
                    setTemarios(TEMARIOS_EJEMPLO);
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error("Error al cargar los temarios:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filtrar temarios según búsqueda y filtros
    const filteredTemarios = temarios.filter(temario => {
        const matchesSearch = temario.asignatura.toLowerCase().includes(searchTerm.toLowerCase()) ||
            temario.profesor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGrado = filterGrado === 'todos' || temario.grado === filterGrado;
        const matchesAsignatura = filterAsignatura === 'todas' || temario.asignatura === filterAsignatura;

        return matchesSearch && matchesGrado && matchesAsignatura;
    });

    // Función para obtener el color del badge según el estado
    const getEstadoBadgeColor = (estado: string) => {
        switch (estado) {
            case 'activo':
                return 'success';
            case 'borrador':
                return 'warning';
            case 'archivado':
                return 'secondary';
            default:
                return 'primary';
        }
    };

    // Función para crear un nuevo temario
    const handleCreateTemario = () => {
        handleEditTemario(null); // Pasar null para indicar que es un nuevo temario
    };

    // Función para guardar un temario (nuevo o editado)
    const handleSaveTemario = (temario: Temario) => {
        // Verificar si es un nuevo temario o uno existente
        const isNew = !temarios.some(t => t.id === temario.id);

        if (isNew) {
            // Si es nuevo, agregarlo a la lista
            setTemarios([...temarios, temario]);
        } else {
            // Si existe, actualizarlo
            setTemarios(temarios.map(t => t.id === temario.id ? temario : t));
        }
    };

    // Función para eliminar un temario
    const handleConfirmDelete = (id: number) => {
        setTemarios(temarios.filter(t => t.id !== id));
    };

    // Obtener lista única de grados y asignaturas para los filtros
    const gradosDisponibles = [...new Set(temarios.map(t => t.grado))];
    const asignaturasDisponibles = [...new Set(temarios.map(t => t.asignatura))];

    return (
        <div className="bg-light min-vh-100">
            <Container className="py-5">
                {/* Filtros y búsqueda */}
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Body>
                        <Row className="g-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Buscar</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white">
                                            <FaSearch />
                                        </span>
                                        <Form.Control
                                            type="text"
                                            placeholder="Buscar por asignatura o profesor..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Grado</Form.Label>
                                    <Form.Select
                                        value={filterGrado}
                                        onChange={(e) => setFilterGrado(e.target.value)}
                                    >
                                        <option value="todos">Todos los grados</option>
                                        {gradosDisponibles.map((grado, index) => (
                                            <option key={index} value={grado}>{grado}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Asignatura</Form.Label>
                                    <Form.Select
                                        value={filterAsignatura}
                                        onChange={(e) => setFilterAsignatura(e.target.value)}
                                    >
                                        <option value="todas">Todas las asignaturas</option>
                                        {asignaturasDisponibles.map((asignatura, index) => (
                                            <option key={index} value={asignatura}>{asignatura}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={2} className="d-flex align-items-end">
                                <Button variant="outline-secondary" className="w-100">
                                    <FaFilter className="me-1" /> Filtrar
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Tabs para cambiar vista */}
                <Nav variant="pills" className="mb-3" activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
                    <Nav.Item>
                        <Nav.Link eventKey="lista">
                            <FaList className="me-1" /> Vista de Lista
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="detalle">
                            <FaBook className="me-1" /> Vista Detallada
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                {loading ? (
                    // Indicador de carga mejorado
                    <div className="bg-white rounded shadow-sm p-5 text-center">
                        <div className="spinner-border text-danger mb-3" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mb-0">Cargando temarios...</p>
                    </div>
                ) : (
                    <>
                        {/* Vista de Lista */}
                        {activeTab === 'lista' && (
                            <div className="bg-white rounded shadow-sm overflow-hidden">
                                <Table hover responsive className="mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Asignatura</th>
                                            <th>Grado</th>
                                            <th>Profesor</th>
                                            <th>Periodo</th>
                                            <th>Actualización</th>
                                            <th>Estado</th>
                                            <th>Unidades</th>
                                            <th className="text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTemarios.length > 0 ? (
                                            filteredTemarios.map((temario) => (
                                                <tr key={temario.id}>
                                                    <td>{temario.id}</td>
                                                    <td>{temario.asignatura}</td>
                                                    <td>{temario.grado}</td>
                                                    <td>{temario.profesor}</td>
                                                    <td>{temario.periodo}</td>
                                                    <td>{temario.fechaActualizacion}</td>
                                                    <td>
                                                        <Badge bg={getEstadoBadgeColor(temario.estado)}>
                                                            {temario.estado.charAt(0).toUpperCase() + temario.estado.slice(1)}
                                                        </Badge>
                                                    </td>
                                                    <td>{temario.unidades.length}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                style={{ width: '40px' }}
                                                                onClick={() => handleViewTemario(temario)}
                                                                title="Ver temario"
                                                            >
                                                                <FaEye />
                                                            </Button>
                                                            <Button
                                                                variant="outline-success"
                                                                size="sm"
                                                                style={{ width: '40px' }}
                                                                title="Descargar PDF"
                                                            >
                                                                <FaDownload />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={9} className="text-center py-4">
                                                    No se encontraron temarios con los criterios seleccionados.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        )}

                        {/* Vista Detallada */}
                        {activeTab === 'detalle' && (
                            <Row className="g-4">
                                {filteredTemarios.length > 0 ? (
                                    filteredTemarios.map((temario) => (
                                        <Col md={6} key={temario.id}>
                                            <Card className="border-0 shadow-sm h-100">
                                                <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                                                    <h5 className="mb-0">{temario.asignatura} - {temario.grado}</h5>
                                                    <Badge bg={getEstadoBadgeColor(temario.estado)}>
                                                        {temario.estado.charAt(0).toUpperCase() + temario.estado.slice(1)}
                                                    </Badge>
                                                </Card.Header>
                                                <Card.Body>
                                                    <div className="mb-3">
                                                        <div className="d-flex justify-content-between mb-2">
                                                            <div>
                                                                <FaChalkboardTeacher className="me-1 text-muted" />
                                                                <span className="text-muted">Profesor:</span> {temario.profesor}
                                                            </div>
                                                            <div>
                                                                <FaCalendarAlt className="me-1 text-muted" />
                                                                <span className="text-muted">Periodo:</span> {temario.periodo}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <FaFileAlt className="me-1 text-muted" />
                                                            <span className="text-muted">Actualizado:</span> {temario.fechaActualizacion}
                                                        </div>
                                                    </div>

                                                    <h6 className="mb-3">Unidades Temáticas</h6>
                                                    <Accordion defaultActiveKey="0">
                                                        {temario.unidades.map((unidad, index) => (
                                                            <Accordion.Item eventKey={index.toString()} key={unidad.id}>
                                                                <Accordion.Header>
                                                                    {unidad.titulo} <span className="ms-2 text-muted">({unidad.duracion})</span>
                                                                </Accordion.Header>
                                                                <Accordion.Body>
                                                                    <p>{unidad.descripcion}</p>

                                                                    <Tabs defaultActiveKey="objetivos" className="mb-3">
                                                                        <Tab eventKey="objetivos" title="Objetivos">
                                                                            <ul className="mb-0">
                                                                                {unidad.objetivos.map((objetivo, i) => (
                                                                                    <li key={i}>{objetivo}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </Tab>
                                                                        <Tab eventKey="contenidos" title="Contenidos">
                                                                            <ul className="mb-0">
                                                                                {unidad.contenidos.map((contenido, i) => (
                                                                                    <li key={i}>{contenido}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </Tab>
                                                                        <Tab eventKey="actividades" title="Actividades">
                                                                            <ul className="mb-0">
                                                                                {unidad.actividades.map((actividad, i) => (
                                                                                    <li key={i}>{actividad}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </Tab>
                                                                        <Tab eventKey="evaluacion" title="Evaluación">
                                                                            <ul className="mb-0">
                                                                                {unidad.evaluacion.map((evaluacionItem, i) => (
                                                                                    <li key={i}>{evaluacionItem}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </Tab>
                                                                    </Tabs>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        ))}
                                                    </Accordion>
                                                </Card.Body>
                                                <Card.Footer className="bg-white">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            onClick={() => handleViewTemario(temario)}
                                                        >
                                                            <FaEye className="me-1" /> Ver Completo
                                                        </Button>
                                                        <Button
                                                            variant="outline-success"
                                                            size="sm"
                                                        >
                                                            <FaDownload className="me-1" /> Descargar
                                                        </Button>
                                                        <Button
                                                            variant="warning"
                                                            size="sm"
                                                            className="text-white"
                                                            onClick={() => handleEditTemario(temario)}
                                                        >
                                                            <FaEdit className="me-1" /> Editar
                                                        </Button>
                                                    </div>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    ))
                                ) : (
                                    <Col>
                                        <div className="bg-white rounded shadow-sm p-4 text-center">
                                            <p className="mb-0">No se encontraron temarios con los criterios seleccionados.</p>
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        )}
                    </>
                )}

                {/* Resumen de temarios */}
                <Row className="mt-4 g-3">
                    <Col md={3}>
                        <div className="bg-white rounded shadow-sm p-3 text-center">
                            <h4 className="mb-0">{temarios.length}</h4>
                            <p className="text-muted mb-0">Total de temarios</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="bg-white rounded shadow-sm p-3 text-center">
                            <h4 className="mb-0">{temarios.filter(t => t.estado === 'activo').length}</h4>
                            <p className="text-muted mb-0">Temarios activos</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="bg-white rounded shadow-sm p-3 text-center">
                            <h4 className="mb-0">{temarios.filter(t => t.estado === 'borrador').length}</h4>
                            <p className="text-muted mb-0">Borradores</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="bg-white rounded shadow-sm p-3 text-center">
                            <h4 className="mb-0">{temarios.reduce((total, t) => total + t.unidades.length, 0)}</h4>
                            <p className="text-muted mb-0">Total de unidades</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Renderizar modales */}
            {modals}
        </div>
    );
};

export default Temariosestu;