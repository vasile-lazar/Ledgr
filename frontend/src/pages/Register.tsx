import { useState, type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Wallet } from 'lucide-react';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { PATHS } from '../routes/paths';

const registerSchema = z
    .object({
        name: z.string().trim().min(2, 'Enter your full name.'),
        email: z.email('Enter a valid email address.'),
        password: z.string().min(8, 'Use at least 8 characters.'),
        confirmPassword: z.string().min(1, 'Confirm your password.'),
    })
    .superRefine((value, ctx) => {
        if (value.confirmPassword !== value.password) {
            ctx.addIssue({
                path: ['confirmPassword'],
                code: 'custom',
                message: 'Passwords must match.',
            });
        }
    });

type FormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const Register: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [values, setValues] = useState<FormValues>({
        name: '', email: '', password: '', confirmPassword: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validation = registerSchema.safeParse(values);
    
    const errors = validation.success
        ? {}
        : Object.fromEntries(
            Object.entries(z.flattenError(validation.error).fieldErrors).map(
                ([key, messages]) => [key, messages?.[0] ?? '']
            )
        ) as Partial<Record<keyof FormValues, string>>;
    const handleChange = (key: keyof FormValues, value: string) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setSubmitted(true);

        if (!validation.success) return;

        setIsSubmitting(true);
        try {
            await register(values.name, values.email, values.password, values.confirmPassword);
            toast.success('Account created successfully.');
            navigate(PATHS.app.dashboard, { replace: true });
        } catch {
            toast.error('Unable to create account. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,116,144,0.10),transparent_32%)] bg-background px-4 py-8 text-foreground flex flex-col">
            <div className="flex flex-1 items-center justify-center">
                <section className="w-full max-w-xl rounded-[2rem] border border-border bg-card p-6 shadow-[0_25px_70px_rgba(15,23,42,0.12)] sm:p-8">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Wallet size={24} />
                        </div>
                        <div className="text-lg text-muted-foreground">Ledgr</div>
                    </div>

                    <h2 className="mt-7 pb-4 text-3xl font-semibold tracking-tight text-foreground">Create account</h2>

                    <form noValidate className="space-y-4" onSubmit={handleSubmit}>
                        {[
                            { key: 'name' as const, label: 'Full name', type: 'text', autocomplete: 'name' },
                            { key: 'email' as const, label: 'Email address', type: 'email', autocomplete: 'email' },
                            { key: 'password' as const, label: 'Password', type: showPassword ? 'text' : 'password', autocomplete: 'new-password' },
                            { key: 'confirmPassword' as const, label: 'Confirm password', type: showPassword ? 'text' : 'password', autocomplete: 'new-password' },
                        ].map((field) => {
                            const error = (submitted || touched[field.key]) && errors[field.key];
                            const isPassword = field.key === 'password' || field.key === 'confirmPassword';

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
                                                type="button" variant="ghost" size="icon"
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

                        <Button type="submit" disabled={isSubmitting} className="w-full py-3.5 text-sm font-medium">
                            {isSubmitting ? 'Creating account…' : 'Create account'}
                            {!isSubmitting && <ArrowRight size={16} />}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Button variant="link" size="custom" onClick={() => navigate(PATHS.public.login)} className="px-0 text-sm font-medium">
                            Sign in
                        </Button>
                    </p>
                </section>
            </div>
        </main>
    );
};