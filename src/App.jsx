import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 overflow-auto ml-5">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
