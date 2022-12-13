import React from "react";
import MuiDatatable from "./MuiDatatable";

export default function BangTietMuc(props) {
  
  return (
    <MuiDatatable
      title="Danh Sách Tiết Mục"
      data={props.data}
      columns={props.columns}
      options={props.options}
    />
  );
}
