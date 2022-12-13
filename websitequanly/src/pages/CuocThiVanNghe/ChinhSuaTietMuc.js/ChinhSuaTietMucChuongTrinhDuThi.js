/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Form, Row, Col, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import "../CuocThiVanNghe.css";
import {
  Add,
  ArrowBack,
  ConfirmationNumber,
  Delete,
  Edit,
  MusicNote,
  NoteAlt,
  QueueMusicRounded,
  Save,
} from "@mui/icons-material";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";
import MuiDatatable from "../../../components/table/MuiDatatable";
import Select from "react-select";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function ChinhSuaTietMucChuongTrinhDuThi() {
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

  const dayjs = require("dayjs");

  const params = useParams();
  const navigate = useNavigate();

  const [tableBodyHeight, setTableBodyHeight] = useState("450px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [nhanSo, setNhanSo] = useState();
  // eslint-disable-next-line no-unused-vars
  const [maDonVi, setMaDonVi] = useState();

  const [tenTietMuc, setTenTietMuc] = useState("");
  const [loaiTietMuc, setLoaiTietMuc] = useState(1);
  const [thoiGianThucHien, setThoiGianThucHien] = useState(5);

  const [dataLoaiTietMuc, setDataLoaiTietMuc] = useState([]);
  const [dataCTLoaiTietMuc, setDataCTLoaiTietMuc] = useState([]);
  const [loaiCoDinh, setLoaiCoDinh] = useState(1);
  const [nhanSoTT, setNhanSoTT] = useState();

  const [dataThiSinh, setDataThiSinh] = useState([]);
  const [dataThiSinhKTB, setDataThiSinhKTB] = useState([]);

  const [tenCuocThi, setTenCuocThi] = useState("");
  const [trangThai, setTrangThai] = useState(-1);

  const [tenChuongTrinh, setTenChuongTrinh] = useState("");
  const [maNhomTruong, setMaNhomTruong] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [tenDoanDoi, setTenDoanDoi] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [hinhThucCT, setHinhThucCT] = useState("");
  const [tenDonVi, setTenDonVi] = useState("");
  const [noiDungTietMuc, setNoiDungTietMuc] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setHoTen("");
      setMaDinhDanh("");
      setMaLop("");
      setGioiTinh(1);
      setEmail("");
      setPhone("");
      setMaThiSinh(-1);
    }, 300);
  };

  const [showKTB, setShowKTB] = useState(false);
  const handleCloseKTB = () => {
    setShowKTB(false);
  };

  const [maThiSinh, setMaThiSinh] = useState(-1);
  const [hoTen, setHoTen] = useState("");
  const [maDinhDanh, setMaDinhDanh] = useState("");
  const [gioiTinh, setGioiTinh] = useState(1);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phone, setPhone] = useState("");
  const [maLop, setMaLop] = useState("");

  const [dataMaThiSinh, setDataMaThiSinh] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [rowCount, setRowCount] = useState(0);

  const [refresh, setRefresh] = useState(-1);
  const [rowRefresh, setRowRefresh] = useState(-1);

  const [maDoanDoi, setMaDoanDoi] = useState();

  // Lấy Thông Tin Loại Tiết Mục Từ Database
  useEffect(() => {
    const getDataLoaiTietMuc = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/loaitietmuc"
      );
      setDataCTLoaiTietMuc(data);
      let arr = [];
      data.forEach((d) => {
        arr.push({ value: d.MaLoaiTietMuc, label: d.TenLoaiTietMuc });
      });
      setDataLoaiTietMuc(arr);
    };
    getDataLoaiTietMuc();
  }, [refresh]);

  // Lấy Thông Tin Cuộc thi Từ Database
  useEffect(() => {
    const getDataChiTietCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
      );
      setTenCuocThi(data[0].TenCuocThi);
      setTrangThai(data[0].MaTrangThai);
    };
    getDataChiTietCuocThi();
  }, [refresh]);

  // Lấy Thông Tin Chương trình Từ Database
  useEffect(() => {
    const getDataChiTietCT = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chitietchuongtrinh/${params.idChuongTrinh}`
      );
      setTenChuongTrinh(data[0].TenChuongTrinh);
      setHinhThucCT(data[0].TenHinhThucChuongTrinh);
      setThoiGianThucHien(
        dayjs(data[0].NgayGioToChuc).format("YYYY-MM-DDTHH:mm")
      );
      setTenDonVi(data[0].TenDonVi);
      setMaDonVi(data[0].MaDonVi);
      setMaNhomTruong(data[0].MaTruongDonVi);
      setMaDoanDoi(data[0].MaDoanDoi);
      setTenDoanDoi(data[0].TenDoanDoi);
    };
    getDataChiTietCT();
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
      setLoaiCoDinh(data[0].CoDinh);
      setNhanSoTT(data[0].NhanSoToiThieu);
      setNoiDungTietMuc(data[0].NoiDungTietMuc);
    };
    getDataChiTietTietMuc();
  }, [refresh]);

  useEffect(() => {
    const getDataThiSinhTrinhBay = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chuongtrinh/${params.idChuongTrinh}}/thisinhtrinhbay/${params.idTietMuc}`
      );
      data.forEach((d) => {
        d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ";
      });
      setDataThiSinh(data);
    };
    getDataThiSinhTrinhBay();

    const getDataThiSinhKTB = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chuongtrinh/${params.idChuongTrinh}}/thisinhkhongtrinhbay/${params.idTietMuc}`
      );
      data.forEach((d) => {
        d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ";
      });
      setDataThiSinhKTB(data);
    };
    getDataThiSinhKTB();

    const getDataChiTietTietMuc = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chitiettietmuc/${params.idTietMuc}`
      );
      setNhanSo(data[0].NhanSo);
    };
    getDataChiTietTietMuc();
  }, [refresh, rowRefresh]);

  const optionsThiSinh = {
    search: true,
    searchPlaceholder: "Tên thí sinh, email, phone...",
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
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      return <></>;
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
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ marginLeft: "25px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "35px" }}>{value}</div>;
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
      label: "Email Thí Sinh",
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
                      setShow(true);
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
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        disableColumnMenu: true,
        customBodyRender: (
          value,
          tableMeta,
          updateValue,
          displayData,
          selectableRows
        ) => {
          return (
            <>
              <MuiToolTip title="Delete">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  className="delete-hover"
                  onClick={() => {
                    handleDeleteThanhVienTrinhBay(tableMeta.rowData[0]);
                  }}
                >
                  <Delete />
                </IconButton>
              </MuiToolTip>
            </>
          );
        },
      },
    },
  ];

  const optionsThiSinhKTB = {
    search: true,
    searchPlaceholder: "Tên Thí sinh, Email, Phone...",
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPage,
    selectToolbarPlacement: "above",
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      return <></>;
    },
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      setRowCount(allRowsSelected.length);
      setDataMaThiSinh(allRowsSelected);
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

  const columnsThiSinhKTB = [
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
      label: "Email Thí Sinh",
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
  ];

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
          alert("Chỉnh Sửa Thông Tin Thành Công!");
        }, 400);
      });
    }
  }; 

  const handleBoSungThanhVien = () => {
    let arr = [];
    for (let i = 0; i < dataThiSinhKTB.length; i++) {
      arr.push([dataThiSinhKTB[i].stt, dataThiSinhKTB[i].MaThiSinh]);
    }

    let arrMaThiSinh = [];
    for (let i = 0; i < dataMaThiSinh.length; i++) {
      let value = dataMaThiSinh[i].dataIndex + 1;

      for (let n = 0; n < arr.length; n++) {
        if (value == arr[n][0]) {
          arrMaThiSinh.push(arr[n][1]);
          break;
        }
      }
    }
    if (arrMaThiSinh.length > 0) {
      Axios.post(
        `http://localhost:3001/api/admin/bosungthanhvientrinhbay/${params.idTietMuc}`,
        {
          arrMaThiSinh: arrMaThiSinh,
        }
      ).then((response) => {
        setRowRefresh(Math.random());
        handleCloseKTB();

        setRefresh(Math.random());
        setTimeout(() => {
          alert("Bổ sung thành công!");
        }, 400);
      });
    }
  };

  const handleDeleteThanhVienTrinhBay = (id) => {
    if (window.confirm("Bạn có chắc muốn XÓA thành viên này ?")) {
      Axios.post(
        `http://localhost:3001/api/admin/deletethanhvientrinhbay/${params.idTietMuc}`,
        {
          MaThiSinh: id,
        }
      ).then((response) => {
        setRowRefresh(Math.random());
        setRefresh(Math.random());
        setTimeout(() => {
          alert("Xóa thành công!");
        }, 400);
      });
    }
  };

  const handleUpdateTietMuc = () => {
    if (loaiCoDinh == 0) {
      if (nhanSo < nhanSoTT) {
        alert("Chưa đủ nhân số trình bày Tiết mục!");
      } else {
        Axios.post(
          `http://localhost:3001/api/admin/updatetietmuc/${params.idTietMuc}`,
          {
            TenTietMuc: tenTietMuc,
            MaLoaiTietMuc: loaiTietMuc.value,
            NhanSo: nhanSo,
            NgayGioThucHien: thoiGianThucHien,
            NoiDungTietMuc: noiDungTietMuc,
          }
        ).then((response) => {
          document.getElementById("topBtn").click();
          setRefresh(Math.random());
          setTimeout(() => {
            alert("Chỉnh Sửa Thông Tin Thành Công!");
          }, 400);
        });
      }
    } else if (loaiCoDinh == 1) {
      if (nhanSo != nhanSoTT) {
        alert(
          "Nhân số không đúng! Xin hãy xem lại số lượng thành viên trình bày Tiết mục!"
        );
      } else {
        Axios.post(
          `http://localhost:3001/api/admin/updatetietmuc/${params.idTietMuc}`,
          {
            TenTietMuc: tenTietMuc,
            MaLoaiTietMuc: loaiTietMuc.value,
            NhanSo: nhanSo,
            NgayGioThucHien: thoiGianThucHien,
            NoiDungTietMuc: noiDungTietMuc,
          }
        ).then((response) => {
          document.getElementById("topBtn").click();
          setRefresh(Math.random());
          setTimeout(() => {
            alert("Chỉnh Sửa Thông Tin Thành Công!");
          }, 400);
        });
      }
    }
  };

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      document.getElementById("cuocthivannghe").classList.add("actives");
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
            <li className="breadcrumb-item">
              <Link
                to={`/chinhsuacuocthi/${params.idCuocThi}/chinhsuachuongtrinh/${params.idChuongTrinh}`}
                className="link"
              >
                {tenChuongTrinh}
              </Link>
            </li>
            <li className="breadcrumb-item active">Chi Tiết Tiết Mục</li>
          </ol>

          {/* <Breadcrumb>
            <Breadcrumb.Item as={Link} to="/home">
              <Link to="/home" className="link">
                Home
              </Link>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" tabIndex="-1">
              <Link to="/tatcacuocthi" className="link">
                Tất Cả Cuộc Thi
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href="#"
              tabIndex="-1"
              style={{ textAlign: "left" }}
            >
              <Link
                to={`/chinhsuacuocthi/truyenthong/${params.idCuocThi}`}
                className="link"
              >
                {tenCuocThi}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href="#"
              tabIndex="-1"
              style={{ textAlign: "left" }}
            >
              <Link
                to={`/chinhsuacuocthi/truyenthong/${params.idCuocThi}/chinhsuachuongtrinh/${params.idChuongTrinh}`}
                className="link"
              >
                {tenChuongTrinh}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Chỉnh Sửa Tiết Mục</Breadcrumb.Item>
          </Breadcrumb> */}

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
                <Col xs="12">
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
                      required
                      id="tentietmuc"
                      defaultValue={tenTietMuc}
                      onBlur={(e) => setTenTietMuc(e.target.value)}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              {/* Loại Tiết Mục, Nhân Số, Thời Gian Thực Hiện */}
              <Row>
                {/* Loại Tiết Mục */}
                <Col xs="12" md="8">
                  <Row>
                    <Col xs="12" md="8">
                      <Form.Group className="mb-1">
                        <Form.Label
                          className="d-flex align-items-center"
                          style={{ fontWeight: "500", width: "100%" }}
                        >
                          <QueueMusicRounded /> Loại Tiết Mục{" "}
                        </Form.Label>
                        <Select
                          options={dataLoaiTietMuc}
                          value={loaiTietMuc}
                          id="loaitietmuc"
                          onChange={(e) => {
                            setLoaiTietMuc(e);
                            let value = dataCTLoaiTietMuc.filter((d) => {
                              return d.MaLoaiTietMuc == e.value;
                            });
                            setLoaiCoDinh(value[0].CoDinh);
                            setNhanSoTT(value[0].NhanSoToiThieu);
                          }}
                          className="zIndex-997"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs="12" md="4">
                      {/* Nhân Số */}
                      <Form.Group className="mb-3">
                        <Form.Label
                          className="d-flex align-items-center"
                          style={{ fontWeight: "500" }}
                        >
                          <ConfirmationNumber />
                          &nbsp;
                          {loaiCoDinh == 0
                            ? `Nhân Số (Tối thiểu: ${nhanSoTT})`
                            : "Nhân Số"}
                        </Form.Label>
                        <Form.Control type="number" value={nhanSo} readOnly />
                        <Form.Text className="text-muted"></Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>

                {/*Đơn Vị Tổ Chức */}
                <Col xs="12" md="4">
                  <Form.Group className="mb-3">
                    <Form.Label
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <MusicNote /> Đơn Vị Tổ Chức
                    </Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={tenDonVi}
                      readOnly
                    />
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
                Thành Viên Trình Bày
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
                      {loaiCoDinh == 0 ? (
                        <Button
                          variant="contained"
                          startIcon={<Add />}
                          onClick={() => {
                            setShowKTB(true);
                          }}
                        >
                          Bổ Sung Thành Viên
                        </Button>
                      ) : nhanSo < nhanSoTT ? (
                        <Button
                          variant="contained"
                          startIcon={<Add />}
                          onClick={() => {
                            setShowKTB(true);
                          }}
                        >
                          Bổ Sung Thành Viên
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<Add />}
                          disabled
                        >
                          Bổ Sung Thành Viên
                        </Button>
                      )}
                    </Col>
                  </Row>

                  <MuiDatatable
                    title="Danh sách Thí Sinh Thuộc Đơn Vị"
                    data={dataThiSinh}
                    columns={columnsThiSinh}
                    options={optionsThiSinh}
                  />
                </>
              </Row>

              {/* Button Add, Back */}
              <Row className="pt-2 justify-content-center">
                {trangThai == 3 ? (
                  <>
                    <Col xs="12" md="3"></Col>
                    <Col xs="12" md="3">
                      <Button
                        variant="contained"
                        color="error"
                        className="button-style"
                        startIcon={<ArrowBack />}
                        onClick={() =>
                          navigate(
                            `/chinhsuachuongtrinh/${params.idChuongTrinh}`
                          )
                        }
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
                        onClick={() => {
                          handleUpdateTietMuc();
                        }}
                      >
                        Save
                      </Button>
                    </Col>
                    <Col xs="12" md="3" className="text-center my-1">
                      <Button
                        variant="contained"
                        color="error"
                        className="button-style"
                        startIcon={<ArrowBack />}
                        onClick={() =>
                          navigate(
                            `/chinhsuachuongtrinh/${params.idChuongTrinh}`
                          )
                        }
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
          <Modal show={show} onHide={handleClose} className="modal-lg">
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
            <Modal.Footer className="justify-content-center">
              <Row>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    className="modal-button-style"
                    onClick={() => {
                      handleUpdateThanhVien();
                      handleClose();
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
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showKTB}
            onHide={handleCloseKTB}
            dialogClassName="modal-width-80"
          >
            <Modal.Header closeButton className="px-4">
              <Modal.Title className="ms-auto">Bổ Sung Thành Viên</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row style={{ padding: "10px 24px" }}>
                <MuiDatatable
                  title="Danh sách Thí Sinh Thuộc Đơn Vị"
                  data={dataThiSinhKTB}
                  columns={columnsThiSinhKTB}
                  options={optionsThiSinhKTB}
                />
              </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Row>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    className="modal-button-style"
                    onClick={handleBoSungThanhVien}
                  >
                    Add
                  </Button>
                </Col>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    color="error"
                    className="modal-button-style"
                    onClick={handleCloseKTB}
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
