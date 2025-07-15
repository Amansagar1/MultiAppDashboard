import React from "react";

const HourglassLoader = () => (
  <div className="flex justify-center items-center py-6">
    <div className="loader-hourglass"></div>
    <style jsx>{`
      .loader-hourglass {
        width: 30px;
        height: 30px;
        border: 4px solid transparent;
        border-top: 4px solid #22c55e;
        border-bottom: 4px solid #22c55e;
        border-radius: 50%;
        animation: hourglassSpin 1s linear infinite;
      }
      @keyframes hourglassSpin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

const KPICard = ({ title, value, color = "green" }) => (
  <div className={`bg-white border-l-4 p-2 rounded-lg shadow-md border-${color}-500 transition-all hover:shadow-lg`}>
    <p className="text-xs font-medium  text-gray-600">{title}</p>
    <p className="text-md font-bold text-gray-900">{value}</p>
  </div>
);



const KPISection = ({ kpiData, loadingKPI }) => {
  return (
    <div className="mb-2 ">
      {loadingKPI ? (
        <HourglassLoader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 ">
               <KPICard
              title="OEE Month"
              value={`${(kpiData.monthly_OEE || 0).toFixed(2)}%`}

            />
            <KPICard
              title="OEE Day"
              value={`${(kpiData.oee || 0).toFixed(2)}%`}
 
            />
            <KPICard
              title="Prev Day OEE"
              value={`${(kpiData.previous_OEE || 0).toFixed(2)}%`}
 
            />
         
            <KPICard
              title="Downtime"
              value={`${kpiData.downtime} `}
             
            />
              <KPICard
              title="Quality"
              value={`${(kpiData.quality || 0).toFixed(2)}%`}
       
            />
            <KPICard
              title="Availability"
              value={`${(kpiData.availability || 0).toFixed(2)}%`}

            />
          
          </div>

          {/* Replaced table section with your new table */}
          <div className="mb-2 mt-2 bg-white rounded-md shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    {Object.keys(kpiData.productionSummary).map((key, idx) => {
                      const formattedKey = key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase())
                        .replace(/Prod/g, 'Production')
                        .replace(/Nok/g, 'NOK');

                      return (
                        <th
                          className="px-1 py-2 text-xs font-medium text-left"
                          key={idx}
                        >
                          {formattedKey}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    {Object.values(kpiData.productionSummary).map((val, idx) => (
                      <td className="px-4 py-3 text-sm text-gray-900" key={idx}>
                        {val.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KPISection;
