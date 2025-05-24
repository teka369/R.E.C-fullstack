import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye, faEdit, faTrash, faSave, faTimes, 
  faCheckCircle, faExclamationTriangle, faInfoCircle, faStar,
  faUser, faBook, faCalendarAlt, faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';

// Interfaces
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

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

interface ObservacionModalProps extends ModalProps {
  observacion?: Observacion;
  onSave?: (observacion: Observacion) => void;
  onDelete?: (observacion: Observacion) => void;
}

// Catálogos
const TIPOS_OBSERVACION = [
  { value: 'positiva', label: 'Positiva', icon: faCheckCircle, color: 'success' },
  { value: 'negativa', label: 'Negativa', icon: faExclamationTriangle, color: 'danger' },
  { value: 'informativa', label: 'Informativa', icon: faInfoCircle, color: 'info' },
  { value: 'seguimiento', label: 'Seguimiento', icon: faStar, color: 'warning' }
];

const ESTADOS_OBSERVACION = [
  { value: 'pendiente', label: 'Pendiente', color: 'warning' },
  { value: 'atendida', label: 'Atendida', color: 'success' },
  { value: 'archivada', label: 'Archivada', color: 'secondary' }
];

const GRADOS_CATALOGO = [
  '6-1', '6-2', '6-3',
  '7-1', '7-2', '7-3',
  '8-1', '8-2', '8-3',
  '9-1', '9-2', '9-3',
  '10-1', '10-2', '10-3',
  '11-1', '11-2', '11-3'
];

const ASIGNATURAS_CATALOGO = [
  'Matemáticas', 'Español', 'Inglés', 'Ciencias Naturales', 'Historia', 'Geografía',
  'Educación Física', 'Artes', 'Formación Cívica y Ética', 'Biología', 'Física', 'Química',
  'Literatura', 'Informática', 'Educación Artística'
];

// Modal para ver una observación
export const VerObservacionModal: React.FC<ObservacionModalProps> = ({ show, onHide, observacion }) => {
  if (!observacion) return null;

  const getTipoIcon = (tipo: string) => {
    const tipoInfo = TIPOS_OBSERVACION.find(t => t.value === tipo);
    return tipoInfo ? <FontAwesomeIcon icon={tipoInfo.icon} className="me-2" /> : null;
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={faEye} className="me-2 text-primary" />
          Detalles de la Observación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-4">
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
                  Estudiante
                </div>
                <div className="fw-bold">{observacion.estudiante}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                  Curso
                </div>
                <div className="fw-bold">{observacion.curso}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-primary" />
                  Fecha
                </div>
                <div className="fw-bold">{observacion.fecha}</div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2 text-primary" />
                  Profesor
                </div>
                <div className="fw-bold">{observacion.profesor}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                  Asignatura
                </div>
                <div className="fw-bold">{observacion.asignatura}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-primary" />
                  Estado
                </div>
                <Badge bg={ESTADOS_OBSERVACION.find(e => e.value === observacion.estado)?.color}>
                  {observacion.estado.charAt(0).toUpperCase() + observacion.estado.slice(1)}
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <div className="border rounded p-3">
          <h6 className="mb-3">Tipo de Observación</h6>
          <Badge bg={TIPOS_OBSERVACION.find(t => t.value === observacion.tipo)?.color} className="mb-3">
            {getTipoIcon(observacion.tipo)}
            {observacion.tipo.charAt(0).toUpperCase() + observacion.tipo.slice(1)}
          </Badge>

          <h6 className="mb-3">Descripción</h6>
          <p className="mb-0">{observacion.descripcion}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>
          <FontAwesomeIcon icon={faTimes} className="me-1" /> Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Modal para editar o crear una observación
export const EditarObservacionModal: React.FC<ObservacionModalProps> = ({ show, onHide, observacion, onSave }) => {
  const [formData, setFormData] = useState<Observacion>({
    id: 0,
    estudiante: '',
    curso: '',
    fecha: new Date().toLocaleDateString(),
    tipo: 'informativa',
    asignatura: '',
    profesor: '',
    descripcion: '',
    estado: 'pendiente'
  });

  React.useEffect(() => {
    if (observacion) {
      setFormData(observacion);
    } else {
      setFormData({
        id: 0,
        estudiante: '',
        curso: '',
        fecha: new Date().toLocaleDateString(),
        tipo: 'informativa',
        asignatura: '',
        profesor: '',
        descripcion: '',
        estado: 'pendiente'
      });
    }
  }, [observacion, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('EditarObservacionModal - handleSubmit - onSave exists:', !!onSave);
    if (onSave) {
      onSave(formData);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
            {observacion ? 'Editar Observación' : 'Nueva Observación'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estudiante</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.estudiante}
                  onChange={(e) => setFormData({...formData, estudiante: e.target.value})}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Curso</Form.Label>
                <Form.Select
                  value={formData.curso}
                  onChange={(e) => setFormData({...formData, curso: e.target.value})}
                  required
                >
                  <option value="">Seleccione un grado</option>
                  {GRADOS_CATALOGO.map((grado) => (
                    <option key={grado} value={grado}>Grado {grado}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Asignatura</Form.Label>
                <Form.Select
                  value={formData.asignatura}
                  onChange={(e) => setFormData({...formData, asignatura: e.target.value})}
                  required
                >
                  <option value="">Seleccione una asignatura</option>
                  {ASIGNATURAS_CATALOGO.map((asignatura) => (
                    <option key={asignatura} value={asignatura}>{asignatura}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Profesor</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.profesor}
                  onChange={(e) => setFormData({...formData, profesor: e.target.value})}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Observación</Form.Label>
                <Form.Select
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value as Observacion['tipo']})}
                  required
                >
                  {TIPOS_OBSERVACION.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value as Observacion['estado']})}
                  required
                >
                  {ESTADOS_OBSERVACION.map((estado) => (
                    <option key={estado.value} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              required
            />
          </Form.Group>
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

// Modal para eliminar una observación
export const EliminarObservacionModal: React.FC<ObservacionModalProps> = ({ show, onHide, observacion, onDelete }) => {
  const [confirmText, setConfirmText] = useState('');
  const textToConfirm = 'ELIMINAR';

  const handleConfirm = () => {
    console.log('EliminarObservacionModal - handleConfirm - onDelete exists:', !!onDelete);
    console.log('EliminarObservacionModal - handleConfirm - observacion:', observacion);
    if (observacion && onDelete) {
      onDelete(observacion);
    }
    setConfirmText('');
    onHide();
  };

  if (!observacion) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={faTrash} className="me-2 text-danger" />
          Eliminar Observación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-warning">
          <h6 className="fw-bold">¿Está seguro que desea eliminar esta observación?</h6>
          <p className="mb-0">Esta acción no se puede deshacer.</p>
        </div>

        <div className="border p-3 rounded mt-3 mb-2">
          <h6 className="border-bottom pb-2 mb-3">Detalles de la observación a eliminar:</h6>
          <ListGroup variant="flush">
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Estudiante:</div>
                <div>{observacion.estudiante}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Curso:</div>
                <div>{observacion.curso}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Asignatura:</div>
                <div>{observacion.asignatura}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Tipo:</div>
                <div>{observacion.tipo.charAt(0).toUpperCase() + observacion.tipo.slice(1)}</div>
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
export const useObservacionModals = () => {
  const [showVer, setShowVer] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [observacionSeleccionada, setObservacionSeleccionada] = useState<Observacion | undefined>();
  const [onSaveCallback, setOnSaveCallback] = useState<((observacion: Observacion) => void) | undefined>();
  const [onDeleteCallback, setOnDeleteCallback] = useState<((observacion: Observacion) => void) | undefined>();

  const handleViewObservacion = (observacion: Observacion) => {
    setObservacionSeleccionada(observacion);
    setShowVer(true);
  };

  const handleEditObservacion = (observacion: Observacion | null, onSave?: (observacion: Observacion) => void) => {
    setObservacionSeleccionada(observacion || undefined);
    setOnSaveCallback(() => onSave);
    setShowEditar(true);
  };

  const handleDeleteObservacion = (observacion: Observacion, onDelete?: (observacion: Observacion) => void) => {
    setObservacionSeleccionada(observacion);
    setOnDeleteCallback(() => onDelete);
    setShowEliminar(true);
  };

  const handleSaveObservacion = (observacion: Observacion) => {
    console.log('useObservacionModals - handleSaveObservacion - onSaveCallback exists:', !!onSaveCallback);
    if (onSaveCallback) {
      onSaveCallback(observacion);
    }
    setShowEditar(false);
  };

  const handleConfirmDelete = (observacion: Observacion) => {
    console.log('useObservacionModals - handleConfirmDelete - onDeleteCallback exists:', !!onDeleteCallback);
    if (onDeleteCallback) {
      onDeleteCallback(observacion);
    }
    setShowEliminar(false);
  };

  const modals = (
    <>
      <VerObservacionModal
        show={showVer}
        onHide={() => setShowVer(false)}
        observacion={observacionSeleccionada}
      />
      <EditarObservacionModal
        show={showEditar}
        onHide={() => setShowEditar(false)}
        observacion={observacionSeleccionada}
        onSave={handleSaveObservacion}
      />
      <EliminarObservacionModal
        show={showEliminar}
        onHide={() => setShowEliminar(false)}
        observacion={observacionSeleccionada}
        onDelete={handleConfirmDelete}
      />
    </>
  );

  return {
    modals,
    handleViewObservacion,
    handleEditObservacion,
    handleDeleteObservacion
  };
};
