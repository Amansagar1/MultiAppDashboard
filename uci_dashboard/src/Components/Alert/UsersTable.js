/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import NotificationSettingsPopup from "../Email-SMS/Settings"; // Import the popup component
import moment from "moment-timezone"; // Add this to handle time zone conversion

const UsersTable = ({ users, onAddUser, isLoading }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [emailError, setEmailError] = useState(null); 
  const [mobileError, setMobileError] = useState(null); 
  const [timeZoneOptions, setTimeZoneOptions] = useState([]);

  useEffect(() => {
    const timezones = moment.tz.names(); // Using moment-timezone to fetch timezone names
    setTimeZoneOptions(timezones);
  }, []);

  const handleClosePopup = () => {
    console.log("Popup Closed");
    setShowPopup(false);
    setIsPopupOpen(false);
  };

  const handleEditUser = (id) => {
    setEditingUserId(id);
  };

  const handleSaveUser = (id) => {
    // Validate email and mobile before saving
    const user = users.find((u) => u.id === id);
    if (!validateEmail(user.email) || !validateMobile(user.mobile)) {
      return; // Do not save if there are validation errors
    }
    setEditingUserId(null);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    // Update the users list after deletion
  };

  const handleRowClick = (id) => {
    setActiveUserId(id); // Set the clicked row as active
  };

  const handleDoubleClick = (user) => {
    setSelectedUser(user); // Set the selected user data
    setShowPopup(true);
    setIsPopupOpen(true); // Show the popup
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/; // Adjust to your mobile validation requirements
    if (!mobileRegex.test(mobile)) {
      setMobileError("Invalid mobile number");
      return false;
    }
    setMobileError(null);
    return true;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4  transform transition-all hover:shadow-xl w-full h-[300px] ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 p-2">Users</h2>
        <button className="p-2 bg-green-500 text-white rounded-md w-24 text-sm" onClick={onAddUser}>
          Add User
        </button>
      </div>
      <div className="w-full h-[200px] flex overflow-scroll">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full border-collapse p-2">
            <thead>
              <tr className="bg-gradient-to-r from-black to-green-500 text-white">
                <th className="p-1 text-left">No.</th>
                <th className="p-1 text-left">Name</th>
                <th className="p-1 text-left">Time Zone</th>
                <th className="p-1 text-left">Location</th>
                <th className="p-1 text-left">Role</th>
                <th className="p-1 text-left">Email</th>
                <th className="p-1 text-left">Mobile</th>
                <th className="p-1 text-left">SMS Alert</th>
                <th className="p-1 text-left">Email Alert</th>
                <th className="p-1 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`transition-all cursor-pointer ${activeUserId === user.id ? "bg-green-100" : "hover:bg-green200"}`}
                  onClick={() => handleRowClick(user.id)}
                  onDoubleClick={() => handleDoubleClick(user)}
                >
                  <td className="p-1 border">{index + 1}</td>
                  <td className="p-1 border">
                    {editingUserId === user.id ? (
                      <input
                        className="bg-gray-200 rounded-md text-center p-2"
                        type="text"
                        value={user.name}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="p-1 border">
                    {editingUserId === user.id ? (
                      <select
                        className="bg-gray-200 rounded-md text-center p-2"
                        value={user.timeZone}
                        onChange={(e) => user.timeZone = e.target.value} // Update time zone
                      >
                        {timeZoneOptions.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        ))}
                      </select>
                    ) : (
                      user.timeZone
                    )}
                  </td>
                  <td className="p-1 border">
                    {editingUserId === user.id ? (
                      <input
                        className="bg-gray-200 rounded-md text-center p-2"
                        type="text"
                        value={user.location}
                      />
                    ) : (
                      user.location
                    )}
                  </td>
                  <td className="p-1 border">
                    {editingUserId === user.id ? (
                      <input
                        className="bg-gray-200 rounded-md text-center p-2"
                        type="text"
                        value={user.role}
                      />
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="p-1 border">
                    {editingUserId === user.id ? (
                      <input
                        className="bg-gray-200 rounded-md text-center p-2"
                        type="text"
                        value={user.email}
                        onBlur={() => validateEmail(user.email)} // Validate email on blur
                      />
                    ) : (
                      user.email
                    )}
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>} {/* Display error */}
                  </td>
                  <td className="p-1 border">
                    {editingUserId === user.id ? (
                      <input
                        className="bg-gray-200 rounded-md text-center p-2"
                        type="text"
                        value={user.mobile}
                        onBlur={() => validateMobile(user.mobile)} // Validate mobile on blur
                      />
                    ) : (
                      user.mobile
                    )}
                    {mobileError && <p className="text-red-500 text-sm">{mobileError}</p>} {/* Display error */}
                  </td>
                  <td className="p-1 border">
                    {editingUserId === user.id ? (
                      <input type="checkbox" checked={user.smsAlert} />
                    ) : (
                      user.smsAlert ? "✔" : "✘"
                    )}
                  </td>
                  <td className="p-1 border">
                    {editingUserId === user.id ? (
                      <input
                        className="bg-gray-200 rounded-md text-center p-2"
                        type="checkbox"
                        checked={user.emailAlert}
                      />
                    ) : (
                      user.emailAlert ? "✔" : "✘"
                    )}
                  </td>
                  <td className="p-1 border">
                    {editingUserId === user.id ? (
                      <button
                        className="p-1 bg-sky-500 text-white rounded-md"
                        onClick={() => handleSaveUser(user.id)}
                      >
                        <FaSave />
                      </button>
                    ) : (
                      <>
                        <button
                          className="p-1 text-sky-500 rounded-md mr-2"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="p-1 text-red-500 rounded-md"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Popup for user data */}
      {showPopup && selectedUser && (

 
            <NotificationSettingsPopup
              user={selectedUser}
              setShowPopup={setShowPopup}
              handleClose={handleClosePopup}
            />

      )}
    </div>
  );
};

export default UsersTable;
