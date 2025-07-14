/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useMemo } from 'react';

import { FaRobot, FaCogs, FaIndustry, FaCog, FaBarsStaggered, FaProjectDiagram } from 'react-icons/fa';
import { MdConveyorBelt, MdOutlineAnalytics, MdOutlineDashboardCustomize } from 'react-icons/md';
import { GiTargetLaser, GiLaserTurret } from 'react-icons/gi';
import { TbDevicesPc } from "react-icons/tb";
import { Bs0Circle } from "react-icons/bs";
import { AiFillAlert, AiFillAliwangwang, AiFillBell, AiFillBug, AiFillContainer, AiFillCustomerService, AiFillDingtalkCircle, AiFillDownCircle, AiFillExperiment } from "react-icons/ai";
import { DiAtlassian, DiBower } from "react-icons/di";
import { HiAcademicCap, HiAdjustments } from "react-icons/hi";
import { VscActivateBreakpoints, VscAzureDevops } from "react-icons/vsc";

export const iconComponents = useMemo(() => ({
  MdOutlineDashboardCustomize: MdOutlineDashboardCustomize,
  FaIndustry: FaIndustry,
  MdOutlineAnalytics: MdOutlineAnalytics,
  FaCog: FaCog,
  FaRobot: FaRobot,
  FaCogs: FaCogs,
  MdConveyorBelt: MdConveyorBelt,
  GiTargetLaser: GiTargetLaser,
  GiLaserTurret: GiLaserTurret,
  TbDevicesPc: TbDevicesPc,
  FaBarsStaggered: FaBarsStaggered,
  Bs0Circle: Bs0Circle,
  AiFillAlert: AiFillAlert,
  AiFillAliwangwang: AiFillAliwangwang,
  AiFillBell: AiFillBell,
  AiFillBug: AiFillBug,
  AiFillContainer: AiFillContainer,
  AiFillCustomerService: AiFillCustomerService,
  AiFillDingtalkCircle: AiFillDingtalkCircle,
  AiFillDownCircle: AiFillDownCircle,
  AiFillExperiment: AiFillExperiment,
  DiAtlassian: DiAtlassian,
  DiBower: DiBower,
  HiAcademicCap: HiAcademicCap,
  HiAdjustments: HiAdjustments,
  VscActivateBreakpoints: VscActivateBreakpoints,
  VscAzureDevops: VscAzureDevops,
  FaProjectDiagram: FaProjectDiagram,
}), []);

export default iconComponents;
