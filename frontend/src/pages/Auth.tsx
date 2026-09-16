import { ArrowLeft, Star } from "lucide-react";
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import ThemeToggle from "../components/ui/ThemeToggle";
import { useState } from "react";
import { TrendingUp, Eye, EyeOff } from "lucide-react";
import type { Page } from "../data/mock";

interface AuthProps {
  mode: "login" | "register";
  onNavigate: (page: Page) => void;
}

export default function Auth({ mode, onNavigate }: AuthProps) {
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const isLogin = mode === "login";

  return (<> <div className="fixed right-4 top-4 z-50"><ThemeToggle /></div>
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-96 bg-card border-r border-border p-10">
        <Button variant="unstyled" size="custom" onClick={() => onNavigate("landing")} className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#10b981] flex items-center justify-center">
            <TrendingUp size={14} className="text-white" />
          </div>
          <span className="font-display text-[15px] font-semibold text-foreground">Fintrax</span>
        </Button>
        <div>
          <blockquote className="font-display text-[22px] font-light text-foreground leading-relaxed mb-6 italic">
            "Fintrax m-a ajutat să economisesc 3.000 RON în prima lună."
          </blockquote>
          <div className="text-[13px] text-muted-foreground">Andrei M. — Product Manager</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { v: "98%", l: "Acuratețe AI" },
            { v: "30s", l: "Procesare" },
            { v: "50k+", l: "Utilizatori" },
            { v: "4.9", l: "Rating" },
          ].map(s => (
            <div key={s.l} className="bg-muted rounded-xl p-4 border border-border">
              <div className="font-mono text-[20px] font-semibold text-[#10b981]">{s.v}{s.l === "Rating" && <Star size={16} className="inline ml-1" aria-hidden="true" />}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-display text-[32px] font-light text-foreground mb-2 tracking-tight">
              {isLogin ? "Bun revenit" : "Creează cont"}
            </h1>
            <p className="text-[14px] text-muted-foreground">
              {isLogin ? "Introdu datele pentru a continua" : "Începe să îți urmărești finanțele gratuit"}
            </p>
          </div>

          <form className="space-y-4" onSubmit={e => { e.preventDefault(); onNavigate("dashboard"); }}>
            {!isLogin && (
              <div>
                <label htmlFor="full-name" className="block text-[12px] font-medium text-muted-foreground mb-1.5">Nume complet</label>
                <Input id="full-name" name="full-name" autoComplete="name"
                  type="text"
                  placeholder="Alexandru Ionescu"
                  className="text-[14px]"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-[12px] font-medium text-muted-foreground mb-1.5">Email</label>
              <Input id="email" name="email" autoComplete="email"
                type="email"
                placeholder="alex@exemplu.ro"
                className="text-[14px]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[12px] font-medium text-muted-foreground mb-1.5">Parolă</label>
              <div className="relative">
                <Input id="password" name="password" autoComplete={isLogin ? "current-password" : "new-password"}
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-11 text-[14px]"
                />
                <Button variant="unstyled" size="custom" type="button" aria-label={showPass ? "Hide password" : "Show password"} aria-pressed={showPass} onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </Button>
              </div>
            </div>
            {!isLogin && (
              <div>
                <label htmlFor="confirm-password" className="block text-[12px] font-medium text-muted-foreground mb-1.5">Confirmă parola</label>
                <Input id="confirm-password" name="confirm-password" autoComplete="new-password"
                  type="password"
                  placeholder="••••••••"
                  className="text-[14px]"
                />
              </div>
            )}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                  <span className="text-[13px] text-muted-foreground">Ține-mă minte</span>
                </label>
                <Button variant="link" size="custom" type="button" className="text-[13px]">Ai uitat parola?</Button>
              </div>
            )}
            <Button variant="primary" size="custom"
              type="submit"
              className="w-full py-3 rounded-xl text-[14px] font-medium mt-2"
            >
              {isLogin ? "Autentifică-te" : "Creează cont"}
            </Button>
          </form>

          <div className="mt-6 text-center text-[13px] text-muted-foreground">
            {isLogin ? "Nu ai cont?" : "Ai deja cont?"}{" "}
            <Button variant="link" size="custom"
              onClick={() => onNavigate(isLogin ? "register" : "login")}
              className="font-medium"
            >
              {isLogin ? "Înregistrează-te" : "Autentifică-te"}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Button variant="unstyled" size="custom" onClick={() => onNavigate("landing")} className="text-[12px] text-muted-foreground hover:text-muted-foreground">
              <ArrowLeft size={14} aria-hidden="true" /> Înapoi la pagina principală
            </Button>
          </div>
        </div>
      </div>
    </div>
</>
  );
}
