import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaHome, FaSave } from 'react-icons/fa';
import { TbClockPlay } from 'react-icons/tb';
import Timestamp from './Timestamps';
import { useBreadcrumb } from '../../Components/Context/BreadcrumbProvider';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useTheme } from '../../Components/Context/ThemeContext';
const Breadcrumb = ({ instanceName, onTimeRangeApply, onSave }) => {
  const [isTimestampsOpen, setIsTimestampsOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('');
  const [quickRangeLabel, setQuickRangeLabel] = useState('');
  const [isQuickRange, setIsQuickRange] = useState(false);
  const { isBreadcrumbVisible } = useBreadcrumb(false);
  const { isDarkMode, toggleTheme } = useTheme();
  // Toggles for various elements
  const toggleTimestamps = () => setIsTimestampsOpen(!isTimestampsOpen);
  const toggleSearchExpansion = () => setIsSearchExpanded(!isSearchExpanded);
  const toggleAutoRefresh = () => setAutoRefresh(!autoRefresh);
  useEffect(() => {
    if (quickRangeLabel) {
      setSelectedTimeRange(quickRangeLabel);
    }
  }, [quickRangeLabel]);
  // Handle applying time range from the Timestamp component
  const handleTimeRangeApply = (selectedTime, quickRangeLabel) => {
    if (quickRangeLabel) {
      setQuickRangeLabel(quickRangeLabel);
      setSelectedTimeRange(quickRangeLabel);
      setIsQuickRange(true);
    } else {
      const formattedTimeRange = formatTimeRange(selectedTime);
      setSelectedTimeRange(formattedTimeRange);
      setQuickRangeLabel('');
      setIsQuickRange(false);
    }
    setIsTimestampsOpen(false);
    if (onTimeRangeApply) {
      onTimeRangeApply(selectedTime);
    }
  };

  const formatTimeRange = (timeRange) => {
    if (typeof timeRange === 'object' && timeRange !== null) {
      const { from, to } = timeRange;
      return `From ${new Date(from).toLocaleString()} To ${new Date(to).toLocaleString()}`;
    }
    return 'Last 5 minutes';
  };

  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}/`;
    }
    return '';
  };

  const BASE_URL = getBaseUrl();

  const formatDateTime = (date) => {
    if (!date) return '';
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <> 
    
    


     {isBreadcrumbVisible ? (
    <div className={`flex justify-between items-center p-2 shadow-md relative text-[12px] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
    <div className="flex items-center pl-4">
      <nav className="text-gray-600" aria-label="breadcrumb ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}">
        <ol className="inline-flex items-center md:space-x-1">
          <li>
            <Link href="/landingpage" className={`inline-flex items-center text-gray-600 hover:text-blue-600 ${isDarkMode ? ' text-white' : 'text-gray-800'}`}>
              <FaHome className="mr-2" />
              Home
            </Link>
        
            </li>
        
            <li>
                  <span className={`mx-1 text-gray-400 ${isDarkMode ? ' text-white' : 'text-gray-800'}`}>/</span>
                  <Link href={`/dashboarddesign/${instanceName}`} className={`text-gray-600 hover:text-blue-600 ${isDarkMode ? ' text-white' : 'text-gray-800'}`}>
                    Dashboards
                  </Link>
                </li>
          
            <li>
              <div className="flex items-center">
             
             
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 mr-2">
        <div className="relative flex items-center space-x-2">
        <div className={`flex items-center bg-gray-50 border p-1 rounded-md cursor-pointer ${isDarkMode ? ' text-white bg-gray-600 border border-black ' : 'text-gray-800'}`}>
            
            <input
              type="text"
              value={selectedTimeRange}
              className={`bg-transparent border-none focus:outline-none text-gray-600  ${isDarkMode ? ' text-white ' : 'text-gray-800'} `}
              readOnly
              onClick={() => setIsTimestampsOpen(true)}
              placeholder="Select time range"
            />
            <RiArrowDropDownLine onClick={toggleTimestamps} className={`text-gray-600 cursor-pointer text-2xl ${isDarkMode ? ' text-white ' : 'text-gray-800'}`} />
          </div>
 
          <div className="flex items-center ml-2 gap-4">
            {/* <FaSearch className="text-gray-600 cursor-pointer" onClick={toggleSearchExpansion} title="Search" /> */}
            <button
              className={`text-gray-600 text-2xl transform transition-transform duration-300 ${isDarkMode ? ' text-white ' : 'text-gray-800'}`}
              onClick={toggleAutoRefresh}
              title={autoRefresh ? 'Auto Refresh On' : 'Auto Refresh Off'}
            >
              {/* Auto-refresh icon here */}
            </button>
          </div>
          <div >
            <button onClick={onSave} className={`p-2 text-gray-600 rounded-full hover:bg-green-400 shadow-lg hover:scale-105 ${isDarkMode ? ' text-white ' : 'text-gray-800'}hover:bg-green-400`}>
              <FaSave className='text-[16px] ' />
            </button>
          </div>
        </div>
      </div>

      {/* Timestamp Selector */}
      {isTimestampsOpen && (
        <Timestamp
          onClose={() => setIsTimestampsOpen(false)}
          onTimeRangeApply={handleTimeRangeApply}
        />
      )}
    </div>
        ) : null}
         </>
  );
};

export default Breadcrumb;



// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import { FaHome, FaSave } from 'react-icons/fa';
// import { TbClockPlay } from 'react-icons/tb';
// import Timestamp from './Timestamps';

// const Breadcrumb = ({ instanceName, onTimeRangeApply, onSave }) => {
//   const [isTimestampsOpen, setIsTimestampsOpen] = useState(false);
//   const [selectedTimeRange, setSelectedTimeRange] = useState("Last 5 minutes");
//   const [quickRangeLabel, setQuickRangeLabel] = useState('');
//   const [isQuickRange, setIsQuickRange] = useState(false);
//   const [timeRangeDisplay, setTimeRangeDisplay] = useState({ from: null, to: null });

//   const toggleTimestamps = () => setIsTimestampsOpen(!isTimestampsOpen);

//   useEffect(() => {
//     if (quickRangeLabel) {
//       setSelectedTimeRange(quickRangeLabel);
//     }
//   }, [quickRangeLabel]);

//   const handleTimeRangeApply = (selectedTime, quickRangeLabel) => {
//     if (quickRangeLabel) {
//       setQuickRangeLabel(quickRangeLabel);
//       setSelectedTimeRange(quickRangeLabel);
//       setIsQuickRange(true);
//       setTimeRangeDisplay({ from: null, to: null }); // Reset time range display for quick ranges
//     } else {
//       const formattedTimeRange = formatTimeRange(selectedTime);
//       setSelectedTimeRange(formattedTimeRange);
//       setQuickRangeLabel('');
//       setIsQuickRange(false);
//       setTimeRangeDisplay({
//         from: new Date(selectedTime.from),
//         to: new Date(selectedTime.to)
//       });
//     }
//     setIsTimestampsOpen(false);
//     if (onTimeRangeApply) {
//       onTimeRangeApply(selectedTime);
//     }
//   };

//   const formatTimeRange = (timeRange) => {
//     if (typeof timeRange === 'object' && timeRange !== null) {
//       const { from, to } = timeRange;
//       return `From ${new Date(from).toLocaleString()} To ${new Date(to).toLocaleString()}`;
//     }
//     return 'Last 5 minutes';
//   };

//   const getBaseUrl = () => {
//     if (typeof window !== 'undefined') {
//       return `${window.location.protocol}//${window.location.host}/`;
//     }
//     return '';
//   };

//   const BASE_URL = getBaseUrl();

//   const formatDateTime = (date) => {
//     if (!date) return '';
//     return date.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit'
//     });
//   };

//   return (
//     <div className="flex justify-between items-center bg-white p-1 shadow-sm border-b border-gray-100 relative">
//       {/* Left side - Breadcrumb */}
//       <div className="flex items-center">
//         <nav className="flex" aria-label="breadcrumb">
//           <ol className="flex items-center space-x-2">
//             <li className="flex items-center">
//               <Link
//                 href={`${BASE_URL}dashboard/landingpage`}
//                 className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
//                 title="Home"
//               >
//                 <FaHome className="w-4 h-4" />
//                 <span className="ml-1 text-sm font-medium">Home</span>
//               </Link>
//             </li>
//             <li className="flex items-center text-gray-400">/</li>
//             <li className="flex items-center">
//               <Link
//                 href={`/dashboarddesign/${instanceName}`}
//                 className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
//                 title="Dashboards"
//               >
//                 Dashboards
//               </Link>
//             </li>
//             <li className="flex items-center text-gray-400">/</li>
//             <li>
//               <span className="text-gray-800 text-sm font-medium">{instanceName || 'My Dashboard'}</span>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* Right side - Controls */}
//       <div className="flex items-center space-x-2">
//         {/* Time Range Display */}
//         <div className="hidden lg:flex items-center text-gray-500 text-sm">
//           {isQuickRange ? (
//             <span className="font-medium">{quickRangeLabel}</span>
//           ) : (
//             timeRangeDisplay.from && timeRangeDisplay.to && (
//               <div className="flex items-center space-x-2">
//                 <span className="font-medium">From:</span>
//                 <span>{formatDateTime(timeRangeDisplay.from)}</span>
//                 <span className="font-medium">To:</span>
//                 <span>{formatDateTime(timeRangeDisplay.to)}</span>
//               </div>
//             )
//           )}
//         </div>

//         {/* Controls Group */}
//         <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
//           {/* Time Range Selector */}
//           <button
//             onClick={toggleTimestamps}
//             className="flex items-center justify-center w-8 h-8 rounded-md bg-white text-gray-600 shadow-sm border hover:text-blue-600 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
//             title="Select Time Range"
//           >
//             <TbClockPlay className="w-5 h-5" />
//           </button>

//           {/* Save Button */}
//           <button
//             onClick={onSave}
//             className="flex items-center justify-center w-8 h-8 rounded-md bg-white text-gray-600 shadow-sm border hover:text-blue-600 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
//             title="Save Dashboard"
//           >
//             <FaSave className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Timestamp Selector */}
//       {isTimestampsOpen && (
//         <Timestamp
//           onClose={() => setIsTimestampsOpen(false)}
//           onTimeRangeApply={handleTimeRangeApply}
//         />
//       )}
//     </div>
//   );
// };

// export default Breadcrumb;
