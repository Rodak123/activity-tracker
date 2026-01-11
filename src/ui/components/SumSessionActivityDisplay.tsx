import { useApp } from '../../libs/hooks/useApp';
import type { ActivityId, ActivitySession } from '../../libs/types/activity';
import { formatDuration } from '../../libs/utils/format';
import { Typography } from './Typography';

interface SumSessionActivityDisplayProps {
    session: ActivitySession;
    isVertical?: boolean;
}

export const SumSessionActivityDisplay: React.FC<SumSessionActivityDisplayProps> = ({ session, isVertical = true }) => {
    const { activities } = useApp();

    const activityDurations = (session.timedActivites || []).reduce((acc, timed) => {
        const duration = Math.max(timed.end.getTime() - timed.start.getTime(), 1);
        acc[timed.activityId] = (acc[timed.activityId] || 0) + duration;
        return acc;
    }, {} as Record<ActivityId, number>);

    const totalDuration = Object.values(activityDurations).reduce((a, b) => a + b, 0);

    return (
        <div className={`w-full h-full flex gap-4 ${isVertical ? 'flex-col' : 'flex-row'}`}>
            {Object.entries(activityDurations).map(([key, duration]) => {
                const activityId = Number(key) as ActivityId;
                const activity = activities.find((a) => a.id === activityId);
                const space = totalDuration > 0 ? (duration / totalDuration) * 100 : 0;

                return (
                    <div
                        key={activityId}
                        className="group relative rounded-border flex items-center justify-center min-h-5 min-w-5"
                        style={{
                            backgroundColor: activity?.color,
                            flexBasis: `${space}%`,
                            [isVertical ? 'width' : 'height']: '100%',
                        }}
                    >
                        <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[10px] font-bold transition-opacity pointer-events-none px-1 text-center">
                            <div className='size-full flex flex-col justify-center'>
                                <Typography>
                                    {space.toFixed(0)}%
                                </Typography>
                                <Typography>
                                    {formatDuration(duration)}
                                </Typography>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};