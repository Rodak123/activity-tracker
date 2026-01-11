import { useApp } from '../../libs/hooks/useApp';
import type { ActivityId, ActivitySession } from '../../libs/types/activity';
import { formatDuration } from '../../libs/utils/format';
import { getActivity } from '../../libs/utils/getActivity';
import { Typography } from './Typography';

interface SumSessionActivityDisplayProps {
    session: ActivitySession;
    isVertical?: boolean;
}

export const SumSessionActivityDisplay: React.FC<SumSessionActivityDisplayProps> = ({ session, isVertical = true }) => {
    const { activities } = useApp();

    const activityDurations = (session.timedActivites || []).reduce((acc, timed) => {
        const activity = getActivity(timed.activityId, activities);
        if (activity === null) return acc;
        const duration = Math.max(timed.end.getTime() - timed.start.getTime(), 1);
        acc[timed.activityId] = (acc[timed.activityId] || 0) + duration;
        return acc;
    }, {} as Record<ActivityId, number>);

    delete activityDurations[activities[0].id];

    const totalDuration = Object.values(activityDurations).reduce((a, b) => a + b, 0);

    return (
        <div className={`w-full h-full flex gap-4 relative ${isVertical ? 'flex-col' : 'flex-row'}`}>
            {Object.entries(activityDurations).map(([activityId, duration]) => {
                const activity = getActivity(activityId, activities);
                const space = totalDuration > 0 ? (duration / totalDuration) * 100 : 0;

                const popupPositionClasses = 'bottom-full left-1/2 -translate-x-1/2 mb-2';

                return (
                    <div
                        key={activityId}
                        className="group relative rounded-border flex items-center justify-center min-h-5 min-w-5 z-0 hover:z-20"
                        style={{
                            backgroundColor: activity?.color,
                            flexBasis: `${space}%`,
                            [isVertical ? 'width' : 'height']: '100%',
                        }}
                    >
                        <div className={`opacity-0 group-hover:opacity-100 absolute ${popupPositionClasses} bg-black/80 text-white text-[10px] font-bold transition-opacity pointer-events-none px-2 py-1 rounded shadow-md whitespace-nowrap z-50`}>
                            <div className='flex flex-col justify-center items-center'>
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