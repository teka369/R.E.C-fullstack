import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Badge, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, faVideo, faFilePdf, faFileAlt, faDownload, 
  faEye, faTrash, faSave, faTimes, faEdit, faPlus, 
  faInfoCircle, faUser, faCalendarAlt, faLink, faImage 
} from '@fortawesome/free-solid-svg-icons';

// Interfaces
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

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

interface MaterialModalProps extends ModalProps {
  material?: Material;
  onSave?: (material: Material) => void;
  onDelete?: (id: number) => void;
  materias?: string[];
}

// Catálogos
const TIPOS_MATERIAL = [
  { value: 'libro', label: 'Libro', icon: faBook, color: 'primary' },
  { value: 'video', label: 'Video', icon: faVideo, color: 'danger' },
  { value: 'documento', label: 'Documento', icon: faFilePdf, color: 'success' },
  { value: 'presentacion', label: 'Presentación', icon: faFileAlt, color: 'warning' }
];

// Funciones de utilidad
const getTipoIcon = (tipo: string) => {
  const tipoInfo = TIPOS_MATERIAL.find(t => t.value === tipo);
  return tipoInfo ? <FontAwesomeIcon icon={tipoInfo.icon} className="me-2" /> : null;
};

const getTipoColor = (tipo: string) => {
  return TIPOS_MATERIAL.find(t => t.value === tipo)?.color || 'secondary';
};

const getTipoLabel = (tipo: string) => {
  return tipo.charAt(0).toUpperCase() + tipo.slice(1);
};

// Modal para ver un material
export const VerMaterialModal: React.FC<MaterialModalProps> = ({ show, onHide, material }) => {
  if (!material) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={faEye} className="me-2 text-primary" />
          Detalles del Material
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <img 
            src={material.imagen || `https://via.placeholder.com/400x200?text=${material.tipo}`} 
            alt={material.titulo}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: '200px' }}
          />
        </div>

        <Row className="mb-4">
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                  Título
                </div>
                <div className="fw-bold">{material.titulo}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
                  Autor
                </div>
                <div className="fw-bold">{material.autor}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-primary" />
                  Fecha de publicación
                </div>
                <div className="fw-bold">{material.fechaPublicacion}</div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                  Materia
                </div>
                <div className="fw-bold">{material.materia}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faEye} className="me-2 text-primary" />
                  Vistas
                </div>
                <div className="fw-bold">{material.vistas}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faDownload} className="me-2 text-primary" />
                  Descargas
                </div>
                <div className="fw-bold">{material.descargas}</div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <div className="border rounded p-3">
          <h6 className="mb-3">Tipo de Material</h6>
          <Badge bg={getTipoColor(material.tipo)} className="mb-3">
            {getTipoIcon(material.tipo)}
            {getTipoLabel(material.tipo)}
          </Badge>

          <h6 className="mb-3">Descripción</h6>
          <p className="mb-3">{material.descripcion}</p>

          <h6 className="mb-3">Enlace</h6>
          <p className="mb-0">
            <a href={material.enlace} target="_blank" rel="noopener noreferrer" className="text-break">
              <FontAwesomeIcon icon={faLink} className="me-2" />
              {material.enlace}
            </a>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>
          <FontAwesomeIcon icon={faTimes} className="me-1" /> Cerrar
        </Button>
        <Button 
          variant="primary" 
          as="a"
          href={material.enlace}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faEye} className="me-1" /> Ver Material
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Modal para editar o crear un material
export const EditarMaterialModal: React.FC<MaterialModalProps> = ({ show, onHide, material, onSave, materias = [] }) => {
  const [formData, setFormData] = useState<Material>({
    id: 0,
    titulo: '',
    descripcion: '',
    tipo: 'documento',
    materia: '',
    autor: '',
    fechaPublicacion: new Date().toLocaleDateString(),
    descargas: 0,
    vistas: 0,
    imagen: '',
    enlace: ''
  });

  // Actualizar el formulario cuando cambia el material o se muestra el modal
  useEffect(() => {
    if (material && show) {
      console.log("Cargando material para editar:", material);
      setFormData({...material});
    } else if (show && !material) {
      console.log("Configurando formulario para nuevo material");
      setFormData({
        id: Math.floor(Math.random() * 1000),
        titulo: '',
        descripcion: '',
        tipo: 'documento',
        materia: '',
        autor: '',
        fechaPublicacion: new Date().toLocaleDateString(),
        descargas: 0,
        vistas: 0,
        imagen: '',
        enlace: ''
      });
    }
  }, [material, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando formulario con datos:", formData);
    if (onSave) {
      // Clonamos el objeto para evitar problemas de mutación
      const materialToSave = { ...formData };
      onSave(materialToSave);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
            {material ? 'Editar Material' : 'Nuevo Material'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <div className="p-3 border rounded mb-3 bg-light">
                <h5 className="mb-3 border-bottom pb-2">Información del Material</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                    Título
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
                    Autor
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="autor"
                    value={formData.autor}
                    onChange={(e) => setFormData({...formData, autor: e.target.value})}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                    Materia
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="materia"
                    value={formData.materia}
                    onChange={(e) => setFormData({...formData, materia: e.target.value})}
                    required
                    list="materias-list"
                  />
                  <datalist id="materias-list">
                    {materias.filter(m => m !== 'todas').map((materia, idx) => (
                      <option key={idx} value={materia} />
                    ))}
                  </datalist>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-primary" />
                    Descripción
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="descripcion"
                    rows={3}
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    required
                  />
                </Form.Group>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="p-3 border rounded mb-3 bg-light">
                <h5 className="mb-3 border-bottom pb-2">Tipo y Enlaces</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                    Tipo
                  </Form.Label>
                  <Form.Select
                    name="tipo"
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value as Material['tipo']})}
                    required
                  >
                    {TIPOS_MATERIAL.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faImage} className="me-2 text-primary" />
                    URL de la imagen
                  </Form.Label>
                  <Form.Control
                    type="url"
                    name="imagen"
                    value={formData.imagen}
                    onChange={(e) => setFormData({...formData, imagen: e.target.value})}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faLink} className="me-2 text-primary" />
                    Enlace al material
                  </Form.Label>
                  <Form.Control
                    type="url"
                    name="enlace"
                    value={formData.enlace}
                    onChange={(e) => setFormData({...formData, enlace: e.target.value})}
                    required
                    placeholder="https://ejemplo.com/material"
                  />
                </Form.Group>
              </div>

              <div className="p-3 border rounded">
                <h6 className="mb-3">Vista previa</h6>
                <div className={`p-2 rounded bg-${getTipoColor(formData.tipo)} bg-opacity-10 border border-${getTipoColor(formData.tipo)}`}>
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <Badge bg={getTipoColor(formData.tipo)}>
                      {getTipoIcon(formData.tipo)}
                      {getTipoLabel(formData.tipo)}
                    </Badge>
                  </div>
                  <h6 className="mb-1">{formData.titulo || 'Título del material'}</h6>
                  <small className="d-block text-muted">
                    {formData.autor || 'Autor'}<br />
                    {formData.materia || 'Materia'}
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={onHide}>
            <FontAwesomeIcon icon={faTimes} className="me-1" /> Cancelar
          </Button>
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faSave} className="me-1" /> Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// Modal para eliminar un material
export const EliminarMaterialModal: React.FC<MaterialModalProps> = ({ show, onHide, material, onDelete }) => {
  const [confirmText, setConfirmText] = useState('');
  const textToConfirm = 'ELIMINAR';

  if (!material) return null;

  const handleConfirm = () => {
    if (onDelete) {
      onDelete(material.id);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title className="text-danger">
          <FontAwesomeIcon icon={faTrash} className="me-2" />
          Eliminar Material
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-warning">
          <h6 className="fw-bold">¿Está seguro que desea eliminar este material?</h6>
          <p className="mb-0">Esta acción no se puede deshacer.</p>
        </div>

        <div className="border p-3 rounded mt-3 mb-2">
          <h6 className="border-bottom pb-2 mb-3">Detalles del material a eliminar:</h6>
          <ListGroup variant="flush">
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Título:</div>
                <div>{material.titulo}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Tipo:</div>
                <div>
                  <Badge bg={getTipoColor(material.tipo)}>
                    {getTipoIcon(material.tipo)}
                    {getTipoLabel(material.tipo)}
                  </Badge>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Materia:</div>
                <div>{material.materia}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Autor:</div>
                <div>{material.autor}</div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>

        <div className="mt-3">
          <p>Para confirmar, escriba <strong>"{textToConfirm}"</strong> en el campo de abajo:</p>
          <Form.Group>
            <Form.Control
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={textToConfirm}
            />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>
          <FontAwesomeIcon icon={faTimes} className="me-1" /> Cancelar
        </Button>
        <Button 
          variant="danger" 
          onClick={handleConfirm}
          disabled={confirmText !== textToConfirm}
        >
          <FontAwesomeIcon icon={faTrash} className="me-1" /> Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Hook personalizado para gestionar los modales
export const useMaterialModals = () => {
  const [showVer, setShowVer] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [materialSeleccionado, setMaterialSeleccionado] = useState<Material | undefined>();
  const [onSaveCallback, setOnSaveCallback] = useState<((material: Material) => void) | undefined>();
  const [onDeleteCallback, setOnDeleteCallback] = useState<((id: number) => void) | undefined>();

  const handleViewMaterial = (material: Material) => {
    setMaterialSeleccionado(material);
    setShowVer(true);
  };

  const handleEditMaterial = (material: Material | null, onSave?: (material: Material) => void) => {
    setMaterialSeleccionado(material || undefined);
    if (onSave) {
      setOnSaveCallback(() => onSave);
    }
    setShowEditar(true);
  };

  const handleDeleteMaterial = (material: Material, onDelete?: (id: number) => void) => {
    setMaterialSeleccionado(material);
    if (onDelete) {
      setOnDeleteCallback(() => onDelete);
    }
    setShowEliminar(true);
  };

  const handleSaveMaterial = (material: Material) => {
    if (onSaveCallback) {
      onSaveCallback(material);
    }
    setShowEditar(false);
  };

  const handleConfirmDelete = (id: number) => {
    if (onDeleteCallback) {
      onDeleteCallback(id);
    }
    setShowEliminar(false);
  };

  const modals = (
    <>
      <VerMaterialModal
        show={showVer}
        onHide={() => setShowVer(false)}
        material={materialSeleccionado}
      />
      <EditarMaterialModal
        show={showEditar}
        onHide={() => setShowEditar(false)}
        material={materialSeleccionado}
        onSave={handleSaveMaterial}
      />
      <EliminarMaterialModal
        show={showEliminar}
        onHide={() => setShowEliminar(false)}
        material={materialSeleccionado}
        onDelete={handleConfirmDelete}
      />
    </>
  );

  return {
    modals,
    handleViewMaterial,
    handleEditMaterial,
    handleDeleteMaterial
  };
};
