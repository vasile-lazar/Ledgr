import type { ComponentProps } from 'react';

export interface InputProps extends ComponentProps<'input'> {
  variant?: 'default' | 'bare';
  invalid?: boolean;
}

export function Input({ className = '', type = 'text', variant = 'default', invalid = false, ...props }: InputProps) {
  const isChoice = type === 'checkbox' || type === 'radio';
  const appearance = isChoice
    ? 'size-4 shrink-0 accent-primary'
    : variant === 'bare'
      ? 'min-w-0 bg-transparent text-foreground placeholder:text-muted-foreground'
      : 'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground';
  return <input type={type} aria-invalid={invalid || undefined} className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive ${appearance} ${className}`} {...props} />;
}

export default Input;
