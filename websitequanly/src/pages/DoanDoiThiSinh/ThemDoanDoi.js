/* eslint-disable eqeqeq */
import React from "react";
import { Form, Row, Col, Modal, Breadcrumb } from "react-bootstrap";
import "./DoanDoiThiSinh.css";

import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  MusicNote,
  PeopleAltRounded,
  School,
  ConfirmationNumber,
  NoteAlt,
  Person,
  Mail,
  ChangeCircleOutlined,
  ArrowBack,
  Add,
} from "@mui/icons-material";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import MuiDatatable from "../../components/table/MuiDatatable";
import Select from "react-select";
import { Button } from "@mui/material";

export default function ThemDoanDoi() {
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

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    if (maNhomTruong == -1) setSTT(-1);
  };
  const [dataDonViToChuc, setDataDonViToChuc] = useState([]);
  const [dataThiSinh, setDataThiSinh] = useState([]);

  const [tenDoanDoi, setTenDoanDoi] = useState();
  const [donViToChuc, setDonViToChuc] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [soLuongThanhVien, setSoLuongThanhVien] = useState(1);

  const [maNhomTruong, setMaNhomTruong] = useState(-1);
  const [hoTen, setHoTen] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [maDinhDanh, setMaDinhDanh] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [gioiTinh, setGioiTinh] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [maLop, setMaLop] = useState("");
  const [moTaDoanDoi, setMoTaDoanDoi] = useState("");
  const [stt, setSTT] = useState();

  const [refresh, setRefresh] = useState(-1);

  useEffect(() => {
    const getDataDonVi = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/donvitochuc"
      );
      let arr = [];
      data.forEach((d) => {
        arr.push({ value: d.MaDonVi, label: d.TenDonVi });
      });
      setDonViToChuc(arr[0]);
      setDataDonViToChuc(arr);
    };
    getDataDonVi();
  }, []);

  useEffect(() => {
    const getDataThiSinh = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/nguoidungtruongnhom/${donViToChuc.value}`
      );
      data.forEach((d) => {
        d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ";
        if (d.MaDinhDanh == "" || d.MaDinhDanh == null) d.MaDinhDanh = "Không";
        if (d.MaLop == "" || d.MaLop == null) d.MaLop = "Không";
      });
      setDataThiSinh(data);
    };
    getDataThiSinh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const optionsThiSinh = {
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

  const handleAddNhomTruong = () => {
    const dt = dataThiSinh.filter((data) => {
      return data.stt == stt + 1;
    });
    setMaNhomTruong(dt[0].MaThiSinh);
    setHoTen(dt[0].TenThiSinh);
    setMaDinhDanh(dt[0].MaDinhDanh);
    setGioiTinh(dt[0].GioiTinh);
    setMaLop(dt[0].MaLop);
    setEmail(dt[0].Email);
    setPhone(dt[0].Phone);
  };

  const [newDoanDoi, setNewDoanDoi] = useState(-1);

  const addDoanDoi = () => {
    Axios.post("http://localhost:3001/api/admin/adddoandoi", {
      TenDoanDoi: tenDoanDoi,
      MoTaDoanDoi: moTaDoanDoi,
      SoLuongThanhVien: soLuongThanhVien,
      MaThiSinh: maNhomTruong,
      MaDonVi: donViToChuc.value,
    }).then((response) => {
      setNewDoanDoi(response.data.idDoanDoi);
    });
  };

  useEffect(() => {
    if (newDoanDoi > -1) {
      navigate(`/chinhsuadoandoi/${newDoanDoi}`);
      setTimeout(() => {
        alert("Thêm Đoàn đội thành công!");
      }, 400);
    }
  });
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="#" tabIndex="-1">
          <Link to="/home" className="link">
            Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" tabIndex="-1">
          <Link to="/tatcadoandoi" className="link">
            Đoàn Đội Văn Nghệ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Thêm Đoàn Đội</Breadcrumb.Item>
      </Breadcrumb>

      {/* Thêm Đoàn Đội */}
      <div className="text-start">
        {/* Thẻ Tên "Thêm Chương Trình" */}
        <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Thêm Đoàn Đội Văn Nghệ
          <MusicNote style={{ fontSize: "2.6rem" }} />
        </h2>

        {/* Đơn Vị Tổ chức, Số Lượng Thành Viên */}
        <Row className="pb-2">
          {/* Tên Đoàn Đội */}
          <Col xs="12" md="7">
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
                onChange={(e) => setTenDoanDoi(e.target.value)}
                id="tendoandoi"
                value={tenDoanDoi}
              />
              <Form.Text className="text-muted">
                <b style={{ color: "red" }}></b>
              </Form.Text>
            </Form.Group>
          </Col>
          {/* Đơn Vị Tổ chức */}
          <Col xs="12" md="5">
            <Form.Group className="mb-3">
              <Form.Label
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <School /> &nbsp;Thuộc Đơn Vị
              </Form.Label>
              {/* <Form.Select
                onChange={(e) => handleChangeDonViToChuc(e)}
                name="slDonVi"
                value={donViToChuc}
              >
                {dataDonViToChuc.map((data) => (
                  <option
                    key={data.MaDonVi}
                    value={data.MaDonVi}
                    name={`slDonVi-${data.MaDonVi}`}
                  >
                    {data.TenDonVi}
                  </option>
                ))}
              </Form.Select> */}
              <Select
                options={dataDonViToChuc}
                value={donViToChuc}
                onChange={(e) => {
                  setDonViToChuc(e);
                  setMaNhomTruong(-1);
                  setEmail("");
                  setPhone("");
                  setSTT(-1);
                }}
                className="zIndex-997"
              />
              <Form.Text className="text-muted">
                {/* <b style={{ color: "red" }}>{pricePerformanceMess}</b> */}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        {/* Thông tin Nhóm Trưởng */}
        <Row className="pb-1">
          {maNhomTruong == -1 ? (
            <>
              <Form.Group>
                <Form.Label
                  className="d-flex align-items-center"
                  style={{ fontWeight: "500" }}
                >
                  <Person /> &nbsp; Nhóm Trưởng
                </Form.Label>
                <p
                  className="themNhomTruong"
                  onClick={() => {
                    setRefresh(Math.random);
                    setShow(true);
                  }}
                >
                  <strong>+ Thêm Nhóm Trưởng</strong>
                </p>
              </Form.Group>
            </>
          ) : (
            <>
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
                  <Form.Control type="text" value={hoTen} />
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
                  <Form.Control type="email" value={email} />
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
                        setRefresh(Math.random());
                        setShow(true);
                      }}
                    >
                      <ChangeCircleOutlined /> Change
                    </p>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={phone}
                    //   onChange={(e) => handleAmountPerformance(e)}
                  />
                  <Form.Text className="text-muted">
                    {/* <b style={{ color: "red" }}>{amountPerformanceMess}</b> */}
                  </Form.Text>
                </Form.Group>
              </Col>
            </>
          )}
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

        {/* Button Add, Back */}
        <Row className="pt-2">
          <Col xs="12" md="3"></Col>
          <Col xs="12" md="3" className="text-center my-1">
            <Button
              variant="contained"
              className="button-style"
              startIcon={<Add />}
              onClick={addDoanDoi}
            >
              Add
            </Button>
          </Col>
          <Col xs="12" md="3" className="text-center my-1">
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
          <Col xs="12" md="3"></Col>
        </Row>
      </div>

      {/* Thêm Nhóm Trưởng */}
      <Modal show={show} onHide={handleClose} dialogClassName="modal-width">
        <Modal.Header closeButton className="px-4">
          <Modal.Title className="ms-auto">Thêm Nhóm Trưởng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ padding: "15px 12px" }}>
            <MuiDatatable
              title="Danh Sách Trưởng Nhóm"
              data={dataThiSinh}
              columns={columnsThiSinh}
              options={optionsThiSinh}
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
                  setShow(false);
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
