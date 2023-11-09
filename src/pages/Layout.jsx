/** @format */

import React from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="d-flex flex-column vh-100 justify-content-between">
        <Nav />
        <main className="container flex-fill">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
