import { Link } from 'react-router-dom';
import { PATHS } from '../routes/paths';
import { Button } from '../components/ui/Button';
import { ArrowRight, Cpu, Lock } from 'lucide-react';

export const HeroSection: React.FC = () => {
    return (
        <section className="relative isolate overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20 text-center">
            <div className="absolute left-1/2 top-1/2 -z-10 h-75 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

            <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-primary">
                <Cpu className="h-3.5 w-3.5 shrink-0" />
                <span>Runs entirely on your own machine</span>
            </div>

            <h1 className="mt-8 text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight font-sans leading-[1.15]">
                Understand your spending
                <br className="hidden sm:inline" />
                <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    {' '}without typing it in yourself
                </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base sm:text-xl text-muted-foreground leading-relaxed">
                Paste your bank statement text or upload a PDF. A local AI model
                reads it, extracts every transaction, and you review and confirm
                before anything is saved.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Link
                    to={PATHS.app.upload}
                    className="w-full sm:w-auto"
                >
                    <Button
                        size="lg"
                        className="w-full sm:w-auto gap-2 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                    >
                        Upload a statement
                        <ArrowRight className="h-4 w-4 shrink-0" />
                    </Button>
                </Link>

                <a
                    href="#how-it-works"
                    className="w-full sm:w-auto"
                >
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto text-base"
                    >
                        See how it works
                    </Button>
                </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 pt-8 text-xs text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5">
                    <Lock className="h-4 w-4 shrink-0 text-primary" />
                    <span>No external APIs — nothing leaves your machine</span>
                </div>
            </div>
        </section>
    );
};