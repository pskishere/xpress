import { HomeIcon, MonitorIcon, LandmarkIcon, DollarSignIcon, PaletteIcon, GlobeIcon, HeartIcon, BookIcon, ShieldIcon, SmileIcon } from "lucide-react";
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
  {
    title: "国际",
    to: "/world",
    icon: <GlobeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "健康",
    to: "/health",
    icon: <HeartIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "教育",
    to: "/education",
    icon: <BookIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "环境",
    to: "/environment",
    icon: <ShieldIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "娱乐",
    to: "/entertainment",
    icon: <SmileIcon className="h-4 w-4" />,
    page: <Index />,
  },
];
