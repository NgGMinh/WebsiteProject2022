/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { Form, Row, Col, Button, Breadcrumb, Modal } from "react-bootstrap";
import { useState } from "react";
import "../ChuongTrinhVanNghe.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  MusicNote,
  AccessTime,
  EditLocationAlt,
  NoteAlt,
  Radio,
  School,
  Person,
  ChangeCircleOutlined,
  Mail,
  Phone,
} from "@mui/icons-material";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import MuiDatatable from "../../../components/table/MuiDatatable";

export default function ThemChuongTrinh() {
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

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const [dataDiaDiem, setDataDiaDiem] = useState([]);

  const [tenChuongTrinh, setTenChuongTrinh] = useState("");
  const [ngayGioToChuc, setNgayGioToChuc] = useState();
  const [diaDiemToChuc, setDiaDiemToChuc] = useState("");
  const [donViToChuc, setDonViToChuc] = useState(1);
  const [noiDungChuongTrinh, setNoiDungChuongTrinh] = useState("");

  const [dataThiSinh, setDataThiSinh] = useState([]);

  const [maNhomTruong, setMaNhomTruong] = useState(-1);
  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stt, setSTT] = useState();
  const [refresh, setRefresh] = useState(-1);

  const handleChangeDonViToChuc = (event) => {
    setDonViToChuc(event.target.value);
    setMaNhomTruong(-1);
    setSTT();
    setRefresh(Math.random());
  };

  const handleChangeDiaDiem = (event) => {
    setDiaDiemToChuc(event.target.value);
  };

  const [dataDonVi, setDataDonVi] = useState([]);

  // Lấy Thông Tin Đơn vị Tổ chức, Địa Điểm Từ Database
  useEffect(() => {
    const getDataDiaDiem = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/diadiem"
      );
      setDataDiaDiem(data);
    };
    getDataDiaDiem();
  }, []);

  useEffect(() => {
    const getDataDonVi = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/donvitochuc"
      );
      setDataDonVi(data);
    };
    getDataDonVi();
    const getDataThiSinh = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/doandoi/nguoidungtruongnhom/${donViToChuc}`
      );
      setDataThiSinh(data);
    };
    getDataThiSinh();
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
      options: { filterOptions: { fullWidth: true } },
    },
    { name: "TenThiSinh", label: "Họ Tên" },
    { name: "MaDinhDanh", label: "Mã Định Danh" },
    {
      name: "MaLop",
      label: "Mã Lớp",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
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
    { name: "TenDonVi", label: "Thuộc Đơn Vị" },
  ];

  const optionsThiSinh = {
    search: true,
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "370px",
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
    onRowsDelete: (rowsDeleted, newData) => {
      // console.log("rowsDeleted");
      // console.dir(rowsDeleted);
      // console.dir(newData);
      // window.alert("were deleted!");
    },
    onTableChange: (action, state) => {
      // console.log(action);
      // console.dir(state);
    },
  };

  const handleAddNhomTruong = () => {
    const dt = dataThiSinh.filter((data) => {
      return data.stt == stt + 1;
    });
    setMaNhomTruong(dt[0].MaThiSinh);
    setHoTen(dt[0].TenThiSinh);
    setEmail(dt[0].Email);
    setPhone(dt[0].Phone);
  };

  const [newCTR, setNewCTR] = useState(-1);

  const add = () => {
    Axios.post("http://localhost:3001/api/admin/addchuongtrinh", {
      TenChuongTrinh: tenChuongTrinh,
      DiaDiemToChuc: diaDiemToChuc,
      DonViToChuc: donViToChuc,
      NgayGioToChuc: ngayGioToChuc,
      NoiDungChuongTrinh: noiDungChuongTrinh,
      MaTruongDonVi: maNhomTruong,
    }).then((response) => {
      setNewCTR(response.data.idCTR);
    });
  };

  useEffect(() => {
    if (newCTR > -1) navigate(`/chinhsuachuongtrinh/${newCTR}`);
  });

  useEffect(() => {
    document.title =
      "Thêm Chương Trình Văn Nghệ - Website quản lý công tác văn nghệ Trường Đại Học Cần Thơ";
  }, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="#" tabIndex="-1">
          <Link to="/home" className="link">
            Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" tabIndex="-1">
          <Link to="/tatcachuongtrinh" className="link">
            Chương Trình Văn Nghệ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Thêm Chương Trình Văn Nghệ</Breadcrumb.Item>
      </Breadcrumb>

      {/* Thêm Chương Trình */}
      <div className="text-start">
        {/* Thẻ Tên "Thêm Chương Trình" */}
        <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Thêm Chương Trình Văn Nghệ
          <MusicNote style={{ fontSize: "2.6rem" }} />
        </h2>
        {/* Tên Chương Trình */}
        <Row className="pb-1">
          <Col xs="12" md="7">
            <Form.Group className="mb-3">
              <Form.Label
                htmlFor="tenchuongtrinh"
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
                id="tenchuongtrinh"
                value={tenChuongTrinh}
              />
              <Form.Text className="text-muted">
                <b style={{ color: "red" }}></b>
              </Form.Text>
            </Form.Group>
          </Col>
          <Col xs="12" md="5">
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
        </Row>

        {/* Đơn vị, Thời Gian Tổ chức */}
        <Row className="pb-1">
          <Col xs="12" md="7">
            <Form.Group className="mb-3">
              <Form.Label
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <School /> &nbsp;Đơn Vị Tổ Chức
              </Form.Label>
              <Form.Select
                onChange={(e) => handleChangeDonViToChuc(e)}
                name="slDonVi"
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
          <Col xs="12" md="5">
            <Form.Group className="mb-3">
              <Form.Label
                className="d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <AccessTime /> &nbsp;Ngày Giờ Tổ Chức
              </Form.Label>
              <Form.Control
                type="datetime-local"
                min="0"
                onChange={(e) => setNgayGioToChuc(e.target.value)}
              />
              <Form.Text className="text-muted">
                {/* <b style={{ color: "red" }}>{amountPerformanceMess}</b> */}
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
                  <Person /> &nbsp; Trưởng Đơn vị
                </Form.Label>
                <p className="themNhomTruong" onClick={() => setShow(true)}>
                  + Thêm Trưởng Đơn vị
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
                    &nbsp;Trưởng Đơn vị
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
                      <Phone />
                      &nbsp;Phone{" "}
                    </span>
                    <p
                      className="themNhomTruong p-0 m-0"
                      onClick={() => setShow(true)}
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

        {/* Chi Tiết Chương Trình */}
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

        {/* Button Add, Back */}
        <Row className="pt-2">
          <Col className="text-center my-2">
            <Button
              type="button"
              className="px-5"
              onClick={() => {
                add();
              }}
            >
              Add
            </Button>
            &nbsp;
            <Button
              variant="danger"
              className="px-5"
              onClick={() => navigate("/chuongtrinhvannghe")}
            >
              Back
            </Button>
          </Col>
        </Row>
      </div>

      {/* Thêm Nhóm Trưởng */}
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-lg"
        dialogClassName="modal-width-70"
      >
        <Modal.Header closeButton className="px-4">
          <Modal.Title className="ms-auto">Thêm Trưởng Đơn Vị</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ padding: "10px 12px" }}>
            <MuiDatatable
              title="Danh Sách Trưởng Nhóm"
              data={dataThiSinh}
              columns={columnsThiSinh}
              options={optionsThiSinh}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="primary"
            className="px-5"
            onClick={() => {
              handleAddNhomTruong();
              setShow(false);
            }}
          >
            {maNhomTruong == -1 ? "Add" : "Change"}
          </Button>
          <Button variant="secondary" onClick={handleClose} className="px-5">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
