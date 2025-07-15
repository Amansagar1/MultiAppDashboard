import React from 'react';

const AddPlantDetails = () => {
  return (
    <div className="bg-gray-100 p-4 h-[82vh] overflow-scroll w-full">
      <div className=" mx-auto bg-white p-6 shadow-md rounded-md ">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-6">
          Add Plant Details
        </h2>
        <form>
          {/* Plant Name */}
          <div className="mb-4">
            <label
              htmlFor="plantName"
              className="block text-gray-700 font-medium"
            >
              Enter Plant Name
            </label>
            <input
              type="text"
              id="plantName"
              placeholder="Enter Plant Name"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Plant Name up to 200 characters
            </p>
          </div>

          {/* Plant Location */}
          <div className="mb-4">
            <label
              htmlFor="plantLocation"
              className="block text-gray-700 font-medium"
            >
              Enter Plant Location
            </label>
            <input
              type="text"
              id="plantLocation"
              placeholder="Enter Plant Location"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">Address</p>
          </div>

          {/* Plant Email */}
          <div className="mb-4">
            <label
              htmlFor="plantEmail"
              className="block text-gray-700 font-medium"
            >
              Enter Plant Email
            </label>
            <input
              type="email"
              id="plantEmail"
              placeholder="Plant Email"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">Enter Valid Email ID</p>
          </div>

          {/* Plant Contact No */}
          <div className="mb-4">
            <label
              htmlFor="plantContact"
              className="block text-gray-700 font-medium"
            >
              Enter Plant Contact No
            </label>
            <input
              type="text"
              id="plantContact"
              placeholder="Enter Plant Contact No"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Contact No in digits only
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Add Plant Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlantDetails;
