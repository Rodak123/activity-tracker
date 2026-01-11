import { useApp } from '../../libs/hooks/useApp';
import type { ActivitySession } from '../../libs/types/activity';
import { formatDuration } from '../../libs/utils/format';
import { getActivity } from '../../libs/utils/getActivity';
import { Typography } from './Typography';

interface SessionActivityDisplayProps {
    session: ActivitySession;
    isVertical?: boolean;
}

export const SessionActivityDisplay: React.FC<SessionActivityDisplayProps> = ({
    session,
    isVertical = false
}) => {
    const { activities } = useApp();

    const sessionDuration = Math.max(session.end.getTime() - session.start.getTime(), 1);

    return (
        <div className={`w-full h-full flex gap-0 rounded-border relative ${isVertical ? 'flex-col' : 'flex-row'}`}>
            {session.timedActivites.map((timedActivity, index) => {
                const activity = getActivity(timedActivity.activityId, activities);
                const duration = Math.max(timedActivity.end.getTime() - timedActivity.start.getTime(), 1);
                const space = (duration / sessionDuration) * 100;
                const popupPositionClasses = isVertical
                    ? 'left-full top-1/2 -translate-y-1/2 ml-1'
                    : 'top-full left-1/2 -translate-x-1/2 mt-1';

                return (
                    <div
                        key={index}
                        className="group relative flex items-center justify-center min-h-1 min-w-1 z-0 hover:z-20"
                        style={{
                            backgroundColor: activity?.color,
                            flexBasis: `${space}%`,
                            [isVertical ? 'width' : 'height']: '100%',
                        }}
                    >
                        <div className={`opacity-0 group-hover:opacity-100 absolute ${popupPositionClasses} bg-black/80 text-white text-[10px] font-bold transition-opacity pointer-events-none px-2 py-1 rounded shadow-sm whitespace-nowrap`}>
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