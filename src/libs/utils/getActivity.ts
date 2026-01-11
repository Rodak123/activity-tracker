import type { Activity, ActivityId } from '../types/activity';

export const getActivity = (id: ActivityId, activities: Activity[]) => activities.find((a) => a.id === id) ?? null;