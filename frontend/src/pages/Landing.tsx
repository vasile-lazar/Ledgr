import ThemeToggle from "../components/ui/ThemeToggle";
import { Link } from 'react-router-dom';
import { PATHS } from '../routes/paths';
import { Button } from '../components/ui/Button';
import { HeroSection } from "../sections/HeroSection.tsx";
import { HowItWorksSection } from '../sections/HowItWorksSection.tsx';
import { FeaturesSection } from '../sections/FeaturesSection.tsx';

export default function Landing() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-between px-4 sm:px-8 transition-colors">
            <header className="py-6 flex justify-between items-center border-b border-border">
                <span className="font-sans font-bold text-2xl text-primary">FinanceAI</span>
                <div className="flex items-center gap-2 sm:gap-4">
                    <ThemeToggle />
                    <Link to={PATHS.PUBLIC.LOGIN}>
                        <Button variant="ghost" size="sm">Login</Button>
                    </Link>
                    <Link to={PATHS.PUBLIC.REGISTER}>
                        <Button variant="primary" size="sm">Sign Up</Button>
                    </Link>
                </div>
            </header>
            <main className="max-w-6xl mx-auto w-full space-y-8">
                <HeroSection />
                <HowItWorksSection />
                <FeaturesSection />
            </main>
            <footer className="py-8 border-t border-border text-center text-xs text-muted-foreground">
                © 2026 FinanceAI. All rights reserved.
            </footer>
        </div>
    );
}
