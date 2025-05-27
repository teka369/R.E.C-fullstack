import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Componentes de Layout
import Sidebar from './views/main/components/Barra'
import Footer from './views/main/components/Footer'

// Páginas
import App from './views/main/Principal'
import Login from './views/main/Login'
import LoginSecretaria from './views/main/LoginSecretaria'
import ForgotPassword from './views/main/ForgotPassword'
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
import RegistroEstudiantes from './views/admin/RegistroEstudiantes'
import RegistroProfesores from './views/admin/RegistroProfesores'
import AccesoDenegado from './views/main/AccesoDenegado'
import Tutorial from './views/main/Tutorial'

// Componente para proteger rutas
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole: string }) => {
  const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    return <Navigate to="/Principal" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return children;
};

// Componente que controla el layout
const AppLayout = () => {
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');
  const isAuthPage = ['/login', '/login-secretaria', '/forgot-password'].includes(location.pathname);
  const isSecretaria = userRole === 'secretario';

  return (
    <>
      {!isAuthPage && !isSecretaria && <Sidebar />}
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path='/login' element={<Login />} />
        <Route path='/login-secretaria' element={<LoginSecretaria />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/acceso-denegado' element={<AccesoDenegado />} />
        
        {/* Rutas Principales */}
        <Route path='/' element={<Navigate to="/Principal" replace />} />
        <Route path='/Principal' element={<App />} />
        <Route path='/Portafolio' element={<MainContent />} />
        <Route path='/tutorial' element={<Tutorial />} />
        
        {/* Rutas de Perfiles */}
        <Route path='/PerfilEstudiante' element={<PerfilEstudiante />} />
        <Route path='/PerfilProfesor' element={<PerfilProfesor />} />
        
        {/* Rutas Académicas */}
        <Route path='/Horario' element={<Horario />} />
        <Route path='/Material' element={<Material />} />
        <Route path='/Temarios' element={<Temarios />} />
        <Route path='/Certificados' element={<Certificados />} />
        
        {/* Rutas de Administración */}
        <Route 
          path='/registro-estudiantes' 
          element={
            <ProtectedRoute requiredRole="secretario">
              <RegistroEstudiantes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/registro-profesores' 
          element={
            <ProtectedRoute requiredRole="secretario">
              <RegistroProfesores />
            </ProtectedRoute>
          } 
        />
        
        {/* Rutas de Comunicación y Seguimiento */}
        <Route path='/Contacto' element={<Contacto/>}/>
        <Route path='/Observaciones' element={<Observaciones />} />
        <Route path='/Reportes' element={<Reportes />} />
        
        {/* Ruta 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isAuthPage && !isSecretaria && <Footer />}
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
