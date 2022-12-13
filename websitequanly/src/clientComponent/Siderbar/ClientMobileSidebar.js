/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "./ClientSidebar.css";
import {
  Logout,
  Close,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { React } from "react";
import SidebarGiamKhao from "./SidebarGiamKhao/SidebarGiamKhao";
import SidebarTruongNhom from "./SidebarTruongNhom/SidebarTruongNhom";

// location.pathname;

export default function ClientMobileSidebar() {

  const handleShowSidebar = () => {
    document.getElementById("nav-bar").classList.toggle("shows");
    document.getElementById("body-pd").classList.toggle("body-pd");
    document.getElementById("header").classList.toggle("body-pd");
    document.getElementById("header-title").classList.toggle("pl-n");
    document.getElementById("container-bg").classList.toggle("blur-bg");
    document.getElementById("header").classList.toggle("blur-bg");
    document.getElementById("footer").classList.toggle("blur-bg");
  };

  return (
    <div className="l-navbar" id="nav-bar">
      <nav className="nav flex-nowrap">
        <div>
          <p className="nav_logo" style={{ cursor: "pointer" }}>
            <span className="nav_logo-name"> Hệ Thống Quản Lý</span>
            <Close
              className="nav_logo-icon"
              id="header-toggle-nav"
              onClick={handleShowSidebar}
              style={{ position: "absolute", top: "15px", right: "15px" }}
            />
          </p>
          <div className="nav_list">
            {localStorage.getItem("chucvu") == 2 ? (
              <SidebarGiamKhao />
            ) : (
              <SidebarTruongNhom />
            )}
          </div>
        </div>
        <Link to="/logout" className="nav_link" style={{ paddingLeft: "24px" }}>
          <Logout className="nav_icon" />
          <span className="nav_name">Sign Out</span>
        </Link>
      </nav>
    </div>
  );
}
