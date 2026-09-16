import type { ButtonHTMLAttributes } from 'react';
import { LoaderCircle } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' | 'unstyled';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'custom';
  isLoading?: boolean;
}

const variants = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-border bg-transparent text-foreground hover:bg-muted',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
  link: 'text-primary hover:underline',
  unstyled: '',
};
const sizes = {
  sm: 'rounded-lg text-xs px-3 py-1.5',
  md: 'rounded-lg text-sm px-4 py-2',
  lg: 'rounded-xl text-base px-6 py-3',
  icon: 'rounded-lg size-9 shrink-0',
  custom: '',
};

export function Button({ children, variant = 'primary', size = 'md', type = 'button', isLoading = false, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
