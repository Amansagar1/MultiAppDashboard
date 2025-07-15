import React from "react";

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="relative bg-white p-4 rounded shadow-lg w-[90%] max-h-[90vh] overflow-auto">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
