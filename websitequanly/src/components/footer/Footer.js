import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div
      className="text-footer py-2 px-4 mt-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", fontSize: "1rem" }}
      id="footer"
    >
      <div>
        © 2022 Copyright: &nbsp;
        <Link to="/" className="fw-bold text-decoration-none">
          Đại Học Cần Thơ - CTU
        </Link>
      </div>
    </div>
  );
}
