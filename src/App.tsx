import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/components/Toast';
import { CookieBanner } from '@/components/CookieBanner';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import Dashboard from '@/pages/Dashboard';
import Cotizador from '@/pages/Cotizador';
import Precios from '@/pages/Precios';
import ComoFunciona from '@/pages/ComoFunciona';
import Demo from '@/pages/Demo';
import SobreNosotros from '@/pages/SobreNosotros';
import Recursos from '@/pages/Recursos';
import ArticleTemplate from '@/pages/ArticleTemplate';
import Contacto from '@/pages/Contacto';
import AvisoLegal from '@/pages/AvisoLegal';
import Privacidad from '@/pages/Privacidad';
import Terminos from '@/pages/Terminos';
import Cookies from '@/pages/Cookies';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/precios" element={<Precios />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/recursos/:slug" element={<ArticleTemplate />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cotizador/demo"
              element={
                <ProtectedRoute>
                  <Cotizador />
                </ProtectedRoute>
              }
            />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </ToastProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
