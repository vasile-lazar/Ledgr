import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import ActionMenu, { type ActionMenuItem } from '../components/ui/ActionMenu';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmptyState } from "../components/ui/Table";
import { useState } from "react";
import { Search, Filter, Download, Pencil, Trash2, X, ChevronUp, ChevronDown } from "lucide-react";
import { transactions } from "../data/mock";

type SortKey = "date" | "merchant" | "category" | "amount";

const categoryColors: Record<string, string> = {
  Income: "text-[#10b981] bg-[#10b981]/10",
  Groceries: "text-[#3b82f6] bg-[#3b82f6]/10",
  Shopping: "text-[#6366f1] bg-[#6366f1]/10",
  Restaurants: "text-[#f59e0b] bg-[#f59e0b]/10",
  Transport: "text-[#0ea5e9] bg-[#0ea5e9]/10",
  Subscriptions: "text-[#ec4899] bg-[#ec4899]/10",
  Home: "text-[#8b5cf6] bg-[#8b5cf6]/10",
};

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedTx, setSelectedTx] = useState<typeof transactions[0] | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const categories = ["all", ...new Set(transactions.map(t => t.category))];

  const filtered = transactions
    .filter(t =>
      (catFilter === "all" || t.category === catFilter) &&
      (search === "" || t.merchant.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === "date") cmp = a.date.localeCompare(b.date);
      else if (sortKey === "merchant") cmp = a.merchant.localeCompare(b.merchant);
      else if (sortKey === "category") cmp = a.category.localeCompare(b.category);
      else if (sortKey === "amount") cmp = a.amount - b.amount;
      return sortAsc ? cmp : -cmp;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(a => !a);
    else { setSortKey(key); setSortAsc(false); }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : null;

  return (
    <div className="p-6">
      

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3 flex-wrap rounded-xl border border-border bg-card p-1.5 shadow-sm">
        <div className="flex h-[42px] items-center gap-2 rounded-lg bg-background px-3 min-w-[180px]">
            <Search size={13} className="text-muted-foreground shrink-0" />
            <Input aria-label="Search transactions"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search merchant..."
            variant="bare"
            className="text-[13px] w-32 border-0 bg-transparent px-0 py-0"
          />
        </div>

        <div className="relative flex h-[42px] min-w-[180px] items-center rounded-lg border border-border bg-card px-3 shadow-sm transition-colors hover:border-border/80">
          <Filter size={13} className="text-muted-foreground shrink-0" />
          <select
            value={catFilter}
            onChange={e => { setCatFilter(e.target.value); setPage(1); }}
            className="h-full flex-1 appearance-none bg-transparent pr-7 text-[13px] text-foreground outline-none"
          >
            {categories.map(c => <option key={c} value={c} className="bg-card">{c === "all" ? "All categories" : c}</option>)}
          </select>
          <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

        <Button variant="outline" size="custom" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-medium self-start md:self-auto">
          <Download size={14} /> Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table caption="Transactions">
          <TableHeader>
            <TableRow>
              {([["date", "Data"], ["merchant", "Merchant"], ["category", "Categorie"], ["amount", "Sumă"]] as [SortKey, string][]).map(([key, label]) => (
                <TableHead
                  key={key}
                  aria-sort={sortKey === key ? (sortAsc ? "ascending" : "descending") : "none"}
                  className={`cursor-pointer hover:text-muted-foreground transition-colors select-none ${key === "amount" ? "text-right" : ""}`}
                >
                  <Button variant="unstyled" size="custom" type="button" onClick={() => toggleSort(key)} className="inline-flex items-center gap-1 hover:text-foreground">
                    {label} <SortIcon k={key} />
                  </Button>
                </TableHead>
              ))}
              <TableHead className="w-20"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 && <TableEmptyState colSpan={5}>No transactions match your filters.</TableEmptyState>}
            {paged.map(tx => (
              <TableRow
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="cursor-pointer"
              >
                <TableCell className="font-mono text-muted-foreground">{tx.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <span className="text-base"><tx.icon size={20} aria-hidden="true" className="shrink-0" /></span>
                    <Button variant="unstyled" size="custom" type="button" onClick={() => setSelectedTx(tx)} className="text-foreground font-medium text-left">{tx.merchant}</Button>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${categoryColors[tx.category] || "text-muted-foreground bg-muted"}`}>
                    {tx.category}
                  </span>
                </TableCell>
                <TableCell className={`text-right font-mono font-medium ${tx.amount > 0 ? "text-[#10b981]" : "text-foreground"}`}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)} RON
                </TableCell>
                <TableCell className="text-right relative" onClick={e => e.stopPropagation()}>
                  <Button
                    aria-label={`Actions for ${tx.merchant}`}
                    variant="unstyled"
                    size="custom"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-muted-foreground hover:bg-muted"
                    onClick={() => setOpenMenu(openMenu === tx.id ? null : tx.id)}
                  >
                    <Pencil size={12} />
                  </Button>

                  <ActionMenu
                    open={openMenu === tx.id}
                    items={[
                      { label: 'Edit', icon: <Pencil size={12} />, onClick: () => { setSelectedTx(tx); setOpenMenu(null); } },
                      { label: 'Delete', icon: <Trash2 size={12} />, onClick: () => { setOpenMenu(null); setSelectedTx(null); }, danger: true },
                    ] as ActionMenuItem[]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted">
          <span className="text-[12px] text-muted-foreground">
            {filtered.length === 0 ? 0 : (page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button variant="unstyled" size="custom"
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-7 h-7 rounded-lg text-[12px] font-medium transition-colors ${
                  page === i + 1 ? "bg-primary text-accent" : "text-muted-foreground hover:text-muted-foreground hover:bg-muted"
                }`}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTx(null)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl"><selectedTx.icon size={20} aria-hidden="true" className="shrink-0" /></div>
                <div>
                  <div className="text-[15px] font-semibold text-foreground">{selectedTx.merchant}</div>
                  <div className="text-[12px] text-muted-foreground">{selectedTx.date}</div>
                </div>
              </div>
              <Button aria-label="Close" variant="unstyled" size="custom" onClick={() => setSelectedTx(null)} className="text-muted-foreground hover:text-muted-foreground">
                <X size={16} />
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Amount", value: `${selectedTx.amount > 0 ? "+" : ""}${selectedTx.amount.toFixed(2)} RON`, mono: true, color: selectedTx.amount > 0 ? "#10b981" : "var(--foreground)" },
                { label: "Category", value: selectedTx.category },
                { label: "Date", value: selectedTx.date, mono: true },
                { label: "Notes", value: "—" },
              ].map(({ label, value, mono, color }) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-border last:border-0">
                  <span className="text-[12px] text-muted-foreground">{label}</span>
                  <span className={`text-[13px] font-medium ${mono ? "font-mono" : ""}`} style={{ color: color || "var(--foreground)" }}>{value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <Button variant="outline" size="custom" className="flex-1 py-2.5 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2">
                <Pencil size={13} /> Edit
              </Button>
              <Button aria-label="Delete" variant="unstyled" size="custom" className="py-2.5 px-4 rounded-xl border border-[#ef4444]/30 text-[#ef4444] text-[13px] font-medium hover:bg-[#ef4444]/10">
                <Trash2 size={13} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
