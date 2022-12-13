import React from "react";
import MuiDatatable from "./MuiDatatable";

export default function BangNguoiDung(props) {
  
  return (
    <MuiDatatable
      title={props.title}
      data={props.data}
      columns={props.columns}
      options={props.options}
    />
  );
}
