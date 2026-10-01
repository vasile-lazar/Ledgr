import { FileInput, ScanLine, ChartNoAxesCombined, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATHS } from '../routes/paths';

const steps = [
    { number: '01', icon: FileInput, title: 'Bring your statement', desc: 'Drop in a PDF or paste your statement text to get started.' },
    { number: '02', icon: ScanLine, title: 'Review the details', desc: 'Let local AI do the sorting. Check and adjust before you save.' },
    { number: '03', icon: ChartNoAxesCombined, title: 'Find your perspective', desc: 'Explore your spending, set a budget, and plan your next step.' },
];

export const HowItWorksSection: React.FC = () => (
    <section id="how-it-works" className="landing-workflow" aria-labelledby="workflow-title">
        <div className="landing-container"><div className="landing-workflow-heading"><div><span className="landing-eyebrow">Less effort. More insight.</span><h2 id="workflow-title">From statement to understanding.<br />In three simple steps.</h2></div><Link to={PATHS.app.upload} className="landing-text-link">Try it for yourself <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
            <div className="landing-steps">{steps.map(({ number, icon: Icon, title, desc }) => <article key={number}><div className="landing-step-top"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><span>{number}</span></div><h3>{title}</h3><p>{desc}</p></article>)}</div>
        </div>
    </section>
);
