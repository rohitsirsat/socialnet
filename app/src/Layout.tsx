import { Outlet } from "react-router-dom";
import NavMenu from "./components/NavBar/NavMenu";
import RightContent from "./components/RightContent";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen bg-background pb-16 md:pb-0 text-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
            <NavMenu />
            <Outlet />
            <RightContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
