import type { ComponentProps, ReactNode } from 'react';

type TableProps = ComponentProps<'table'> & {
  caption: string;
  density?: 'default' | 'compact';
};

/** Semantic, horizontally scrollable table. Pages own their data and interactions. */
export default function Table({ caption, density = 'default', className = '', children, ...props }: TableProps) {
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
}

export function TableHeader({ className = '', ...props }: ComponentProps<'thead'>) {
  return <thead className={`bg-muted [&_tr]:hover:bg-transparent ${className}`} {...props} />;
}

export function TableBody(props: ComponentProps<'tbody'>) {
  return <tbody {...props} />;
}

export function TableRow({ className = '', ...props }: ComponentProps<'tr'>) {
  return <tr className={`group border-b border-border last:border-0 hover:bg-muted transition-colors ${className}`} {...props} />;
}

export function TableHead({ className = '', scope = 'col', ...props }: ComponentProps<'th'>) {
  return <th scope={scope} className={`text-left text-muted-foreground font-medium whitespace-nowrap ${className}`} {...props} />;
}

export function TableCell({ className = '', ...props }: ComponentProps<'td'>) {
  return <td className={`align-middle ${className}`} {...props} />;
}

export function TableEmptyState({ colSpan, children = 'No results found.' }: { colSpan: number; children?: ReactNode }) {
  return <TableRow><TableCell colSpan={colSpan} className="text-center text-muted-foreground"><div className="py-6" role="status">{children}</div></TableCell></TableRow>;
}
