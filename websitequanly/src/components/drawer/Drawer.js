import "./Drawer.css";
import { useEffect, React, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../topbars/TopBar";
import Sidebar from "../sidebar/Sidebar";

// location.pathname;

export default function Drawer() {
  return (
    <div id="body-pd" className="body-pd">
      <TopBar />
      <Sidebar />
    </div>
  );
}
