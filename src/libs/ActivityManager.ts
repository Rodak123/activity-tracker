import type { Activity, ActivityId, ActivitySession } from './types/activity';
import { addTime, getToday, isAfter } from './utils/date';

export interface ActivityManagerState {
    activities: Activity[];
    activeActivity: Activity | null;
    activeSession: ActivitySession | null;
    dailySessions: Record<string, ActivitySession>;
}

type Listener = (state: ActivityManagerState) => void;

export class ActivityManager {
    private state: ActivityManagerState;
    private listeners = new Set<Listener>();
    private intervalId: ReturnType<typeof setInterval> | null = null;

    constructor(initialState: ActivityManagerState) {
        this.state = initialState;
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private emit() {
        this.listeners.forEach(l => l(this.state));
    }

    startTick(tickMs: number = 1000) {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => this.tick(tickMs), tickMs);
    }

    stopTick() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    addActivity(activityData: Omit<Activity, 'id'>) {
        const newActivity: Activity = {
            ...activityData,
            id: crypto.randomUUID() as ActivityId
        };
        this.state = {
            ...this.state,
            activities: [...this.state.activities, newActivity]
        };
        this.emit();
        return newActivity;
    }

    removeActivity(id: ActivityId) {
        const isCurrentlyActive = this.state.activeActivity?.id === id;
        this.state = {
            ...this.state,
            activities: this.state.activities.filter(a => a.id !== id),
            activeActivity: isCurrentlyActive ? this.state.activities[0] : this.state.activeActivity
        };
        this.emit();
    }

    changeActivity(id: ActivityId) {
        const activity = this.state.activities.find(a => a.id === id);
        if (activity) {
            this.state = { ...this.state, activeActivity: activity };
            this.emit();
        }
    }

    private tick(ms: number) {
        const { activeActivity, dailySessions } = this.state;
        let { activeSession } = this.state;
        if (!activeActivity) return;

        if (!activeSession) {
            const today = getToday();
            const tomorrow = addTime(today, 24 * 60 * 60 * 1000);
            const sessionKey = today.toString();

            activeSession = {
                id: sessionKey,
                start: today,
                end: tomorrow,
                timedActivites: []
            };
        }

        const activities = [...activeSession.timedActivites];

        if (activities.length === 0) {
            activities.push({
                activityId: activeActivity.id,
                start: new Date(activeSession.start),
                end: new Date()
            });
        } else {
            const last = activities[activities.length - 1];
            const nextEnd = new Date();

            if (isAfter(nextEnd, activeSession.end)) {
                this.state = { ...this.state, activeSession: null };
                this.tick(ms);
                return;
            }

            if (last.activityId !== activeActivity.id) {
                activities.push({
                    activityId: activeActivity.id,
                    start: new Date(last.end),
                    end: nextEnd
                });
            } else {
                activities[activities.length - 1] = { ...last, end: nextEnd };
            }
        }

        const updatedSession = { ...activeSession, timedActivites: activities };

        this.state = {
            ...this.state,
            activeSession: updatedSession,
            dailySessions: { ...dailySessions, [updatedSession.id]: updatedSession }
        };
        this.emit();
    }

    getState() { return this.state; }
}