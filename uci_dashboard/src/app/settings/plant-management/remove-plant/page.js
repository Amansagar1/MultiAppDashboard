import React from 'react';

const PlantManagementPage = () => {
  return (
    <div className="bg-gray-100 p-6 h-[85vh] overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Search Form */}
        <div className="bg-white p-6 shadow-md rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">
            Search Plants
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Plant Name */}
            <div>
              <label htmlFor="plantName" className="block text-gray-700">
                Enter Plant
              </label>
              <input
                type="text"
                id="plantName"
                placeholder="Enter Plant Name"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Plant Location */}
            <div>
              <label htmlFor="plantLocation" className="block text-gray-700">
                Enter Plant Location
              </label>
              <input
                type="text"
                id="plantLocation"
                placeholder="Enter Plant Location"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Created Date */}
            <div>
              <label htmlFor="createdDate" className="block text-gray-700">
                Created Date
              </label>
              <input
                type="date"
                id="createdDate"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
          <div className="mt-4 flex justify-end">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400">
              Search
            </button>
          </div>
        </div>

        {/* Manage Plants Table */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">
            Manage Plants
          </h2>
          <table className="w-full table-auto border-collapse border border-gray-300 text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">S. No.</th>
                <th className="border border-gray-300 px-4 py-2">Plant Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Plant Location
                </th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Contact No</th>
                <th className="border border-gray-300 px-4 py-2">Edit</th>
                <th className="border border-gray-300 px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Pune Unit 1</td>
                <td className="border border-gray-300 px-4 py-2">
                  Plot No. 173, PCNTDA, Pune
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  9958705999
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  unit1pune@ucpilot.in
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    ✏️
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="text-red-500 hover:text-red-700">
                    🗑️
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">2</td>
                <td className="border border-gray-300 px-4 py-2">USA Unit 1</td>
                <td className="border border-gray-300 px-4 py-2">Texas, USA</td>
                <td className="border border-gray-300 px-4 py-2">222222</td>
                <td className="border border-gray-300 px-4 py-2">
                  texas@ucpilot.in
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    ✏️
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="text-red-500 hover:text-red-700">
                    🗑️
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">3</td>
                <td className="border border-gray-300 px-4 py-2">UCPL-MUMBAI</td>
                <td className="border border-gray-300 px-4 py-2">Mumbai</td>
                <td className="border border-gray-300 px-4 py-2">
                  9993067969
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  singhpratap143it@gmail.com
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    ✏️
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="text-red-500 hover:text-red-700">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlantManagementPage;
