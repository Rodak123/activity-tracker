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
    const { activities, addActivity, removeActivity, resetApp } = useApp();

    const addActivityAction = () => {
        const name = prompt('Pick a name');
        if (!name || name.length === 0) return;

        const color = prompt('Pick a color');
        if (!color || color.length === 0) return;

        addActivity({
            id: '',
            color: (color.startsWith('#') ? color : `#${color}`),
            name: name
        });
    };

    const removeActivivyAction = (id: ActivityId) => {
        removeActivity(id);
    };

    const resetAppAction = () => {
        const yes = confirm('Reset?');
        if (!yes) return;
        resetApp();
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
                        <Typography size='5xl' className='float-left'>
                            Settings
                        </Typography>
                        <Button
                            className='float-end'
                            variant='ghost'
                            onClick={close}
                        >
                            <XIcon className='size-full' />
                        </Button>
                    </div>
                    <div className='grow overflow-y-auto px-4'>
                        <Typography size='4xl' className='text-center'>
                            Activities
                        </Typography>
                        <div>
                            <Button
                                variant='outline'
                                size='lg'
                                className='mb-4 w-full'
                                onClick={addActivityAction}
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
                                            onClick={() => removeActivivyAction(activity.id)}
                                        >
                                            <TrashIcon className='size-full' />
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                        <Typography size='4xl' className='text-center'>
                            App
                        </Typography>
                        <div className='flex flex-col gap-0 mt-2'>
                            <Button
                                variant='accent'
                                size='lg'
                                className='w-full'
                                onClick={resetAppAction}
                            >
                                <Typography size='lg'>
                                    Reset
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </Card>
            </DefaultLayout>
        </div >
    );
};