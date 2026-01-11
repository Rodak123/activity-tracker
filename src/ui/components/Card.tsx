import { cm } from '../../libs/utils/cm';

interface CardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div className={cm('card', className)} {...props}>
            {children}
        </div>
    );
};