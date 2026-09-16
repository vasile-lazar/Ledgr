import React from 'react';
import { Card } from '../components/ui/Card';
import { FileText, Target, ChartNoAxesCombined, Bot, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
    icon: LucideIcon;
    title: string;
    desc: string;
    badge: string;
}

const features: Feature[] = [
    { icon: Bot, title: 'LLM Auto-Categorization', desc: 'Automatic transaction tagging powered by specialized AI trained on financial records.', badge: 'AI Engine' },
    { icon: ChartNoAxesCombined, title: 'Data Visualizations', desc: 'Interactive spending charts, merchant breakdowns, and monthly trends.', badge: 'Analytics' },
    { icon: FileText, title: 'Bank Statement OCR', desc: 'Fast parsing for complex PDF bank statements, invoices, and digital receipts.', badge: 'OCR Parsing' },
    { icon: Target, title: 'Budget Control', desc: 'Set monthly budget thresholds with real-time alerts when approaching limits.', badge: 'Management' }
];

export const FeaturesSection: React.FC = () => {
    return (
        <section className="py-16 border-t border-border/60">
            <div className="text-center space-y-3 mb-12">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">Capabilities</span>
                <h2 className="text-3xl font-bold font-sans text-foreground">Everything you need to master your spending</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f, i) => (
                    <Card key={i} className="group p-6 space-y-4 hover:shadow-md hover:border-primary/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div className="p-3 rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <f.icon className="w-5 h-5 shrink-0" />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">{f.badge}</span>
                            <h3 className="font-semibold text-card-foreground text-base leading-snug">{f.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};