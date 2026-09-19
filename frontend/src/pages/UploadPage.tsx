import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Upload, Loader2, FileText, X, Clipboard, Trash2} from 'lucide-react';
import toast from 'react-hot-toast';
import {Button} from '../components/ui/Button';
import {Input} from '../components/ui/Input';
import {Table, TableHeader, TableBody, TableRow, TableHead, TableCell} from '../components/ui/Table';
import {useStatements} from '../hooks/useStatements';
import {PATHS} from '../routes/paths';
import type {ParsedTransaction, TransactionCategory} from '../types';

type Stage = 'idle' | 'processing' | 'review';

const CATEGORIES: TransactionCategory[] = [
    'Groceries', 'Transport', 'Salary', 'Entertainment',
    'Dining', 'Shopping', 'Utilities', 'Other',
];

export const UploadPage: React.FC = () => {
    const navigate = useNavigate();
    const {uploadText, uploadPdf, accept, refreshStatements} = useStatements();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [stage, setStage] = useState<Stage>('idle');
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState('');
    const [textInput, setTextInput] = useState('');
    const [transactions, setTransactions] = useState<ParsedTransaction[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const runParse = async (fn: () => Promise<ParsedTransaction[]>, name: string) => {
        setFileName(name);
        setStage('processing');
        try {
            const result = await fn();
            if (result.length === 0) {
                toast.error('No transactions found in this statement.');
                setStage('idle');
                return;
            }
            setTransactions(result);
            setStage('review');
        } catch {
            toast.error('Could not parse this statement. Please try again.');
            setStage('idle');
        }
    };

    const handleFileSelection = (file?: File) => {
        if (!file) return;
        if (file.name.endsWith('.txt')) {
            file.text().then((text) => runParse(() => uploadText(text), file.name));
        } else {
            runParse(() => uploadPdf(file), file.name);
        }
    };

    const handleTextSubmit = () => {
        if (!textInput.trim()) return;
        runParse(() => uploadText(textInput), 'Pasted text');
    };

    const updateRow = (index: number, patch: Partial<ParsedTransaction>) => {
        setTransactions((current) => current.map((t, i) => (i === index ? {...t, ...patch} : t)));
    };

    const removeRow = (index: number) => {
        setTransactions((current) => current.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await accept(transactions);
            await refreshStatements();
            toast.success(`Saved ${transactions.length} transactions.`);
            navigate(PATHS.app.transactions);
        } catch {
            toast.error('Could not save transactions.');
        } finally {
            setIsSaving(false);
        }
    };

    const reset = () => {
        setStage('idle');
        setFileName('');
        setTextInput('');
        setTransactions([]);
    };

    return (
        <div className="p-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className={stage === 'review' ? 'lg:col-span-5' : 'lg:col-span-12'}>
                    {stage === 'idle' && (
                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragging(true);
                            }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setDragging(false);
                                handleFileSelection(e.dataTransfer.files[0]);
                            }}
                            className={`border-2 border-dashed rounded-3xl py-8 px-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                                dragging ? 'border-primary bg-primary/5 scale-[0.99]' : 'border-border bg-card hover:border-primary/50'
                            }`}
                        >
                            <div
                                className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 shadow-sm">
                                <Upload size={36} className="text-primary"/>
                            </div>
                            <div className="text-xl font-semibold text-foreground mb-2">
                                {dragging ? 'Drop here...' : 'Drop PDF or text file here'}
                            </div>
                            <div className="text-sm text-muted-foreground mb-6">or</div>

                            <div className="flex flex-col items-center gap-3 w-full max-w-sm">
                                <input
                                    ref={inputRef}
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileSelection(e.target.files?.[0])}
                                    accept=".pdf,.txt"
                                />
                                <Button type="button" variant="primary" size="custom"
                                        onClick={() => inputRef.current?.click()}
                                        className="w-full px-7 py-3 rounded-xl text-sm font-medium shadow-sm">
                                    Browse files
                                </Button>
                                <Button type="button" variant="outline" size="custom"
                                        onClick={() => setTextInput((c) => c || ' ')}
                                        className="w-full px-7 py-3 rounded-xl text-sm font-medium">
                                    Paste text instead
                                </Button>
                            </div>

                            <div className="mt-8 text-xs text-muted-foreground font-medium">PDF or plain text
                                statement
                            </div>

                            {textInput && (
                                <div
                                    className="mt-6 w-full max-w-md rounded-2xl border border-border bg-muted/20 p-3 text-left">
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <div
                                            className="flex items-center gap-2 text-[12px] font-medium text-foreground">
                                            <Clipboard size={13}/> Plain text
                                        </div>
                                        <Button type="button" variant="unstyled" size="custom"
                                                onClick={() => setTextInput('')}
                                                className="text-muted-foreground hover:text-foreground">
                                            Clear
                                        </Button>
                                    </div>
                                    <textarea
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                        placeholder="Paste transactions here..."
                                        className="min-h-27.5 w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-[12px] text-foreground outline-none"
                                    />
                                    <div className="mt-3 flex justify-end">
                                        <Button type="button" variant="primary" size="custom" onClick={handleTextSubmit}
                                                className="px-4 py-2 rounded-lg text-[12px] font-medium">
                                            Parse text
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {stage === 'processing' && (
                        <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
                            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                                <FileText size={16} className="text-muted-foreground"/>
                            </div>
                            <div className="flex-1">
                                <div className="text-[13.5px] font-medium text-foreground">{fileName}</div>
                                <div className="text-[12px] text-muted-foreground flex items-center gap-2 mt-1">
                                    <Loader2 size={12} className="animate-spin"/> Parsing with local AI…
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {stage === 'review' && (
                    <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="text-[14px] font-semibold text-foreground">
                                Review — {transactions.length} detected transactions
                            </div>
                            <Button aria-label="Close" variant="unstyled" size="custom" onClick={reset}
                                    className="text-muted-foreground hover:text-foreground">
                                <X size={16}/>
                            </Button>
                        </div>
                        <p className="text-[12px] text-muted-foreground -mt-2">
                            Check and correct anything before saving — extraction isn't always perfect.
                        </p>

                        <div className="rounded-xl border border-border overflow-hidden">
                            <Table caption="Statement transaction review" density="compact">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Merchant</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead><span className="sr-only">Remove</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((tx, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Input type="date" value={tx.date}
                                                       onChange={(e) => updateRow(i, {date: e.target.value})}
                                                       className="text-[12px] py-1.5"/>
                                            </TableCell>
                                            <TableCell>
                                                <Input value={tx.merchant}
                                                       onChange={(e) => updateRow(i, {merchant: e.target.value})}
                                                       className="text-[12px] py-1.5"/>
                                            </TableCell>
                                            <TableCell>
                                                <select
                                                    value={tx.category}
                                                    onChange={(e) => updateRow(i, {category: e.target.value as TransactionCategory})}
                                                    className="bg-muted border border-border rounded-lg px-2 py-1.5 text-[12px] text-foreground outline-none"
                                                >
                                                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Input
                                                    type="number" value={tx.amount}
                                                    onChange={(e) => updateRow(i, {amount: Number(e.target.value)})}
                                                    className="text-[12px] py-1.5 text-right font-mono"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button aria-label="Remove row" variant="unstyled" size="custom"
                                                        onClick={() => removeRow(i)}
                                                        className="text-muted-foreground hover:text-destructive">
                                                    <Trash2 size={13}/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button variant="primary" size="custom" onClick={handleSave}
                                    disabled={isSaving || transactions.length === 0}
                                    className="flex-1 py-3 rounded-xl text-[13.5px] font-medium">
                                {isSaving ? 'Saving…' : 'Save Statement'}
                            </Button>
                            <Button variant="outline" size="custom" onClick={reset}
                                    className="px-5 py-3 rounded-xl text-[13.5px] font-medium">
                                Discard
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};