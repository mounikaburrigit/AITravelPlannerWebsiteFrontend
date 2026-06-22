import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const DashboardLayout = () => {
  return (
    <div
      className="
      flex
  min-h-screen
  bg-slate-50
  dark:bg-slate-950
  transition-colors
  duration-300
      "
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopNavbar />

        <main
          className="
          flex-1
          p-4
          md:p-6
          pb-24
          md:pb-6
          bg-slate-50
          dark:bg-slate-950
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
