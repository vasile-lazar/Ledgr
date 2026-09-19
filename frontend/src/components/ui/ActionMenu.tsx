import type { ReactNode } from 'react';

export interface ActionMenuItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

interface ActionMenuProps {
  open: boolean;
  items: ActionMenuItem[];
  className?: string;
}

export default function ActionMenu({ open, items, className = '' }: ActionMenuProps) {
  if (!open) return null;

  return (
    <div className={`absolute right-0  mb-2 bg-card border border-border rounded-xl shadow-lg py-1 w-40 ${className}`}>
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.onClick}
          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] transition-colors ${
            item.danger
              ? 'text-[#ef4444] hover:bg-[#ef4444]/10'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}
