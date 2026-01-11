
export type ActivityId = number;
export type ActivitySessionId = string;

export interface Activity {
    id: ActivityId;
    name: string;
    color: string;
}

export interface TimedActivity {
    activityId: ActivityId;
    start: Date;
    end: Date;
}

export interface ActivitySession {
    id: ActivitySessionId;
    timedActivites: TimedActivity[];
    start: Date;
    end: Date;
}