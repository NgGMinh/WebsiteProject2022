/* eslint-disable eqeqeq */
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import img404NotFound from "../../img/404-not-found.jpg";

export default function NotFound() {
  return (
    <div className="not-found">
      <img
        src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
        alt="not-found"
      />
      <div className="pt-4">
        <Link to={localStorage.getItem("chucvu") == 1 ? "/home" : "/userhome"} className="link-home">
          <b>Go Back Home</b>
        </Link>
      </div>
    </div>
  );
}
