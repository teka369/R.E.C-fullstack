import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../assets/main/styles/Principal.css';

const App = () => {
  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar estado de autenticación al cargar el componente
  useEffect(() => {
    const userAuthenticated = localStorage.getItem('userAuthenticated');
    if (userAuthenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="app-container">
      {/* Enhanced Header with Parallax Effect */}
      <header className="app-header">
        <div className="header-overlay"></div>
        <div className="container text-center">
          <h1 className="app-title">R.E.C</h1>
          <p className="header-subtitle">Refuerzo Educativo Complementario</p>
          <div className="mt-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn btn-light btn-lg me-3">Iniciar Sesión</Link>
                <Link to="/registro" className="btn btn-outline-light btn-lg">Registrarse</Link>
              </>
            ) : (
              <Link to="/PerfilEstudiante" className="btn btn-light btn-lg">Mi Perfil</Link>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main container my-5">
        {/* Welcome Banner */}
        <section className="welcome-banner p-4 mb-5 rounded text-center bg-light">
          <h2>¡Bienvenido a tu portal académico!</h2>
          <p className="lead">Tu espacio para crecer, aprender y alcanzar tus metas educativas</p>
        </section>

        {/* What's New Section */}
        <section className="app-section mb-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="section-title text-start">Novedades</h2>
              <div className="news-item mb-3 p-3 bg-white rounded shadow-sm">
                <span className="badge bg-danger mb-2">Nuevo</span>
                <h5>Calendario de Exámenes Actualizado</h5>
                <p>Se ha publicado el calendario de exámenes para el segundo semestre.</p>
              </div>
              <div className="news-item mb-3 p-3 bg-white rounded shadow-sm">
                <span className="badge bg-success mb-2">Evento</span>
                <h5>Feria de Ciencias</h5>
                <p>No te pierdas nuestra Feria de Ciencias el próximo 15 de mayo.</p>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <img src="nopoyo.gif" alt="Student studying" className="img-fluid rounded shadow"/>
            </div>
          </div>
        </section>

       {/* Servicios Section with enhanced cards */}
<section id="servicios" className="app-section">
  <h2 className="section-title text-center mb-4">Servicios Académicos</h2>
  <div className="row">
    <div className="col-md-4 mb-4">
      <div className="card service-card h-100">
        <div className="card-body">
          <div className="text-center mb-3">
            <i className="bi bi-graph-up-arrow text-danger" style={{ fontSize: '3rem' }}></i>
          </div>
          <h5 className="card-title text-center">Seguimiento Personalizado</h5>
          <p className="card-text">
            Visualiza tu progreso académico en tiempo real, identifica áreas de mejora y consolida tus fortalezas con nuestro sistema de seguimiento.
          </p>
        </div>
        <div className="card-footer bg-transparent border-0 text-center">
          <Link to={isAuthenticated ? "/seguimiento" : "/"} className="btn btn-sm btn-outline-danger">
            {isAuthenticated ? "Ver Mi Progreso" : "Iniciar Sesión para Acceder"}
          </Link>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card service-card h-100">
        <div className="card-body">
          <div className="text-center mb-3">
            <i className="bi bi-journal-richtext text-danger" style={{ fontSize: '3rem' }}></i>
          </div>
          <h5 className="card-title text-center">Recursos Educativos</h5>
          <p className="card-text">
            Accede a materiales de estudio personalizados que complementan tus clases y promueven un aprendizaje integral y enriquecedor.
          </p>
        </div>
        <div className="card-footer bg-transparent border-0 text-center">
          <Link to={isAuthenticated ? "/Material" : "/"} className="btn btn-sm btn-outline-danger">
            {isAuthenticated ? "Explorar Recursos" : "Iniciar Sesión para Acceder"}
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Student Dashboard Preview - Solo mostrar si el usuario está autenticado */}
        {isAuthenticated && (
          <section className="app-section bg-light p-4 rounded">
            <h2 className="section-title text-center mb-4">Tu Informacion Estudiantil</h2>
            <div className="row g-4">
              <div className="col-md-3 col-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-calendar-check text-primary mb-3" style={{ fontSize: '2rem' }}></i>
                    <h5>Asistencia</h5>
                    <h3 className="text-primary">92%</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-award text-success mb-3" style={{ fontSize: '2rem' }}></i>
                    <h5>Promedio</h5>
                    <h3 className="text-success">4.2</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-book text-warning mb-3" style={{ fontSize: '2rem' }}></i>
                    <h5>Tareas</h5>
                    <h3 className="text-warning">3</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-bell text-danger mb-3" style={{ fontSize: '2rem' }}></i>
                    <h5>Pendientes</h5>
                    <h3 className="text-danger">2</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <Link to="/PerfilEstudiante" className="btn btn-danger">Ir a mi perfil</Link>
            </div>
          </section>
        )}

        {/* Accesos Rápidos Section - Solo mostrar si el usuario está autenticado */}
        {isAuthenticated && (
          <section id="accesos-rapidos" className="app-section mt-5">
            <h2 className="section-title text-center mb-4">Accesos Rápidos</h2>
            <div className="row">
              <div className="col-md-3 col-6 mb-4">
                <Link to="/horario" className="text-decoration-none">
                  <div className="card quick-access-card h-100">
                    <div className="card-body text-center">
                      <i className="bi bi-calendar-week display-4 text-primary"></i>
                      <h5 className="card-title mt-3">Horarios</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <Link to="/Material" className="text-decoration-none">
                  <div className="card quick-access-card h-100">
                    <div className="card-body text-center">
                      <i className="bi bi-list-check display-4 text-success"></i>
                      <h5 className="card-title mt-3">Materiales de estudio</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <Link to="/Seguimiento" className="text-decoration-none">
                  <div className="card quick-access-card h-100">
                    <div className="card-body text-center">
                      <i className="bi bi-star display-4 text-warning"></i>
                      <h5 className="card-title mt-3">Tu seguimiento</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <Link to="/PerfilEstudiante" className="text-decoration-none">
                  <div className="card quick-access-card h-100">
                    <div className="card-body text-center">
                      <i className="bi bi-person-circle display-4 text-danger"></i>
                      <h5 className="card-title mt-3">Mi Perfil</h5>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* About Us Section with mission and vision */}
      <div className="about-container py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 mission-vision-card">
                <div className="card-body text-center">
                  <div className="icon-wrapper mb-3">
                    <div className="icon-circle bg-danger">
                      <i className="bi bi-building" style={{ fontSize: '2rem', color: '#fff' }}></i>
                    </div>
                  </div>
                  <h3 className="card-title">Sobre Nosotros</h3>
                  <p className="card-text">
                    Bienvenidos a <strong className="text-danger">R.E.C.</strong>, una plataforma dedicada a potenciar el rendimiento académico de los estudiantes, ofreciendo apoyo integral y personalizado.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 mission-vision-card">
                <div className="card-body text-center">
                  <div className="icon-wrapper mb-3">
                    <div className="icon-circle bg-danger">
                      <i className="bi bi-bullseye" style={{ fontSize: '2rem', color: '#fff' }}></i>
                    </div>
                  </div>
                  <h3 className="card-title">Misión</h3>
                  <p className="card-text">
                    Nuestra misión es <strong className="text-danger">potenciar el aprendizaje</strong> y el rendimiento académico mediante un sistema innovador y personalizado, comprometido con el éxito de cada estudiante.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 mission-vision-card">
                <div className="card-body text-center">
                  <div className="icon-wrapper mb-3">
                    <div className="icon-circle bg-danger">
                      <i className="bi bi-eye" style={{ fontSize: '2rem', color: '#fff' }}></i>
                    </div>
                  </div>
                  <h3 className="card-title">Visión</h3>
                  <p className="card-text">
                    Aspiramos a ser la plataforma <strong className="text-danger">líder en refuerzo educativo</strong>, reconocida por transformar la manera en que los estudiantes aprenden y se preparan para el futuro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section with styled cards */}
      <section id="contacto" className="app-section contact-section bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title mb-3">¿Necesitas Ayuda?</h2>
            <p className="section-text lead mb-5">
              Estamos aquí para apoyarte en tu proceso de aprendizaje. No dudes en contactarnos.
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card contact-card text-center h-100">
                <div className="card-body">
                  <div className="icon-wrapper mb-3">
                    <div className="icon-circle bg-danger">
                      <i className="bi bi-envelope" style={{ fontSize: '2rem', color: '#fff' }}></i>
                    </div>
                  </div>
                  <h5 className="card-title">Correo Electrónico</h5>
                  <p className="card-text">Envíanos un mensaje para consultas o sugerencias.</p>
                  <Link to="mailto:rec.proyect@gmail.com" className="btn btn-danger">
                    Enviar Correo
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card contact-card text-center h-100">
                <div className="card-body">
                  <div className="icon-wrapper mb-3">
                    <div className="icon-circle bg-success">
                      <i className="bi bi-whatsapp" style={{ fontSize: '2rem', color: '#fff' }}></i>
                    </div>
                  </div>
                  <h5 className="card-title">WhatsApp</h5>
                  <p className="card-text">Contacto directo para dudas urgentes.</p>
                  <Link to="https://wa.me/573104713054" target="_blank" className="btn btn-success">
                    Enviar Mensaje
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card contact-card text-center h-100">
                <div className="card-body">
                  <div className="icon-wrapper mb-3">
                    <div className="icon-circle bg-primary">
                      <i className="bi bi-headset" style={{ fontSize: '2rem', color: '#fff' }}></i>
                    </div>
                  </div>
                  <h5 className="card-title">Soporte Técnico</h5>
                  <p className="card-text">¿Problemas con la plataforma? Estamos para ayudarte.</p>
                  <Link to="/soporte" className="btn btn-primary">
                    Solicitar Ayuda
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section with the iframe */}
      <section id="ubicacion" className="app-section mapa-section">
        <div className="container text-center">
          <h2 className="section-title text-danger mb-3">Nuestra Sede</h2>
          <p className="section-text lead mb-4">Visítanos en la Institución Educativa Javiera Londoño</p>
          <div className="mb-4">
            <div className="ratio ratio-16x9 mapa-iframe">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.971647332243!2d-75.56584356985823!3d6.267459214305058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428e79f3bec01%3A0x503402f6bfb9bb3!2sInstituci%C3%B3n%20Educativa%20Javiera%20Londo%C3%B1o!5e0!3m2!1ses!2sco!4v1731885474552!5m2!1ses!2sco"
                style={{ border: '0', filter: 'saturate(1.1)' }}
                allowFullScreen
                loading="lazy"
                title="Mapa de ubicación"
              ></iframe>
            </div>
          </div>
          <Link
            to="https://www.google.com/maps/dir/6.2792818,-75.5625925/javiera+londo%C3%B1o+sevilla+google+maps/@6.2737058,-75.5694721,16z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x8e4428e79f3bec01:0x503402f6bfb9bb3!2m2!1d-75.5649638!2d6.2679338?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-danger"
          >
            Cómo llegar
          </Link>
        </div>
      </section>
    </div>
  );
};

export default App;