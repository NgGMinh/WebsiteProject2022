/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Sidebar.css";
import {
  Home,
  ManageAccounts,
  Event,
  ManageHistory,
  DateRange,
  Groups,
  BarChart,
  Logout,
  ExpandMore,
  ExpandLess,
  Close,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { React, useState } from "react";
import { CDBCollapse } from "cdbreact";

// location.pathname;

export default function SidebarForMobile() {
  // const [showMenuChuongTrinh, setShowMenuChuongTrinh] = useState(false);
  const [showMenuCuocThi, setShowMenuCuocThi] = useState(false);
  const [showMenuDoanDoiThiSinh, setShowMenuDoanDoiThiSinh] = useState(false);

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
            {/* Trang Chủ */}
            <Link
              to="/"
              className="link text-decoration-none nav_link"
              id="home"
              onClick={handleShowSidebar}
            >
              <Home className="nav_icon" />
              <span className="nav_name">Trang Chủ</span>
            </Link>

            {/* Quản Lý Người Dùng */}
            <Link
              to="/quanlynguoidung"
              className="link text-decoration-none nav_link"
              id="quanlynguoidung"
              onClick={handleShowSidebar}
            >
              <ManageAccounts className="nav_icon" />
              <span className="nav_name">Quản Lý Người Dùng</span>
            </Link>

            {/* Cuộc Thi Văn Nghệ */}
            <div style={{ cursor: "pointer" }}>
              <div
                onClick={() => setShowMenuCuocThi(!showMenuCuocThi)}
                aria-controls="example-collapse-text"
                aria-expanded={true}
                id="cuocthivannghe"
                className="link text-decoration-none nav_link"
              >
                <DateRange className="nav_icon" />
                <span className="nav_name">Cuộc Thi Văn Nghệ</span>
                <span className="expandArrow">
                  {showMenuCuocThi ? <ExpandMore /> : <ExpandLess />}
                </span>
              </div>

              <CDBCollapse isOpen={showMenuCuocThi} className="pr-4">
                <Link
                  to="/tatcacuocthi"
                  id="tatcacuocthi"
                  className="link text-decoration-none nav_link"
                  style={{ paddingLeft: "60px" }}
                  onClick={handleShowSidebar}
                >
                  Tất Cả Cuộc Thi
                </Link>
                <Link
                  to="/themcuocthi"
                  id="themcuocthi"
                  className="link text-decoration-none nav_link"
                  style={{ paddingLeft: "60px" }}
                  onClick={handleShowSidebar}
                >
                  Thêm Cuộc Thi
                </Link>
                <Link
                  to="/dieuchinhthongtin"
                  id="dieuchinhthongtin"
                  className="link text-decoration-none nav_link"
                  style={{ paddingLeft: "60px" }}
                  onClick={handleShowSidebar}
                >
                  Điểu Chỉnh Thông Tin
                </Link>
              </CDBCollapse>
            </div>

            {/* Chương Trình Văn Nghệ */}
            {/* <div style={{ cursor: "pointer" }}>
              <div
                onClick={() => setShowMenuChuongTrinh(!showMenuChuongTrinh)}
                aria-controls="example-collapse-text"
                aria-expanded={true}
                id="chuongtrinhvannghe"
                className="link text-decoration-none nav_link"
              >
                <Event className="nav_icon" />
                <span className="nav_name">Chương Trình Văn Nghệ</span>
                <span className="expandArrow">
                  {showMenuChuongTrinh ? <ExpandMore /> : <ExpandLess />}
                </span>
              </div>

              <CDBCollapse isOpen={showMenuChuongTrinh} className="pr-4">
                <Link
                  to="/tatcachuongtrinh"
                  id="tatcachuongtrinh"
                  className="link text-decoration-none nav_link"
                  style={{ paddingLeft: "60px" }}
                  onClick={handleShowSidebar}
                >
                  Tất Cả Chương Trình
                </Link>
                <Link
                  to="/themchuongtrinh"
                  id="themchuongtrinh"
                  className="link text-decoration-none nav_link"
                  style={{ paddingLeft: "60px" }}
                  onClick={handleShowSidebar}
                >
                  Thêm Chương Trình
                </Link>
              </CDBCollapse>
            </div> */}

            <Link
              to="/tatcachuongtrinh"
              className="link text-decoration-none nav_link"
              id="tatcachuongtrinh"
              onClick={handleShowSidebar}
            >
              <Event className="nav_icon" />
              <span className="nav_name">Chương Trình Văn Nghệ</span>
            </Link>

            {/* Đoàn Đội Thí Sinh */}
            <div style={{ cursor: "pointer" }}>
              <div
                onClick={() =>
                  setShowMenuDoanDoiThiSinh(!showMenuDoanDoiThiSinh)
                }
                aria-controls="example-collapse-text"
                aria-expanded={true}
                id="doandoivannghe"
                className="link text-decoration-none nav_link"
              >
                <Groups className="nav_icon" />
                <span className="nav_name">Đoàn Đội Văn Nghệ</span>

                <span className="expandArrow">
                  {showMenuDoanDoiThiSinh ? <ExpandMore /> : <ExpandLess />}
                </span>
              </div>

              <CDBCollapse isOpen={showMenuDoanDoiThiSinh} className="pr-4">
                <Link
                  to="/tatcadoandoi"
                  id="tatcadoandoi"
                  className="link text-decoration-none nav_link"
                  style={{ paddingLeft: "60px" }}
                  onClick={handleShowSidebar}
                >
                  Tất Cả Đoàn Đội
                </Link>
                <Link
                  to="/themdoandoi"
                  id="themdoandoi"
                  className="link text-decoration-none nav_link"
                  style={{ paddingLeft: "60px" }}
                  onClick={handleShowSidebar}
                >
                  Thêm Đoàn Đội
                </Link>
              </CDBCollapse>
            </div>

            {/* Tiết Mục Văn Nghệ */}
            <Link
              to="/tietmucvannghe"
              className="link text-decoration-none nav_link"
              id="tietmucvannghe"
              onClick={handleShowSidebar}
            >
              <ManageHistory className="nav_icon" />
              <span className="nav_name">Tiết Mục Văn Nghệ</span>
            </Link>

            {/* Thống Kê */}
            <Link
              to="/thongke"
              className="link text-decoration-none nav_link"
              id="thongke"
              onClick={handleShowSidebar}
            >
              <BarChart className="nav_icon" />
              <span className="nav_name">Thống Kê</span>
            </Link>
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
