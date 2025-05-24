import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Componentes de Layout
import Sidebar from './views/main/components/Barra'
import Footer from './views/main/components/Footer'

// Páginas
import App from './views/main/Principal'
import Login from './views/main/Login'
import Register from './views/main/Register'
import { NotFound } from './views/main/NotPages'
import MainContent from './views/main/Portafolio'
import Certificados from './views/main/Certificados'
import PerfilEstudiante from './views/admin/PerfilEstudiante'
import PerfilProfesor from './views/admin/PerfilProfesor'
import Horario from './views/admin/BaseHorario'
import Material from './views/admin/BaseMaterial'
import Observaciones from './views/admin/BaseObservaciones'
import Reportes from './views/main/BaseReportes'
import Temarios from './views/admin/BaseTemarios'
import { Contacto } from './views/main/Contacto'


// Componente que controla el layout
const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Sidebar />}
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Rutas Principales */}
        <Route path='/Principal' element={<App />} />
        <Route path='/Portafolio' element={<MainContent />} />
        
        {/* Rutas de Perfiles */}
        <Route path='/PerfilEstudiante' element={<PerfilEstudiante />} />
        <Route path='/PerfilProfesor' element={<PerfilProfesor />} />
        
        {/* Rutas Académicas */}
        <Route path='/Horario' element={<Horario />} />
        <Route path='/Material' element={<Material />} />
        <Route path='/Temarios' element={<Temarios />} />
        <Route path='/Certificados' element={<Certificados />} />
        
        {/* Rutas de Administración */}
        
        {/* Rutas de Comunicación y Seguimiento */}
        <Route path='/Contacto' element={<Contacto/>}/>
        
        <Route path='/Observaciones' element={<Observaciones />} />
        <Route path='/Reportes' element={<Reportes />} />
        
        {/* Ruta 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
};

// Renderizado de la aplicación
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </StrictMode>
);
