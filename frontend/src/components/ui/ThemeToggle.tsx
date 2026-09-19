import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/theme';
import { Button } from './Button';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="relative h-9 w-9 overflow-hidden p-2 text-muted-foreground transition-colors duration-300 hover:text-primary"
        >
            <div
                className={`absolute transform transition-all duration-300 ease-in-out ${
                    isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
                }`}
            >
                <Sun size={16} />
            </div>
            <div
                className={`transform transition-all duration-300 ease-in-out ${
                    isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'
                }`}
            >
                <Moon size={16} />
            </div>
        </Button>
    );
};