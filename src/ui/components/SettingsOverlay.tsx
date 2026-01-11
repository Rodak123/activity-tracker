import { DefaultLayout } from '../pages/layouts/DefaultLayout';
import { Card } from './Card';
import { Button } from './Button';
import { TrashIcon, XIcon } from '@phosphor-icons/react';
import { useApp } from '../../libs/hooks/useApp';
import { Typography } from './Typography';
import type { ActivityId } from '../../libs/types/activity';

interface SettingsOverlayProps {
    close: () => void;
}

export const SettingsOverlay: React.FC<SettingsOverlayProps> = ({ close }) => {
    const { activities } = useApp();

    const addActivity = () => {
        console.log('addActivity');
    };

    const removeActivivy = (id: ActivityId) => {
        console.log('removeActivivy', id);
    };

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
                        <Button
                            className='float-end'
                            variant='ghost'
                            onClick={close}
                        >
                            <XIcon className='size-full' />
                        </Button>
                    </div>
                    <div className='grow overflow-y-auto px-4'>
                        <Button
                            variant='outline'
                            size='lg'
                            className='mb-4 w-full'
                            onClick={addActivity}
                        >
                            <Typography size='lg'>
                                Add
                            </Typography>
                        </Button>
                        {activities.map((activity) => {
                            return (
                                <div
                                    key={activity.id}
                                    className='flex gap-4 mb-4'
                                >
                                    <div
                                        className='p-4 rounded-border grow'
                                        style={{
                                            backgroundColor: activity.color
                                        }}
                                    >
                                        <Typography size='lg'>
                                            {activity.name}
                                        </Typography>
                                    </div>
                                    <Button
                                        size='auto'
                                        variant='accent'
                                        className='w-16 p-2'
                                        onClick={() => removeActivivy(activity.id)}
                                    >
                                        <TrashIcon className='size-full' />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </DefaultLayout>
        </div >
    );
};