/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React from "react";
import { Form, Row, Col, Card, Breadcrumb, Modal } from "react-bootstrap";
import { useState } from "react";
import "../CuocThiVanNghe.css";
import {
  Add,
  ArrowBack,
  ConfirmationNumber,
  Edit,
  MusicNote,
  NoteAlt,
  QueueMusicRounded,
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
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function ThemTietMucChuongTrinhDuThi() {
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

  const [tableBodyHeight, setTableBodyHeight] = useState("450px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

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

  const [themLoaiTietMuc, setThemLoaiTietMuc] = useState(false);
  const [nhanSo, setNhanSo] = useState(1);
  const [dataThiSinhThuocDV, setDataThiSinhThuocDV] = useState([]);
  const [dataMaGiamKhao, setDataMaGiamKhao] = useState([]);
  const [maDonVi, setMaDonVi] = useState();

  const [tenTietMuc, setTenTietMuc] = useState("");
  const [loaiTietMuc, setLoaiTietMuc] = useState(1);
  const [thoiGianThucHien, setThoiGianThucHien] = useState(null);

  const [dataLoaiTietMuc, setDataLoaiTietMuc] = useState([]);
  const [dataCTLoaiTietMuc, setDataCTLoaiTietMuc] = useState([]);
  const [loaiCoDinh, setLoaiCoDinh] = useState(1);
  const [nhanSoTT, setNhanSoTT] = useState();

  const [tenCuocThi, setTenCuocThi] = useState("");

  const [tenChuongTrinh, setTenChuongTrinh] = useState("");
  const [maNhomTruong, setMaNhomTruong] = useState("");
  const [tenDoanDoi, setTenDoanDoi] = useState([]);
  const [hinhThucCT, setHinhThucCT] = useState("");
  const [tenDonVi, setTenDonVi] = useState("");
  const [noiDungTietMuc, setNoiDungTietMuc] = useState("");

  const [maThiSinh, setMaThiSinh] = useState(-1);
  const [hoTen, setHoTen] = useState("");
  const [maDinhDanh, setMaDinhDanh] = useState("");
  const [gioiTinh, setGioiTinh] = useState(1);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phone, setPhone] = useState("");
  const [maLop, setMaLop] = useState("");

  const handleChangeNhanSo = (event) => {
    setNhanSo(event.target.value);
  };

  const [rowCount, setRowCount] = useState(0);

  const [dataMaThiSinh, setDataMaThiSinh] = useState([]);

  const [refresh, setRefresh] = useState(-1);

  const [maDoanDoi, setMaDoanDoi] = useState([]);

  // Lấy Thông Tin Đơn vị Tổ chức, Địa Điểm Từ Database
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
      setLoaiTietMuc(arr[0]);
    };
    getDataLoaiTietMuc();

    const getDataGiamKhao = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/allmagiamkhao/${params.idCuocThi}`
      );
      setDataMaGiamKhao(data);
    };
    getDataGiamKhao();
  }, []);

  useEffect(() => {
    const getDataChiTietCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
      );
      setTenCuocThi(data[0].TenCuocThi);
      setRefresh(Math.random());
    };
    getDataChiTietCuocThi();
  }, []);

  useEffect(() => {
    const getDataChiTietCT = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chitietchuongtrinh/${params.idChuongTrinh}`
      );

      setTenChuongTrinh(data[0].TenChuongTrinh);
      setHinhThucCT(data[0].TenHinhThucChuongTrinh);
      setTenDonVi(data[0].TenDonVi);
      setMaDonVi(data[0].MaDonVi);
      setThoiGianThucHien(
        data[0].NgayGioToChuc == null
          ? null
          : dayjs(data[0].NgayGioToChuc).format("YYYY-MM-DDTHH:mm")
      );
      setMaNhomTruong(data[0].MaTruongDonVi);
      setMaDoanDoi(data[0].MaDoanDoi);
      setTenDoanDoi(data[0].TenDoanDoi);
      setRefresh(Math.random());
    };
    getDataChiTietCT();
  }, []);

  useEffect(() => {
    const getDataThiSinhThuocDonVi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/thisinhthuocdoandoitruongdonvi/${maDoanDoi}`
      );
      data.forEach((d) => (d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ"));
      setDataThiSinhThuocDV(data);
    };
    getDataThiSinhThuocDonVi();
  }, [refresh]);

  const optionsThiSinh = {
    search: true,
    searchPlaceholder: "Tên thí sinh, email, phone...",
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
    selectableRowsHeader: rowCount > 0 ? true : loaiCoDinh == 0 ? true : false,
    selectToolbarPlacement: "above",
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
    isRowSelectable: (dataIndex, selectedRows) => {
      if (loaiCoDinh == 1) {
        if (rowCount < nhanSo) {
          return true;
        } else {
          return selectedRows.lookup[dataIndex];
        }
      } else return true;
    },
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
      if (loaiCoDinh == 0) setNhanSo(allRowsSelected.length);
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

      const fileName = `DanhSachThiSinh`;
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
        filter: true,
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
  ];

  const handleAddTietMuc = () => {
    let arr = [];
    for (let i = 0; i < dataThiSinhThuocDV.length; i++) {
      arr.push([dataThiSinhThuocDV[i].stt, dataThiSinhThuocDV[i].MaThiSinh]);
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
    if (tenTietMuc == "") {
      alert("Hãy điền Tên tiết mục!");
    } else if (rowCount < nhanSo) {
      alert("Chưa đủ nhân số!");
    } else if (rowCount > nhanSo) {
      alert("Nhân Số không đúng!");
    } else if (dataMaGiamKhao.length > 0) {
      Axios.post("http://localhost:3001/api/admin/addtietmucchuongtrinh", {
        maCuocThi: params.idCuocThi,
        maChuongTrinh: params.idChuongTrinh,
        tenTietMuc: tenTietMuc,
        loaiTietMuc: loaiTietMuc.value,
        noiDungTietMuc: noiDungTietMuc,
        thoiGianThucHien: thoiGianThucHien,
        nhanSo: nhanSo,
        arrMaThiSinh: arrMaThiSinh,
        arrMaGiamKhao: dataMaGiamKhao,
      }).then((response) => {
        navigate(
          `/chinhsuacuocthi/${params.idCuocThi}/chinhsuachuongtrinh/${params.idChuongTrinh}`
        );
        setTimeout(() => {
          alert("Thêm Tiết mục Thành Công !");
        }, 500);
      });
    } else {
      Axios.post(
        "http://localhost:3001/api/admin/addtietmucchuongtrinh/khonggiamkhao",
        {
          maCuocThi: params.idCuocThi,
          maChuongTrinh: params.idChuongTrinh,
          tenTietMuc: tenTietMuc,
          loaiTietMuc: loaiTietMuc.value,
          noiDungTietMuc: noiDungTietMuc,
          thoiGianThucHien: thoiGianThucHien,
          nhanSo: nhanSo,
          arrMaThiSinh: arrMaThiSinh,
        }
      ).then((response) => {
        navigate(
          `/chinhsuacuocthi/${params.idCuocThi}/chinhsuachuongtrinh/${params.idChuongTrinh}`
        );
        setTimeout(() => {
          alert("Thêm Tiết mục Thành Công !");
        }, 500);
      });
    }
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
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.title =
        "Thêm tiết mục chương trình- Website quản lý công tác văn nghệ";
      document.getElementById("cuocthivannghe").classList.add("actives");
    }, 100);
  });

  return (
    <>
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
        <li className="breadcrumb-item">
          <Link to={`/chinhsuacuocthi/${params.idCuocThi}`} className="link">
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

        <li className="breadcrumb-item active">Thêm Tiết Mục</li>
      </ol>
      {/* <Breadcrumb>
        <Breadcrumb.Item href="#" tabIndex="-1">
          <Link to="/home" className="link">
            Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" tabIndex="-1">
          <Link to="/tatcachuongtrinh" className="link">
            Cuộc Thi Văn Nghệ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" tabIndex="-1" style={{ textAlign: "left" }}>
          <Link
            to={`/chinhsuacuocthi/truyenthong/${params.idCuocThi}`}
            className="link"
          >
            {tenCuocThi}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" tabIndex="-1" style={{ textAlign: "left" }}>
          <Link
            to={`/chinhsuacuocthi/truyenthong/${params.idCuocThi}/chinhsuachuongtrinh/${params.idChuongTrinh}`}
            className="link"
          >
            {tenChuongTrinh}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Thêm Tiết Mục</Breadcrumb.Item>
      </Breadcrumb> */}

      {/* Thêm Tiết Mục */}
      <div className="text-start">
        <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Thêm Tiết Mục Văn Nghệ
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
                      <QueueMusicRounded /> Loại Tiết Mục
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
                        if (value[0].CoDinh == 1) {
                          setNhanSo(value[0].NhanSoToiThieu);
                          setLoaiCoDinh(value[0].CoDinh);
                        } else {
                          setNhanSo("");
                          setLoaiCoDinh(value[0].CoDinh);
                          setNhanSoTT(value[0].NhanSoToiThieu);
                        }
                      }}
                      className="zIndex-997"
                    />
                  </Form.Group>
                </Col>
                {/* Nhân Số */}
                <Col xs="12" md="4">
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
                    {loaiCoDinh == 0 ? (
                      <Form.Control
                        type="number"
                        placeholder="Nhập Số lượng tham gia..."
                        value={nhanSo}
                        onChange={(e) => handleChangeNhanSo(e)}
                      />
                    ) : (
                      <Form.Control
                        type="number"
                        placeholder="Nhập Số lượng tham gia..."
                        value={nhanSo}
                        readOnly
                      />
                    )}
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
                <Form.Control type="text" value={tenDonVi} />
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
            Thêm Thí Sinh Trình Bày
            <MusicNote style={{ fontSize: "2.6rem" }} />
          </h2>

          {/* Bảng Thí Sinh Thuộc Đơn Vị */}
          <Row className="mx-0 justify-content-end">
            <MuiDatatable
              title="Danh sách Thí Sinh Thuộc Đơn Vị"
              data={dataThiSinhThuocDV}
              columns={columnsThiSinh}
              options={optionsThiSinh}
            />
          </Row>

          {/* Button Add, Back */}
          <Row className="pt-2">
            <Col xs="12" md="3"></Col>
            <Col xs="12" md="3" className="text-center my-2">
              <Button
                variant="contained"
                className="button-style"
                startIcon={<Add />}
                onClick={() => {
                  handleAddTietMuc();
                }}
              >
                Add
              </Button>
            </Col>
            <Col xs="12" md="3" className="text-center my-2">
              <Button
                variant="contained"
                color="error"
                className="button-style"
                startIcon={<ArrowBack />}
                onClick={() =>
                  navigate(`/chinhsuachuongtrinh/${params.idChuongTrinh}`)
                }
              >
                Back
              </Button>
            </Col>
            <Col xs="12" md="3"></Col>
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
    </>
  );
}
