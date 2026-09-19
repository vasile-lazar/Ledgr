import {useState, useMemo} from 'react';
import {Input} from '../components/ui/Input';
import {Button} from '../components/ui/Button';
import {Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmptyState} from '../components/ui/Table';
import {Search, Filter, Download, ChevronUp, ChevronDown} from 'lucide-react';
import {useTransactions} from '../hooks/useTransactions';
import {CATEGORY_STYLE} from '../constants/categoryStyle';
import type {TransactionCategory} from '../types';

type SortKey = 'date' | 'merchant' | 'category' | 'amount';

const ALL_CATEGORIES: TransactionCategory[] = [
    'Groceries', 'Transport', 'Salary', 'Entertainment',
    'Dining', 'Shopping', 'Utilities', 'Other',
];

const getPaginationRange = (currentPage: number, totalPages: number): (number | string)[] => {
    const delta = 1; 
    const range: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            range.push(i);
        } else if (
            (i === currentPage - delta - 1 && i > 1) ||
            (i === currentPage + delta + 1 && i < totalPages)
        ) {
            range.push('...');
        }
    }
    
    return range.filter((item, index, array) => item !== '...' || array[index - 1] !== '...');
};

export const Transactions: React.FC = () => {
    const {transactions, isLoading} = useTransactions();
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState<TransactionCategory | 'all'>('all');
    const [sortKey, setSortKey] = useState<SortKey>('date');
    const [sortAsc, setSortAsc] = useState(false);
    const [page, setPage] = useState(1);
    const perPage = 8;

    const filtered = useMemo(() => {
        return transactions
            .filter((t) =>
                (catFilter === 'all' || t.category === catFilter) &&
                (search === '' || t.merchant.toLowerCase().includes(search.toLowerCase()))
            )
            .sort((a, b) => {
                let cmp = 0;
                if (sortKey === 'date') cmp = a.date.localeCompare(b.date);
                else if (sortKey === 'merchant') cmp = a.merchant.localeCompare(b.merchant);
                else if (sortKey === 'category') cmp = a.category.localeCompare(b.category);
                else if (sortKey === 'amount') cmp = a.amount - b.amount;
                return sortAsc ? cmp : -cmp;
            });
    }, [transactions, catFilter, search, sortKey, sortAsc]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) setSortAsc((a) => !a);
        else {
            setSortKey(key);
            setSortAsc(false);
        }
    };

    const SortIcon = ({k}: { k: SortKey }) =>
        sortKey === k ? (sortAsc ? <ChevronUp size={12}/> : <ChevronDown size={12}/>) : null;

    const exportCsv = () => {
        const header = 'Date,Merchant,Category,Amount\n';
        const rows = filtered.map((t) => `${t.date},"${t.merchant}",${t.category},${t.amount}`).join('\n');
        const blob = new Blob([header + rows], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return <div className="p-6 text-sm text-muted-foreground">Loading transactions…</div>;
    }

    return (
        <div className="p-6">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div
                    className="flex items-center gap-3 flex-wrap rounded-xl border border-border bg-card p-1.5 shadow-sm">
                    <div className="flex h-10.5 items-center gap-2 rounded-lg bg-background px-3 min-w-45">
                        <Search size={13} className="text-muted-foreground shrink-0"/>
                        <Input
                            aria-label="Search transactions"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search merchant..."
                            variant="bare"
                            className="text-[13px] w-32 border-0 bg-transparent px-0 py-0"
                        />
                    </div>

                    <div
                        className="relative flex h-10.5 min-w-45 items-center rounded-lg border border-border bg-card px-3 shadow-sm transition-colors hover:border-border/80">
                        <Filter size={13} className="text-muted-foreground shrink-0"/>
                        <select
                            value={catFilter}
                            onChange={(e) => {
                                setCatFilter(e.target.value as TransactionCategory | 'all');
                                setPage(1);
                            }}
                            className="h-full flex-1 appearance-none bg-transparent pr-7 text-[13px] text-foreground outline-none"
                        >
                            <option value="all" className="bg-card">All categories</option>
                            {ALL_CATEGORIES.map((c) => (
                                <option key={c} value={c} className="bg-card">{c}</option>
                            ))}
                        </select>
                        <ChevronDown size={12}
                                     className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
                    </div>
                </div>

                <Button variant="outline" size="custom" onClick={exportCsv}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-medium self-start md:self-auto">
                    <Download size={14}/> Export CSV
                </Button>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <Table caption="Transactions">
                    <TableHeader>
                        <TableRow>
                            {([['date', 'Date'], ['merchant', 'Merchant'], ['category', 'Category'], ['amount', 'Amount']] as [SortKey, string][]).map(([key, label]) => (
                                <TableHead
                                    key={key}
                                    aria-sort={sortKey === key ? (sortAsc ? 'ascending' : 'descending') : 'none'}
                                    className={`cursor-pointer hover:text-muted-foreground transition-colors select-none ${key === 'amount' ? 'text-right' : ''}`}
                                >
                                    <Button variant="unstyled" size="custom" type="button"
                                            onClick={() => toggleSort(key)}
                                            className="inline-flex items-center gap-1 hover:text-foreground">
                                        {label} <SortIcon k={key}/>
                                    </Button>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paged.length === 0 &&
                            <TableEmptyState colSpan={4}>No transactions match your filters.</TableEmptyState>}
                        {paged.map((tx, index) => (
                            <TableRow key={tx.id ?? `${tx.date}-${tx.merchant}-${tx.amount}-${index}`}>
                                <TableCell className="font-mono text-muted-foreground">{tx.date}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2.5">
                                        <span
                                            className="w-2 h-2 rounded-full shrink-0"
                                            style={{backgroundColor: CATEGORY_STYLE[tx.category].color}}
                                        />
                                        <span className="text-foreground font-medium">{tx.merchant}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                                        style={{
                                            backgroundColor: `${CATEGORY_STYLE[tx.category].color}1a`,
                                            color: CATEGORY_STYLE[tx.category].color
                                        }}
                                    >
                                        {tx.category}
                                    </span>
                                </TableCell>
                                <TableCell
                                    className={`text-right font-mono font-medium ${tx.amount > 0 ? 'text-[#10b981]' : 'text-foreground'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} MDL
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted">
                    <span className="text-[12px] text-muted-foreground">
                        {filtered.length === 0 ? 0 : (currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
                    </span>
                    <div className="flex items-center gap-1">
                        <div className="flex items-center gap-1">
                            {getPaginationRange(currentPage, totalPages).map((item, index) => {
                                if (item === '...') {
                                    return (
                                        <span key={`ellipsis-${index}`} className="w-7 text-center text-[12px] text-muted-foreground select-none">
                    …
                </span>
                                    );
                                }

                                const pageNum = item as number;
                                return (
                                    <Button
                                        variant="unstyled"
                                        size="custom"
                                        key={`page-${pageNum}`}
                                        onClick={() => setPage(pageNum)}
                                        className={`w-7 h-7 rounded-lg text-[12px] font-medium transition-colors ${
                                            currentPage === pageNum ? 'bg-primary text-accent' : 'text-muted-foreground hover:bg-muted'
                                        }`}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};