import { Button } from '../components/ui/Button';
import ActionMenu, { type ActionMenuItem } from '../components/ui/ActionMenu';
import Filter from '../components/ui/Filter';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmptyState } from "../components/ui/Table";
import { useState } from "react";
import { FileText, MoreHorizontal, RefreshCw, Trash2, Eye, Filter as FilterIcon } from "lucide-react";
import { statements } from "../data/mock";
import type { Page } from "../data/mock";

interface StatementsProps {
  onNavigate?: (page: Page) => void;
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
  const navigate = onNavigate ?? (() => undefined);
  const [filterBank, setFilterBank] = useState("all");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = filterBank === "all" ? statements : statements.filter(s => s.bank === filterBank);
  const banks = [...new Set(statements.map(s => s.bank))];
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleFilterChange = (value: string) => {
    setFilterBank(value);
    setPage(1);
  };

  return (
  <div className="p-6">
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      
      <div className="flex items-center justify-end gap-3">
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <FilterIcon size={13} />
          <span>Filters:</span>
        </div>

        <Filter
          value={filterBank}
          onChange={handleFilterChange}
          options={[{ value: 'all', label: 'All' }, ...banks.map((bank) => ({ value: bank, label: bank }))]}
        />

        <Button variant="primary" size="custom"
          onClick={() => navigate("upload")}
          className="px-4 py-2.5 rounded-xl text-[13.5px] font-medium"
        >
          + New upload
        </Button>
      </div>
    </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table caption="Bank statements">
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Transactions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableEmptyState colSpan={6}>No statements match your filter.</TableEmptyState>
            ) : (
              paged.map(stmt => (
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

                    <ActionMenu
                      open={openMenu === stmt.id}
                      items={[
                        { label: 'View', icon: <Eye size={13} />, onClick: () => { navigate('transactions'); setOpenMenu(null); } },
                        { label: 'Reprocess', icon: <RefreshCw size={13} />, onClick: () => setOpenMenu(null) },
                        { label: 'Delete', icon: <Trash2 size={13} />, onClick: () => setOpenMenu(null), danger: true },
                      ] as ActionMenuItem[]}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted">
          <span className="text-[12px] text-muted-foreground">
            {filtered.length === 0 ? 0 : (currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                variant="unstyled"
                size="custom"
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-7 h-7 rounded-lg text-[12px] font-medium transition-colors ${
                  currentPage === i + 1 ? "bg-primary text-accent" : "text-muted-foreground hover:text-muted-foreground hover:bg-muted"
                }`}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
