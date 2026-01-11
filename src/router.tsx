import { createBrowserRouter } from 'react-router';

import { MainPage } from './ui/pages/MainPage';
import { ErrorPage } from './ui/pages/ErrorPage';

export const router = createBrowserRouter([
    {
        path: '/',
        ErrorBoundary: ErrorPage,
        element: <MainPage />,
    },
]);