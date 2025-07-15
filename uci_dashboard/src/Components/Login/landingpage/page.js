import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCog, FaTools, FaChartBar, FaCogs } from "react-icons/fa";
import data from "../applicationAuth/src/Components/landingpage/Landingpage.json";
import Imagelogo from "../../Components/Assets/modified_sky_600_image.png";
import BrandLogo from "../../Components/Assets/Picture1.png";


const iconMap = {
  FaCog: FaCog,
  FaTools: FaTools,
  FaChartBar: FaChartBar,
  FaCogs: FaCogs,
};

const MasterPage = () => {


  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row justify-between w-full  bg-white text-black
       `} 
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 md:p-10 flex flex-col">
        <div className="w-48 flex justify-center items-center">
          <Image
            src={BrandLogo}
            alt="BrandLogo"
          />
        </div>

        <div>
          <h1 className="text-md md:text-2xl font-bold mb-2">
            Welcome to Digital-Sync Omni Edge AI Platform Suite
          </h1>
          <span className="text-sky-600 font-normal text-lg md:text-md">
            One stop solution for enabling Digital Transformation
          </span>
        </div>

        <div className="mt-4">
          <h1 className="text-lg md:text-md font-bold text-sky-600 mb-2">
            Omni Edge Management Portal
          </h1>
          <p className="text-sm md:text-base mb-4">
            Edge Management Portal is a centralized application to manage the life-cycle of Edge Gateway, Edge Devices, Edge applications and Industrial Connectors.
          </p>
        </div>

        <div>
          <h1 className="text-lg md:text-md font-bold text-sky-600 mb-2">
            Omni Edge AI Engineering Tool
          </h1>
          <p className="text-sm md:text-base mb-4">
            Provides a no-code UI for creating Data models, Connectors, Components, and Applications that&apos;s on the Edge Gateway.
          </p>
        </div>

        <div>
          <h1 className="text-lg md:text-md font-bold text-sky-600 mb-2">
            Dashboard Builder
          </h1>
          <p className="text-sm md:text-base mb-4">
            Dashboard Manager applications provides the framework to create customized Dashboards and its connectivity with real time data sources.
          </p>
        </div>

        <div>
          <h1 className="text-lg md:text-md font-bold text-sky-600 mb-2">
            Process Graphics Builder
          </h1>
          <p className="text-sm md:text-base mb-4">
            Process Graphics application provides a framework to create Industrial Plant Process 2D model and real-time overall plant process monitoring.
          </p>
        </div>

        <div className="w-full flex items-center justify-center">
          <Image
            src={Imagelogo}
            alt="Platform"
            className="w-[80%]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div
                key={index}
                className="flex flex-row items-center p-4 transition duration-200"
              >
                <div className="flex-shrink-0 p-2 border bg-white shadow-md rounded-lg hover:bg-blue-100 transition duration-200">
                  <Link href={item.link}>
                    {IconComponent ? (
                      <IconComponent className="h-16 w-16 md:h-16 md:w-16 bg-sky-500 rounded-lg p-2 " />
                    ) : (
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="h-16 w-full md:h-16 md:w-16 rounded-lg p-2 bg-sky-500"
                      />
                    )}
                  </Link>
                </div>
                <div className="ml-4">
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base text-black hover:text-blue-900"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm md:text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MasterPage;
