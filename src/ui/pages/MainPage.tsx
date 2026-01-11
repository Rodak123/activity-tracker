import { GearIcon } from '@phosphor-icons/react';
import { useApp } from '../../libs/hooks/useApp';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SessionActivityDisplay } from '../components/SessionActivityDisplay';
import { SumSessionActivityDisplay } from '../components/SumSessionActivityDisplay';
import { Typography } from '../components/Typography';
import { DefaultLayout } from './layouts/DefaultLayout';
import { SettingsOverlay } from '../components/SettingsOverlay';
import { useEffect, useState } from 'react';
import { cm } from '../../libs/utils/cm';
import { isToday } from '../../libs/utils/date';
import type { ActivitySession } from '../../libs/types/activity';
import { SessionOverlay } from '../components/SessionOverlay';

export const MainPage: React.FC = () => {
    const { activities, changeActivity, activeSession, activeActivity, dailySessions } = useApp();
    const [settingsOpen, setSettings] = useState<boolean>(false);
    const [openSession, setOpenSession] = useState<ActivitySession | null>(null);

    useEffect(() => {
        if (openSession === null) return;
        setOpenSession(dailySessions[openSession.id]);
    }, [dailySessions]);

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
                <div className='grow grid grid-rows-3 grid-cols-1'>
                    <div className='row-span-2 h-0 min-h-full overflow-auto'>
                        {Object.keys(dailySessions).map((iso) => {
                            const date = new Date(iso);
                            const session = dailySessions[iso] ?? null;

                            const open = () => {
                                if (session === null) return;
                                setOpenSession(session);
                            };

                            return (
                                <Button
                                    title={iso}
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
                        {activities.map((activity) => {
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
                                        className='size-full'
                                        onClick={() => {
                                            changeActivity(activity.id)
                                        }}
                                    >
                                        <Typography size='lg'>
                                            {activity.name}
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
            {openSession !== null &&
                <SessionOverlay session={openSession} close={() => setOpenSession(null)} />
            }
        </DefaultLayout >
    );
};