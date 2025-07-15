import React from 'react';
import { X } from 'lucide-react';

const RejectionForm = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Rejection Input Form</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RejectionForm;