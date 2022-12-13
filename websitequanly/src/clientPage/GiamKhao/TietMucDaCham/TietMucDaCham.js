/* eslint-disable eqeqeq */
import { Row, Col, Form, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ManageSearch, MusicNote, Visibility } from "@mui/icons-material";
import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import MuiDatatable from "../../../components/table/MuiDatatable";
import TopBar from "../../../components/topbars/TopBar";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "../../../components/footer/Footer";
import Sidebar from "../../../clientComponent/Siderbar/Sidebar";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";


export default function TietMucDaCham() {
  const navigate = useNavigate();
  const dayjs = require("dayjs");

  const [dataNguyenBanTD, setDataNguyenBanTD] = useState([]);
  const [pageTD, setPageTD] = useState(0);
  const [batDauTD, setBatDauTD] = useState(null);
  const [ketThucTD, setKetThucTD] = useState(null);
  const [selectRadioTD, setSelectRadioTD] = useState(1);

  const handleRadioChangeTD = (e) => {
    setBatDauTD(null);
    setKetThucTD(null);
    setSelectRadioTD(e.target.value);
  };

  const handleFilterTD = () => {
    if (batDauTD == null)
      alert('Chưa chọn "Ngày" hoặc "Tháng" hoặc "Năm" Bắt đầu!');
    else if (ketThucTD == null)
      alert('Chưa chọn "Ngày" hoặc "Tháng" hoặc "Năm" Kết thúc!');
    else {
      if (selectRadioTD == 1) {
        Axios.post(
          `http://localhost:3001/api/client/alltietmucdachamdiem/${localStorage.getItem(
            "MaNguoiDung"
          )}/ngay`,
          {
            NgayBatDau: batDauTD,
            NgayKetThuc: ketThucTD,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.DiemTrungBinh == null) {
              d.DaCham = "Chưa chấm";
            } else {
              d.DaCham = "Đã chấm";
            }
            if (d.CongBoKetQua == 1) {
              if (d.TrangThai == 1) d.TrangThai = "Đạt";
              else d.TrangThai = "Không Đạt";
              if (d.SoVongThi == d.VongThi) {
                d.TrangThai = d.TenGiaiThuong;
              }
            }
            if (d.CongBoKetQua == 0) {
              d.DiemTrungBinh = "CCB";
              d.TrangThai = "CCB";
            }
            if (d.DiemTrungBinh == null) {
              d.DiemTrungBinh = "CCB";
              d.TrangThai = "CCB";
            }

            if (d.SoVongThi == d.VongThi) {
              d.VongThi = "Chung kết";
            }
            if (d.SoVongThi == 3) {
              if (d.VongThi == 2) d.VongThi = "Chung khảo";
            }
            if (d.VongThi == 1) d.VongThi = "Sơ tuyển";
            if (d.VongThi == 0) d.VongThi = "Thi Chương Trình";
            if (d.VongThi == "Thi Chương Trình") {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "Từ HH:mm, DD/MM/YYYY"
              );
              d.TrangThai = "Không xét";
            } else if (d.NgayGioThucHien == null) {
              d.NgayGioThucHien = "Chưa sắp lịch";
              d.SapLich = "Chưa sắp lịch";
            } else {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "HH:mm, DD/MM/YYYY"
              );
              d.SapLich = "Đã sắp lịch";
            }
          });
          setDataTietMuc(data);
          setPageTD(0);
        });
      }
      if (selectRadioTD == 2) {
        Axios.post(
          `http://localhost:3001/api/client/alltietmucdachamdiem/${localStorage.getItem(
            "MaNguoiDung"
          )}/thang`,
          {
            NgayBatDau: batDauTD,
            NgayKetThuc: ketThucTD,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.DiemTrungBinh == null) {
              d.DaCham = "Chưa chấm";
            } else {
              d.DaCham = "Đã chấm";
            }
            if (d.CongBoKetQua == 1) {
              if (d.TrangThai == 1) d.TrangThai = "Đạt";
              else d.TrangThai = "Không Đạt";
              if (d.SoVongThi == d.VongThi) {
                d.TrangThai = d.TenGiaiThuong;
              }
            }
            if (d.CongBoKetQua == 0) {
              d.DiemTrungBinh = "CCB";
              d.TrangThai = "CCB";
            }
            if (d.DiemTrungBinh == null) {
              d.DiemTrungBinh = "CCB";
              d.TrangThai = "CCB";
            }

            if (d.SoVongThi == d.VongThi) {
              d.VongThi = "Chung kết";
            }
            if (d.SoVongThi == 3) {
              if (d.VongThi == 2) d.VongThi = "Chung khảo";
            }
            if (d.VongThi == 1) d.VongThi = "Sơ tuyển";
            if (d.VongThi == 0) d.VongThi = "Thi Chương Trình";
            if (d.VongThi == "Thi Chương Trình") {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "Từ HH:mm, DD/MM/YYYY"
              );
              d.TrangThai = "Không xét";
            } else if (d.NgayGioThucHien == null) {
              d.NgayGioThucHien = "Chưa sắp lịch";
              d.SapLich = "Chưa sắp lịch";
            } else {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "HH:mm, DD/MM/YYYY"
              );
              d.SapLich = "Đã sắp lịch";
            }
          });
          setDataTietMuc(data);
          setPageTD(0);
        });
      }
      if (selectRadioTD == 3) {
        Axios.post(
          `http://localhost:3001/api/client/alltietmucdachamdiem/${localStorage.getItem(
            "MaNguoiDung"
          )}/nam`,
          {
            NgayBatDau: batDauTD,
            NgayKetThuc: ketThucTD,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.DiemTrungBinh == null) {
              d.DaCham = "Chưa chấm";
            } else {
              d.DaCham = "Đã chấm";
            }
            if (d.CongBoKetQua == 1) {
              if (d.TrangThai == 1) d.TrangThai = "Đạt";
              else d.TrangThai = "Không Đạt";
              if (d.SoVongThi == d.VongThi) {
                d.TrangThai = d.TenGiaiThuong;
              }
            }
            if (d.CongBoKetQua == 0) {
              d.DiemTrungBinh = "CCB";
              d.TrangThai = "CCB";
            }
            if (d.DiemTrungBinh == null) {
              d.DiemTrungBinh = "CCB";
              d.TrangThai = "CCB";
            }

            if (d.SoVongThi == d.VongThi) {
              d.VongThi = "Chung kết";
            }
            if (d.SoVongThi == 3) {
              if (d.VongThi == 2) d.VongThi = "Chung khảo";
            }
            if (d.VongThi == 1) d.VongThi = "Sơ tuyển";
            if (d.VongThi == 0) d.VongThi = "Thi Chương Trình";
            if (d.VongThi == "Thi Chương Trình") {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "Từ HH:mm, DD/MM/YYYY"
              );
              d.TrangThai = "Không xét";
            } else if (d.NgayGioThucHien == null) {
              d.NgayGioThucHien = "Chưa sắp lịch";
              d.SapLich = "Chưa sắp lịch";
            } else {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "HH:mm, DD/MM/YYYY"
              );
              d.SapLich = "Đã sắp lịch";
            }
          });
          setDataTietMuc(data);
          setPageTD(0);
        });
      }
    }
  };

  const [dataNguyenBanTCT, setDataNguyenBanTCT] = useState([]);
  const [pageTCT, setPageTCT] = useState(0);
  const [batDauTCT, setBatDauTCT] = useState(null);
  const [ketThucTCT, setKetThucTCT] = useState(null);
  const [selectRadioTCT, setSelectRadioTCT] = useState(1);

  const handleRadioChangeTCT = (e) => {
    setBatDauTCT(null);
    setKetThucTCT(null);
    setSelectRadioTCT(e.target.value);
  };

  const handleFilterTCT = () => {
    if (batDauTCT == null)
      alert('Chưa chọn "Ngày" hoặc "Tháng" hoặc "Năm" Bắt đầu!');
    else if (ketThucTCT == null)
      alert('Chưa chọn "Ngày" hoặc "Tháng" hoặc "Năm" Kết thúc!');
    else {
      if (selectRadioTCT == 1) {
        Axios.post(
          `http://localhost:3001/api/client/alltietmucchuongtrinhdachamdiem/${localStorage.getItem(
            "MaNguoiDung"
          )}/ngay`,
          {
            NgayBatDau: batDauTCT,
            NgayKetThuc: ketThucTCT,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.DiemTrungBinh == null) {
              d.DiemTrungBinh = "Chưa chấm";
              d.ChamDiem = "Chưa chấm";
            } else {
              d.ChamDiem = "Đã chấm";
            }
            if (d.NgayGioThucHien == null) {
              d.NgayGioThucHien = "Chưa sắp lịch";
              d.SapLich = "Chưa sắp lịch";
            } else {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "Từ HH:mm, DD/MM/YYYY"
              );
              d.SapLich = "Đã sắp lịch";
            }
          });
          setDataTietMucChuongTrinh(data);
          setPageTCT(0);
        });
      }
      if (selectRadioTCT == 2) {
        Axios.post(
          `http://localhost:3001/api/client/alltietmucchuongtrinhdachamdiem/${localStorage.getItem(
            "MaNguoiDung"
          )}/thang`,
          {
            NgayBatDau: batDauTCT,
            NgayKetThuc: ketThucTCT,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.DiemTrungBinh == null) {
              d.DiemTrungBinh = "Chưa chấm";
              d.ChamDiem = "Chưa chấm";
            } else {
              d.ChamDiem = "Đã chấm";
            }
            if (d.NgayGioThucHien == null) {
              d.NgayGioThucHien = "Chưa sắp lịch";
              d.SapLich = "Chưa sắp lịch";
            } else {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "Từ HH:mm, DD/MM/YYYY"
              );
              d.SapLich = "Đã sắp lịch";
            }
          });
          setDataTietMucChuongTrinh(data);
          setPageTCT(0);
        });
      }
      if (selectRadioTCT == 3) {
        Axios.post(
          `http://localhost:3001/api/client/alltietmucchuongtrinhdachamdiem/${localStorage.getItem(
            "MaNguoiDung"
          )}/nam`,
          {
            NgayBatDau: batDauTCT,
            NgayKetThuc: ketThucTCT,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.DiemTrungBinh == null) {
              d.DiemTrungBinh = "Chưa chấm";
              d.ChamDiem = "Chưa chấm";
            } else {
              d.ChamDiem = "Đã chấm";
            }
            if (d.NgayGioThucHien == null) {
              d.NgayGioThucHien = "Chưa sắp lịch";
              d.SapLich = "Chưa sắp lịch";
            } else {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "Từ HH:mm, DD/MM/YYYY"
              );
              d.SapLich = "Đã sắp lịch";
            }
          });
          setDataTietMucChuongTrinh(data);
          setPageTCT(0);
        });
      }
    }
  };

  const columnsTietMuc = [
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ padding: "20px" }}>{value}</div>;
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ padding: "10px" }}>STT</div>;
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
          return <div style={{ maxWidth: "160px" }}>{value}</div>;
        },
      },
    },

    {
      name: "TenLoaiTietMuc",
      label: "Loại",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "100px" }}>{value}</div>;
        },
      },
    },
    {
      name: "NgayGioThucHien",
      label: "Ngày Diễn",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "100px" }}>{value}</div>;
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
          return (
            <div style={{ maxWidth: "150px" }}>
              {value.length <= 30 ? (
                value
              ) : (
                <>
                  <div>
                    <OverlayTrigger
                      placement={"bottom"}
                      overlay={
                        <Tooltip>
                          <strong>{value}</strong>.
                        </Tooltip>
                      }
                    >
                      <span>{value.slice(0, 30)}...</span>
                    </OverlayTrigger>
                  </div>
                </>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "VongThi",
      label: "Vòng Thi",
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
      name: "TenCuocThi",
      label: "Thuộc Cuộc Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "180px" }}>
              {value.length <= 41 ? (
                value
              ) : (
                <div>
                  <OverlayTrigger
                    placement={"bottom"}
                    overlay={
                      <Tooltip>
                        <strong>{value}</strong>.
                      </Tooltip>
                    }
                  >
                    <span>{value.slice(0, 41)}...</span>
                  </OverlayTrigger>
                </div>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "DiemSo", 
      label: "Điểm",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "6px" }}>{value}</div>;
        },
      },
    },
    {
      name: "DiemTrungBinh",
      label: "ĐTB",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "4px" }}>{value}</div>;
        },
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        print: false,
        viewColumns: false,
        disableColumnMenu: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => {
                navigate(`/chitietcuocthi/tudo/${tableMeta.rowData[0]}`);
              }}
            >
              <Visibility />
            </IconButton>
          );
        },
      },
    },
  ];

  const optionsTietMuc = {
    search: true,
    searchPlaceholder: "Tên Thí Sinh, Mssv, Email,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
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

  const columnsTietMucCT = [
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
      name: "MaChuongTrinh",
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

        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ padding: "20px" }}>{value}</div>;
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ padding: "10px" }}>STT</div>;
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
          return <div style={{ maxWidth: "160px" }}>{value}</div>;
        },
      },
    },

    {
      name: "TenLoaiTietMuc",
      label: "Loại",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "100px" }}>{value}</div>;
        },
      },
    },
    {
      name: "NgayGioThucHien",
      label: "Ngày Diễn",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "100px" }}>{value}</div>;
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
          return (
            <div style={{ maxWidth: "180px" }}>
              {value.length > 40 ? `${value.slice(0, 40)}...` : value}
            </div>
          );
        },
      },
    },
    {
      name: "TenCuocThi",
      label: "Thuộc Cuộc Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "240px" }}>{value}</div>;
        },
      },
    },
    {
      name: "DiemSo",
      label: "Điểm",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "6px" }}>{value}</div>;
        },
      },
    },
    {
      name: "DiemTrungBinh",
      label: "ĐTB",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "4px" }}>{value}</div>;
        },
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        print: false,
        disableColumnMenu: true,
        viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => {
                navigate(
                  `/chitietcuocthi/truyenthong/${tableMeta.rowData[0]}/chitietchuongtrinh/${tableMeta.rowData[2]}/chamdiem`
                );
              }}
            >
              <Visibility />
            </IconButton>
          );
        },
      },
    },
  ];

  const optionsTietMucCT = {
    search: true,
    searchPlaceholder: "Tên Thí Sinh, Mssv, Email,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
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

  const [dataTietMuc, setDataTietMuc] = useState([]);
  const [dataTietMucChuongTrinh, setDataTietMucChuongTrinh] = useState([]);

  useEffect(() => {
    const getDataTietMuc = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/alltietmucdachamdiem/${localStorage.getItem(
          "MaNguoiDung"
        )}`
      );
      data.forEach((d) => {
        if (d.DiemTrungBinh == null) {
          d.DaCham = "Chưa chấm";
        } else {
          d.DaCham = "Đã chấm";
        }
        if (d.CongBoKetQua == 1) {
          if (d.TrangThai == 1) d.TrangThai = "Đạt";
          else d.TrangThai = "Không Đạt";
          if (d.SoVongThi == d.VongThi) {
            d.TrangThai = d.TenGiaiThuong;
          }
        }
        if (d.CongBoKetQua == 0) {
          d.TrangThai = "CCB";
        }
        if (d.DiemTrungBinh == null) {
          d.DiemTrungBinh = "CCĐ";
          d.TrangThai = "CCB";
        }

        if (d.SoVongThi == d.VongThi) {
          d.VongThi = "Chung kết";
        }
        if (d.SoVongThi == 3) {
          if (d.VongThi == 2) d.VongThi = "Chung khảo";
        }
        if (d.VongThi == 1) d.VongThi = "Sơ tuyển";
        if (d.VongThi == 0) d.VongThi = "Thi Chương Trình";
        if (d.VongThi == "Thi Chương Trình") {
          d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
            "HH:mm, DD/MM/YYYY"
          );
          d.TrangThai = "Không xét";
        } else if (d.NgayGioThucHien == null) {
          d.NgayGioThucHien = "Chưa sắp lịch";
          d.SapLich = "Chưa sắp lịch";
        } else {
          d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
            "HH:mm, DD/MM/YYYY"
          );
          d.SapLich = "Đã sắp lịch";
        }
      });
      setDataNguyenBanTD(data);
      setDataTietMuc(data);
    };
    getDataTietMuc();

    const getDataTietMucChuongTrinh = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/alltietmucchuongtrinhdachamdiem/${localStorage.getItem(
          "MaNguoiDung"
        )}`
      );
      data.forEach((d) => {
        if (d.DiemTrungBinh == null) {
          d.DiemTrungBinh = "Chưa chấm";
          d.ChamDiem = "Chưa chấm";
        } else {
          d.ChamDiem = "Đã chấm";
        }
        if (d.NgayGioThucHien == null) {
          d.NgayGioThucHien = "Chưa sắp lịch";
          d.SapLich = "Chưa sắp lịch";
        } else {
          d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
            "Từ HH:mm, DD/MM/YYYY"
          );
          d.SapLich = "Đã sắp lịch";
        }
      });
      setDataNguyenBanTCT(data);
      setDataTietMucChuongTrinh(data);
    };
    getDataTietMucChuongTrinh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="wrapper">
        <Container fluid style={{ display: "flex", transition: "0.55s" }}>
          <div id="body-pd" className="body-pd">
            <TopBar />
            <Sidebar />
          </div>
          <Container
            fluid
            style={{ paddingTop: "13px", minHeight: "800px" }}
            id="container-bg"
          >
            <div className="text-start mt-4 mb-2">
              <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
                <MusicNote style={{ fontSize: "2.6rem" }} />
                Tiết Mục Đã Chấm
                <MusicNote style={{ fontSize: "2.6rem" }} />
              </h2>{" "}
            </div>
            <Row className="d-flex align-items-center">
              <Col xs="12" md="5">
                <div
                  className="p-0 m-0 d-flex align-items-center justify-content-between"
                  style={{ fontWeight: "500" }}
                >
                  <span>
                    <ManageSearch /> Lọc Theo Thời Gian: &nbsp;
                  </span>
                  <Form.Check
                    type="radio"
                    value="1"
                    name="datetct"
                    id="datetct1"
                    label={
                      <>
                        <label htmlFor="datetct1">Ngày</label>
                      </>
                    }
                    defaultChecked
                    onChange={(e) => handleRadioChangeTCT(e)}
                    // style={{ marginRight: "50px" }}
                  />
                  <Form.Check
                    type="radio"
                    value="2"
                    id="datetct2"
                    name="datetct"
                    label={
                      <>
                        <label htmlFor="datetct2">Tháng</label>
                      </>
                    }
                    onChange={(e) => handleRadioChangeTCT(e)}
                    // style={{ marginRight: "50px" }}
                  />
                  <Form.Check
                    type="radio"
                    value="3"
                    id="datetct3"
                    name="datetct"
                    label={
                      <>
                        <label htmlFor="datetct3">Năm</label>
                      </>
                    }
                    onChange={(e) => handleRadioChangeTCT(e)}
                    // style={{ marginRight: "50px" }}
                  />
                </div>
              </Col>
              <Col
                xs="12"
                md="7"
                className="pt-1 pb-2"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                }}
              >
                {selectRadioTCT == 1 && (
                  <>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="ngaybatdau"
                    >
                      <DesktopDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={batDauTCT}
                        maxDate={ketThucTCT}
                        label="Ngày Bắt Đầu"
                        onChange={(newValue) =>
                          setBatDauTCT(dayjs(newValue).format("YYYY-MM-DD"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    &nbsp; - &nbsp;
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="ngayketthuc"
                    >
                      <DesktopDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={ketThucTCT}
                        minDate={batDauTCT}
                        label="Ngày Kết Thúc"
                        onChange={(newValue) =>
                          setKetThucTCT(dayjs(newValue).format("YYYY-MM-DD"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </>
                )}
                {selectRadioTCT == 2 && (
                  <>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="thangbatdau"
                    >
                      <DesktopDatePicker
                        inputFormat="MM/YYYY"
                        views={["year", "month"]}
                        value={batDauTCT}
                        maxDate={ketThucTCT}
                        label="Tháng Bắt Đầu"
                        onChange={(newValue) =>
                          setBatDauTCT(dayjs(newValue).format("YYYY-MM"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    &nbsp; - &nbsp;
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="thangketthuc"
                    >
                      <DesktopDatePicker
                        inputFormat="MM/YYYY"
                        views={["year", "month"]}
                        value={ketThucTCT}
                        minDate={batDauTCT}
                        label="Tháng Kết Thúc"
                        onChange={(newValue) =>
                          setKetThucTCT(dayjs(newValue).format("YYYY-MM"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </>
                )}
                {selectRadioTCT == 3 && (
                  <>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="nambatdau"
                    >
                      <DesktopDatePicker
                        inputFormat="YYYY"
                        views={["year"]}
                        value={batDauTCT}
                        maxDate={ketThucTCT}
                        label="Năm Bắt Đầu"
                        onChange={(newValue) =>
                          setBatDauTCT(dayjs(newValue).format("YYYY"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                            className="focus-d"
                          />
                        )}
                      />
                    </LocalizationProvider>
                    &nbsp; - &nbsp;
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="namketthuc"
                    >
                      <DesktopDatePicker
                        inputFormat="YYYY"
                        views={["year"]}
                        value={ketThucTCT}
                        minDate={batDauTCT}
                        label="Năm Kết Thúc"
                        onChange={(newValue) =>
                          setKetThucTCT(dayjs(newValue).format("YYYY"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                            className="focus-d"
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </>
                )}
                &nbsp;
                <Button
                  variant="contained"
                  sx={{ padding: "7px 10px 5px 10px" }}
                  onClick={handleFilterTCT}
                >
                  Filter
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="error"
                  sx={{ padding: "7px 10px 5px 10px" }}
                  onClick={() => {
                    setDataTietMucChuongTrinh(dataNguyenBanTCT);
                    setBatDauTCT(null);
                    setKetThucTCT(null);
                    setPageTCT(0);
                  }}
                >
                  Clear
                </Button>
              </Col>
            </Row>
            <Row style={{ padding: "0px 10px" }}>
              <MuiDatatable
                title="Tiết Mục Thi Chương Trình"
                data={dataTietMucChuongTrinh}
                columns={columnsTietMucCT}
                options={optionsTietMucCT}
              />
            </Row>

            <hr />
            <Row className="d-flex align-items-center pt-2">
              <Col xs="12" md="5">
                <div
                  className="p-0 m-0 d-flex align-items-center justify-content-between"
                  style={{ fontWeight: "500" }}
                >
                  <span>
                    <ManageSearch /> Lọc Theo Thời Gian: &nbsp;
                  </span>
                  <Form.Check
                    type="radio"
                    value="1"
                    name="date"
                    id="date1"
                    label={
                      <>
                        <label htmlFor="date1">Ngày</label>
                      </>
                    }
                    defaultChecked
                    onChange={(e) => handleRadioChangeTD(e)}
                    // style={{ marginRight: "50px" }}
                  />
                  <Form.Check
                    type="radio"
                    value="2"
                    id="date2"
                    name="date"
                    label={
                      <>
                        <label htmlFor="date2">Tháng</label>
                      </>
                    }
                    onChange={(e) => handleRadioChangeTD(e)}
                    // style={{ marginRight: "50px" }}
                  />
                  <Form.Check
                    type="radio"
                    value="3"
                    id="date3"
                    name="date"
                    label={
                      <>
                        <label htmlFor="date3">Năm</label>
                      </>
                    }
                    onChange={(e) => handleRadioChangeTD(e)}
                    // style={{ marginRight: "50px" }}
                  />
                </div>
              </Col>
              <Col
                xs="12"
                md="7"
                className="pt-1 pb-2"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                }}
              >
                {selectRadioTD == 1 && (
                  <>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="ngaybatdau"
                    >
                      <DesktopDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={batDauTD}
                        maxDate={ketThucTD}
                        label="Ngày Bắt Đầu"
                        onChange={(newValue) =>
                          setBatDauTD(dayjs(newValue).format("YYYY-MM-DD"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    &nbsp; - &nbsp;
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="ngayketthuc"
                    >
                      <DesktopDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={ketThucTD}
                        minDate={batDauTD}
                        label="Ngày Kết Thúc"
                        onChange={(newValue) =>
                          setKetThucTD(dayjs(newValue).format("YYYY-MM-DD"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </>
                )}
                {selectRadioTD == 2 && (
                  <>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="thangbatdau"
                    >
                      <DesktopDatePicker
                        inputFormat="MM/YYYY"
                        views={["year", "month"]}
                        value={batDauTD}
                        maxDate={ketThucTD}
                        label="Tháng Bắt Đầu"
                        onChange={(newValue) =>
                          setBatDauTD(dayjs(newValue).format("YYYY-MM"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    &nbsp; - &nbsp;
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="thangketthuc"
                    >
                      <DesktopDatePicker
                        inputFormat="MM/YYYY"
                        views={["year", "month"]}
                        value={ketThucTD}
                        minDate={batDauTD}
                        label="Tháng Kết Thúc"
                        onChange={(newValue) =>
                          setKetThucTD(dayjs(newValue).format("YYYY-MM"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </>
                )}
                {selectRadioTD == 3 && (
                  <>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="nambatdau"
                    >
                      <DesktopDatePicker
                        inputFormat="YYYY"
                        views={["year"]}
                        value={batDauTD}
                        maxDate={ketThucTD}
                        label="Năm Bắt Đầu"
                        onChange={(newValue) =>
                          setBatDauTD(dayjs(newValue).format("YYYY"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                            className="focus-d"
                          />
                        )}
                      />
                    </LocalizationProvider>
                    &nbsp; - &nbsp;
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="namketthuc"
                    >
                      <DesktopDatePicker
                        inputFormat="YYYY"
                        views={["year"]}
                        value={ketThucTD}
                        minDate={batDauTD}
                        label="Năm Kết Thúc"
                        onChange={(newValue) =>
                          setKetThucTD(dayjs(newValue).format("YYYY"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                            className="focus-d"
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </>
                )}
                &nbsp;
                <Button
                  variant="contained"
                  sx={{ padding: "7px 10px 5px 10px" }}
                  onClick={handleFilterTD}
                >
                  Filter
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="error"
                  sx={{ padding: "7px 10px 5px 10px" }}
                  onClick={() => {
                    setDataTietMuc(dataNguyenBanTD);
                    setBatDauTD(null);
                    setKetThucTD(null);
                    setPageTD(0);
                  }}
                >
                  Clear
                </Button>
              </Col>
            </Row>
            <Row style={{ padding: "0px 10px" }}>
              <MuiDatatable
                title="Tiết Mục Cuộc Thi Đăng Ký Thể Loại Tự Do"
                data={dataTietMuc}
                columns={columnsTietMuc}
                options={optionsTietMuc}
              />
            </Row>
          </Container>
        </Container>
        <Footer />
      </div>
    </>
  );
}
