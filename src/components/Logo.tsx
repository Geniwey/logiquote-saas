import { Link } from 'react-router-dom';

export function Logo({ size = 'md', variant = 'light' }: { size?: 'sm' | 'md' | 'lg'; variant?: 'light' | 'dark' }) {
  const textSize = size === 'sm' ? 'text-ink' : size === 'lg' ? 'text-2xl' : 'text-lg';
  const textColor = 'text-ink';
  const subColor = 'text-ink-muted/70';

  return (
    <Link to="/" className="flex items-baseline gap-0.5 group" aria-label="LogiQuote inicio">
      <span className={`${textSize} font-display font-extrabold tracking-tighter ${textColor} transition-colors duration-200 group-hover:text-signal`}>
        LogiQuote
      </span>
      <span className={`text-[10px] font-mono ${subColor} hidden sm:inline`}>/SPA</span>
    </Link>
  );
}
