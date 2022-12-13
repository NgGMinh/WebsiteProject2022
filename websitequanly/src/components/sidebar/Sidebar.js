/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Sidebar.css";
import { useLocation } from "react-router-dom";
import { useEffect, React, useState } from "react";
import SidebarForMobile from "./SidebarForMobile";
import DefaultSidebar from "./DefaultSidebar";

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
      ["home", "Trang Chủ - Quản Lý Công tác văn nghệ", ""],
      ["quanlynguoidung", "Quản Lý Người dùng ", ""],
      ["tatcachuongtrinh", "Quản Lý Chương trình văn nghệ", ""],
      // [
      //   "tatcachuongtrinh",
      //   "Tất cả Chương trình văn nghệ",
      //   "chuongtrinhvannghe",
      // ],
      // ["themchuongtrinh", "Thêm Chương trình văn nghệ", "chuongtrinhvannghe"],
      ["cuocthivannghe", "Quản Lý Cuộc thi văn nghệ", ""],
      ["tatcacuocthi", "Tất cả Cuộc thi văn nghệ", "cuocthivannghe"],
      ["themcuocthi", "Thêm Cuộc thi văn nghệ", "cuocthivannghe"],
      ["dieuchinhthongtin", "Điểu Chỉnh Thông Tin", "cuocthivannghe"],
      ["tietmucvannghe", "Quản Lý Tiết Mục Văn Nghệ",""],
      ["doandoivannghe", "Quản Lý Đoàn đội Văn Nghệ", ""],
      ["tatcadoandoi", "Quản Lý Đoàn đội Văn Nghệ", "doandoivannghe"],
      ["themdoandoi", "Thêm Đoàn đội", "doandoivannghe"],
      ["thongke", "Quản Lý Thống Kê", ""],
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
          <SidebarForMobile />
        ) : (
          // Default Sidebar
          <DefaultSidebar />
        )
      }
    </>
  );
}
