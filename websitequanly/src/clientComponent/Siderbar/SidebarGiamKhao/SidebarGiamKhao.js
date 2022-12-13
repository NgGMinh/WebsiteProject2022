import { DateRange, Home, LockReset, ManageAccounts, ManageHistory } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

export default function SidebarGiamKhao() {
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
        to="/giamkhaocuocthi"
        className="link text-decoration-none nav_link"
        id="cuocthi"
      >
        <DateRange className="nav_icon" />
        <span className="nav_name">Cuộc Thi Văn Nghệ</span>
      </Link>

      <Link
        to="/tietmucdacham"
        className="link text-decoration-none nav_link"
        id="tietmuc"
      >
        <ManageHistory className="nav_icon" />{" "}
        <span className="nav_name">Tiết Mục Văn Nghệ</span>
      </Link>

      {/* Quản Lý Người Dùng */}
      <Link
        to="/thongtintaikhoan"
        className="link text-decoration-none nav_link"
        id="thongtintaikhoan"
      >
        <ManageAccounts className="nav_icon" />
        <span className="nav_name">Thông tin Tài khoản</span>
      </Link>

      {/* Tiết mục văn nghệ */}
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
