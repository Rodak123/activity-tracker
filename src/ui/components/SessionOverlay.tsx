import { DefaultLayout } from '../pages/layouts/DefaultLayout';
import { Card } from './Card';
import { Button } from './Button';
import { XIcon } from '@phosphor-icons/react';
import type { ActivitySessionId } from '../../libs/types/activity';
import { SessionActivityDisplay } from './SessionActivityDisplay';
import { SumSessionActivityDisplay } from './SumSessionActivityDisplay';
import { useApp } from '../../libs/hooks/useApp';
import { Typography } from './Typography';
import { formatDate } from '../../libs/utils/format';

interface SessionOverlayProps {
    close: () => void;
    sessionId: ActivitySessionId;
}

export const SessionOverlay: React.FC<SessionOverlayProps> = ({ close, sessionId }) => {
    const { dailySessions } = useApp();
    const session = dailySessions[sessionId];
    return (
        <div
            onClick={close}
            className='absolute top-0 left-0 bottom-0 right-0 backdrop-blur-sm'
        >
            <DefaultLayout>
                <Card
                    className='min-w-8/12 min-h-8/12 flex flex-col gap-4'
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        <Typography size='5xl' className='float-left'>
                            Session {formatDate(session.id)}
                        </Typography>
                        <Button
                            className='float-end'
                            variant='ghost'
                            onClick={close}
                        >
                            <XIcon className='size-full' />
                        </Button>
                    </div>
                    <div className='grow overflow-y-auto px-4 flex gap-4 flex-col'>
                        <Card className='grow'>
                            <SessionActivityDisplay session={session} />
                        </Card>
                        <Card className='grow'>
                            <SumSessionActivityDisplay isVertical={false} session={session} />
                        </Card>
                    </div>
                </Card>
            </DefaultLayout>
        </div >
    );
};