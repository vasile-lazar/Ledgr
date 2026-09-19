type AvatarProps = {
    src?: string;
    alt?: string;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
};

const sizeClasses = {
    sm: 'h-8 w-8 text-[11px]',
    md: 'h-10 w-10 text-xs',
    lg: 'h-14 w-14 text-base',
    xl: 'h-16 w-16 text-xl',
};

export const Avatar: React.FC<AvatarProps> = ({
                                                  src,
                                                  alt = 'User avatar',
                                                  name = 'User',
                                                  size = 'md',
                                                  className = '',
                                              }) => {
    const initials = name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('') || 'U';

    return (
        <div
            className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary via-sky-500 to-violet-500 font-semibold text-primary-foreground shadow-sm ${sizeClasses[size]} ${className}`}
            aria-label={alt}
            title={name}
        >
            {src ? (
                <img src={src} alt={alt} className="h-full w-full object-cover"/>
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );
};