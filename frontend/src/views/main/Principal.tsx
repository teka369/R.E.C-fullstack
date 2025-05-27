import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../assets/main/styles/Principal.css';

// Props simuladas para demostración
interface HomePageProps {
  isAuthenticated?: boolean;
}

const App: React.FC<HomePageProps> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('userAuthenticated');
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(auth === 'true');
    setUserRole(role || '');

    // Lógica para mostrar/ocultar el botón de scroll
    const handleScroll = () => {
      if (window.pageYOffset > 300) { // Muestra el botón después de 300px de desplazamiento
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para desplazarse arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Desplazamiento suave
    });
  };

  return (
    <>
      <style>{`
        /* Variables CSS para colores */
        :root {
          --primary-color: #1e40af; /* Azul oscuro */
          --secondary-color: #3730a3; /* Índigo */
          --accent-color: #7c3aed; /* Violeta */
          --light-bg: #f8fafc; /* Gris muy claro */
          --dark-text: #1e293b; /* Texto oscuro */
          --light-text: #ffffff; /* Texto claro */
          --card-bg: #ffffff; /* Fondo de tarjeta */
          --shadow-color: rgba(0, 0, 0, 0.1);
          --light-shadow: rgba(0, 0, 0, 0.05);
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--light-bg) 0%, #e2e8f0 100%);
          color: var(--dark-text);
        }

        /* Header mejorado con imagen de estudio */
        .app-header {
          position: relative;
          background-image: url('https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 85vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          box-shadow: 0 20px 60px var(--shadow-color);
        }

        .app-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(30, 64, 175, 0.8) 0%, rgba(55, 48, 163, 0.7) 50%, rgba(124, 58, 237, 0.6) 100%);
          z-index: 1;
        }

        .header-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.15); /* Overlay más sutil */
          z-index: 2;
        }

        @keyframes float { /* Consider removing if not used */
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.01); }
        }

        .app-title {
          font-size: 5rem; /* Tamaño de fuente ajustado */
          font-weight: 800;
          color: var(--light-text);
          text-shadow: 0 5px 25px rgba(0, 0, 0, 0.4); /* Sombra ajustada */
          margin-bottom: 0.5rem; /* Margen ajustado */
          letter-spacing: 0.1em;
          line-height: 1.1;
        }

        .header-subtitle {
          font-size: 1.6rem; /* Tamaño de fuente ajustado */
          color: rgba(255, 255, 255, 0.95); /* Color ajustado */
          font-weight: 300;
          margin-bottom: 3rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Sombra ajustada */
        }

        /* Botones mejorados */
        .btn-modern {
          padding: 14px 36px; /* Padding ajustado */
          border-radius: 30px; /* Más redondeado */
          font-weight: 600;
          font-size: 1.15rem; /* Tamaño de fuente ajustado */
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 5px 18px var(--shadow-color);
        }

        .btn-modern:hover {
          transform: translateY(-3px); /* Desplazamiento ajustado */
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* Sombra ajustada */
        }

        .btn-modern i {
            margin-right: 8px;
        }

        .btn-light-modern {
          background: var(--card-bg);
          color: var(--primary-color);
          backdrop-filter: blur(10px);
        }

        .btn-light-modern:hover {
          background: #f0f0f0; /* Fondo ligeramente más oscuro en hover */
          color: var(--primary-color);
        }

        .btn-outline-modern {
          background: rgba(255, 255, 255, 0.15); /* Más visible */
          color: var(--light-text);
          border: 2px solid rgba(255, 255, 255, 0.4); /* Borde más visible */
          backdrop-filter: blur(10px);
        }

        .btn-outline-modern:hover {
          background: rgba(255, 255, 255, 0.25); /* Fondo en hover */
          color: var(--light-text);
          border-color: rgba(255, 255, 255, 0.6); /* Borde en hover */
        }

        /* Main content mejorado */
        .app-main {
          position: relative;
          z-index: 10;
          margin-top: -80px; /* Ajustar margen superior */
        }

        .app-section {
          padding: 4rem 0; /* Padding de sección */
        }

        .section-title {
          font-size: 2.5rem; /* Tamaño de título de sección */
          font-weight: 700;
          color: var(--dark-text);
          margin-bottom: 2.5rem; /* Margen ajustado */
          text-align: center;
          position: relative;
        }
        
        .section-title::after {
            content: '';
            display: block;
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            margin: 10px auto 0;
            border-radius: 2px;
        }

        .welcome-banner {
          background: var(--card-bg);
          border-radius: 15px; /* Menos redondeado */
          padding: 3rem 2rem; /* Padding */
          box-shadow: 0 10px 40px var(--shadow-color); /* Sombra */
          border: 1px solid rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
          margin-bottom: 4rem; /* Margen inferior */
        }

        .welcome-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px; /* Altura ajustada */
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
        }

        .welcome-banner h2 {
          color: var(--dark-text);
          font-weight: 700;
          font-size: 2rem; /* Tamaño de fuente */
          margin-bottom: 0.8rem; /* Margen */
        }

        .welcome-banner .lead {
          color: #525f7f; /* Color de texto ajustado */
          font-size: 1.1rem; /* Tamaño de fuente */
          font-weight: 400;
          line-height: 1.6;
        }

        /* What's New Section */
        .news-item {
          background: var(--card-bg);
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 5px 15px var(--light-shadow);
          transition: transform 0.3s ease;
        }

        .news-item:hover {
          transform: translateY(-5px);
        }

        .news-item h5 {
          color: var(--dark-text);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .news-item p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .news-item .badge {
            font-size: 0.8rem;
            padding: 0.4em 0.6em;
            border-radius: 4px;
        }

        .news-image {
          border-radius: 10px;
          box-shadow: 0 10px 30px var(--shadow-color);
        }

        /* Services Section */
        .services-section .service-card {
          border: none;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px var(--light-shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: var(--card-bg);
        }

        .services-section .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 45px var(--shadow-color);
        }

        .service-icon {
          font-size: 4rem !important; /* Tamaño del icono */
          color: var(--primary-color); /* Color del icono */
          margin-bottom: 1rem;
        }

        .service-card .card-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--dark-text);
          margin-bottom: 1rem;
        }

        .service-card .card-text {
          color: #64748b;
          font-size: 1rem;
          line-height: 1.6;
        }

        .service-card .btn {
            border-radius: 20px;
            font-size: 0.9rem;
            padding: 8px 20px;
        }

        /* Stats Section */
       .stats-section {
           background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
           color: var(--light-text);
           text-align: center;
       }

       .stat-item {
           margin-bottom: 2rem;
       }

       .stat-icon {
           font-size: 3.5rem !important;
           color: rgba(255, 255, 255, 0.8);
           margin-bottom: 0.8rem;
       }

       .stat-item h3 {
           font-size: 2.8rem;
           font-weight: 700;
           margin-bottom: 0.5rem;
           color: var(--light-text);
       }

       .stat-item p {
           font-size: 1.1rem;
           font-weight: 300;
           color: rgba(255, 255, 255, 0.9);
       }

        /* Testimonials Section */
        .testimonials-section {
          background: var(--light-bg);
        }

        .blockquote {
          font-size: 1.3rem;
          color: #4b5563; /* Color de texto */
          border-left: 5px solid var(--primary-color); /* Borde izquierdo */
          padding-left: 1.5rem;
          margin: 2rem auto;
          max-width: 700px;
        }

        .blockquote-footer {
          font-size: 1rem;
          color: #6b7280;
          margin-top: 1rem;
        }

        .carousel-control-prev-icon, .carousel-control-next-icon {
            filter: invert(1) grayscale(100%); /* Iconos claros */
        }

        .carousel-control-prev, .carousel-control-next {
            width: 5%;
        }

        /* CTA Section */
        .cta-section {
           background: linear-gradient(135deg, #dc3545, #fd7e14); /* Gradiente de peligro/advertencia */
           color: var(--light-text);
           text-align: center;
           padding: 5rem 0;
        }

        .cta-section h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }

        .cta-section p {
            font-size: 1.2rem;
            font-weight: 300;
            margin-bottom: 2.5rem;
            color: rgba(255, 255, 255, 0.9);
        }

        .cta-section .btn {
             border-radius: 30px;
             padding: 12px 30px;
             font-size: 1.1rem;
             font-weight: 600;
        }

         .cta-section .btn-light {
             background-color: var(--light-text);
             color: #dc3545;
         }

        /* About Us Section */
        .about-container {
            background: #eef2ff; /* Fondo suave */
        }

        .mission-vision-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 8px 25px var(--light-shadow);
            padding: 1.5rem;
            background: var(--card-bg);
        }

        .mission-vision-card .card-title {
            font-size: 1.6rem;
            font-weight: 700;
            color: var(--dark-text);
            margin-bottom: 1rem;
        }

        .mission-vision-card .card-text {
            color: #64748b;
            font-size: 1rem;
            line-height: 1.6;
        }

        .icon-wrapper {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
        }

        .icon-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--primary-color);
        }

        /* Contact Section */
        .contact-section {
            background: var(--light-bg);
        }

         .contact-section .section-title::after {
            background: linear-gradient(90deg, #dc3545, #fd7e14); /* Gradiente para el título de contacto */
         }

        .contact-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 8px 25px var(--light-shadow);
            padding: 2rem 1.5rem;
            background: var(--card-bg);
            transition: transform 0.3s ease;
        }

        .contact-card:hover {
            transform: translateY(-8px);
        }

        .contact-card .card-title {
            font-size: 1.4rem;
            font-weight: 600;
            color: var(--dark-text);
            margin-bottom: 1rem;
        }

        .contact-card .card-text {
             color: #64748b;
             font-size: 1rem;
             line-height: 1.6;
        }

        .contact-card .icon-circle {
             background-color: var(--primary-color); /* Color por defecto */
        }

        .contact-card .btn {
            border-radius: 20px;
            font-size: 0.95rem;
            padding: 10px 25px;
        }

        /* Map Section */
        .mapa-section {
            background: #f1f5f9; /* Fondo para la sección del mapa */
            padding-bottom: 0;
        }
         .mapa-section .section-title::after {
            background: linear-gradient(90deg, #dc3545, #fd7e14); /* Gradiente para el título del mapa */
         }

        .mapa-iframe {
            border-radius: 15px 15px 0 0;
            overflow: hidden;
            box-shadow: 0 10px 30px var(--shadow-color);
        }

        /* Quick Access Section */
        .quick-access-card {
             border: none;
            border-radius: 15px;
            box-shadow: 0 8px 25px var(--light-shadow);
            padding: 1.5rem;
            background: var(--card-bg);
             transition: transform 0.3s ease;
        }
         .quick-access-card:hover {
             transform: translateY(-8px);
         }
         .quick-access-card .card-title {
             font-size: 1.2rem;
             font-weight: 600;
             color: var(--dark-text);
         }

        /* Student/Professor Info Section */
        .student-info-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 8px 25px var(--light-shadow);
            padding: 2rem;
            background: var(--card-bg);
        }

        .student-info-card h3 {
            color: var(--dark-text);
            font-weight: 700;
        }

        .student-info-card h5 {
            color: #334155;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.8rem;
        }

        .student-info-card .list-unstyled li {
            margin-bottom: 0.5rem;
            color: #4b5563;
        }

        .student-info-card .badge {
            font-size: 1rem;
            padding: 0.3em 0.6em;
        }

        .student-info-card .d-grid .btn {
            border-radius: 20px;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .app-title {
            font-size: 3.5rem; /* Ajuste responsive */
          }

          .header-subtitle {
            font-size: 1.2rem; /* Ajuste responsive */
          }

          .btn-modern {
            padding: 10px 24px;
            font-size: 1rem;
            margin-bottom: 10px;
          }

          .app-main {
              margin-top: -40px; /* Ajuste responsive */
          }

           .app-section {
                padding: 3rem 0;
            }

          .section-title {
              font-size: 2rem; /* Ajuste responsive */
          }

           .welcome-banner {
               padding: 2rem 1.5rem;
               margin-bottom: 3rem;
           }

           .welcome-banner h2 {
               font-size: 1.6rem;
           }

            .welcome-banner .lead {
                font-size: 1rem;
            }

          .service-card, .mission-vision-card, .contact-card, .quick-access-card, .student-info-card {
              padding: 1.5rem;
          }

          .service-icon {
              font-size: 3rem !important;
          }

           .stat-item h3 {
               font-size: 2rem;
           }
            .stat-item p {
                font-size: 0.9rem;
            }

          .blockquote {
             font-size: 1.1rem;
             padding-left: 1rem;
          }

          .cta-section h2 {
              font-size: 2rem;
          }
           .cta-section p {
               font-size: 1rem;
           }

            .cta-section .btn {
                font-size: 1rem;
                padding: 10px 25px;
            }

             .quick-access-card .card-title {
                 font-size: 1rem;
             }

             .student-info-card h3 {
                 font-size: 1.8rem;
             }
              .student-info-card h5 {
                  font-size: 1.2rem;
              }

               .student-info-card .badge {
                   font-size: 0.9rem;
               }

        }

        /* Responsive design para pantallas muy pequeñas */
        @media (max-width: 576px) {
             .app-title {
                font-size: 2.5rem;
             }
             .header-subtitle {
                 font-size: 1rem;
             }
              .btn-modern {
                  font-size: 0.9rem;
                  padding: 8px 20px;
              }
               .section-title {
                   font-size: 1.8rem;
               }

        }


        /* Animaciones */
        .fade-in { /* Animate on load */
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .slide-up { /* Animate on load with delay */
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 0.8s ease-out forwards 0.3s;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Scroll to Top Button */
        .scroll-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: var(--primary-color); /* Usa color primario */
          color: var(--light-text);
          width: 45px; /* Tamaño ajustado */
          height: 45px; /* Tamaño ajustado */
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.2s ease; /* Transición mejorada */
          z-index: 1000;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .scroll-to-top i {
            font-size: 1.5rem; /* Tamaño del icono */
        }

        .scroll-to-top.show {
          opacity: 1;
          visibility: visible;
        }
      `}</style>

      <div className="app-container">
        {/* Enhanced Header with Parallax Effect */}
        <header className="app-header">
          <div className="header-overlay"></div>
          <div className="container text-center position-relative" style={{ zIndex: 3 }}>
            <h1 className="app-title fade-in">R.E.C</h1>
            <p className="header-subtitle fade-in">Refuerzo Educativo Complementario</p>
            <div className="mt-4 slide-up">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    className="btn btn-modern btn-light-modern me-3"
                  >
                    <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
                  </Link>
                  <Link 
                    to="/login-secretaria" 
                    className="btn btn-modern btn-outline-modern me-3"
                  >
                    <i className="bi bi-person-badge"></i>
                    Acceso Secretaría
                  </Link>
                  <Link 
                    to="/tutorial" 
                    className="btn btn-modern btn-outline-modern"
                  >
                    <i className="bi bi-book"></i> Tutorial
                  </Link>
                </>
              ) : (
                <>
                  {/* Ajustar texto y ícono según rol */}
                  <Link 
                    to={userRole === 'profesor' ? "/PerfilProfesor" : (userRole === 'estudiante' ? "/PerfilEstudiante" : "#")} 
                    className="btn btn-modern btn-light-modern me-3"
                  >
                    {userRole === 'profesor' ? <i className="bi bi-person-video"></i> : <i className="bi bi-person"></i>} Mi Perfil
                  </Link>
                   {userRole !== 'secretario' && (
                     <Link 
                       to="/tutorial" 
                       className="btn btn-modern btn-outline-modern"
                     >
                       <i className="bi bi-book"></i> Tutorial
                     </Link>
                   )}
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="app-main container my-5">
          {/* Welcome Banner */}
          <section className="welcome-banner text-center animate__animated animate__fadeInUp ">
            <h2>¡Bienvenido a tu portal académico!</h2>
            <p className="lead">Tu espacio para crecer, aprender y alcanzar tus metas educativas</p>
          </section>

          {/* What's New Section */}
          <section className="app-section mb-5">
            <div className="row align-items-center">
              <div className="col-md-6 order-md-1 order-2">
                <h2 className="section-title text-start">Novedades</h2>
                <div className="news-item mb-3">
                  <span className="badge bg-danger mb-2">Nuevo</span>
                  <h5>Calendario de Exámenes Actualizado</h5>
                  <p>Se ha publicado el calendario de exámenes para el segundo semestre.</p>
                </div>
                <div className="news-item mb-3">
                  <span className="badge bg-success mb-2">Evento</span>
                  <h5>Feria de Ciencias</h5>
                  <p>No te pierdas nuestra Feria de Ciencias el próximo 15 de mayo.</p>
                </div>
                {/* Puedes agregar más noticias aquí */}
              </div>
              <div className="col-md-6 text-center order-md-2 order-1 mb-4 mb-md-0">
                <img src="/nopoyo.gif" alt="Novedades" className="img-fluid rounded shadow-lg news-image"/>
              </div>
            </div>
          </section>

          {/* Servicios Section with enhanced cards */}
          <section id="servicios" className="app-section bg-light">
            <div className="container">
              <h2 className="section-title text-center mb-5">Servicios Académicos</h2>
              <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                  <div className="card service-card h-100">
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <i className="bi bi-graph-up-arrow service-icon text-danger"></i>
                      </div>
                      <h5 className="card-title text-center">Observaciones Académicas</h5>
                      <p className="card-text text-center">
                        Visualiza y gestiona las observaciones académicas de los estudiantes, identificando áreas de mejora y fortalezas con nuestro sistema de seguimiento.
                      </p>
                    </div>
                    <div className="card-footer bg-transparent border-0 text-center">
                      <Link to={isAuthenticated ? "/Observaciones" : "/login"} className="btn btn-outline-danger">
                        {isAuthenticated ? "Ver Observaciones" : "Iniciar Sesión para Acceder"}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card service-card h-100">
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <i className="bi bi-journal-richtext service-icon text-primary"></i>
                      </div>
                      <h5 className="card-title text-center">Recursos Educativos</h5>
                      <p className="card-text text-center">
                        Accede a materiales de estudio personalizados que complementan tus clases y promueven un aprendizaje integral y enriquecedor.
                      </p>
                    </div>
                    <div className="card-footer bg-transparent border-0 text-center">
                      <Link to={isAuthenticated ? "/Material" : "/login"} className="btn btn-outline-primary">
                        {isAuthenticated ? "Explorar Recursos" : "Iniciar Sesión para Acceder"}
                      </Link>
                    </div>
                  </div>
                </div>
                 {/* Puedes agregar más tarjetas de servicio aquí */}
              </div>
            </div>
          </section>

          {/* Student Dashboard Preview - Solo mostrar si el usuario está autenticado */}
          {isAuthenticated && (userRole !== 'secretario') && (
            <section className="app-section bg-light p-4 rounded student-info-card mt-5">
              <h2 className="section-title text-center mb-4">Tu Información {userRole === 'estudiante' ? 'Estudiantil' : 'de Profesor'}</h2>
              <div className="row g-4">
                <div className="col-md-3 col-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <i className="bi bi-calendar-check text-primary mb-3" style={{ fontSize: '2rem' }}></i>
                      <h5>Asistencia</h5>
                      <h3 className="text-primary">--</h3> {/* Usar placeholder */}
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <i className="bi bi-award text-success mb-3" style={{ fontSize: '2rem' }}></i>
                      <h5>Promedio</h5>
                      <h3 className="text-success">--</h3> {/* Usar placeholder */}
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <i className="bi bi-book text-warning mb-3" style={{ fontSize: '2rem' }}></i>
                      <h5>Tareas</h5>
                      <h3 className="text-warning">--</h3> {/* Usar placeholder */}
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <i className="bi bi-bell text-danger mb-3" style={{ fontSize: '2rem' }}></i>
                      <h5>Pendientes</h5>
                      <h3 className="text-danger">--</h3> {/* Usar placeholder */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <Link to={userRole === 'profesor' ? "/PerfilProfesor" : "/PerfilEstudiante"} className="btn btn-primary">
                   Ir a mi Perfil
                </Link>
              </div>
            </section>
          )}

          {/* Accesos Rápidos Section - Solo mostrar si el usuario está autenticado */}
          {isAuthenticated && (userRole !== 'secretario') && (
            <section id="accesos-rapidos" className="app-section mt-5 bg-white p-4 rounded">
              <h2 className="section-title text-center mb-4">Accesos Rápidos</h2>
              <div className="row g-4">
                {/* Ajustar links e iconos según rol si es necesario */}
                <div className="col-md-3 col-6">
                  <Link to="/horario" className="text-decoration-none">
                    <div className="card quick-access-card h-100 text-center">
                      <div className="card-body">
                        <i className="bi bi-calendar-week display-4 text-primary"></i>
                        <h5 className="card-title mt-2">Horarios</h5>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3 col-6">
                  <Link to="/Material" className="text-decoration-none">
                    <div className="card quick-access-card h-100 text-center">
                      <div className="card-body">
                        <i className="bi bi-book display-4 text-success"></i>
                        <h5 className="card-title mt-2">Materiales</h5>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3 col-6">
                  <Link to="/Observaciones" className="text-decoration-none">
                    <div className="card quick-access-card h-100 text-center">
                      <div className="card-body">
                        <i className="bi bi-eye display-4 text-warning"></i>
                        <h5 className="card-title mt-2">Observaciones</h5>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3 col-6">
                   <Link to="/Reportes" className="text-decoration-none">
                     <div className="card quick-access-card h-100 text-center">
                       <div className="card-body">
                         <i className="bi bi-file-earmark-text display-4 text-danger"></i>
                         <h5 className="card-title mt-2">Reportes</h5>
                       </div>
                     </div>
                   </Link>
                 </div>
              </div>
            </section>
          )}
        </main>

        {/* About Us Section with mission and vision */}
        <div className="about-container py-5">
          <div className="container">
             <h2 className="section-title text-center mb-5">Sobre R.E.C.</h2>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card h-100 mission-vision-card">
                  <div className="card-body text-center">
                    <div className="icon-wrapper mb-3">
                      <div className="icon-circle bg-danger">
                        <i className="bi bi-building" style={{ fontSize: '2rem', color: 'var(--light-text)' }}></i>
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
                      <div className="icon-circle bg-success">
                        <i className="bi bi-bullseye" style={{ fontSize: '2rem', color: 'var(--light-text)' }}></i>
                      </div>
                    </div>
                    <h3 className="card-title">Misión</h3>
                    <p className="card-text">
                      Nuestra misión es <strong className="text-success">potenciar el aprendizaje</strong> y el rendimiento académico mediante un sistema innovador y personalizado, comprometido con el éxito de cada estudiante.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100 mission-vision-card">
                  <div className="card-body text-center">
                    <div className="icon-wrapper mb-3">
                      <div className="icon-circle bg-primary">
                        <i className="bi bi-eye" style={{ fontSize: '2rem', color: 'var(--light-text)' }}></i>
                      </div>
                    </div>
                    <h3 className="card-title">Visión</h3>
                    <p className="card-text">
                      Aspiramos a ser la plataforma <strong className="text-primary">líder en refuerzo educativo</strong>, reconocida por transformar la manera en que los estudiantes aprenden y se preparan para el futuro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
       <section className="testimonials-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5 animate__animated animate__slideInUp">Lo que dicen nuestros estudiantes</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {/* Testimonial 1 */}
                  <div className="carousel-item active">
                    <blockquote className="blockquote text-center">
                      <p className="mb-0">"R.E.C. ha simplificado mi vida académica. Encontrar materiales de estudio y seguir mis notas nunca fue tan fácil."</p>
                      <footer className="blockquote-footer mt-2">María López, <cite title="Source Title">Estudiante</cite></footer>
                    </blockquote>
                  </div>
                  {/* Testimonial 2 */}
                  <div className="carousel-item">
                    <blockquote className="blockquote text-center">
                      <p className="mb-0">"La comunicación con mis profesores ha mejorado muchísimo gracias a la plataforma. Puedo ver mis observaciones y comentarios al instante."</p>
                      <footer className="blockquote-footer mt-2">Juan Pérez, <cite title="Source Title">Estudiante</cite></footer>
                    </blockquote>
                  </div>
                  {/* Testimonial 3 */}
                   <div className="carousel-item">
                    <blockquote className="blockquote text-center">
                      <p className="mb-0">"El calendario de actividades es genial para no perderme de nada. Siempre sé cuándo tengo exámenes o eventos importantes."</p>
                      <footer className="blockquote-footer mt-2">Ana García, <cite title="Source Title">Estudiante</cite></footer>
                    </blockquote>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
       <section className="cta-section">
        <div className="container">
          <h2 className="mb-4 animate__animated animate__slideInUp">¿Listo para Iniciar sesión?</h2>
          <p className="lead mb-4 animate__animated animate__fadeInUp">Aprovecha todas las herramientas que R.E.C. tiene para ti.</p>
          <Link to="/login" className="btn btn-light btn-lg animate__animated animate__pulse" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}>
            <i className="bi bi-person-plus"></i> Iniciar Sesión
          </Link>
        </div>
      </section>
      )}

      {/* Map Section with the iframe */}
        <section id="ubicacion" className="app-section mapa-section">
          <div className="container text-center">
            <h2 className="section-title text-danger mb-3">Encuéntranos</h2> {/* Título ajustado */}
            <p className="section-text lead mb-4">Visítanos en la Institución Educativa Javiera Londoño en Medellín.</p> {/* Texto ajustado */}
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
              className="btn btn-modern btn-light-modern"
            >
              <i className="bi bi-geo-alt-fill me-2"></i>
              Cómo llegar
            </Link>
          </div>
        </section>

        {/* Scroll to Top Button */}
        {showScrollButton && (
          <button
            className="scroll-to-top show"
            onClick={scrollToTop}
            aria-label="Volver arriba"
          >
            <i className="bi bi-arrow-up"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default App;