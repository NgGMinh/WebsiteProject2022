import React from "react";
import MuiDatatable from "./MuiDatatable";

export default function BangDoanDoi(props) {
  
  return (
    <MuiDatatable
      title="Danh Sách Đoàn Đội"
      data={props.data}
      columns={props.columns}
      options={props.options}
    />
  );
}
