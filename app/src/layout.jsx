import Sidebar from "./components/sidebar";
import Trending from "./components/trendignTopics";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="h-screen md:px-5 lg:px-10 xl:px-40 2xl:px-80 grid grid-cols-12 gap-1 bg-background ">
      <div className="border-r sm:block col-span-2 sm:col-span-3">
        <Sidebar />
      </div>
      <div className="border-r col-span-10 sm:col-span-6">
        <Outlet />
      </div>
      <div className="hidden sm:block sm:col-span-3">
        <Trending />
      </div>
    </div>
  );
}
