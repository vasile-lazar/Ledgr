import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Wallet } from 'lucide-react';
import { z } from 'zod';
import type { Page } from '../data/mock';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ui/ThemeToggle';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Enter your email address.').email('Enter a valid email address.'),
  password: z.string().min(8, 'Use at least 8 characters.'),
});

type FormValues = {
  email: string;
  password: string;
};

export default function Login({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [values, setValues] = useState<FormValues>({ email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  const validation = loginSchema.safeParse(values);
  const errors = validation.success
    ? {}
    : Object.fromEntries(
        Object.entries(validation.error.flatten().fieldErrors).map(([key, messages]) => [key, messages?.[0] ?? ''])
      ) as Partial<Record<keyof FormValues, string>>;

  const handleChange = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!loginSchema.safeParse(values).success) {
      setNotice('Please check the highlighted fields before continuing.');
      return;
    }

    setNotice('');
    onNavigate('dashboard');
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,116,144,0.10),transparent_32%)] bg-background px-4 py-8 text-foreground flex flex-col">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Button variant="ghost" onClick={() => onNavigate('landing')}>
          <ArrowLeft size={16} />
          Home
        </Button>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <section className="w-xl max-w-xl rounded-[2rem] border border-border bg-card p-6 shadow-[0_25px_70px_rgba(15,23,42,0.12)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Wallet size={24} />
                </div>
                <div>
                  <div className="text-lg text-muted-foreground">Ledgr</div>
                </div>
              </div>
            </div>

            <h2 className=" pb-4 mt-7 text-3xl font-semibold tracking-tight text-foreground">Welcome back.</h2>

            <form noValidate className="space-y-4" onSubmit={handleSubmit}>
              {[
                { key: 'email' as const, label: 'Email address', type: 'email', autocomplete: 'email' },
                { key: 'password' as const, label: 'Password', type: showPassword ? 'text' : 'password', autocomplete: 'current-password' },
              ].map((field) => {
                const error = (submitted || touched[field.key]) && errors[field.key];
                const isPassword = field.key === 'password';

                return (
                  <div key={field.key}>
                    <label htmlFor={field.key} className="text-sm font-medium text-foreground">
                      {field.label}
                    </label>
                    <div className="relative mt-1.5">
                      <Input
                        id={field.key}
                        name={field.key}
                        autoComplete={field.autocomplete}
                        type={field.type}
                        value={values[field.key]}
                        invalid={!!error}
                        aria-invalid={!!error || undefined}
                        aria-describedby={error ? `${field.key}-error` : undefined}
                        onBlur={() => setTouched((current) => ({ ...current, [field.key]: true }))}
                        onChange={(event) => handleChange(field.key, event.target.value)}
                        className={isPassword ? 'pr-12' : ''}
                      />

                      {isPassword && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 size-9 rounded-lg"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          onClick={() => setShowPassword((current) => !current)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      )}
                    </div>

                    {error && (
                      <p id={`${field.key}-error`} role="alert" className="mt-1 text-xs text-destructive">
                        {error}
                      </p>
                    )}
                  </div>
                );
              })}

              
              <Button type="submit" className="w-full py-3.5 text-sm font-medium">
                Sign in 
                <ArrowRight size={16} />
              </Button>
            </form>

            {notice && (
              <p role="status" className="mt-4 text-xs text-muted-foreground">
                {notice}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New here?{' '}
              <Button variant="link" size="custom" onClick={() => onNavigate('register')} className="px-0 text-sm font-medium">
                Get started
              </Button>
            </p>
          </section>
        </div>
    </main>
  );
}
