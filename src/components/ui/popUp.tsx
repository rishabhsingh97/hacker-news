import Button from '../interactive/Button';

interface PopupProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

export default function Popup({ title, message, onConfirm, onCancel, isOpen }: PopupProps) {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="popup-actions">
                    <Button type="button" label="Confirm" onClick={onConfirm} />
                    <Button type="button" label="Cancel" onClick={onCancel} />
                </div>
            </div>
        </div>
    );
};
