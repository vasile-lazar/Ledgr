import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { PATHS } from '../routes/paths';

export const HeroSection: React.FC = () => (
    <section className="landing-container landing-hero" aria-labelledby="hero-title">
        <div className="landing-hero-copy">
            <span className="landing-eyebrow"><span className="landing-dot" /> Small steps. A clearer financial future.</span>
            <h1 id="hero-title">Know your money.<br />Grow your<br /><em>possibilities.</em></h1>
            <p>Turn bank statements into a clearer picture of your spending. Less sorting, more understanding. A little more control, every day.</p>
            <div className="landing-hero-actions"><Link to={PATHS.app.upload} className="landing-button">Upload a statement <ArrowRight size={17} aria-hidden="true" /></Link><a href="#how-it-works" className="landing-text-link">See how it works <span aria-hidden="true">↗</span></a></div>
            <div className="landing-privacy"><ShieldCheck size={16} aria-hidden="true" /> Local AI processing. You review before saving.</div>
        </div>
        <div className="landing-illustration">
            <svg viewBox="0 0 560 460" role="img" aria-label="A growing tree beside a chart, representing clearer finances and progress toward goals">
                <circle cx="290" cy="220" r="179" fill="var(--primary)" opacity=".07" />
                <g fill="var(--primary)" opacity=".16"><path d="M366 81c-11-24-46-17-47 8-27-3-33 29-8 31h82c30-5 16-38-8-29-1-14-12-16-19-10Z"/><path d="M92 139c-5-17-31-16-34 2-23-1-24 22-4 23h54c19-2 14-24-2-22-2-6-8-7-14-3Z"/></g>
                <g fill="none" stroke="var(--primary)" strokeWidth="2" opacity=".4"><path d="M215 87q11-10 20 4 11-14 22-9M423 163q8-9 17 3 8-12 17-7"/></g>
                <ellipse cx="291" cy="407" rx="220" ry="19" fill="var(--primary)" opacity=".09" />
                <g stroke="var(--primary)" strokeWidth="2"><rect x="265" y="272" width="47" height="124" rx="8" fill="var(--accent)"/><rect x="327" y="233" width="47" height="163" rx="8" fill="var(--primary)" opacity=".45"/><rect x="389" y="185" width="47" height="211" rx="8" fill="var(--primary)" opacity=".8"/></g>
                <path d="m275 240 57-43 39 9 64-66m-25 2 25-2-1 26" fill="none" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M151 321C78 317 74 227 109 196c-4-57 79-88 118-42 66 3 85 90 39 123-9 41-68 62-115 44Z" fill="var(--accent)" stroke="var(--primary)" strokeWidth="2.5"/>
                <path d="M160 302c-58-11-65-71-38-102 2-49 65-65 93-29 53 3 66 68 29 96-7 30-51 47-84 35Z" fill="var(--primary)" opacity=".23"/>
                <path d="M184 396V236m0 76-35-37m35 12 37-40" fill="none" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <g stroke="var(--primary)" strokeWidth="3" strokeLinecap="round"><path d="M99 396v-9m10 12v-15m12 12v-7m109 9v-12m12 10v-5m219 6v-10m11 8v-15"/></g>
             
            </svg>
            <span className="landing-art-caption">YOUR NEXT CHAPTER STARTS WITH CLARITY</span>
        </div>
    </section>
);
