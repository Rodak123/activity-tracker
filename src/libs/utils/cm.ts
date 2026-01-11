import { twMerge } from 'tailwind-merge';
import { cx } from 'tailwind-variants';

export const cm = (...classes: (string | boolean | undefined | null)[]): string => {
    return twMerge(cx(...classes));
};