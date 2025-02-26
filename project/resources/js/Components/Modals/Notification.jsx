import { useEffect, useState } from "react";

export default function PostNotification({ message, type = 'success', isOpen, onClose }) {
    const [visible, setVisible] = useState(false);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setDisplay(true); 
            setTimeout(() => setVisible(true), 10); 
        } else {
            setVisible(false); 
            setTimeout(() => setDisplay(false), 300);  
        }
    }, [isOpen]);

    if (!display) return null;  

    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';

    return (
        <div
            className={`popup fixed top-5 right-5 ${bgColor} text-white p-4 rounded shadow-lg flex justify-between items-center`}
            style={{
                opacity: visible ? 1 : 0,          
                transform: visible ? 'translateX(0)' : 'translateX(100%)',
                zIndex: 9999,                     
                transition: 'opacity 0.3s, transform 0.3s', 
            }}
        >
            <span>{message}</span>
            <button 
                onClick={onClose} 
                className="ml-4 text-lg font-bold text-white bg-transparent focus:outline-none"
            >
                &times;
            </button>
        </div>
    );

}

