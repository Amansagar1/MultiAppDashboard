import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { FaHome } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';

import Timestamp from "./Timestamps";
import { useBreadcrumb } from '../../Components/Context/BreadcrumbProvider';
import { IoIosRefresh } from "react-icons/io";
import { useTheme } from '../../Components/Context/ThemeContext';

const RuntimeBreadcrumb = ({ instanceName, onTimeRangeApply, lastUpdated, }) => {
  const { isDarkMode } = useTheme();
  const [isAutoRefreshDropdownOpen, setIsAutoRefreshDropdownOpen] = useState(false);
  const [isTimestampsOpen, setIsTimestampsOpen] = useState(false);

  // Initialize with stored values or defaults
  const initialTimeRange = Cookies.get(`selectedTimeRange-${instanceName}`)
    ? JSON.parse(Cookies.get(`selectedTimeRange-${instanceName}`))
    : { from: new Date(Date.now() - 5 * 60 * 1000).toISOString(), to: new Date().toISOString() };

  const initialQuickRange = Cookies.get(`activeQuickRange-${instanceName}`) || 'Last 5 minutes';
  const initialRefreshRate = Cookies.get(`selectedRefreshRate-${instanceName}`) || 'Off';

  const [selectedTimeRange, setSelectedTimeRange] = useState(initialTimeRange);
  const [selectedRefreshRate, setSelectedRefreshRate] = useState(initialRefreshRate);
  const [quickRangeLabel, setQuickRangeLabel] = useState(initialQuickRange);
  const [inputWidth, setInputWidth] = useState('');

  const { isBreadcrumbVisible } = useBreadcrumb(true);
  const dropdownRef = useRef(null);

  const toggleAutoRefreshDropdown = () => setIsAutoRefreshDropdownOpen(!isAutoRefreshDropdownOpen);
  const toggleTimestamps = () => setIsTimestampsOpen(!isTimestampsOpen);

  const handleTimeRangeApply = (timeRange, quickRange) => {
    setSelectedTimeRange(timeRange);
    setQuickRangeLabel(quickRange || formatTimeRange(timeRange));

    // Save to cookies for the specific instance
    Cookies.set(`selectedTimeRange-${instanceName}`, JSON.stringify(timeRange));
    Cookies.set(`activeQuickRange-${instanceName}`, quickRange || '');

    onTimeRangeApply?.(timeRange);
    setIsTimestampsOpen(false);
  };

  const formatTimeRange = (timeRange) => {
    if (!timeRange?.from || !timeRange?.to) return '';
    return `From ${new Date(timeRange.from).toLocaleString()} To ${new Date(timeRange.to).toLocaleString()}`;
  };

  // Load saved refresh rate on mount
  useEffect(() => {
    const savedRefreshRate = Cookies.get(`selectedRefreshRate-${instanceName}`);
    if (savedRefreshRate) {
      setSelectedRefreshRate(savedRefreshRate);
    }
  }, [instanceName]);

  // Handle refresh rate changes
  const handleRefreshRateChange = (rate) => {
    setSelectedRefreshRate(rate);
    Cookies.set(`selectedRefreshRate-${instanceName}`, rate);
    setIsAutoRefreshDropdownOpen(false);
  };
  // Initialize the display value on component mount
  useEffect(() => {
    const savedTimeRange = Cookies.get(`selectedTimeRange-${instanceName}`)
      ? JSON.parse(Cookies.get(`selectedTimeRange-${instanceName}`))
      : initialTimeRange;

    const savedQuickRange = Cookies.get(`activeQuickRange-${instanceName}`);

    setSelectedTimeRange(savedTimeRange);
    if (!savedQuickRange || savedQuickRange === '') {
      setQuickRangeLabel(formatTimeRange(savedTimeRange));
    } else {
      setQuickRangeLabel(savedQuickRange);
    }
  }, []);

  const handleRefresh = () => {
    const now = new Date();
    let newFrom;

    // Define the time ranges in minutes
    const timeRanges = new Map([
      ['Last 5 minutes', 5],
      ['Last 15 minutes', 15],
      ['Last 30 minutes', 30],
      ['Last 1 hour', 60],
      ['Last 3 hours', 3 * 60],
      ['Last 6 hours', 6 * 60],
      ['Last 12 hours', 12 * 60],
      ['Last 24 hours', 24 * 60],
      ['Last 2 days', 2 * 24 * 60]
    ]);


    if (timeRanges.has(quickRangeLabel)) {
      const minutes = timeRanges.get(quickRangeLabel);
      newFrom = new Date(now.getTime() - minutes * 60 * 1000);
    } else {
      newFrom = new Date(selectedTimeRange.from);
    }

    const updatedTimeRange = { from: newFrom.toISOString(), to: now.toISOString() };
    setSelectedTimeRange(updatedTimeRange);
    onTimeRangeApply?.(updatedTimeRange);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsAutoRefreshDropdownOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedTimeRange = Cookies.get('selectedTimeRange')
      ? JSON.parse(Cookies.get('selectedTimeRange'))
      : initialTimeRange;

    const timeoutId = setTimeout(() => {
      onTimeRangeApply?.(savedTimeRange);
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Adjust input width based on label
  useEffect(() => {
    const label = quickRangeLabel || selectedTimeRange;
    setInputWidth(label.length < 20 ? 'w-32' : 'w-48');
  }, [quickRangeLabel, selectedTimeRange]);

  useEffect(() => {
    if (selectedRefreshRate === 'Now') {
      handleRefresh();
    } else if (selectedRefreshRate !== 'Off') {
      const intervalTime = getIntervalTime(selectedRefreshRate);
      const interval = setInterval(() => {
        handleRefresh();
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [selectedRefreshRate, quickRangeLabel]);


  useEffect(() => {
    Cookies.set(`selectedRefreshRate-${instanceName}`, selectedRefreshRate);
  }, [selectedRefreshRate]);


  const getIntervalTime = (rate) => {
    switch (rate) {
      case '5 sec': return 5000;
      case '10 sec': return 10000;
      case '30 sec': return 30000;
      case '1 min': return 60000;
      case '5 min': return 5 * 60000;
      case '15 min': return 15 * 60000;
      case '30 min': return 30 * 60000;
      case '1 hour': return 60 * 60000;
      case '2 hour': return 2 * 60 * 60000;
      case '1 day': return 24 * 60 * 60000;
      default: return null;
    }
  };

  return (
    <>
      {isBreadcrumbVisible && (
        <div className={`flex justify-between items-center p-1 shadow-md relative ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="flex items-center pl-4 text-sm">
            <nav className="text-gray-600" aria-label="breadcrumb ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}">
              <ol className="inline-flex items-center md:space-x-1">
                <li>
                  <div className={`inline-flex items-center text-gray-600 hover:text-blue-600 ${isDarkMode ? ' text-white' : 'text-gray-800'}`}>
                    <FaHome className="mr-2" />
                    Home
                  </div>
                </li>
                <li>
                  <span className={`mx-1 text-gray-400 ${isDarkMode ? ' text-white' : 'text-gray-800'}`}>/</span>
                  <span className={`text-gray-600 hover:text-blue-600 ${isDarkMode ? ' text-white' : 'text-gray-800'}`}>{instanceName || 'Dashboard '}</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="flex items-center  text-sm">
            <div className="relative flex items-center gap-2">
              <div className={`"text-black ${isDarkMode ? ' text-white ' : 'text-gray-800'}`}>Last Updated on: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A'}</div>
              <div className={`flex items-center bg-gray-50 border p-1 rounded-md cursor-pointer ${isDarkMode ? ' text-white bg-gray-600 border border-black ' : 'text-gray-800'}`}>
                <input
                  type="text"
                  value={quickRangeLabel || formatTimeRange(selectedTimeRange)}
                  className={`bg-transparent border-none focus:outline-none text-gray-600 ${inputWidth} ${isDarkMode ? ' text-white ' : 'text-gray-800'} `}
                  readOnly
                  onClick={() => setIsTimestampsOpen(true)}
                  placeholder="Select time range"
                />
                <RiArrowDropDownLine
                  onClick={toggleTimestamps}
                  className={`text-gray-600 cursor-pointer text-2xl transition-transform ${isTimestampsOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>

              <div className="flex items-center gap-2">
                <button onClick={toggleAutoRefreshDropdown} className={`text-gray-600 shadow border text-[12px] items-center justify-center flex rounded min-w-10   p-1.5 gap-2 ${isDarkMode ? ' text-white bg-gray-600 border border-black ' : 'text-gray-800'}`}>
                  {selectedRefreshRate}

                </button>
                <button onClick={handleRefresh} className={`text-[14px] text-gray-600 w-10 flex items-center justify-center rounded border    p-2 gap-2 ${isDarkMode ? ' text-white bg-gray-600 border border-black ' : 'text-gray-800'}`}><IoIosRefresh /></button>
              </div>
            </div>

            {isAutoRefreshDropdownOpen && (
              <div ref={dropdownRef} style={{ position: "absolute", zIndex: 1000 }} className={`absolute z-10 right-2 top-12 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5  ${isDarkMode ? ' text-white bg-gray-600 border border-black ' : 'text-gray-800'}`}>
                <div className={`p-2 ${isDarkMode ? ' text-white bg-gray-800' : 'text-gray-800'}`}>
                  {['Off', '5 sec', '10 sec', '30 sec', '1 min', '5 min', '15 min', '30 min', '1 hour', '2 hour', '1 day'].map((interval) => (
                    <button
                      key={interval}
                      // onClick={() => setSelectedRefreshRate(interval)}
                      onClick={() => handleRefreshRateChange(interval)}
                      className={`w-full px-4 py-2 text-sm text-left transition-colors duration-200 ease-in-out ${isDarkMode ? ' text-white ' : 'text-gray-800'} ${selectedRefreshRate === interval ? 'bg-sky-500 rounded shadow-md text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                    >
                      {interval}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isTimestampsOpen && (
            <Timestamp
              onClose={() => setIsTimestampsOpen(false)}
              onTimeRangeApply={handleTimeRangeApply}
              initialTimeRange={selectedTimeRange}
              instanceName={instanceName}
            />
          )}

        </div>
      )}
    </>
  );
};

export default RuntimeBreadcrumb;



// import React, { useState, useEffect, useRef } from 'react';
// import Cookies from 'js-cookie';
// import { FaHome } from 'react-icons/fa';
// import { RiArrowDropDownLine } from 'react-icons/ri';

// import Timestamp from "./Timestamps";
// import { useBreadcrumb } from '../../Components/Context/BreadcrumbProvider';
// import { IoIosRefresh } from "react-icons/io";
// import { useTheme } from '../../Components/Context/ThemeContext';

// const RuntimeBreadcrumb = ({ instanceName, onTimeRangeApply, lastUpdated, }) => {
//   const { isDarkMode } = useTheme();
//   const [isAutoRefreshDropdownOpen, setIsAutoRefreshDropdownOpen] = useState(false);
//   const [isTimestampsOpen, setIsTimestampsOpen] = useState(false);

//   // Calculate default Shift A time range
//   const calculateShiftATimeRange = () => {
//     const now = new Date();
//     let from = new Date(now);
//     let to = new Date(now);

//     from.setHours(6, 0, 0, 0);
//     to.setHours(14, 0, 0, 0);

//     return {
//       from: from.toISOString(),
//       to: to.toISOString()
//     };
//   };

//   // Initialize with stored values or Shift A as default
//   const initialTimeRange = Cookies.get(`selectedTimeRange-${instanceName}`)
//     ? JSON.parse(Cookies.get(`selectedTimeRange-${instanceName}`))
//     : calculateShiftATimeRange();

//   const initialQuickRange = Cookies.get(`activeQuickRange-${instanceName}`) || 'Shift A';
//   const initialRefreshRate = Cookies.get(`selectedRefreshRate-${instanceName}`) || 'Off';

//   const [selectedTimeRange, setSelectedTimeRange] = useState(initialTimeRange);
//   const [selectedRefreshRate, setSelectedRefreshRate] = useState(initialRefreshRate);
//   const [quickRangeLabel, setQuickRangeLabel] = useState(initialQuickRange);
//   const [inputWidth, setInputWidth] = useState('');

//   const { isBreadcrumbVisible } = useBreadcrumb(true);
//   const dropdownRef = useRef(null);

//   const toggleAutoRefreshDropdown = () => setIsAutoRefreshDropdownOpen(!isAutoRefreshDropdownOpen);
//   const toggleTimestamps = () => setIsTimestampsOpen(!isTimestampsOpen);

//   const handleTimeRangeApply = (timeRange, quickRange) => {
//     setSelectedTimeRange(timeRange);
//     setQuickRangeLabel(quickRange || formatTimeRange(timeRange));

//     // Save to cookies for the specific instance
//     Cookies.set(`selectedTimeRange-${instanceName}`, JSON.stringify(timeRange));
//     Cookies.set(`activeQuickRange-${instanceName}`, quickRange || '');

//     onTimeRangeApply?.(timeRange);
//     setIsTimestampsOpen(false);
//   };

//   const formatTimeRange = (timeRange) => {
//     if (!timeRange?.from || !timeRange?.to) return '';
//     return `From ${new Date(timeRange.from).toLocaleString()} To ${new Date(timeRange.to).toLocaleString()}`;
//   };

//   // Load saved refresh rate on mount
//   useEffect(() => {
//     const savedRefreshRate = Cookies.get(`selectedRefreshRate-${instanceName}`);
//     if (savedRefreshRate) {
//       setSelectedRefreshRate(savedRefreshRate);
//     }
//   }, [instanceName]);

//   // Handle refresh rate changes
//   const handleRefreshRateChange = (rate) => {
//     setSelectedRefreshRate(rate);
//     Cookies.set(`selectedRefreshRate-${instanceName}`, rate);
//     setIsAutoRefreshDropdownOpen(false);
//   };

//   // Initialize the display value on component mount
//   useEffect(() => {
//     // Check if there's a saved time range
//     const hasStoredTimeRange = Cookies.get(`selectedTimeRange-${instanceName}`);
//     const hasStoredQuickRange = Cookies.get(`activeQuickRange-${instanceName}`);

//     if (!hasStoredTimeRange || !hasStoredQuickRange) {
//       // No stored values, set Shift A as default
//       const shiftATimeRange = calculateShiftATimeRange();

//       // Save default values to cookies
//       Cookies.set(`selectedTimeRange-${instanceName}`, JSON.stringify(shiftATimeRange));
//       Cookies.set(`activeQuickRange-${instanceName}`, "Shift A");
//       Cookies.set(`timeSelectionType-${instanceName}`, 'quick');

//       setSelectedTimeRange(shiftATimeRange);
//       setQuickRangeLabel("Shift A");

//       // Apply the time range
//       onTimeRangeApply?.(shiftATimeRange);
//     } else {
//       // Load stored values
//       const savedTimeRange = JSON.parse(hasStoredTimeRange);
//       const savedQuickRange = hasStoredQuickRange;

//       setSelectedTimeRange(savedTimeRange);
//       if (savedQuickRange && savedQuickRange !== '') {
//         setQuickRangeLabel(savedQuickRange);
//       } else {
//         setQuickRangeLabel(formatTimeRange(savedTimeRange));
//       }
//     }
//   }, [instanceName]);

//   const handleRefresh = () => {
//     const now = new Date();
//     let newFrom;

//     // Check if the current quickRangeLabel is a shift
//     if (['Shift A', 'Shift B', 'Shift C'].includes(quickRangeLabel)) {
//       // For shifts, we don't change the time range on refresh
//       return;
//     }

//     // Define the time ranges in minutes
//     const timeRanges = new Map([
//       ['Last 5 minutes', 5],
//       ['Last 15 minutes', 15],
//       ['Last 30 minutes', 30],
//       ['Last 1 hour', 60],
//       ['Last 3 hours', 3 * 60],
//       ['Last 6 hours', 6 * 60],
//       ['Last 12 hours', 12 * 60],
//       ['Last 24 hours', 24 * 60],
//       ['Last 2 days', 2 * 24 * 60]
//     ]);

//     if (timeRanges.has(quickRangeLabel)) {
//       const minutes = timeRanges.get(quickRangeLabel);
//       newFrom = new Date(now.getTime() - minutes * 60 * 1000);
//     } else {
//       newFrom = new Date(selectedTimeRange.from);
//     }

//     const updatedTimeRange = { from: newFrom.toISOString(), to: now.toISOString() };
//     setSelectedTimeRange(updatedTimeRange);
//     onTimeRangeApply?.(updatedTimeRange);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsAutoRefreshDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     // Apply initial time range with a delay
//     const timeoutId = setTimeout(() => {
//       // If no stored time range, use Shift A
//       if (!Cookies.get(`selectedTimeRange-${instanceName}`)) {
//         const shiftATimeRange = calculateShiftATimeRange();
//         onTimeRangeApply?.(shiftATimeRange);
//       } else {
//         onTimeRangeApply?.(selectedTimeRange);
//       }
//     }, 1000);
//     return () => clearTimeout(timeoutId);
//   }, []);

//   // Adjust input width based on label
//   useEffect(() => {
//     const label = quickRangeLabel || selectedTimeRange;
//     setInputWidth(label.length < 20 ? 'w-32' : 'w-48');
//   }, [quickRangeLabel, selectedTimeRange]);

//   useEffect(() => {
//     if (selectedRefreshRate === 'Now') {
//       handleRefresh();
//     } else if (selectedRefreshRate !== 'Off') {
//       const intervalTime = getIntervalTime(selectedRefreshRate);
//       const interval = setInterval(() => {
//         handleRefresh();
//       }, intervalTime);

//       return () => clearInterval(interval);
//     }
//   }, [selectedRefreshRate, quickRangeLabel]);

//   useEffect(() => {
//     Cookies.set(`selectedRefreshRate-${instanceName}`, selectedRefreshRate);
//   }, [selectedRefreshRate]);

//   const getIntervalTime = (rate) => {
//     switch (rate) {
//       case '5 sec': return 5000;
//       case '10 sec': return 10000;
//       case '30 sec': return 30000;
//       case '1 min': return 60000;
//       case '5 min': return 5 * 60000;
//       case '15 min': return 15 * 60000;
//       case '30 min': return 30 * 60000;
//       case '1 hour': return 60 * 60000;
//       case '2 hour': return 2 * 60 * 60000;
//       case '1 day': return 24 * 60 * 60000;
//       default: return null;
//     }
//   };

//   return (
//     <>
//       {isBreadcrumbVisible && (
//         <div className={`flex justify-between items-center p-1 shadow-md relative ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//           <div className="flex items-center pl-4 text-sm">
//             <nav className="text-gray-600" aria-label="breadcrumb ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}">
//               <ol className="inline-flex items-center md:space-x-1">
//                 <li>
//                   <div className={`inline-flex items-center text-gray-600 hover:text-blue-600 ${isDarkMode ? ' text-white' : 'text-gray-800'}`}>
//                     <FaHome className="mr-2" />
//                     Home
//                   </div>
//                 </li>
//                 <li>
//                   <span className={`mx-1 text-gray-400 ${isDarkMode ? ' text-white' : 'text-gray-800'}`}>/</span>
//                   <span className={`text-gray-600 hover:text-blue-600 ${isDarkMode ? ' text-white' : 'text-gray-800'}`}>{instanceName || 'Dashboard '}</span>
//                 </li>
//               </ol>
//             </nav>
//           </div>

//           <div className="flex items-center  text-sm">
//             <div className="relative flex items-center gap-2">
//               <div className={`"text-black ${isDarkMode ? ' text-white ' : 'text-gray-800'}`}>Last Updated on: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A'}</div>
//               <div className={`flex items-center bg-gray-50 border p-1 rounded-md cursor-pointer ${isDarkMode ? ' text-white bg-gray-600 border border-black ' : 'text-gray-800'}`}>
//                 <input
//                   type="text"
//                   value={quickRangeLabel || formatTimeRange(selectedTimeRange)}
//                   className={`bg-transparent border-none focus:outline-none text-gray-600 ${inputWidth} ${isDarkMode ? ' text-white ' : 'text-gray-800'} `}
//                   readOnly
//                   onClick={() => setIsTimestampsOpen(true)}
//                   placeholder="Select time range"
//                 />
//                 <RiArrowDropDownLine
//                   onClick={toggleTimestamps}
//                   className={`text-gray-600 cursor-pointer text-2xl transition-transform ${isTimestampsOpen ? 'rotate-180' : 'rotate-0'}`}
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <button onClick={toggleAutoRefreshDropdown} className={`text-gray-600 shadow border text-[12px] items-center justify-center flex rounded min-w-10   p-1.5 gap-2 ${isDarkMode ? ' text-white bg-gray-600 border border-black ' : 'text-gray-800'}`}>
//                   {selectedRefreshRate}

//                 </button>
//                 <button onClick={handleRefresh} className={`text-[14px] text-gray-600 w-10 flex items-center justify-center rounded border    p-2 gap-2 ${isDarkMode ? ' text-white bg-gray-600 border border-black ' : 'text-gray-800'}`}><IoIosRefresh /></button>
//               </div>
//             </div>

//             {isAutoRefreshDropdownOpen && (
//               <div ref={dropdownRef} style={{ position: "absolute", zIndex: 1000 }} className={`absolute z-10 right-2 top-12 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5  ${isDarkMode ? ' text-white bg-gray-600 border border-black ' : 'text-gray-800'}`}>
//                 <div className={`p-2 ${isDarkMode ? ' text-white bg-gray-800' : 'text-gray-800'}`}>
//                   {['Off', '5 sec', '10 sec', '30 sec', '1 min', '5 min', '15 min', '30 min', '1 hour', '2 hour', '1 day'].map((interval) => (
//                     <button
//                       key={interval}
//                       onClick={() => handleRefreshRateChange(interval)}
//                       className={`w-full px-4 py-2 text-sm text-left transition-colors duration-200 ease-in-out ${isDarkMode ? ' text-white ' : 'text-gray-800'} ${selectedRefreshRate === interval ? 'bg-sky-500 rounded shadow-md text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
//                     >
//                       {interval}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {isTimestampsOpen && (
//             <Timestamp
//               onClose={() => setIsTimestampsOpen(false)}
//               onTimeRangeApply={handleTimeRangeApply}
//               initialTimeRange={selectedTimeRange}
//               instanceName={instanceName}
//             />
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default RuntimeBreadcrumb;