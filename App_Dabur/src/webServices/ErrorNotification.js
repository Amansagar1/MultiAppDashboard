import { IoClose } from "react-icons/io5"; // Close icon for the title bar
import { BsExclamationTriangle, BsCheckCircle } from "react-icons/bs"; // Windows-like icons

const ErrorNotification = ({ type, message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-[350px] bg-gray-100 border border-gray-400 text-black">
        {/* Title Bar */}
        <div className="flex justify-between items-center bg-sky-600 p-2 text-white">
        <h2 className="font-bold text-sm">
          {type === 'success' ? 'Success' : type === 'error' ? 'Error' : type === 'warning' ? 'Warning' : 'Notification'}
        </h2>


          <button onClick={onClose} className="text-white hover:bg-sky-700 focus:outline-none">
            <IoClose size={16} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 flex items-start">
          {/* Icon */}
          <div className="mr-3 mt-1">
            {type === 'success' ? (
              <BsCheckCircle size={24} className="text-green-600" />
            ) : (
              <BsExclamationTriangle size={24} className="text-red-600" />
            )}
          </div>

          {/* Message */}
          <p className="text-sm">{message}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end p-2 border-t border-gray-300 bg-gray-200">
          <button
            onClick={onClose}
            className="bg-gray-200 border border-gray-400 px-3 py-1 text-black hover:bg-gray-300 focus:outline-none"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotification;
