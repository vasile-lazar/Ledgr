import { Button } from '../components/ui/Button';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/Table";
import { useState } from "react";
import { Upload, CheckCircle, Loader2, FileText, X } from "lucide-react";
import { transactions } from "../data/mock";
import type { Page } from "../data/mock";

type Stage = "idle" | "uploading" | "ocr" | "categorizing" | "done";

interface UploadProps {
  onNavigate: (page: Page) => void;
}

const stages: { key: Stage; label: string; desc: string }[] = [
  { key: "uploading", label: "Uploading", desc: "Transferring file to server..." },
  { key: "ocr", label: "OCR Processing", desc: "Extracting text from PDF..." },
  { key: "categorizing", label: "AI Categorizing", desc: "Analyzing and tagging transactions..." },
  { key: "done", label: "Completed", desc: "Your statement is ready" },
];

export default function UploadPage({ onNavigate }: UploadProps) {
  const [stage, setStage] = useState<Stage>("idle");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const simulate = (name: string) => {
    setFileName(name);
    const stageOrder: Stage[] = ["uploading", "ocr", "categorizing", "done"];
    stageOrder.forEach((s, i) => {
      setTimeout(() => setStage(s), i * 1400);
    });
  };

  const stageIdx = stages.findIndex(s => s.key === stage);

  return (
      <div className="p-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column: Expanded Drop Area & Progress */}
          <div className={stage === "done" ? "lg:col-span-5" : "lg:col-span-12"}>
            {stage === "idle" ? (
                <div
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={e => {
                      e.preventDefault();
                      setDragging(false);
                      const file = e.dataTransfer.files[0];
                      if (file) simulate(file.name);
                    }}
                    className={`border-2 border-dashed rounded-3xl py-32 px-12 min-h-[420px] flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                        dragging ? "border-[#10b981] bg-[#10b981]/5 scale-[0.99]" : "border-border bg-card hover:border-primary/50"
                    }`}
                    onClick={() => simulate("BT_Statement_Ian_2024.pdf")}
                >
                  <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-6 shadow-sm">
                    <Upload size={36} className="text-muted-foreground" />
                  </div>
                  <div className="text-xl font-semibold text-foreground mb-2">
                    {dragging ? "Drop here..." : "Drop PDF here"}
                  </div>
                  <div className="text-sm text-muted-foreground mb-6">sau</div>
                  <Button variant="primary" size="custom" className="px-7 py-3 rounded-xl text-sm font-medium shadow-sm">
                    Browse files
                  </Button>
                  <div className="mt-8 text-xs text-muted-foreground font-medium">PDF, CSV · Max 20MB</div>
                </div>
            ) : (
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  {/* File info */}
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                      <FileText size={16} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13.5px] font-medium text-foreground">{fileName}</div>
                      <div className="text-[11px] text-muted-foreground">PDF · 2.4 MB</div>
                    </div>
                    {stage === "done" && (
                        <Button aria-label="Close" variant="unstyled" size="custom" onClick={() => setStage("idle")} className="text-muted-foreground hover:text-foreground">
                          <X size={16} />
                        </Button>
                    )}
                  </div>

                  {/* Steps */}
                  <div className="space-y-3">
                    {stages.map((s, i) => {
                      const completed = stageIdx > i;
                      const active = stages[stageIdx]?.key === s.key;
                      return (
                          <div key={s.key} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                              active ? "border-[#10b981]/30 bg-[#10b981]/5" : "border-border"
                          }`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                completed ? "bg-[#10b981]" : active ? "border-2 border-[#10b981]" : "border border-border"
                            }`}>
                              {completed ? (
                                  <CheckCircle size={14} className="text-white" />
                              ) : active ? (
                                  <Loader2 size={12} className="text-[#10b981] animate-spin" />
                              ) : (
                                  <span className="text-[10px] text-muted-foreground font-mono">{i + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className={`text-[13px] font-medium ${active ? "text-[#10b981]" : completed ? "text-foreground" : "text-muted-foreground"}`}>
                                {s.label}
                              </div>
                              {(active || completed) && (
                                  <div className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</div>
                              )}
                            </div>
                          </div>
                      );
                    })}
                  </div>
                </div>
            )}
          </div>

          {/* Right Column: Results Table */}
          {stage === "done" && (
              <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="text-[14px] font-semibold text-foreground">
                  Preview — {transactions.length} tranzacții detectate
                </div>
                <div className="rounded-xl border border-border overflow-hidden">
                  <Table caption="Statement transaction preview" density="compact">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Merchant</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead className="text-right text-muted-foreground font-medium">Sumă</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.slice(0, 6).map(tx => (
                          <TableRow key={tx.id}>
                            <TableCell className="text-muted-foreground font-mono">{tx.date}</TableCell>
                            <TableCell className="text-foreground">{tx.merchant}</TableCell>
                            <TableCell>
                              <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[11px]">{tx.category}</span>
                            </TableCell>
                            <TableCell className={`text-right font-mono ${tx.amount > 0 ? "text-[#10b981]" : "text-foreground"}`}>
                              {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)} RON
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button variant="primary" size="custom"
                          onClick={() => onNavigate("transactions")}
                          className="flex-1 py-3 rounded-xl text-[13.5px] font-medium"
                  >
                    Save Statement
                  </Button>
                  <Button variant="outline" size="custom"
                          onClick={() => setStage("idle")}
                          className="px-5 py-3 rounded-xl text-[13.5px] font-medium"
                  >
                    Discard
                  </Button>
                </div>
              </div>
          )}

        </div>
      </div>
  );
}