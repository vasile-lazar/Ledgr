import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Link } from 'react-router-dom';
import { PATHS } from '../routes/paths';
import { Button } from '../components/ui/Button';
import { HeroSection } from '../sections/HeroSection';
import { HowItWorksSection } from '../sections/HowItWorksSection';
import { FeaturesSection } from '../sections/FeaturesSection';

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground flex flex-col transition-colors">
            <header className="w-full border-b border-border">
                <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 flex justify-between items-center">
                    <span className="font-sans font-bold text-2xl text-primary">
                        Ledgr
                    </span>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <ThemeToggle />

                        <Link to={PATHS.public.login}>
                            <Button variant="ghost" size="sm">
                                Login
                            </Button>
                        </Link>

                        <Link to={PATHS.public.register}>
                            <Button variant="primary" size="sm">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="w-full flex-1">
                <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 space-y-8">
                    <HeroSection />
                    <HowItWorksSection />
                    <FeaturesSection />
                </div>
            </main>

            <footer className="w-full border-t border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 text-center text-xs text-muted-foreground">
                    © 2026 Ledgr. All rights reserved.
                </div>
            </footer>
        </div>
    );
};