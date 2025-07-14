import React, { useEffect, useState } from "react";

const Breadcrumb = ({ clickedMenu1, clickedSubMenu }) => {
  const [breadcrumbState, setBreadcrumbState] = useState({
    clickedMenu1: "",
    clickedSubMenu: "",
  });

  useEffect(() => {
    // Check if there's any saved breadcrumb in localStorage
    const savedBreadcrumb = localStorage.getItem("breadcrumb");
    if (savedBreadcrumb) {
      const { clickedMenu1: savedClickedMenu1, clickedSubMenu: savedClickedSubMenu } = JSON.parse(savedBreadcrumb);
      setBreadcrumbState({
        clickedMenu1: savedClickedMenu1 || "",
        clickedSubMenu: savedClickedSubMenu || "",
      });
    }
  }, []);

  useEffect(() => {
    // Save breadcrumb state to localStorage whenever either value changes
    if (clickedMenu1 || clickedSubMenu) {
      const breadcrumb = {
        clickedMenu1,
        clickedSubMenu,
      };
      localStorage.setItem("breadcrumb", JSON.stringify(breadcrumb));
      setBreadcrumbState(breadcrumb);
    }
  }, [clickedMenu1, clickedSubMenu]);

  const getBreadcrumbs = () => {
    // If no menu is clicked, return "Home"
    if (!breadcrumbState.clickedMenu1) return [""];

    // Split the full path into breadcrumbs
    const breadcrumbs = breadcrumbState.clickedMenu1.split(" > ");

    // Add the submenu if it exists and isn't already included
    if (breadcrumbState.clickedSubMenu && !breadcrumbs.includes(breadcrumbState.clickedSubMenu)) {
      breadcrumbs.push(breadcrumbState.clickedSubMenu);
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="breadcrumb-container bg-gray-800 text-white py-3 px-6 shadow-md">
      <nav className="text-sm flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-gray-500">/</span>}
            <span
              className={`${
                index === breadcrumbs.length - 1
                  ? "text-sky-500"
                  : "text-white hover:text-sky-500 cursor-pointer"
              }`}
            >
              {breadcrumb}
            </span>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;
