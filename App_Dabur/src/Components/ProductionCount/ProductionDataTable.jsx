// import React, { useState, useEffect, useRef } from 'react';
// import { IoClose } from "react-icons/io5";

// const ProductionDataTable = ({
//   productionData,
//   onSaveData,
//   currentMonth,
//   currentYear,
//   instanceId,
//   lineType,
//   onClose,
//   fetchEnergyData
// }) => {
//   const [tableData, setTableData] = useState({});
//   const [hasChanges, setHasChanges] = useState(false);
//   const [loadingCells, setLoadingCells] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const debounceTimers = useRef({});

//   useEffect(() => {
//     // Initialize table data from productionData
//     const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
//     const initialData = {};
//     const initialInputs = {};

//     for (let i = 1; i <= lastDay; i++) {
//       const dayStr = i.toString().padStart(2, '0');
//       // Find the corresponding data from productionData
//       const existingData = productionData.find(
//         item => item.instanceId === instanceId && item.rawDate === dayStr
//       );

//       initialData[dayStr] = {
//         A: {
//           count: existingData?.shifts?.A?.count || 0,
//           energy: existingData?.shifts?.A?.energy || 0,
//           totalEnergyConsume: existingData?.shifts?.A?.totalEnergyConsume || 0
//         },
//         B: {
//           count: existingData?.shifts?.B?.count || 0,
//           energy: existingData?.shifts?.B?.energy || 0,
//           totalEnergyConsume: existingData?.shifts?.B?.totalEnergyConsume || 0
//         },
//         C: {
//           count: existingData?.shifts?.C?.count || 0,
//           energy: existingData?.shifts?.C?.energy || 0,
//           totalEnergyConsume: existingData?.shifts?.C?.totalEnergyConsume || 0
//         }
//       };

//       // Initialize input values for each cell
//       ['A', 'B', 'C'].forEach(shift => {
//         const key = `${dayStr}_${shift}_count`;
//         initialInputs[key] = existingData?.shifts?.[shift]?.count?.toString() || '0';
//       });
//     }

//     setTableData(initialData);
//     setInputValues(initialInputs);
//     setHasChanges(false);
//   }, [productionData, instanceId, currentMonth, currentYear]);

//   // Cleanup timers on unmount
//   useEffect(() => {
//     return () => {
//       Object.values(debounceTimers.current).forEach(timer => clearTimeout(timer));
//     };
//   }, []);

//   const handleInputChange = (date, shift, value) => {
//     // Allow only numbers and empty string
//     if (!/^\d*$/.test(value)) return;

//     // Update the input field immediately for responsive UX
//     const inputKey = `${date}_${shift}_count`;
//     setInputValues(prev => ({
//       ...prev,
//       [inputKey]: value
//     }));

//     // Clear any existing timer for this input
//     if (debounceTimers.current[inputKey]) {
//       clearTimeout(debounceTimers.current[inputKey]);
//     }

//     // Set a new timer to process the value after user stops typing
//     debounceTimers.current[inputKey] = setTimeout(() => {
//       processCountChange(date, shift, value);
//     }, 800); // 800ms debounce
//   };

//   const processCountChange = async (date, shift, value) => {
//     // Convert to number, default to 0 if empty
//     const numValue = value === '' ? 0 : Number(value);

//     // Skip if the value hasn't actually changed
//     if (tableData[date][shift].count === numValue) return;

//     // Update the count in the tableData
//     setTableData(prev => ({
//       ...prev,
//       [date]: {
//         ...prev[date],
//         [shift]: {
//           ...prev[date][shift],
//           count: numValue
//         }
//       }
//     }));

//     // Set loading state for this cell
//     setLoadingCells(prev => ({
//       ...prev,
//       [`${date}_${shift}_energy`]: true
//     }));

//     try {
//       // Fetch the energy data
//       const energy = await fetchEnergyData(parseInt(date), shift);

//       // Calculate energy per product - ensure we don't divide by zero
//       const energyPerProduct = numValue > 0 ? energy / numValue : 0;

//       // Update the table data with the fetched energy value
//       setTableData(prev => ({
//         ...prev,
//         [date]: {
//           ...prev[date],
//           [shift]: {
//             ...prev[date][shift],
//             count: numValue,
//             energy: energy,
//             totalEnergyConsume: energyPerProduct
//           }
//         }
//       }));

//       setHasChanges(true);
//     } catch (error) {
//       console.error('Error fetching energy data:', error);
//     } finally {
//       // Clear loading state
//       setLoadingCells(prev => ({
//         ...prev,
//         [`${date}_${shift}_energy`]: false
//       }));
//     }
//   };

//   const handleEnergyChange = (date, shift, value) => {
//     const numValue = Number(value);
//     if (isNaN(numValue)) return;

//     // Get current count value
//     const count = tableData[date][shift].count;

//     // Calculate new energy per product
//     const energyPerProduct = count > 0 ? numValue / count : 0;

//     // Update energy and energy per product
//     setTableData(prev => ({
//       ...prev,
//       [date]: {
//         ...prev[date],
//         [shift]: {
//           ...prev[date][shift],
//           energy: numValue,
//           totalEnergyConsume: energyPerProduct
//         }
//       }
//     }));

//     setHasChanges(true);
//   };

//   const handleSave = async () => {
//     if (!hasChanges) return;

//     try {
//       await onSaveData(tableData);
//       setHasChanges(false);
//     } catch (error) {
//       console.error('Error saving production data:', error);
//     }
//   };

//   const formatDisplayDate = (dayStr) => {
//     const date = new Date(currentYear, currentMonth, parseInt(dayStr));
//     return date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'short'
//     });
//   };

//   const getDates = () => {
//     const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
//     return Array.from({ length: lastDay }, (_, i) =>
//       (i + 1).toString().padStart(2, '0')
//     );
//   };

//   const formattedDate = new Date(currentYear, currentMonth).toLocaleString('default', {
//     month: 'long',
//     year: 'numeric'
//   });

//   // Common input field styles
//   const inputStyles = `
//     w-full py-2 px-3 border rounded text-center
//     focus:outline-none focus:ring-2 focus:ring-blue-500
//     [appearance:textfield]
//     [&::-webkit-outer-spin-button]:appearance-none
//     [&::-webkit-inner-spin-button]:appearance-none
//   `;

//   return (
//     <div className="flex flex-col h-full bg-gray-50 shadow-lg rounded-lg overflow-hidden">
//       <div className="flex justify-between items-center p-4 border-b bg-white sticky top-0 z-10">
//         <h2 className="text-lg font-bold text-gray-800">
//           Edit {lineType} Product Count
//         </h2>
//         <span className="text-lg font-semibold text-blue-600">
//           {formattedDate}
//         </span>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleSave}
//             disabled={!hasChanges}
//             className={`px-4 py-2 rounded-md transition-colors ${hasChanges
//               ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//           >
//             Save Changes
//           </button>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             aria-label="Close"
//           >
//             <IoClose className="w-6 h-6 text-gray-600 hover:text-red-600" />
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 overflow-hidden flex flex-col">
//         <div className="border-b sticky z-10">
//           <table className="w-full">
//             <thead className=''>
//               <tr className="bg-gray-200 ">
//                 <th className="py-3 px-4 text-left font-semibold text-gray-800 border-r w-32">Date</th>
//                 <th className="py-3 px-4 text-center font-semibold text-gray-800 border-r" colSpan="3">
//                   <div className="flex items-center justify-center space-x-2">
//                     <span className="text-gray-700">Shift A</span>
//                   </div>
//                 </th>
//                 <th className="py-3 px-4 text-center font-semibold text-gray-800 border-r" colSpan="3">
//                   <div className="flex items-center justify-center space-x-2">
//                     <span className="text-gray-700">Shift B</span>
//                   </div>
//                 </th>
//                 <th className="py-3 px-4 text-center font-semibold text-gray-800" colSpan="3">
//                   <div className="flex items-center justify-center space-x-2">
//                     <span className="text-gray-700">Shift C</span>
//                   </div>
//                 </th>
//               </tr>
//               <tr className="bg-gray-100">
//                 <th className="py-2 px-2 text-left font-semibold text-gray-800 border-r"></th>
//                 {['A', 'B', 'C'].map(shift => (
//                   <React.Fragment key={shift}>
//                     <th className="w-40 py-2 px-2 text-center font-semibold text-gray-700 border-r">Count</th>
//                     <th className="w-36 py-2 px-2 text-center font-semibold text-gray-700 border-r">kWh</th>
//                     <th className="w-36 py-2 px-2 text-center font-semibold text-gray-700 border-r">Per Unit</th>
//                   </React.Fragment>
//                 ))}
//               </tr>
//             </thead>
//           </table>
//         </div>

//         <div className="flex-1 overflow-auto">
//           <table className="w-full">
//             <tbody>
//               {getDates().map(date => (
//                 <tr
//                   key={date}
//                   className={`border-b hover:bg-blue-50 transition-colors bg-white`}
//                 >
//                   <td className="py-2 px-4 text-gray-700 font-medium border-r w-32">
//                     {formatDisplayDate(date)}
//                   </td>
//                   {['A', 'B', 'C'].map((shift) => {
//                     const shiftColor = shift === 'A' ? 'blue' : shift === 'B' ? 'green' : 'purple';
//                     const inputKey = `${date}_${shift}_count`;
//                     return (
//                       <React.Fragment key={shift}>
//                         <td className="w-40 py-2 px-2 border-r">
//                           <input
//                             type="text"
//                             inputMode="numeric"
//                             value={inputValues[inputKey] || ''}
//                             onChange={(e) => handleInputChange(date, shift, e.target.value)}
//                             className={`${inputStyles} hover:border-${shiftColor}-400`}
//                             style={{
//                               WebkitAppearance: 'none',
//                               MozAppearance: 'textfield'
//                             }}
//                           />
//                         </td>
//                         <td className="w-36 py-2 px-2 text-center border-r">
//                           {loadingCells[`${date}_${shift}_energy`] ? (
//                             <div className="flex justify-center">
//                               <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
//                             </div>
//                           ) : (
//                             <div className="bg-gray-100 py-2 px-3 rounded-md text-gray-800 font-medium">
//                               {tableData[date]?.[shift]?.energy?.toFixed(2) || '0.00'}
//                             </div>
//                           )}
//                         </td>
//                         <td className="w-36 py-2 px-2 text-center border-r">
//                           <div className="bg-gray-100 py-2 px-3 rounded-md text-gray-800 font-medium">
//                             {tableData[date]?.[shift]?.totalEnergyConsume?.toFixed(2) || '0.00'}
//                           </div>
//                         </td>
//                       </React.Fragment>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductionDataTable;


// import React, { useState, useEffect, useRef } from 'react';
// import { IoClose } from "react-icons/io5";

// const ProductionDataTable = ({
//   productionData,
//   onSaveData,
//   currentMonth,
//   currentYear,
//   instanceId,
//   lineType,
//   lineIndex,
//   onClose,
//   fetchEnergyData
// }) => {
//   const [tableData, setTableData] = useState({});
//   const [hasChanges, setHasChanges] = useState(false);
//   const [loadingCells, setLoadingCells] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const [energyData, setEnergyData] = useState({});
//   const debounceTimers = useRef({});

//   useEffect(() => {
//     // Initialize table data from productionData
//     const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
//     const initialData = {};
//     const initialInputs = {};
//     const initialEnergyData = {};

//     for (let i = 1; i <= lastDay; i++) {
//       const dayStr = i.toString().padStart(2, '0');
//       // Find the corresponding data from productionData
//       const existingData = productionData.find(
//         item => item.instanceId === instanceId && item.rawDate === dayStr
//       );

//       initialData[dayStr] = {
//         A: {
//           count: existingData?.shifts?.A?.count || 0,
//           energy: existingData?.shifts?.A?.energy || 0,
//           totalEnergyConsume: existingData?.shifts?.A?.totalEnergyConsume || 0
//         },
//         B: {
//           count: existingData?.shifts?.B?.count || 0,
//           energy: existingData?.shifts?.B?.energy || 0,
//           totalEnergyConsume: existingData?.shifts?.B?.totalEnergyConsume || 0
//         },
//         C: {
//           count: existingData?.shifts?.C?.count || 0,
//           energy: existingData?.shifts?.C?.energy || 0,
//           totalEnergyConsume: existingData?.shifts?.C?.totalEnergyConsume || 0
//         }
//       };

//       // Initialize input values for each cell
//       ['A', 'B', 'C'].forEach(shift => {
//         const key = `${dayStr}_${shift}_count`;
//         initialInputs[key] = existingData?.shifts?.[shift]?.count?.toString() || '0';
//       });

//       // Initialize energy data structure to store main and shrink line energy separately
//       initialEnergyData[dayStr] = {
//         A: {
//           main: existingData?.shifts?.A?.mainEnergy || 0,
//           shrink: existingData?.shifts?.A?.shrinkEnergy || 0
//         },
//         B: {
//           main: existingData?.shifts?.B?.mainEnergy || 0,
//           shrink: existingData?.shifts?.B?.shrinkEnergy || 0
//         },
//         C: {
//           main: existingData?.shifts?.C?.mainEnergy || 0,
//           shrink: existingData?.shifts?.C?.shrinkEnergy || 0
//         }
//       };
//     }

//     setTableData(initialData);
//     setInputValues(initialInputs);
//     setEnergyData(initialEnergyData);
//     setHasChanges(false);

//     // Immediately calculate per unit values for the initial data
//     const updatedTableData = { ...initialData };
//     Object.entries(initialData).forEach(([date, shifts]) => {
//       Object.entries(shifts).forEach(([shift, data]) => {
//         const count = data.count;
//         const mainEnergy = initialEnergyData[date][shift].main;
//         const shrinkEnergy = initialEnergyData[date][shift].shrink;
//         const totalEnergy = mainEnergy + shrinkEnergy;
//         const energyPerProduct = count > 0 ? totalEnergy / count : 0;

//         updatedTableData[date][shift].totalEnergyConsume = energyPerProduct;
//       });
//     });
//     setTableData(updatedTableData);
//   }, [productionData, instanceId, currentMonth, currentYear]);

//   // Cleanup timers on unmount
//   useEffect(() => {
//     return () => {
//       Object.values(debounceTimers.current).forEach(timer => clearTimeout(timer));
//     };
//   }, []);

//   const handleInputChange = (date, shift, value) => {
//     // Allow only numbers and empty string
//     if (!/^\d*$/.test(value)) return;

//     // Update the input field immediately for responsive UX
//     const inputKey = `${date}_${shift}_count`;
//     setInputValues(prev => ({
//       ...prev,
//       [inputKey]: value
//     }));

//     // Clear any existing timer for this input
//     if (debounceTimers.current[inputKey]) {
//       clearTimeout(debounceTimers.current[inputKey]);
//     }

//     // Set a new timer to process the value after user stops typing
//     debounceTimers.current[inputKey] = setTimeout(() => {
//       processCountChange(date, shift, value);
//     }, 800); // 800ms debounce
//   };

//   const processCountChange = async (date, shift, value) => {
//     // Convert to number, default to 0 if empty
//     const numValue = value === '' ? 0 : Number(value);

//     // Skip if the value hasn't actually changed
//     if (tableData[date][shift].count === numValue) return;

//     // Update the count in the tableData first
//     setTableData(prev => ({
//       ...prev,
//       [date]: {
//         ...prev[date],
//         [shift]: {
//           ...prev[date][shift],
//           count: numValue
//         }
//       }
//     }));

//     // Set loading state for this cell
//     setLoadingCells(prev => ({
//       ...prev,
//       [`${date}_${shift}_energy`]: true
//     }));

//     try {
//       // Fetch the energy data for both main and shrinking lines
//       const energyValues = await fetchEnergyData(parseInt(date), shift);

//       // Store the detailed energy data
//       setEnergyData(prev => ({
//         ...prev,
//         [date]: {
//           ...prev[date],
//           [shift]: {
//             main: energyValues.mainEnergy,
//             shrink: energyValues.shrinkEnergy
//           }
//         }
//       }));

//       // Calculate total energy (main + shrink)
//       const totalEnergy = energyValues.mainEnergy + energyValues.shrinkEnergy;

//       // Calculate energy per product - ensure we don't divide by zero
//       const energyPerProduct = numValue > 0 ? totalEnergy / numValue : 0;

//       // Update the table data with the fetched energy values and calculations
//       setTableData(prev => ({
//         ...prev,
//         [date]: {
//           ...prev[date],
//           [shift]: {
//             ...prev[date][shift],
//             count: numValue,
//             energy: totalEnergy, // Store combined energy
//             mainEnergy: energyValues.mainEnergy, // Store main line energy
//             shrinkEnergy: energyValues.shrinkEnergy, // Store shrink line energy
//             totalEnergyConsume: energyPerProduct // Energy per unit
//           }
//         }
//       }));

//       setHasChanges(true);
//     } catch (error) {
//       console.error('Error fetching energy data:', error);
//     } finally {
//       // Clear loading state
//       setLoadingCells(prev => ({
//         ...prev,
//         [`${date}_${shift}_energy`]: false
//       }));
//     }
//   };

//   const handleSave = async () => {
//     if (!hasChanges) return;

//     try {
//       // Prepare data for saving - make sure all calculated values are included
//       const dataToSave = Object.entries(tableData).reduce((acc, [date, shifts]) => {
//         acc[date] = {};

//         Object.entries(shifts).forEach(([shift, data]) => {
//           // Get the energy data for this date and shift
//           const mainEnergy = energyData[date]?.[shift]?.main || 0;
//           const shrinkEnergy = energyData[date]?.[shift]?.shrink || 0;
//           const totalEnergy = mainEnergy + shrinkEnergy;
//           const count = data.count;

//           // Calculate energy per product - ensure we don't divide by zero
//           const energyPerProduct = count > 0 ? totalEnergy / count : 0;

//           acc[date][shift] = {
//             ...data,
//             mainEnergy,
//             shrinkEnergy,
//             energy: totalEnergy,
//             totalEnergyConsume: energyPerProduct
//           };
//         });

//         return acc;
//       }, {});

//       await onSaveData(dataToSave);
//       setHasChanges(false);
//     } catch (error) {
//       console.error('Error saving production data:', error);
//     }
//   };

//   const formatDisplayDate = (dayStr) => {
//     const date = new Date(currentYear, currentMonth, parseInt(dayStr));
//     return date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'short'
//     });
//   };

//   const getDates = () => {
//     const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
//     return Array.from({ length: lastDay }, (_, i) =>
//       (i + 1).toString().padStart(2, '0')
//     );
//   };

//   const formattedDate = new Date(currentYear, currentMonth).toLocaleString('default', {
//     month: 'long',
//     year: 'numeric'
//   });

//   // Common input field styles
//   const inputStyles = `
//     w-full py-2 px-3 border rounded text-center
//     focus:outline-none focus:ring-2 focus:ring-blue-500
//     [appearance:textfield]
//     [&::-webkit-outer-spin-button]:appearance-none
//     [&::-webkit-inner-spin-button]:appearance-none
//   `;

//   // Function to format numbers with 2 decimal places
//   const formatNumber = (num) => {
//     return parseFloat(num).toFixed(2);
//   };

//   // Calculate energy per product directly from current data
//   const calculateEnergyPerProduct = (date, shift) => {
//     const count = tableData[date]?.[shift]?.count || 0;
//     const mainEnergy = energyData[date]?.[shift]?.main || 0;
//     const shrinkEnergy = energyData[date]?.[shift]?.shrink || 0;
//     const totalEnergy = mainEnergy + shrinkEnergy;

//     // Important: Calculate the value anytime it's needed
//     return count > 0 ? totalEnergy / count : 0;
//   };

//   // Manually recalculate all energy per product values
//   const recalculateAllEnergyPerUnit = () => {
//     setTableData(prev => {
//       const updated = { ...prev };

//       Object.entries(updated).forEach(([date, shifts]) => {
//         Object.entries(shifts).forEach(([shift, data]) => {
//           const count = data.count;
//           const mainEnergy = energyData[date]?.[shift]?.main || 0;
//           const shrinkEnergy = energyData[date]?.[shift]?.shrink || 0;
//           const totalEnergy = mainEnergy + shrinkEnergy;

//           // Calculate and update the energy per product
//           updated[date][shift].totalEnergyConsume = count > 0 ? count / totalEnergy : 0;
//         });
//       });

//       return updated;
//     });
//   };

//   // Call recalculation whenever energyData changes
//   useEffect(() => {
//     recalculateAllEnergyPerUnit();
//   }, [energyData]);

//   return (
//     <div className="flex flex-col h-full bg-gray-50 shadow-lg rounded-lg overflow-hidden">
//       <div className="flex justify-between items-center p-4 border-b bg-white sticky top-0 z-10">
//         <h2 className="text-lg font-bold text-gray-800">
//           Edit {lineType} Product Count
//         </h2>
//         <span className="text-lg font-semibold text-blue-600">
//           {formattedDate}
//         </span>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleSave}
//             disabled={!hasChanges}
//             className={`px-4 py-2 rounded-md transition-colors ${hasChanges
//               ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//           >
//             Save Changes
//           </button>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             aria-label="Close"
//           >
//             <IoClose className="w-6 h-6 text-gray-600 hover:text-red-600" />
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 overflow-hidden flex flex-col">
//         <div className="border-b sticky z-10">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="py-3 px-4 text-left font-semibold text-gray-800 border-r w-32">Date</th>
//                 <th className="py-3 px-4 text-center font-semibold text-gray-800 border-r" colSpan="4">
//                   <div className="flex items-center justify-center space-x-2">
//                     <span className="text-gray-700">Shift A</span>
//                   </div>
//                 </th>
//                 <th className="py-3 px-4 text-center font-semibold text-gray-800 border-r" colSpan="4">
//                   <div className="flex items-center justify-center space-x-2">
//                     <span className="text-gray-700">Shift B</span>
//                   </div>
//                 </th>
//                 <th className="py-3 px-4 text-center font-semibold text-gray-800" colSpan="4">
//                   <div className="flex items-center justify-center space-x-2">
//                     <span className="text-gray-700">Shift C</span>
//                   </div>
//                 </th>
//               </tr>
//               <tr className="bg-gray-100">
//                 <th className="py-2 px-2 text-left font-semibold text-gray-800 border-r"></th>
//                 {['A', 'B', 'C'].map(shift => (
//                   <React.Fragment key={shift}>
//                     <th className="w-32 py-2 px-2 text-center font-semibold text-gray-700 border-r">Count</th>
//                     <th className="w-32 py-2 px-2 text-center font-semibold text-gray-700 border-r">Main kWh</th>
//                     <th className="w-32 py-2 px-2 text-center font-semibold text-gray-700 border-r">Shrink kWh</th>
//                     <th className="w-32 py-2 px-2 text-center font-semibold text-gray-700 border-r">Per Unit</th>
//                   </React.Fragment>
//                 ))}
//               </tr>
//             </thead>
//           </table>
//         </div>

//         <div className="flex-1 overflow-auto">
//           <table className="w-full">
//             <tbody>
//               {getDates().map(date => (
//                 <tr
//                   key={date}
//                   className="border-b hover:bg-blue-50 transition-colors bg-white"
//                 >
//                   <td className="w-32 py-2 px-4 text-gray-700 font-medium border-r">
//                     {formatDisplayDate(date)}
//                   </td>
//                   {['A', 'B', 'C'].map((shift) => {
//                     const shiftColor = shift === 'A' ? 'blue' : shift === 'B' ? 'green' : 'purple';
//                     const inputKey = `${date}_${shift}_count`;
//                     const isLoading = loadingCells[`${date}_${shift}_energy`];
//                     const mainEnergy = energyData[date]?.[shift]?.main || 0;
//                     const shrinkEnergy = energyData[date]?.[shift]?.shrink || 0;
//                     const count = tableData[date]?.[shift]?.count || 0;

//                     // Calculate energy per product
//                     const totalEnergy = mainEnergy + shrinkEnergy;
//                     const energyPerProduct = count > 0 ? totalEnergy / count : 0;

//                     return (
//                       <React.Fragment key={shift}>
//                         {/* Count Input */}
//                         <td className="w-32 py-2 px-2 border-r">
//                           <input
//                             type="text"
//                             inputMode="numeric"
//                             value={inputValues[inputKey] || ''}
//                             onChange={(e) => handleInputChange(date, shift, e.target.value)}
//                             className={`${inputStyles} hover:border-${shiftColor}-400`}
//                             onBlur={() => {
//                               // Force recalculation when the input loses focus
//                               recalculateAllEnergyPerUnit();
//                             }}
//                           />
//                         </td>

//                         {/* Main Line Energy */}
//                         <td className="w-32 py-2 px-2 text-center border-r">
//                           {isLoading ? (
//                             <div className="flex justify-center">
//                               <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
//                             </div>
//                           ) : (
//                             <div className="bg-gray-100 py-2 px-3 rounded-md text-gray-800 font-medium">
//                               {formatNumber(mainEnergy)}
//                             </div>
//                           )}
//                         </td>

//                         {/* Shrink Line Energy */}
//                         <td className="w-32 py-2 px-2 text-center border-r">
//                           {isLoading ? (
//                             <div className="flex justify-center">
//                               <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
//                             </div>
//                           ) : (
//                             <div className="bg-gray-100 py-2 px-3 rounded-md text-gray-800 font-medium">
//                               {formatNumber(shrinkEnergy)}
//                             </div>
//                           )}
//                         </td>

//                         {/* Energy Per Product */}
//                         <td className="w-32 py-2 px-2 text-center border-r">
//                           <div className="bg-gray-100 py-2 px-3 rounded-md text-gray-800 font-medium">
//                             {formatNumber(energyPerProduct)}
//                           </div>
//                         </td>
//                       </React.Fragment>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductionDataTable;


import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from "react-icons/io5";

const ProductionDataTable = ({
  productionData,
  onSaveData,
  currentMonth,
  currentYear,
  instanceId,
  lineType,
  lineIndex,
  onClose,
  fetchEnergyData
}) => {
  const [tableData, setTableData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [loadingCells, setLoadingCells] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [energyData, setEnergyData] = useState({});
  const debounceTimers = useRef({});

  useEffect(() => {
    // Initialize table data from productionData
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const initialData = {};
    const initialInputs = {};
    const initialEnergyData = {};

    for (let i = 1; i <= lastDay; i++) {
      const dayStr = i.toString().padStart(2, '0');
      // Find the corresponding data from productionData
      const existingData = productionData.find(
        item => item.instanceId === instanceId && item.rawDate === dayStr
      );

      initialData[dayStr] = {
        A: {
          count: existingData?.shifts?.A?.count || 0,
          energy: existingData?.shifts?.A?.energy || 0,
          totalEnergyConsume: existingData?.shifts?.A?.totalEnergyConsume || 0
        },
        B: {
          count: existingData?.shifts?.B?.count || 0,
          energy: existingData?.shifts?.B?.energy || 0,
          totalEnergyConsume: existingData?.shifts?.B?.totalEnergyConsume || 0
        },
        C: {
          count: existingData?.shifts?.C?.count || 0,
          energy: existingData?.shifts?.C?.energy || 0,
          totalEnergyConsume: existingData?.shifts?.C?.totalEnergyConsume || 0
        }
      };

      // Initialize input values for each cell
      ['A', 'B', 'C'].forEach(shift => {
        const key = `${dayStr}_${shift}_count`;
        initialInputs[key] = existingData?.shifts?.[shift]?.count?.toString() || '0';
      });

      // Initialize energy data structure to store main and shrink line energy separately
      initialEnergyData[dayStr] = {
        A: {
          main: existingData?.shifts?.A?.mainEnergy || 0,
          shrink: existingData?.shifts?.A?.shrinkEnergy || 0
        },
        B: {
          main: existingData?.shifts?.B?.mainEnergy || 0,
          shrink: existingData?.shifts?.B?.shrinkEnergy || 0
        },
        C: {
          main: existingData?.shifts?.C?.mainEnergy || 0,
          shrink: existingData?.shifts?.C?.shrinkEnergy || 0
        }
      };
    }

    setTableData(initialData);
    setInputValues(initialInputs);
    setEnergyData(initialEnergyData);
    setHasChanges(false);

    // Immediately calculate per unit values for the initial data
    const updatedTableData = { ...initialData };
    Object.entries(initialData).forEach(([date, shifts]) => {
      Object.entries(shifts).forEach(([shift, data]) => {
        const count = data.count;
        const mainEnergy = initialEnergyData[date][shift].main;
        const shrinkEnergy = initialEnergyData[date][shift].shrink;
        const totalEnergy = mainEnergy + shrinkEnergy;

        // Changed the calculation to count / totalEnergy (corrected formula)
        const energyPerProduct = totalEnergy > 0 ? totalEnergy / count : 0;

        updatedTableData[date][shift].totalEnergyConsume = energyPerProduct;
      });
    });
    setTableData(updatedTableData);
  }, [productionData, instanceId, currentMonth, currentYear]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleInputChange = (date, shift, value) => {
    // Allow only numbers and empty string
    if (!/^\d*$/.test(value)) return;

    // Update the input field immediately for responsive UX
    const inputKey = `${date}_${shift}_count`;
    setInputValues(prev => ({
      ...prev,
      [inputKey]: value
    }));

    // Clear any existing timer for this input
    if (debounceTimers.current[inputKey]) {
      clearTimeout(debounceTimers.current[inputKey]);
    }

    // Set a new timer to process the value after user stops typing
    debounceTimers.current[inputKey] = setTimeout(() => {
      processCountChange(date, shift, value);
    }, 800); // 800ms debounce
  };

  const processCountChange = async (date, shift, value) => {
    // Convert to number, default to 0 if empty
    const numValue = value === '' ? 0 : Number(value);

    // Skip if the value hasn't actually changed
    if (tableData[date][shift].count === numValue) return;

    // Update the count in the tableData first
    setTableData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [shift]: {
          ...prev[date][shift],
          count: numValue
        }
      }
    }));

    // Set loading state for this cell
    setLoadingCells(prev => ({
      ...prev,
      [`${date}_${shift}_energy`]: true
    }));

    try {
      // Fetch the energy data for both main and shrinking lines
      const energyValues = await fetchEnergyData(parseInt(date), shift);

      // Store the detailed energy data
      setEnergyData(prev => ({
        ...prev,
        [date]: {
          ...prev[date],
          [shift]: {
            main: energyValues.mainEnergy,
            shrink: energyValues.shrinkEnergy
          }
        }
      }));

      // Calculate total energy (main + shrink)
      const totalEnergy = energyValues.mainEnergy + energyValues.shrinkEnergy;

      // Calculate products per energy unit - ensure we don't divide by zero
      // Changed formula: count / totalEnergy instead of totalEnergy / count
      const energyPerProduct = totalEnergy > 0 ? totalEnergy / numValue : 0;

      // Update the table data with the fetched energy values and calculations
      setTableData(prev => ({
        ...prev,
        [date]: {
          ...prev[date],
          [shift]: {
            ...prev[date][shift],
            count: numValue,
            energy: totalEnergy, // Store combined energy
            mainEnergy: energyValues.mainEnergy, // Store main line energy
            shrinkEnergy: energyValues.shrinkEnergy, // Store shrink line energy
            totalEnergyConsume: energyPerProduct // Products per energy unit
          }
        }
      }));

      setHasChanges(true);
    } catch (error) {
      console.error('Error fetching energy data:', error);
    } finally {
      // Clear loading state
      setLoadingCells(prev => ({
        ...prev,
        [`${date}_${shift}_energy`]: false
      }));
    }
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      // Prepare data for saving - make sure all calculated values are included
      const dataToSave = Object.entries(tableData).reduce((acc, [date, shifts]) => {
        acc[date] = {};

        Object.entries(shifts).forEach(([shift, data]) => {
          // Get the energy data for this date and shift
          const mainEnergy = energyData[date]?.[shift]?.main || 0;
          const shrinkEnergy = energyData[date]?.[shift]?.shrink || 0;
          const totalEnergy = mainEnergy + shrinkEnergy;
          const count = data.count;

          // Calculate products per energy unit - ensure we don't divide by zero
          // Changed formula: count / totalEnergy instead of totalEnergy / count
          const energyPerProduct = totalEnergy > 0 ? totalEnergy / count : 0;

          acc[date][shift] = {
            ...data,
            mainEnergy,
            shrinkEnergy,
            energy: totalEnergy,
            totalEnergyConsume: energyPerProduct
          };
        });

        return acc;
      }, {});

      await onSaveData(dataToSave);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving production data:', error);
    }
  };

  const formatDisplayDate = (dayStr) => {
    const date = new Date(currentYear, currentMonth, parseInt(dayStr));
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short'
    });
  };

  const getDates = () => {
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) =>
      (i + 1).toString().padStart(2, '0')
    );
  };

  const formattedDate = new Date(currentYear, currentMonth).toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  // Common input field styles
  const getInputStyles = (shift) => {
    // Base styles
    let styles = `w-full py-2 px-3 border rounded text-center focus:outline-none focus:ring-2
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;

    // Add shift-specific styles
    if (shift === 'A') {
      return `${styles} bg-blue-50 w-40 border-blue-200 focus:ring-blue-400 focus:border-blue-400`;
    } else if (shift === 'B') {
      return `${styles} bg-green-50 w-40 border-green-200 focus:ring-green-400 focus:border-green-400`;
    } else {
      return `${styles} bg-yellow-50 w-40 border-yellow-200 focus:ring-yellow-400 focus:border-yellow-400`;
    }
  };

  // Function to format numbers with 2 decimal places
  const formatNumber = (num) => {
    return parseFloat(num).toFixed(2);
  };

  // Calculate products per energy unit directly from current data
  const calculateEnergyPerProduct = (date, shift) => {
    const count = tableData[date]?.[shift]?.count || 0;
    const mainEnergy = energyData[date]?.[shift]?.main || 0;
    const shrinkEnergy = energyData[date]?.[shift]?.shrink || 0;
    const totalEnergy = mainEnergy + shrinkEnergy;

    // Important: Calculate the value anytime it's needed
    // Changed formula: count / totalEnergy instead of totalEnergy / count
    return totalEnergy > 0 ? totalEnergy / count : 0;
  };

  // Manually recalculate all energy per product values
  const recalculateAllEnergyPerUnit = () => {
    setTableData(prev => {
      const updated = { ...prev };

      Object.entries(updated).forEach(([date, shifts]) => {
        Object.entries(shifts).forEach(([shift, data]) => {
          const count = data.count;
          const mainEnergy = energyData[date]?.[shift]?.main || 0;
          const shrinkEnergy = energyData[date]?.[shift]?.shrink || 0;
          const totalEnergy = mainEnergy + shrinkEnergy;

          // Calculate and update the products per energy unit
          // Changed formula: count / totalEnergy instead of totalEnergy / count
          updated[date][shift].totalEnergyConsume = totalEnergy > 0 ? totalEnergy / count : 0;
        });
      });

      return updated;
    });
  };

  // Call recalculation whenever energyData changes
  useEffect(() => {
    recalculateAllEnergyPerUnit();
  }, [energyData]);

  // Function to get the display style for shift headers
  const getShiftHeaderStyle = (shift) => {
    if (shift === 'A') {
      return "bg-blue-500 text-white";
    } else if (shift === 'B') {
      return "bg-green-500 text-white";
    } else {
      return "bg-yellow-500 text-white";
    }
  };

  // Function to get the display style for shift subheaders
  const getShiftSubheaderStyle = (shift) => {
    if (shift === 'A') {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else if (shift === 'B') {
      return "bg-green-100 text-green-800 border-green-200";
    } else {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  // Function to get background color for read-only cells
  const getReadOnlyBgStyle = (shift) => {
    if (shift === 'A') {
      return "bg-blue-50 text-blue-800";
    } else if (shift === 'B') {
      return "bg-green-50 text-green-800";
    } else {
      return "bg-yellow-50 text-yellow-800";
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-2 border-b bg-white sticky top-0 z-10">
        <h2 className="text-lg font-bold text-gray-800">
          Edit {lineType} Product Count
        </h2>
        <span className="text-lg font-semibold text-blue-600">
          {formattedDate}
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${hasChanges
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <IoClose className="w-6 h-6 text-gray-600 hover:text-red-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="border-b sticky top-0 z-10">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-800 border-r w-32 bg-gray-200">Date</th>
                <th className={`py-3 px-4 text-center font-semibold border-r ${getShiftHeaderStyle('A')}`} colSpan="4">
                  <div className="flex items-center justify-center space-x-2">
                    <span>Shift A</span>
                  </div>
                </th>
                <th className={`py-3 px-4 text-center font-semibold border-r ${getShiftHeaderStyle('B')}`} colSpan="4">
                  <div className="flex items-center justify-center space-x-2">
                    <span>Shift B</span>
                  </div>
                </th>
                <th className={`py-3 px-4 text-center font-semibold ${getShiftHeaderStyle('C')}`} colSpan="4">
                  <div className="flex items-center justify-center space-x-2">
                    <span>Shift C</span>
                  </div>
                </th>
              </tr>
              <tr>
                <th className="py-2 px-2 text-left font-semibold text-gray-800 border-r bg-gray-100"></th>
                {['A', 'B', 'C'].map(shift => (
                  <React.Fragment key={shift}>
                    <th className={`w-32 py-2 px-2 text-center font-semibold border-r ${getShiftSubheaderStyle(shift)}`}>Count</th>
                    <th className={`w-32 py-2 px-2 text-center font-semibold border-r ${getShiftSubheaderStyle(shift)}`}>Main kWh</th>
                    <th className={`w-32 py-2 px-2 text-center font-semibold border-r ${getShiftSubheaderStyle(shift)}`}>Shrink kWh</th>
                    <th className={`w-32 py-2 px-2 text-center font-semibold border-r ${getShiftSubheaderStyle(shift)}`}>Per Unit</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <tbody>
              {getDates().map((date, rowIndex) => {
                const isEvenRow = rowIndex % 2 === 0;
                return (
                  <tr
                    key={date}
                    className={`border-b hover:bg-gray-100 transition-colors ${isEvenRow ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="w-32 py-2 px-4 text-gray-700 font-medium border-r">
                      {formatDisplayDate(date)}
                    </td>
                    {['A', 'B', 'C'].map((shift) => {
                      const inputKey = `${date}_${shift}_count`;
                      const isLoading = loadingCells[`${date}_${shift}_energy`];
                      const mainEnergy = energyData[date]?.[shift]?.main || 0;
                      const shrinkEnergy = energyData[date]?.[shift]?.shrink || 0;
                      const count = tableData[date]?.[shift]?.count || 0;

                      // Calculate products per energy unit
                      const totalEnergy = mainEnergy + shrinkEnergy;
                      const energyPerProduct = totalEnergy > 0 ? totalEnergy / count : 0;

                      return (
                        <React.Fragment key={shift}>
                          {/* Count Input */}
                          <td className="w-32 py-1 px-1 text-center border-r">
                            <input
                              type="text"
                              inputMode="numeric"
                              value={inputValues[inputKey] || ''}
                              onChange={(e) => handleInputChange(date, shift, e.target.value)}
                              className={getInputStyles(shift)}
                              onBlur={() => {
                                recalculateAllEnergyPerUnit();
                              }}
                            />
                          </td>

                          {/* Main Line Energy */}
                          <td className="w-32 py-1 px-1 text-center border-r">
                            {isLoading ? (
                              <div className="flex justify-center">
                                <div className={`animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 ${shift === 'A' ? 'border-blue-500' :
                                  shift === 'B' ? 'border-green-500' : 'border-yellow-500'
                                  }`}></div>
                              </div>
                            ) : (
                              <div className={`py-2 px-3 rounded-md font-medium ${getReadOnlyBgStyle(shift)}`}>
                                {formatNumber(mainEnergy)}
                              </div>
                            )}
                          </td>

                          {/* Shrink Line Energy */}
                          <td className="w-32 py-1 px-1 text-center border-r">
                            {isLoading ? (
                              <div className="flex justify-center">
                                <div className={`animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 ${shift === 'A' ? 'border-blue-500' :
                                  shift === 'B' ? 'border-green-500' : 'border-yellow-500'
                                  }`}></div>
                              </div>
                            ) : (
                              <div className={`py-2 px-3 rounded-md font-medium ${getReadOnlyBgStyle(shift)}`}>
                                {formatNumber(shrinkEnergy)}
                              </div>
                            )}
                          </td>

                          {/* Products Per Energy */}
                          <td className="w-32 py-1 px-1 text-center border-r">
                            <div className={`py-2 px-3 rounded-md font-medium ${getReadOnlyBgStyle(shift)}`}>
                              {formatNumber(energyPerProduct)}
                            </div>
                          </td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductionDataTable;