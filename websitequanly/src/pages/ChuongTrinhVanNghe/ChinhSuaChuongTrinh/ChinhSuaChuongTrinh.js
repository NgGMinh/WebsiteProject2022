/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Breadcrumb,
  Tabs,
  Tab,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import "../ChuongTrinhVanNghe.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Edit,
  Add,
  ImportExport,
  MusicNote,
  Radio,
  EditLocationAlt,
  School,
  AppRegistration,
  AccessTime,
  NoteAlt,
  Phone,
  Mail,
  Person,
} from "@mui/icons-material";

import { IconButton } from "@mui/material";
import Axios from "axios";
import MuiDatatable from "../../../components/table/MuiDatatable";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function ChinhSuaChuongTrinh() {
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

  const [dataDiaDiem, setDataDiaDiem] = useState([]);
  const [dataDonVi, setDataDonVi] = useState([]);
  const [dataTrangThai, setDataTrangThai] = useState([]);
  const [dataNguoiThamDu, setDataNguoiThamDu] = useState([]);
  const [dataTietMuc, setDataTietMuc] = useState([]);

  const [tenChuongTrinh, setTenChuongTrinh] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [hinhThucCT, setHinhThucCT] = useState("");
  const [ngayGioToChuc, setNgayGioToChuc] = useState();
  const [diaDiemToChuc, setDiaDiemToChuc] = useState();
  const [trangThai, setTrangThai] = useState();
  const [donViToChuc, setDonViToChuc] = useState();
  const [noiDungChuongTrinh, setNoiDungChuongTrinh] = useState("");

  const [hoTenNhomTruong, setHoTenNhomTruong] = useState("");
  const [emailNhomTruong, setEmailNhomTruong] = useState("");
  const [phoneNhomTruong, setPhoneNhomTruong] = useState("");
  // Lấy Thông Tin Từ Database
  useEffect(() => {
    const getDataChiTietCT = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chitietchuongtrinh/${params.idChuongTrinh}`
      );

      setTenChuongTrinh(data[0].TenChuongTrinh);
      setDonViToChuc(data[0].MaDonVi);
      setNgayGioToChuc(dayjs(data[0].NgayGioToChuc).format("YYYY-MM-DDTHH:mm"));
      setTrangThai(data[0].MaTrangThai);
      setNoiDungChuongTrinh(data[0].NoiDungChuongTrinh);
      setHoTenNhomTruong(data[0].TenThiSinh);
      setEmailNhomTruong(data[0].Email);
      setPhoneNhomTruong(data[0].Phone);
    };
    getDataChiTietCT();
  }, []);

  useEffect(() => {
    const getDataDiaDiem = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/diadiem"
      );
      setDataDiaDiem(data);
    };
    getDataDiaDiem();

    const getDataDonVi = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/donvitochuc"
      );
      setDataDonVi(data);
    };
    getDataDonVi();

    const getDataTrangThai = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/trangthai"
      );
      setDataTrangThai(data);
    };
    getDataTrangThai();
  }, []);

  useEffect(() => {
    const getDataNguoiThamDu = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/thisinhchuongtrinh/${params.idChuongTrinh}`
      );
      setDataNguoiThamDu(data);
    };
    getDataNguoiThamDu();
  }, []);

  useEffect(() => {
    const getDataTietMucThuocChuongTrinh = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tietmucthuocchuongtrinh/${params.idChuongTrinh}`
      );
      setDataTietMuc(data);
    };
    getDataTietMucThuocChuongTrinh();
  }, []);

  const handleChangeDiaDiem = (event) => {
    setDiaDiemToChuc(event.target.value);
  };

  const handleChangeKhoa = (event) => {
    setDonViToChuc(event.target.value);
  };

  const columnsNguoiThamDu = [
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
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "20px !important", paddingLeft: "10px" }}>
              {value}
            </div>
          );
        },
      },
    },
    { name: "TenThiSinh", label: "Họ Tên" },
    { name: "MaDinhDanh", label: "Mã Định Danh" },
    {
      name: "GioiTinh",
      label: "Giới Tính",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    { name: "Email", label: "Email Thí Sinh" },
    { name: "Phone", label: "Phone" },
    { name: "MaLop", label: "Mã Lớp" },
    {
      name: "",
      options: {
        filter: true,
        sort: false,
        empty: true,
        disableColumnMenu: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton edge="end" aria-label="edit">
              <Edit
                onClick={() =>
                  window.alert(`Clicked "Edit" for row ${tableMeta}`)
                }
              />
            </IconButton>
          );
        },
      },
    },
  ];

  const optionsNguoiThamDu = {
    search: true,
    searchPlaceholder:
      "Tên Tiết Mục, Thời gian thực hiện, đoàn đội, thí sinh...",
    download: false,
    print: false,
    viewColumns: true,
    filter: false,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "450px",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => <></>,
    onRowsDelete: (rowsDeleted, newData) => {},
    onTableChange: (action, state) => {},
    onDownload: (buildHead, buildBody, columns, data) => {
      return "\uFEFF" + buildHead(columns) + buildBody(data);
    },
    textLabels: {
      body: {
        noMatch: "Bảng rỗng",
      },
    },
  };

  const columnsTietMuc = [
    {
      name: "MaTietMuc",
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
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "20px !important", paddingLeft: "10px" }}>
              {value}
            </div>
          );
        },
      },
    },
    { name: "TenTietMuc", label: "Tên Tiết Mục" },
    { name: "TenLoaiTietMuc", label: "Loại Tiết Mục" },
    {
      name: "NgayGioThucHien",
      label: "Thời Gian",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "220px" }}>
              {dayjs(value).format("HH:mm, DD/MM/YYYY")}
            </div>
          );
        },
      },
    },
    { name: "NhanSo", label: "Nhân Số" },
    {
      name: "",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        empty: true,
        disableColumnMenu: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton edge="end" aria-label="edit">
              <Edit
                onClick={() =>
                  window.alert(`Clicked "Edit" for row ${tableMeta}`)
                }
              />
            </IconButton>
          );
        },
      },
    },
  ];

  const optionsTietMuc = {
    search: true,
    searchPlaceholder:
      "Tên Tiết Mục, Thời gian thực hiện, đoàn đội, thí sinh...",
    download: false,
    print: false,
    viewColumns: true,
    filter: false,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "450px",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => <></>,
    onRowsDelete: (rowsDeleted, newData) => {},
    onTableChange: (action, state) => {},
    onDownload: (buildHead, buildBody, columns, data) => {
      return "\uFEFF" + buildHead(columns) + buildBody(data);
    },
    textLabels: {
      body: {
        noMatch: "Bảng rỗng",
      },
    },
  };

  useEffect(() => {
    document.title = "Chỉnh Sửa Chương Trình";
    document.getElementById("chuongtrinhvannghe").classList.add("actives");
  }, []);

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 200);
  }, []);

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
              top: "31%",
              left: "49%",
              width: "50px",
              height: "50px",
            }}
          />
        </div>
      ) : (
        <>
          <Breadcrumb>
            <Breadcrumb.Item href="#" tabIndex="-1">
              <Link to="/home" className="link">
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" tabIndex="-1">
              <Link to="/tatcachuongtrinh" className="link">
                Tất Cả Chương Trình
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              Chỉnh Sửa Chương Trình Văn Nghệ
            </Breadcrumb.Item>
          </Breadcrumb>

          <div className="newPerformance text-start">
            <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
              <MusicNote style={{ fontSize: "2.6rem" }} />
              Chỉnh Sửa Chương Trình Văn Nghệ
              <MusicNote style={{ fontSize: "2.6rem" }} />
            </h2>{" "}
            {/* Tên Chương Trình */}
            <Row className="pb-1">
              <Col xs="12" md="8">
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <Radio />
                    &nbsp;Tên Chương Trình
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên chương trình"
                    onChange={(e) => setTenChuongTrinh(e.target.value)}
                    value={tenChuongTrinh}
                  />
                  <Form.Text className="text-muted">
                    <b style={{ color: "red" }}>{}</b>
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs="12" md="4">
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <AccessTime /> &nbsp;Ngày Giờ Tổ Chức
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={ngayGioToChuc}
                    onChange={(e) => setNgayGioToChuc(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    {/* <b style={{ color: "red" }}>{amountPerformanceMess}</b> */}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            {/* Địa Điểm Tổ Chức, Đơn Vị Tổ Chức, Trạng Thái */}
            <Row>
              <Col xs="12" md="4">
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <EditLocationAlt /> &nbsp;Địa Điểm Tổ Chức
                  </Form.Label>
                  <Form.Select
                    onChange={(e) => handleChangeDiaDiem(e)}
                    name="slDiaDiem"
                    value={diaDiemToChuc}
                  >
                    {dataDiaDiem.map((data) => (
                      <option
                        key={data.MaDiaDiem}
                        value={data.MaDiaDiem}
                        name={`slDiaDiem-${data.MaDiaDiem}`}
                      >
                        {data.TenDiaDiem}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    {/* <b style={{ color: "red" }}>{pricePerformanceMess}</b> */}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs="12" md="4">
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <School /> &nbsp;Đơn Vị Tổ Chức
                  </Form.Label>
                  <Form.Select
                    onChange={(e) => handleChangeKhoa(e)}
                    name="slDonVi"
                    value={donViToChuc}
                  >
                    {dataDonVi.map((data) => (
                      <option
                        key={data.MaDonVi}
                        value={data.MaDonVi}
                        name={`slDonVi-${data.MaDonVi}`}
                      >
                        {data.TenDonVi}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    {/* <b style={{ color: "red" }}>{pricePerformanceMess}</b> */}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs="12" md="4">
                <Form.Group className="mb-3">
                  <Form.Label
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <AppRegistration /> &nbsp;Trạng Thái
                  </Form.Label>
                  <Form.Select
                    onChange={(e) => handleChangeDiaDiem(e)}
                    name="slTrangThai"
                    value={trangThai}
                  >
                    {dataTrangThai.map((data) => (
                      <option
                        key={data.MaTrangThai}
                        value={data.MaTrangThai}
                        name={`slTrangThai-${data.MaTrangThai}`}
                      >
                        {data.TenTrangThai}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    {/* <b style={{ color: "red" }}>{pricePerformanceMess}</b> */}
                  </Form.Text>
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
                    &nbsp;Trưởng Đơn vị
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
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <Phone />
                    &nbsp;Phone
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
            {/* Mô Tả Chương Trình */}
            <Row className="pb-1">
              <Form.Group className="mb-3">
                <Form.Label
                  className="d-flex align-items-center"
                  style={{ fontWeight: "500" }}
                >
                  <NoteAlt /> &nbsp;Chi Tiết Chương Trình
                </Form.Label>

                <SunEditor
                  plugin=""
                  setContents={noiDungChuongTrinh}
                  onChange={setNoiDungChuongTrinh}
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
            {/* Danh Sách Tiết Mục, Thí Sinh Tham Dự */}
            <Tabs
              defaultActiveKey="danhsachtietmuc"
              id="uncontrolled-tab-example"
              className="my-3 responsive-tab"
            >
              <Tab eventKey="danhsachtietmuc" title="Tiết Mục Văn Nghệ">
                <div>
                  <Row className="my-2">
                    <Col md="9"></Col>
                    <Col md="3" style={{ textAlign: "right" }}>
                      <Button
                        variant="outline-primary"
                        onClick={() =>
                          navigate(
                            `/themtietmucchuongtrinh/${params.idChuongTrinh}`
                          )
                        }
                      >
                        <Add /> Thêm Tiết Mục Mới
                      </Button>
                    </Col>
                  </Row>
                  {/* Bảng Tiết Mục */}
                  <Row style={{ padding: "0px 12px" }}>
                    <MuiDatatable
                      title="Tiết Mục Văn Nghệ"
                      data={dataTietMuc}
                      columns={columnsTietMuc}
                      options={optionsTietMuc}
                    />
                  </Row>
                </div>
              </Tab>

              <Tab eventKey="danhsachnguoithamdu" title="Thành Viên Tham Dự">
                <div>
                  <div className="home">
                    <div>
                      <Row className="my-2">
                        <Col md="9"></Col>
                        <Col md="3" style={{ textAlign: "right" }}>
                          <Button variant="outline-success">
                            <ImportExport /> Export Excel
                          </Button>
                        </Col>
                      </Row>
                      {/* Bảng Sinh Viên Tham Dự */}
                      <Row style={{ padding: "0px 10px" }}>
                        <MuiDatatable
                          title="Danh Sách Thí Sinh Tham Dự"
                          data={dataNguoiThamDu}
                          columns={columnsNguoiThamDu}
                          options={optionsNguoiThamDu}
                        />
                      </Row>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
            {/* Button Add, Back */}
            <Row className="pt-2">
              <Col className="text-center my-2">
                &nbsp;
                <Button type="button" className="px-5 mb-2">
                  Save Changes
                </Button>
                &nbsp;
                <Button
                  variant="danger"
                  className="mb-2"
                  style={{ paddingRight: "5rem", paddingLeft: "5rem" }}
                  onClick={() => navigate("/chuongtrinhvannghe")}
                >
                  Back
                </Button>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
}
