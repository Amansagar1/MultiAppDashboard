
"use client"
import React, { createContext, useContext, useState } from 'react';

const TitleContext = createContext();

export const TitleProvider = ({ children }) => {
    const [title, setTitle] = useState(' Energy Monitoring System');

    return (
        <TitleContext.Provider value={{ title, setTitle }}>
            {children}
        </TitleContext.Provider>
    );
};

export const useTitle = () => {
    const context = useContext(TitleContext);
    if (!context) {
        // throw new Error('useTitle must be used within a TitleProvider');
        console.log(context)
    }
    return context;
};
