export type FilterOption = string | { value: string; label: string };

interface FilterProps {
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
    placeholder?: string;
    className?: string;
}

export const Filter: React.FC<FilterProps> = ({ value, onChange, options, placeholder = 'Filter', className = '' }) => {
    const normalizedOptions = options.map((option) =>
        typeof option === 'string' ? { value: option, label: option } : option,
    );

    return (
        <div className={`flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 ${className}`}>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="bg-transparent text-[13px] text-foreground outline-none"
                aria-label={placeholder}
            >
                {normalizedOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-card">
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};