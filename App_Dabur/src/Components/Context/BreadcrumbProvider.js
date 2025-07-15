// BreadcrumbContext.js
import React, { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const [isBreadcrumbVisible, setBreadcrumbVisible] = useState(true);

  const toggleBreadcrumb = () => {
    setBreadcrumbVisible(prev => !prev);
  };

  return (
    <BreadcrumbContext.Provider value={{ isBreadcrumbVisible, toggleBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => useContext(BreadcrumbContext);
