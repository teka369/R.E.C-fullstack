import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Nav, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaBook, FaVideo, FaFilePdf, FaFileAlt, FaDownload, FaEye, FaPlus, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

interface Material {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: 'libro' | 'video' | 'documento' | 'presentacion';
  materia: string;
  autor: string;
  fechaPublicacion: string;
  descargas: number;
  vistas: number;
  imagen: string;
  enlace: string;
}

const Materialestu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');
  const [filterMateria, setFilterMateria] = useState('todas');
  const [activeTab, setActiveTab] = useState('grid');
  
  // Estado para los modales
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);
  
  // Nuevo material vacío para el formulario de agregar
  const emptyMaterial: Material = {
    id: 0,
    titulo: '',
    descripcion: '',
    tipo: 'documento',
    materia: '',
    autor: '',
    fechaPublicacion: new Date().toLocaleDateString('es-ES'),
    descargas: 0,
    vistas: 0,
    imagen: '',
    enlace: ''
  };
  
  // Estado para el formulario (tanto para agregar como editar)
  const [formData, setFormData] = useState<Material>(emptyMaterial);

  // Materiales (sin datos de ejemplo)
  const [materiales, setMateriales] = useState<Material[]>([]);

  // Obtener lista de materias únicas
  const materias = ['todas', ...new Set(materiales.map(m => m.materia).filter(m => m !== ''))];

  // Filtrar materiales según búsqueda y filtros
  const filteredMateriales = materiales.filter(material => {
    const matchesSearch = material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          material.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.autor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTipo = filterTipo === 'todos' || material.tipo === filterTipo;
    const matchesMateria = filterMateria === 'todas' || material.materia === filterMateria;
    
    return matchesSearch && matchesTipo && matchesMateria;
  });

  // Función para obtener el icono según el tipo de material
  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'libro':
        return <FaBook className="me-1" />;
      case 'video':
        return <FaVideo className="me-1" />;
      case 'documento':
        return <FaFilePdf className="me-1" />;
      case 'presentacion':
        return <FaFileAlt className="me-1" />;
      default:
        return <FaFileAlt className="me-1" />;
    }
  };

  // Función para obtener el color del badge según el tipo
  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case 'libro':
        return 'primary';
      case 'video':
        return 'danger';
      case 'documento':
        return 'success';
      case 'presentacion':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  // Funciones para manejar los modales
  const handleAddModal = () => {
    setFormData(emptyMaterial);
    setShowAddModal(true);
  };

  const handleEditModal = (material: Material) => {
    setCurrentMaterial(material);
    setFormData(material);
    setShowEditModal(true);
  };

  const handleDeleteModal = (material: Material) => {
    setCurrentMaterial(material);
    setShowDeleteModal(true);
  };

  const handleDetailsModal = (material: Material) => {
    setCurrentMaterial(material);
    setShowDetailsModal(true);
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Funciones para manejar las acciones de los modales
  const handleAddMaterial = () => {
    const newMaterial = {
      ...formData,
      id: materiales.length > 0 ? Math.max(...materiales.map(m => m.id)) + 1 : 1,
      fechaPublicacion: new Date().toLocaleDateString('es-ES'),
      descargas: 0,
      vistas: 0
    };
    
    setMateriales([...materiales, newMaterial]);
    setShowAddModal(false);
  };

  const handleEditMaterial = () => {
    if (!currentMaterial) return;
    
    const updatedMateriales = materiales.map(m => 
      m.id === currentMaterial.id ? formData : m
    );
    
    setMateriales(updatedMateriales);
    setShowEditModal(false);
  };

  const handleDeleteMaterial = () => {
    if (!currentMaterial) return;
    
    const updatedMateriales = materiales.filter(m => m.id !== currentMaterial.id);
    setMateriales(updatedMateriales);
    setShowDeleteModal(false);
  };

  // Formulario compartido para agregar y editar
  const renderForm = () => (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control 
          type="text" 
          name="titulo"
          value={formData.titulo}
          onChange={handleFormChange}
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3}
          name="descripcion"
          value={formData.descripcion}
          onChange={handleFormChange}
          required
        />
      </Form.Group>
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Select 
              name="tipo"
              value={formData.tipo}
              onChange={handleFormChange as any}
              required
            >
              <option value="libro">Libro</option>
              <option value="video">Video</option>
              <option value="documento">Documento</option>
              <option value="presentacion">Presentación</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Materia</Form.Label>
            <Form.Control 
              type="text" 
              name="materia"
              value={formData.materia}
              onChange={handleFormChange}
              required
              list="materias-list"
            />
            <datalist id="materias-list">
              {materias.filter(m => m !== 'todas').map((materia, idx) => (
                <option key={idx} value={materia} />
              ))}
            </datalist>
          </Form.Group>
        </Col>
      </Row>
      
      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control 
          type="text" 
          name="autor"
          value={formData.autor}
          onChange={handleFormChange}
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>URL de la imagen (opcional)</Form.Label>
        <Form.Control 
          type="url" 
          name="imagen"
          value={formData.imagen}
          onChange={handleFormChange}
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Enlace al material</Form.Label>
        <Form.Control 
          type="url" 
          name="enlace"
          value={formData.enlace}
          onChange={handleFormChange}
          required
        />
      </Form.Group>
    </Form>
  );

  return (
    <div className="bg-light min-vh-100">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Materiales de Estudio</h2>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded shadow-sm p-3 mb-4">
          <Row className="g-3">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Buscar material..."
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
                  <option value="todos">Todos los tipos</option>
                  <option value="libro">Libros</option>
                  <option value="video">Videos</option>
                  <option value="documento">Documentos</option>
                  <option value="presentacion">Presentaciones</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select 
                  value={filterMateria}
                  onChange={(e) => setFilterMateria(e.target.value)}
                >
                  {materias.map((materia, index) => (
                    <option key={index} value={materia}>
                      {materia === 'todas' ? 'Todas las materias' : materia}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
        </div>

        {/* Selector de vista */}
        <div className="bg-white rounded shadow-sm p-2 mb-4">
          <Nav variant="pills" className="justify-content-center">
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'grid'} 
                onClick={() => setActiveTab('grid')}
                className="d-flex align-items-center"
              >
                <i className="bi bi-grid me-1"></i> Cuadrícula
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'list'} 
                onClick={() => setActiveTab('list')}
                className="d-flex align-items-center"
              >
                <i className="bi bi-list me-1"></i> Lista
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* Vista de materiales */}
        {activeTab === 'grid' ? (
          // Vista de cuadrícula
          <Row className="g-4">
            {filteredMateriales.length > 0 ? (
              filteredMateriales.map((material) => (
                <Col md={6} lg={3} key={material.id}>
                  <Card className="h-100 shadow-sm border-0">
                    <div className="position-relative">
                      <Card.Img variant="top" src={material.imagen || `https://via.placeholder.com/300x150?text=${material.tipo}`} />
                      <Badge 
                        bg={getTipoBadgeColor(material.tipo)} 
                        className="position-absolute top-0 end-0 m-2"
                      >
                        {getTipoIcon(material.tipo)} {material.tipo}
                      </Badge>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{material.titulo}</Card.Title>
                      <Card.Text className="text-muted small mb-3">
                        {material.descripcion}
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between mb-2">
                          <small className="text-muted">{material.materia}</small>
                          <small className="text-muted">{material.fechaPublicacion}</small>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <small className="text-muted">
                            <FaEye className="me-1" /> {material.vistas}
                          </small>
                          <small className="text-muted">
                            <FaDownload className="me-1" /> {material.descargas}
                          </small>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            className="flex-grow-1"
                            as="a"
                            href={material.enlace}
                            target="_blank"
                          >
                            <FaEye className="me-1" /> Ver
                          </Button>
                          {material.tipo !== 'video' && (
                            <Button 
                              variant="outline-success" 
                              size="sm"
                              className="flex-grow-1"
                              as="a"
                              href={material.enlace}
                              download
                            >
                              <FaDownload className="me-1" /> Descargar
                            </Button>
                          )}
                          <Button
                            variant="outline-info"
                            size="sm"
                            className="w-100 mt-1"
                            onClick={() => handleDetailsModal(material)}
                          >
                            <FaInfoCircle className="me-1" /> Detalles
                          </Button>
                          <Button 
                            variant="outline-warning" 
                            size="sm"
                            className="flex-grow-1 mt-1"
                            onClick={() => handleEditModal(material)}
                          >
                            <FaEdit className="me-1" /> Editar
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            className="flex-grow-1 mt-1"
                            onClick={() => handleDeleteModal(material)}
                          >
                            <FaTrash className="me-1" /> Eliminar
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center py-5">
                <p className="text-muted">No se encontraron materiales con los criterios de búsqueda.</p>
              </Col>
            )}
          </Row>
        ) : (
          // Vista de lista
          <div className="bg-white rounded shadow-sm overflow-hidden">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Título</th>
                  <th>Tipo</th>
                  <th>Materia</th>
                  <th>Autor</th>
                  <th>Fecha</th>
                  <th>Estadísticas</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredMateriales.length > 0 ? (
                  filteredMateriales.map((material) => (
                    <tr key={material.id}>
                      <td>{material.titulo}</td>
                      <td>
                        <Badge bg={getTipoBadgeColor(material.tipo)}>
                          {getTipoIcon(material.tipo)} {material.tipo}
                        </Badge>
                      </td>
                      <td>{material.materia}</td>
                      <td>{material.autor}</td>
                      <td>{material.fechaPublicacion}</td>
                      <td>
                        <small className="me-2">
                          <FaEye className="me-1" /> {material.vistas}
                        </small>
                        <small>
                          <FaDownload className="me-1" /> {material.descargas}
                        </small>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            as="a"
                            href={material.enlace}
                            target="_blank"
                          >
                            <FaEye className="me-1" /> Ver
                          </Button>
                          {material.tipo !== 'video' && (
                            <Button 
                              variant="outline-success" 
                              size="sm"
                              as="a"
                              href={material.enlace}
                              download
                            >
                              <FaDownload className="me-1" /> Descargar
                            </Button>
                          )}
                          <Button 
                            variant="outline-info" 
                            size="sm"
                            onClick={() => handleDetailsModal(material)}
                          >
                            <FaInfoCircle className="me-1" /> Detalles
                          </Button>
                          <Button 
                            variant="outline-warning" 
                            size="sm"
                            onClick={() => handleEditModal(material)}
                          >
                            <FaEdit className="me-1" /> Editar
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteModal(material)}
                          >
                            <FaTrash className="me-1" /> Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No se encontraron materiales con los criterios de búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Resumen de materiales */}
        <Row className="mt-4 g-3">
          <Col md={3}>
            <div className="bg-white rounded shadow-sm p-3 text-center">
              <h4 className="mb-0">{materiales.length}</h4>
              <p className="text-muted mb-0">Total de materiales</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="bg-white rounded shadow-sm p-3 text-center">
              <h4 className="mb-0">{materiales.filter(m => m.tipo === 'libro').length}</h4>
              <p className="text-muted mb-0">Libros</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="bg-white rounded shadow-sm p-3 text-center">
              <h4 className="mb-0">{materiales.filter(m => m.tipo === 'video').length}</h4>
              <p className="text-muted mb-0">Videos</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="bg-white rounded shadow-sm p-3 text-center">
              <h4 className="mb-0">{materiales.reduce((total, m) => total + m.descargas, 0)}</h4>
              <p className="text-muted mb-0">Descargas totales</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal para agregar material */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderForm()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleAddMaterial}>
            Agregar Material
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar material */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderForm()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={handleEditMaterial}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentMaterial && (
            <p>¿Está seguro que desea eliminar el material <strong>"{currentMaterial.titulo}"</strong>? Esta acción no se puede deshacer.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteMaterial}>
            Eliminar Material
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para ver detalles del material */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentMaterial && (
            <div>
              <div className="text-center mb-4">
                <img 
                  src={currentMaterial.imagen || `https://via.placeholder.com/400x200?text=${currentMaterial.tipo}`} 
                  alt={currentMaterial.titulo}
                  className="img-fluid rounded"
                  style={{ maxHeight: '200px' }}
                />
              </div>
              
              <h4 className="mb-3">{currentMaterial.titulo}</h4>
              
              <div className="mb-3">
                <Badge bg={getTipoBadgeColor(currentMaterial.tipo)} className="me-2">
                  {getTipoIcon(currentMaterial.tipo)} {currentMaterial.tipo}
                </Badge>
                <Badge bg="secondary">{currentMaterial.materia}</Badge>
              </div>
              
              <p>{currentMaterial.descripcion}</p>
              
              <hr />
              
              <Row className="mb-3">
                <Col md={6}>
                  <p className="mb-1 fw-bold">Autor:</p>
                  <p>{currentMaterial.autor}</p>
                </Col>
                <Col md={6}>
                  <p className="mb-1 fw-bold">Fecha de publicación:</p>
                  <p>{currentMaterial.fechaPublicacion}</p>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col md={6}>
                  <p className="mb-1 fw-bold">Vistas:</p>
                  <p><FaEye className="me-1" /> {currentMaterial.vistas}</p>
                </Col>
                <Col md={6}>
                  <p className="mb-1 fw-bold">Descargas:</p>
                  <p><FaDownload className="me-1" /> {currentMaterial.descargas}</p>
                </Col>
              </Row>
              
              <p className="mb-1 fw-bold">Enlace:</p>
              <p className="text-break">
                <a href={currentMaterial.enlace} target="_blank" rel="noopener noreferrer">
                  {currentMaterial.enlace}
                </a>
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Cerrar
          </Button>
          <Button 
            variant="primary" 
            as="a"
            href={currentMaterial?.enlace}
            target="_blank"
          >
            <FaEye className="me-1" /> Ver Material
          </Button>
          {currentMaterial && currentMaterial.tipo !== 'video' && (
            <Button 
              variant="success" 
              as="a"
              href={currentMaterial.enlace}
              download
            >
              <FaDownload className="me-1" /> Descargar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Materialestu;