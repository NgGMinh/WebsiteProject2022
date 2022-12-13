/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "./ClientSidebar.css";
import { Menu, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { React } from "react";
import SidebarGiamKhao from "./SidebarGiamKhao/SidebarGiamKhao";
import SidebarTruongNhom from "./SidebarTruongNhom/SidebarTruongNhom";

// location.pathname;

export default function ClientDefaultSidebar() {
  return (
    // Default Sidebar
    <div className="sidebar-bg">
      <div className="l-navbar shows" id="nav-bar">
        <nav className="nav flex-nowrap">
          <div>
            <p className="nav_logo" style={{ cursor: "pointer" }}>
              <Menu className="nav_logo-icon" />
              <span className="nav_logo-name">Hệ Thống Quản Lý</span>
            </p>
            {localStorage.getItem("chucvu") == 2 ? (
              <SidebarGiamKhao />
            ) : (
              <SidebarTruongNhom />
            )}
          </div>
          <Link
            to="/logout"
            className="nav_link"
            // style={{ paddingLeft: "24px" }}
          >
            <Logout className="nav_icon" />
            <span className="nav_name">Sign Out</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
