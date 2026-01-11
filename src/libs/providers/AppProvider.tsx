import { AppContext } from '../context/AppContext';
import { useActivityManager } from '../hooks/useActivityManager';

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const { state, changeActivity, reset, addActivity, removeActivity } = useActivityManager();

    const resetApp = () => {
        reset();
    };

    return (
        <AppContext.Provider value={{
            ...state,
            changeActivity,
            addActivity,
            removeActivity,
            resetApp
        }}>
            {children}
        </AppContext.Provider>
    );
};