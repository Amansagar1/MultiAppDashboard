/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import jsonData from "../../../../Data/TreeNavigation.json";
import { CiEdit } from "react-icons/ci";

const Page = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Amit",
      lastName: "Sharma",
      email: "amit.sharma@example.com",
      role: "Admin",
      username: "amitsharma",
      contact: "9876543210",
      location: "Delhi",
      alert: {
        sms: "Yes",
        email: "No"
      },
      assignedAssets: ["IN_DEL_01.Asset1", "IN_DEL_01.Asset2"],
    },
    {
      firstName: "Priya",
      lastName: "Verma",
      email: "priya.verma@example.com",
      role: "Manager",
      username: "priyaverma",
      contact: "9876543211",
      location: "Mumbai",
      alert: {
        sms: "No",
        email: "Yes"
      },
      assignedAssets: ["IN_MUM_01.Asset3"],
    },
    {
      firstName: "Rahul",
      lastName: "Singh",
      email: "rahul.singh@example.com",
      role: "Manager",
      username: "rahulsingh",
      contact: "9876543212",
      location: "Bangalore",
      alert: {
        sms: "Yes",
        email: "Yes"
      },
      assignedAssets: ["IN_BLR_01.Asset4"],
    },
    {
      firstName: "Anjali",
      lastName: "Nair",
      email: "anjali.nair@example.com",
      role: "Supervisor",
      username: "anjalinair",
      contact: "9876543213",
      location: "Kolkata",
      alert: {
        sms: "No",
        email: "No"
      },
      assignedAssets: ["IN_KOL_01.Asset5"],
    },
    {
      firstName: "Vikram",
      lastName: "Reddy",
      email: "vikram.reddy@example.com",
      role: "Technician",
      username: "vikramreddy",
      contact: "9876543214",
      location: "Hyderabad",
      alert: {
        sms: "Yes",
        email: "No"
      },
      assignedAssets: ["IN_HYD_01.Asset6"],
    }
  ]);
  

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameClick = (username) => {
    const user = users.find((user) => user.username === username);
    setSelectedUser(user);
    setSelectedAssets(user.assignedAssets || []);
    setIsEditing(false);
    setShowResetPasswordForm(false);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setShowResetPasswordForm(false);
  };

  const handleResetPasswordClick = () => {
    setShowResetPasswordForm(!showResetPasswordForm);
    setIsEditing(false);
  };

  const handleCheckboxToggle = (asset) => {
    setSelectedAssets((prev) =>
      prev.includes(asset) ? prev.filter((item) => item !== asset) : [...prev, asset]
    );
  };

  const handleNodeToggle = (node) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [node]: !prev[node],
    }));
  };

  const setAllNodesExpanded = (data, parent = "") => {
    let newExpandedNodes = {};
    Object.keys(data).forEach((key) => {
      const fullKey = parent ? `${parent}.${key}` : key;
      newExpandedNodes[fullKey] = true;
      if (typeof data[key] === "object") {
        newExpandedNodes = {
          ...newExpandedNodes,
          ...setAllNodesExpanded(data[key], fullKey),
        };
      }
    });
    return newExpandedNodes;
  };

  useEffect(() => {
    const allExpanded = setAllNodesExpanded(jsonData.Plant);
    setExpandedNodes(allExpanded);
  }, []);

  const handleSave = async () => {
    if (showResetPasswordForm) {
      // Handle Password Reset
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch("/api/resetPassword", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: selectedUser.username,
            password,
          }),
        });
        if (response.ok) {
          alert("Password reset successfully.");
          setShowResetPasswordForm(false);
          setPassword("");
          setConfirmPassword("");
        } else {
          console.error("Failed to reset password.");
        }
      } catch (error) {
        console.error(error);
      }
    } else if (isEditing) {
      // Handle Access Save
      try {
        const response = await fetch("/api/saveAccess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: selectedUser.username,
            assets: selectedAssets,
          }),
        });
        if (response.ok) {
          alert("Access permissions updated successfully.");
          setIsEditing(false);
        } else {
          console.error("Failed to save access permissions.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAlertToggle = (username, type) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === username
          ? { ...user, alert: { ...user.alert, [type]: user.alert[type] === "Yes" ? "No" : "Yes" } }
          : user
      )
    );
  };
  // const renderTree = (data, parent = "") => {
  //   return Object.keys(data).map((key) => {
  //     const fullKey = parent ? `${parent}.${key}` : key;
  //     const isExpanded = expandedNodes[fullKey];

  //     if (typeof data[key] === "object") {
  //       return (
  //         <div key={fullKey} className="ml-4">
  //           <div className="flex items-center space-x-2">
  //             <button className="text-gray-500" onClick={() => handleNodeToggle(fullKey)}>
  //               {isExpanded ? "-" : "+"}
  //             </button>
  //             {isEditing && (
  //               <input
  //                 type="checkbox"
  //                 checked={selectedAssets.some((asset) => asset.startsWith(fullKey))}
  //                 onChange={() => handleCheckboxToggle(fullKey)}
  //               />
  //             )}
  //             <span className="text-gray-700">{key}</span>
  //           </div>
  //           {isExpanded && <div className="ml-4">{renderTree(data[key], fullKey)}</div>}
  //         </div>
  //       );
  //     }

  //     return (
  //       <div key={fullKey} className="ml-4 flex items-center space-x-2">
  //         {isEditing && (
  //           <input
  //             type="checkbox"
  //             checked={selectedAssets.includes(fullKey)}
  //             onChange={() => handleCheckboxToggle(fullKey)}
  //           />
  //         )}
  //         <span className="text-gray-700">{key}</span>
  //       </div>
  //     );
  //   });
  // };

  return (
    <div className="p-4 bg-gray-100 w-full h-[82vh] overflow-scroll">
      <div className="w-full flex flex-col lg:flex-row items-center justify-center">
        <div className=" w-full bg-white p-6 rounded-lg shadow-lg mb-4 lg:mb-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Last Name</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b" >Email</th>
                <th className="py-2 px-4 border-b">Contact</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">SMS</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Alert</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.username}
                  onClick={() => handleUsernameClick(user.username)}
                  className="cursor-pointer hover:bg-green-100 transition-all duration-200 even:bg-gray-50"
                >
                  <td className="py-3 px-4 border-b">{user.firstName}</td>
                  <td className="py-3 px-4 border-b">{user.lastName}</td>
                  <td className="py-3 px-4 border-b">{user.username}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.contact}</td>
                  <td className="py-3 px-4 border-b">{user.location}</td>
                  <td className="py-3 px-4 border-b">{user.role}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <input
                      type="checkbox"
                      checked={user.alert.sms === "Yes"}
                      onChange={() => handleAlertToggle(user.username, "sms")}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <input
                      type="checkbox"
                      checked={user.alert.email === "Yes"}
                      onChange={() => handleAlertToggle(user.username, "email")}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <button onClick={(e) => { e.stopPropagation(); handleEditClick(); }}>
                      <CiEdit size={22} className="text-blue-600 hover:text-blue-800 transition-all duration-200" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>



          </table>
        </div>

        {/* <div className="lg:w-1/3 w-full lg:ml-4 bg-gray-50 p-4 rounded-lg shadow-lg">
          <h4 className="text-md font-semibold">Assign Access</h4>
          <div className="text-gray-700 h-[650px] overflow-y-scroll">
            {selectedUser ? (
              <>
                <div className="flex justify-between mb-4">
                  <h5>{`Access for ${selectedUser.username}`}</h5>

                </div>
                {showResetPasswordForm && (
                  <div className="space-y-2">
                    <input
                      type="password"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                )}
                <div>{renderTree(jsonData.Plant)}</div>
              </>
            ) : (
              <p>Select a user to view or edit access.</p>
            )}
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded w-36 "
              onClick={handleSave}
              disabled={!isEditing && !showResetPasswordForm}
            >
              Save
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded w-36"
              onClick={() => {
                setIsEditing(false);
                setShowResetPasswordForm(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded w-36"
              onClick={handleResetPasswordClick}
            >
              Reset Password
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Page;


{/* <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={
                selectedAssets.length === getAllAssets(jsonData.Plant).length
              }
              onChange={handleSelectAll}
            />
            <span className="text-gray-700">Select All</span>
          </div> */}
//   // Handle "Select All" toggle
//   const handleSelectAll = () => {
//     const allAssets = getAllAssets(jsonData.Plant);
//     setSelectedAssets((prev) =>
//       prev.length === allAssets.length ? [] : allAssets
//     );
//   };

//   // Get all asset keys recursively
//   const getAllAssets = (data, parent = "") => {
//     let assets = [];
//     Object.keys(data).forEach((key) => {
//       const fullKey = parent ? `${parent}.${key}` : key;
//       if (typeof data[key] === "object") {
//         assets = [...assets, ...getAllAssets(data[key], fullKey)];
//       } else {
//         assets.push(fullKey);
//       }
//     });
//     return assets;
//   };
