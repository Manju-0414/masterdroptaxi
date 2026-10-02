import {
  FaCity, FaArrowRightLong, FaRightLeft, FaRoad, FaMountainSun, FaGopuram, FaPlaneDeparture, FaTrainSubway,
  FaBuilding, FaMobileScreen, FaCalculator, FaUserTie, FaCarSide, FaHeadset, FaIdCard, FaShieldHalved, FaSatelliteDish,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export const ICONS: Record<string, IconType> = {
  city: FaCity,
  oneway: FaArrowRightLong,
  round: FaRightLeft,
  outstation: FaRoad,
  tour: FaMountainSun,
  temple: FaGopuram,
  airport: FaPlaneDeparture,
  railway: FaTrainSubway,
  corporate: FaBuilding,
  easy: FaMobileScreen,
  estimate: FaCalculator,
  driver: FaUserTie,
  fleet: FaCarSide,
  support: FaHeadset,
  info: FaIdCard,
  safety: FaShieldHalved,
  tracking: FaSatelliteDish,
};

export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const C = ICONS[name] ?? FaCarSide;
  return <C size={size} />;
}
