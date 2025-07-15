/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import { useState, useEffect } from "react";
// import { FaEdit, FaSave, FaTrash, FaPlus } from "react-icons/fa";

// // Importing the JSON data
// import data from '../../../sample.json';
// import AddUser from '../../Components/Adduser/Adduser';  
// import AddTrigger from '../../Components/AddTriger/AddTrigger'; 

// const NotificationTable = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [selectedAlert, setSelectedAlert] = useState(null);
//   const [addedNotifications, setAddedNotifications] = useState([]);
//   const [editingNotificationId, setEditingNotificationId] = useState(null); 
//   const [editingAlertId, setEditingAlertId] = useState(null); 
//   const [editingUserId, setEditingUserId] = useState(null); 
//   const [isAddUserOpen, setIsAddUserOpen] = useState(false); 
//   const [isAddTriggerOpen, setIsAddTriggerOpen] = useState(false); 

//   useEffect(() => {
//     if (data) {
//       const initialNotification = {
//         id: 1,
//         instanceId: data.instanceId,
//         instanceName: data.instanceName,
//         status: data.configuration.enable ? "Active" : "Inactive",
//         description: data.description,
//       };

//       setNotifications([initialNotification]);
//       setAddedNotifications([initialNotification]);

//       setAlerts([
//         {
//           id: 1,
//           alertName: "Line 4 Main Power Off",
//           enabled: data.configuration.alarmTrigger.lin4main_noloadON.enabled,
//           targetInstanceId: data.configuration.alarmTrigger.lin4main_noloadON.instanceId,
//           alarmType: data.configuration.alarmTrigger.lin4main_noloadON.alarmTypeId,
//           condition: data.configuration.alarmTrigger.lin4main_noloadON.condition,
//         },
//       ]);

//       setUsers(
//         data.configuration.alarmTrigger.lin4main_noloadON.users.map((user, index) => ({
//           id: index + 1,
//           name: user.name,
//           timeZone: user.timezoneId,
//           location: user.location,
//           role: user.role,
//           email: user.emailId,
//           mobile: user.mobileNo,
//           smsAlert: data.configuration.alarmTrigger.lin4main_noloadON.sms.enabled,
//           emailAlert: data.configuration.alarmTrigger.lin4main_noloadON.email.enabled,
//         }))
//       );
//     }
//   }, []);

//   const handleNotificationSelect = (notification) => {
//     setSelectedNotification(notification);
//     setSelectedAlert(null); // Reset selected alert when a new notification is selected
//   };

//   const handleAlertSelect = (alert) => {
//     setSelectedAlert(alert);
//   };

//   // Handle editing for notifications
//   const handleEditNotification = (id) => {
//     setEditingNotificationId(id);
//   };

//   const handleSaveNotification = (id) => {
//     setEditingNotificationId(null); 
//   };

//   // Handle editing for alerts
//   const handleEditAlert = (id) => {
//     setEditingAlertId(id);
//   };

//   const handleSaveAlert = (id) => {
//     setEditingAlertId(null);
//   };

//   // Handle editing for users
//   const handleEditUser = (id) => {
//     setEditingUserId(id);
//   };

//   const handleSaveUser = (id) => {
//     setEditingUserId(null);
//   };

//   // Open Add User Component
//   const openAddUser = () => {
//     setIsAddUserOpen(true);
//   };

//   // Open Add Trigger Component
//   const openAddTrigger = () => {
//     setIsAddTriggerOpen(true);
//   };

//   return (
//     <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
//       {/* Notification Object Table */}
//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transform transition-all hover:shadow-xl">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Object</h2>
//         </div>
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gradient-to-r from-sky-500 to-purple-600 text-white">
//               <th className="p-2 text-left">No.</th>
//               <th className="p-2 text-left">Instance ID</th>
//               <th className="p-2 text-left">Instance Name</th>
//               <th className="p-2 text-left">Status</th>
//               <th className="p-2 text-left">Description</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {addedNotifications.map((item, index) => (
//               <tr
//                 key={item.id}
//                 className="hover:bg-gray-50 transition-colors cursor-pointer"
//                 onClick={() => handleNotificationSelect(item)}
//               >
//                 <td className="p-2 border">{index + 1}</td>
//                 <td className="p-2 border">
//                   {editingNotificationId === item.id ? (
//                     <input
//                       type="text"
//                       value={item.instanceId}
//                       onChange={(e) => {
//                         const updatedNotifications = [...addedNotifications];
//                         updatedNotifications[index].instanceId = e.target.value;
//                         setAddedNotifications(updatedNotifications);
//                       }}
//                     />
//                   ) : (
//                     item.instanceId
//                   )}
//                 </td>
//                 <td className="p-2 border">
//                   {editingNotificationId === item.id ? (
//                     <input
//                       type="text"
//                       value={item.instanceName}
//                       onChange={(e) => {
//                         const updatedNotifications = [...addedNotifications];
//                         updatedNotifications[index].instanceName = e.target.value;
//                         setAddedNotifications(updatedNotifications);
//                       }}
//                     />
//                   ) : (
//                     item.instanceName
//                   )}
//                 </td>
//                 <td className="p-2 border">
//                   {editingNotificationId === item.id ? (
//                     <select
//                       value={item.status}
//                       onChange={(e) => {
//                         const updatedNotifications = [...addedNotifications];
//                         updatedNotifications[index].status = e.target.value;
//                         setAddedNotifications(updatedNotifications);
//                       }}
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                     </select>
//                   ) : (
//                     <span
//                       className={`px-2 py-1 rounded-full text-sm ${
//                         item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   )}
//                 </td>
//                 <td className="p-2 border">
//                   {editingNotificationId === item.id ? (
//                     <textarea
//                       value={item.description}
//                       onChange={(e) => {
//                         const updatedNotifications = [...addedNotifications];
//                         updatedNotifications[index].description = e.target.value;
//                         setAddedNotifications(updatedNotifications);
//                       }}
//                     />
//                   ) : (
//                     item.description
//                   )}
//                 </td>
//                 <td className="p-2 border">
//                   <div className="flex">
//                     {editingNotificationId === item.id ? (
//                       <FaSave
//                         className="text-green-500 cursor-pointer hover:text-green-700 m-1"
//                         onClick={() => handleSaveNotification(item.id)}
//                       />
//                     ) : (
//                       <FaEdit
//                         className="text-blue-500 cursor-pointer hover:text-blue-700 m-1"
//                         onClick={() => handleEditNotification(item.id)}
//                       />
//                     )}
//                     <FaTrash className="text-red-500 cursor-pointer hover:text-red-700 m-1" />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Alert Trigger Table - Conditionally Rendered */}
//       {selectedNotification && (
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transform transition-all hover:shadow-xl">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-gray-800 p-2">Alert Trigger</h2>
//             <button className="p-2 bg-sky-500 text-white rounded-md w-24 text-sm" onClick={openAddTrigger}>
//               Add Trigger
//             </button>
//           </div>
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gradient-to-r from-sky-500 to-purple-600 text-white">
//                 <th className="p-2 text-left">No.</th>
//                 <th className="p-2 text-left">Alert Name</th>
//                 <th className="p-2 text-left">Enable/Disable</th>
//                 <th className="p-2 text-left">Target Instance ID</th>
//                 <th className="p-2 text-left">Alarm Type ID</th>
//                 <th className="p-2 text-left">Condition</th>
//                 <th className="p-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {alerts.map((alert, index) => (
//                 <tr
//                   key={alert.id}
//                   className="hover:bg-gray-50 transition-colors cursor-pointer"
//                   onClick={() => handleAlertSelect(alert)}
//                 >
//                   <td className="p-2 border">{index + 1}</td>
//                   <td className="p-2 border">
//                     {editingAlertId === alert.id ? (
//                       <input
//                         type="text"
//                         value={alert.alertName}
//                         onChange={(e) => {
//                           const updatedAlerts = [...alerts];
//                           updatedAlerts[index].alertName = e.target.value;
//                           setAlerts(updatedAlerts);
//                         }}
//                       />
//                     ) : (
//                       alert.alertName
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {editingAlertId === alert.id ? (
//                       <select
//                         value={alert.enabled}
//                         onChange={(e) => {
//                           const updatedAlerts = [...alerts];
//                           updatedAlerts[index].enabled = e.target.value === "true";
//                           setAlerts(updatedAlerts);
//                         }}
//                       >
//                         <option value="true">Enabled</option>
//                         <option value="false">Disabled</option>
//                       </select>
//                     ) : (
//                       <span
//                         className={`px-2 py-1 rounded-full text-sm ${
//                           alert.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {alert.enabled ? "Enabled" : "Disabled"}
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {editingAlertId === alert.id ? (
//                       <input
//                         type="text"
//                         value={alert.targetInstanceId}
//                         onChange={(e) => {
//                           const updatedAlerts = [...alerts];
//                           updatedAlerts[index].targetInstanceId = e.target.value;
//                           setAlerts(updatedAlerts);
//                         }}
//                       />
//                     ) : (
//                       alert.targetInstanceId
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {editingAlertId === alert.id ? (
//                       <input
//                         type="text"
//                         value={alert.alarmType}
//                         onChange={(e) => {
//                           const updatedAlerts = [...alerts];
//                           updatedAlerts[index].alarmType = e.target.value;
//                           setAlerts(updatedAlerts);
//                         }}
//                       />
//                     ) : (
//                       alert.alarmType
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {editingAlertId === alert.id ? (
//                       <input
//                         type="text"
//                         value={alert.condition}
//                         onChange={(e) => {
//                           const updatedAlerts = [...alerts];
//                           updatedAlerts[index].condition = e.target.value;
//                           setAlerts(updatedAlerts);
//                         }}
//                       />
//                     ) : (
//                       alert.condition
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     <div className="flex">
//                       {/* {editingAlertId === alert.id ? (
//                         <FaSave
//                           className="text-green-500 cursor-pointer hover:text-green-700 m-1"
//                           onClick={() => handleSaveAlert(alert.id)}
//                         />
//                       ) : (
//                         <FaEdit
//                           className="text-blue-500 cursor-pointer hover:text-blue-700 m-1"
//                           onClick={() => handleEditAlert(alert.id)}
//                         />
//                       )} */}
//                       <FaTrash className="text-red-500 cursor-pointer hover:text-red-700 m-1" />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Users Table - Conditionally Rendered */}
//       {selectedAlert && (
//         <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:shadow-xl">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-gray-800 p-2">Users</h2>
//             <button className="p-2 bg-sky-500 text-white rounded-md w-24 text-sm" onClick={openAddUser}>
//               Add User
//             </button>
//           </div>
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gradient-to-r from-sky-500 to-purple-600 text-white">
//                 <th className="p-2 text-left">No.</th>
//                 <th className="p-2 text-left">Name</th>
//                 <th className="p-2 text-left">Time Zone</th>
//                 <th className="p-2 text-left">Location</th>
//                 <th className="p-2 text-left">Role</th>
//                 <th className="p-2 text-left">Email</th>
//                 <th className="p-2 text-left">Mobile</th>
//                 <th className="p-2 text-left">SMS Alert</th>
//                 <th className="p-2 text-left">Email Alert</th>
//                 <th className="p-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="p-2 border">{index + 1}</td>
//                   <td className="p-2 border">
//                     {editingUserId === user.id ? (
//                       <input
//                         type="text"
//                         value={user.name}
//                         onChange={(e) => {
//                           const updatedUsers = [...users];
//                           updatedUsers[index].name = e.target.value;
//                           setUsers(updatedUsers);
//                         }}
//                       />
//                     ) : (
//                       user.name
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {editingUserId === user.id ? (
//                       <input
//                         type="text"
//                         value={user.timeZone}
//                         onChange={(e) => {
//                           const updatedUsers = [...users];
//                           updatedUsers[index].timeZone = e.target.value;
//                           setUsers(updatedUsers);
//                         }}
//                       />
//                     ) : (
//                       user.timeZone
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {editingUserId === user.id ? (
//                       <input
//                         type="text"
//                         value={user.location}
//                         onChange={(e) => {
//                           const updatedUsers = [...users];
//                           updatedUsers[index].location = e.target.value;
//                           setUsers(updatedUsers);
//                         }}
//                       />
//                     ) : (
//                       user.location
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {editingUserId === user.id ? (
//                       <input
//                         type="text"
//                         value={user.role}
//                         onChange={(e) => {
//                           const updatedUsers = [...users];
//                           updatedUsers[index].role = e.target.value;
//                           setUsers(updatedUsers);
//                         }}
//                       />
//                     ) : (
//                       user.role
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {editingUserId === user.id ? (
//                       <input
//                         type="text"
//                         value={user.email}
//                         onChange={(e) => {
//                           const updatedUsers = [...users];
//                           updatedUsers[index].email = e.target.value;
//                           setUsers(updatedUsers);
//                         }}
//                       />
//                     ) : (
//                       user.email
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     {editingUserId === user.id ? (
//                       <input
//                         type="text"
//                         value={user.mobile}
//                         onChange={(e) => {
//                           const updatedUsers = [...users];
//                           updatedUsers[index].mobile = e.target.value;
//                           setUsers(updatedUsers);
//                         }}
//                       />
//                     ) : (
//                       user.mobile
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     <span
//                       className={`px-2 py-1 rounded-full text-sm ${
//                         user.smsAlert ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                          {user.smsAlert ? "✔" : "✘"}
//                          </span>
//                   </td>
//                   <td className="p-2 border">
//                     <span
//                       className={`px-2 py-1 rounded-full text-sm ${
//                         user.emailAlert ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {user.emailAlert ? "✔" : "✘"}
//                     </span>
//                   </td>
//                   <td className="p-2 border">
//                     <div className="flex">
//                     {editingAlertId === alert.id ? (
//                         <FaSave
//                           className="text-green-500 cursor-pointer hover:text-green-700 m-1"
//                           onClick={() => handleSaveAlert(alert.id)}
//                         />
//                       ) : (
//                         <FaEdit
//                           className="text-blue-500 cursor-pointer hover:text-blue-700 m-1"
//                           onClick={() => handleEditAlert(alert.id)}
//                         />
//                       )}
//                       <FaTrash className="text-red-500 cursor-pointer hover:text-red-700 m-1" />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Render AddUser Component */}
//       {isAddUserOpen && <AddUser close={() => setIsAddUserOpen(false)} />}
      
//       {/* Render AddTrigger Component */}
//       {isAddTriggerOpen && <AddTrigger close={() => setIsAddTriggerOpen(false)} />}
//     </div>
//   );
// };

// export default NotificationTable;
"use client";
// import { useState, useEffect } from "react";
// import NotificationObjectTable from "../../Components/Alert/NotificationObjectTable";
// import AlertTriggerTable from "../../Components/Alert/AlertTriggerTable";
// import UsersTable from "../../Components/Alert/UsersTable";
// import AddUser from '../../Components/Adduser/Adduser';  
// import AddTrigger from '../../Components/AddTriger/AddTrigger'; 
// import data from '../../../sample.json';

// const NotificationTable = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [selectedAlert, setSelectedAlert] = useState(null);
//   const [isAddUserOpen, setIsAddUserOpen] = useState(false); 
//   const [isAddTriggerOpen, setIsAddTriggerOpen] = useState(false); 

//   useEffect(() => {
//     if (data) {
//       const initialNotification = {
//         id: 1,
//         instanceId: data.instanceId,
//         instanceName: data.instanceName,
//         status: data.configuration.enable ? "Active" : "Inactive",
//         description: data.description,
//       };

//       setNotifications([initialNotification]);

//       setAlerts([
//         {
//           id: 1,
//           alertName: "Line 4 Main Power Off",
//           enabled: data.configuration.alarmTrigger.lin4main_noloadON.enabled,
//           targetInstanceId: data.configuration.alarmTrigger.lin4main_noloadON.instanceId,
//           alarmType: data.configuration.alarmTrigger.lin4main_noloadON.alarmTypeId,
//           condition: data.configuration.alarmTrigger.lin4main_noloadON.condition,
//         },
//       ]);

//       setUsers(
//         data.configuration.alarmTrigger.lin4main_noloadON.users.map((user, index) => ({
//           id: index + 1,
//           name: user.name,
//           timeZone: user.timezoneId,
//           location: user.location,
//           role: user.role,
//           email: user.emailId,
//           mobile: user.mobileNo,
//           smsAlert: data.configuration.alarmTrigger.lin4main_noloadON.sms.enabled,
//           emailAlert: data.configuration.alarmTrigger.lin4main_noloadON.email.enabled,
//         }))
//       );
//     }
//   }, []);

//   const handleNotificationSelect = (notification) => {
//     setSelectedNotification(notification);
//     setSelectedAlert(null);
//   };

//   const handleAlertSelect = (alert) => {
//     setSelectedAlert(alert);
//   };

//   const openAddUser = () => {
//     setIsAddUserOpen(true);
//   };

//   const openAddTrigger = () => {
//     setIsAddTriggerOpen(true);
//   };

//   return (
//     <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
//       <NotificationObjectTable 
//         notifications={notifications} 
//         onSelect={handleNotificationSelect} 
//       />
//       {selectedNotification && (
//         <AlertTriggerTable 
//           alerts={alerts} 
//           onSelect={handleAlertSelect} 
//           onAddTrigger={openAddTrigger} 
//         />
//       )}

//       {selectedAlert && (
//         <UsersTable 
//           users={users} 
//           onAddUser={openAddUser} 
//         />
//       )}
//       {isAddUserOpen && <AddUser close={() => setIsAddUserOpen(false)} />}
//       {isAddTriggerOpen && <AddTrigger close={() => setIsAddTriggerOpen(false)} />}
//     </div>
//   );
// };

// export default NotificationTable;

"use client";
import { useState, useEffect } from "react";
import NotificationObjectTable from "../../../Components/Alert/NotificationObjectTable";
import AlertTriggerTable from "../../../Components/Alert/AlertTriggerTable";
import UsersTable from "../../../Components/Alert/UsersTable";
import AddUser from '../../../Components/Adduser/Adduser';  
import AddTrigger from '../../../Components/AddTriger/AddTrigger'; 
import data from '../../../../sample.json';

const NotificationTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false); 
  const [isAddTriggerOpen, setIsAddTriggerOpen] = useState(false); 

  // Define alert names
  const alertNames = [
    "line6shrinking_Idle", "line6main_IdleON", "line4Shrinking_IdleON", "line4main_IdleOn", 
    "line6shrinking_noloadON", "line4Shrinking_noloadON", "line6main_noloadON", "lin4main_noloadON"
  ];

  useEffect(() => {
    if (data) {
      const initialNotification = {
        id: 1,
        instanceId: data.instanceId,
        instanceName: data.instanceName,
        status: data.configuration.enable ? "Active" : "Inactive",
        description: data.description,
      };

      setNotifications([initialNotification]);

      // Create alerts dynamically based on alert names
      const alertsData = alertNames.map((alertName, index) => ({
        id: index + 1,
        alertName,
        enabled: data.configuration.alarmTrigger[alertName]?.enabled || false,
        targetInstanceId: data.configuration.alarmTrigger[alertName]?.instanceId || "",
        alarmType: data.configuration.alarmTrigger[alertName]?.alarmTypeId || "",
        condition: data.configuration.alarmTrigger[alertName]?.condition || "",
      }));

      setAlerts(alertsData);
    }
  }, [data]);

  // Fetch users when an alert is selected
  useEffect(() => {
    if (selectedAlert) {
      const selectedAlertUsers = data.configuration.alarmTrigger[selectedAlert]?.users || [];
      setUsers(
        selectedAlertUsers.map((user, index) => ({
          id: index + 1,
          name: user.name,
          timeZone: user.timezoneId,
          location: user.location,
          role: user.role,
          email: user.emailId,
          mobile: user.mobileNo,
          smsAlert: data.configuration.alarmTrigger[selectedAlert]?.sms?.enabled || false,
          emailAlert: data.configuration.alarmTrigger[selectedAlert]?.email?.enabled || false,
        }))
      );
    }
  }, [selectedAlert]);

  const handleNotificationSelect = (notification) => {
    setSelectedNotification(notification);
    setSelectedAlert(null); // Reset selected alert when a new notification is selected
  };

  const handleAlertSelect = (alert) => {
    setSelectedAlert(alert.alertName);  // Store the alert name when an alert is selected
  };

  const openAddUser = () => {
    setIsAddUserOpen(true);
  };

  const openAddTrigger = () => {
    setIsAddTriggerOpen(true);
  };

  const handleUpdateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-50 to-green-50 h-screen w-full overflow-scroll ">
      <NotificationObjectTable 
        notifications={notifications} 
        onSelect={handleNotificationSelect} 
      />
      
      {selectedNotification && (
        <>
          <AlertTriggerTable 
            alerts={alerts} 
            selectedAlert={selectedAlert} 
            onSelect={handleAlertSelect} 
            onAddTrigger={openAddTrigger} 
          />
          
          {selectedAlert && (
            <UsersTable 
              users={users} 
              isLoading={false} 
              onAddUser={openAddUser} 
            />
          )}
        </>
      )}

      {isAddUserOpen && <AddUser close={() => setIsAddUserOpen(false)} />}
      {isAddTriggerOpen && <AddTrigger close={() => setIsAddTriggerOpen(false)} />}
    </div>
  );
};

export default NotificationTable;
