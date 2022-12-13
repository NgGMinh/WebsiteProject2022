import React from "react";
import MuiDatatable from "./MuiDatatable";

export default function BangThiSinh(props) {
  
  return (
    <MuiDatatable
      title="Danh Sách Thí Sinh"
      data={props.data}
      columns={props.columns}
      options={props.options}
    />
  );
}
