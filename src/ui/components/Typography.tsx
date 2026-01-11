import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const typographyVariants = tv({
    base: 'antialiased',
    variants: {
        variant: {
            h1: 'font-extrabold tracking-tight leading-tight',
            h2: 'font-semibold tracking-tight leading-snug',
            h3: 'font-semibold tracking-normal leading-snug',
            h4: 'font-medium tracking-normal leading-snug',
            h5: 'font-medium tracking-normal leading-normal',
            h6: 'font-medium tracking-normal leading-normal',
            text: 'font-normal leading-relaxed tracking-normal',
            label: 'font-medium leading-none tracking-wide text-slate-500',
        },
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl',
            '4xl': 'text-4xl',
            '5xl': 'text-5xl',
        },
        col: {
            default: '',
            light: 'text-white',
            dark: 'text-black'
        }
    },
    defaultVariants: {
        variant: 'text',
        size: 'md',
        col: 'default'
    },
});

const TAG_MAP: Record<string, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    label: 'label',
    text: 'p',
};

interface TypographyProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
    as?: React.ElementType;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(({
    className,
    variant = 'text',
    size,
    col,
    as,
    children,
    ...props
}, ref) => {
    const Component = as || TAG_MAP[variant] || 'p';

    return (
        <Component
            className={typographyVariants({ variant, size, col, className })}
            ref={ref}
            {...props}
        >
            {children}
        </Component>
    );
});

Typography.displayName = 'Typography';