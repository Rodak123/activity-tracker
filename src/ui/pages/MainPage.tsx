import { GearIcon } from '@phosphor-icons/react';
import { useApp } from '../../libs/hooks/useApp';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SessionActivityDisplay } from '../components/SessionActivityDisplay';
import { SumSessionActivityDisplay } from '../components/SumSessionActivityDisplay';
import { Typography } from '../components/Typography';
import { DefaultLayout } from './layouts/DefaultLayout';
import { SettingsOverlay } from '../components/SettingsOverlay';
import { useState } from 'react';
import { cm } from '../../libs/utils/cm';
import { isToday } from '../../libs/utils/date';
import type { ActivityId, ActivitySessionId, TimedActivity } from '../../libs/types/activity';
import { SessionOverlay } from '../components/SessionOverlay';
import { formatDate, formatDuration } from '../../libs/utils/format';
import { getActivity } from '../../libs/utils/getActivity';

export const MainPage: React.FC = () => {
    const { activities, changeActivity, activeSession, activeActivity, dailySessions } = useApp();
    const [settingsOpen, setSettings] = useState<boolean>(false);
    const [openSessionId, setOpenSessionId] = useState<ActivitySessionId | null>(null);

    const allTimedActivities: TimedActivity[] = [];
    Object.values(dailySessions).forEach(({ timedActivites }) => allTimedActivities.push(...timedActivites));
    const activityDurations = allTimedActivities.reduce((acc, timed) => {
        const activity = getActivity(timed.activityId, activities);
        if (activity === null) return acc;
        const duration = Math.max(timed.end.getTime() - timed.start.getTime(), 1);
        acc[timed.activityId] = (acc[timed.activityId] || 0) + duration;
        return acc;
    }, {} as Record<ActivityId, number>);
    activities.forEach((activity) => activityDurations[activity.id] = (activityDurations[activity.id] || 0));
    const totalDuration = Object.values(activityDurations).reduce((a, b) => a + b, 0);

    return (
        <DefaultLayout>
            <div className='w-full flex flex-row gap-4'>
                <Card className='grow h-32'>
                    {activeSession
                        ? <SessionActivityDisplay session={activeSession} />
                        : <Typography>No active session</Typography>
                    }
                </Card>
                <div className='w-32 h-32'>
                    <Button
                        onClick={() => setSettings(true)}
                        variant='outline'
                        className='size-full'
                    >
                        <GearIcon style={{
                            width: '100%',
                            height: '100%',
                        }} />
                    </Button>
                </div>
            </div>
            <div className='w-full grow flex flex-row gap-4'>
                <div className='grow grid grid-rows-2 grid-cols-1'>
                    <div className='h-0 min-h-full overflow-auto'>
                        {Object.keys(dailySessions).map((iso) => {
                            const date = new Date(iso);
                            const session = dailySessions[iso] ?? null;

                            const open = () => {
                                if (session === null) return;
                                setOpenSessionId(session.id);
                            };

                            return (
                                <Button
                                    title={formatDate(iso)}
                                    onClick={open}
                                    size='auto'
                                    variant='ghost'
                                    className={cm(
                                        'w-5 h-5 rounded-border float-start m-2 border',
                                        isToday(date) && 'outline-2',
                                        session !== null && 'bg-primary-300 border-0',
                                    )}
                                    key={iso}
                                >
                                </Button>
                            );
                        })}
                    </div>
                    <div>
                        {Object.entries(activityDurations).map(([activityId, duration]) => {
                            const activity = getActivity(activityId, activities);
                            if (activity === null) return;

                            const space = totalDuration > 0 ? (duration / totalDuration) * 100 : 0;
                            const isSelected = activeActivity?.id === activity.id;

                            return (
                                <div
                                    key={activity.id}
                                    className={cm('h-full float-left rounded-border', isSelected && 'outline-4')}
                                    style={{
                                        marginLeft: 'calc(var(--spacing) * 2)',
                                        marginRight: 'calc(var(--spacing) * 2)',
                                        width: `calc(${100 / activities.length}% - var(--spacing) * 4)`,
                                        backgroundColor: activity.color
                                    }}
                                >
                                    <Button
                                        size='auto'
                                        variant='ghost'
                                        className='size-full flex flex-col'
                                        onClick={() => {
                                            changeActivity(activity.id)
                                        }}
                                    >
                                        <Typography size='lg'>
                                            {activity.name}
                                        </Typography>
                                        <Typography>
                                            {formatDuration(duration)} | {space.toFixed(2)}%
                                        </Typography>
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Card className='w-32 shrink-0'>
                    {activeSession
                        ? (
                            <SumSessionActivityDisplay session={activeSession} />
                        )
                        : (
                            <Typography>No active session</Typography>
                        )
                    }
                </Card>
            </div>
            {settingsOpen &&
                <SettingsOverlay close={() => setSettings(false)} />
            }
            {openSessionId !== null &&
                <SessionOverlay sessionId={openSessionId} close={() => setOpenSessionId(null)} />
            }
        </DefaultLayout >
    );
};