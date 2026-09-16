import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useState } from "react";
import { Camera, Lock, Globe, Palette, Shield, Link } from "lucide-react";

type Tab = "profile" | "preferences" | "security" | "accounts";

export default function Profile() {
  const [tab, setTab] = useState<Tab>("profile");

  const [currency, setCurrency] = useState("RON");
  const [language, setLanguage] = useState("ro");

  const tabs: { id: Tab; label: string; icon: typeof Globe }[] = [
    { id: "profile", label: "Profil", icon: Camera },
    { id: "preferences", label: "Preferințe", icon: Palette },
    { id: "security", label: "Securitate", icon: Shield },
    { id: "accounts", label: "Conturi conectate", icon: Link },
  ];

  return (
    <div className="p-6 max-w-2xl">
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1 mb-6 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <Button variant="unstyled" size="custom"
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              tab === id ? "bg-muted text-foreground" : "text-muted-foreground hover:text-muted-foreground"
            }`}
          >
            <Icon size={13} />
            {label}
          </Button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        {tab === "profile" && (
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#6366f1] flex items-center justify-center text-white text-xl font-bold font-display">
                  AI
                </div>
                <Button aria-label="Change profile photo" variant="outline" size="custom" className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:">
                  <Camera size={11} />
                </Button>
              </div>
              <div>
                <div className="text-[15px] font-semibold text-foreground">Alexandru Ionescu</div>
                <div className="text-[13px] text-muted-foreground">alex.ionescu@gmail.com</div>
                <div className="text-[11px] text-[#10b981] mt-0.5">Pro Plan · activ</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Prenume", value: "Alexandru" },
                { label: "Nume", value: "Ionescu" },
                { label: "Email", value: "alex.ionescu@gmail.com" },
                { label: "Telefon", value: "+40 721 000 000" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label htmlFor={`profile-${label}`} className="block text-[12px] text-muted-foreground mb-1.5">{label}</label>
                  <Input
                    id={`profile-${label}`}
                    defaultValue={value}
                    className="py-2.5 text-[13.5px]"
                  />
                </div>
              ))}
            </div>
            <Button variant="primary" size="custom" className="px-5 py-2.5 rounded-xl text-[13.5px] font-medium">
              Salvează modificările
            </Button>
          </div>
        )}

        {tab === "preferences" && (
          <div className="space-y-5">
            {[
              { label: "Monedă", icon: Globe, options: ["RON", "EUR", "USD"], value: currency, set: setCurrency },
              { label: "Limbă", icon: Globe, options: ["ro", "en", "de"], value: language, set: setLanguage },
             ].map(({ label, icon: Icon, options, value, set }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Icon size={14} className="text-muted-foreground" />
                  </div>
                  <span className="text-[13.5px] text-foreground">{label}</span>
                </div>
                <select
                  value={value}
                  onChange={e => set(e.target.value)}
                  className="bg-muted border border-border rounded-lg px-3 py-2 text-[13px] text-foreground outline-none focus:border-[#10b981] transition-colors"
                >
                  {options.map(o => <option key={o} value={o} className="bg-muted">{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}

        {tab === "security" && (
          <div className="space-y-5">
            <div>
              <div className="text-[13.5px] font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lock size={14} className="text-muted-foreground" /> Schimbă parola
              </div>
              <div className="space-y-3">
                {["Parola curentă", "Parola nouă", "Confirmă parola nouă"].map(l => (
                  <div key={l}>
                    <label htmlFor={`security-${l}`} className="block text-[12px] text-muted-foreground mb-1.5">{l}</label>
                    <Input
                      id={`security-${l}`} type="password"
                      placeholder="••••••••"
                      className="py-2.5 text-[13.5px]"
                    />
                  </div>
                ))}
                <Button variant="primary" size="custom" className="px-5 py-2.5 rounded-xl text-[13.5px] font-medium">
                  Actualizează parola
                </Button>
              </div>
            </div>
            <div className="pt-5 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13.5px] font-semibold text-foreground mb-0.5">Two-Factor Authentication</div>
                  <div className="text-[12px] text-muted-foreground">Adaugă un strat suplimentar de securitate</div>
                </div>
                <Button variant="outline" size="custom" className="px-4 py-2 rounded-lg text-[12.5px]">
                  Activează 2FA
                </Button>
              </div>
            </div>
          </div>
        )}

        {tab === "accounts" && (
          <div className="space-y-4">
            <div className="text-[13px] text-muted-foreground mb-4">Conectează-ți conturile bancare pentru import automat</div>
            {[
              { bank: "Banca Transilvania", connected: true, color: "#1c4ed8" },
              { bank: "Revolut", connected: true, color: "#7c3aed" },
              { bank: "ING Bank", connected: false, color: "#ea580c" },
              { bank: "BCR", connected: false, color: "#16a34a" },
            ].map(({ bank, connected, color }) => (
              <div key={bank} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: color + "33" }}>
                    <div className="w-full h-full rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    </div>
                  </div>
                  <span className="text-[13.5px] text-foreground">{bank}</span>
                </div>
                <div className="flex items-center gap-3">
                  {connected && <span className="text-[11px] text-[#10b981]">Conectat</span>}
                  <Button variant="unstyled" size="custom" className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${connected ? "border border-border text-muted-foreground hover:text-[#ef4444] hover:border-[#ef4444]/30" : "bg-[#10b981] text-white hover:bg-[#059669]"}`}>
                    {connected ? "Deconectează" : "Conectează"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
