/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useState } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

const NotificationObjectTable = ({ notifications, onSelect }) => {
  const [editingNotificationId, setEditingNotificationId] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null); // Active row state to track clicked row

  const handleEditNotification = (id) => {
    setEditingNotificationId(id);
  };

  const handleSaveNotification = (id) => {
    setEditingNotificationId(null);
  };

  const handleRowClick = (item) => {
    setActiveRowId(item.id); // Set the clicked row as active
    onSelect(item); // Pass the selected notification to the parent component
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-2 transform transition-all hover:shadow-xl w-full h-[200px]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 pb-2">Notification Object</h2>
      </div>
      <div className="w-full flex overflow-scroll">
        <table className="w-full border-collapse p-2">
          <thead>
            <tr className="bg-gradient-to-r from-black to-green-500 text-white">
              <th className="p-1 text-left">No.</th>
              <th className="p-1 text-left">Instance ID</th>
              <th className="p-1 text-left">Instance Name</th>
              <th className="p-1 text-left">Status</th>
              <th className="p-1 text-left">Description</th>
              <th className="p-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 transition-colors cursor-pointer ${activeRowId === item.id ? "bg-green-100" : "hover:bg-green-200"}`} // Apply bg-sky-400 when selected
                onClick={() => handleRowClick(item)} // Set active row when clicked
              >

               
                <td className="p-1 border">{index + 1}</td>
                <td className="p-1 border">
                  {editingNotificationId === item.id ? (
                    <input
                      className="bg-gray-200 rounded-md text-center p-2 w-full"
                      type="text"
                      value={item.instanceId}
                      onChange={(e) => {
                        const updatedNotifications = [...notifications];
                        updatedNotifications[index].instanceId = e.target.value;
                        onSelect(updatedNotifications); // Pass updated notification data
                      }}
                    />
                  ) : (
                    item.instanceId
                  )}
                </td>
                <td className="p-1 border">
                  {editingNotificationId === item.id ? (
                    <input
                      className="bg-gray-200 rounded-md text-center p-2"
                      type="text"
                      value={item.instanceName}
                      onChange={(e) => {
                        const updatedNotifications = [...notifications];
                        updatedNotifications[index].instanceName = e.target.value;
                        onSelect(updatedNotifications); // Pass updated notification data
                      }}
                    />
                  ) : (
                    item.instanceName
                  )}
                </td>
                <td className="p-1 border">
                  {editingNotificationId === item.id ? (
                    <select
                      className="bg-gray-200 rounded-md text-center p-2"
                      value={item.status}
                      onChange={(e) => {
                        const updatedNotifications = [...notifications];
                        updatedNotifications[index].status = e.target.value;
                        onSelect(updatedNotifications); // Pass updated notification data
                      }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {item.status}
                    </span>
                  )}
                </td>
                <td className="p-1 border">
                  {editingNotificationId === item.id ? (
                    <textarea
                      className="w-full bg-gray-200 rounded-md text-center"
                      value={item.description}
                      onChange={(e) => {
                        const updatedNotifications = [...notifications];
                        updatedNotifications[index].description = e.target.value;
                        onSelect(updatedNotifications); // Pass updated notification data
                      }}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td className="p-1 border">
                  <div className="flex">
                    {editingNotificationId === item.id ? (
                      <FaSave
                        className="text-green-500 cursor-pointer hover:text-green-700 m-1"
                        onClick={() => handleSaveNotification(item.id)}
                      />
                    ) : (
                      <FaEdit
                        className="text-blue-500 cursor-pointer hover:text-blue-700 m-1"
                        onClick={() => handleEditNotification(item.id)}
                      />
                    )}
                    <FaTrash className="text-red-500 cursor-pointer hover:text-red-700 m-1" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationObjectTable;
