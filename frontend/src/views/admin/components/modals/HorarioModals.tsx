import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Badge, InputGroup, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChalkboardTeacher, faDoorOpen, faClock, faCalendarDay, faPalette, faInfoCircle, faTrash, faSave, faTimes, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Clase {
  materia: string;
  profesor: string;
  aula: string;
  hora: string;
  dia: string;
  color: string;
  id?: string; // Opcional para identificación única
  notas?: string; // Notas opcionales para la clase
}

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

interface ModalClaseProps extends ModalProps {
  onSave: (clase: Clase) => void;
  clase?: Clase;
}

interface ModalEliminarProps extends ModalProps {
  onConfirm: () => void;
  clase: Clase;
}

// Colores disponibles para las clases
const colores = [
  { nombre: 'primary', label: 'Azul' },
  { nombre: 'secondary', label: 'Gris' },
  { nombre: 'success', label: 'Verde' },
  { nombre: 'danger', label: 'Rojo' },
  { nombre: 'warning', label: 'Amarillo' },
  { nombre: 'info', label: 'Celeste' },
  { nombre: 'dark', label: 'Negro' },
  { nombre: 'indigo', label: 'Índigo' },
  { nombre: 'purple', label: 'Morado' },
  { nombre: 'pink', label: 'Rosa' }
];

// Modal para agregar una nueva clase
export const ModalAgregar: React.FC<ModalClaseProps> = ({ show, onHide, onSave, clase }) => {
  const [formData, setFormData] = useState<Clase>({
    materia: clase?.materia || '',
    profesor: clase?.profesor || '',
    aula: clase?.aula || '',
    hora: clase?.hora || '',
    dia: clase?.dia || '',
    color: clase?.color || 'primary',
    notas: clase?.notas || ''
  });

  // Resetear el formulario cuando se abre el modal con datos preexistentes
  useEffect(() => {
    if (show && clase) {
      setFormData({
        materia: clase.materia || '',
        profesor: clase.profesor || '',
        aula: clase.aula || '',
        hora: clase.hora || '',
        dia: clase.dia || '',
        color: clase.color || 'primary',
        notas: clase.notas || ''
      });
    }
  }, [show, clase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={faPlus} className="me-2 text-primary" />
          Agregar Nueva Clase
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={7}>
              <div className="p-3 border rounded mb-3 bg-light">
                <h5 className="mb-3 border-bottom pb-2">Información de la Clase</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                    Materia
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.materia}
                    onChange={(e) => setFormData({...formData, materia: e.target.value})}
                    placeholder="Nombre de la materia"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2 text-primary" />
                    Profesor
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.profesor}
                    onChange={(e) => setFormData({...formData, profesor: e.target.value})}
                    placeholder="Nombre del profesor"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faDoorOpen} className="me-2 text-primary" />
                    Aula
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.aula}
                    onChange={(e) => setFormData({...formData, aula: e.target.value})}
                    placeholder="Número o nombre del aula"
                    required
                  />
                </Form.Group>
              </div>

              <div className="p-3 border rounded">
                <Form.Group className="mb-0">
                  <Form.Label>
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-primary" />
                    Notas adicionales
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.notas || ''}
                    onChange={(e) => setFormData({...formData, notas: e.target.value})}
                    placeholder="Información adicional de la clase (opcional)"
                  />
                </Form.Group>
              </div>
            </Col>
            
            <Col md={5}>
              <div className="p-3 border rounded mb-3 bg-light">
                <h5 className="mb-3 border-bottom pb-2">Horario</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faCalendarDay} className="me-2 text-primary" />
                    Día
                  </Form.Label>
                  <Form.Select 
                    value={formData.dia}
                    onChange={(e) => setFormData({...formData, dia: e.target.value})}
                    required
                    disabled={clase?.dia !== undefined}
                  >
                    <option value="">Seleccionar día</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faClock} className="me-2 text-primary" />
                    Hora
                  </Form.Label>
                  <Form.Select 
                    value={formData.hora}
                    onChange={(e) => setFormData({...formData, hora: e.target.value})}
                    required
                    disabled={clase?.hora !== undefined}
                  >
                    <option value="">Seleccionar horario</option>
                    <option value="6:00 - 6:50">6:00 - 6:50</option>
                    <option value="6:50 - 7:40">6:50 - 7:40</option>
                    <option value="7:40 - 8:30">7:40 - 8:30</option>
                    <option value="8:30 - 9:20">8:30 - 9:20</option>
                    <option value="9:20 - 10:10">9:20 - 10:10</option>
                    <option value="10:10 - 11:00">10:10 - 11:00</option>
                    <option value="11:00 - 11:50">11:00 - 11:50</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="p-3 border rounded">
                <Form.Group className="mb-2">
                  <Form.Label>
                    <FontAwesomeIcon icon={faPalette} className="me-2 text-primary" />
                    Color
                  </Form.Label>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {colores.map((color) => (
                      <OverlayTrigger
                        key={color.nombre}
                        placement="top"
                        overlay={<Tooltip>{color.label}</Tooltip>}
                      >
                        <div
                          onClick={() => setFormData({...formData, color: color.nombre})}
                          className={`rounded-circle p-3 bg-${color.nombre} ${formData.color === color.nombre ? 'border border-dark border-2' : ''}`}
                          style={{ cursor: 'pointer' }}
                        />
                      </OverlayTrigger>
                    ))}
                  </div>
                </Form.Group>

                <div className="border p-3 rounded mt-3 bg-light">
                  <h6 className="mb-2">Vista previa:</h6>
                  <div className={`p-2 rounded bg-${formData.color} bg-opacity-10 border border-${formData.color}`}>
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <Badge bg={formData.color}>
                        {formData.materia || 'Nombre de la materia'}
                      </Badge>
                    </div>
                    <small className="d-block text-muted">
                      {formData.profesor || 'Profesor'}<br />
                      Aula: {formData.aula || '000'}
                    </small>
                  </div>
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

// Modal para editar una clase existente
export const ModalEditar: React.FC<ModalClaseProps> = ({ show, onHide, onSave, clase }) => {
  const [formData, setFormData] = useState<Clase>({
    materia: '',
    profesor: '',
    aula: '',
    hora: '',
    dia: '',
    color: 'primary',
    notas: ''
  });

  // Actualizar el formulario cuando se selecciona una clase para editar
  useEffect(() => {
    if (clase && show) {
      setFormData({
        ...clase,
        notas: clase.notas || '' 
      });
    }
  }, [clase, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
          Editar Clase
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={7}>
              <div className="p-3 border rounded mb-3 bg-light">
                <h5 className="mb-3 border-bottom pb-2">Información de la Clase</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                    Materia
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.materia}
                    onChange={(e) => setFormData({...formData, materia: e.target.value})}
                    placeholder="Nombre de la materia"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2 text-primary" />
                    Profesor
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.profesor}
                    onChange={(e) => setFormData({...formData, profesor: e.target.value})}
                    placeholder="Nombre del profesor"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faDoorOpen} className="me-2 text-primary" />
                    Aula
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.aula}
                    onChange={(e) => setFormData({...formData, aula: e.target.value})}
                    placeholder="Número o nombre del aula"
                    required
                  />
                </Form.Group>
              </div>

              <div className="p-3 border rounded">
                <Form.Group className="mb-0">
                  <Form.Label>
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-primary" />
                    Notas adicionales
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.notas || ''}
                    onChange={(e) => setFormData({...formData, notas: e.target.value})}
                    placeholder="Información adicional de la clase (opcional)"
                  />
                </Form.Group>
              </div>
            </Col>
            
            <Col md={5}>
              <div className="p-3 border rounded mb-3 bg-light">
                <h5 className="mb-3 border-bottom pb-2">Horario</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faCalendarDay} className="me-2 text-primary" />
                    Día
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.dia}
                    disabled
                    readOnly
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FontAwesomeIcon icon={faClock} className="me-2 text-primary" />
                    Hora
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.hora}
                    disabled
                    readOnly
                  />
                </Form.Group>
              </div>

              <div className="p-3 border rounded">
                <Form.Group className="mb-2">
                  <Form.Label>
                    <FontAwesomeIcon icon={faPalette} className="me-2 text-primary" />
                    Color
                  </Form.Label>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {colores.map((color) => (
                      <OverlayTrigger
                        key={color.nombre}
                        placement="top"
                        overlay={<Tooltip>{color.label}</Tooltip>}
                      >
                        <div
                          onClick={() => setFormData({...formData, color: color.nombre})}
                          className={`rounded-circle p-3 bg-${color.nombre} ${formData.color === color.nombre ? 'border border-dark border-2' : ''}`}
                          style={{ cursor: 'pointer' }}
                        />
                      </OverlayTrigger>
                    ))}
                  </div>
                </Form.Group>

                <div className="border p-3 rounded mt-3 bg-light">
                  <h6 className="mb-2">Vista previa:</h6>
                  <div className={`p-2 rounded bg-${formData.color} bg-opacity-10 border border-${formData.color}`}>
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <Badge bg={formData.color}>
                        {formData.materia}
                      </Badge>
                    </div>
                    <small className="d-block text-muted">
                      {formData.profesor}<br />
                      Aula: {formData.aula}
                    </small>
                  </div>
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
            <FontAwesomeIcon icon={faSave} className="me-1" /> Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// Modal para eliminar una clase
export const ModalEliminar: React.FC<ModalEliminarProps> = ({ show, onHide, onConfirm, clase }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title className="text-danger">
          <FontAwesomeIcon icon={faTrash} className="me-2" />
          Eliminar Clase
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-warning">
          <h6 className="fw-bold">¿Está seguro que desea eliminar esta clase?</h6>
          <p className="mb-0">Esta acción no se puede deshacer.</p>
        </div>
        
        <div className="border p-3 rounded mt-3 mb-2">
          <h6 className="border-bottom pb-2 mb-3">Detalles de la clase a eliminar:</h6>
          <ListGroup variant="flush">
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Materia:</div>
                <div><Badge bg={clase.color}>{clase.materia}</Badge></div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Profesor:</div>
                <div>{clase.profesor}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Aula:</div>
                <div>{clase.aula}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 py-1">
              <div className="d-flex">
                <div className="fw-bold text-secondary me-2" style={{ width: '100px' }}>Horario:</div>
                <div>{clase.dia}, {clase.hora}</div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>
          <FontAwesomeIcon icon={faTimes} className="me-1" /> Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <FontAwesomeIcon icon={faTrash} className="me-1" /> Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Modal para configuración del horario
export const ModalConfiguracion: React.FC<ModalProps & { onSave: (config: any) => void, configActual?: any }> = ({ 
  show, 
  onHide, 
  onSave, 
  configActual 
}) => {
  const [config, setConfig] = useState({
    grado: configActual?.grado || '',
    anioEscolar: configActual?.anioEscolar || new Date().getFullYear(),
    directorGrupo: configActual?.directorGrupo || '',
    aulaPrincipal: configActual?.aulaPrincipal || '',
    notas: configActual?.notas || ''
  });

  useEffect(() => {
    if (show && configActual) {
      setConfig({
        grado: configActual.grado || '',
        anioEscolar: configActual.anioEscolar || new Date().getFullYear(),
        directorGrupo: configActual.directorGrupo || '',
        aulaPrincipal: configActual.aulaPrincipal || '',
        notas: configActual.notas || ''
      });
    }
  }, [show, configActual]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
            Configuración del Horario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <div className="p-3 border rounded mb-3 bg-light">
                <h5 className="mb-3 border-bottom pb-2">Información General</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Grado</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ej: 10° A" 
                    value={config.grado}
                    onChange={(e) => setConfig({...config, grado: e.target.value})}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Año Escolar</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="Ej: 2024" 
                    value={config.anioEscolar}
                    onChange={(e) => setConfig({...config, anioEscolar: parseInt(e.target.value)})}
                    required
                  />
                </Form.Group>
              </div>
            </Col>
            
            <Col md={6}>
              <div className="p-3 border rounded mb-3 bg-light">
                <h5 className="mb-3 border-bottom pb-2">Información del Aula</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Director de Grupo</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Nombre del director" 
                    value={config.directorGrupo}
                    onChange={(e) => setConfig({...config, directorGrupo: e.target.value})}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Aula Principal</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Número de aula" 
                    value={config.aulaPrincipal}
                    onChange={(e) => setConfig({...config, aulaPrincipal: e.target.value})}
                    required
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
          
          <div className="p-3 border rounded">
            <h5 className="mb-3 border-bottom pb-2">Notas Importantes</h5>
            <Form.Group className="mb-0">
              <Form.Control 
                as="textarea" 
                rows={4} 
                placeholder="Información adicional como horarios de recreo, notas sobre clases especiales, etc."
                value={config.notas}
                onChange={(e) => setConfig({...config, notas: e.target.value})}
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={onHide}>
            <FontAwesomeIcon icon={faTimes} className="me-1" /> Cancelar
          </Button>
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faSave} className="me-1" /> Guardar Configuración
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// Modal para eliminar todo el horario
export const ModalEliminarHorario: React.FC<ModalProps & { onConfirm: () => void }> = ({ show, onHide, onConfirm }) => {
  const [confirmText, setConfirmText] = useState('');
  const textToConfirm = 'ELIMINAR';
  
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title className="text-danger">
          <FontAwesomeIcon icon={faTrash} className="me-2" />
          Eliminar Horario Completo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">
          <h6 className="fw-bold">⚠️ Advertencia</h6>
          <p>Esta acción eliminará <strong>todas las clases</strong> programadas en el horario actual.</p>
          <p className="mb-0 fw-bold">Esta acción no se puede deshacer.</p>
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
          onClick={onConfirm} 
          disabled={confirmText !== textToConfirm}
        >
          <FontAwesomeIcon icon={faTrash} className="me-1" /> Eliminar Todo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
