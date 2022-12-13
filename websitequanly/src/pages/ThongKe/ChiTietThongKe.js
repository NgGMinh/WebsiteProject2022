/* eslint-disable eqeqeq */
import { Tabs, Tab } from "react-bootstrap";
import React from "react";
import MuiDatatable from "../../components/table/MuiDatatable";
import { useState } from "react";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import {
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Tooltip as MuiToolTip,
} from "@mui/material";
import { CloudDownload, ImportExport } from "@mui/icons-material";

export default function ChiTietThongKe(props) {
  const XLSX = require("xlsx");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickDownloadIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDownloadIcon = () => {
    setAnchorEl(null);
  };

  const [tableBodyHeightCT, setTableBodyHeightCT] = useState("480px");
  const [rowsPerPageCT, setRowsPerPageCT] = useState(5);

  const [tableBodyHeightTMTD, setTableBodyHeightTMTD] = useState("480px");
  const [rowsPerPageTMTD, setRowsPerPageTMTD] = useState(5);

  const [tableBodyHeightTMTCT, setTableBodyHeightTMTCT] = useState("480px");
  const [rowsPerPageTMTCT, setRowsPerPageTMTCT] = useState(5);

  const [tableBodyHeightTS, setTableBodyHeightTS] = useState("400px");
  const [rowsPerPageTS, setRowsPerPageTS] = useState(5);

  const columnsThiSinh = [
    {
      name: "stt",
      label: "STT",
      options: {
        filter: false,
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ width: "80px", textAlign: "center" }}>{value}</div>
          );
        },
        sortThirdClickReset: true,
        sortDescFirst: true,
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
      name: "GioiTinh",
      label: "Giới Tính",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
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
      name: "Email",
      label: "Email Thí Sinh",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
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
      name: "TenDonVi",
      label: "Thuộc Đơn Vị",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "220px" }}>{value}</div>;
        },
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
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPageTS,
    selectableRows: "none",

    downloadOptions: {
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
    onDownload: (buildHead, buildBody, columns, values) => {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      // console.log(values.forEach((val) => console.log(val)));

      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);

      const fileName = `DanhSachThiSinh`;
      const ws = utils.json_to_sheet(json);
      const header = Object.keys(json[0]); // columns name
      var wscols = [];
      for (var i = 0; i < header.length; i++) {
        // columns length added
        wscols.push({ wch: header[i].length + 10 });
      }
      ws["!cols"] = wscols;
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
        viewColumns: "Ẩn/ Hiện Cột",
        filterTable: "Lọc Bảng",
      },
      filter: {
        all: "All",
        title: "LỌC BẢNG",
        reset: "RESET",
      },
      viewColumns: {
        title: "ẨN/ HIỆN CỘT",
        titleAria: "ẨN/ HIỆN CỘT",
      },
    },
  };

  const columnsTietMucTuDo = [
    {
      name: "MaCuocThi",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    {
      name: "MaTietMuc",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
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
      name: "TenTietMuc",
      label: "Tên Tiết Mục",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "180px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenLoaiTietMuc",
      label: "Loại Tiết Mục",
      options: {
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "SapLich",
      label: "Sắp Lịch",
      options: {
        filterType: "multiselect",
        display: false,
        viewColumns: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "NgayGioThucHien",
      label: "Thời Gian Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "VongThi",
      label: "Vòng Thi",
      options: {
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "TrinhBay",
      label: "Trình Bày",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "280px" }}>{value}</div>;
        },
      },
    },
    {
      name: "ChamDiem",
      label: "Chấm Điểm",
      options: {
        filterType: "multiselect",
        display: false,
        viewColumns: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "DiemTrungBinh",
      label: "Điểm Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "KetQua",
      label: "Kết Quả",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "220px" }}>
              {value == null ? "Không" : value}
            </div>
          );
        },
      },
    },
  ];

  const optionsTietMucTuDo = {
    search: true,
    searchPlaceholder: "Tên Tiết mục, loại tiết mục, ngày diễn,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPageTMTD,
    selectableRows: "none",

    downloadOptions: {
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
    onDownload: (buildHead, buildBody, columns, values) => {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      // console.log(values.forEach((val) => console.log(val)));

      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);

      const fileName = `DanhSachTietMuc`;
      const ws = utils.json_to_sheet(json);
      const header = Object.keys(json[0]); // columns name
      var wscols = [];
      for (var i = 0; i < header.length; i++) {
        // columns length added
        wscols.push({ wch: header[i].length + 10 });
      }
      ws["!cols"] = wscols;
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
        viewColumns: "Ẩn/ Hiện Cột",
        filterTable: "Lọc Bảng",
      },
      filter: {
        all: "All",
        title: "LỌC BẢNG",
        reset: "RESET",
      },
      viewColumns: {
        title: "ẨN/ HIỆN CỘT",
        titleAria: "ẨN/ HIỆN CỘT",
      },
    },
  };

  const columnsTietMucChuongTrinh = [
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
      name: "TenTietMuc",
      label: "Tên Tiết Mục",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "220px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenLoaiTietMuc",
      label: "Loại Tiết Mục",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "NhanSo",
      label: "Nhân Số",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ width: "60px", textAlign: "center" }}>{value}</div>
          );
        },
      },
    },
    {
      name: "DiemTrungBinh",
      label: "Điểm Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {value == "Chưa chấm" ? (
                <div>{value}</div>
              ) : (
                <div style={{ maxWidth: "70px", textAlign: "center" }}>
                  {value}
                </div>
              )}
            </>
          );
        },
      },
    },
    {
      name: "TenChuongTrinh",
      label: "Thuộc Chương Trình",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "ChamDiem",
      label: "Chấm Điểm",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        display: false,
        viewColumns: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
  ];

  const optionsTietMucChuongTrinh = {
    search: true,
    searchPlaceholder: "Tên Tiết mục, loại tiết muc, ngày diễn...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPageTMTCT,
    selectableRows: "none",

    downloadOptions: {
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
    onDownload: (buildHead, buildBody, columns, values) => {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      // console.log(values.forEach((val) => console.log(val)));

      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);

      const fileName = `DanhSachTietMuc`;
      const ws = utils.json_to_sheet(json);
      const header = Object.keys(json[0]); // columns name
      var wscols = [];
      for (var i = 0; i < header.length; i++) {
        // columns length added
        wscols.push({ wch: header[i].length + 10 });
      }
      ws["!cols"] = wscols;
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
        viewColumns: "Ẩn/ Hiện Cột",
        filterTable: "Lọc Bảng",
      },
      filter: {
        all: "All",
        title: "LỌC BẢNG",
        reset: "RESET",
      },
      viewColumns: {
        title: "ẨN/ HIỆN CỘT",
        titleAria: "ẨN/ HIỆN CỘT",
      },
    },
  };

  const columnsChuongTrinh = [
    // ID
    {
      name: "MaChuongTrinh",
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
    //STT
    {
      name: "stt",
      label: "STT",
      options: {
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "35px" }}>{value}</div>;
        },
      },
    },
    //Tên Chương Trình
    {
      name: "TenChuongTrinh",
      label: "Tên Chương Trình",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "240px" }}>{value}</div>;
        },
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "SapLich",
      label: "Sắp Lịch",
      options: {
        display: false,
        viewColumns: false,
        sort: false,
        disableColumnMenu: false,
        filterType: "multiselect",
      },
    },
    //Ngày Giờ Tổ Chức
    {
      name: "NgayGioToChuc",
      label: "Thời Gian Thi",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "ChamDiem",
      label: "Chấm Điểm",
      options: {
        display: false,
        filter: true,
        filterType: "multiselect",
        viewColumns: false,
        sort: false,
        disableColumnMenu: false,
      },
    },
    //Thuộc Khoa
    {
      name: "TenDonVi",
      label: "Đơn vị Tổ chức",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "180px" }}>{value}</div>;
        },
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },

    //Điểm Trung Bình
    {
      name: "DiemTrungBinh",
      label: "Điểm TB",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },
    //Giải Thưởng
    {
      name: "TenGiaiThuong",
      label: "Giải Thưởng",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },
  ];

  const optionsChuongTrinh = {
    search: true,
    searchPlaceholder: "Tên Chương Trình, Địa Điểm, Ngày Tổ Chức,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPageCT,
    selectableRows: "none",
    customToolbar: () => {
      return (
        <>
          <MuiToolTip title={"Xuất Danh Sách Chi Tiết"}>
            <IconButton
              className="icon-hover"
              onClick={handleDownLoadDanhSachChiTietChuongTrinh}
            >
              <ImportExport />
            </IconButton>
          </MuiToolTip>
        </>
      );
    },
    downloadOptions: {
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
    onDownload: (buildHead, buildBody, columns, values) => {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);

      const fileName = `DanhSachChuongTrinh`;
      const ws = utils.json_to_sheet(json);
      const header = Object.keys(json[0]); // columns name
      var wscols = [];
      for (var i = 0; i < header.length; i++) {
        // columns length added
        wscols.push({ wch: header[i].length + 10 });
      }
      ws["!cols"] = wscols;
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      saveAs(data, fileName + fileExtension);

      return false;
    },
    textLabels: {
      toolbar: {
        downloadCsv: "Xuất Excel",
        search: "Tìm Kiếm",
        viewColumns: "Ẩn/ Hiện Cột",
        filterTable: "Lọc Bảng",
      },
      filter: {
        all: "All",
        title: "LỌC BẢNG",
        reset: "RESET",
      },
      viewColumns: {
        title: "ẨN/ HIỆN CỘT",
        titleAria: "ẨN/ HIỆN CỘT",
      },
    },
  };

  const handleDownLoadDanhSachChuongTrinh = () => {
    let json = [];
    props.dataChuongTrinh.forEach((d) => {
      json.push({
        STT: d.stt,
        "Tên Chương Trình": d.TenChuongTrinh,
        "Thời Gian Thi": d.NgayGioToChuc,
        "Đơn vị Tổ chức": d.TenDonVi,
        Điểm: d.DiemTrungBinh,
        "Giải Thưởng": d.TenGiaiThuong,
      });
    });
    const fileExtension = ".xlsx";

    // console.log(values.forEach((val) => console.log(val)));
    const workbook = XLSX.utils.book_new();

    let data = utils.json_to_sheet(json);

    const header = Object.keys(json[0]); // columns name
    var wscols = [];
    for (var i = 0; i < header.length; i++) {
      // columns length added
      wscols.push({ wch: header[i].length + 10 });
    }
    data["!cols"] = wscols;
    XLSX.utils.book_append_sheet(workbook, data, "DanhSachChuongTrinh");
    const fileName = `DanhSachChuongTrinh`;
    XLSX.writeFile(workbook, fileName + fileExtension, { compression: true });
  };

  const handleDownLoadDanhSachChiTietChuongTrinh = () => {
    let json = [];
    props.dataChuongTrinh.forEach((d) => {
      json.push({
        "Tên Chương Trình": d.TenChuongTrinh,
        "Thời Gian Thi": d.NgayGioToChuc,
        "Đơn vị Tổ chức": d.TenDonVi,
        "Điểm Trung Bình": d.DiemTrungBinh,
        "Giải Thưởng": d.TenGiaiThuong,
      });
    });
    const fileExtension = ".xlsx";
    // console.log(values.forEach((val) => console.log(val)));
    const workbook = XLSX.utils.book_new();

    json.forEach((t) => {
      let arr = [];
      arr.push({
        "Tên Chương Trình": t["Tên Chương Trình"],
        "Thời Gian Thi": t["Thời Gian Thi"],
        "Đơn vị Tổ chức": t["Đơn vị Tổ chức"],
        "Điểm Trung Bình": t["Điểm Trung Bình"],
        "Giải Thưởng": t["Giải Thưởng"],
      });

      let ctct = props.dataChiTietChuongTrinh.filter((d) => {
        return d["Tên Chương Trình"] == t["Tên Chương Trình"];
      });

      let arr2 = [];
      ctct.forEach((d) => {
        let narr = [];
        narr.push({
          "Tên Tiết Mục": d["Tên Tiết Mục"],
          "Loại Tiết Mục": d["Loại Tiết Mục"],
          "Nhân Số": d["Nhân Số"],
          "Điểm Thi": d["Điểm Thi"],
        });
        arr2.push(narr[0]);
      });

      let data = utils.json_to_sheet(arr);
      XLSX.utils.sheet_add_json(data, arr2, {
        origin: "A4",
      });

      const header = Object.keys(arr[0]); // columns name
      var wscols = [];
      for (var i = 0; i < header.length; i++) {
        // columns length added
        wscols.push({ wch: header[i].length + 10 });
      }
      data["!cols"] = wscols;

      // console.log(utils.json_to_sheet(arr));
      XLSX.utils.book_append_sheet(
        workbook,
        data,
        t["Đơn vị Tổ chức"].length > 31
          ? `${t["Đơn vị Tổ chức"].slice(0, 28)}...`
          : t["Đơn vị Tổ chức"]
      );
    });

    const fileName = `DanhSachChiTietChuongTrinh`;
    XLSX.writeFile(workbook, fileName + fileExtension, { compression: true });
    // saveAs(data, fileName + fileExtension);
    // cancel default  CSV download from table
    return false;
  };

  return (
    <>
      <Tabs
        defaultActiveKey={props.phanThi == null ? "chuongtrinh" : "tietmuc"}
        id="uncontrolled-tab-example"
        className="responsive-tab mb-3"
      >
        {props.phanThi == null ? (
          <Tab
            eventKey="chuongtrinh"
            title="Danh Sách Chương Trình"
            style={{ minHeight: "600px", width: "100%" }}
          >
            <div>
              <MuiDatatable
                title="Danh Sách Chương Trình Dự Thi"
                data={props.dataChuongTrinh}
                columns={columnsChuongTrinh}
                options={optionsChuongTrinh}
              />
            </div>
          </Tab>
        ) : (
          <></>
        )}
        <Tab
          eventKey="tietmuc"
          title="Danh Sách Tiết Mục Dự Thi"
          style={{ minHeight: "600px", width: "100%" }}
        >
          <div>
            {props.phanThi == null ? (
              <MuiDatatable
                title="Danh Sách Tiết Mục Dự Thi"
                data={props.dataTietMuc}
                columns={columnsTietMucChuongTrinh}
                options={optionsTietMucChuongTrinh}
              />
            ) : (
              <MuiDatatable
                title="Danh Sách Tiết Mục Dự Thi"
                data={props.dataTietMuc}
                columns={columnsTietMucTuDo}
                options={optionsTietMucTuDo}
              />
            )}
          </div>
        </Tab>
        <Tab
          eventKey="thisinh"
          title="Danh Sách Thí Sinh"
          style={{ minHeight: "600px", width: "100%" }}
        >
          <div>
            <MuiDatatable
              title="Danh Sách Thí Sinh"
              data={props.dataThiSinh}
              columns={columnsThiSinh}
              options={optionsThiSinh}
            />
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
