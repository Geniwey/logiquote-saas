import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('logiquote_cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('logiquote_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('logiquote_cookie_consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] bg-white text-ink border-t border-line animate-fade-up">
      <div className="mx-auto max-w-9xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="text-sm text-ink/70 flex-1">
          Usamos cookies esenciales para el funcionamiento del sitio y cookies analíticas anónimas para mejorarlo.{' '}
          <Link to="/cookies" className="underline underline-offset-2 text-ink/90 hover:text-signal-light transition-colors">Política de cookies</Link>
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleReject}
            className="text-sm font-medium text-ink/60 transition-colors hover:text-ink px-4 py-2"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="btn-primary text-sm"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
