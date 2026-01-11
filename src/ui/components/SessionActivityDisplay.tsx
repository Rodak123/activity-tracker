import { useApp } from '../../libs/hooks/useApp';
import type { ActivitySession } from '../../libs/types/activity';

interface SessionActivityDisplayProps {
    session: ActivitySession;
}

export const SessionActivityDisplay: React.FC<SessionActivityDisplayProps> = ({ session }) => {
    const { activities } = useApp();

    const sessionDuration = Math.max(session.end.getTime() - session.start.getTime(), 1);

    return (
        <div className='w-full h-full flex flex-row gap-0 rounded-border overflow-hidden'>
            {session.timedActivites.map((timedActivity, index) => {
                const activity = activities.find((a) => a.id === timedActivity.activityId);

                const activityDuration = Math.max(timedActivity.end.getTime() - timedActivity.start.getTime(), 1);
                const space = activityDuration / sessionDuration;

                return (
                    <div
                        key={index}
                        className='h-full w-24'
                        style={{
                            backgroundColor: activity?.color,
                            width: `${space * 100}%`
                        }}
                    />
                );
            })}
        </div>
    );
};