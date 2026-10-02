import { Link } from 'react-router-dom';

export function Logo({ size = 'md', variant = 'light' }: { size?: 'sm' | 'md' | 'lg'; variant?: 'light' | 'dark' }) {
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';
  const textColor = variant === 'dark' ? 'text-white' : 'text-ink';
  const subColor = variant === 'dark' ? 'text-white/50' : 'text-ink-muted';

  return (
    <Link to="/" className="flex items-baseline gap-0.5 group" aria-label="LogiQuote inicio">
      <span className={`${textSize} font-display font-extrabold tracking-tight-display ${textColor} transition-colors duration-150 group-hover:text-signal`}>
        LogiQuote
      </span>
      <span className={`text-[10px] font-mono ${subColor} hidden sm:inline`}>/SPA</span>
    </Link>
  );
}
