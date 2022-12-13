/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Form, Row, Col, Modal, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../CuocThiVanNghe.css";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MusicNote,
  LibraryMusic,
  EditLocationAlt,
  HourglassTop,
  HourglassBottom,
  NoteAlt,
  Pin,
  Radio,
  BallotRounded,
  Add,
  AppRegistration,
  Mail,
  Delete,
  Save,
  ArrowBack,
} from "@mui/icons-material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import MuiDatatable from "../../../components/table/MuiDatatable";
import { IconButton, Tooltip as MuiToolTip } from "@mui/material";
import TietMucThiSinh from "./TietMucThiSinh/TietMucThiSinh";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import TietMucThiSinhChuongTrinh from "./TietMucThiSinhChuongTrinh";

export default function ChinhSuaCuocThi() {
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
  const navigate = useNavigate();

  const dayjs = require("dayjs");

  const dataHinhThuc = [
    { value: 1, label: "Chương trình truyền thống" },
    { value: 2, label: "Đăng ký Thể loại Tự do" },
  ];

  const dataPhanThi = [
    { value: 1, label: "Cá Nhân" },
    { value: 2, label: "Đội Nhóm" },
  ];

  const dataSoVongThi = [
    { value: 2, label: "2 vòng (Sơ tuyển - Chung kết)" },
    { value: 3, label: "3 vòng (Sơ tuyển - Chung khảo - Chung kết)" },
  ];

  const dataThangDiem = [
    { value: 1, label: "Thang Điểm 10" },
    { value: 2, label: "Thang Điểm 20" },
  ];

  const [dataDiaDiem, setDataDiaDiem] = useState([]);
  const [dataTrangThai, setDataTrangThai] = useState([]);

  const [tenCuocThi, setTenCuocThi] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [hinhThuc, setHinhThuc] = useState(dataHinhThuc[0]);
  const [trangThai, setTrangThai] = useState({
    value: 1,
    label: "Chưa Tổ Chức",
  });
  const [phanThi, setPhanThi] = useState(dataPhanThi[0]);
  const [ngayBatDau, setNgayBatDau] = useState(null);
  const [ngayKetThuc, setNgayKetThuc] = useState(null);
  const [soVongThi, setSoVongThi] = useState(dataSoVongThi[0]);
  const [thangDiem, setThangDiem] = useState(dataThangDiem[0]);

  const [noiDungCuocThi, setNoiDungCuocThi] = useState("");
  const [diaDiemToChuc, setDiaDiemToChuc] = useState(5);
  const [dataMaTietMuc, setDataMaTietMuc] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const [dataGiamKhao, setDataGiamKhao] = useState([]);
  const [dataGiamKhaoKhongThuocCuocThi, setDataGiamKhaoKhongThuocCuocThi] =
    useState([]);
  const [refresh, setRefresh] = useState(-1);

  useEffect(() => {
    const getDataDiaDiem = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/diadiem"
      );
      let arr = [];
      data.forEach((d) => {
        arr.push({ value: d.MaDiaDiem, label: d.TenDiaDiem });
      });
      setDataDiaDiem(arr);
    };
    getDataDiaDiem();

    const getDataTrangThai = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/trangthai"
      );
      let arr = [];
      data.forEach((d) => {
        arr.push({ value: d.MaTrangThai, label: d.TenTrangThai });
      });
      setDataTrangThai(arr);
    };
    getDataTrangThai();
  }, [refresh]);

  useEffect(() => {
    const getDataChiTietCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
      );
      setTenCuocThi(data[0].TenCuocThi);
      setHinhThuc({
        value: data[0].MaHinhThucCuocThi,
        label: data[0].TenHinhThuc,
      });
      setNoiDungCuocThi(data[0].NoiDungCuocThi);
      setDiaDiemToChuc({ value: data[0].MaDiaDiem, label: data[0].TenDiaDiem });
      setNgayBatDau(dayjs(data[0].NgayBatDau).format("YYYY-MM-DD"));
      setNgayKetThuc(dayjs(data[0].NgayKetThuc).format("YYYY-MM-DD"));
      setSoVongThi({
        value: data[0].SoVongThi,
        label: data[0].TenSoVong,
      });
      setThangDiem({ value: data[0].MaThangDiem, label: data[0].TenThangDiem });
      setPhanThi({ value: data[0].MaPhanThi, label: data[0].TenPhanThi });
      setTrangThai({ value: data[0].MaTrangThai, label: data[0].TenTrangThai });
    };

    getDataChiTietCuocThi();
  }, [refresh]);

  useEffect(() => {
    const getDataGiamKhao = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/giamkhaocuocthi/${params.idCuocThi}`
      );
      setDataGiamKhao(data);
    };
    getDataGiamKhao();

    const getDataMaTietMuc = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/allmatietmuccuocthi/${params.idCuocThi}`
      );
      setDataMaTietMuc(data);
    };
    getDataMaTietMuc();

    const getDataGiamKhaoKhongThuocCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/giamkhaokhongthuoccuocthi/${params.idCuocThi}`
      );
      setDataGiamKhaoKhongThuocCuocThi(data);
    };
    getDataGiamKhaoKhongThuocCuocThi();
  }, [refresh]);

  const columnsNguoiDung = [
    //ID
    {
      name: "MaNguoiDung",
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
    //Họ Tên Giám Khảo
    {
      name: "HoTenNguoiDung",
      label: "Họ Tên",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    //Giới Tính
    {
      name: "GioiTinh",
      label: "Giới Tính",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value === 1 ? "Nam" : "Nữ"}</div>;
        },
      },
    },
    //Email
    {
      name: "Email",
      label: "Email",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    //Phone
    {
      name: "Phone",
      label: "Phone",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ marginRight: trangThai.value == 3 ? "0px" : "150px" }}>{value}</div>;
        },
      },
    },
    //Sent Mail
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        print: false,
        viewColumns: false,
        disableColumnMenu: true,
        display: trangThai.value == 3 ? false : true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <MuiToolTip title={"Sent Mail"}>
              <IconButton
                edge="end"
                aria-label="edit"
                className="edit-hover"
                onClick={() => {
                  handleSentMail(tableMeta.rowData[4]);
                }}
              >
                <Mail />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
    //Delete
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        print: false,
        display: trangThai.value > 1 ? false : true,
        viewColumns: false,
        disableColumnMenu: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <MuiToolTip title={"Delete"}>
              <IconButton
                edge="end"
                aria-label="edit"
                className="delete-hover"
                onClick={() => {
                  handleDeleteGiamKhao(tableMeta.rowData[0]);
                }}
              >
                <Delete />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
  ];

  const optionsNguoiDung = {
    search: true,
    searchPlaceholder: "Tên Giám Khảo, Email, Phone,...",
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
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      setDataMaGiamKhao(allRowsSelected);
    },

    customToolbar: () => {
      return (
        <>
          {trangThai.value > 1 ? (
            <></>
          ) : (
            <MuiToolTip title={"Thêm Giám Khảo"}>
              <IconButton
                className="icon-hover"
                onClick={() => {
                  setShow(true);
                }}
              >
                <Add />
              </IconButton>
            </MuiToolTip>
          )}
          {trangThai.value == 3 ? (
            <></>
          ) : (
            <MuiToolTip title={"Gửi Tất Cả"}>
              <IconButton
                className="icon-hover"
                onClick={() => {
                  handleSentAllMail();
                }}
              >
                <Mail />
              </IconButton>
            </MuiToolTip>
          )}
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

      // console.log(values.forEach((val) => console.log(val)));

      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);

      const fileName = `DanhSachGiamKhao`;
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

  const columnsThemNguoiDung = [
    //ID
    {
      name: "MaNguoiDung",
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
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    //Họ Tên Giám Khảo
    {
      name: "HoTenNguoiDung",
      label: "Họ Tên",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    //Giới Tính
    {
      name: "GioiTinh",
      label: "Giới Tính",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value === 1 ? "Nam" : "Nữ"}</div>;
        },
      },
    },
    //Email
    {
      name: "Email",
      label: "Email",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    //Phone
    {
      name: "Phone",
      label: "Phone",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
  ];

  const optionsThemNguoiDung = {
    search: true,
    searchPlaceholder: "Tên Người Dùng, Email, Chuyên Môn,...",
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "370px",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    customToolbarSelect: () => <></>,
    selectToolbarPlacement: "above",
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      setTimeout(() => {
        setDataMaGiamKhao(allRowsSelected);
      }, 500);
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

  const [dataMaGiamKhao, setDataMaGiamKhao] = useState([]);

  const handleAddGiamKhao = () => {
    let arr = [];
    for (let i = 0; i < dataGiamKhaoKhongThuocCuocThi.length; i++) {
      arr.push([
        dataGiamKhaoKhongThuocCuocThi[i].stt,
        dataGiamKhaoKhongThuocCuocThi[i].MaNguoiDung,
      ]);
    }
    let arrMaGiamKhao = [];
    for (let i = 0; i < dataMaGiamKhao.length; i++) {
      let value = dataMaGiamKhao[i].dataIndex + 1;

      for (let n = 0; n < arr.length; n++) {
        if (value == arr[n][0]) {
          arrMaGiamKhao.push(arr[n][1]);
          break;
        }
      }
    }
    let arrMaTietMuc = [];
    dataMaTietMuc.forEach((d) => {
      arrMaTietMuc.push(d.MaTietMuc);
    });
    Axios.post(
      `http://localhost:3001/api/admin/addgiamkhaocuocthi/${params.idCuocThi}`,
      {
        arrMaGiamKhao: arrMaGiamKhao,
        arrMaTietMuc: arrMaTietMuc,
      }
    ).then((response) => {
      setRefresh(Math.random());
      setTimeout(() => {
        alert("Thêm giám khảo thành công!");
      }, 500);
    });
  };

  const handleSaveChange = () => {
    if (tenCuocThi == "") {
      alert("Tên Cuộc thi không được để trống");
    } else if (ngayBatDau == null) {
      alert("Ngày bắt đầu không được để trống!");
    } else if (ngayKetThuc == null) {
      alert("Ngày kết thúc không được để trống!");
    } else {
      Axios.post(
        `http://localhost:3001/api/admin/updatecuocthi/${params.idCuocThi}`,
        {
          TenCuocThi: tenCuocThi,
          NoiDungCuocThi: noiDungCuocThi,
          MaHinhThucCuocThi: hinhThuc.value,
          MaPhanThi: hinhThuc.value == 1 ? null : phanThi.value,
          SoVongThi: hinhThuc.value == 1 ? 1 : soVongThi.value,
          ThangDiem: thangDiem.value,
          NgayBatDau: ngayBatDau,
          NgayKetThuc: ngayKetThuc,
          DiaDiemToChuc: diaDiemToChuc.value,
          TrangThai: trangThai.value,
        }
      ).then((response) => {
        document.getElementById("topBtn").click();
        setRefresh(Math.random());
        setTimeout(() => {
          alert("Cập nhật thông tin thành công!");
        }, 500);
      });
    }
  };

  const handleSentMail = (mailName) => {
    let noidungEmail = `<span>Kính gửi Anh/ Chị, Chúng tôi gửi đến Anh/ Chị lịch tổ chức ${tenCuocThi}.</span><br/>Địa Điểm Tổ Chức: Hội Trường Rùa, Từ Ngày ${dayjs(
      ngayBatDau
    ).format("DD/MM/YYYY")} - ${dayjs(ngayKetThuc).format(
      "DD/MM/YYYY"
    )}.<br />Thông tin chi tiết Cuộc thi cũng như thời gian tổ chức các mục thi xin mời Anh/ chị truy cập Website: http://localhost:3000 .`;
    let title = "Lịch Tổ Chức Cuộc Thi";
    Axios.post(`http://localhost:3001/mailto`, {
      mail: mailName,
      title: title,
      noidungEmail: noidungEmail,
    }).then((response) => {});
    setRefresh(Math.random());

    setTimeout(() => {
      alert("Gửi thành công !");
    }, 1000);
  };

  const handleSentAllMail = () => {
    let noidungEmail = `<span>Kính gửi Anh/ Chị, Chúng tôi gửi đến Anh/ Chị lịch tổ chức ${tenCuocThi}.</span><br/>Địa Điểm Tổ Chức: Hội Trường Rùa, Từ Ngày ${dayjs(
      ngayBatDau
    ).format("DD/MM/YYYY")} - ${dayjs(ngayKetThuc).format(
      "DD/MM/YYYY"
    )}.<br />Thông tin chi tiết Cuộc thi cũng như thời gian tổ chức các mục thi xin mời Anh/ chị truy cập Website: http://localhost:3000 .`;
    dataGiamKhao.forEach((d) => {
      let title = "Lịch Tổ Chức Cuộc Thi";
      Axios.post(`http://localhost:3001/mailto`, {
        mail: d.Email,
        title: title,
        noidungEmail: noidungEmail,
      }).then((response) => {});
    });
    setRefresh(Math.random());
    setTimeout(() => {
      alert("Gửi thành công !");
    }, 1000);
  };

  const handleDeleteGiamKhao = (id) => {
    if (window.confirm("Bạn có chắc muốn XÓA giám khảo này ?")) {
      Axios.post(
        `http://localhost:3001/api/admin/deletegiamkhao/${params.idCuocThi}/${id}`
      ).then((response) => {
        setRefresh(Math.random());
        setTimeout(() => {
          alert("Xóa giám khảo thành công!");
        }, 500);
      });
    }
  };

  useEffect(() => {
    document.getElementById("cuocthivannghe").classList.add("actives");
    document.title = "Chỉnh Sửa Cuộc Thi";
  }, []);

  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
      document.getElementById("bangtmct").classList.remove("d-none");
      document.getElementById("bgk").classList.remove("d-none");
    }, 400);
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
              left: "49%",
              width: "50px",
              height: "50px",
            }}
          />
        </div>
      ) : (
        <>
          <div id="chinhsuachuongtrinhtudo">
            {/* <Breadcrumb href="#" tabIndex="-1">
              <Breadcrumb.Item>
                <Link to="/home" className="link">
                  Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#" tabIndex="-1">
                <Link to="/tatcacuocthi" className="link">
                  Cuộc Thi Văn Nghệ
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Chỉnh Sửa Cuộc Thi</Breadcrumb.Item>
            </Breadcrumb> */}

            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/home" className="link">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/tatcacuocthi" className="link">
                  Cuộc Thi Văn Nghệ
                </Link>
              </li>
              <li className="breadcrumb-item active">Chi Tiết Cuộc Thi</li>
            </ol>

            {/* Thêm Cuộc Thi */}
            <div className="newContest text-start">
              {/* Thêm Cuộc Thi */}
              <div>
                <h2 className="text-center d-flex align-items-center justify-content-center pb-3">
                  <MusicNote style={{ fontSize: "2.6rem" }} />
                  Chi Tiết Cuộc Thi Văn Nghệ
                  <MusicNote style={{ fontSize: "2.6rem" }} />
                </h2>
                <Row className="pb-2">
                  {hinhThuc.value == 1 ? (
                    <>
                      <Col xs="12" md="8">
                        {/* Tên Cuộc Thi */}
                        <Form.Group className="mb-3">
                          <Form.Label
                            htmlFor="tenchuongtrinh"
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500" }}
                          >
                            <Radio />
                            &nbsp;Tên Cuộc Thi
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nhập tên Cuộc thi..."
                            onBlur={(e) => setTenCuocThi(e.target.value)}
                            defaultValue={tenCuocThi}
                          />
                          <Form.Text className="text-muted">
                            <b style={{ color: "red" }}></b>
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col xs="12" md="4">
                        <Form.Group className="mb-1">
                          <Form.Label
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500" }}
                          >
                            <LibraryMusic />
                            &nbsp;Hình Thức Cuộc Thi
                          </Form.Label>
                          <Select
                            options={dataHinhThuc}
                            value={hinhThuc}
                            onChange={(e) => {
                              setHinhThuc(e);
                              if (e.value == 2 && phanThi.value == 0) {
                                setPhanThi(dataPhanThi[0]);
                                setSoVongThi(dataSoVongThi[0]);
                              }
                              if (e.value == 2 && phanThi.value == 0) {
                                setSoVongThi({ value: 1, label: "1 Vòng" });
                              }
                            }}
                            className="zIndex-997"
                          />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col xs="12" md="10">
                        {/* Tên Cuộc Thi */}
                        <Row>
                          <Col xs="12" md="9">
                            <Form.Group className="mb-3">
                              <Form.Label
                                htmlFor="tenchuongtrinh"
                                className="d-flex align-items-center"
                                style={{ fontWeight: "500" }}
                              >
                                <Radio />
                                &nbsp;Tên Cuộc Thi
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Nhập tên Cuộc thi..."
                                onBlur={(e) => setTenCuocThi(e.target.value)}
                                defaultValue={tenCuocThi}
                              />
                              <Form.Text className="text-muted">
                                <b style={{ color: "red" }}></b>
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col xs="12" md="3">
                            <Form.Group className="mb-1">
                              <Form.Label
                                className="d-flex align-items-center"
                                style={{ fontWeight: "500" }}
                              >
                                <LibraryMusic />
                                &nbsp;Hình Thức Cuộc Thi
                              </Form.Label>
                              <Select
                                options={dataHinhThuc}
                                value={hinhThuc}
                                onChange={setHinhThuc}
                                className="zIndex-997"
                              />
                              <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs="12" md="2">
                        <Form.Group className="mb-1">
                          <Form.Label
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500" }}
                          >
                            <LibraryMusic />
                            &nbsp;Phần Thi
                          </Form.Label>
                          <Select
                            options={dataPhanThi}
                            value={phanThi}
                            id="phanthi"
                            onChange={setPhanThi}
                            className="zIndex-997"
                          />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                      </Col>
                    </>
                  )}
                </Row>

                {/* Địa Điểm, Thời Gian Tổ chức */}
                <Row className="pb-2">
                  <Col xs="12" md="7">
                    <Form.Group className="mb-3">
                      <Form.Label
                        className="d-flex align-items-center"
                        style={{ fontWeight: "500" }}
                      >
                        <EditLocationAlt /> &nbsp;Địa Điểm Tổ Chức
                      </Form.Label>
                      <Select
                        options={dataDiaDiem}
                        value={diaDiemToChuc}
                        id="diadiem"
                        onChange={setDiaDiemToChuc}
                        className="zIndex-998"
                      />
                      <Form.Text className="text-muted">
                        {/* <b style={{ color: "red" }}>{priceContestMess}</b> */}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col xs="12" md="5">
                    <Form.Group className="mb-3">
                      <Row>
                        <Col xs="12" md="6">
                          <Form.Label
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500" }}
                          >
                            <HourglassTop /> &nbsp;Ngày Bắt Đầu
                          </Form.Label>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            id="ngaybatdau"
                          >
                            <DesktopDatePicker
                              inputFormat="DD/MM/YYYY"
                              value={ngayBatDau}
                              maxDate={ngayKetThuc}
                              onChange={(newValue) =>
                                setNgayBatDau(
                                  dayjs(newValue).format("YYYY-MM-DD")
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
                        </Col>
                        <Col xs="12" md="6">
                          <Form.Label
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500" }}
                          >
                            <HourglassBottom /> &nbsp;Ngày Kết Thúc
                          </Form.Label>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            id="ngayketthuc"
                          >
                            <DesktopDatePicker
                              inputFormat="DD/MM/YYYY"
                              value={ngayKetThuc}
                              minDate={ngayBatDau}
                              onChange={(newValue) =>
                                setNgayKetThuc(
                                  dayjs(newValue).format("YYYY-MM-DD")
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
                        </Col>
                      </Row>
                      <Form.Text className="text-muted">
                        {/* <b style={{ color: "red" }}>{amountContestMess}</b> */}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="pb-4">
                  <Col xs="12" md="7">
                    <Row>
                      <Col xs="12" md="6">
                        <Form.Group className="mb-3">
                          <Form.Label
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500" }}
                          >
                            <AppRegistration /> &nbsp;Trạng Thái
                          </Form.Label>
                          <Select
                            options={dataTrangThai}
                            value={trangThai}
                            id="trangthai"
                            onChange={setTrangThai}
                            className="zIndex-997"
                          />
                          <Form.Text className="text-muted">
                            {/* <b style={{ color: "red" }}>{pricePerformanceMess}</b> */}
                          </Form.Text>
                        </Form.Group>
                      </Col>

                      <Col xs="12" md="6">
                        <Form.Group className="mb-1">
                          <Form.Label
                            className="d-flex align-items-center"
                            style={{ fontWeight: "500" }}
                          >
                            <BallotRounded />
                            &nbsp;Thang Điểm
                          </Form.Label>
                          <Select
                            options={dataThangDiem}
                            value={thangDiem}
                            id="thangdiem"
                            onChange={setThangDiem}
                            className="zIndex-997"
                          />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs="12" md="5">
                    <Form.Group className="mb-1">
                      <Form.Label
                        className="d-flex align-items-center"
                        style={{ fontWeight: "500" }}
                      >
                        <Pin />
                        &nbsp;Số Vòng Thi
                      </Form.Label>
                      {hinhThuc.value == 1 ? (
                        <Form.Control type="text" value={"1 Vòng"} readOnly />
                      ) : (
                        <Select
                          options={dataSoVongThi}
                          value={soVongThi}
                          id="sovongthi"
                          onChange={setSoVongThi}
                          className="zIndex-997"
                        />
                      )}
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Chi Tiết Cuộc Thi */}
                <Row className="pb-1">
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label
                        className="d-flex align-items-center"
                        style={{ fontWeight: "500" }}
                      >
                        <NoteAlt /> &nbsp;Nội Dung Cuộc Thi
                      </Form.Label>
                      <SunEditor
                        plugin=""
                        placeholder="Nhập nội dung Cuộc thi..."
                        setContents={noiDungCuocThi}
                        onChange={setNoiDungCuocThi}
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

                            [
                              "table",
                              "horizontalRule",
                              "link",
                              "image",
                              "video",
                            ],
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
                  </Col>
                </Row>
              </div>

              <div id="bgk" className="d-none">
                {/* Thêm Giám Khảo */}
                <h2 className="text-center d-flex align-items-center justify-content-center pt-2">
                  <MusicNote style={{ fontSize: "2.6rem" }} /> Giám Khảo Cuộc
                  Thi
                  <MusicNote style={{ fontSize: "2.6rem" }} />
                </h2>

                {/* Bảng Giám Khảo */}
                <Row style={{ padding: "15px 12px" }}>
                  <MuiDatatable
                    title="Danh Sách Giám Khảo"
                    data={dataGiamKhao}
                    columns={columnsNguoiDung}
                    options={optionsNguoiDung}
                  />
                </Row>
              </div>

              <div id="bangtmct" className="d-none">
                {load ? (
                  <></>
                ) : (
                  <>
                    {hinhThuc.value == 1 ? (
                      <TietMucThiSinhChuongTrinh
                        setRefresh={setRefresh}
                        trangThai={trangThai.value}
                      />
                    ) : (
                      <TietMucThiSinh
                        SoVongThi={soVongThi.value}
                        phanThi={phanThi.value}
                        setRefresh={setRefresh}
                        trangThai={trangThai.value}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Button Add, Back */}
              <Row className="pt-4">
                <Col xs="12" md="3"></Col>
                <Col xs="12" md="3" className="my-1 d-flex justify-content-end">
                  <Button
                    variant="contained"
                    style={{ width: "100%", padding: "7px 0px" }}
                    onClick={handleSaveChange}
                    startIcon={<Save />}
                  >
                    Save Changes
                  </Button>
                </Col>
                <Col xs="12" md="3" className="my-1 d-flex">
                  <Button
                    variant="contained"
                    color="error"
                    style={{ width: "100%", padding: "7px 0px" }}
                    onClick={() => navigate("/tatcacuocthi")}
                    startIcon={<ArrowBack />}
                  >
                    Back
                  </Button>
                </Col>
                <Col xs="12" md="3"></Col>
              </Row>
            </div>
          </div>

          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton className="px-4">
              <Modal.Title className="ms-auto" style={{ color: "#344767" }}>
                <MusicNote style={{ fontSize: "2.6rem" }} />
                Thêm Giám Khảo Cuộc Thi
                <MusicNote style={{ fontSize: "2.6rem" }} />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Thêm Giám Khảo */}
              <div style={{ color: "#344767" }}>
                <Row
                  className="mx-0 justify-content-end"
                  style={{ padding: "0px 15px" }}
                >
                  <MuiDatatable
                    title="Danh Sách Giám Khảo Hiện Tại"
                    data={dataGiamKhaoKhongThuocCuocThi}
                    columns={columnsThemNguoiDung}
                    options={optionsThemNguoiDung}
                  />
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button
                variant="contained"
                style={{ padding: "7px 80px" }}
                onClick={() => {
                  handleAddGiamKhao();
                  handleClose();
                  setDataMaGiamKhao([]);
                }}
              >
                Save
              </Button>
              &nbsp;
              <Button
                variant="contained"
                color="error"
                style={{ padding: "7px 80px" }}
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
