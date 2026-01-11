
export const formatDuration = (ms: number): string => {
    const seconds: number = Math.floor((ms / 1000) % 60);
    const minutes: number = Math.floor((ms / (1000 * 60)) % 60);
    const hours: number = Math.floor(ms / (1000 * 60 * 60));

    const pad = (num: number): string => num.toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours}h ${pad(minutes)}m ${pad(seconds)}s`;
    }

    if (minutes > 0) {
        return `${minutes}m ${pad(seconds)}s`;
    }

    return `${seconds}s`;
}

export const formatDate = (date: Date | string | number): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}