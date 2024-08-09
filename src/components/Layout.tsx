import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex overflow-hidden h-screen ">
      <Header title="Rollover"/>
      <div className="w-full h-full overflow-hidden">
        <div className="px-8 pt-8 pb-[150px] w-full h-[91%] overflow-auto bg-secondary_bg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;