import { Button } from '../components/ui/Button';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/Table";
import { useState } from "react";
import { FileText, MoreHorizontal, RefreshCw, Trash2, Eye, Filter } from "lucide-react";
import { statements } from "../data/mock";
import type { Page } from "../data/mock";

interface StatementsProps {
  onNavigate: (page: Page) => void;
}

const statusColors: Record<string, string> = {
  processed: "text-[#10b981] bg-[#10b981]/10",
  processing: "text-[#f59e0b] bg-[#f59e0b]/10",
  failed: "text-[#ef4444] bg-[#ef4444]/10",
};

const bankColors: Record<string, string> = {
  "Banca Transilvania": "#1c4ed8",
  "Revolut": "#7c3aed",
  "ING Bank": "#ea580c",
};

export default function Statements({ onNavigate }: StatementsProps) {
  const [filterBank, setFilterBank] = useState("all");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filtered = filterBank === "all" ? statements : statements.filter(s => s.bank === filterBank);
  const banks = [...new Set(statements.map(s => s.bank))];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-[28px] font-light text-foreground tracking-tight">Statements</h2>
          <p className="text-[13.5px] text-muted-foreground mt-1">{statements.length} extrase importate</p>
        </div>
        <Button variant="primary" size="custom"
          onClick={() => onNavigate("upload")}
          className="px-4 py-2.5 rounded-xl text-[13.5px] font-medium"
        >
          + Upload nou
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <Filter size={13} />
          <span>Filtre:</span>
        </div>
        {["all", ...banks].map(b => (
          <Button variant="unstyled" size="custom"
            key={b}
            onClick={() => setFilterBank(b)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
              filterBank === b
                ? "bg-[#10b981] text-white"
                : "bg-card border border-border text-muted-foreground hover:text-muted-foreground"
            }`}
          >
            {b === "all" ? "Toate" : b}
          </Button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table caption="Bank statements">
          <TableHeader>
            <TableRow>
              <TableHead>Fișier</TableHead>
              <TableHead>Bancă</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tranzacții</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(stmt => (
              <TableRow key={stmt.id} >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <FileText size={14} className="text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-foreground font-medium">{stmt.file}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: bankColors[stmt.bank] || "var(--muted-foreground)" }}
                    />
                    <span className="text-muted-foreground">{stmt.bank}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-muted-foreground">{stmt.date}</TableCell>
                <TableCell className="font-mono text-foreground">{stmt.transactions}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize ${statusColors[stmt.status]}`}>
                    {stmt.status}
                  </span>
                </TableCell>
                <TableCell className="text-right relative">
                  <Button variant="unstyled" size="custom"
                    aria-label={`Actions for ${stmt.file}`}
                    aria-expanded={openMenu === stmt.id}
                    onClick={() => setOpenMenu(openMenu === stmt.id ? null : stmt.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-muted-foreground hover:bg-muted"
                  >
                    <MoreHorizontal size={15} />
                  </Button>
                  {openMenu === stmt.id && (
                    <div className="mt-2 bg-card border border-border rounded-xl shadow-lg py-1 w-40">
                      <Button variant="unstyled" size="custom" onClick={() => { onNavigate("transactions"); setOpenMenu(null); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-muted-foreground hover:text-foreground hover:bg-muted">
                        <Eye size={13} /> View
                      </Button>
                      <Button variant="unstyled" size="custom" onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-muted-foreground hover:text-foreground hover:bg-muted">
                        <RefreshCw size={13} /> Reprocess
                      </Button>
                      <Button variant="unstyled" size="custom" onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-[#ef4444] hover:bg-[#ef4444]/10">
                        <Trash2 size={13} /> Delete
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
