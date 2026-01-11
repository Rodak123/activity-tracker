
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