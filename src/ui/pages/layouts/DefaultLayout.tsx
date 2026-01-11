
interface DefaultLayoutProps {
    children: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div className='w-screen h-screen flex flex-col p-4 gap-4 justify-center items-center'>
            {children}
        </div>
    );
};