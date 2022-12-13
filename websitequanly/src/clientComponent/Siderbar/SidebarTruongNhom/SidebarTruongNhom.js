/* eslint-disable eqeqeq */
import { DateRange, Groups, Home, LockReset, ManageAccounts, ManageHistory } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

export default function SidebarTruongNhom() {
  return (
    <div className="nav_list">
      {/* Trang Chủ */}
      <Link
        to="/userhome"
        className="link text-decoration-none nav_link"
        id="userhome"
      >
        <Home className="nav_icon" />
        <span className="nav_name">Trang Chủ</span>
      </Link>

      <Link
        to="/cuocthithamdu"
        className="link text-decoration-none nav_link"
        id="cuocthi"
      >
        <DateRange className="nav_icon" />
        <span className="nav_name">Cuộc Thi Tham Dự</span>
      </Link>

      <Link
        to="/tietmucduthi"
        className="link text-decoration-none nav_link"
        id="tietmuc"
      >
        <ManageHistory className="nav_icon" />{" "}
        <span className="nav_name">Tiết Mục Dự Thi</span>
      </Link>
  
      <Link
        to="/thongtindoandoi"
        className="link text-decoration-none nav_link"
        id="tatcadoandoi"
        style={{display: localStorage.getItem("chucvu") == 3 ? "grid" : "none"}}
      >
        <Groups className="nav_icon" />
        <span className="nav_name">Thông Tin Đoàn Đội</span>
      </Link>

      <Link
        to="/thongtintaikhoan"
        className="link text-decoration-none nav_link"
        id="thongtintaikhoan"
      >
        <ManageAccounts className="nav_icon" />
        <span className="nav_name">Thông tin Tài khoản</span>
      </Link>

      <Link
        to="/doimatkhau"
        className="link text-decoration-none nav_link"
        id="doimatkhau"
      >
        <LockReset className="nav_icon" />
        <span className="nav_name">Đổi Mật Khẩu</span>
      </Link>
    </div>
  );
}
