import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router';
import { router } from './router';
import { ThemeProvider } from './libs/providers/ThemeProvider';
import { AppProvider } from './libs/providers/AppProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme='dark'>
            <AppProvider>
                <RouterProvider router={router} />
            </AppProvider>
        </ThemeProvider>
    </StrictMode>,
);
