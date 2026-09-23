import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FileText} from 'lucide-react';
import {Button} from '../components/ui/Button';
import {Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmptyState} from '../components/ui/Table';
import {useStatements} from '../hooks/useStatements';
import {PATHS} from '../routes/paths';

export const Statements: React.FC = () => {
    const navigate = useNavigate();
    const {statements, isLoadingStatements} = useStatements();
    const [page, setPage] = useState(1);
    const perPage = 6;

    const totalPages = Math.max(1, Math.ceil(statements.length / perPage));
    const currentPage = Math.min(page, totalPages);
    const paged = statements.slice((currentPage - 1) * perPage, currentPage * perPage);

    if (isLoadingStatements) {
        return <div className="p-6 text-sm text-muted-foreground">Loading statements…</div>;
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-end">
                <Button
                    variant="primary" size="custom"
                    onClick={() => navigate(PATHS.app.upload)}
                    className="px-4 py-2.5 rounded-xl text-[13.5px] font-medium"
                >
                    + New upload
                </Button>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <Table caption="Bank statements">
                    <TableHeader>
                        <TableRow>
                            <TableHead>File</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Transactions</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paged.length === 0 ? (
                            <TableEmptyState colSpan={4}>No statements uploaded yet.</TableEmptyState>
                        ) : (
                            paged.map((stmt) => (
                                <TableRow key={stmt.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                                <FileText size={14} className="text-muted-foreground"/>
                                            </div>
                                            <div className="text-foreground font-medium">
                                                {stmt.filePath ? stmt.filePath.split(/[/\\]/).pop() : 'Pasted text'}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-muted-foreground">{stmt.date}</TableCell>
                                    <TableCell className="font-mono text-foreground">{stmt.transactions}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted">
                    <span className="text-[12px] text-muted-foreground">
                        {statements.length === 0 ? 0 : (currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, statements.length)} of {statements.length}
                    </span>
                    <div className="flex items-center gap-1">
                        {Array.from({length: totalPages}, (_, i) => (
                            <Button
                                variant="unstyled" size="custom" key={i}
                                onClick={() => setPage(i + 1)}
                                className={`w-7 h-7 rounded-lg text-[12px] font-medium transition-colors ${
                                    currentPage === i + 1 ? 'bg-primary text-accent' : 'text-muted-foreground hover:bg-muted'
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
};