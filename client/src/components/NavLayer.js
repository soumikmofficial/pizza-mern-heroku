import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";

const NavLayer = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default NavLayer;
