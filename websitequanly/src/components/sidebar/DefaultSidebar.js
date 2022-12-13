/* eslint-disable eqeqeq */
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
  Menu,
  Logout,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { React, useState } from "react";
import { CDBCollapse } from "cdbreact";

// location.pathname;

export default function DefaultSidebar() {
  // const [showMenuChuongTrinh, setShowMenuChuongTrinh] = useState(false);
  const [showMenuCuocThi, setShowMenuCuocThi] = useState(false);
  const [showMenuDoanDoiThiSinh, setShowMenuDoanDoiThiSinh] = useState(false);

  const [showIcon, setShowIcon] = useState(true);

  const handleShowMenu = () => {
    // setShowMenuChuongTrinh(false);
    setShowMenuCuocThi(false);
    setShowMenuDoanDoiThiSinh(false);
  };

  const handleShowIcon = () => setShowIcon(!showIcon);

  const handleShowSidebar = () => {
    document.getElementById("nav-bar").classList.toggle("shows");
    document.getElementById("body-pd").classList.toggle("body-pd");
    document.getElementById("header").classList.toggle("body-pd");
    document.getElementById("header-title").classList.toggle("pl-n");
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    // Default Sidebar
    <div className="sidebar-bg">
      <div className="l-navbar shows" id="nav-bar">
        <nav className="nav flex-nowrap">
          <div>
            <p className="nav_logo" style={{ cursor: "pointer" }}>
              <Menu
                className="nav_logo-icon"
                id="header-toggle-nav"
                onClick={() => {
                  handleShowSidebar();
                  handleShowIcon();
                  handleShowMenu();
                }}
              />
              <span className="nav_logo-name">Hệ Thống Quản Lý</span>
            </p>
            <div className="nav_list">
              {/* Trang Chủ */}
              <Link
                to="/home"
                className="link text-decoration-none nav_link"
                id="home"
                onClick={() => {
                  setTimeout(() => {
                    // setShowMenuChuongTrinh(false);
                    setShowMenuCuocThi(false);
                    setShowMenuDoanDoiThiSinh(false);
                  }, 850);
                }}
              >
                {showIcon ? (
                  <Home className="nav_icon" />
                ) : (
                  <OverlayTrigger
                    key="home"
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip-home">
                        <strong> Trang Chủ </strong>
                      </Tooltip>
                    }
                  >
                    <Home className="nav_icon" />
                  </OverlayTrigger>
                )}
                <span className="nav_name">Trang Chủ</span>
              </Link>

              {/* Quản Lý Người Dùng */}
              <Link
                to="/quanlynguoidung"
                className="link text-decoration-none nav_link"
                id="quanlynguoidung"
                onClick={() => {
                  setTimeout(() => {
                    // setShowMenuChuongTrinh(false);
                    setShowMenuCuocThi(false);
                    setShowMenuDoanDoiThiSinh(false);
                  }, 400);
                }}
              >
                {showIcon ? (
                  <ManageAccounts className="nav_icon" />
                ) : (
                  <OverlayTrigger
                    key="quanlynguoidung"
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip-quanlynguoidung">
                        <strong> Quản Lý Người Dùng </strong>
                      </Tooltip>
                    }
                  >
                    <ManageAccounts className="nav_icon" />
                  </OverlayTrigger>
                )}

                <span className="nav_name">Quản Lý Người Dùng</span>
              </Link>

              {/* Cuộc Thi Văn Nghệ */}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (showIcon == false) {
                    handleShowSidebar();
                    handleShowIcon();
                  }
                }}
              >
                <div
                  onClick={() => setShowMenuCuocThi(!showMenuCuocThi)}
                  aria-controls="example-collapse-text"
                  aria-expanded={true}
                  id="cuocthivannghe"
                  className="link text-decoration-none nav_link"
                >
                  {showIcon ? (
                    <DateRange className="nav_icon" />
                  ) : (
                    <OverlayTrigger
                      key="cuocthivannghe"
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-cuocthivannghe">
                          <strong> Cuộc Thi Văn Nghệ </strong>
                        </Tooltip>
                      }
                    >
                      <DateRange className="nav_icon" />
                    </OverlayTrigger>
                  )}

                  <span className="nav_name">Cuộc Thi Văn Nghệ</span>
                  <span
                    className="expandArrow"
                    style={{ display: showIcon ? "flex" : "none" }}
                  >
                    {showMenuCuocThi ? <ExpandMore /> : <ExpandLess />}
                  </span>
                </div>

                <CDBCollapse isOpen={showMenuCuocThi} className="pr-4">
                  <Link
                    to="/tatcacuocthi"
                    id="tatcacuocthi"
                    className="link text-decoration-none nav_link"
                    style={{ paddingLeft: "60px" }}
                    onClick={() => {
                      // setShowMenuChuongTrinh(false);
                      setShowMenuDoanDoiThiSinh(false);
                    }}
                  >
                    Tất Cả Cuộc Thi
                  </Link>
                  <Link
                    to="/themcuocthi"
                    id="themcuocthi"
                    className="link text-decoration-none nav_link"
                    style={{ paddingLeft: "60px" }}
                    onClick={() => {
                      // setShowMenuChuongTrinh(false);
                      setShowMenuDoanDoiThiSinh(false);
                    }}
                  >
                    Thêm Cuộc Thi
                  </Link>
                  <Link
                    to="/dieuchinhthongtin"
                    id="dieuchinhthongtin"
                    className="link text-decoration-none nav_link"
                    style={{ paddingLeft: "60px" }}
                    onClick={() => {
                      // setShowMenuChuongTrinh(false);
                      setShowMenuDoanDoiThiSinh(false);
                    }}
                  >
                    Điều Chỉnh Thông Tin
                  </Link>
                </CDBCollapse>
              </div>

              {/* Chương Trình Văn Nghệ */}
              {/* <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (showIcon == false) {
                    handleShowSidebar();
                    handleShowIcon();
                  }
                }}
              >
                <div
                  onClick={() => setShowMenuChuongTrinh(!showMenuChuongTrinh)}
                  aria-controls="example-collapse-text"
                  aria-expanded={true}
                  id="chuongtrinhvannghe"
                  className="link text-decoration-none nav_link"
                >
                  {showIcon ? (
                    <Event className="nav_icon" />
                  ) : (
                    <OverlayTrigger
                      key="chuongtrinhvannghe"
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-chuongtrinhvannghe">
                          <strong> Chương Trình Văn Nghệ </strong>
                        </Tooltip>
                      }
                    >
                      <Event className="nav_icon" />
                    </OverlayTrigger>
                  )}
                  <span className="nav_name">Chương Trình Văn Nghệ</span>
                  <span
                    className="expandArrow"
                    style={{ display: showIcon ? "flex" : "none" }}
                  >
                    {showMenuChuongTrinh ? <ExpandMore /> : <ExpandLess />}
                  </span>
                </div>

                <CDBCollapse isOpen={showMenuChuongTrinh} className="pr-4">
                  <Link
                    to="/tatcachuongtrinh"
                    id="tatcachuongtrinh"
                    className="link text-decoration-none nav_link"
                    style={{ paddingLeft: "60px" }}
                    onClick={() => {
                      setShowMenuCuocThi(false);
                      setShowMenuDoanDoiThiSinh(false);
                    }}
                  >
                    Tất Cả Chương Trình
                  </Link>
                  <Link
                    to="/themchuongtrinh"
                    id="themchuongtrinh"
                    className="link text-decoration-none nav_link"
                    style={{ paddingLeft: "60px" }}
                    onClick={() => {
                      setShowMenuCuocThi(false);
                      setShowMenuDoanDoiThiSinh(false);
                    }}
                  >
                    Thêm Chương Trình
                  </Link>
                </CDBCollapse>
              </div> */}

              <Link
                to="/tatcachuongtrinh"
                className="link text-decoration-none nav_link"
                id="tatcachuongtrinh"
                onClick={() => {
                  setShowMenuCuocThi(false);
                  setShowMenuDoanDoiThiSinh(false);
                }}
              >
                {showIcon ? (
                  <Event className="nav_icon" />
                ) : (
                  <OverlayTrigger
                    key="chuongtrinhvannghe"
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip-chuongtrinhvannghe">
                        <strong> Chương Trình Văn Nghệ </strong>
                      </Tooltip>
                    }
                  >
                    <Event className="nav_icon" />
                  </OverlayTrigger>
                )}

                <span className="nav_name">Chương Trình Văn Nghệ</span>
              </Link>

              {/* Tiết mục văn nghệ */}
              <Link
                to="/tietmucvannghe"
                className="link text-decoration-none nav_link"
                id="tietmucvannghe"
                onClick={() => {
                  setTimeout(() => {
                    // setShowMenuChuongTrinh(false);
                    setShowMenuCuocThi(false);
                    setShowMenuDoanDoiThiSinh(false);
                  }, 800);
                }}
              >
                {showIcon ? (
                  <ManageHistory className="nav_icon" />
                ) : (
                  <OverlayTrigger
                    key="thongke"
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip-thongke">
                        <strong> Tiết Mục Văn Nghệ </strong>
                      </Tooltip>
                    }
                  >
                    <ManageHistory className="nav_icon" />
                  </OverlayTrigger>
                )}

                <span className="nav_name">Tiết Mục Văn Nghệ</span>
              </Link>

              {/* Đoàn Đội Thí Sinh */}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (showIcon == false) {
                    handleShowSidebar();
                    handleShowIcon();
                  }
                }}
              >
                <div
                  onClick={() =>
                    setShowMenuDoanDoiThiSinh(!showMenuDoanDoiThiSinh)
                  }
                  aria-controls="example-collapse-text"
                  aria-expanded={true}
                  id="doandoivannghe"
                  className="link text-decoration-none nav_link"
                >
                  {showIcon ? (
                    <Groups className="nav_icon" />
                  ) : (
                    <OverlayTrigger
                      key="doandoivannghe"
                      placement="right"
                      overlay={
                        <Tooltip>
                          <strong> Đoàn Đội Văn Nghệ </strong>
                        </Tooltip>
                      }
                    >
                      <Groups className="nav_icon" />
                    </OverlayTrigger>
                  )}

                  <span className="nav_name">Đoàn Đội Văn Nghệ</span>

                  <span
                    className="expandArrow"
                    style={{ display: showIcon ? "flex" : "none" }}
                  >
                    {showMenuDoanDoiThiSinh ? <ExpandMore /> : <ExpandLess />}
                  </span>
                </div>

                <CDBCollapse isOpen={showMenuDoanDoiThiSinh} className="pr-4">
                  <Link
                    to="/tatcadoandoi"
                    id="tatcadoandoi"
                    className="link text-decoration-none nav_link"
                    style={{ paddingLeft: "60px" }}
                    onClick={() => {
                      // setShowMenuChuongTrinh(false);
                      setShowMenuCuocThi(false);
                    }}
                  >
                    Tất Cả Đoàn Đội
                  </Link>
                  <Link
                    to="/themdoandoi"
                    id="themdoandoi"
                    className="link text-decoration-none nav_link"
                    style={{ paddingLeft: "60px" }}
                    onClick={() => {
                      // setShowMenuChuongTrinh(false);
                      setShowMenuCuocThi(false);
                    }}
                  >
                    Thêm Đoàn Đội
                  </Link>
                </CDBCollapse>
              </div>

              {/* Thống Kê */}
              <Link
                to="/thongke"
                className="link text-decoration-none nav_link"
                id="thongke"
                onClick={() => {
                  setTimeout(() => {
                    // setShowMenuChuongTrinh(false);
                    setShowMenuCuocThi(false);
                    setShowMenuDoanDoiThiSinh(false);
                  }, 50);
                }}
              >
                {showIcon ? (
                  <BarChart className="nav_icon" />
                ) : (
                  <OverlayTrigger
                    key="thongke"
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip-thongke">
                        <strong>Thống Kê</strong>
                      </Tooltip>
                    }
                  >
                    <BarChart className="nav_icon" />
                  </OverlayTrigger>
                )}

                <span className="nav_name">Thống Kê</span>
              </Link>
            </div>
          </div>
          <a className="nav_link" href="/" tabIndex="-1" onClick={logout}>
            <Logout className="nav_icon" />
            <span className="nav_name">Sign Out</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
