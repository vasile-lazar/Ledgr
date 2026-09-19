import { Card } from '../components/ui/Card';
import {
    FileText,
    Target,
    ChartNoAxesCombined,
    Bot,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
    icon: LucideIcon;
    title: string;
    desc: string;
    badge: string;
}

const features: Feature[] = [
    {
        icon: Bot,
        title: 'AI Transaction Extraction',
        desc: 'A local language model reads your statement text and extracts dates, merchants, amounts, and categories.',
        badge: 'AI',
    },
    {
        icon: FileText,
        title: 'Text & PDF Statements',
        desc: 'Paste statement text directly, or upload a PDF and let the app pull the transaction table out for you.',
        badge: 'Parsing',
    },
    {
        icon: ChartNoAxesCombined,
        title: 'Spending Dashboard',
        desc: 'Charts for income vs. expenses over time and spending broken down by category.',
        badge: 'Analytics',
    },
    {
        icon: Target,
        title: 'Monthly Budgets',
        desc: "Set a spending limit per category each month and track how much you've used.",
        badge: 'Budgeting',
    },
];

export const FeaturesSection: React.FC = () => {
    return (
        <section className="w-full border-t border-border/60 py-16">
            <div className="mb-12 text-center space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                    Capabilities
                </span>

                <h2 className="text-3xl font-bold font-sans text-foreground">
                    What Ledgr actually does
                </h2>
            </div>

            <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                    <Card
                        key={feature.title}
                        className="group min-w-0 p-6 space-y-4 transition-all hover:border-primary/50 hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <div className="shrink-0 rounded-xl bg-secondary p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <feature.icon className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="min-w-0 space-y-2">
                            <span className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                                {feature.badge}
                            </span>

                            <h3 className="font-semibold text-card-foreground text-base leading-snug">
                                {feature.title}
                            </h3>

                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};
