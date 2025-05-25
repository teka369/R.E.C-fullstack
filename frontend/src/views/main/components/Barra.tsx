import React, { useState, useEffect } from 'react';
import '../../../assets/main/styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInitial, setUserInitial] = useState('');

  // Verificar si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const userAuth = localStorage.getItem('userAuthenticated');
    const userName = localStorage.getItem('userName');
    setIsAuthenticated(userAuth === 'true');
    if (userName) {
      setUserInitial(userName.charAt(0).toUpperCase());
    }
  }, []);

  const openNavbar = () => {
    setSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeNavbar = () => {
    setSidebarOpen(false);
    document.body.style.overflow = '';
  };

  const toggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  const toggleDropdown = (dropdownName: string) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserInitial('');
    window.location.href = '/';
  };

  return (
    <>
      {/* Botón Hamburguesa (solo visible en móviles) */}
      <button
        id="openMenu"
        className="hamburger-btn"
        onClick={openNavbar}
      >
        <div className="relative-container">
          <i className="bi bi-list hamburger-icon"></i>
          <div className="brightness-effect"></div>
          <div className="pulse-effect"></div>
        </div>
      </button>

      {/* Navbar horizontal para PC */}
      <nav className="navbar-horizontal">
        <div className="navbar-content">
          {/* Logo */}
          <a href="Principal" className="navbar-logo">
            <img src="/image.png" alt="Logo" className="logo-img" />
            <span className="logo-text">R.E.C</span>
          </a>
          
          {/* Menú de opciones horizontal */}
          <ul className="navbar-menu">
            <li><a href="Principal" className="menu-item"><i className="bi bi-house-door me-1"></i>Inicio</a></li>
            
            {/* Opciones que solo se muestran si está autenticado */}
            {isAuthenticated && (
              <>
                {/* Submenú para Material y Temarios */}
                <li className="dropdown-nav">
                  <button 
                    className={`menu-item dropdown-toggle ${activeDropdown === 'academico' ? 'active' : ''}`} 
                    onClick={() => toggleDropdown('academico')}
                  >
                    <i className="bi bi-book me-1"></i>Académico<i className="bi bi-chevron-down ms-1"></i>
                  </button>
                  <ul className={`submenu ${activeDropdown === 'academico' ? 'show' : ''}`}>
                    <li><a href="/Material" className="submenu-item"><i className="bi bi-file-earmark me-1"></i>Material</a></li>
                    <li><a href="/Temarios" className="submenu-item"><i className="bi bi-card-list me-1"></i>Temarios</a></li>
                    <li><a href="/Horario" className="submenu-item"><i className="bi bi-calendar me-1"></i>Horario</a></li>
                    
                  </ul>
                </li>
                
                {/* Submenú para Observación*/}
                <li className="dropdown-nav">
                  <button 
                    className={`menu-item dropdown-toggle ${activeDropdown === 'evaluacion' ? 'active' : ''}`} 
                    onClick={() => toggleDropdown('evaluacion')}
                  >
                    <i className="bi bi-clipboard-data me-1"></i>Evaluación<i className="bi bi-chevron-down ms-1"></i>
                  </button>
                  <ul className={`submenu ${activeDropdown === 'evaluacion' ? 'show' : ''}`}>
                    <li><a href="/Observaciones" className="submenu-item"><i className="bi bi-search me-1"></i>Observación</a></li>
                  </ul>
                </li>
              </>
            )}
            
            {/* Submenú de Más - Visible siempre */}
            <li className="dropdown-nav">
              <button 
                className={`menu-item dropdown-toggle ${activeDropdown === 'mas' ? 'active' : ''}`} 
                onClick={() => toggleDropdown('mas')}
              >
                <i className="bi bi-collection me-1"></i>Más<i className="bi bi-chevron-down ms-1"></i>
              </button>
              <ul className={`submenu ${activeDropdown === 'mas' ? 'show' : ''}`}>
                <li><a href="/Reportes" className="submenu-item"><i className="bi bi-file-earmark-text me-1"></i>Reportes</a></li>
                <li><a href="/Portafolio" className="submenu-item"><i className="bi bi-folder me-1"></i>Portafolio</a></li>
                <li><a href="/Certificados" className="submenu-item"><i className="bi bi-award me-1"></i>Certificados</a></li>
              </ul>
            </li>
            
            
            {!isAuthenticated && (
              <>
                <li><a href="contacto" className="menu-item"><i className="bi bi-envelope me-1"></i>Contacto</a></li>
              </>
            )}
          </ul>
          
          {/* Botones de Registro/Login para barra horizontal - Solo visibles si NO está autenticado */}
          {!isAuthenticated ? (
            <div className="auth-buttons">
              <a href="/" className="auth-btn login-btn">
                <i className="bi bi-box-arrow-in-right me-1"></i>Iniciar
              </a>
              <a href="/" className="auth-btn register-btn">
                <i className="bi bi-person-plus me-1"></i>Registrarse
              </a>
            </div>
          ) : (
            // Perfil de usuario - Solo visible si está autenticado
            <div className="navbar-profile">
              <div className="dropdown">
                <button className="dropdown-toggle profile-btn" type="button">
                  <div className="profile-initial">{userInitial}</div>
                  <span className="profile-name">Usuario</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="/PerfilEstudiante">
                      <i className="bi bi-person me-2"></i>Perfil
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/PerfilEstudiante">
                      <i className="bi bi-gear me-2"></i>Configuración
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a 
                      className="dropdown-item text-danger" 
                      href="/" 
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar para móviles */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Encabezado */}
          <div className="sidebar-header">
            <a href="Principal" className="sidebar-logo">
              <img src="/image.png" alt="Logo" className="logo-img" />
              <span className="logo-text">R.E.C</span>
            </a>
            <button id="closeMenu" className="close-btn" onClick={closeNavbar}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Perfil de Usuario - Solo visible si está autenticado */}
          {isAuthenticated && (
            <div className="sidebar-profile">
              <div className="dropdown">
                <button className="dropdown-toggle profile-btn" type="button">
                  <img 
                    src="/default-avatar.png" 
                    alt="Perfil" 
                    className="profile-img" 
                  />
                  <div className="profile-info">
                    <p className="profile-name">Usuario</p>
                    <p className="profile-role">Estudiante</p>
                  </div>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/PerfilEstudiante">
                      <i className="bi bi-person me-2"></i>Perfil
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/Configuracion">
                      <i className="bi bi-gear me-2"></i>Configuración
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a 
                      className="dropdown-item text-danger" 
                      href="/" 
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Menú Principal - Contenido según autenticación */}
          <div className="sidebar-menu">
            <ul className="menu-list">
              <li>
                <a href="Principal" className="menu-item">
                  <i className="bi bi-house-door me-3"></i>Inicio
                </a>
              </li>
              
              {/* Opciones visibles solo si está autenticado */}
              {isAuthenticated && (
                <>
                  <li>
                    <a href="/Horario" className="menu-item">
                      <i className="bi bi-calendar me-3"></i>Horario
                    </a>
                  </li>
                  <li>
                    <a href="/Material" className="menu-item">
                      <i className="bi bi-book me-3"></i>Material
                    </a>
                  </li>
                  <li>
                    <a href="/Temarios" className="menu-item">
                      <i className="bi bi-card-list me-3"></i>Temarios
                    </a>
                  </li>
                  <li>
                    <a href="/Observaciones" className="menu-item">
                      <i className="bi bi-search me-3"></i>Observación
                    </a>
                  </li>
                </>
              )}
              
              {/* Opciones para todos los usuarios */}
              {!isAuthenticated && (
                <>
                  <li>
                    <a href="#about" className="menu-item">
                      <i className="bi bi-info-circle me-3"></i>Acerca de
                    </a>
                  </li>
                  <li>
                    <a href="#contacto" className="menu-item">
                      <i className="bi bi-envelope me-3"></i>Contacto
                    </a>
                  </li>
                </>
              )}
            </ul>

            {/* Acordeón de Más Opciones - Visible siempre */}
            <div className="accordion-container">
              <button className="accordion-button" onClick={toggleAccordion}>
                <span className="accordion-title">
                  <i className="bi bi-collection me-3"></i>Más Opciones
                </span>
                <i className={`bi ${isAccordionOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
              <div className={`accordion-content ${isAccordionOpen ? 'open' : ''}`}>
                <ul>
                  <li>
                    <a href="/Reportes" className="menu-item">
                      <i className="bi bi-file-earmark-text me-3"></i>Reportes
                    </a>
                  </li>
                  <li>
                    <a href="/Portafolio" className="menu-item">
                      <i className="bi bi-folder me-3"></i>Portafolio
                    </a>
                  </li>
                  <li>
                    <a href="/Certificados" className="menu-item">
                      <i className="bi bi-award me-3"></i>Certificados
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Botones de autenticación para barra vertical - Solo visibles si NO está autenticado */}
            {!isAuthenticated && (
              <div className="auth-buttons-sidebar">
                <a href="/login" className="sidebar-auth-btn login-btn">
                  <i className="bi bi-box-arrow-in-right me-3"></i>Iniciar Sesión
                </a>
                <a href="/login?tab=register" className="sidebar-auth-btn register-btn">
                  <i className="bi bi-person-plus me-3"></i>Registrarse
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isSidebarOpen && (
        <div id="overlay" className="overlay" onClick={closeNavbar}></div>
      )}
    </>
  );
};

export default Sidebar;