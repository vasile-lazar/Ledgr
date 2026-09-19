import type { ComponentProps, ReactNode } from 'react';

type TableProps = ComponentProps<'table'> & {
    caption: string;
    density?: 'default' | 'compact';
};

/** Semantic, horizontally scrollable table. Pages own their data and interactions. */
export const Table: React.FC<TableProps> = ({ caption, density = 'default', className = '', children, ...props }) => {
    return (
        <div className="w-full overflow-x-auto" role="region" aria-label={caption} tabIndex={0}>
            <table
                className={`w-full text-[13px] text-foreground ${density === 'compact' ? '[&_th]:px-4 [&_th]:py-2.5 [&_td]:px-4 [&_td]:py-2.5' : '[&_th]:px-5 [&_th]:py-3.5 [&_td]:px-5 [&_td]:py-3.5'} ${className}`}
                {...props}
            >
                <caption className="sr-only">{caption}</caption>
                {children}
            </table>
        </div>
    );
};

export const TableHeader: React.FC<ComponentProps<'thead'>> = ({ className = '', ...props }) => {
    return <thead className={`bg-muted [&_tr]:hover:bg-transparent ${className}`} {...props} />;
};

export const TableBody: React.FC<ComponentProps<'tbody'>> = (props) => {
    return <tbody {...props} />;
};

export const TableRow: React.FC<ComponentProps<'tr'>> = ({ className = '', ...props }) => {
    return <tr className={`group border-b border-border last:border-0 hover:bg-muted transition-colors ${className}`} {...props} />;
};

export const TableHead: React.FC<ComponentProps<'th'>> = ({ className = '', scope = 'col', ...props }) => {
    return <th scope={scope} className={`text-left text-muted-foreground font-medium whitespace-nowrap ${className}`} {...props} />;
};

export const TableCell: React.FC<ComponentProps<'td'>> = ({ className = '', ...props }) => {
    return <td className={`align-middle ${className}`} {...props} />;
};

export const TableEmptyState: React.FC<{ colSpan: number; children?: ReactNode }> = ({ colSpan, children = 'No results found.' }) => {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} className="text-center text-muted-foreground">
                <div className="py-6" role="status">{children}</div>
            </TableCell>
        </TableRow>
    );
};