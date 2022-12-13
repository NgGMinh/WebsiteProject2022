import React from "react";

import MuiDatatable from "./MuiDatatable";

export default function BangChuongTrinhVanNghe(props) {

  return (
    <MuiDatatable
      title="Danh Sách Chương Trình Văn Nghệ"
      data={props.data}
      columns={props.columns}
      options={props.options}
    />
  );
}
