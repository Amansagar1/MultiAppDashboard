import { useState } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

const AlertTriggerTable = ({ alerts, selectedAlert, onSelect, onAddTrigger, onUpdateAlert }) => {
  // Local state to manage the alerts
  const [localAlerts, setLocalAlerts] = useState(alerts);
  const [editingAlertId, setEditingAlertId] = useState(null);
  const [editAlertData, setEditAlertData] = useState(null); // To hold the edited alert data

  // Handle start of editing
  const handleEditAlert = (alert) => {
    setEditingAlertId(alert.id);
    setEditAlertData({ ...alert }); // Copy the alert data to edit
  };

  // Handle saving the edited alert
  const handleSaveAlert = () => {
    // Update the localAlerts array with the edited data
    if (editAlertData) {
      const updatedAlerts = localAlerts.map((alert) =>
        alert.id === editAlertData.id ? editAlertData : alert
      );
      setLocalAlerts(updatedAlerts); // Save the updated alert locally
    }

    // Optionally, propagate the updated data to the parent component if needed
    if (onUpdateAlert && editAlertData) {
      onUpdateAlert(editAlertData); // You can call a prop to handle backend or other updates
    }

    setEditingAlertId(null); // Exit editing mode
    setEditAlertData(null); // Clear the editing data
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setEditingAlertId(null);
    setEditAlertData(null); // Reset edit data if canceling
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditAlertData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-2 transform transition-all hover:shadow-xl w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 p-2">Alert Trigger</h2>
        <button className="p-2 bg-green-500 text-white rounded-md w-24 text-sm" onClick={onAddTrigger}>
          Add Trigger
        </button>
      </div>
      <div className="w-full h-[200px] flex overflow-scroll">
        <table className="w-full border-collapse p-2">
          <thead>
            <tr className="bg-gradient-to-r from-black to-green-500 text-white">
              <th className="p-1 text-left">No.</th>
              <th className="p-1 text-left">Alert Name</th>
              <th className="p-1 text-left">Enable/Disable</th>
              <th className="p-1 text-left">Target Instance ID</th>
              <th className="p-1 text-left">Alarm Type ID</th>
              <th className="p-1 text-left">Condition</th>
              <th className="p-1 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localAlerts.map((alert, index) => (
              <tr
                key={alert.id}
                className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedAlert === alert.alertName ? "bg-green-100" : "hover:bg-green-200"}`}
                onClick={() => onSelect(alert)}
              >
                <td className="p-1 border">{index + 1}</td>
                <td className="p-1 border">
                  {editingAlertId === alert.id ? (
                    <input
                      className="bg-gray-200 rounded-md text-center p-2"
                      type="text"
                      value={editAlertData.alertName}
                      onChange={(e) => handleInputChange("alertName", e.target.value)}
                    />
                  ) : (
                    alert.alertName
                  )}
                </td>
                <td className="p-1 border">
                  {editingAlertId === alert.id ? (
                    <select
                      className="bg-gray-200 rounded-md text-center p-2"
                      value={editAlertData.enabled}
                      onChange={(e) => handleInputChange("enabled", e.target.value === "true")}
                    >
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${alert.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {alert.enabled ? "Enabled" : "Disabled"}
                    </span>
                  )}
                </td>
                <td className="p-1 border">
                  {editingAlertId === alert.id ? (
                    <input
                      className="bg-gray-200 rounded-md text-center p-2"
                      type="text"
                      value={editAlertData.targetInstanceId}
                      onChange={(e) => handleInputChange("targetInstanceId", e.target.value)}
                    />
                  ) : (
                    alert.targetInstanceId
                  )}
                </td>
                <td className="p-1 border">
                  {editingAlertId === alert.id ? (
                    <input
                      className="bg-gray-200 rounded-md text-center p-2"
                      type="text"
                      value={editAlertData.alarmType}
                      onChange={(e) => handleInputChange("alarmType", e.target.value)}
                    />
                  ) : (
                    alert.alarmType
                  )}
                </td>
                <td className="p-1 border">
                  {editingAlertId === alert.id ? (
                    <input
                      className="bg-gray-200 rounded-md text-center p-2"
                      type="text"
                      value={editAlertData.condition}
                      onChange={(e) => handleInputChange("condition", e.target.value)}
                    />
                  ) : (
                    alert.condition
                  )}
                </td>
                <td className="p-1 border">
                  <div className="flex">
                    {editingAlertId === alert.id ? (
                      <>
                        <FaSave
                          className="text-green-500 cursor-pointer hover:text-green-700 m-1"
                          onClick={handleSaveAlert}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer hover:text-red-700 m-1"
                          onClick={handleCancelEdit}
                        />
                      </>
                    ) : (
                      <FaEdit
                        className="text-blue-500 cursor-pointer hover:text-blue-700 m-1"
                        onClick={() => handleEditAlert(alert)}
                      />
                    )}
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

export default AlertTriggerTable;
