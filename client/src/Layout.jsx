import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

const Layout = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <div className="h-full w-full  layout">
      <Outlet />
      </div>
    </div>
  );
};

export default Layout;
