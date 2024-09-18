import React from 'react';
import ReactDOM from 'react-dom';

const Popup = ({ isOpen, onClose, title, onConfirm, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 ">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <div className="mb-4">{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Popup;
