/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { Form, Row, Col, Breadcrumb, Modal } from "react-bootstrap";
import { useState } from "react";
import "../CuocThiVanNghe.css";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MusicNote,
  AccessTime,
  EditLocationAlt,
  NoteAlt,
  Radio,
  School,
  Person,
  Mail,
  Phone,
  ChangeCircleOutlined,
  Add,
  ArrowBack,
} from "@mui/icons-material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import MuiDatatable from "../../../components/table/MuiDatatable";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function ThemChuongTrinhDuThi() {
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
  const params = useParams();

  const dayjs = require("dayjs");

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const [tenChuongTrinh, setTenChuongTrinh] = useState("");
  const [ngayGioToChuc, setNgayGioToChuc] = useState(null);
  const [diaDiemToChuc, setDiaDiemToChuc] = useState("");
  const [donViToChuc, setDonViToChuc] = useState();
  const [noiDungChuongTrinh, setNoiDungChuongTrinh] = useState("");

  const [ngayBatDau, setNgayBatDau] = useState();
  const [ngayKetThuc, setNgayKetThuc] = useState();

  const [dataThiSinh, setDataThiSinh] = useState([]);

  const [maNhomTruong, setMaNhomTruong] = useState(-1);
  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stt, setSTT] = useState();
  const [refresh, setRefresh] = useState(-1);

  const [dataDonVi, setDataDonVi] = useState([]);
  const [tenCuocThi, setTenCuocThi] = useState([]);
  const [maDiaDiem, setMaDiaDiem] = useState("");

  const [maDoanDoi, setMaDoanDoi] = useState("");

  // Lấy Thông Tin Đơn vị Tổ chức, Địa Điểm Từ Database
  useEffect(() => {
    const getDataChiTietCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
      );
      setTenCuocThi(data[0].TenCuocThi);
      setDiaDiemToChuc(data[0].TenDiaDiem);
      setMaDiaDiem(data[0].MaDiaDiem);
      setNgayBatDau(dayjs(data[0].NgayBatDau).format("YYYY-MM-DD"));
      setNgayKetThuc(dayjs(data[0].NgayKetThuc).format("YYYY-MM-DD"));
    };
    getDataChiTietCuocThi();
  }, []);

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
      setDataDonVi(arr);
    };
    getDataDonVi();
  }, []);

  useEffect(() => {
    const getDataThiSinh = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/doandoi/nguoidungtruongnhom/${donViToChuc.value}`
      );
      data.forEach((d) => {
        d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ";
        if (d.MaDinhDanh == "" || d.MaDinhDanh == null) d.MaDinhDanh = "Không";
        if (d.MaLop == "" || d.MaLop == null) d.MaLop = "Không";
      });
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
      name: "TenDoanDoi",
      label: "Tên Đoàn Đội",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "280px" }}>{value}</div>;
        },
      },
    },
  ];

  const optionsThiSinh = {
    search: true,
    download: true,
    print: false,
    viewColumns: true,
    filter: false,
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

      const fileName = `DanhSachTruongNhom`;
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

  const handleAddNhomTruong = () => {
    const dt = dataThiSinh.filter((data) => {
      return data.stt == stt + 1;
    });
    setMaDoanDoi(dt[0].MaDoanDoi);
    setMaNhomTruong(dt[0].MaThiSinh);
    setHoTen(dt[0].TenThiSinh);
    setEmail(dt[0].Email);
    setPhone(dt[0].Phone);
    setRefresh(Math.random());
  };

  const [newCTR, setNewCTR] = useState(-1);

  const add = () => {
    if (maNhomTruong == -1) {
      alert("Chưa chọn Trưởng Đơn vị !");
    } else if (tenChuongTrinh == "") {
      alert("Tên Chương trình không được để trống !");
    } else {
      Axios.post(
        `http://localhost:3001/api/admin/addchuongtrinhcuocthi/${params.idCuocThi}`,
        {
          TenChuongTrinh: tenChuongTrinh,
          DiaDiemToChuc: maDiaDiem,
          DonViToChuc: donViToChuc.value,
          NgayGioToChuc: ngayGioToChuc,
          NoiDungChuongTrinh: noiDungChuongTrinh,
          MaTruongDonVi: maNhomTruong,
          MaDoanDoi: maDoanDoi,
        }
      ).then((response) => {
        setNewCTR(response.data.idCTR);
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("cuocthivannghe").classList.add("actives");
    }, 200);
    document.title =
      "Thêm Chương Trình Dự Thi - Website quản lý công tác văn nghệ Trường Đại Học Cần Thơ";
  }, []);

  useEffect(() => {
    if (newCTR > -1) {
      navigate(
        `/chinhsuacuocthi/${params.idCuocThi}/chinhsuachuongtrinh/${newCTR}`
      );
      setTimeout(() => {
        alert("Thêm Chương trình thành công !");
      }, 600);
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
          <Link to="/tatcacuocthi" className="link">
            Cuộc Thi Văn Nghệ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" tabIndex="-1">
          <Link to={`/chinhsuacuocthi/${params.idCuocThi}`} className="link">
            {tenCuocThi}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Thêm Chương Trình Dự Thi</Breadcrumb.Item>
      </Breadcrumb>

      {/* Thêm Chương Trình */}
      <div className="text-start">
        {/* Thẻ Tên "Thêm Chương Trình" */}
        <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Thêm Chương Trình Dự Thi
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
              <Form.Control type="text" value={diaDiemToChuc} />
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
              {/* <Form.Select
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
              </Form.Select> */}
              <Select
                options={dataDonVi}
                value={donViToChuc}
                id="donvi"
                onChange={(e) => {
                  setDonViToChuc(e);
                  setMaNhomTruong(-1);
                  setEmail("");
                  setPhone("");
                  setSTT(-1);
                }}
                className="zIndex-998"
              />
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

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={ngayGioToChuc}
                  inputFormat="HH:mm, DD/MM/YYYY"
                  maxDate={ngayKetThuc}
                  minDate={ngayBatDau}
                  minTime={dayjs("2018-01-01T07:30")}
                  maxTime={dayjs("2018-01-01T22:00")}
                  onChange={(newValue) =>
                    setNgayGioToChuc(dayjs(newValue).format("YYYY-MM-DDTHH:mm"))
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
                <p
                  className="themNhomTruong"
                  onClick={() => {
                    setRefresh(Math.random());
                    setShow(true);
                  }}
                >
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
                      onClick={() => {
                        setRefresh(Math.random());
                        setShow(true);
                      }}
                    >
                      <ChangeCircleOutlined />
                      Change
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
        <Row className="pt-2 justify-content-center">
          <Col xs="12" md="3"></Col>
          <Col xs="12" md="3" className="my-1">
            <Button
              variant="contained"
              className="button-style"
              onClick={() => {
                add();
              }}
              startIcon={<Add />}
            >
              Add
            </Button>
          </Col>
          <Col xs="12" md="3" className="my-1">
            <Button
              variant="contained"
              color="error"
              className="button-style"
              onClick={() => navigate(`/chinhsuacuocthi/${params.idCuocThi}`)}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
          </Col>
          <Col xs="12" md="3"></Col>
        </Row>
      </div>

      {/* Thêm Nhóm Trưởng */}
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-lg"
        dialogClassName="modal-width"
      >
        <Modal.Header closeButton className="px-4">
          <Modal.Title className="ms-auto">
            {maNhomTruong == -1
              ? "Thêm Trưởng Đơn Vị"
              : "Thay Đổi Trưởng Đơn Vị"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ padding: "10px 24px" }}>
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
            <Col xs="12" md="6" className="my-1">
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
            <Col xs="12" md="6" className="my-1">
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
