/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Form, Row, Col, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import "../CuocThiVanNghe.css";
import {
  AccessTime,
  ArrowBack,
  ConfirmationNumber,
  Edit,
  EmojiEvents,
  MusicNote,
  NoteAlt,
  QueueMusicRounded,
  Refresh,
  Save,
} from "@mui/icons-material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";
import MuiDatatable from "../../../components/table/MuiDatatable";
import Select from "react-select";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";

export default function ChinhSuaTietMucDoiNhom() {
  const defaultFonts = [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
  ];

  const sortedFontOptions = [
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
    ...defaultFonts,
  ].sort();

  const params = useParams();
  const dayjs = require("dayjs");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSTT();
  };
  const [tableBodyHeight, setTableBodyHeight] = useState("450px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [dataLoaiTietMuc, setDataLoaiTietMuc] = useState([]);

  const [dataDoanDoi, setDataDoanDoi] = useState([]);
  const [dataGiaiThuong, setDataGiaiThuong] = useState([]);
  const [giaiThuong, setGiaiThuong] = useState({
    value: 0,
    label: "Không có giải",
  });

  const [tenCuocThi, setTenCuocThi] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState();
  const [ngayKetThuc, setNgayKetThuc] = useState();
  const [trangThai, setTrangThai] = useState(1);
  const [soVongThi, setSoVongThi] = useState(0);

  const [maDoanDoi, setMaDoanDoi] = useState(-1);
  const [tenDoanDoi, setTenDoanDoi] = useState("");
  const [maNhomTruong, setMaNhomTruong] = useState(-1);

  const [tenTietMuc, setTenTietMuc] = useState("");
  const [loaiTietMuc, setLoaiTietMuc] = useState(3);
  const [nhanSo, setNhanSo] = useState(2);
  const [vongThi, setVongThi] = useState(0);
  const [noiDungTietMuc, setNoiDungTietMuc] = useState("");
  const [thoiGianThucHien, setThoiGianThucHien] = useState(null);

  const [refresh, setRefresh] = useState(1);
  const [dataThanhVien, setDataThanhVien] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [coDinh, setCoDinh] = useState();
  // eslint-disable-next-line no-unused-vars
  const [nhanSoLTM, setNhanSoLTM] = useState();

  const [showCSTS, setShowCSTS] = useState(false);
  const handleCloseCSTS = () => {
    setShowCSTS(false);
  };

  const [maThiSinh, setMaThiSinh] = useState(-1);
  const [hoTen, setHoTen] = useState("");
  const [maDinhDanh, setMaDinhDanh] = useState("");
  const [gioiTinh, setGioiTinh] = useState(1);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phone, setPhone] = useState("");
  const [maLop, setMaLop] = useState("");
  const [stt, setSTT] = useState();

  const handleChangeDoanDoi = () => {
    if (stt == undefined) {
      alert("Chưa chọn đoàn đội thay thế!");
    } else {
      const dt = dataDoanDoi.filter((data) => {
        return data.stt == stt + 1;
      });
      setMaDoanDoi(dt[0].MaDoanDoi);
      setNhanSo(dt[0].SoLuongThanhVien);
      Axios.post(`http://localhost:3001/api/admin/changedoandoitrinhbay`, {
        MaTietMuc: params.idTietMuc,
        MaDoanDoi: dt[0].MaDoanDoi,
        NhanSo: dt[0].SoLuongThanhVien,
      }).then((response) => {
        document.getElementById("topBtn").click();
        setRefresh(Math.random());
        handleClose();
        setTimeout(() => {
          alert("Thay Đổi Đoàn Đội Thành Công!");
        }, 400);
      });
    }
  };

  const handleUpdateTietMuc = () => {
    Axios.post(
      `http://localhost:3001/api/admin/updatetietmuc/${params.idTietMuc}`,
      {
        TenTietMuc: tenTietMuc,
        MaLoaiTietMuc: loaiTietMuc.value,
        NhanSo: nhanSo,
        NgayGioThucHien: thoiGianThucHien,
        NoiDungTietMuc: noiDungTietMuc,
        MaGiaiThuong: giaiThuong.value,
      }
    ).then((response) => {
      document.getElementById("topBtn").click();
      setRefresh(Math.random());
      setTimeout(() => {
        alert("Thay Đổi Thông Tin Tiết Mục Thành Công!");
      }, 400);
    });
  };

  // Lấy Thông Tin Đơn vị Tổ chức, Địa Điểm Từ Database

  useEffect(() => {
    const getDataChiTietCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
      );
      setTenCuocThi(data[0].TenCuocThi);
      setNgayBatDau(dayjs(data[0].NgayBatDau).format("YYYY-MM-DD"));
      setNgayKetThuc(dayjs(data[0].NgayKetThuc).format("YYYY-MM-DD"));
      setTrangThai(data[0].MaTrangThai);
      setSoVongThi(data[0].SoVongThi);
    };
    getDataChiTietCuocThi();
  }, [refresh]);

  useEffect(() => {
    const getDataDoanDoiTrinhBay = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/doinhomtrinhbaytietmuc/${params.idTietMuc}`
      );
      setTenDoanDoi(data[0].TenDoanDoi);
      setMaDoanDoi(data[0].MaDoanDoi);
      setMaNhomTruong(data[0].MaThiSinh);
      let value = data[0].MaDoanDoi;
      const getDataThanhVien = async () => {
        const { data } = await Axios.post(
          `http://localhost:3001/api/admin/thisinhthuocdoandoi/${value}`
        );
        data.forEach((d) => {
          if (d.GioiTinh == 1) d.GioiTinh = "Nam";
          if (d.GioiTinh == 2) d.GioiTinh = "Nữ";
        });
        setDataThanhVien(data);
      };
      getDataThanhVien();
    };
    getDataDoanDoiTrinhBay();
  }, [refresh]);

  // Lấy Thông Tin Tiết mục từ database
  useEffect(() => {
    const getDataChiTietTietMuc = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chitiettietmuc/${params.idTietMuc}`
      );
      setTenTietMuc(data[0].TenTietMuc);
      setLoaiTietMuc({
        value: data[0].MaLoaiTietMuc,
        label: data[0].TenLoaiTietMuc,
      });
      setNoiDungTietMuc(data[0].NoiDungTietMuc);
      setNhanSo(data[0].NhanSo);
      setThoiGianThucHien(
        data[0].NgayGioThucHien == null
          ? null
          : dayjs(data[0].NgayGioThucHien).format("YYYY-MM-DDTHH:mm")
      );
      setCoDinh(data[0].CoDinh);
      setNhanSoLTM(data[0].NhanSoToiThieu);
      setVongThi(data[0].VongThi);
      setGiaiThuong({
        value: data[0].MaGiaiThuong,
        label: data[0].TenGiaiThuong,
      });
      let value = data[0].NhanSo;
      let codinh = data[0].CoDinh;
      let nstt = data[0].NhanSoToiThieu;
      if (codinh == 1) {
        const getDataDoanDoiKhongTrinhBay = async () => {
          const { data } = await Axios.post(
            `http://localhost:3001/api/admin/doinhomkhongtrinhbay/nhansocodinh/${maDoanDoi}/${nstt}`
          );
          setDataDoanDoi(data);
        };
        getDataDoanDoiKhongTrinhBay();
      }
      if (codinh == 0) {
        const getDataDoanDoiKhongTrinhBay = async () => {
          const { data } = await Axios.post(
            `http://localhost:3001/api/admin/doinhomkhongtrinhbay/nhansokhongcodinh/${maDoanDoi}/${nstt}`
          );
          setDataDoanDoi(data);
        };
        getDataDoanDoiKhongTrinhBay();
      }

      const getDataLoaiTietMuc = async () => {
        const { data } = await Axios.post(
          `http://localhost:3001/api/admin/loaitietmucphuhop/${value}`
        );
        let arr = [];
        data.forEach((d) => {
          arr.push({ value: d.MaLoaiTietMuc, label: d.TenLoaiTietMuc });
        });
        setDataLoaiTietMuc(arr);
      };
      getDataLoaiTietMuc();
    };
    getDataChiTietTietMuc();

    const getDataLoaiGiaiThuong = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/giaithuong"
      );
      let arr = [];
      data.forEach((d) => {
        arr.push({ value: d.MaGiaiThuong, label: d.TenGiaiThuong });
      });
      setDataGiaiThuong(arr);
    };
    getDataLoaiGiaiThuong();
  }, [refresh]);

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
          return <div style={{ paddingLeft: "15px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>{value}</div>;
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
        filterOptions: { fullWidth: true },
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
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        disableColumnMenu: true,
        display: trangThai == 3 ? false : true,
        customBodyRender: (
          value,
          tableMeta,
          updateValue,
          displayData,
          selectableRows
        ) => {
          return (
            <>
              {maNhomTruong == tableMeta.rowData[0] ? (
                <IconButton edge="end" aria-label="edit" disabled>
                  <Edit />
                </IconButton>
              ) : (
                <MuiToolTip title="Edit">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    className="edit-hover"
                    onClick={() => {
                      setMaThiSinh(tableMeta.rowData[0]);
                      setHoTen(tableMeta.rowData[2]);
                      setMaDinhDanh(tableMeta.rowData[3]);
                      setGioiTinh(tableMeta.rowData[4] == "Nam" ? 1 : 2);
                      setEmail(tableMeta.rowData[5]);
                      setPhone(tableMeta.rowData[6]);
                      setMaLop(tableMeta.rowData[7]);
                      setShowCSTS(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </MuiToolTip>
              )}
            </>
          );
        },
      },
    },
  ];

  const optionsThiSinh = {
    search: true,
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: tableBodyHeight,
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPage,
    selectableRows: "none",
    selectToolbarPlacement: "none",
    page: page,
    onChangePage: (number) => {
      setPage(number);
    },
    onChangeRowsPerPage: (number) => {
      if (number > 5) {
        setTableBodyHeight("auto");
        setRowsPerPage(number);
      } else {
        setTableBodyHeight("450px");
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

  const columnsDoanDoi = [
    {
      name: "MaDoanDoi",
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
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "TenDoanDoi",
      label: "Tên Đoàn Đội",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "215px" }}>{value}</div>;
        },
      },
    },

    { name: "TenThiSinh", label: "Trưởng Nhóm" },
    {
      name: "Email",
      label: "Email Trưởng Nhóm",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "180px", lineBreak: "anywhere" }}>
              {value}
            </div>
          );
        },
      },
    },
    { name: "Phone", label: "Phone" },
    { name: "SoLuongThanhVien", label: "Sỉ Số" },
    {
      name: "TenDonVi",
      label: "Thuộc Đơn vị",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "170px" }}>{value}</div>;
        },
      },
    },
  ];

  const optionsDoanDoi = {
    search: true,
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "560px",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "single",
    selectToolbarPlacement: "none",
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      setSTT(currentRowsSelected[0].dataIndex);
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

      const fileName = `DanhSachDoiNhom`;
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

  const handleEmailCheck = (event) => {
    const value = event.target.value;

    setTimeout(() => {
      setEmail(value);
      let btcq_email =
        // eslint-disable-next-line no-useless-escape
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})/;

      if (!btcq_email.test(value)) {
        setEmailErr("Email không hợp lệ");
      } else {
        setEmailErr("");
      }

      if (event.target.value == "") setEmailErr("");
    }, 300);
  };

  const handleUpdateThanhVien = () => {
    if (hoTen == "") alert("Chưa Nhập Họ Tên");
    else {
      Axios.post(
        `http://localhost:3001/api/admin/updatethanhvien/${maThiSinh}`,
        {
          TenThiSinh: hoTen,
          MaDinhDanh: maDinhDanh,
          GioiTinh: gioiTinh,
          Email: email,
          Phone: phone,
          MaLop: maLop,
        }
      ).then((response) => {
        setRefresh(Math.random());
        setTimeout(() => {
          alert("Thay Đổi Thông Tin Thành Công!");
        }, 400);
      });
    }
  };

  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    document.getElementById("cuocthivannghe").classList.add("actives");
    setTimeout(() => {
      setLoad(false);
    }, 300);
  }, [refresh]);

  return (
    <>
      {load ? (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Spinner
            animation="border"
            variant="primary"
            id="spinner"
            style={{
              position: "absolute",
              top: "38%",
              left: "48%",
              width: "50px",
              height: "50px",
              border: "2px soft black",
            }}
          />
        </div>
      ) : (
        <>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home" className="link">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/tatcacuocthi" className="link">
                Tất Cả Cuộc Thi
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to={`/chinhsuacuocthi/${params.idCuocThi}`}
                className="link"
              >
                {tenCuocThi}
              </Link>
            </li>

            <li className="breadcrumb-item active">Chi Tiết Tiết Mục</li>
          </ol>

          {/* Thêm Tiết Mục */}
          <div className="text-start">
            <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
              <MusicNote style={{ fontSize: "2.6rem" }} />
              Chi Tiết Tiết Mục
              <MusicNote style={{ fontSize: "2.6rem" }} />
            </h2>
            <Form>
              {/* Tên Tiết Mục, Đơn Vị Tổ Chức */}
              <Row>
                {/* Tên Tiết Mục */}
                <Col xs="12" md={vongThi == soVongThi ? "8" : "12"}>
                  <Form.Group className="mb-3">
                    <Form.Label
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <MusicNote /> Tên Tiết Mục
                    </Form.Label>
                    <Form.Control
                      placeholder="Nhập Tên Tiết Mục..."
                      type="text"
                      id="tentietmuc"
                      defaultValue={tenTietMuc}
                      onBlur={(e) => setTenTietMuc(e.target.value)}
                      readOnly={trangThai == 3 ? true : false}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                </Col>
                {vongThi == soVongThi ? (
                  <>
                    {trangThai == 3 ? (
                      <Col xs="12" md="4">
                        <Form.Group className="mb-3">
                          <Form.Label
                            htmlFor="giaithuong"
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500" }}
                          >
                            <EmojiEvents />
                            &nbsp;Giải Thưởng
                          </Form.Label>

                          <Form.Control
                            type="text"
                            value={giaiThuong.label}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    ) : (
                      <Col xs="12" md="4">
                        <Form.Group className="mb-3">
                          <Form.Label
                            htmlFor="giaithuong"
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500" }}
                          >
                            <EmojiEvents />
                            &nbsp;Giải Thưởng
                          </Form.Label>

                          <Select
                            options={dataGiaiThuong}
                            value={giaiThuong}
                            id="giaithuong"
                            onChange={setGiaiThuong}
                            className="zIndex-997"
                          />
                        </Form.Group>
                      </Col>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Row>

              {/* Loại Tiết Mục, Nhân Số, Thời Gian Thực Hiện */}
              <Row>
                {/* Loại Tiết Mục, Nhân Số */}
                <Col xs="12" md="8">
                  <Row>
                    {trangThai == 3 ? (
                      <Col xs="12" md="9">
                        <Form.Group className="mb-3">
                          <Form.Label
                            htmlFor="loaitietmuc"
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500" }}
                          >
                            <QueueMusicRounded /> Loại Tiết Mục
                          </Form.Label>

                          <Form.Control
                            type="text"
                            value={loaiTietMuc.label}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    ) : (
                      <Col xs="12" md="9">
                        <Form.Group className="mb-1">
                          <Form.Label
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500", width: "100%" }}
                          >
                            <QueueMusicRounded /> Loại Tiết Mục
                          </Form.Label>
                          <Select
                            options={dataLoaiTietMuc}
                            value={loaiTietMuc}
                            id="loaitietmuc"
                            onChange={setLoaiTietMuc}
                            className="zIndex-997"
                          />
                        </Form.Group>
                      </Col>
                    )}

                    <Col xs="12" md="3">
                      <Form.Group className="mb-3">
                        <Form.Label
                          className="d-flex align-items-center"
                          style={{ fontWeight: "500" }}
                        >
                          <ConfirmationNumber />
                          &nbsp;Nhân Số
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Nhập Số lượng tham gia..."
                          value={nhanSo}
                        />
                        <Form.Text className="text-muted"></Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                {/* Thời Gian Thực Hiện */}
                <Col xs="12" md="4">
                  <Form.Group className="mb-3">
                    <Form.Label
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <AccessTime />
                      &nbsp;Thời Gian Thực Hiện
                    </Form.Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        value={thoiGianThucHien}
                        inputFormat="HH:mm, DD/MM/YYYY"
                        maxDate={ngayKetThuc}
                        minDate={ngayBatDau}
                        minTime={dayjs("2018-01-01T07:30")}
                        maxTime={dayjs("2018-01-01T22:00")}
                        onChange={(newValue) =>
                          setThoiGianThucHien(
                            dayjs(newValue).format("YYYY-MM-DDTHH:mm")
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                            sx={{
                              ".MuiInputBase-root": {
                                marginTop: "4.4px",
                                background: "white",
                              },
                              ".MuiInputBase-input": {
                                paddingTop: "4.2px",
                              },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              {/* Nội Dung Tiết Mục */}
              <Row className="pb-1">
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <NoteAlt /> &nbsp;Nội Dung Tiết Mục
                  </Form.Label>

                  <SunEditor
                    plugin=""
                    placeholder="Nhập Nội dung tiết mục..."
                    setContents={noiDungTietMuc}
                    onChange={setNoiDungTietMuc}
                    setDefaultStyle="font-family: Arial; font-size: 16px;"
                    setOptions={{
                      buttonList: [
                        ["undo", "redo"],
                        ["font", "fontSize"],
                        // ['paragraphStyle', 'blockquote'],
                        [
                          "bold",
                          "underline",
                          "italic",
                          "strike",
                          "subscript",
                          "superscript",
                        ],
                        ["fontColor", "hiliteColor"],
                        ["align", "list", "lineHeight"],
                        ["outdent", "indent"],

                        ["table", "horizontalRule", "link", "image", "video"],
                        // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                        // ['imageGallery'], // You must add the "imageGalleryUrl".
                        // ["fullScreen", "showBlocks", "codeView"],
                        ["preview", "print"],
                        ["removeFormat"],

                        // ['save', 'template'],
                        // '/', Line break
                      ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                      defaultTag: "div",
                      minHeight: "300px",
                      height: "auto",
                      showPathLabel: false,
                      font: sortedFontOptions,
                    }}
                  />
                </Form.Group>
              </Row>

              <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
                <MusicNote style={{ fontSize: "2.6rem" }} />
                Đội Nhóm Trình Bày
                <MusicNote style={{ fontSize: "2.6rem" }} />
              </h2>

              {/* Bảng Thí Sinh Thuộc Đơn Vị */}
              <Row className="mx-0 justify-content-end">
                <>
                  <Row className="mb-2 px-0 mx-0">
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                      className="px-0"
                      xs="12"
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          setShow(true);
                        }}
                        startIcon={<Refresh />}
                      >
                        Thay Đổi Đội Nhóm
                      </Button>
                    </Col>
                  </Row>

                  <MuiDatatable
                    title={tenDoanDoi}
                    data={dataThanhVien}
                    columns={columnsThiSinh}
                    options={optionsThiSinh}
                  />
                </>
              </Row>

              {/* Button Add, Back */}
              <Row className="py-2 justify-content-center">
                {trangThai == 3 ? (
                  <>
                    <Col xs="12" md="3"></Col>

                    <Col xs="12" md="3" className="text-center my-1">
                      <Button
                        variant="contained"
                        className="button-style"
                        color="error"
                        startIcon={<ArrowBack />}
                        onClick={() => {
                          navigate(`/chinhsuacuocthi/${params.idCuocThi}`);
                        }}
                      >
                        Back
                      </Button>
                    </Col>

                    <Col xs="12" md="3"></Col>
                  </>
                ) : (
                  <>
                    <Col xs="12" md="3"></Col>
                    <Col xs="12" md="3" className="text-center my-1">
                      <Button
                        variant="contained"
                        className="button-style"
                        startIcon={<Save />}
                        onClick={handleUpdateTietMuc}
                      >
                        Save
                      </Button>
                    </Col>
                    <Col xs="12" md="3" className="text-center my-1">
                      <Button
                        variant="contained"
                        className="button-style"
                        color="error"
                        startIcon={<ArrowBack />}
                        onClick={() => {
                          navigate(`/chinhsuacuocthi/${params.idCuocThi}`);
                        }}
                      >
                        Back
                      </Button>
                    </Col>
                    <Col xs="12" md="3"></Col>
                  </>
                )}
              </Row>
            </Form>
          </div>

          {/* Chỉnh Sửa Thành Viên */}
          <Modal show={showCSTS} onHide={handleCloseCSTS} className="modal-lg">
            <Modal.Header closeButton className="px-4">
              <Modal.Title className="ms-auto">
                Chỉnh Sửa Thông Tin Thành Viên
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Họ Tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập Họ Tên..."
                    defaultValue={hoTen}
                    onBlur={(e) => setHoTen(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mã Định Danh</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập mã định danh..."
                    defaultValue={maDinhDanh}
                    onBlur={(e) => setMaDinhDanh(e.target.value)}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Giới Tính</Form.Label>
                  <Form.Select
                    value={gioiTinh}
                    onChange={(e) => setGioiTinh(e.target.value)}
                  >
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                  </Form.Select>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={email}
                    onChange={(e) => handleEmailCheck(e)}
                    placeholder="Nhập Email..."
                  />
                  <Form.Text className="text-danger">{emailErr}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số Điện Thoại</Form.Label>
                  <Form.Control
                    type="text"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    value={phone}
                    placeholder="Nhập Số Điện Thoại..."
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mã Lớp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập Mã Lớp..."
                    defaultValue={maLop}
                    onBlur={(e) => setMaLop(e.target.value)}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer className="py-2 justify-content-center">
              <Row>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    className="modal-button-style"
                    onClick={() => {
                      handleUpdateThanhVien();
                      handleCloseCSTS();
                    }}
                  >
                    Save
                  </Button>
                </Col>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    color="error"
                    className="modal-button-style"
                    onClick={handleCloseCSTS}
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal>

          {/* Modal Thay Đổi Đoàn Đội */}
          <Modal show={show} onHide={handleClose} dialogClassName="modal-width">
            <Modal.Header closeButton className="px-4">
              <Modal.Title className="ms-auto">
                Thay Đổi Đoàn Đội Trình Bày
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row style={{ padding: "10px 12px" }}>
                <MuiDatatable
                  title="Danh Sách Đoàn Đội"
                  data={dataDoanDoi}
                  columns={columnsDoanDoi}
                  options={optionsDoanDoi}
                />
              </Row>
            </Modal.Body>
            <Modal.Footer className="py-2 justify-content-center">
              <Row>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    className="modal-button-style"
                    onClick={handleChangeDoanDoi}
                  >
                    Change
                  </Button>
                </Col>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    color="error"
                    className="modal-button-style"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
