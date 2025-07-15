"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const AddTrigger = ({ close }) => {
  const [formData, setFormData] = useState({
    alertName: "",
    isEnabled: true,
    targetInstanceId: "",
    alarmTypeId: "",
    condition: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Trigger
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Alert Name
            </label>
            <input
              type="text"
              name="alertName"
              value={formData.alertName}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
              placeholder="Enter alert name"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-600">
              Enable/Disable
            </label>
            <div className="relative flex items-center">
              <input
                type="checkbox"
                name="isEnabled"
                checked={formData.isEnabled}
                onChange={handleChange}
                className="hidden"
                id="enableSwitch"
              />
              <label
                htmlFor="enableSwitch"
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
                  formData.isEnabled ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform duration-200 ${
                    formData.isEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Target Instance ID
            </label>
            <input
              type="text"
              name="targetInstanceId"
              value={formData.targetInstanceId}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
              placeholder="Enter target instance ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Alarm Type ID
            </label>
            <input
              type="text"
              name="alarmTypeId"
              value={formData.alarmTypeId}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
              placeholder="Enter alarm type ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Condition
            </label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
              placeholder="Enter condition"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <motion.button
              type="button"
              onClick={close}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 focus:outline-none transition-all"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 focus:outline-none transition-all"
            >
              Save
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTrigger;
