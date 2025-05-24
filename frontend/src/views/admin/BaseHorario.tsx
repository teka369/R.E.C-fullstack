  import React, { useState } from 'react';
  import { Container, Table, Card, Badge, Button, Row, Col, ButtonGroup, Dropdown, Form } from 'react-bootstrap';
  import { Link } from 'react-router-dom';
  import { 
    ModalAgregar, 
    ModalEditar, 
    ModalEliminar,
    ModalConfiguracion,
    ModalEliminarHorario 
  } from './components/modals/HorarioModals';

  interface Clase {
    materia: string;
    profesor: string;
    aula: string;
    hora: string;
    dia: string;
    color: string;
  }

  interface NotaImportante {
    id: number;
    texto: string;
  }

  const Horario: React.FC = () => {
    // Estado inicial vacío
    const [clases, setClases] = useState<Clase[]>([]);
    const [notasImportantes, setNotasImportantes] = useState<NotaImportante[]>([
      { id: 1, texto: 'El recreo es de 10:00 a 10:30 todos los días.' },
      { id: 2, texto: 'Las clases de Educación Física requieren uniforme deportivo.' },
      { id: 3, texto: 'La sala de computación estará disponible durante los recreos para trabajos.' },
      { id: 4, texto: 'Las tutorías adicionales se programan los viernes en la tarde.' }
    ]);
    const [nuevaNota, setNuevaNota] = useState('');
    const [editandoNota, setEditandoNota] = useState<number | null>(null);
    const [notaEditada, setNotaEditada] = useState('');
    const [gradoSeleccionado, setGradoSeleccionado] = useState('10-1');

    // Estados para los modales
    const [showModalAgregar, setShowModalAgregar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [claseSeleccionada, setClaseSeleccionada] = useState<Clase | undefined>();

    // Horas de clase
    const horas = ['7:00 - 8:30', '8:30 - 10:00', '10:30 - 12:00', '12:00 - 13:30'];
    
    // Días de la semana
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    // Función para generar opciones de grado
    const generarOpcionesGrado = () => {
      const grados = [6, 7, 8, 9, 10, 11];
      const grupos = ['1', '2', '3'];
      const opciones = [];

      for (const grado of grados) {
        for (const grupo of grupos) {
          opciones.push(`${grado}-${grupo}`);
        }
      }

      return opciones;
    };

    // Función para obtener la clase según el día y la hora
    const getClase = (dia: string, hora: string) => {
      return clases.find(clase => clase.dia === dia && clase.hora === hora);
    };

    // Funciones para gestionar las clases
    const handleAgregarClase = (nuevaClase: Clase) => {
      // Verificar si ya existe una clase en ese horario
      const claseExistente = clases.find(
        c => c.dia === nuevaClase.dia && c.hora === nuevaClase.hora
      );

      if (claseExistente) {
        alert('Ya existe una clase en este horario. Por favor, seleccione otro horario.');
        return;
      }

      setClases([...clases, nuevaClase]);
      setShowModalAgregar(false);
    };

    const handleEditarClase = (claseEditada: Clase) => {
      setClases(clases.map(c => 
        (c.dia === claseSeleccionada?.dia && c.hora === claseSeleccionada?.hora) ? 
        { ...claseEditada, dia: claseSeleccionada.dia, hora: claseSeleccionada.hora } : c
      ));
      setShowModalEditar(false);
    };

    const handleEliminarClase = () => {
      if (claseSeleccionada) {
        setClases(clases.filter(c => 
          !(c.dia === claseSeleccionada.dia && c.hora === claseSeleccionada.hora)
        ));
        setShowModalEliminar(false);
      }
    };

    // Funciones para gestionar notas importantes
    const handleAgregarNota = () => {
      if (nuevaNota.trim()) {
        setNotasImportantes([
          ...notasImportantes,
          { id: Date.now(), texto: nuevaNota.trim() }
        ]);
        setNuevaNota('');
      }
    };

    const handleEditarNota = (id: number) => {
      if (notaEditada.trim()) {
        setNotasImportantes(notasImportantes.map(nota =>
          nota.id === id ? { ...nota, texto: notaEditada.trim() } : nota
        ));
        setEditandoNota(null);
        setNotaEditada('');
      }
    };

    const handleEliminarNota = (id: number) => {
      setNotasImportantes(notasImportantes.filter(nota => nota.id !== id));
    };

    return (
      <div className="bg-light min-vh-100">
        <Container className="py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Horario de Clases</h2>
            <div className="d-flex gap-3">
              <Form.Select
                value={gradoSeleccionado}
                onChange={(e) => setGradoSeleccionado(e.target.value)}
                style={{ width: 'auto' }}
              >
                {generarOpcionesGrado().map((grado) => (
                  <option key={grado} value={grado}>
                    Grado {grado}
                  </option>
                ))}
              </Form.Select>
              <Button 
                variant="primary" 
                onClick={() => {
                  setClaseSeleccionada(undefined);
                  setShowModalAgregar(true);
                }}
              >
                Agregar Clase
              </Button>
            </div>
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
                                    <div>
                                      <Button
                                        variant="link"
                                        size="sm"
                                        className="p-0 me-2"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setClaseSeleccionada(clase);
                                          setShowModalEditar(true);
                                        }}
                                      >
                                        ✏️
                                      </Button>
                                      <Button
                                        variant="link"
                                        size="sm"
                                        className="p-0 text-danger"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setClaseSeleccionada(clase);
                                          setShowModalEliminar(true);
                                        }}
                                      >
                                        🗑️
                                      </Button>
                                    </div>
                                  </div>
                                  <small className="d-block text-muted">
                                    {clase.profesor}<br />
                                    Aula: {clase.aula}
                                  </small>
                                </div>
                              ) : (
                                <div 
                                  className="p-2 text-center text-muted"
                                  style={{ cursor: 'pointer', minHeight: '80px' }}
                                  onClick={() => {
                                    setClaseSeleccionada({
                                      materia: '',
                                      profesor: '',
                                      aula: '',
                                      hora: hora,
                                      dia: dia,
                                      color: 'primary'
                                    });
                                    setShowModalAgregar(true);
                                  }}
                                >
                                  <div className="h-100 d-flex align-items-center justify-content-center">
                                    <span className="text-muted">+ Agregar clase</span>
                                  </div>
                                </div>
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
                      <strong>Grado:</strong> {gradoSeleccionado}
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
                  <div className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Agregar nueva nota"
                      value={nuevaNota}
                      onChange={(e) => setNuevaNota(e.target.value)}
                      className="mb-2"
                    />
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={handleAgregarNota}
                    >
                      Agregar Nota
                    </Button>
                  </div>
                  <ul className="list-unstyled">
                    {notasImportantes.map((nota) => (
                      <li key={nota.id} className="mb-2 d-flex align-items-center">
                        {editandoNota === nota.id ? (
                          <>
                            <Form.Control
                              type="text"
                              value={notaEditada}
                              onChange={(e) => setNotaEditada(e.target.value)}
                              className="me-2"
                            />
                            <Button
                              variant="outline-success"
                              size="sm"
                              className="me-1"
                              onClick={() => handleEditarNota(nota.id)}
                            >
                              ✓
                            </Button>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => {
                                setEditandoNota(null);
                                setNotaEditada('');
                              }}
                            >
                              ✕
                            </Button>
                          </>
                        ) : (
                          <>
                            <span className="flex-grow-1">{nota.texto}</span>
                            <Button
                              variant="link"
                              size="sm"
                              className="text-primary me-1"
                              onClick={() => {
                                setEditandoNota(nota.id);
                                setNotaEditada(nota.texto);
                              }}
                            >
                              ✏️
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              className="text-danger"
                              onClick={() => handleEliminarNota(nota.id)}
                            >
                              🗑️
                            </Button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Modales */}
          <ModalAgregar
            show={showModalAgregar}
            onHide={() => setShowModalAgregar(false)}
            onSave={handleAgregarClase}
            clase={claseSeleccionada}
          />

          {claseSeleccionada && (
            <>
              <ModalEditar
                show={showModalEditar}
                onHide={() => setShowModalEditar(false)}
                onSave={handleEditarClase}
                clase={claseSeleccionada}
              />

              <ModalEliminar
                show={showModalEliminar}
                onHide={() => setShowModalEliminar(false)}
                onConfirm={handleEliminarClase}
                clase={claseSeleccionada}
              />
            </>
          )}
        </Container>
      </div>
    );
  };

  export default Horario;
