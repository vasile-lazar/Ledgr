import React from 'react';
import { Card } from '../components/ui/Card';
import { UploadCloud, Cpu, PieChart } from 'lucide-react';

interface Step {
    number: string;
    icon: React.ElementType;
    title: string;
    desc: string;
}

const steps: Step[] = [
    { number: '01', icon: UploadCloud, title: 'Upload PDF', desc: 'Drag and drop bank statements securely with instant file validation.' },
    { number: '02', icon: Cpu, title: 'AI Categorization', desc: 'Our LLM pipeline parses complex tables and categorizes every entry.' },
    { number: '03', icon: PieChart, title: 'Analytics Dashboard', desc: 'View intuitive visualizations of budgets, spending patterns, and alerts.' },
];

export const HowItWorksSection: React.FC = () => {
    return (
        <section className="py-16 border-t border-border/60">
            <div className="text-center space-y-3 mb-12">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">Simple Workflow</span>
                <h2 className="text-3xl font-bold font-sans text-foreground">How it works</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
                {steps.map((s) => (
                    <Card key={s.number} className="relative p-6 space-y-4 hover:border-primary/40 transition-all border-border/80">
                        <div className="flex justify-between items-center">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <s.icon className="w-6 h-6" />
                            </div>
                            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                                STEP {s.number}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-semibold text-lg text-card-foreground">{s.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};