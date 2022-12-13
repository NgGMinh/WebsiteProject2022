/* eslint-disable jsx-a11y/anchor-is-valid */
import "./ClientSidebar.css";
import { useLocation } from "react-router-dom";
import { useEffect, React, useState } from "react";
import ClientDefaultSidebar from "./ClientDefaultSidebar";
import ClientMobileSidebar from "./ClientMobileSidebar";

// location.pathname;

export default function Sidebar() {
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 592;

  useEffect(() => {
    const routesName = [
      ["userhome", "Trang Chủ", ""],
      ["thongtintaikhoan", "Thông Tin Tài Khoản", ""],
      ["doimatkhau", "Đổi Mật Khẩu", ""],
      ["cuocthi", "Tất Cả Cuộc Thi", ""],
      ["tietmuc", "Tất Cả Tiết Mục", ""],
    ];
    let loca = window.location.href;
    routesName.forEach((route) => {
      if (loca.includes(route[0])) {
        if (route[2] === "") {
          document.getElementById(route[0]).classList.add("actives");
          document.title = route[1];
        } else {
          document.getElementById(route[2]).classList.add("actives");
          document.getElementById(route[0]).classList.add("actives-submenu");
          document.title = route[1];
        }
      } else {
        document.getElementById(route[0]).classList.remove("actives");
        document.getElementById(route[0]).classList.remove("actives-submenu");
      }
    });
  }, [location]);

  return (
    <>
      {
        // Sidebar For Mobile
        isMobile ? (
          <ClientMobileSidebar />
        ) : (
          // Default Sidebar
          <ClientDefaultSidebar />
        )
      }
    </>
  );
}
