import { Bot, FileText, ChartNoAxesCombined, Target, Search, Download, Sprout } from 'lucide-react';

const features = [
    { icon: FileText, title: 'Your statements, simplified', desc: 'Upload a PDF or paste statement text. Give all those transactions a place to land.' },
    { icon: Bot, title: 'A little help from local AI', desc: 'Extract dates, merchants, amounts, and categories without entering every detail.' },
    { icon: Search, title: 'You stay in control', desc: 'Review and correct extracted transactions before adding them to your history.' },
    { icon: ChartNoAxesCombined, title: 'See the bigger picture', desc: 'Understand your income and expenses with clear charts and category breakdowns.' },
    { icon: Target, title: 'Give your goals a budget', desc: 'Set limits for each category and see how your spending measures up.' },
    { icon: Download, title: 'Keep your data useful', desc: 'Search, filter, and export your transactions to CSV whenever you need them.' },
];

export const FeaturesSection: React.FC = () => (
    <section id="features" className="landing-container landing-features" aria-labelledby="features-title">
        <div className="landing-section-heading"><span className="landing-eyebrow">Built for your everyday</span><h2 id="features-title">Good habits start with a clear picture.</h2><span className="landing-heading-line" /></div>
        <div className="landing-feature-layout">
            <div className="landing-feature-column">{features.slice(0, 3).map(({ icon: Icon, title, desc }) => <article key={title}><Icon size={21} aria-hidden="true" /><h3>{title}</h3><p>{desc}</p></article>)}</div>
            <div className="landing-growth" aria-hidden="true"><div className="landing-growth-orbit"><span /><span /><span /><div className="landing-growth-center"><Sprout strokeWidth={1} /></div></div><p>A little awareness.<br /><strong>A lot of possibility.</strong></p></div>
            <div className="landing-feature-column">{features.slice(3).map(({ icon: Icon, title, desc }) => <article key={title}><Icon size={21} aria-hidden="true" /><h3>{title}</h3><p>{desc}</p></article>)}</div>
        </div>
    </section>
);
