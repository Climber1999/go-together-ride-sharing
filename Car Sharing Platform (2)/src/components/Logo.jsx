import logoMark from '../assets/logo-mark.png';
import logoFull from '../assets/logo-full.png';

/**
 * Go Together brand logo (extracted from the brand artwork).
 * variant="mark" -> people + car icon only
 * variant="full" -> icon + "Go Together" wordmark
 */
export function Logo({ className = 'h-8 w-auto', variant = 'mark' }) {
  return (
    <img
      src={variant === 'full' ? logoFull : logoMark}
      alt="Go Together"
      className={`object-contain ${className}`}
      draggable={false}
    />
  );
}

/** Text wordmark "Go Together" in brand colours */
export function BrandName({ className = 'text-xl' }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      <span className="text-brand-navy">Go</span>
      <span className="text-brand-orange">Together</span>
    </span>
  );
}
