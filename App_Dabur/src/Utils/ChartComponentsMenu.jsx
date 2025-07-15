

import React from 'react';
import { FiMaximize2, FiEdit, FiTrash2 } from 'react-icons/fi';

const ChartsMenu = ({ onFullScreen, onEdit, onRemove }) => {
    return (
        <div className="p-1 bg-white w-32 shadow-lg rounded-md z-50 text-sm text-gray-700 border border-gray-200">
            <button
                className="flex items-center space-x-2 w-full px-2 py-1 rounded-md hover:bg-gray-200 hover:text-blue-600 transition-colors duration-200"
                onClick={onFullScreen}
            >
                <FiMaximize2 size={16} />
                <span>Full Screen</span>
            </button>
            <button
                className="flex items-center space-x-2 w-full px-2 py-1 rounded-md hover:bg-gray-200 hover:text-blue-600 transition-colors duration-200"
                onClick={onEdit}
            >
                <FiEdit size={16} />
                <span>Edit</span>
            </button>
            <button
                className="flex items-center space-x-2 w-full px-2 py-1 rounded-md hover:bg-red-300 text-red-500 hover:text-red-600 transition-colors duration-200"
                onClick={onRemove}
            >
                <FiTrash2 size={16} />
                <span>Remove</span>
            </button>
        </div>
    );
};

export default ChartsMenu;
