import { isRouteErrorResponse, useRouteError } from 'react-router';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { Link } from 'react-router';

interface ErrorCardLayoutProps {
    children: React.ReactNode;
}

const ErrorCardLayout: React.FC<ErrorCardLayoutProps> = ({ children }) => {
    return (
        <DefaultLayout>
            <div className="w-full max-w-sm space-y-6 p-8 rounded-2xl border border-(--background-200) shadow-sm">
                {children}
            </div>
        </DefaultLayout>
    );
};

export const ErrorPage: React.FC = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <ErrorCardLayout>
                <Typography variant='h1' size='5xl' className='text'>
                    {error.status}
                </Typography>
                <Typography variant='h2' size='3xl'>
                    {error.statusText}
                </Typography>
                <Typography>
                    {error.data}
                </Typography>
                <Link to='/' >
                    <Button className='w-full'>
                        Home
                    </Button>
                </Link>
            </ErrorCardLayout>
        );
    }

    if (error instanceof Error) {
        return (
            <ErrorCardLayout>
                <Typography variant='h1' size='5xl' className='text-center'>
                    Error
                </Typography>
                <Typography>
                    {error.message}
                </Typography>
                <Typography>
                    The stack trace is:
                </Typography>
                <pre>{error.stack}</pre>
            </ErrorCardLayout>
        );
    }

    return (
        <ErrorCardLayout>
            <Typography variant='h1' size='5xl' className='text-center'>
                Unknown Error
            </Typography>
        </ErrorCardLayout>
    );
};