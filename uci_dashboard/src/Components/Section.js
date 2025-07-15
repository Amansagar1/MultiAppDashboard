// import React from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import Card from "./Card";

// const Section = ({ section, expandedSections, toggleSectionDetails, loading }) => {
//   const loadingContent = (
//     <div className="flex flex-col gap-2">
//       <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
//       <div className="w-1/3 h-4 bg-gray-200 rounded animate-pulse" />
//       <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse" />
//     </div>
//   );

//   return (
//     <div key={section.title} className="rounded  ">
//       <div className="flex items-center justify-between gap-4 p-1 bg-[#75D4C6] rounded-md mb-0.5 border">
//         <h2 className="text-[18px] font-bold text-gray-800 flex gap-2 items-center">
//           {section.title}
//         </h2>
        
//         {/* Displaying loading or actual data */}
//         {loading ? (
//           loadingContent
//         ) : (
//           <>
//             <h2 className="text-[18px] font-bold text-gray-800">
//               Total Production Quantity: <span>{section.totalProductionQuantity || 200}</span>
//             </h2>
//             <h2 className="text-[18px] font-bold text-gray-800">
//               Run Hour: <span>{section.runHour || 0}</span>
//             </h2>
//             <h2 className="text-[18px] font-bold text-gray-800">
//               Downtime: <span>{section.downtime || 0}</span>
//             </h2>
//             <h2 className="text-[18px] font-bold text-gray-800">
//               OEE: <span>{section.oee || 95}%</span>
//             </h2>
//             <h2 className="text-[18px] font-bold text-gray-800">
//               Last Updated On: <span>{new Date(section.timeStamp).toLocaleString() || "N/A"}</span>
//             </h2>
//           </>
//         )}

//         <button onClick={() => toggleSectionDetails(section.title)} className="text-black">
//           {expandedSections[section.title] ? <FaChevronUp /> : <FaChevronDown />}
//         </button>
//       </div>

//       <div className={`grid gap-6 ${section.title === "GRA" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4" : section.title === "GCS" ? "grid-cols-1 sm:grid-cols-3" : section.title === "SPC" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
//         {section.cards.map((card, cardIndex) => (
//           <Card key={cardIndex} card={card} expanded={expandedSections[section.title]} section={section} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Section;



// import React, { useEffect, useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import Card from "./Card";
// import { getPerformanceIndex } from "../webServices/UCIAPIController";

// const Section = ({ section, expandedSections, toggleSectionDetails, loading }) => {

//   const [kpiData, setKpiData] = useState({
//     oee: 0,
//     availability: 0,
//     downTime: 0,
//     quality: 0,
//     performance: 0,
//   });
//   const [sectionLoading, setSectionLoading] = useState(true);
//     // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     // const timezone = "America/Chicago";
//     // const from = "2025-04-12 08:00";
//     // const to = "2025-04-12 17:00";
    
//     const from = process.env.NEXT_PUBLIC_PERFORMANCE_FROM;
//     const to = process.env.NEXT_PUBLIC_PERFORMANCE_TO;
//     const timezone = process.env.NEXT_PUBLIC_PERFORMANCE_TIMEZONE;
    
//   const AssetName = section.title;
//   useEffect(() => {
//     const fetchKpiData = async () => {
//       try {
//         setSectionLoading(true);
//         const data = await getPerformanceIndex(AssetName, from, to,timezone);
//         setKpiData(data);
//         setSectionLoading(false);
//         console.log(`✅ ${AssetName} KPI Data:`, data);
//       } catch (error) {
//         console.error(`❌ Failed to fetch KPI for ${AssetName}:`, error);
//         setSectionLoading(false);
//       }
//     };

//     fetchKpiData();
//   }, [AssetName]);

//   const getGridClass = (title) => {
//     switch (title) {
//       case "GRA":
//         return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4";
//       case "GCS":
//         return "grid-cols-1 sm:grid-cols-2";
//         case "SPC":
//           return "grid-cols-1 sm:grid-cols-2";
//       default:
//         return "grid-cols-1";
//     }
//   };

//   let robotIndexOffset = 0;

//   const loadingContent = (
//     <div className="flex flex-col gap-2">
//       <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
//       <div className="w-1/3 h-4 bg-gray-200 rounded animate-pulse" />
//       <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse" />
//     </div>
//   );

//   return (
//     <div key={section.title} className="rounded">


//       {/* Header */}
//       <div className="flex items-center justify-between gap-4 p-1 bg-green-300 rounded-md mb-0.5 border w-full">
//         <h2 className="text-[18px] font-bold text-gray-800 flex gap-2 items-center">
//           {section.title}
//         </h2>

//         {loading ? (
//           loadingContent
//         ) : (
//           <>
//            <div className="flex  gap-4">
//            <h2 className="text-[18px] font-bold text-gray-800">
//               Last Updated On:{" "}
//               <span>{section.timeStamp ? new Date(section.timeStamp).toLocaleString() : "N/A"}</span>
//             </h2>
//             <button onClick={() => toggleSectionDetails(section.title)} className="text-black">
//           {expandedSections[section.title] ? <FaChevronUp /> : <FaChevronDown />}
//         </button>
//            </div>
//           </>
//         )}

      
//       </div>

//       {/* KPI Metrics */}
//       {/* {sectionLoading ? (
//         <div className="grid grid-cols-5 gap-4 my-4">
//           {[...Array(5)].map((_, idx) => (
//             <div key={idx} className="h-16 bg-gray-200 animate-pulse rounded-md" />
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 my-4">
//           {[
//             {
//               title: "Overall OEE",
//               value: `${(kpiData.oee || 0).toFixed(2)}%`,
//               up: kpiData.oee >= 75,
//             },
//             // {
//             //   title: "Production",
//             //   value: `${kpiData.production || "N/A"}%`,
//             //   up: kpiData.production > 0,
//             // },
//             {
//               title: "Downtime",
//               value: `${kpiData.downTime ?? 0} Hrs`,
//               up: kpiData.downTime <= 10,
//             },
         
//             {
//               title: "Quality",
//               value: `${(kpiData.quality || 0).toFixed(2)}%`,
//               up: kpiData.quality >= 90,
//             },
//             {
//               title: "Performance",
//               value: `${(kpiData.performance || 0).toFixed(2)}%`,
//               up: kpiData.performance >= 85,
//             },
//             {
//               title: "Availability",
//               value: `${kpiData.availability || "N/A"}% `,
//               up: kpiData.availability > 0,
//             },
           
//           ].map((metric, idx) => (
//             <div
//               key={idx}
//               className="border-l-4 p-3 rounded shadow-md border bg-white"
//               style={{ borderColor: metric.up ? "#22c55e" : "#22c55e" }}
//             >
//               <p className="text-sm text-gray-600">{metric.title}</p>
//               <p className="text-lg font-semibold text-gray-900 mt-1">{metric.value}</p>
//             </div>
//           ))}
//         </div>
//       )} */}

//       {/* Cards */}
//       <div className={`grid gap-6 ${getGridClass(section.title)}`}>
//         {section.cards.map((card, cardIndex) => {
//           const cardComponent = (
//             <Card
//               key={cardIndex}
//               card={card}
//               expanded={expandedSections[section.title]}
//               section={section}
//               robotIndexOffset={robotIndexOffset}
//               timeStamp={section.timeStamp }
//             />
//           );
//           robotIndexOffset += card.robotCount;
//           return cardComponent;
//         })}
//       </div>
//     </div>
//   );
// };

// export default Section;
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Card from "./Card";

const Section = ({ section, expandedSections, toggleSectionDetails, loading }) => {

  const getGridClass = (title) => {
    switch (title) {
      case "GRA":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4";
      case "GCS":
        return "grid-cols-1 sm:grid-cols-2";
      // case "SPC":
      //   return "grid-cols-1 sm:grid-cols-2";  
      default:
        return "grid-cols-1";
    }
  };

  let robotIndexOffset = 0;

  const loadingContent = (
    <div className="flex flex-col gap-2">
      <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-1/3 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse" />
    </div>
  );

  // Log the section and its cards for debugging
  console.log("Section Data: ", section);
  console.log("Section Cards: ", section.cards);

  return (
    <div key={section.title} className="rounded">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-1 bg-green-300 rounded-md mb-0.5 border w-full">
        <h2 className="text-[14px] font-bold text-gray-800 flex gap-2 items-center">
          {section.title}
        </h2>

        {loading ? (
          loadingContent
        ) : (
          <>
            <div className="flex gap-4">
              {/* <h2 className="text-[18px] font-bold text-gray-800">
                Last Updated On:{" "}
                <span>{section.timeStamp ? new Date(section.timeStamp).toLocaleString() : "N/A"}</span>
              </h2> */}
              <button onClick={() => toggleSectionDetails(section.title)} className="text-black text-[14px]">
                {expandedSections[section.title] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Cards */}
      <div className={`grid gap-6 ${getGridClass(section.title)}`}>
        {section.cards && section.cards.length > 0 ? (
          section.cards.map((card, cardIndex) => {
            const cardComponent = (
              <Card
                key={cardIndex}
                card={card}
                expanded={expandedSections[section.title]}
                section={section}
                robotIndexOffset={robotIndexOffset}
                timeStamp={section.timeStamp}
              />
            );
            robotIndexOffset += card.robotCount;
            return cardComponent;
          })
        ) : (
          <div className="text-center text-gray-500">No cards available</div>
        )}
      </div>
    </div>
  );
};

export default Section;
