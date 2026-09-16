import React from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from "../routes/paths";
import { Button } from '../components/ui/Button';
import { ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';

export const HeroSection: React.FC = () => {
    return (
        <section className="pt-8 pb-12 sm:pt-16 sm:pb-20 text-center space-y-8 max-w-5xl mx-auto relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium tracking-wide">
                <Zap className="w-3.5 h-3.5" />
                <span>Next-Gen Enterprise Expense Engine</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight font-sans leading-[1.15]">
                Master corporate spend <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    with autonomous audit AI
                </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Eliminate manual receipts, prevent duplicate billing, and enforce company compliance policies automatically before reimbursement payouts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link to={PATHS.APP.UPLOAD} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto gap-2 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                        Start Autonomous Audit
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
                <a href="#how-it-works" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                        Explore Security Standards
                    </Button>
                </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 pt-6 text-xs text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>SOC2 Type II Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-primary" />
                    <span>Zero-Data Retention Pipeline</span>
                </div>
            </div>

            <div className="pt-8">
                <div className="rounded-2xl border border-border bg-card shadow-2xl p-4 sm:p-6 text-left max-w-4xl mx-auto space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-destructive/60" />
                            <span className="w-3 h-3 rounded-full bg-chart-4/60" />
                            <span className="w-3 h-3 rounded-full bg-primary/60" />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">Compliance Engine v2.4</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                            <div className="text-xs text-muted-foreground">Audit Pass Rate</div>
                            <div className="text-2xl font-bold font-mono text-foreground mt-1">99.4%</div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                            <div className="text-xs text-muted-foreground">Policy Violations Blocked</div>
                            <div className="text-2xl font-bold font-mono text-foreground mt-1">$142,800</div>
                        </div>
                        <div className="p-4 rounded-xl bg-accent/40 border border-accent">
                            <div className="text-xs text-accent-foreground font-medium">Flagged Alert</div>
                            <div className="text-xs text-foreground mt-1 font-sans">Duplicate invoice detected across Q2 SaaS spend.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};