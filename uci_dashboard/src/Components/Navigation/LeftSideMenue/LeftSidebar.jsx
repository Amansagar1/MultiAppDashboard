"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";

import menuList from "./ListObject";
import IconMapper from "./IconImports";
import navlogo from "../../../../public/images/whitelogo.png";

const Sidebar = ({ collapsed, setCollapsed, setClickedMenu1, setClickedSubMenu, toggleCollapse }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [activeMenuPath, setActiveMenuPath] = useState([]);

  const updateBreadcrumbsFromPath = (pathArray) => {
    setClickedMenu1(pathArray.join(" > "));
    setClickedSubMenu(pathArray.length > 1 ? pathArray[pathArray.length - 1] : null);
  };

  const updateBreadcrumbs = (item, parentPath = []) => {
    const currentPath = [...parentPath, item.label];
    setActiveMenuPath(currentPath);
    updateBreadcrumbsFromPath(currentPath);
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleClickMenu = (item, parentPath = []) => {
    updateBreadcrumbs(item, parentPath);
    if (!item.subMenuItems) router.push(item.link || "#");
  };

  const findActiveMenu = (items, parentPath = []) => {
    for (const item of items) {
      const currentPath = [...parentPath, item.label];

      if (item.link && pathname === item.link) {
        setActiveMenuPath(currentPath);
        updateBreadcrumbsFromPath(currentPath);

        const newOpenSubmenus = {};
        currentPath.slice(0, -1).forEach(label => {
          newOpenSubmenus[label] = true;
        });
        setOpenSubmenus(newOpenSubmenus);
        return true;
      }

      if (item.subMenuItems && findActiveMenu(item.subMenuItems, currentPath)) {
        setOpenSubmenus(prev => ({ ...prev, [item.label]: true }));
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth <= 1080);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  useEffect(() => {
    if (!findActiveMenu(menuList)) {
      const savedSubmenus = localStorage.getItem("openSubmenus");
      const savedActiveMenu = localStorage.getItem("activeMenuPath");

      if (savedSubmenus) setOpenSubmenus(JSON.parse(savedSubmenus));
      if (savedActiveMenu) {
        const path = JSON.parse(savedActiveMenu);
        setActiveMenuPath(path);
        updateBreadcrumbsFromPath(path);

        const newOpen = {};
        path.slice(0, -1).forEach(label => {
          newOpen[label] = true;
        });
        setOpenSubmenus(newOpen);
      }
    }
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem("openSubmenus", JSON.stringify(openSubmenus));
  }, [openSubmenus]);

  useEffect(() => {
    localStorage.setItem("activeMenuPath", JSON.stringify(activeMenuPath));
  }, [activeMenuPath]);

  const renderMenuItems = (items, parentPath = []) =>
    items.map((item) => {
      const currentPath = [...parentPath, item.label];
      const isActive = activeMenuPath.join(" > ") === currentPath.join(" > ");
      const isSubmenuOpen = openSubmenus[item.label];

      return (
        <div key={item.label} className="text-md">
          <div
            className={`flex items-center gap-4 p-2 cursor-pointer transition-all duration-300 ${
              isActive ? "bg-[#00DD6E] text-white border-l-4 border-[#00DD6E]" : "text-white hover:text-[#00DD6E]"
            }`}
            onClick={() => {
              handleClickMenu(item, parentPath);
              if (item.subMenuItems) toggleSubmenu(item.label);
            }}
            aria-expanded={!!isSubmenuOpen}
          >
            {item.icon && (
              <IconMapper
                name={item.icon}
                className={`text-sm ${collapsed ? "flex items-center justify-center w-full" : ""}`}
              />
            )}

            {!collapsed && (
              <span className="flex-grow text-[12px] font-bold">
                {item.link ? (
                  <Link href={item.link}>
                    <h1 className={`${isActive ? "text-white" : "hover:text-green-500"}`}>{item.label}</h1>
                  </Link>
                ) : (
                  <h1>{item.label}</h1>
                )}
              </span>
            )}

            {item.subMenuItems && !collapsed && (
              <span className="text-white">
                {isSubmenuOpen ? <IoIosArrowDown className="text-sm" /> : <IoIosArrowForward className="text-sm" />}
              </span>
            )}
          </div>

          {!collapsed && isSubmenuOpen && item.subMenuItems && (
            <div className="ml-4 border-l border-gray-700">{renderMenuItems(item.subMenuItems, currentPath)}</div>
          )}
        </div>
      );
    });

  return (
    <div className={`flex flex-col items-center h-full bg-[#1f1d1d] text-white transition-all duration-300 ${collapsed ? "w-14" : "w-44"}`}>
      {/* Logo & Collapse Toggle */}
      

      {/* Menu List */}
      <div className="overflow-y-auto w-full">{renderMenuItems(menuList)}</div>
    </div>
  );
};

export default Sidebar;
