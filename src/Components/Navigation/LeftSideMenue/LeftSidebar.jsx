"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  IoIosArrowForward,
  IoIosArrowDown
} from "react-icons/io";
import {
  FaRobot,
  FaCogs,
  FaIndustry,
  FaCog,
  FaProjectDiagram,
  
} from "react-icons/fa";
import {
  MdConveyorBelt,
  MdOutlineAnalytics,
  MdOutlineDashboardCustomize
} from "react-icons/md";
import {
  GiTargetLaser,
  GiLaserTurret
} from "react-icons/gi";
import {
  TbDevicesPc
} from "react-icons/tb";
import {
  Bs0Circle
} from "react-icons/bs";
import {
  AiFillAlert,
  AiFillAliwangwang,
  AiFillBell,
  AiFillBug,
  AiFillContainer,
  AiFillCustomerService,
  AiFillDingtalkCircle,
  AiFillDownCircle,
  AiFillExperiment
} from "react-icons/ai";
import {
  DiAtlassian,
  DiBower
} from "react-icons/di";
import {
  HiAcademicCap,
  HiAdjustments
} from "react-icons/hi";
import {
  VscActivateBreakpoints,
  VscAzureDevops
} from "react-icons/vsc";

import menuList from "./ListObject";

const Sidebar = ({ collapsed, setCollapsed, setClickedMenu1, setClickedSubMenu }) => {
  const router = useRouter();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [activeMenuPath, setActiveMenuPath] = useState([]);

  // Resize handler for responsive collapse
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 1012);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  // Load saved submenu and active menu state
  useEffect(() => {
    const savedSubmenus = localStorage.getItem("openSubmenus");
    const savedActiveMenu = localStorage.getItem("activeMenuPath");

    if (savedSubmenus) setOpenSubmenus(JSON.parse(savedSubmenus));
    if (savedActiveMenu) setActiveMenuPath(JSON.parse(savedActiveMenu));
  }, []);

  // Save submenu state
  useEffect(() => {
    localStorage.setItem("openSubmenus", JSON.stringify(openSubmenus));
  }, [openSubmenus]);

  // Save active path state
  useEffect(() => {
    localStorage.setItem("activeMenuPath", JSON.stringify(activeMenuPath));
  }, [activeMenuPath]);

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const updateBreadcrumbs = (item, parentPath = []) => {
    const currentPath = [...parentPath, item.label];
    setClickedMenu1(currentPath.join(" > "));
    setClickedSubMenu(parentPath.length > 0 ? item.label : null);
    setActiveMenuPath(currentPath);
  };

  const handleClickMenu = (item, parentPath = []) => {
    updateBreadcrumbs(item, parentPath);
    if (!item.subMenuItems) {
      router.push(item.link || "#");
    }
  };

  const iconComponents = useMemo(() => ({
    MdOutlineDashboardCustomize,
    FaIndustry,
    MdOutlineAnalytics,
    FaCog,
    FaRobot,
    FaCogs,
    MdConveyorBelt,
    GiTargetLaser,
    GiLaserTurret,
    TbDevicesPc,
    Bs0Circle,
    AiFillAlert,
    AiFillAliwangwang,
    AiFillBell,
    AiFillBug,
    AiFillContainer,
    AiFillCustomerService,
    AiFillDingtalkCircle,
    AiFillDownCircle,
    AiFillExperiment,
    DiAtlassian,
    DiBower,
    HiAcademicCap,
    HiAdjustments,
    VscActivateBreakpoints,
    VscAzureDevops,
    FaProjectDiagram
  }), []);

  const renderMenuItems = (items, parentPath = []) => {
    return items.map((item) => {
      const currentPath = [...parentPath, item.label];
      const isActive = activeMenuPath.join(" > ") === currentPath.join(" > ");
      const isSubmenuOpen = openSubmenus[item.label] || false;

      const Icon = iconComponents[item.icon];

      return (
        <div key={item.label} className="text-sm">
          <div
            className={`flex items-center gap-4 p-2 cursor-pointer transition-all duration-300 ${
              isActive
                ? "bg-sky-500 text-white border-l-4 border-[#0f6992]"
                : "text-white hover:text-sky-600"
            }`}
            onClick={() => {
              handleClickMenu(item, parentPath);
              if (item.subMenuItems) toggleSubmenu(item.label);
            }}
            aria-expanded={isSubmenuOpen}
          >
            {Icon && <Icon className="text-xl" />}
            {!collapsed && (
              <span className="flex-grow text-[12px] font-bold">
                <Link href={item.link || "#"} passHref>
                  <h1 className={`${isActive ? "text-white" : "hover:text-sky-500"}`}>
                    {item.label}
                  </h1>
                </Link>
              </span>
            )}
            {item.subMenuItems && !collapsed && (
              <span className="text-white">
                {isSubmenuOpen ? (
                  <IoIosArrowDown className="text-sm" />
                ) : (
                  <IoIosArrowForward className="text-sm" />
                )}
              </span>
            )}
          </div>

          {!collapsed && isSubmenuOpen && item.subMenuItems && (
            <div className="ml-4 border-l border-gray-700">
              {renderMenuItems(item.subMenuItems, currentPath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={`flex flex-col items-center justify-start flex-grow h-screen bg-[#1f1d1d] text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-48"
      }`}
    >
      <div className="overflow-y-auto w-full">
        {renderMenuItems(menuList)}
      </div>
    </div>
  );
};

export default Sidebar;
