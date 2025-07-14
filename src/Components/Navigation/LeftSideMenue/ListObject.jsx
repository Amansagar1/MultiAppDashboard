const menuList = [
  {
    label: "Dashboard",
    icon: "FaIndustry",
    link: "/",
    subMenuItems: [
      {
        label: "UCI Dashboard",
        icon: "FaBarsStaggered",
        link: "http://localhost:3002/uci/dashboardoverview",
      },
      {
     label: "Dabur Dashboard",
        icon: "FaBarsStaggered",
        link: "http://localhost:3003/dabur/home",
      },
      {
         label: "Furnace Dashboard",
        icon: "FaBarsStaggered",
        link: "http://localhost:3001/furnace/overview",
      },
      {
        label: "Patanjali Dashboard",
        icon: "FaBarsStaggered",
        link: "http://localhost:3004/patanjali/runtime",
      },

      // {
      //   label: "MWD Group",
      //   icon: "FaBarsStaggered",
      //   subMenuItems: [
      //     { label: "MWD-1", icon: "FaCogs", link: "/mwd-1" },
      //     { label: "MWD-2", icon: "FaCogs", link: "/mwd-2" },
      //     { label: "MWD-3", icon: "FaCogs", link: "/mwd-3" },
      //     { label: "MWD-4", icon: "FaCogs", link: "/mwd-4" },
      //     { label: "MWD-50", icon: "FaCogs", link: "/mwd-50" }
      //   ]
      // },
      // {
      //   label: "MM30",
      //   icon: "FaBarsStaggered",
      //   subMenuItems: [
      //     { label: "MM30-1", icon: "FaCogs", link: "/mm30-1" },
      //     { label: "MM30-2", icon: "FaCogs", link: "/mm30-2" }
      //   ]
      // },
      // {
      //   label: "M5 Series",
      //   icon: "FaBarsStaggered",
      //   subMenuItems: [
      //     { label: "M5-1", icon: "FaCogs", link: "/m5-1" },
      //     { label: "M5-2", icon: "FaCogs", link: "/m5-2" },
      //     { label: "M5-3", icon: "FaCogs", link: "/m5-3" },
      //     { label: "M5-4", icon: "FaCogs", link: "/m5-4" }
      //   ]
      // },
      // {
      //   label: "Schmidt",
      //   icon: "FaBarsStaggered",
      //   subMenuItems: [
      //     { label: "Schmidt", icon: "FaCogs", link: "/schmidt" }
      //   ]
      // },
      // {
      //   label: "EXT Group",
      //   icon: "FaBarsStaggered",
      //   subMenuItems: [
      //     { label: "EXT-1", icon: "FaCogs", link: "/ext-1" },
      //     { label: "EXT-2", icon: "FaCogs", link: "/ext-2" },
      //     { label: "EXT-3", icon: "FaCogs", link: "/ext-3" },
      //     { label: "EXT-4", icon: "FaCogs", link: "/ext-4" }
      //   ]
      // },
      // {
      //   label: "Tinning Line",
      //   icon: "FaBarsStaggered",
      //   subMenuItems: [
      //     { label: "Tinning-1", icon: "FaCogs", link: "/tinning-1" },
      //     { label: "Tinning-2", icon: "FaCogs", link: "/tinning-2" },
      //     { label: "Tinning-3", icon: "FaCogs", link: "/tinning-3" },
      //     { label: "Bus-Bar Tinning", icon: "FaCogs", link: "/busbar-tinning" }
      //   ]
      // },
      // {
      //   label: "Armouring Section",
      //   icon: "FaBarsStaggered",
      //   subMenuItems: [
      //     { label: "42 Bobbin", icon: "FaCogs", link: "/armouring-42" },
      //     { label: "30 Bobbin", icon: "FaCogs", link: "/armouring-30" },
      //     { label: "24 Bobbin", icon: "FaCogs", link: "/armouring-24" },
      //     { label: "SKIP", icon: "FaCogs", link: "/skip" },
      //     { label: "Drum Twister", icon: "FaCogs", link: "/drum-twister" }
      //   ]
      // },
      // {
      //   label: "Bunchers",
      //   icon: "FaBarsStaggered",
      //   subMenuItems: [
      //     { label: "Buncher (1–16)", icon: "FaCogs", link: "/buncher-1-16" },
      //     { label: "Buncher 400-1", icon: "FaCogs", link: "/buncher-400-1" },
      //     { label: "Buncher 400-2", icon: "FaCogs", link: "/buncher-400-2" }
      //   ]
      // }
    ]
  },
  {
    label: "Settings",
    icon: "FaCog",
    subMenuItems: [
      {
        label: "User Management",
        subMenuItems: [
          { label: "Users", link: "/settings/user-management/users" },
          { label: "Add User", link: "/settings/user-management/add-user" }
        ]
      },
      { label: "Alarm Management", link: "/underconstruction" },
      { label: "Notifications", link: "/underconstruction" },
      { label: "Access Permission", link: "/underconstruction" },
      {
        label: "Plant Management",
        subMenuItems: [
          { label: "Add Plant", link: "/settings/plant-management/add-plant" },
          { label: "Remove Plant", link: "/settings/plant-management/remove-plant" }
        ]
      }
    ]
  }
];

export default menuList;
