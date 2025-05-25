import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Nav } from 'react-bootstrap';
import { FaSearch, FaFilter, FaBook, FaVideo, FaFilePdf, FaFileAlt, FaDownload, FaEye, FaPlus, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { VerMaterialModal, EditarMaterialModal, EliminarMaterialModal } from './components/modals/MaterialModals';

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

const Material: React.FC = () => {
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
  
  // Materiales (sin datos de ejemplo)
  const [materiales, setMateriales] = useState<Material[]>([]);

  // Cargar datos de localStorage al iniciar
  useEffect(() => {
    const savedMateriales = localStorage.getItem('materiales');
    if (savedMateriales) {
      setMateriales(JSON.parse(savedMateriales));
    }
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('materiales', JSON.stringify(materiales));
  }, [materiales]);

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
    setCurrentMaterial(emptyMaterial);
    setShowAddModal(true);
  };

  const handleEditModal = (material: Material) => {
    console.log("Editando material:", material);
    setCurrentMaterial(material);
    setShowEditModal(true);
  };

  const handleDeleteModal = (material: Material) => {
    console.log("Eliminando material:", material);
    setCurrentMaterial(material);
    setShowDeleteModal(true);
  };

  const handleDetailsModal = (material: Material) => {
    console.log("Viendo detalles del material:", material);
    setCurrentMaterial(material);
    setShowDetailsModal(true);
  };

  // Función para eliminar un material
  const handleDeleteMaterialConfirm = () => {
    if (!currentMaterial) return;
    
    console.log("Material eliminado:", currentMaterial);
    const updatedMateriales = materiales.filter(m => m.id !== currentMaterial.id);
    setMateriales(updatedMateriales);
    localStorage.setItem('materiales', JSON.stringify(updatedMateriales));
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-light min-vh-100">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Materiales de Estudio</h2>
          <Button variant="danger" onClick={handleAddModal}>
            <FaPlus className="me-1" /> Agregar Material
          </Button>
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
                            rel="noopener noreferrer"
                          >
                            <FaEye className="me-1" /> Ver
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            className="flex-grow-1 mt-1"
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
                            rel="noopener noreferrer"
                          >
                            <FaEye className="me-1" /> Ver
                          </Button>
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

      {/* Modales */}
      <VerMaterialModal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        material={currentMaterial as Material | undefined}
      />
      <EditarMaterialModal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
        }}
        material={undefined}
        onSave={(newMaterial) => {
          console.log("Guardando nuevo material:", newMaterial);
          const materialToAdd = {
            ...newMaterial,
            id: materiales.length > 0 ? Math.max(...materiales.map(m => m.id)) + 1 : 1,
            fechaPublicacion: new Date().toLocaleDateString('es-ES'),
            descargas: 0,
            vistas: 0
          };
          const newMateriales = [...materiales, materialToAdd];
          setMateriales(newMateriales);
          localStorage.setItem('materiales', JSON.stringify(newMateriales));
        }}
        materias={materias}
      />
      <EditarMaterialModal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
        }}
        material={currentMaterial as Material | undefined}
        onSave={(updatedMaterial) => {
          console.log("Actualizando material:", updatedMaterial);
          if (!currentMaterial) return;
          const updatedMateriales = materiales.map(m => 
            m.id === currentMaterial.id ? updatedMaterial : m
          );
          setMateriales(updatedMateriales);
          localStorage.setItem('materiales', JSON.stringify(updatedMateriales));
        }}
        materias={materias}
      />
      <EliminarMaterialModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        material={currentMaterial as Material | undefined}
        onDelete={() => {
          if (currentMaterial) {
            handleDeleteMaterialConfirm();
          }
        }}
      />
    </div>
  );
};

export default Material;
