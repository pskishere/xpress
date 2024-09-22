import { HomeIcon, MonitorIcon, LandmarkIcon, DollarSignIcon, PaletteIcon } from "lucide-react";
import Index from "./pages/Index.jsx";

export const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "科技",
    to: "/technology",
    icon: <MonitorIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "政治",
    to: "/politics",
    icon: <LandmarkIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "经济",
    to: "/economy",
    icon: <DollarSignIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "文化",
    to: "/culture",
    icon: <PaletteIcon className="h-4 w-4" />,
    page: <Index />,
  },
];
