import { AppContext } from '../context/AppContext';
import { useActivityManager } from '../hooks/useActivityManager';

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const { state, changeActivity } = useActivityManager();

    return (
        <AppContext.Provider value={{
            ...state,
            changeActivity
        }}>
            {children}
        </AppContext.Provider>
    );
};