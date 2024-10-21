interface CardProps {
    className?: string;
    children: React.ReactNode;
}

export default function Card({ children , className = ""}: CardProps) {
    return (
        <div className={`card ${className}`}>
            {children}
        </div>
    );
}
