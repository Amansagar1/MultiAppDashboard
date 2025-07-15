// import React, { useState, useEffect } from 'react';
// import { IoClose } from "react-icons/io5";

// const ProductionDataTable = ({
//   productionData,
//   onSaveData,
//   currentMonth,
//   currentYear,
//   instanceId,
//   lineType,
//   onClose
// }) => {
//   const [tableData, setTableData] = useState({});
//   const [hasChanges, setHasChanges] = useState(false);

//   useEffect(() => {
//     const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
//     const initialData = {};

//     for (let i = 1; i <= lastDay; i++) {
//       const date = i.toString().padStart(2, '0');
//       const existingData = productionData.find(
//         item => item.instanceId === instanceId && item.date === date
//       );

//       initialData[date] = {
//         Shift_A: existingData?.shifts?.A || 0,
//         Shift_B: existingData?.shifts?.B || 0,
//         Shift_C: existingData?.shifts?.C || 0
//       };
//     }

//     setTableData(initialData);
//     setHasChanges(false);
//   }, [productionData, instanceId, currentMonth, currentYear]);

//   const handleInputChange = (date, shift, value) => {
//     const numValue = Number(value);
//     if (isNaN(numValue) || numValue < 0) return;

//     setTableData(prev => ({
//       ...prev,
//       [date]: {
//         ...prev[date],
//         [`Shift_${shift}`]: numValue
//       }
//     }));
//     setHasChanges(true);
//   };

//   const handleSave = async () => {
//     if (!hasChanges) return;

//     try {
//       const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
//       const formattedData = {};

//       for (let i = 1; i <= lastDay; i++) {
//         const date = i.toString().padStart(2, '0');
//         formattedData[date] = {
//           Shift_A: Number(tableData[date]?.Shift_A) || 0,
//           Shift_B: Number(tableData[date]?.Shift_B) || 0,
//           Shift_C: Number(tableData[date]?.Shift_C) || 0
//         };
//       }

//       await onSaveData(formattedData);
//       setHasChanges(false);
//     } catch (error) {
//       console.error('Error saving production data:', error);
//     }
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

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex justify-between items-center p-4 border-b bg-white">
//         <h2 className="text-xl font-bold text-gray-800">
//           Edit {lineType} Product Count
//         </h2>
//         <span className="text-lg font-semibold text-gray-700">
//           {formattedDate}
//         </span>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleSave}
//             disabled={!hasChanges}
//             className={`px-4 py-2 rounded transition-colors ${hasChanges
//               ? 'bg-blue-500 text-white hover:bg-blue-600'
//               : 'bg-gray-300 text-gray-500'
//               }`}
//           >
//             Save Changes
//           </button>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <IoClose className="w-6 h-6 text-gray-600 hover:text-gray-800" />
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 overflow-hidden flex flex-col">
//         <div className="border-b bg-gray-50">
//           <table className="w-full">
//             <thead>
//               <tr className='bg-gray-100'>
//                 <th className="py-3 px-6 text-left font-semibold text-gray-800 border-r w-24">Date</th>
//                 <th className="py-3 px-6 text-left font-semibold text-gray-800 border-r">Shift A</th>
//                 <th className="py-3 px-6 text-left font-semibold text-gray-800 border-r">Shift B</th>
//                 <th className="py-3 px-6 text-left font-semibold text-gray-800">Shift C</th>
//               </tr>
//             </thead>
//           </table>
//         </div>

//         <div className="flex-1 overflow-auto">
//           <table className="w-full">
//             <tbody>
//               {getDates().map(date => (
//                 <tr key={date} className="border-b hover:bg-gray-50 transition-colors">
//                   <td className="py-2 px-4 text-gray-700 font-medium border-r w-24">
//                     {date}
//                   </td>
//                   {['A', 'B', 'C'].map((shift, index) => (
//                     <td key={shift} className={`py-2 px-4 ${index !== 2 ? 'border-r' : ''}`}>
//                       <input
//                         type="number"
//                         value={tableData[date]?.[`Shift_${shift}`] || ''}
//                         onChange={(e) => handleInputChange(date, shift, e.target.value)}
//                         className="w-full py-2 px-6 border rounded
//                           focus:outline-none focus:ring-2 focus:ring-blue-500
//                           [appearance:textfield] 
//                           [&::-webkit-outer-spin-button]:appearance-none 
//                           [&::-webkit-inner-spin-button]:appearance-none
//                           [-moz-appearance:textfield]
//                           [&::-webkit-inner-spin-button]:m-0
//                           [&::-webkit-outer-spin-button]:m-0"
//                         min="0"
//                         style={{
//                           WebkitAppearance: 'none',
//                           MozAppearance: 'textfield'
//                         }}
//                       />
//                     </td>
//                   ))}
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


import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";

const ProductionDataTable = ({
  productionData,
  onSaveData,
  currentMonth,
  currentYear,
  instanceId,
  lineType,
  onClose
}) => {
  const [tableData, setTableData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Initialize table data from productionData
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const initialData = {};

    for (let i = 1; i <= lastDay; i++) {
      const dayStr = i.toString().padStart(2, '0');
      // Find the corresponding data from productionData
      const existingData = productionData.find(
        item => item.instanceId === instanceId && item.rawDate === dayStr
      );

      initialData[dayStr] = {
        Shift_A: existingData?.shifts?.A || 0,
        Shift_B: existingData?.shifts?.B || 0,
        Shift_C: existingData?.shifts?.C || 0
      };
    }

    setTableData(initialData);
    setHasChanges(false);
  }, [productionData, instanceId, currentMonth, currentYear]);

  const handleInputChange = (date, shift, value) => {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < 0) return;

    setTableData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [`Shift_${shift}`]: numValue
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
      const formattedData = {};

      // Format data for API
      for (let i = 1; i <= lastDay; i++) {
        const dayStr = i.toString().padStart(2, '0');
        formattedData[dayStr] = {
          Shift_A: Number(tableData[dayStr]?.Shift_A) || 0,
          Shift_B: Number(tableData[dayStr]?.Shift_B) || 0,
          Shift_C: Number(tableData[dayStr]?.Shift_C) || 0
        };
      }

      await onSaveData(formattedData);
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <h2 className="text-xl font-bold text-gray-800">
          Edit {lineType} Product Count
        </h2>
        <span className="text-lg font-semibold text-gray-700">
          {formattedDate}
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-4 py-2 rounded transition-colors ${hasChanges
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500'
              }`}
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose className="w-6 h-6 text-gray-600 hover:text-red-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="border-b bg-gray-50">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 text-left font-semibold text-gray-800 border-r w-32">Date</th>
                <th className="py-3 px-6 text-left font-semibold text-gray-800 border-r">Shift A</th>
                <th className="py-3 px-6 text-left font-semibold text-gray-800 border-r">Shift B</th>
                <th className="py-3 px-6 text-left font-semibold text-gray-800">Shift C</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <tbody>
              {getDates().map(date => (
                <tr key={date} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 text-gray-700 font-medium border-r w-32">
                    {formatDisplayDate(date)}
                  </td>
                  {['A', 'B', 'C'].map((shift, index) => (
                    <td key={shift} className={`py-2 px-4 ${index !== 2 ? 'border-r' : ''}`}>
                      <input
                        type="number"
                        value={tableData[date]?.[`Shift_${shift}`] || ''}
                        onChange={(e) => handleInputChange(date, shift, e.target.value)}
                        className="w-full py-2 px-6 border rounded
                          focus:outline-none focus:ring-2 focus:ring-blue-500
                          [appearance:textfield] 
                          [&::-webkit-outer-spin-button]:appearance-none 
                          [&::-webkit-inner-spin-button]:appearance-none
                          [-moz-appearance:textfield]
                          [&::-webkit-inner-spin-button]:m-0
                          [&::-webkit-outer-spin-button]:m-0"
                        min="0"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'textfield'
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductionDataTable;