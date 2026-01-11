import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
    base: 'inline-flex items-center justify-center whitespace-nowrap rounded-(--radius-border) font-medium ring-offset-bg-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    variants: {
        variant: {
            primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm',
            secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 shadow-sm',
            accent: 'bg-accent-500 text-white hover:bg-accent-600 shadow-sm',

            neutral: 'bg-bg-200 text-text-950 hover:bg-bg-300',
            outline: 'border border-bg-300 bg-transparent hover:bg-bg-100 text-text-950',

            inverted: 'bg-text-950 text-bg-50 hover:bg-text-800',
            ghost: 'hover:bg-bg-100 text-text-950',
        },
        size: {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-4 py-2 text-sm',
            lg: 'h-12 px-8 text-base',
            icon: 'h-10 w-10',
            auto: ''
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    },
});

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    as?: React.ElementType;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant,
    size,
    as: Component = 'button',
    ...props
}, ref) => {
    return (
        <Component
            className={buttonVariants({ variant, size, className })}
            ref={ref}
            {...props}
        />
    );
});

Button.displayName = 'Button';