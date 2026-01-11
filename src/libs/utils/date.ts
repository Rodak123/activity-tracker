const ensureDate = (d: Date | string): Date => typeof d === 'string' ? new Date(d) : d;

export const isToday = (date: Date | string): boolean => {
    const d = ensureDate(date);
    const today = new Date();
    return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
    );
};

export const getToday = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Sets h, m, s, ms at once
    return today;
};

export const addTime = (a: Date | string, ms: number) => new Date(ensureDate(a).getTime() + ms);

export const isAfter = (a: Date | string, b: Date | string) => ensureDate(a).getTime() > ensureDate(b).getTime();

export const isBefore = (a: Date | string, b: Date | string) => ensureDate(a).getTime() < ensureDate(b).getTime();