
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { Filter, ChevronDown } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const ReportFilters = ({
//   onApply,
//   filters,
//   productionLines,
//   availableParameters,
//   handleFilterChange,
//   isLoading,
// }) => {
//   const [showParamDropdown, setShowParamDropdown] = useState(false);
//   const dropdownRef = useRef();

//   const selectedParams = filters.parameter || [];

//   const handleCheckboxChange = (paramId) => {
//     const isSelected = selectedParams.includes(paramId);
//     const updatedParams = isSelected
//       ? selectedParams.filter((id) => id !== paramId)
//       : [...selectedParams, paramId];

//     handleFilterChange("parameter", updatedParams);
//   };

//   const handleSelectAllChange = (e) => {
//     if (e.target.checked) {
//       const allParamIds = availableParameters.map((param) => param.id);
//       handleFilterChange("parameter", allParamIds);
//     } else {
//       handleFilterChange("parameter", []);
//     }
//   };

//   const isAllSelected =
//     availableParameters.length > 0 &&
//     selectedParams.length === availableParameters.length;

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowParamDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="flex w-full  items-center justify-center gap-4 ">
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4  w-full">
//         {/* Production Line Filter */}
//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-2">
//             Production Line
//           </label>
//           <select
//             className="w-full p-2 bg-gray-50 border-b-2 border-green-500 rounded-md text-sm "
//             value={filters.productionLine}
//             onChange={(e) =>
//               handleFilterChange("productionLine", e.target.value)
//             }
//           >
//             <option value="">Select Production Line</option>
//             {productionLines.map((line) => (
//               <option key={line.id} value={line.id}>
//                 {line.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Parameter Filter */}
//         <div className="" ref={dropdownRef}>
//           <label className="block text-sm font-bold text-gray-700 mb-2">
//             Parameter
//           </label>
//           <div
//             onClick={() => setShowParamDropdown(!showParamDropdown)}
//             className="w-full p-2 bg-gray-50 border-b-2 border-green-500 rounded-md cursor-pointer flex justify-between items-center"
//           >
//             <span className="text-sm text-gray-700">
//               {selectedParams.length > 0
//                 ? `${selectedParams.length} selected`
//                 : "Select Parameters"}
//             </span>
//             <ChevronDown size={16} />
//           </div>
//           {showParamDropdown && (
//             <div className="w-72 absolute bg-gray-50 border border-gray-300 rounded-md shadow-md mt-2 max-h-60 overflow-y-auto p-1 z-10">
//               {availableParameters.length === 0 ? (
//                 <p className="text-sm text-gray-500 px-2 py-1">
//                   No Parameters Available
//                 </p>
//               ) : (
//                 <>
//                   <label className="flex items-center px-2 py-1 cursor-pointer border-b border-gray-300 mb-1">
//                     <input
//                       type="checkbox"
//                       className=""
//                       checked={isAllSelected}
//                       onChange={handleSelectAllChange}
//                     />
//                     <span className="text-sm font-medium text-gray-800">
//                       Select All
//                     </span>
//                   </label>
//                   {availableParameters.map((param) => (
//                     <label
//                       key={param.id}
//                       className="flex items-center px-2 py-1 cursor-pointer"
//                     >
//                       <input
//                         type="checkbox"
//                         className="mr-2 "
//                         checked={selectedParams.includes(param.id)}
//                         onChange={() => handleCheckboxChange(param.id)}
//                       />
//                       <span className="text-sm text-gray-800">
//                         {param.name}
//                       </span>
//                     </label>
//                   ))}
//                 </>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Frequency Filter */}
//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-2">
//             Frequency
//           </label>
//           <select
//             className="w-full p-2 bg-gray-50 border-b-2 border-green-500 rounded-md text-sm "
//             value={filters.frequency}
//             onChange={(e) => {
//               const value = e.target.value;
//               const formatted =
//                 value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
//               handleFilterChange("frequency", formatted);
//             }}
//           >
//             <option value="">Select Frequency</option>
//             <option value="Hourly">Hourly</option>
//             <option value="Daily">Daily</option>
//             <option value="Weekly">Weekly</option>
//             <option value="Monthly">Monthly</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-2">
//             Start Date & Time
//           </label>
//           <DatePicker
//             selected={filters.startDate ? new Date(filters.startDate) : null}
//             onChange={(date) =>
//               handleFilterChange("startDate", date.toISOString())
//             }
//             showTimeSelect
//             dateFormat="yyyy-MM-dd h:mm aa"
//             placeholderText="Select Start Date & Time"
//             className=" p-2 bg-gray-50 border-b-2 border-green-500 rounded-md text-sm placeholder-gray-700"

//             popperPlacement="bottom-start"
//           />
//         </div>

//         {/* End Date & Time */}
//         <div className="">
//           <label className="block text-sm font-bold text-gray-700 mb-2 ">
//             End Date & Time
//           </label>
//           <DatePicker
//             selected={filters.endDate ? new Date(filters.endDate) : null}
//             onChange={(date) =>
//               handleFilterChange("endDate", date.toISOString())
//             }
//             showTimeSelect
//             dateFormat="yyyy-MM-dd h:mm aa"
//             placeholderText=" Select End Date & Time"
//             className="w-full  p-2 placeholder-gray-700 bg-gray-50 border-b-2 border-green-500 rounded-md text-sm "
//             popperPlacement="bottom-start"
//           />
//         </div>

//       </div>

//       {/* Execute Button */}
//       <div className="flex items-center mt-8">
//         <button
//           onClick={onApply}
//           disabled={isLoading}
//           className="p-2 bg-green-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center disabled:opacity-50 text-sm "
//         >
//           {isLoading ? (
//             <span className="animate-spin mr-2">↻</span>
//           ) : (
//             <Filter size={16} className="mr-2" />
//           )}
//           {isLoading ? "Loading..." : "Execute"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportFilters;
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReportFilters = ({
  onApply,
  filters,
  productionLines,
  handleFilterChange,
  isLoading,
}) => {
  const [showParamDropdown, setShowParamDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowParamDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!filters.productionLine) newErrors.productionLine = "This field is required.";
    if (!filters.frequency) newErrors.frequency = "This field is required.";
    if (!filters.startDate) newErrors.startDate = "This field is required.";
    if (!filters.endDate) newErrors.endDate = "This field is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, form is valid
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onApply();
    }
  };

  return (
    <section className="px-1 py-1 ">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {/* Production Line */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">Production Line</label>
          <select
            required
            className={`w-full px-3 py-2 border-b-green-500 border-b-2 bg-white  border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm ${errors.productionLine ? 'border-red-500' : ''}`}
            value={filters.productionLine}
            onChange={(e) => handleFilterChange("productionLine", e.target.value)}
          >
            <option value="">Select Production Line</option>
            {productionLines.map((line) => (
              <option key={line.id} value={line.id}>
                {line.name}
              </option>
            ))}
          </select>
          {errors.productionLine && <p className="text-red-500 text-xs mt-1">{errors.productionLine}</p>}
        </div>

        {/* Frequency */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">Frequency</label>
          <select
            required
            className={`w-full px-3 py-2 border-b-green-500 border-b-2 bg-white   border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm ${errors.frequency ? 'border-red-500' : ''}`}
            value={filters.frequency}
            onChange={(e) => {
              const value = e.target.value;
              const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
              handleFilterChange("frequency", formatted);
            }}
          >
            <option value="">Select Frequency</option>
            <option value="Hourly">Hourly</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          {errors.frequency && <p className="text-red-500 text-xs mt-1">{errors.frequency}</p>}
        </div>

        {/* Start Date */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">Start Date & Time</label>
          <DatePicker
            selected={filters.startDate ? new Date(filters.startDate) : null}
            onChange={(date) => handleFilterChange("startDate", date.toISOString())}
            showTimeSelect
            dateFormat="yyyy-MM-dd h:mm aa"
            placeholderText="Select Start Date & Time"
            className={`w-full px-3 py-2 text-sm rounded-md bg-white  focus:outline-none focus:ring-2 border-b-green-500 border-b-2 ${errors.startDate ? "border-red-500" : "border-gray-300"
              } `}
          />

          {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">End Date & Time</label>
          <DatePicker
            selected={filters.endDate ? new Date(filters.endDate) : null}
            onChange={(date) => handleFilterChange("endDate", date.toISOString())}
            showTimeSelect
            dateFormat="yyyy-MM-dd h:mm aa"
            placeholderText="Select End Date & Time"
            className={`w-full px-3 py-2 text-sm rounded-md bg-white   focus:outline-none focus:ring-2  border-b-green-500 border-b-2 ${errors.endDate ? "border-red-500" : "border-gray-300"
              } `}
            minDate={filters.startDate ? new Date(filters.startDate) : null}
          />

          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
        </div>

        {/* Execute Button */}
        <div className="flex items-end">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full px-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center text-sm font-medium disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">↻</span> Loading...
              </>
            ) : (
              <>
                <Filter size={16} className="mr-2" /> Execute
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReportFilters;
