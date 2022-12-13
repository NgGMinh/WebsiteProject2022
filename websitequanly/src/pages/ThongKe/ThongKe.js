/* eslint-disable eqeqeq */
import { Row, Col, Breadcrumb, Form, Modal } from "react-bootstrap";
import {
  ManageSearch,
  MusicNote,
  Visibility,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import MuiDatatable from "../../components/table/MuiDatatable";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text,
} from "recharts";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import Select from "react-select";
import ChiTietThongKe from "./ChiTietThongKe";

export default function ThongKe() {
  const dayjs = require("dayjs");

  const [tableBodyHeight, setTableBodyHeight] = useState("570px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [show, setShow] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  const [phanThi, setPhanThi] = useState(null);

  const columnsThongKe = [
    {
      name: "MaCuocThi",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        sort: false,
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
        sortThirdClickReset: true,
        sortDescFirst: true,
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "10px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ textAlign: "center", paddingRight: "1px" }}>
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "TenCuocThi",
      label: "Tên Cuộc Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "260px" }}>{value}</div>;
        },
      },
    },
    {
      name: "ThoiGianDienRa",
      label: "Thời gian Diễn ra",
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
      name: "TenHinhThuc",
      label: "Hình Thức",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenDiaDiem",
      label: "Địa Điểm",
      options: {
        filterOptions: { fullWidth: true },
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "SLTM",
      label: "Tổng TM",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>{value}</div>;
        },
      },
    },
    {
      name: "SLTS",
      label: "Tổng TS",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>{value}</div>;
        },
      },
    },
    {
      name: "SoVongThi",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        sort: false,
        download: false,
        print: false,
      },
    },
    {
      name: "MaThangDiem",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        sort: false,
        download: false,
        print: false,
      },
    },
    {
      name: "MaTrangThai",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        sort: false,
        download: false,
        print: false,
      },
    },
    {
      name: "MaPhanThi",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        sort: false,
        download: false,
        print: false,
      },
    },
    {
      name: "NoiDungCuocThi",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        sort: false,
        download: false,
        print: false,
      },
    },
    {
      name: "",
      options: {
        filter: false,
        viewColumns: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <MuiToolTip title="View Details">
              <IconButton
                edge="end"
                aria-label="view details"
                className="icon-hover"
                onClick={() => {
                  setShow(true);
                  setTenCuocThi(tableMeta.rowData[2]);
                  setThoiGianDienRa(tableMeta.rowData[3]);
                  setHinhThuc(tableMeta.rowData[4]);
                  setDiaDiemToChuc(tableMeta.rowData[5]);
                  setSoVongThi(
                    tableMeta.rowData[8] == 1
                      ? "1 Vòng"
                      : tableMeta.rowData[8] == 2
                      ? "2 Vòng (Sơ Tuyển - Chung Kết)"
                      : "3 Vòng (Sơ Tuyển - Chung Khảo - Chung Kết)"
                  );
                  setThangDiem(tableMeta.rowData[9]);
                  setTrangThai(tableMeta.rowData[10]);
                  setPhanThi(tableMeta.rowData[11]);
                  setNoiDungCuocThi(tableMeta.rowData[12]);
                  Axios.post(
                    `http://localhost:3001/api/admin/giamkhaocuocthi/${tableMeta.rowData[0]}`
                  ).then((response) => {
                    setDataGiamKhao(response.data);
                  });
                  if (tableMeta.rowData[4] == "Chương trình truyền thống") {
                    Axios.post(
                      `http://localhost:3001/api/admin/chuongtrinhthuoccuocthi/${tableMeta.rowData[0]}`
                    ).then((response) => {
                      const data = response.data;
                      data.forEach((d) => {
                        if (d.NgayGioToChuc == null) {
                          d.NgayGioToChuc = "Chưa sắp lịch";
                          d.SapLich = "Chưa sắp lịch";
                        } else {
                          d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format(
                            "HH:mm, DD/MM/YYYY"
                          );
                          d.SapLich = "Đã sắp lịch";
                        }
                        if (d.DiemTrungBinh == null) {
                          d.DiemTrungBinh = "Chưa chấm";
                          d.ChamDiem = "Chưa chấm";
                          d.TenGiaiThuong = "Chưa xét";
                        } else {
                          d.ChamDiem = "Đã chấm";
                        }
                      });
                      setDataChuongTrinh(data);
                    });

                    Axios.post(
                      `http://localhost:3001/api/admin/chuongtrinhthuoccuocthi/chitiet/${tableMeta.rowData[0]}`
                    ).then((response) => {
                      setDataChiTietChuongTrinh(response.data);
                    });

                    Axios.post(
                      `http://localhost:3001/api/admin/alltietmuccuocthichuongtrinh/${tableMeta.rowData[0]}`
                    ).then((response) => {
                      response.data.forEach((d) => {
                        if (d.DiemTrungBinh == null) {
                          d.DiemTrungBinh = "Chưa chấm";
                          d.ChamDiem = "Chưa chấm";
                        } else {
                          d.ChamDiem = "Đã chấm";
                        }
                      });
                      setDataTietMuc(response.data);
                    });

                    Axios.post(
                      `http://localhost:3001/api/admin/allthisinhcuocthichuongtrinh/${tableMeta.rowData[0]}`
                    ).then((response) => {
                      response.data.forEach((d) => {
                        d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ";
                      });
                      setDataThiSinh(response.data);
                    });
                  } else {
                    Axios.post(
                      `http://localhost:3001/api/admin/alltietmuccuocthi/${tableMeta.rowData[0]}`
                    ).then((response) => {
                      response.data.forEach((d) => {
                        if (d.VongThi == 3) {
                          d.KetQua = d.TenGiaiThuong;
                          d.VongThi = "Chung Kết";
                        }
                        if (d.VongThi == 2) {
                          if (d.VongThi == tableMeta.rowData[8]) {
                            d.KetQua = d.TenGiaiThuong;
                            d.VongThi = "Chung Kết";
                          } else {
                            d.KetQua = d.TrangThai == 1 ? "Đạt" : "Không Đạt";
                            d.VongThi = "Chung Khảo";
                          }
                        }
                        if (d.VongThi == 1) {
                          d.KetQua = d.TrangThai == 1 ? "Đạt" : "Không Đạt";
                          d.VongThi = "Sơ Tuyển";
                        }

                        if (d.NgayGioThucHien == null) {
                          d.NgayGioThucHien = "Chưa sắp lịch";
                          d.SapLich = "Chưa sắp lịch";
                        } else {
                          d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                            "HH:mm, DD/MM/YYYY"
                          );
                          d.SapLich = "Đã sắp lịch";
                        }
                        if (d.DiemTrungBinh == null) {
                          d.DiemTrungBinh = "Chưa chấm";
                          d.ChamDiem = "Chưa chấm";
                          d.TenGiaiThuong = "Chưa xét";
                          d.KetQua = "Chưa xét";
                        } else {
                          d.ChamDiem = "Đã chấm";
                        }
                      });
                      setDataTietMuc(response.data);
                    });

                    Axios.post(
                      `http://localhost:3001/api/admin/allthisinhcuocthi/${tableMeta.rowData[0]}`
                    ).then((response) => {
                      response.data.forEach((d) => {
                        d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ";
                      });
                      setDataThiSinh(response.data);
                    });
                  }
                }}
              >
                <Visibility style={{ cursor: "pointer" }} />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
    {
      name: "",
      options: {
        filter: false,
        viewColumns: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <MuiToolTip title="View Charts">
              <IconButton
                edge="end"
                aria-label="view charts"
                className="icon-hover"
                onClick={() => {
                  setShowChiTiet(true);
                  Axios.post(
                    `http://localhost:3001/api/admin/thongkecuthe/${tableMeta.rowData[0]}`
                  ).then((response) => {
                    setDataCTThongKe(response.data);
                    setMaCuocThi(tableMeta.rowData[0]);
                    setTenCuocThi(tableMeta.rowData[2]);
                  });

                  setLuaChonTK(dataLuaChonThongKe[0]);

                  Axios.post(
                    `http://localhost:3001/api/admin/thongkecuthe/${tableMeta.rowData[0]}/songay`
                  ).then((response) => {
                    const data = response.data;
                    let arr = [];
                    arr.push({ value: 0, label: "All" });
                    data.forEach((d) => {
                      arr.push({
                        value: d.NgayThi,
                        label:
                          d.NgayThi == null
                            ? "Chưa sắp lịch"
                            : dayjs(d.NgayThi).format("DD/MM/YYYY"),
                      });
                    });
                    setNgayChon(arr[0]);
                    setDataSoNgay(arr);
                  });

                  Axios.post(
                    `http://localhost:3001/api/admin/thongkecuthe/${tableMeta.rowData[0]}/sovong`
                  ).then((response) => {
                    const data = response.data;
                    let arr = [];
                    arr.push({ value: 0, label: "All" });
                    data.forEach((d) => {
                      if (d.VongThi != -1 && d.SoVongThi != -1) {
                        setIsTCT(false);
                        if (d.VongThi == 1)
                          arr.push({ value: 1, label: "Sơ tuyển" });

                        if (d.VongThi == 2)
                          arr.push({
                            value: 2,
                            label:
                              d.SoVongThi == 2 ? "Chung kết" : "Chung khảo",
                          });

                        if (d.VongThi == 3)
                          arr.push({ value: 3, label: "Chung kết" });
                      } else {
                        setIsTCT(true);
                      }
                    });
                    document.getElementById("chitietthongke").scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                    setVongChon(arr[0]);
                    setDataSoVong(arr);
                  });
                }}
              >
                <BarChartIcon />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
  ];

  const optionsThongKe = {
    search: true,
    searchPlaceholder: "Tên Cuộc Thi, Địa Điểm, Ngày Tổ Chức,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: tableBodyHeight,
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPage,
    selectableRows: "none",
    page: page,
    onChangePage: (number) => {
      setPage(number);
    },
    onChangeRowsPerPage: (number) => {
      if (number > 5) {
        setTableBodyHeight("auto");
        setRowsPerPage(number);
      } else {
        setTableBodyHeight("570px");
        setRowsPerPage(number);
      }
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

      // console.log(values.forEach((val) => console.log(val)));

      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);

      const fileName = `DanhSachThongKe`;
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

  const dataLuaChonThongKe = [
    { value: 1, label: "Cả Cuộc Thi" },
    { value: 2, label: "Theo Ngày Thi" },
    { value: 3, label: "Theo Vòng Thi" },
  ];

  const dataLuaChonThongKeTCT = [
    { value: 1, label: "Cả Cuộc Thi" },
    { value: 2, label: "Theo Ngày Thi" },
  ];

  const [luaChonTK, setLuaChonTK] = useState(dataLuaChonThongKe[0]);

  const [dataThongKe, setDataThongKe] = useState([]);

  const [dataSoNgay, setDataSoNgay] = useState([]);
  const [dataSoVong, setDataSoVong] = useState([]);

  const [ngayChon, setNgayChon] = useState();
  const [vongChon, setVongChon] = useState();

  const [dataCTThongKe, setDataCTThongKe] = useState([]);
  const [dataNguyenBan, setDataNguyenBan] = useState([]);
  const [selectRadio, setSelectRadio] = useState(1);

  const [tenCuocThi, setTenCuocThi] = useState("");
  const [maCuocThi, setMaCuocThi] = useState(-1);
  const [hinhThuc, setHinhThuc] = useState();
  const [diaDiemToChuc, setDiaDiemToChuc] = useState();
  const [trangThai, setTrangThai] = useState();
  const [thoiGianDienRa, setThoiGianDienRa] = useState();
  const [thangDiem, setThangDiem] = useState();
  const [noiDungCuocThi, setNoiDungCuocThi] = useState();
  const [soVongThi, setSoVongThi] = useState();

  const [dataChuongTrinh, setDataChuongTrinh] = useState([]);
  const [dataChiTietChuongTrinh, setDataChiTietChuongTrinh] = useState([]);
  const [dataTietMuc, setDataTietMuc] = useState([]);
  const [dataThiSinh, setDataThiSinh] = useState([]);
  const [dataGiamKhao, setDataGiamKhao] = useState([]);

  let giamKhao = "";
  if (dataGiamKhao.length == 0) giamKhao = "Chưa mời.";

  dataGiamKhao.forEach((d) => {
    if (d.stt == 1) giamKhao = giamKhao + d.HoTenNguoiDung;
    else {
      giamKhao = giamKhao + ", " + d.HoTenNguoiDung;
    }
  });

  const [isTCT, setIsTCT] = useState(false);

  const handleRadioChange = (e) => {
    setBatDau(null);
    setKetThuc(null);
    setSelectRadio(e.target.value);
  };

  const [batDau, setBatDau] = useState(null);
  const [ketThuc, setKetThuc] = useState(null);

  const handleFilter = () => {
    if (batDau == null)
      alert('Chưa chọn "Ngày" hoặc "Tháng" hoặc "Năm" Bắt đầu!');
    else if (ketThuc == null)
      alert('Chưa chọn "Ngày" hoặc "Tháng" hoặc "Năm" Kết thúc!');
    else {
      if (selectRadio == 1) {
        Axios.post(`http://localhost:3001/api/admin/allthongke/ngay`, {
          NgayBatDau: batDau,
          NgayKetThuc: ketThuc,
        }).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            d.ThoiGianDienRa = `${dayjs(d.NgayBatDau).format(
              "DD/MM/YYYY"
            )} - ${dayjs(d.NgayKetThuc).format("DD/MM/YYYY")}`;
          });
          setDataThongKe(data);
          setPage(0);
        });
      }
      if (selectRadio == 2) {
        Axios.post(`http://localhost:3001/api/admin/allthongke/thang`, {
          NgayBatDau: batDau,
          NgayKetThuc: ketThuc,
        }).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            d.ThoiGianDienRa = `${dayjs(d.NgayBatDau).format(
              "DD/MM/YYYY"
            )} - ${dayjs(d.NgayKetThuc).format("DD/MM/YYYY")}`;
          });
          setDataThongKe(data);
          setPage(0);
        });
      }
      if (selectRadio == 3) {
        Axios.post(`http://localhost:3001/api/admin/allthongke/nam`, {
          NgayBatDau: batDau,
          NgayKetThuc: ketThuc,
        }).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            d.ThoiGianDienRa = `${dayjs(d.NgayBatDau).format(
              "DD/MM/YYYY"
            )} - ${dayjs(d.NgayKetThuc).format("DD/MM/YYYY")}`;
          });
          setDataThongKe(data);
          setPage(0);
        });
      }
    }
  };

  const [showChiTiet, setShowChiTiet] = useState(false);

  useEffect(() => {
    const getDataThongKe = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/allthongke"
      );
      data.forEach((d) => {
        d.ThoiGianDienRa = `${dayjs(d.NgayBatDau).format(
          "DD/MM/YYYY"
        )} - ${dayjs(d.NgayKetThuc).format("DD/MM/YYYY")}`;
        if (d.MaTrangThai == 1) d.MaTrangThai = "Chưa Tổ Chức";
        if (d.MaTrangThai == 2) d.MaTrangThai = "Đang Tổ Chức";
        if (d.MaTrangThai == 3) d.MaTrangThai = "Đã Tổ Chức";
      });
      setDataThongKe(data);
      setDataNguyenBan(data);
    };
    getDataThongKe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CustomXAxisTick = ({ x, y, payload }) => {
    if (payload && payload.value) {
      return (
        <Text
          fontSize={"16px"}
          width={75}
          x={x}
          y={y}
          textAnchor="middle"
          verticalAnchor="start"
        >
          {payload.value}
        </Text>
      );
    }
    return null;
  };

  return (
    <>
      <Breadcrumb href="#" tabIndex="-1">
        <Breadcrumb.Item>
          <Link to="/home" className="link">
            Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Cuộc Thi Văn Nghệ</Breadcrumb.Item>
      </Breadcrumb>

      {/* Bảng Thống Kê */}
      <div className="text-start mb-2">
        <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Thống Kê
          <MusicNote style={{ fontSize: "2.6rem" }} />
        </h2>{" "}
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
                id="date1"
                name="date"
                label={
                  <>
                    <label htmlFor="date1">Ngày</label>
                  </>
                }
                defaultChecked
                onChange={(e) => handleRadioChange(e)}
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
                onChange={(e) => handleRadioChange(e)}
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
                onChange={(e) => handleRadioChange(e)}
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
            {selectRadio == 1 && (
              <>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  id="ngaybatdau"
                >
                  <DesktopDatePicker
                    inputFormat="DD/MM/YYYY"
                    value={batDau}
                    maxDate={ketThuc}
                    label="Ngày Bắt Đầu"
                    onChange={(newValue) =>
                      setBatDau(dayjs(newValue).format("YYYY-MM-DD"))
                    }
                    renderInput={(params) => (
                      <TextField {...params} size="small" helperText={null} />
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
                    value={ketThuc}
                    minDate={batDau}
                    label="Ngày Kết Thúc"
                    onChange={(newValue) =>
                      setKetThuc(dayjs(newValue).format("YYYY-MM-DD"))
                    }
                    renderInput={(params) => (
                      <TextField {...params} size="small" helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </>
            )}
            {selectRadio == 2 && (
              <>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  id="thangbatdau"
                >
                  <DesktopDatePicker
                    inputFormat="MM/YYYY"
                    views={["year", "month"]}
                    value={batDau}
                    maxDate={ketThuc}
                    label="Tháng Bắt Đầu"
                    onChange={(newValue) =>
                      setBatDau(dayjs(newValue).format("YYYY-MM"))
                    }
                    renderInput={(params) => (
                      <TextField {...params} size="small" helperText={null} />
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
                    value={ketThuc}
                    minDate={batDau}
                    label="Tháng Kết Thúc"
                    onChange={(newValue) =>
                      setKetThuc(dayjs(newValue).format("YYYY-MM"))
                    }
                    renderInput={(params) => (
                      <TextField {...params} size="small" helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </>
            )}
            {selectRadio == 3 && (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs} id="nambatdau">
                  <DesktopDatePicker
                    inputFormat="YYYY"
                    views={["year"]}
                    value={batDau}
                    maxDate={ketThuc}
                    label="Năm Bắt Đầu"
                    onChange={(newValue) =>
                      setBatDau(dayjs(newValue).format("YYYY"))
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
                    value={ketThuc}
                    minDate={batDau}
                    label="Năm Kết Thúc"
                    onChange={(newValue) =>
                      setKetThuc(dayjs(newValue).format("YYYY"))
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
              onClick={handleFilter}
            >
              Filter
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="error"
              sx={{ padding: "7px 10px 5px 10px" }}
              onClick={() => {
                setDataThongKe(dataNguyenBan);
                setBatDau(null);
                setKetThuc(null);
                setPage(0);
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
        <Row style={{ padding: "0px 10px" }}>
          <MuiDatatable
            title="Danh Sách Cuộc Thi Văn Nghệ"
            data={dataThongKe}
            columns={columnsThongKe}
            options={optionsThongKe}
          />
        </Row>
      </div>

      {/* Chi Tiết Thống Kê */}
      <div
        style={{ display: showChiTiet ? "block" : "none" }}
        id="chitietthongke"
      >
        <h2 className="text-center d-flex align-items-center justify-content-center py-2">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Thống Kê Chi Tiết Cuộc Thi
          <MusicNote style={{ fontSize: "2.6rem" }} />
        </h2>{" "}
        <p>
          <strong>{tenCuocThi}</strong>
        </p>
        <div>
          <Row>
            <Col
              xs="12"
              md={luaChonTK.value > 1 ? "6" : "12"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: luaChonTK.value > 1 ? "flex-end" : "center",
              }}
            >
              <strong>Thống Kê: &nbsp;&nbsp;</strong>
              <Select
                options={isTCT ? dataLuaChonThongKeTCT : dataLuaChonThongKe}
                value={luaChonTK}
                id="luachontk"
                onChange={(e) => {
                  setLuaChonTK(e);
                  if (e.value == 1) {
                    Axios.post(
                      `http://localhost:3001/api/admin/thongkecuthe/${maCuocThi}`
                    ).then((response) => {
                      setDataCTThongKe(response.data);
                    });
                  }
                  if (e.value == 2) {
                    setNgayChon(dataSoNgay[0]);
                    Axios.post(
                      `http://localhost:3001/api/admin/thongkecuthe/${maCuocThi}/tatcangay`
                    ).then((response) => {
                      const data = response.data;
                      data.forEach((d) => {
                        if (d.name == null) d.name = "Chưa sắp lịch";
                      });
                      setDataCTThongKe(data);
                    });
                  }
                  if (e.value == 3) {
                    setVongChon(dataSoVong[0]);
                    Axios.post(
                      `http://localhost:3001/api/admin/thongkecuthe/${maCuocThi}/tatcavong`
                    ).then((response) => {
                      const data = response.data;
                      data.forEach((d) => {
                        if (d.name == 1) d.name = "Sơ Tuyển";
                        if (d.name == 2)
                          d.name =
                            d.SoVongThi == 2 ? "Chung Kết" : "Chung Khảo";
                        if (d.name == 3) d.name = "Chung Kết";
                      });
                      setDataCTThongKe(data);
                    });
                  }
                }}
                className="zIndex-998"
              />
            </Col>
            <Col md="6" style={{ display: "flex", alignItems: "center" }}>
              {luaChonTK.value == 1 && <></>}
              {luaChonTK.value == 2 && (
                <>
                  <strong>Chọn Ngày: &nbsp;&nbsp;</strong>
                  <Select
                    options={dataSoNgay}
                    value={ngayChon}
                    id="ngaychon"
                    onChange={(e) => {
                      setNgayChon(e);
                      console.log(e.value);
                      if (e.value == 0) {
                        Axios.post(
                          `http://localhost:3001/api/admin/thongkecuthe/${maCuocThi}/tatcangay`
                        ).then((response) => {
                          const data = response.data;
                          data.forEach((d) => {
                            if (d.name == null) d.name = "Chưa sắp lịch";
                          });
                          setDataCTThongKe(data);
                        });
                      } else {
                        Axios.post(
                          `http://localhost:3001/api/admin/thongkecuthe/${maCuocThi}/theongay`,
                          {
                            NgayChon: e.value,
                          }
                        ).then((response) => {
                          setDataCTThongKe(response.data);
                        });
                      }
                    }}
                    className="zIndex-998 select-luachon"
                  />
                </>
              )}
              {luaChonTK.value == 3 && (
                <>
                  <strong>Chọn Vòng: &nbsp;&nbsp;</strong>
                  <Select
                    options={dataSoVong}
                    value={vongChon}
                    id="vongChon"
                    onChange={(e) => {
                      setVongChon(e);
                      if (e.value == 0) {
                        Axios.post(
                          `http://localhost:3001/api/admin/thongkecuthe/${maCuocThi}/tatcavong`
                        ).then((response) => {
                          const data = response.data;
                          data.forEach((d) => {
                            if (d.name == 1) d.name = "Sơ Tuyển";
                            if (d.name == 2)
                              d.name =
                                d.SoVongThi == 2 ? "Chung Kết" : "Chung Khảo";
                            if (d.name == 3) d.name = "Chung Kết";
                          });
                          setDataCTThongKe(data);
                        });
                      } else {
                        Axios.post(
                          `http://localhost:3001/api/admin/thongkecuthe/${maCuocThi}/theovong`,
                          {
                            VongThi: e.value,
                          }
                        ).then((response) => {
                          const data = response.data;
                          data.forEach((d) => {
                            if (d.name == 1) d.name = "Sơ Tuyển";
                            if (d.name == 2)
                              d.name =
                                d.SoVongThi == 2 ? "Chung Kết" : "Chung Khảo";
                            if (d.name == 3) d.name = "Chung Kết";
                          });
                          setDataCTThongKe(data);
                        });
                      }
                    }}
                    className="zIndex-998 select-luachon"
                  />
                </>
              )}
            </Col>
          </Row>
          &nbsp;&nbsp;
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <BarChart
              width={950}
              height={500}
              data={dataCTThongKe}
              margin={{
                top: 15,
                right: 30,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} tick={<CustomXAxisTick />} />
              <YAxis />
              <Tooltip />
              <Legend
                align="center"
                wrapperStyle={{
                  paddingTop: "12px",
                  paddingLeft: "60px",
                }}
              />
              <Bar
                dataKey="SLTM"
                barSize={20}
                label="Số Lượng Tiết Mục Trình diễn"
                name="Số Lượng Tiết Mục Trình Diễn"
                fill="#8884d8"
              />
              {luaChonTK.value == 3 ? (
                <Bar
                  dataKey="SLTMD"
                  barSize={20}
                  label="Số Lượng Tiết Mục Đậu"
                  name="Số Lượng Tiết Mục Đậu"
                  fill="#82ca9d"
                />
              ) : (
                <></>
              )}
            </BarChart>
            <strong>Biểu đồ Thống kê Số lượng Tiết mục Trình diễn</strong>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <BarChart
              width={950}
              height={500}
              data={dataCTThongKe}
              margin={{
                top: 15,
                right: 30,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} tick={<CustomXAxisTick />} />
              <YAxis />
              <Tooltip />
              <Legend
                align="center"
                wrapperStyle={{
                  paddingTop: "12px",
                  paddingLeft: "60px",
                }}
              />
              <Bar
                dataKey="SLTS"
                name="Số Lượng Thí Sinh"
                barSize={20}
                label="Số Lượng Thí Sinh"
                fill="#2596be"
              />
            </BarChart>
            <strong>
              Biểu đồ Thống kê SL Thí Sinh Tham dự/ Trình bày Tiết mục
            </strong>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-width">
        <Modal.Header closeButton className="px-4">
          <Modal.Title className="ms-auto">Chi Tiết Chương Trình</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="mb-5" style={{ padding: "0px 12px" }}>
            <div className="mb-4">
              <p
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                &nbsp;Tên Cuộc Thi:&nbsp;
                <span style={{ fontWeight: "400" }}>{tenCuocThi}.</span>
              </p>
              <p
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                &nbsp;Hình Thức Cuộc Thi:&nbsp;
                <span style={{ fontWeight: "400" }}>{hinhThuc}</span>
              </p>

              <p
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                &nbsp;Địa Điểm Tổ Chức:&nbsp;
                <span style={{ fontWeight: "400" }}>
                  {diaDiemToChuc}.&nbsp;
                </span>
                Thời gian diễn ra: &nbsp;
                <span style={{ fontWeight: "400" }}>Từ {thoiGianDienRa}.</span>
              </p>

              <p
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                &nbsp;Trạng Thái:{" "}
                <span style={{ fontWeight: "400" }}>&nbsp;{trangThai}. </span>
              </p>
              <p
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                &nbsp;Số Vòng Thi:{" "}
                <span style={{ fontWeight: "400" }}>&nbsp;{soVongThi}.</span>
                &nbsp;Thang Điểm:{" "}
                <span style={{ fontWeight: "400" }}>
                  &nbsp;{thangDiem * 10}.
                </span>
              </p>
              <p
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                &nbsp;Giám Khảo:{" "}
                <span style={{ fontWeight: "400" }}>&nbsp;{giamKhao}. </span>
              </p>
              <p
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                &nbsp;Nội Dung Cuộc Thi:&nbsp;
              </p>
              <div
                style={{ paddingLeft: "15px" }}
                dangerouslySetInnerHTML={{ __html: noiDungCuocThi }}
              ></div>
            </div>

            <ChiTietThongKe
              phanThi={phanThi}
              dataChuongTrinh={dataChuongTrinh}
              dataChiTietChuongTrinh={dataChiTietChuongTrinh}
              dataTietMuc={dataTietMuc}
              dataThiSinh={dataThiSinh}
              dataGiamKhao={dataGiamKhao}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer className="py-2 justify-content-end">
          <Row>
            <Button
              variant="contained"
              color="error"
              className="modal-button-style"
              onClick={handleClose}
            >
              Close
            </Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}
