import { useSyncExternalStore } from 'react';
import type { Activity, ActivityId } from '../types/activity';
import { ActivityManager, type ActivityManagerState } from '../ActivityManager';

const lsKey = 'ActivityManagerState';

const dateReviver = (_: string, value: string) => {
    const isDate = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);
    return isDate ? new Date(value) : value;
};

const defaultActivities: Activity[] = [
    { id: '0', name: 'Other', color: '#777' },
    { id: '1', name: 'School', color: '#f00' },
    { id: '2', name: 'Deep Ignition', color: '#0f0' },
    { id: '3', name: 'Projects', color: '#00f' },
    { id: '4', name: 'Gaming', color: '#ff9500' }
];

const getInitialState = (): ActivityManagerState => {
    const saved = localStorage.getItem(lsKey);
    if (saved) {
        try {
            return JSON.parse(saved, dateReviver);
        } catch (e) {
            console.error(e);
        }
    }
    return {
        activities: defaultActivities,
        activeSession: null,
        activeActivity: defaultActivities[0],
        dailySessions: {}
    };
};

let manager: ActivityManager | null = null;

const init = () => {
    manager = new ActivityManager(getInitialState());
    manager.startTick(1000);

    manager.subscribe((state) => {
        localStorage.setItem(lsKey, JSON.stringify(state));
    });
};
init();

export const useActivityManager = () => {
    const state = useSyncExternalStore(
        (l) => manager!.subscribe(l),
        () => manager!.getState()
    );

    return {
        state,
        changeActivity: (id: ActivityId) => manager!.changeActivity(id),
        addActivity: (activity: Activity) => manager!.addActivity(activity),
        removeActivity: (id: ActivityId) => manager!.removeActivity(id),
        reset: () => {
            localStorage.removeItem(lsKey);
            init();
        }
    };
};