interface ErrorMsgProps {
    error?: string | null;
    className?: string; 
}

export default function ErrorMsg({ error, className = "" }: ErrorMsgProps) {
    return (
        <div className={className}>
            {error && <p className="error-message">{error}</p>} 
        </div>
    );
}
