/* eslint-disable eqeqeq */
import React from "react";
import { Form, Row, Col, Breadcrumb } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../CuocThiVanNghe.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
  ArrowBack,
} from "@mui/icons-material";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Select from "react-select";
import { Button } from "@mui/material";

export default function ThemCuocThi() {
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
  const dayjs = require("dayjs");

  const dataPhanThi = [
    { value: 1, label: "Cá Nhân" },
    { value: 2, label: "Đội Nhóm" },
  ];

  const dataHinhThuc = [
    { value: 1, label: "Chương trình truyền thống" },
    { value: 2, label: "Đăng ký Thể loại Tự do" },
  ];

  const dataSoVongThi = [
    { value: 2, label: "2 vòng (Sơ tuyển - Chung kết)" },
    { value: 3, label: "3 vòng (Sơ tuyển - Chung kết - Chung Kết)" },
  ];

  const dataThangDiem = [
    { value: 1, label: "Thang Điểm 10" },
    { value: 2, label: "Thang Điểm 20" },
  ];

  const [dataDiaDiem, setDataDiaDiem] = useState([]);
  const [tenCuocThi, setTenCuocThi] = useState("");
  const [hinhThuc, setHinhThuc] = useState(dataHinhThuc[0]);
  const [phanThi, setPhanThi] = useState(dataPhanThi[0]);
  const [ngayBatDau, setNgayBatDau] = useState(null);
  const [ngayKetThuc, setNgayKetThuc] = useState(null);
  const [soVongThi, setSoVongThi] = useState(dataSoVongThi[0]);
  const [thangDiem, setThangDiem] = useState(dataThangDiem[0]);
  const [noiDungCuocThi, setNoiDungCuocThi] = useState("");
  const [diaDiemToChuc, setDiaDiemToChuc] = useState(5);

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
      setDiaDiemToChuc(arr[0]);
    };
    getDataDiaDiem();
  }, []);

  const [newCTH, setNewCTH] = useState(-1);

  const addChuongTrinhTruyenThong = () => {
    if (tenCuocThi == "") {
      alert("Tên Cuộc thi không được để trống !");
    } else if (ngayBatDau == null) {
      alert("Ngày bắt đầu không được để trống!");
    } else if (ngayKetThuc == null) {
      alert("Ngày kết thúc không được để trống!");
    } else {
      Axios.post("http://localhost:3001/api/admin/themcuocthitruyenthong", {
        TenCuocThi: tenCuocThi,
        NoiDungCuocThi: noiDungCuocThi,
        ThangDiem: thangDiem.value,
        NgayBatDau: ngayBatDau,
        NgayKetThuc: ngayKetThuc,
        DiaDiemToChuc: diaDiemToChuc.value,
      }).then((response) => {
        setTimeout(() => {
          alert("Thêm cuộc thi thành công!");
        }, 600);
        navigate(`/chinhsuacuocthi/${response.data.idCTH}`);
      });
    }
  };

  const addTheLoaiTuDo = () => {
    if (tenCuocThi == "") {
      alert("Tên Cuộc thi không được để trống !");
    } else if (ngayBatDau == null) {
      alert("Ngày bắt đầu không được để trống!");
    } else if (ngayKetThuc == null) {
      alert("Ngày kết thúc không được để trống!");
    } else {
      Axios.post("http://localhost:3001/api/admin/themcuocthitudo", {
        TenCuocThi: tenCuocThi,
        NoiDungCuocThi: noiDungCuocThi,
        MaPhanThi: phanThi.value,
        SoVongThi: soVongThi.value,
        ThangDiem: thangDiem.value,
        NgayBatDau: ngayBatDau,
        NgayKetThuc: ngayKetThuc,
        DiaDiemToChuc: diaDiemToChuc.value,
      }).then((response) => {
        setTimeout(() => {
          alert("Thêm cuộc thi thành công!");
        }, 600);
        navigate(`/chinhsuacuocthi/${response.data.idCTH}`);
      });
    }
  };

  return (
    <>
      <Breadcrumb href="#" tabIndex="-1">
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
        <Breadcrumb.Item active>Thêm Cuộc Thi</Breadcrumb.Item>
      </Breadcrumb>

      {/* Thêm Cuộc Thi */}
      <div className="newContest text-start">
        {/* Thêm Cuộc Thi */}
        <div>
          <h2 className="text-center d-flex align-items-center justify-content-center pb-3">
            <MusicNote style={{ fontSize: "2.6rem" }} />
            Thêm Cuộc Thi Văn Nghệ
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
                      onChange={setHinhThuc}
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
                          setNgayBatDau(dayjs(newValue).format("YYYY-MM-DD"))
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
                              ".MuiInputBase-input": { paddingTop: "4.2px" },
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
                          setNgayKetThuc(dayjs(newValue).format("YYYY-MM-DD"))
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
                              ".MuiInputBase-input": { paddingTop: "4.2px" },
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
            <Col xs="12" md="5">
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
            </Col>
          </Row>
        </div>

        {/* Button Add, Back */}

        <Row className="pt-2 justify-content-center">
          <Col xs="12" md="3" className="my-1">
            {hinhThuc.value == 1 ? (
              <>
                <Button
                  variant="contained"
                  className="button-style"
                  onClick={addChuongTrinhTruyenThong}
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  className="button-style"
                  onClick={addTheLoaiTuDo}
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </>
            )}
          </Col>
          <Col xs="12" md="3" className="my-1">
            <Button
              variant="contained"
              color="error"
              className="button-style"
              onClick={() => navigate("/tatcacuocthi")}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}
