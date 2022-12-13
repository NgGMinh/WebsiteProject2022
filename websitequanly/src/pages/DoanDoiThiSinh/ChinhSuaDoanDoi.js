/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Form, Row, Col, Modal, Breadcrumb, Spinner } from "react-bootstrap";
import "./DoanDoiThiSinh.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MusicNote,
  PeopleAltRounded,
  School,
  ConfirmationNumber,
  NoteAlt,
  Edit,
  Add,
  Delete,
  Mail,
  Person,
  Save,
  ArrowBack,
  ChangeCircleOutlined,
} from "@mui/icons-material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import MuiDatatable from "../../components/table/MuiDatatable";
import {
  Button,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Tooltip as MuiToolTip,
} from "@mui/material";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import Select from "react-select";

export default function ChinhSuaDoanDoi() {
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

  let navigate = useNavigate();
  const params = useParams();
  var XLSX = require("xlsx");

  const dataGioiTinh = [
    {
      value: 1,
      label: "Nam",
    },
    { value: 2, label: "Nữ" },
  ];

  const [tableBodyHeight, setTableBodyHeight] = useState("450px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [show, setShow] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleCloseAddIcon();
    setTimeout(() => {
      setHoTen("");
      setMaDinhDanh("");
      setMaLop("");
      setGioiTinh(dataGioiTinh[0]);
      setEmail("");
      setPhone("");
      setMaThiSinh(-1);
    }, 300);
  };

  const handleCloseImport = () => {
    setShowImport(false);
    setFileData([]);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickAddIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAddIcon = () => {
    setAnchorEl(null);
  };

  const [dataThiSinh, setDataThiSinh] = useState([]);

  const [dataThanhVien, setDataThanhVien] = useState([]);

  const [tenDoanDoi, setTenDoanDoi] = useState();
  const [donViToChuc, setDonViToChuc] = useState(1);
  const [tenDonVi, setTenDonVi] = useState("");
  const [soLuongThanhVien, setSoLuongThanhVien] = useState(1);

  const [coThamDu, setCoThamDu] = useState(0);
  const [trangThaiCuocThi, setTrangThaiCuocThi] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const [maNTCu, setMaNTCu] = useState(-1);
  const [maNhomTruong, setMaNhomTruong] = useState(-1);
  const [hoTenNhomTruong, setHoTenNhomTruon] = useState("");
  const [emailNhomTruong, setEmailNhomTruong] = useState("");
  const [phoneNhomTruong, setPhoneNhomTruong] = useState("");

  const [maThiSinh, setMaThiSinh] = useState(-1);
  const [hoTen, setHoTen] = useState("");
  const [maDinhDanh, setMaDinhDanh] = useState("");
  const [gioiTinh, setGioiTinh] = useState(dataGioiTinh[0]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [maLop, setMaLop] = useState("");

  const [hoTenErr, setHoTenErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const [moTaDoanDoi, setMoTaDoanDoi] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [stt, setSTT] = useState();

  const [refresh, setRefresh] = useState(-1);
  const [ntRefresh, setNTRefresh] = useState(-1);

  useEffect(() => {
    const getDetailDoanDoi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chitietdoandoi/${params.idDoanDoi}`
      );
      setTenDoanDoi(data[0].TenDoanDoi);
      setDonViToChuc(data[0].MaDonVi);
      setTenDonVi(data[0].TenDonVi);
      setMaNhomTruong(data[0].MaThiSinh);
      setMaNTCu(data[0].MaThiSinh);
      setSoLuongThanhVien(data[0].SoLuongThanhVien);
      setMoTaDoanDoi(data[0].MoTaDoanDoi);
      setHoTenNhomTruon(data[0].TenThiSinh);
      setEmailNhomTruong(data[0].Email);
      setPhoneNhomTruong(data[0].Phone);
    };
    getDetailDoanDoi();
  }, [refresh]);

  useEffect(() => {
    const getDataThanhVien = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/thisinhthuocdoandoi/${params.idDoanDoi}`
      );
      data.forEach((d) => {
        if (d.GioiTinh == 1) d.GioiTinh = "Nam";
        if (d.GioiTinh == 2) d.GioiTinh = "Nữ";
      });
      setDataThanhVien(data);
    };
    getDataThanhVien();

    const getDataCoThamDuCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tietmuccuadoandoi/${params.idDoanDoi}`
      );
      setCoThamDu(data.length);
      setTrangThaiCuocThi(data[0].MaTrangThai);
    };
    getDataCoThamDuCuocThi();
  }, [refresh]);

  useEffect(() => {
    const getDataThiSinh = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/nguoidungtruongnhom/${donViToChuc}`
      );
      data.forEach((d) => {
        let stt = d.stt - 1;
        d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ";
        if (d.MaDinhDanh == "" || d.MaDinhDanh == null) d.MaDinhDanh = "Không";
        if (d.MaLop == "" || d.MaLop == null) d.MaLop = "Không";
        if (maNhomTruong == d.MaThiSinh) setSTT(stt);
      });
      setDataThiSinh(data);
    };
    getDataThiSinh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ntRefresh]);

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
        display: trangThaiCuocThi == 3 ? false : true,
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
                <MuiToolTip title="Edit">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    className="edit-hover"
                    disabled
                  >
                    <Edit />
                  </IconButton>
                </MuiToolTip>
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
                      setGioiTinh(
                        tableMeta.rowData[4] == "Nam"
                          ? dataGioiTinh[0]
                          : dataGioiTinh[1]
                      );
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
        display: coThamDu > 0 ? false : true,
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
                <MuiToolTip title="Delete">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    className="delete-hover"
                    disabled
                  >
                    <Delete />
                  </IconButton>
                </MuiToolTip>
              ) : (
                <MuiToolTip title="Delete">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    className="delete-hover"
                    onClick={() => handleDeleteThanhVien(tableMeta.rowData[0])}
                  >
                    <Delete />
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
    download: true,
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
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      setSTT(currentRowsSelected[0].dataIndex);
    },
    customToolbar: () => {
      return (
        <>
          <MuiToolTip title={"Thêm Thành Viên"}>
            <IconButton
              className="icon-hover"
              onClick={handleClickAddIcon}
              disabled={coThamDu > 0 ? true : false}
            >
              <Add />
            </IconButton>
          </MuiToolTip>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseAddIcon}
            TransitionComponent={Fade}
          >
            <MenuItem
              onClick={() => {
                handleCloseAddIcon();
                setTimeout(() => {
                  setShow(true);
                }, 200);
              }}
            >
              Thêm Thành Viên Mới
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseAddIcon();
                setTimeout(() => {
                  setShowImport(true);
                }, 200);
              }}
            >
              Import từ Excel
            </MenuItem>
          </Menu>
        </>
      );
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

      const fileName = `DanhSachThanhVienDoanDoi`;
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

  const columnsThiSinhNT = [
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
      name: "MaLop",
      label: "Mã Lớp",
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
      name: "TenDonVi",
      label: "Thuộc Đơn Vị",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "180px" }}>{value}</div>;
        },
      },
    },
  ];

  const optionsThiSinhNT = {
    search: true,
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "single",
    selectToolbarPlacement: "none",
    rowsSelected: [stt],
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      setSTT(currentRowsSelected[0].dataIndex);
    },
  };

  const [fileData, setFileData] = useState([]);

  const handleChangeFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.readFile(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });
    setFileData(jsonData);
  };

  const handleImportData = () => {
    if (fileData[0].length < 6) {
      alert("Không đúng định dạnh thông tin !");
    } else {
      for (let i = 1; i < fileData.length; i++) {
        if (fileData[i][0] != "") {
          Axios.post(
            `http://localhost:3001/api/admin/addthanhvien/${params.idDoanDoi}`,
            {
              TenThiSinh: fileData[i][0],
              MaDinhDanh: fileData[i][1] == "" ? "Không" : fileData[i][1],
              GioiTinh: fileData[i][2] == "Nam" ? 1 : 2,
              Email: fileData[i][3] == "" ? "Không" : fileData[i][3],
              Phone: fileData[i][4] == "" ? "Không" : fileData[i][4],
              MaLop: fileData[i][5] == "" ? "Không" : fileData[i][5],
              MaDonVi: donViToChuc,
            }
          ).then((response) => {
            setShowImport(false);
            setRefresh(Math.random());
          });
        }
      }
      setTimeout(() => {
        setFileData([]);
        alert("Thêm Thành Công!");
      }, 600);
    }
  };

  const handleEmailCheck = (event) => {
    const value = event.target.value;

    setEmail(value);
    setTimeout(() => {
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

  const handlePhoneCheck = (event) => {
    const value = event.target.value;
    let phoneno = /^\d{10}$/;

    if (!phoneno.test(value)) {
      setPhoneErr("Số điện thoại không hợp lệ.");
    } else {
      setPhoneErr("");
    }
  };

  const handleAddThanhVien = () => {
    if (hoTen == "") alert("Chưa Nhập Họ Tên");
    else {
      Axios.post(
        `http://localhost:3001/api/admin/addthanhvien/${params.idDoanDoi}`,
        {
          TenThiSinh: hoTen,
          MaDinhDanh: maDinhDanh == "" ? "Không" : maDinhDanh,
          GioiTinh: gioiTinh.value,
          Email: email == "" ? "Không" : email,
          Phone: phone == "" ? "Không" : phone,
          MaLop: maLop == "" ? "Không" : maLop,
          MaDonVi: donViToChuc,
        }
      ).then((response) => {
        setRefresh(Math.random());
        setTimeout(() => {
          alert("Thêm Thành Công!");
        }, 400);
      });
    }
  };

  const handleUpdateThanhVien = () => {
    if (hoTen == "") alert("Chưa Nhập Họ Tên");
    else {
      Axios.post(
        `http://localhost:3001/api/admin/updatethanhvien/${maThiSinh}`,
        {
          TenThiSinh: hoTen,
          MaDinhDanh: maDinhDanh == "" ? "Không" : maDinhDanh,
          GioiTinh: gioiTinh.value,
          Email: email == "" ? "Không" : email,
          Phone: phone == "" ? "Không" : phone,
          MaLop: maLop == "" ? "Không" : maLop,
        }
      ).then((response) => {
        setRefresh(Math.random());
        setTimeout(() => {
          alert("Chỉnh Sửa Thành Công!");
        }, 400);
      });
    }
  };

  const handleDeleteThanhVien = (id) => {
    if (window.confirm("Bạn có chắc muỗn XÓA thành viên này ?")) {
      Axios.post(
        `http://localhost:3001/api/admin/deletethanhvien/${params.idDoanDoi}/${id}`
      ).then((response) => {
        setRefresh(Math.random());
      });
    }
  };

  const handleUpdateDoanDoi = () => {
    Axios.post(
      `http://localhost:3001/api/admin/updatedoandoi/${params.idDoanDoi}`,
      {
        TenDoanDoi: tenDoanDoi,
        MoTaDoanDoi: moTaDoanDoi,
        MaNhomTruong: maNhomTruong,
        MaThiSinh: maNTCu,
      }
    ).then((response) => {
      setRefresh(Math.random());
      document.getElementById("topBtn").click();
      setTimeout(() => {
        alert("Cập nhật thông tin thành công!");
      }, 400);
    });
  };

  const [showNT, setShowNT] = useState(false);
  const handleCloseNT = () => {
    setShowNT(false);
    if (maNhomTruong == -1) setSTT(-1);
  };

  const handleAddNhomTruong = () => {
    const dt = dataThiSinh.filter((data) => {
      return data.stt == stt + 1;
    });
    setMaNhomTruong(dt[0].MaThiSinh);
    setHoTenNhomTruon(dt[0].TenThiSinh);
    setEmailNhomTruong(dt[0].Email);
    setPhoneNhomTruong(dt[0].Phone);
  };

  useEffect(() => {
    document.getElementById("doandoivannghe").classList.add("actives");
    document.title = "Chỉnh Sửa Đoàn Đội";
  }, []);

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 300);
  }, [refresh]);

  return (
    <>
      {load ? (
        <div style={{ position: "relative", width: "100%", height: "610px" }}>
          <Spinner
            animation="border"
            variant="primary"
            id="spinner"
            style={{
              position: "absolute",
              top: "40%",
              left: "49%",
              width: "50px",
              height: "50px",
            }}
          />
        </div>
      ) : (
        <>
          {/* Breadcrumb */}
          <Breadcrumb>
            <Breadcrumb.Item href="#" tabIndex="-1">
              <Link to="/home" className="link">
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" tabIndex="-1">
              <Link to="/tatcadoandoi" className="link">
                Tất cả Đoàn Đội
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Chi Tiết Đoàn Đội</Breadcrumb.Item>
          </Breadcrumb>

          {/* Thêm Đoàn Đội */}
          <div className="text-start">
            {/* Thẻ Tên "Thêm Chương Trình" */}
            <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
              <MusicNote style={{ fontSize: "2.6rem" }} />
              Chi Tiết Đoàn Đội
              <MusicNote style={{ fontSize: "2.6rem" }} />
            </h2>

            {/* Tên Đoàn Đội */}
            <Form.Group className="mb-3">
              <Form.Label
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <PeopleAltRounded /> &nbsp;Tên Đoàn Đội
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên đoàn đội..."
                onBlur={(e) => setTenDoanDoi(e.target.value)}
                id="tendoandoi"
                defaultValue={tenDoanDoi}
              />
              <Form.Text className="text-muted">
                <b style={{ color: "red" }}></b>
              </Form.Text>
            </Form.Group>

            {/* Đơn Vị Tổ chức, Số Lượng Thành Viên */}
            <Row className="pb-2">
              {/* Đơn Vị Tổ chức */}
              <Col xs="12" md="8">
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <School /> &nbsp;Thuộc Đơn Vị
                  </Form.Label>
                  <Form.Control type="text" defaultValue={tenDonVi} readOnly />
                  <Form.Text className="text-muted">
                    {/* <b style={{ color: "red" }}>{pricePerformanceMess}</b> */}
                  </Form.Text>
                </Form.Group>
              </Col>

              {/* Số Lượng Thành Viên */}
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <ConfirmationNumber />
                    &nbsp; Số Lượng Thành Viên
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập số lượng thành viên..."
                    value={soLuongThanhVien}
                    min="0"
                    onChange={(e) => setSoLuongThanhVien(e.target.value)}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {/* Thông tin Nhóm Trưởng */}
            <Row className="pb-1">
              {/* Họ Tên Nhóm Trưởng */}
              <Col xs="12" md="4">
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <Person />
                    &nbsp;Nhóm Trưởng
                  </Form.Label>
                  <Form.Control type="text" value={hoTenNhomTruong} />
                  <Form.Text className="text-muted">
                    {/* <b style={{ color: "red" }}>{amountPerformanceMess}</b> */}
                  </Form.Text>
                </Form.Group>
              </Col>

              {/* Email Nhóm Trưởng */}
              <Col xs="12" md="4">
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <Mail />
                    &nbsp;Email
                  </Form.Label>
                  <Form.Control type="email" value={emailNhomTruong} />
                  <Form.Text className="text-muted">
                    {/* <b style={{ color: "red" }}>{amountPerformanceMess}</b> */}
                  </Form.Text>
                </Form.Group>
              </Col>

              {/* Phone Nhóm Trưởng */}
              <Col xs="12" md="4">
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center justify-content-between"
                    style={{ fontWeight: "500" }}
                  >
                    <span>
                      <ConfirmationNumber />
                      &nbsp;Phone{" "}
                    </span>
                    <p
                      className="themNhomTruong p-0 m-0"
                      onClick={() => {
                        setNTRefresh(Math.random());
                        setShowNT(true);
                      }}
                    >
                      <ChangeCircleOutlined /> Change
                    </p>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={phoneNhomTruong}
                    //   onChange={(e) => handleAmountPerformance(e)}
                  />
                  <Form.Text className="text-muted">
                    {/* <b style={{ color: "red" }}>{amountPerformanceMess}</b> */}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {/* Mô Tả Đoàn Đội */}
            <Row>
              <Form.Group className="mb-3">
                <Form.Label
                  className="d-flex align-items-center"
                  style={{ fontWeight: "500" }}
                >
                  <NoteAlt /> &nbsp;Mô Tả Chi Tiết{" "}
                </Form.Label>
                <SunEditor
                  plugin=""
                  placeholder="Nhập nội dung Cuộc thi..."
                  setContents={moTaDoanDoi}
                  onChange={setMoTaDoanDoi}
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

            <div>
              <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
                <MusicNote style={{ fontSize: "2.6rem" }} />
                Danh Sách Thành Viên
                <MusicNote style={{ fontSize: "2.6rem" }} />
              </h2>

              <Row>
                <MuiDatatable
                  title="Thành Viên Đoàn Đội Văn Nghệ"
                  data={dataThanhVien}
                  columns={columnsThiSinh}
                  options={optionsThiSinh}
                />
              </Row>
            </div>

            {/* Button Add, Back */}
            <Row className="pt-2 justify-content-center">
              {coThamDu > 0 ? (
                <></>
              ) : (
                <>
                  <Col xs="12" md="3"></Col>
                  <Col className="my-2" xs="12" md="3">
                    <Button
                      variant="contained"
                      className="button-style"
                      startIcon={<Save />}
                      onClick={handleUpdateDoanDoi}
                    >
                      Save Changes
                    </Button>
                  </Col>
                </>
              )}
              <Col className="my-2" xs="12" md="3">
                <Button
                  variant="contained"
                  color="error"
                  className="button-style"
                  startIcon={<ArrowBack />}
                  onClick={() => navigate("/tatcadoandoi")}
                >
                  Back
                </Button>
              </Col>
              {coThamDu > 0 ? <></> : <Col xs="12" md="3"></Col>}
            </Row>
          </div>

          {/* Thêm Thí Sinh */}
          <Modal show={show} onHide={handleClose} className="modal-lg">
            <Modal.Header closeButton className="px-4">
              <Modal.Title className="ms-auto">
                {maThiSinh == -1
                  ? "Thêm Thành Viên"
                  : "Chỉnh Sửa Thông Tin Thành Viên"}
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
                    onChange={(e) => {
                      if (e.target.value.length > 0) setHoTenErr("");
                    }}
                    onBlur={(e) => {
                      if (e.target.value == "")
                        setHoTenErr("Họ tên không được để trống.");
                      else {
                        setHoTenErr("");
                      }
                      setHoTen(e.target.value);
                    }}
                  />
                  <Form.Text className="text-muted">{hoTenErr}</Form.Text>
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
                  <Select
                    options={dataGioiTinh}
                    value={gioiTinh}
                    id="gioitinh"
                    onChange={setGioiTinh}
                    className="zIndex-997"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailCheck(e)}
                    placeholder="Nhập Email..."
                  />
                  <Form.Text className="text-danger">{emailErr}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số Điện Thoại</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={phone}
                    placeholder="Nhập Số Điện Thoại..."
                    onChange={(e) => handlePhoneCheck(e)}
                    onBlur={(e) => setPhone(e.target.value)}
                  />
                  <Form.Text className="text-muted">{phoneErr}</Form.Text>
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
                <Col xs="12" md="6" className="py-1">
                  <Button
                    variant="contained"
                    className="modal-button-style"
                    onClick={() => {
                      if (maThiSinh == -1) {
                        handleAddThanhVien();
                      } else {
                        handleUpdateThanhVien();
                      }
                      handleClose();
                    }}
                  >
                    {maThiSinh == -1 ? "Add" : "Save"}
                  </Button>
                </Col>
                <Col xs="12" md="6" className="py-1">
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

          <Modal show={showImport} onHide={handleCloseImport}>
            <Modal.Header closeButton className="px-4">
              <Modal.Title className="ms-auto">Import Data</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                Nhập thông tin theo thứ tự:
                <br />
                1. Họ Tên(<span style={{ color: "red" }}>*</span>)<br />
                2. Mã Định Danh(<span style={{ color: "red" }}>*</span>)
                <br />
                3. Giới Tính
                <br />
                4. Email
                <br />
                5. Phone
                <br />
                6. Mã Lớp
                <br />
                Trong đó (<span style={{ color: "red" }}>*</span>): Bắt buộc đối
                với sinh viên, giảng viên, cán bộ của Trường ĐHCT.
              </p>

              <input type="file" onChange={(e) => handleChangeFile(e)} />
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Row>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    className="modal-button-style"
                    onClick={() => {
                      handleImportData();
                    }}
                  >
                    Add
                  </Button>
                </Col>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    color="error"
                    className="modal-button-style"
                    onClick={handleCloseImport}
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showNT}
            onHide={handleCloseNT}
            dialogClassName="modal-width"
          >
            <Modal.Header closeButton className="px-4">
              <Modal.Title className="ms-auto">Thêm Nhóm Trưởng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row style={{ padding: "15px 12px" }}>
                <MuiDatatable
                  title="Danh Sách Trưởng Nhóm"
                  data={dataThiSinh}
                  columns={columnsThiSinhNT}
                  options={optionsThiSinhNT}
                />
              </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Row>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    className="modal-button-style"
                    onClick={() => {
                      handleAddNhomTruong();
                      setShowNT(false);
                    }}
                  >
                    {maNhomTruong == -1 ? "Add" : "Change"}
                  </Button>
                </Col>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    color="error"
                    className="modal-button-style"
                    onClick={handleCloseNT}
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
