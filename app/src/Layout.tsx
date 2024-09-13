import { Outlet } from "react-router-dom";
import NavMenu from "./components/NavBar/NavMenu";
import RightContent from "./components/RightContent";

function Layout() {
  return (
    <>
      <NavMenu />
      <Outlet />
      <RightContent />
    </>
  );
}

export default Layout;
