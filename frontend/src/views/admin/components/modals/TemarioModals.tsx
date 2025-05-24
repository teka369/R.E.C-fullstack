import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Badge, ListGroup, Tabs, Tab, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, faChalkboardTeacher, faCalendarAlt, 
  faFileAlt, faTrash, faSave, faTimes, faEdit, 
  faPlus, faCheck, faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';

// Interfaces
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

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

interface TemarioModalProps extends ModalProps {
  temario?: Temario;
  onSave?: (temario: Temario) => void;
  onDelete?: (id: number) => void;
}

// Catálogos
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

// Modal para ver un temario
export const VerTemarioModal: React.FC<TemarioModalProps> = ({ show, onHide, temario }) => {
  if (!temario) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
          {temario.asignatura} - {temario.grado}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div>
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2 text-primary" />
                    Profesor
                  </div>
                  <div className="fw-bold">{temario.profesor}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div>
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-primary" />
                    Periodo
                  </div>
                  <div className="fw-bold">{temario.periodo}</div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div>
                    <FontAwesomeIcon icon={faFileAlt} className="me-2 text-primary" />
                    Estado
                  </div>
                  <Badge bg={
                    temario.estado === 'activo' ? 'success' : 
                    temario.estado === 'borrador' ? 'warning' : 'secondary'
                  }>
                    {temario.estado.charAt(0).toUpperCase() + temario.estado.slice(1)}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div>
                    <FontAwesomeIcon icon={faFileAlt} className="me-2 text-primary" />
                    Última actualización
                  </div>
                  <div className="fw-bold">{temario.fechaActualizacion}</div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>

        <h5 className="mb-3">Unidades Temáticas</h5>
        <Accordion>
          {temario.unidades.map((unidad, index) => (
            <Accordion.Item eventKey={index.toString()} key={unidad.id}>
              <Accordion.Header>
                {unidad.titulo} <span className="ms-2 text-muted">({unidad.duracion})</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className="mb-3">{unidad.descripcion}</p>
                
                <Tabs defaultActiveKey="objetivos" className="mb-3">
                  <Tab eventKey="objetivos" title="Objetivos">
                    <ListGroup variant="flush">
                      {unidad.objetivos.map((objetivo, i) => (
                        <ListGroup.Item key={i}>
                          <FontAwesomeIcon icon={faCheck} className="me-2 text-success" />
                          {objetivo}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>
                  <Tab eventKey="contenidos" title="Contenidos">
                    <ListGroup variant="flush">
                      {unidad.contenidos.map((contenido, i) => (
                        <ListGroup.Item key={i}>
                          <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                          {contenido}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>
                  <Tab eventKey="actividades" title="Actividades">
                    <ListGroup variant="flush">
                      {unidad.actividades.map((actividad, i) => (
                        <ListGroup.Item key={i}>
                          <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-info" />
                          {actividad}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>
                  <Tab eventKey="evaluacion" title="Evaluación">
                    <ListGroup variant="flush">
                      {unidad.evaluacion.map((evaluacionItem, i) => (
                        <ListGroup.Item key={i}>
                          <FontAwesomeIcon icon={faFileAlt} className="me-2 text-warning" />
                          {evaluacionItem}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>
                  <Tab eventKey="recursos" title="Recursos">
                    <ListGroup variant="flush">
                      {unidad.recursos.map((recurso, i) => (
                        <ListGroup.Item key={i}>
                          <FontAwesomeIcon icon={faBook} className="me-2 text-secondary" />
                          {recurso}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>
                </Tabs>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>
          <FontAwesomeIcon icon={faTimes} className="me-1" /> Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Modal para editar o crear un temario
export const EditarTemarioModal: React.FC<TemarioModalProps> = ({ show, onHide, temario, onSave }) => {
  const [formData, setFormData] = useState<Temario>({
    id: 0,
    asignatura: '',
    grado: '',
    profesor: '',
    periodo: '',
    fechaActualizacion: new Date().toLocaleDateString(),
    estado: 'borrador',
    unidades: []
  });

  const [unidadActual, setUnidadActual] = useState<Unidad>({
    id: 0,
    titulo: '',
    descripcion: '',
    objetivos: [''],
    contenidos: [''],
    actividades: [''],
    evaluacion: [''],
    duracion: '',
    recursos: ['']
  });

  useEffect(() => {
    if (temario) {
      setFormData(temario);
    } else {
      setFormData({
        id: Math.floor(Math.random() * 1000),
        asignatura: '',
        grado: '',
        profesor: '',
        periodo: '',
        fechaActualizacion: new Date().toLocaleDateString(),
        estado: 'borrador',
        unidades: []
      });
    }
  }, [temario, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('EditarTemarioModal - handleSubmit - onSave exists:', !!onSave);
    if (onSave) {
      onSave(formData);
    }
    onHide();
  };

  const handleAddUnidad = () => {
    setFormData({
      ...formData,
      unidades: [...formData.unidades, { ...unidadActual, id: Math.floor(Math.random() * 1000) }]
    });
    setUnidadActual({
      id: 0,
      titulo: '',
      descripcion: '',
      objetivos: [''],
      contenidos: [''],
      actividades: [''],
      evaluacion: [''],
      duracion: '',
      recursos: ['']
    });
  };

  const handleRemoveUnidad = (id: number) => {
    setFormData({
      ...formData,
      unidades: formData.unidades.filter(u => u.id !== id)
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      <Form onSubmit={handleSubmit}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
            {temario ? 'Editar Temario' : 'Nuevo Temario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Asignatura</Form.Label>
                <Form.Select
                  value={formData.asignatura}
                  onChange={(e) => setFormData({...formData, asignatura: e.target.value})}
                  required
                >
                  <option value="">Seleccionar asignatura</option>
                  {ASIGNATURAS_CATALOGO.map((asignatura, index) => (
                    <option key={index} value={asignatura}>{asignatura}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Grado</Form.Label>
                <Form.Select
                  value={formData.grado}
                  onChange={(e) => setFormData({...formData, grado: e.target.value})}
                  required
                >
                  <option value="">Seleccionar grado</option>
                  {GRADOS_CATALOGO.map((grado, index) => (
                    <option key={index} value={grado}>{grado}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
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
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Periodo</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.periodo}
                  onChange={(e) => setFormData({...formData, periodo: e.target.value})}
                  placeholder="Ej: 2025-1"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="border rounded p-3 mb-4">
            <h5 className="mb-3">Nueva Unidad Temática</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    value={unidadActual.titulo}
                    onChange={(e) => setUnidadActual({...unidadActual, titulo: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duración</Form.Label>
                  <Form.Control
                    type="text"
                    value={unidadActual.duracion}
                    onChange={(e) => setUnidadActual({...unidadActual, duracion: e.target.value})}
                    placeholder="Ej: 3 semanas"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={unidadActual.descripcion}
                onChange={(e) => setUnidadActual({...unidadActual, descripcion: e.target.value})}
              />
            </Form.Group>

            <Tabs defaultActiveKey="objetivos">
              <Tab eventKey="objetivos" title="Objetivos">
                {unidadActual.objetivos.map((objetivo, index) => (
                  <Form.Group key={index} className="mb-2">
                    <Form.Control
                      type="text"
                      value={objetivo}
                      onChange={(e) => {
                        const nuevosObjetivos = [...unidadActual.objetivos];
                        nuevosObjetivos[index] = e.target.value;
                        setUnidadActual({...unidadActual, objetivos: nuevosObjetivos});
                      }}
                      placeholder={`Objetivo ${index + 1}`}
                    />
                  </Form.Group>
                ))}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setUnidadActual({
                    ...unidadActual,
                    objetivos: [...unidadActual.objetivos, '']
                  })}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-1" /> Agregar Objetivo
                </Button>
              </Tab>

              <Tab eventKey="contenidos" title="Contenidos">
                {unidadActual.contenidos.map((contenido, index) => (
                  <Form.Group key={index} className="mb-2">
                    <Form.Control
                      type="text"
                      value={contenido}
                      onChange={(e) => {
                        const nuevosContenidos = [...unidadActual.contenidos];
                        nuevosContenidos[index] = e.target.value;
                        setUnidadActual({...unidadActual, contenidos: nuevosContenidos});
                      }}
                      placeholder={`Contenido ${index + 1}`}
                    />
                  </Form.Group>
                ))}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setUnidadActual({
                    ...unidadActual,
                    contenidos: [...unidadActual.contenidos, '']
                  })}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-1" /> Agregar Contenido
                </Button>
              </Tab>

              <Tab eventKey="actividades" title="Actividades">
                {unidadActual.actividades.map((actividad, index) => (
                  <Form.Group key={index} className="mb-2">
                    <Form.Control
                      type="text"
                      value={actividad}
                      onChange={(e) => {
                        const nuevasActividades = [...unidadActual.actividades];
                        nuevasActividades[index] = e.target.value;
                        setUnidadActual({...unidadActual, actividades: nuevasActividades});
                      }}
                      placeholder={`Actividad ${index + 1}`}
                    />
                  </Form.Group>
                ))}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setUnidadActual({
                    ...unidadActual,
                    actividades: [...unidadActual.actividades, '']
                  })}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-1" /> Agregar Actividad
                </Button>
              </Tab>

              <Tab eventKey="evaluacion" title="Evaluación">
                {unidadActual.evaluacion.map((evaluacionItem, index) => (
                  <Form.Group key={index} className="mb-2">
                    <Form.Control
                      type="text"
                      value={evaluacionItem}
                      onChange={(e) => {
                        const nuevaEvaluacion = [...unidadActual.evaluacion];
                        nuevaEvaluacion[index] = e.target.value;
                        setUnidadActual({...unidadActual, evaluacion: nuevaEvaluacion});
                      }}
                      placeholder={`Evaluación ${index + 1}`}
                    />
                  </Form.Group>
                ))}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setUnidadActual({
                    ...unidadActual,
                    evaluacion: [...unidadActual.evaluacion, '']
                  })}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-1" /> Agregar Evaluación
                </Button>
              </Tab>

              <Tab eventKey="recursos" title="Recursos">
                {unidadActual.recursos.map((recurso, index) => (
                  <Form.Group key={index} className="mb-2">
                    <Form.Control
                      type="text"
                      value={recurso}
                      onChange={(e) => {
                        const nuevosRecursos = [...unidadActual.recursos];
                        nuevosRecursos[index] = e.target.value;
                        setUnidadActual({...unidadActual, recursos: nuevosRecursos});
                      }}
                      placeholder={`Recurso ${index + 1}`}
                    />
                  </Form.Group>
                ))}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setUnidadActual({
                    ...unidadActual,
                    recursos: [...unidadActual.recursos, '']
                  })}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-1" /> Agregar Recurso
                </Button>
              </Tab>
            </Tabs>

            <div className="mt-3">
              <Button
                variant="primary"
                onClick={handleAddUnidad}
                disabled={!unidadActual.titulo || !unidadActual.descripcion}
              >
                <FontAwesomeIcon icon={faPlus} className="me-1" /> Agregar Unidad
              </Button>
            </div>
          </div>

          <div className="border rounded p-3">
            <h5 className="mb-3">Unidades Agregadas</h5>
            {formData.unidades.length > 0 ? (
              <ListGroup>
                {formData.unidades.map((unidad) => (
                  <ListGroup.Item key={unidad.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{unidad.titulo}</strong>
                      <small className="d-block text-muted">{unidad.duracion}</small>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveUnidad(unidad.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-muted mb-0">No hay unidades agregadas</p>
            )}
          </div>
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

// Modal para eliminar un temario
export const EliminarTemarioModal: React.FC<TemarioModalProps> = ({ show, onHide, temario, onDelete }) => {
  const [confirmText, setConfirmText] = useState('');
  const textToConfirm = 'ELIMINAR';

  if (!temario) return null;

  const handleConfirm = () => {
    console.log('EliminarTemarioModal - handleConfirm - onDelete exists:', !!onDelete);
    if (onDelete) {
      onDelete(temario.id);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title className="text-danger">
          <FontAwesomeIcon icon={faTrash} className="me-2" />
          Eliminar Temario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-warning">
          <h6 className="fw-bold">¿Está seguro que desea eliminar este temario?</h6>
          <p className="mb-0">Esta acción no se puede deshacer.</p>
        </div>

        <div className="border p-3 rounded mt-3 mb-2">
          <h6 className="border-bottom pb-2 mb-3">Detalles del temario a eliminar:</h6>
          <ListGroup variant="flush">
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Asignatura:</div>
                <div>{temario.asignatura}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Grado:</div>
                <div>{temario.grado}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Profesor:</div>
                <div>{temario.profesor}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Unidades:</div>
                <div>{temario.unidades.length}</div>
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
export const useTemarioModals = () => {
  const [showVer, setShowVer] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [temarioSeleccionado, setTemarioSeleccionado] = useState<Temario | undefined>();
  const [onSaveCallback, setOnSaveCallback] = useState<((temario: Temario) => void) | undefined>();
  const [onDeleteCallback, setOnDeleteCallback] = useState<((id: number) => void) | undefined>();

  const handleViewTemario = (temario: Temario) => {
    setTemarioSeleccionado(temario);
    setShowVer(true);
  };

  const handleEditTemario = (temario: Temario | null, onSave?: (temario: Temario) => void) => {
    setTemarioSeleccionado(temario || undefined);
    setOnSaveCallback(() => onSave);
    setShowEditar(true);
  };

  const handleDeleteTemario = (temario: Temario, onDelete?: (id: number) => void) => {
    setTemarioSeleccionado(temario);
    setOnDeleteCallback(() => onDelete);
    setShowEliminar(true);
  };

  const handleSaveTemario = (temario: Temario) => {
    console.log('useTemarioModals - handleSaveTemario - onSaveCallback exists:', !!onSaveCallback);
    if (onSaveCallback) {
      onSaveCallback(temario);
    }
    setShowEditar(false);
  };

  const handleConfirmDelete = (id: number) => {
    console.log('useTemarioModals - handleConfirmDelete - onDeleteCallback exists:', !!onDeleteCallback);
    if (onDeleteCallback) {
      onDeleteCallback(id);
    }
    setShowEliminar(false);
  };

  const modals = (
    <>
      <VerTemarioModal
        show={showVer}
        onHide={() => setShowVer(false)}
        temario={temarioSeleccionado}
      />
      <EditarTemarioModal
        show={showEditar}
        onHide={() => setShowEditar(false)}
        temario={temarioSeleccionado}
        onSave={handleSaveTemario}
      />
      <EliminarTemarioModal
        show={showEliminar}
        onHide={() => setShowEliminar(false)}
        temario={temarioSeleccionado}
        onDelete={handleConfirmDelete}
      />
    </>
  );

  return {
    modals,
    handleViewTemario,
    handleEditTemario,
    handleDeleteTemario
  };
};
