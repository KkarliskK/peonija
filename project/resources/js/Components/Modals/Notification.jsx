import { useEffect, useState } from "react";

export default function PostNotification({ message, type = 'success', isOpen, onClose }) {
    const [visible, setVisible] = useState(false);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setDisplay(true);  // Show the notification
            setTimeout(() => setVisible(true), 10);  // Trigger slide-in after slight delay
        } else {
            setVisible(false);  // Trigger fade-out
            setTimeout(() => setDisplay(false), 300);  // Wait for fade-out to complete before unmounting
        }
    }, [isOpen]);

    if (!display) return null;  // Avoid rendering when the notification is not active

    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';

    return (
        <div
            className={`popup fixed top-5 right-5 ${bgColor} text-white p-4 rounded shadow-lg flex justify-between items-center
            transition-transform duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}
            transition-opacity duration-300 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <span>{message}</span>
            <button 
                onClick={onClose} 
                className="ml-4 bg-transparent text-white font-bold text-lg focus:outline-none"
            >
                &times;
            </button>
        </div>
    );
}
