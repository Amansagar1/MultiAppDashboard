import React from "react";

const StatisticsTable = ({ statistics }) => {
  return (
    <div className="mt-2 w-full h-[250px] overflow-auto">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {statistics.reduce((rows, stat, i) => {
            if (i % 2 === 0) {
              rows.push(statistics.slice(i, i + 2));
            }
            return rows;
          }, []).map((row, rowIndex) => (
            <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
              {row.map((stat, colIndex) => (
                <React.Fragment key={colIndex}>
                  <td className="px-2 py-1 border text-gray-700 text-xs">{stat.label}</td>
                  <td className="px-2 py-1 border text-gray-900 font-semibold text-xs ">{stat.value}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;
