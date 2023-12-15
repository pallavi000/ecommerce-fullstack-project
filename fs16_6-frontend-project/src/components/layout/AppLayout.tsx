import React from "react";
import { Outlet } from "react-router-dom";

// custom
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
}

export default AppLayout;
