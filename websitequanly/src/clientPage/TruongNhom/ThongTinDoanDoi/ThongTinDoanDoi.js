/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import MuiDatatable from "../../../components/table/MuiDatatable";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function ThongTinDoanDoi(props) {
  const [dataThanhVien, setDataThanhVien] = useState([]);
  const [tenDoanDoi, setTenDoanDoi] = useState();
  const [donViToChuc, setDonViToChuc] = useState(1);
  const [soLuongThanhVien, setSoLuongThanhVien] = useState(1);

  const [moTaDoanDoi, setMoTaDoanDoi] = useState("");

  useEffect(() => {
    const getDetailDoanDoi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/thongtindoandoi/${props.maDoanDoi}`
      );
      setTenDoanDoi(data[0].TenDoanDoi);
      setDonViToChuc(data[0].TenDonVi);
      setSoLuongThanhVien(data[0].SoLuongThanhVien);
      setMoTaDoanDoi(data[0].MoTaDoanDoi);
    };
    getDetailDoanDoi();
  }, []);

  useEffect(() => {
    const getDataThanhVien = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/allthanhvien/${props.maDoanDoi}}`
      );
      data.forEach((d) => (d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ"));
      setDataThanhVien(data);
    };
    getDataThanhVien();
  }, []);

  const columnsThiSinh = [
    {
      name: "MaThiSinh",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        sort: false,
        disableColumnMenu: false,
        download: false,
        print: false,
      },
    },
    {
      name: "stt",
      label: "STT",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "35px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenThiSinh",
      label: "Họ Tên",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "MaDinhDanh",
      label: "Mã Định Danh",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "GioiTinh",
      label: "Giới Tính",
      options: {
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "Email",
      label: "Email Thành Viên",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "Phone",
      label: "Phone",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "MaLop",
      label: "Mã Lớp",
      options: {
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
  ];

  const optionsThiSinh = {
    search: true,
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "none",
    selectToolbarPlacement: "none",
    onRowsDelete: (rowsDeleted, newData) => {
      // console.log("rowsDeleted");
      // console.dir(rowsDeleted);
      // console.dir(newData);
      // window.alert("were deleted!");
    },
    onTableChange: (action, state) => {
      // console.log(action);
      // console.dir(state);
    },
    onDownload: (buildHead, buildBody, columns, values) => {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          if (idx > 0 && idx < 8) temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);

      const fileName = `DanhSachThanhVien`;
      const ws = utils.json_to_sheet(json);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      saveAs(data, fileName + fileExtension);
      // cancel default  CSV download from table
      return false;
    },

    textLabels: {
      toolbar: {
        downloadCsv: "Xuất Excel",
        search: "Tìm Kiếm",
        viewColumns: "Ẩn/ Hiện Các Cột",
        filterTable: "Lọc Bảng",
      },
      filter: {
        all: "All",
        title: "LỌC BẢNG",
        reset: "RESET",
      },
      viewColumns: {
        title: "ẨN/ HIỆN CÁC CỘT",
        titleAria: "ẨN/ HIỆN CÁC CỘT",
      },
    },
  };

  return (
    <div className="mb-4">
      <p style={{ fontWeight: "500" }}>
        <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
        &nbsp;Tên Đoàn Đội:&nbsp;
        <span style={{ fontWeight: "400" }}>{tenDoanDoi}.</span>
        &nbsp;Thuộc Đơn vị:&nbsp;
        <span style={{ fontWeight: "400" }}>{donViToChuc}.</span>
        &nbsp;Số Lượng Thành Viên:&nbsp;
        <span style={{ fontWeight: "400" }}>{soLuongThanhVien}.&nbsp;</span>
      </p>
      <p className="d-flex align-items-center" style={{ fontWeight: "500" }}>
        <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
        &nbsp;Mô tả Đoàn Đội:&nbsp;
      </p>
      <div
        style={{ paddingLeft: "15px" }}
        dangerouslySetInnerHTML={{ __html: moTaDoanDoi }}
      ></div>
      <div style={{padding: "25px 12px"}}>
        <MuiDatatable
          title={"Danh sách Thành viên"}
          data={dataThanhVien}
          columns={columnsThiSinh}
          options={optionsThiSinh}
        />
      </div>
    </div>
  );
}
