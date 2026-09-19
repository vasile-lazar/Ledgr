import { Card } from '../components/ui/Card';
import { FileInput, Cpu, PieChart } from 'lucide-react';

interface Step {
    number: string;
    icon: React.ElementType;
    title: string;
    desc: string;
}

const steps: Step[] = [
    {
        number: '01',
        icon: FileInput,
        title: 'Paste or upload',
        desc: 'Paste your statement text directly, or drag in a PDF statement.',
    },
    {
        number: '02',
        icon: Cpu,
        title: 'AI extraction & review',
        desc: 'A local model extracts each transaction — you check and edit anything before saving.',
    },
    {
        number: '03',
        icon: PieChart,
        title: 'Dashboard',
        desc: 'See your spending broken down by category and tracked against your monthly budgets.',
    },
];

export const HowItWorksSection: React.FC = () => {
    return (
        <section
            id="how-it-works"
            className="w-full border-t border-border/60 py-16"
        >
            <div className="mb-12 text-center space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                    Simple Workflow
                </span>

                <h2 className="text-3xl font-bold font-sans text-foreground">
                    How it works
                </h2>
            </div>

            <div className="grid w-full gap-8 md:grid-cols-3">
                {steps.map((step) => (
                    <Card
                        key={step.number}
                        className="relative min-w-0 p-6 space-y-4 border-border/80 transition-all hover:border-primary/40"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary">
                                <step.icon className="h-6 w-6" />
                            </div>

                            <span className="shrink-0 rounded-md bg-muted px-2.5 py-1 font-mono text-xs font-bold text-muted-foreground">
                                STEP {step.number}
                            </span>
                        </div>

                        <div className="min-w-0 space-y-1">
                            <h3 className="font-semibold text-lg text-card-foreground">
                                {step.title}
                            </h3>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};
