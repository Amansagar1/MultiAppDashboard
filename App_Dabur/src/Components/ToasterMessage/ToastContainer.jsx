"use client";
import React, { useState, useEffect } from 'react';
import { toast } from './ToastService';
import Toast from './Toast';

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    // Subscribe to toast events when component mounts
    useEffect(() => {
        const unsubscribe = toast.subscribe({
            add: (toast) => {
                setToasts((prevToasts) => [...prevToasts, toast]);

                // Auto-remove toast after duration
                if (toast.duration !== 0) {
                    setTimeout(() => {
                        setToasts((prevToasts) =>
                            prevToasts.filter((t) => t.id !== toast.id)
                        );
                    }, toast.duration);
                }
            },
            remove: (id) => {
                setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
            },
            clear: () => {
                setToasts([]);
            },
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Handle manual toast removal
    const handleRemove = (id) => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    };

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    id={toast.id}
                    type={toast.type}
                    message={toast.message}
                    onRemove={handleRemove}
                />
            ))}
        </div>
    );
};

export default ToastContainer;