import React from "react";
import MuiDatatable from "./MuiDatatable";

export default function BangCuocThiVanNghe(props) {

  return (
    <MuiDatatable
      title="Danh Sách Cuộc Thi Văn Nghệ"
      data={props.data}
      columns={props.columns}
      options={props.options}
    />
  );
}
