import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import { useTheme } from '../../Components/Context/ThemeContext';

// eslint-disable-next-line react/display-name
const Timestamps = React.memo(({ onTimeRangeApply = () => { }, onClose = () => { }, initialTimeRange, instanceName }) => {
  const { isDarkMode } = useTheme();
  const [fromTime, setFromTime] = useState(new Date(initialTimeRange?.from || Date.now()));
  const [toTime, setToTime] = useState(new Date(initialTimeRange?.to || Date.now()));
  const [quickRange, setQuickRange] = useState("");
  const [isAbsoluteTimeSelected, setIsAbsoluteTimeSelected] = useState(false);

  const quickRanges = [
    'Shift A', // 6 AM - 2 PM
    'Shift B', // 2 PM - 10 PM
    'Shift C', // 10 PM - 6 AM (next day)
    'Last 5 minutes',
    'Last 15 minutes',
    'Last 30 minutes',
    'Last 1 hour',
    'Last 3 hours',
    'Last 6 hours',
    'Last 12 hours',
    'Last 24 hours',
    'Last 2 days'
  ];

  useEffect(() => {
    // Load selection type from cookies for the specific instance
    const storedSelectionType = Cookies.get(`timeSelectionType-${instanceName}`);
    if (storedSelectionType) {
      setIsAbsoluteTimeSelected(storedSelectionType === 'absolute');
    }

    // Load quick range from cookies for the specific instance
    const storedQuickRange = Cookies.get(`activeQuickRange-${instanceName}`);
    if (storedQuickRange) {
      setQuickRange(storedQuickRange);
      setIsAbsoluteTimeSelected(false);
    }

    // Load time range from cookies for the specific instance
    const storedTimeRange = Cookies.get(`selectedTimeRange-${instanceName}`);
    if (storedTimeRange) {
      const parsedTimeRange = JSON.parse(storedTimeRange);
      setFromTime(new Date(parsedTimeRange.from));
      setToTime(new Date(parsedTimeRange.to));
    } else {
      const now = new Date();
      const defaultFromTime = new Date(now.getTime() - 5 * 60 * 1000);
      setFromTime(defaultFromTime);
      setToTime(now);
      setQuickRange("Last 5 minutes");
      setIsAbsoluteTimeSelected(false);

      // Save default values to cookies
      Cookies.set(`selectedTimeRange-${instanceName}`, JSON.stringify({
        from: defaultFromTime.toISOString(),
        to: now.toISOString()
      }));
      Cookies.set(`activeQuickRange-${instanceName}`, "Last 5 minutes");
      Cookies.set(`timeSelectionType-${instanceName}`, 'quick');
    }
  }, [instanceName]);

  const calculateShiftTimeRange = (shiftName) => {
    const now = new Date();
    let from = new Date(now);
    let to = new Date(now);

    switch (shiftName) {
      case 'Shift A':
        from.setHours(6, 0, 0, 0);
        to.setHours(14, 0, 0, 0);
        break;
      case 'Shift B':
        from.setHours(14, 0, 0, 0);
        to.setHours(22, 0, 0, 0);
        break;
      case 'Shift C':
        // Handle shift C crossing midnight
        from.setHours(22, 0, 0, 0);
        to.setHours(6, 0, 0, 0);

        // If current time is before 6 AM, adjust from time to previous day
        if (now.getHours() < 6) {
          from.setDate(from.getDate() - 1);
        } else {
          // If current time is after 10 PM, adjust to time to next day
          to.setDate(to.getDate() + 1);
        }
        break;
      default:
        return null;
    }

    return {
      from: from.toISOString(),
      to: to.toISOString()
    };
  };

  const handleQuickRangeClick = (range) => {
    const now = new Date();
    let timeRange;

    if (['Shift A', 'Shift B', 'Shift C'].includes(range)) {
      timeRange = calculateShiftTimeRange(range);
    } else {
      timeRange = handleStandardQuickRange(range, now);
    }

    setFromTime(null);
    setToTime(null);
    setQuickRange(range);
    setIsAbsoluteTimeSelected(false);

    // Save to cookies
    Cookies.set(`activeQuickRange-${instanceName}`, range);
    Cookies.set(`timeSelectionType-${instanceName}`, 'quick');
    Cookies.set(`selectedTimeRange-${instanceName}`, JSON.stringify(timeRange));

    if (onTimeRangeApply) {
      onTimeRangeApply(timeRange, range);
    }
    onClose();
  };

  const handleStandardQuickRange = (range, now) => {
    let fromDate = new Date(now);

    switch (range) {
      case 'Last 5 minutes':
        fromDate.setMinutes(now.getMinutes() - 5);
        break;
      case 'Last 15 minutes':
        fromDate.setMinutes(now.getMinutes() - 15);
        break;
      case 'Last 30 minutes':
        fromDate.setMinutes(now.getMinutes() - 30);
        break;
      case 'Last 1 hour':
        fromDate.setHours(now.getHours() - 1);
        break;
      case 'Last 3 hours':
        fromDate.setHours(now.getHours() - 3);
        break;
      case 'Last 6 hours':
        fromDate.setHours(now.getHours() - 6);
        break;
      case 'Last 12 hours':
        fromDate.setHours(now.getHours() - 12);
        break;
      case 'Last 24 hours':
        fromDate.setHours(now.getHours() - 24);
        break;
      case 'Last 2 days':
        fromDate.setDate(now.getDate() - 2);
        break;
      default:
        break;
    }

    return {
      from: fromDate.toISOString(),
      to: now.toISOString()
    };
  };

  const handleApplyTimeRange = () => {
    const selectedTimeRange = {
      from: fromTime.toISOString(),
      to: toTime.toISOString(),
    };

    Cookies.set(`selectedTimeRange-${instanceName}`, JSON.stringify(selectedTimeRange));
    Cookies.set(`timeSelectionType-${instanceName}`, 'absolute');
    Cookies.remove(`activeQuickRange-${instanceName}`); // Clear quick range when absolute time is applied

    if (typeof onTimeRangeApply === 'function') {
      onTimeRangeApply(selectedTimeRange, null);
    }
    onClose();
  };

  const handleAbsoluteTimeChange = (type, date) => {
    if (type === 'from') setFromTime(date);
    else setToTime(date);
    setQuickRange(null);
    setIsAbsoluteTimeSelected(true);
    Cookies.set(`timeSelectionType-${instanceName}`, 'absolute');
    Cookies.remove(`activeQuickRange-${instanceName}`);
  };

  const handleAbsoluteTimeClick = () => {
    setIsAbsoluteTimeSelected(true);
    setQuickRange(null);
    Cookies.set(`timeSelectionType-${instanceName}`, 'absolute');
    Cookies.remove(`activeQuickRange-${instanceName}`);
  };

  return (
    <div
      style={{ position: "absolute", zIndex: 1000 }}
      className={`absolute top-14 right-5 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <div className={`shadow-lg rounded-md p-5 w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className="flex h-[300px]">
          <div
            className={`flex flex-col w-1/2 pr-4 border-r border-gray-200 p-2 transition-all duration-300 ${isDarkMode ? 'text-white' : ' text-gray-800'} 
              ${isAbsoluteTimeSelected ? 'text-sky-500 border-sky-600' : ''}`}
            onClick={handleAbsoluteTimeClick}
          >
            <h2 className={`font-semibold mb-4 ${!isAbsoluteTimeSelected ? '' : 'text-sky-500'} `}>
              Absolute time range
            </h2>
            <div className={`mb-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              <label className={`block text-sm text-gray-600 mb-1  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>From</label>
              <div className={`text-black flex items-center gap-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <DatePicker
                  selected={fromTime}
                  onChange={(date) => handleAbsoluteTimeChange('from', date)}
                  showTimeSelect
                  locale="es"
                  dateFormat="dd/MM/yy h:mm aa"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black flex items-center gap-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                />
                <FaCalendarAlt className="" />
              </div>
            </div>
            <div className={`mb-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              <label className={`block text-sm text-gray-600 mb-1  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>To</label>
              <div className={`text-black flex items-center gap-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <DatePicker
                  selected={toTime}
                  onChange={(date) => handleAbsoluteTimeChange('to', date)}
                  showTimeSelect
                  locale="es"
                  dateFormat="dd/MM/yy h:mm aa"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black flex items-center gap-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                />
                <FaCalendarAlt className="" />
              </div>
            </div>
            <button
              className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition-colors"
              onClick={handleApplyTimeRange}
            >
              Apply time range
            </button>
          </div>

          <div className={`flex flex-col w-1/2 pl-4 h-[300px] overflow-scroll ${!isAbsoluteTimeSelected ? 'text-sky-500 border-sky-600' : ''} ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h2 className={`font-semibold mb-2 ${!isAbsoluteTimeSelected ? 'text-sky-500' : ''} `}>
              Quick ranges
            </h2>
            <ul className={`space-y-1 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              {quickRanges.map((range, index) => (
                <li key={index}>
                  <button
                    className={`w-full py-2 px-4 rounded-md transition-colors flex items-center justify-start
                    ${quickRange === range ? 'bg-gray-400 text-white shadow-md ' : 'hover:bg-gray-100 hover:text-gray-700 '}`}
                    onClick={() => handleQuickRangeClick(range)}
                  >
                    {range}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600 flex justify-between items-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <span>Browser Time: <strong>{Intl.DateTimeFormat().resolvedOptions().timeZone}</strong></span>
          <button onClick={onClose} className="text-sky-600 hover:underline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

export default Timestamps;


// import React, { useState, useEffect } from 'react';
// import { FaCalendarAlt } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import Cookies from 'js-cookie';
// import { useTheme } from '../../Components/Context/ThemeContext';

// // eslint-disable-next-line react/display-name
// const Timestamps = React.memo(({ onTimeRangeApply = () => { }, onClose = () => { }, initialTimeRange, instanceName }) => {
//   const { isDarkMode } = useTheme();
//   const [fromTime, setFromTime] = useState(new Date(initialTimeRange?.from || Date.now()));
//   const [toTime, setToTime] = useState(new Date(initialTimeRange?.to || Date.now()));
//   const [quickRange, setQuickRange] = useState("Shift A"); // Set default to Shift A
//   const [isAbsoluteTimeSelected, setIsAbsoluteTimeSelected] = useState(false);

//   const quickRanges = [
//     'Shift A', // 6 AM - 2 PM
//     'Shift B', // 2 PM - 10 PM
//     'Shift C', // 10 PM - 6 AM (next day)
//     'Last 5 minutes',
//     'Last 15 minutes',
//     'Last 30 minutes',
//     'Last 1 hour',
//     'Last 3 hours',
//     'Last 6 hours',
//     'Last 12 hours',
//     'Last 24 hours',
//     'Last 2 days'
//   ];

//   useEffect(() => {
//     // Load selection type from cookies for the specific instance
//     const storedSelectionType = Cookies.get(`timeSelectionType-${instanceName}`);
//     if (storedSelectionType) {
//       setIsAbsoluteTimeSelected(storedSelectionType === 'absolute');
//     }

//     // Load quick range from cookies for the specific instance
//     const storedQuickRange = Cookies.get(`activeQuickRange-${instanceName}`);
//     if (storedQuickRange) {
//       setQuickRange(storedQuickRange);
//       setIsAbsoluteTimeSelected(false);
//     } else {
//       // Set default to Shift A if no stored quick range
//       setQuickRange("Shift A");
//       setIsAbsoluteTimeSelected(false);

//       // Calculate Shift A default time range
//       const shiftATimeRange = calculateShiftTimeRange("Shift A");

//       // Save default values to cookies
//       Cookies.set(`selectedTimeRange-${instanceName}`, JSON.stringify(shiftATimeRange));
//       Cookies.set(`activeQuickRange-${instanceName}`, "Shift A");
//       Cookies.set(`timeSelectionType-${instanceName}`, 'quick');

//       // Set from and to times based on Shift A
//       setFromTime(new Date(shiftATimeRange.from));
//       setToTime(new Date(shiftATimeRange.to));

//       return; // Exit early to prevent overriding with the code below
//     }

//     // Load time range from cookies for the specific instance
//     const storedTimeRange = Cookies.get(`selectedTimeRange-${instanceName}`);
//     if (storedTimeRange) {
//       const parsedTimeRange = JSON.parse(storedTimeRange);
//       setFromTime(new Date(parsedTimeRange.from));
//       setToTime(new Date(parsedTimeRange.to));
//     } else {
//       // If no stored time range, set Shift A as default
//       const shiftATimeRange = calculateShiftTimeRange("Shift A");
//       setFromTime(new Date(shiftATimeRange.from));
//       setToTime(new Date(shiftATimeRange.to));
//       setQuickRange("Shift A");
//       setIsAbsoluteTimeSelected(false);

//       // Save default values to cookies
//       Cookies.set(`selectedTimeRange-${instanceName}`, JSON.stringify(shiftATimeRange));
//       Cookies.set(`activeQuickRange-${instanceName}`, "Shift A");
//       Cookies.set(`timeSelectionType-${instanceName}`, 'quick');
//     }
//   }, [instanceName]);

//   const calculateShiftTimeRange = (shiftName) => {
//     const now = new Date();
//     let from = new Date(now);
//     let to = new Date(now);

//     switch (shiftName) {
//       case 'Shift A':
//         from.setHours(6, 0, 0, 0);
//         to.setHours(14, 0, 0, 0);
//         break;
//       case 'Shift B':
//         from.setHours(14, 0, 0, 0);
//         to.setHours(22, 0, 0, 0);
//         break;
//       case 'Shift C':
//         // Handle shift C crossing midnight
//         from.setHours(22, 0, 0, 0);
//         to.setHours(6, 0, 0, 0);

//         // If current time is before 6 AM, adjust from time to previous day
//         if (now.getHours() < 6) {
//           from.setDate(from.getDate() - 1);
//         } else {
//           // If current time is after 10 PM, adjust to time to next day
//           to.setDate(to.getDate() + 1);
//         }
//         break;
//       default:
//         return null;
//     }

//     return {
//       from: from.toISOString(),
//       to: to.toISOString()
//     };
//   };

//   const handleQuickRangeClick = (range) => {
//     const now = new Date();
//     let timeRange;

//     if (['Shift A', 'Shift B', 'Shift C'].includes(range)) {
//       timeRange = calculateShiftTimeRange(range);
//     } else {
//       timeRange = handleStandardQuickRange(range, now);
//     }

//     setFromTime(new Date(timeRange.from));
//     setToTime(new Date(timeRange.to));
//     setQuickRange(range);
//     setIsAbsoluteTimeSelected(false);

//     // Save to cookies
//     Cookies.set(`activeQuickRange-${instanceName}`, range);
//     Cookies.set(`timeSelectionType-${instanceName}`, 'quick');
//     Cookies.set(`selectedTimeRange-${instanceName}`, JSON.stringify(timeRange));

//     if (onTimeRangeApply) {
//       onTimeRangeApply(timeRange, range);
//     }
//     onClose();
//   };

//   const handleStandardQuickRange = (range, now) => {
//     let fromDate = new Date(now);

//     switch (range) {
//       case 'Last 5 minutes':
//         fromDate.setMinutes(now.getMinutes() - 5);
//         break;
//       case 'Last 15 minutes':
//         fromDate.setMinutes(now.getMinutes() - 15);
//         break;
//       case 'Last 30 minutes':
//         fromDate.setMinutes(now.getMinutes() - 30);
//         break;
//       case 'Last 1 hour':
//         fromDate.setHours(now.getHours() - 1);
//         break;
//       case 'Last 3 hours':
//         fromDate.setHours(now.getHours() - 3);
//         break;
//       case 'Last 6 hours':
//         fromDate.setHours(now.getHours() - 6);
//         break;
//       case 'Last 12 hours':
//         fromDate.setHours(now.getHours() - 12);
//         break;
//       case 'Last 24 hours':
//         fromDate.setHours(now.getHours() - 24);
//         break;
//       case 'Last 2 days':
//         fromDate.setDate(now.getDate() - 2);
//         break;
//       default:
//         break;
//     }

//     return {
//       from: fromDate.toISOString(),
//       to: now.toISOString()
//     };
//   };

//   const handleApplyTimeRange = () => {
//     const selectedTimeRange = {
//       from: fromTime.toISOString(),
//       to: toTime.toISOString(),
//     };

//     Cookies.set(`selectedTimeRange-${instanceName}`, JSON.stringify(selectedTimeRange));
//     Cookies.set(`timeSelectionType-${instanceName}`, 'absolute');
//     Cookies.remove(`activeQuickRange-${instanceName}`); // Clear quick range when absolute time is applied

//     if (typeof onTimeRangeApply === 'function') {
//       onTimeRangeApply(selectedTimeRange, null);
//     }
//     onClose();
//   };

//   const handleAbsoluteTimeChange = (type, date) => {
//     if (type === 'from') setFromTime(date);
//     else setToTime(date);
//     setQuickRange(null);
//     setIsAbsoluteTimeSelected(true);
//     Cookies.set(`timeSelectionType-${instanceName}`, 'absolute');
//     Cookies.remove(`activeQuickRange-${instanceName}`);
//   };

//   const handleAbsoluteTimeClick = () => {
//     setIsAbsoluteTimeSelected(true);
//     setQuickRange(null);
//     Cookies.set(`timeSelectionType-${instanceName}`, 'absolute');
//     Cookies.remove(`activeQuickRange-${instanceName}`);
//   };

//   return (
//     <div
//       style={{ position: "absolute", zIndex: 1000 }}
//       className={`absolute top-14 right-5 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
//     >
//       <div className={`shadow-lg rounded-md p-5 w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//         <div className="flex h-[300px]">
//           <div
//             className={`flex flex-col w-1/2 pr-4 border-r border-gray-200 p-2 transition-all duration-300 ${isDarkMode ? 'text-white' : ' text-gray-800'}
//               ${isAbsoluteTimeSelected ? 'text-sky-500 border-sky-600' : ''}`}
//             onClick={handleAbsoluteTimeClick}
//           >
//             <h2 className={`font-semibold mb-4 ${!isAbsoluteTimeSelected ? '' : 'text-sky-500'} `}>
//               Absolute time range
//             </h2>
//             <div className={`mb-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//               <label className={`block text-sm text-gray-600 mb-1  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>From</label>
//               <div className={`text-black flex items-center gap-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//                 <DatePicker
//                   selected={fromTime}
//                   onChange={(date) => handleAbsoluteTimeChange('from', date)}
//                   showTimeSelect
//                   locale="es"
//                   dateFormat="dd/MM/yy h:mm aa"
//                   className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black flex items-center gap-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
//                 />
//                 <FaCalendarAlt className="" />
//               </div>
//             </div>
//             <div className={`mb-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//               <label className={`block text-sm text-gray-600 mb-1  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>To</label>
//               <div className={`text-black flex items-center gap-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//                 <DatePicker
//                   selected={toTime}
//                   onChange={(date) => handleAbsoluteTimeChange('to', date)}
//                   showTimeSelect
//                   locale="es"
//                   dateFormat="dd/MM/yy h:mm aa"
//                   className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black flex items-center gap-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
//                 />
//                 <FaCalendarAlt className="" />
//               </div>
//             </div>
//             <button
//               className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition-colors"
//               onClick={handleApplyTimeRange}
//             >
//               Apply time range
//             </button>
//           </div>

//           <div className={`flex flex-col w-1/2 pl-4 h-[300px] overflow-scroll ${!isAbsoluteTimeSelected ? 'text-sky-500 border-sky-600' : ''} ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//             <h2 className={`font-semibold mb-2 ${!isAbsoluteTimeSelected ? 'text-sky-500' : ''} `}>
//               Quick ranges
//             </h2>
//             <ul className={`space-y-1 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//               {quickRanges.map((range, index) => (
//                 <li key={index}>
//                   <button
//                     className={`w-full py-2 px-4 rounded-md transition-colors flex items-center justify-start
//                     ${quickRange === range ? 'bg-gray-400 text-white shadow-md ' : 'hover:bg-gray-100 hover:text-gray-700 '}`}
//                     onClick={() => handleQuickRangeClick(range)}
//                   >
//                     {range}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className={`mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600 flex justify-between items-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//           <span>Browser Time: <strong>{Intl.DateTimeFormat().resolvedOptions().timeZone}</strong></span>
//           <button onClick={onClose} className="text-sky-600 hover:underline">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default Timestamps;