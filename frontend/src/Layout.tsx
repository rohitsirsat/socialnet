import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RightContent from "./components/Rightbar";

const Layout = () => {
  return (
    <>
      <div className="flex justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl flex gap-6 py-4">
          <Sidebar />
          <div className="w-full lg:w-3/5 px-4 sm:px-6">
            <Outlet />
          </div>
          <RightContent />
        </div>
      </div>
    </>
  );
};

export default Layout;
