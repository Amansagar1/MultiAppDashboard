
// import React from "react";
// import Image from "next/image";
// import { FaBell } from "react-icons/fa";
// import robot from "./Assets/robot.png";
// import StatisticsTable from "./StatisticsTable";

// const Card = ({ card, expanded, section }) => {
//   const getRobotName = (sectionTitle, index) => {
//     const prefix = sectionTitle === "GRA" ? "R" : sectionTitle === "GCS" ? "R" : "R";
//     return `${prefix}${index + 1}`;
//   };

//   return (
//     <div className="bg-[#ECF6EF] border rounded-lg overflow-hidden w-full ">
//       <div className={`bg-gray-700 text-white p-2 flex justify-between items-center ${card.robotStatus.some((status) => status === 0) ? "border-t-8 border-red-600" : card.robotStatus.some((status) => status === 1) ? "border-t-8 border-green-500" : "border-t-8 border-gray-700"}`}>
//         <h3 className="text-sm font-bold">{card.heading}</h3>
//         <p className="text-b font-bold text-white mb-2">{card.status}</p>
//         <button>
//           <FaBell />
//         </button>
//       </div>
//       <div className="p-4">
//         <div className="flex w-full justify-between items-center">
//           <div className="flex flex-col items-center space-y-2 mb-1">
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-600 w-20">Robot Sys:</span>
//               <div className={`w-5 h-5 ${card.robot_system_status.red ? "bg-red-500" : card.robot_system_status.green ? "bg-green-600" : "bg-gray-400"} rounded-full`} />
//             </div>
//             <div className="flex items-center space-x-2 w-full">
//               <span className="text-sm text-gray-600 w-[88px]">All Sys:</span>
//               <div className={`w-5 h-5 ${card.all_robot_system_status.red ? "bg-red-500" : card.all_robot_system_status.green ? "bg-green-600" : "bg-gray-400"} rounded-full`} />
//             </div>
//           </div>

//           <div className="flex flex-wrap">
//             {/* Render robot images based on robotCount */}
//             {[...Array(card.robotCount)].map((_, index) => (
//               <button key={index} className="flex flex-col items-center">
//                 <Image
//                   src={robot}
//                   alt={`robot ${getRobotName(section.title, index)}`}
//                   width={30}
//                   height={30}
//                   className={`${
//                     card.robotStatus[index] === 0
//                       ? "filter grayscale"
//                       : "filter hue-rotate-90"
//                   }`}
//                 />
//                 <span className="text-sm text-center">{getRobotName(section.title, index)}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//         {expanded && <StatisticsTable statistics={card.statistics} />}
//       </div>
//     </div>
//   );
// };

// export default Card;
import React from "react";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import robot from "./Assets/robot.png";
import StatisticsTable from "./StatisticsTable";

const Card = ({ card, expanded, section, timeStamp, robotIndexOffset = 0 }) => {
  const getRobotName = (index) => {
    const prefix = "R";
    return `${prefix}${robotIndexOffset + index + 1}`;
  };

  const getRobotStatus = (robotNumber) => {
    const readyKey = `R${robotNumber}_RDY`;
    const alarmKey = `R${robotNumber}_ALRM`;

    const readyStat = card.statistics.find(stat =>
      stat.label === `Robot ${robotNumber} Ready` || stat.label === readyKey
    );
    const alarmStat = card.statistics.find(stat =>
      stat.label === `Robot ${robotNumber} Alarm` || stat.label === alarmKey
    );

    if (alarmStat?.value === 1) return "alarm";
    if (readyStat?.value === 1) return "ready";
    return "inactive";
  };

  const robotDescriptions = {
    GRA: [
      "Robot-1: Loads sheets from the input trolley to the laser machine and unloads skeletons to the scrap bin.",
      "Robot-2: Unloads cut parts from the laser machine to the input conveyor.",
      "Robot-3: Moves parts from the input conveyor to the centering table.",
      "Robot-4: Loads centered parts to the press machine and unloads them to the vision trolley.",
      "Robot-5: Transfers parts from the vision trolley to either the mirror fixture, Pin Placing Fixture-1, or Fixture-2.",
      "Robot-6: Loads pins from Hopper-1 to Fixture-1.",
      "Robot-7: Loads pins from Hopper-2 to Fixture-2.",
      "Robot-8: Picks parts from Fixture-1 or Fixture-2 and loads them to Pin Press Machine-1 or Machine-2.",
      "Robot-9: Picks assembled parts from Pin Press Machine-1 or Machine-2 and places them into Packaging Trolley-1 or Trolley-2.",
    ],
    GCS: [
      "Robot-1: Loads sheets from the input trolley to the laser machine and unloads skeletons to the scrap bin.",
      "Robot-2: Unloads cut parts from the laser machine to the input conveyor.",
      "Robot-3: Moves parts from the input conveyor to the centering table.",
      "Robot-4: Unloads centered parts, performs top bending, and loads to the top output fixture.",
      "Robot-5: Unloads centered parts, performs bottom bending, and loads to the bottom output fixture.",
      "Robot-6: Moves bending parts from both output fixtures to the welding robotic cell for assembly welding. And welded parts load to Output conveyor1 or Output conveyor2.",
    ],
  };


  return (
    <div className="bg-[#ECF6EF] border-gray-300 border rounded-lg overflow-hidden w-full relative">
      <div className={`bg-gray-700 text-white p-2 flex justify-between items-center`}>
        <h3 className="text-xs font-bold">{card.heading}</h3>
        <p className="text-xs font-semibold text-white mb-2">
          {timeStamp ? timeStamp.replace("T", " ") : "Loading..."}
        </p>

      </div>
      <div className="p-4">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col items-center space-y-2 mb-1">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 w-20">Auto Mode </span>
              <div className="relative group">
                <div
                  className={`w-5 h-5 ${card.robot_system_status.red
                    ? "bg-red-500"
                    : card.robot_system_status.green
                      ? "bg-green-600"
                      : "bg-gray-400"
                    } rounded-full cursor-help`}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full">
              <span className="text-sm text-gray-600 w-[88px]">All Sys:</span>
              <div className="relative group">
                <div
                  className={`w-5 h-5 ${card.all_robot_system_status.red
                    ? "bg-red-500"
                    : card.all_robot_system_status.green
                      ? "bg-green-600"
                      : "bg-gray-400"
                    } rounded-full cursor-help`}
                />
              </div>
            </div>


          </div>
          <div className="flex flex-wrap">
            {[...Array(card.robotCount)].map((_, index) => {
              const robotNumber = robotIndexOffset + index + 1;
              const status = getRobotStatus(robotNumber);
              const sectionKey = section.title === "GCS" ? "GCS" : "GRA";
              const tooltipText =
                robotDescriptions[sectionKey]?.[robotNumber - 1] || "No description available";

              return (
                <div key={index} className="relative group flex flex-col items-center mx-1 my-2 cursor-help">
                  <Image
                    src={robot}
                    alt={`robot ${getRobotName(index)}`}
                    width={25}
                    height={25}
                    className={
                      status === "ready"
                        ? "filter hue-rotate-90"
                        : status === "alarm"
                          ? "grayscale-[40%] brightness-110 saturate-200 hue-rotate-[-50deg]"
                          : "grayscale"
                    }
                  />
                  <span className="text-xs text-center">{getRobotName(index)}</span>

                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 right-0  w-64 text-xs text-black bg-green-200  p-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition duration-300 z-50 ">
                    {/* <strong>{section.title}</strong> */}

                    {tooltipText}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        {expanded && <StatisticsTable statistics={card.statistics} />}
      </div>
    </div>
  );
};

export default Card;
