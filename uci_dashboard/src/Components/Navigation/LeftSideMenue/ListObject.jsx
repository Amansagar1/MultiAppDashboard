// const menuList = [
//   {
//     label: "Home",
//     icon: "FaHome",
//     link: "/dashboardoverview",
//   },
//   {
//     label: "Automation Line",
//     icon: "FaIndustry",
//     link: "/automationline",

//         subMenuItems: [
//           {
//             label: "GRA",
//             icon: "FaBarsStaggered",
//             link: "/automationline/gra",
//             subMenuItems: [
//               // { label: "GRA Laser", link: "/texas", icon: "FaProjectDiagram" },
//               // { label: "GRA P1", link: "/texas/gra_p1", icon: "FaProjectDiagram" },
//               // { label: "GRA P2", link: "/texas/gra_p2", icon: "FaProjectDiagram" },
//               // { label: "GRA P3", link: "/texas/gra_p3", icon: "FaProjectDiagram" }
//             ]
//           },
//           {
//             label: "GCS",
//             icon: "FaBarsStaggered",
//             link: "/automationline/gcs",
//             subMenuItems: [
//               // { label: "GCS Laser", link: "/underconstruction", icon: "TbDevicesPc" },
//               // { label: "GCS P1", link: "/underconstruction", icon: "TbDevicesPc" }
//             ]
//           },
//           {
//             label: "SPC",
//             icon: "FaBarsStaggered",
//             link: "/automationline/spc",
//             subMenuItems: [
//               // { label: "SPC Laser", link: "/underconstruction", icon: "TbDevicesPc" },
//               // { label: "SPC P1", link: "/underconstruction", icon: "TbDevicesPc" },
//               // { label: "SPC P2", link: "/underconstruction", icon: "TbDevicesPc" },
//               // { label: "SPC P3", link: "/underconstruction", icon: "TbDevicesPc" }
//             ]
//           }
//         ]

//   },
//   // {
//   //   label: "Settings",
//   //   icon: "FaCog",
//   //   subMenuItems: [
//   //     {
//   //       label: "User Management",
//   //       subMenuItems: [
//   //         { label: "Users", link: "/settings/user-management/users" },
//   //         { label: "Add User", link: "/settings/user-management/add-user" }
//   //       ]
//   //     },
//   //     // { label: "Alarm Management", link: "/underconstruction" },
//   //     // { label: "Notifications", link: "/underconstruction" },
//   //     // { label: "Access Permission", link: "/underconstruction" },
//   //     // {
//   //     //   label: "Plant Management",
//   //     //   subMenuItems: [
//   //     //     { label: "Add Plant", link: "/settings/plant-management/add-plant" },
//   //     //     { label: "Remove Plant", link: "/settings/plant-management/remove-plant" }
//   //     //   ]
//   //     // }
//   //   ]
//   // },


//   {
//     label: "Reports",
//     icon: "TbReport",
//     link: "/underconstruction",
//     subMenuItems: [
//       // {
//       //   label: "Alarms Report",
//       //   icon: "HiOutlineBellAlert",
//       //   link: "/alarms",
//       //   // subMenuItems: [
//       //   //   { label: "Users", link: "/settings/user-management/users" },
//       //   //   { label: "Add User", link: "/settings/user-management/add-user" }
//       //   // ]
//       // },

//     ]
//   },



//   // {
//   //   label: "Alerts",
//   //   icon: "RiNotification4Fill",
//   //   link: "/settings/alert",

//   //       // subMenuItems: [
//   //       //   { label: "Users", link: "/settings/user-management/users" },
//   //       //   { label: "Add User", link: "/settings/user-management/add-user" }
//   //       // ]
//   //     },
//       // { label: "Alarm Management", link: "/underconstruction" },
//       // { label: "Notifications", link: "/underconstruction" },
//       // { label: "Access Permission", link: "/underconstruction" },
//       // {
//       //   label: "Plant Management",
//       //   subMenuItems: [
//       //     { label: "Add Plant", link: "/settings/plant-management/add-plant" },
//       //     { label: "Remove Plant", link: "/settings/plant-management/remove-plant" }
//       //   ]
//       // }





// ];

// export default menuList;
const menuList = [
  {
    label: "Home",
    icon: "FaHome",
    link: "/dashboardoverview",
  },
  {
    label: "Automation Line",
    icon: "FaIndustry",
    link: "/automationline",
    subMenuItems: [
      { label: "GRA", icon: "FaBarsStaggered", link: "/automationline/gra" },
      { label: "GCS", icon: "FaBarsStaggered", link: "/automationline/gcs" },
      { label: "SPC", icon: "FaBarsStaggered", link: "/automationline/spc" }
    ],
  },
  {
    label: "Reports",
    icon: "TbReport",
    link: "/reports",
  },
];

export default menuList;
