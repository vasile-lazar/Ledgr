import { Button } from '../components/ui/Button';
import ThemeToggle from "../components/ui/ThemeToggle";
import { TrendingUp } from "lucide-react";
import type { Page } from "../data/mock";

interface NotFoundProps {
  onNavigate?: (page: Page) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
  const navigate = onNavigate ?? (() => undefined);
  return (<> <div className="fixed right-4 top-4 z-50"><ThemeToggle /></div>
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-8">
      <div className="relative mb-8">
        <div className="font-display text-[160px] font-light text-border leading-none select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center">
            <TrendingUp size={32} className="text-[#10b981]" />
          </div>
        </div>
      </div>
      <h1 className="font-display text-[28px] font-light text-foreground mb-3 tracking-tight">Page not found</h1>
      <p className="text-[14px] text-muted-foreground max-w-xs leading-relaxed mb-8">
        The page may have moved, or the address may be incorrect.
      </p>
      <Button variant="primary" size="custom"
        onClick={() => navigate("dashboard")}
        className="px-6 py-3 rounded-xl text-[14px] font-medium"
      >
        Back to Dashboard
      </Button>
    </div>
</>
  );
}
