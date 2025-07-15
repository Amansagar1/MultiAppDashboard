"use client";
import React from "react";
import { Filter, RefreshCw, Download } from "lucide-react";

const ReportActions = ({ 
  onApply, 
  onReset, 
 
}) => {
  return (
    <>
      <div className="flex justify-end gap-4 mb-6 w-full">
      

        {/* <button
          onClick={onReset}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Reset
        </button> */}
      </div>

    
    </>
  );
};

export default ReportActions;