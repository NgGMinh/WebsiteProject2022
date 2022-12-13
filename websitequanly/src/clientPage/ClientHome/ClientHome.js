import React from "react";
import GiamKhaoHome from "../GiamKhao/GiamKhaoHome/GiamKhaoHome";
import TruongNhomHome from "../TruongNhom/TruongNhomHome/TruongNhomHome";

export default function ClientHome() {
  return (
    <>
      {localStorage.getItem("chucvu") == 2 ? (
        <GiamKhaoHome />
      ) : (
        <TruongNhomHome />
      )}
    </>
  );
}
