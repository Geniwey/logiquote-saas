import { Link } from 'react-router-dom';
import { Ship } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const iconSize = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="LogiQuote inicio">
      <div className="flex items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft transition-transform duration-300 group-hover:scale-105">
        <Ship className={`${iconSize} p-1.5`} />
      </div>
      <span className={`${textSize} font-bold tracking-tight text-slate-900`}>
        LogiQuote
      </span>
    </Link>
  );
}
