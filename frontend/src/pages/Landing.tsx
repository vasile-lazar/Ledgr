import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Link } from 'react-router-dom';
import { ArrowRight, ChartNoAxesCombined } from 'lucide-react';
import { PATHS } from '../routes/paths';
import { HeroSection } from '../sections/HeroSection';
import { HowItWorksSection } from '../sections/HowItWorksSection';
import { FeaturesSection } from '../sections/FeaturesSection';
import './Landing.css';


export const Landing: React.FC = () => (
    <div className="landing">
        <div className="landing-top" id="home">
            <header className="landing-header landing-container">
                <a href="#home" className="landing-brand" aria-label="Ledgr home"><ChartNoAxesCombined aria-hidden="true" />Ledgr<span>.</span></a>
                <nav aria-label="Main navigation" className="landing-nav">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it works</a>
                </nav>
                <div className="landing-account"><ThemeToggle /><Link to={PATHS.public.login}>Log in</Link><Link className="landing-button landing-button-small" to={PATHS.public.register}>Get started <ArrowRight size={14} aria-hidden="true" /></Link></div>
            </header>
            <HeroSection />
            <svg className="landing-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 55C330-35 660 30 930 75s365 36 510-8v53H0Z" /></svg>
        </div>
        <main>
            <FeaturesSection />
            <HowItWorksSection />
            <section className="landing-container landing-cta">
                <div><span className="landing-eyebrow">A little clarity goes a long way</span><h2>Make room for your next goal.</h2><p>Your statements already tell a story. Let Ledgr help you see it.</p></div>
                <Link to={PATHS.public.register} className="landing-button">Start with Ledgr <ArrowRight size={17} aria-hidden="true" /></Link>
            </section>
        </main>
        <footer className="landing-container landing-footer"><a href="#home" className="landing-brand">Ledgr<span>.</span></a><p>More clarity. More possibility.</p><span>© 2026 Ledgr. All rights reserved.</span></footer>
    </div>
);
