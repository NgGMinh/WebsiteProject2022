/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Card,
  Container,
  Breadcrumb,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import "../../../../../../pages/CuocThiVanNghe/CuocThiVanNghe.css";
import {
  ConfirmationNumber,
  Edit,
  MusicNote,
  NoteAlt,
  QueueMusicRounded,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { CDBCollapse } from "cdbreact";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";
import MuiDatatable from "../../../../../../components/table/MuiDatatable";
import TopBar from "../../../../../../components/topbars/TopBar";
import Sidebar from "../../../../../../clientComponent/Siderbar/Sidebar";
import Footer from "../../../../../../components/footer/Footer";

export default function ThemTietMucTruongNhom() {
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
  
  const [themLoaiTietMuc, setThemLoaiTietMuc] = useState(false);
  const [nhanSo, setNhanSo] = useState(1);
  const [dataThiSinhThuocDV, setDataThiSinhThuocDV] = useState([]);
  const [dataMaGiamKhao, setDataMaGiamKhao] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [maDonVi, setMaDonVi] = useState();

  const [tenTietMuc, setTenTietMuc] = useState("");
  const [loaiTietMuc, setLoaiTietMuc] = useState(1);
  const [thoiGianThucHien, setThoiGianThucHien] = useState();

  const [dataLoaiTietMuc, setDataLoaiTietMuc] = useState([]);

  const [tenCuocThi, setTenCuocThi] = useState("");

  const [tenChuongTrinh, setTenChuongTrinh] = useState("");
  const [maNhomTruong, setMaNhomTruong] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [hinhThucCT, setHinhThucCT] = useState("");
  const [tenDonVi, setTenDonVi] = useState("");
  const [noiDungTietMuc, setNoiDungTietMuc] = useState("");

  const handleShowThemLoaiTietMuc = () => setThemLoaiTietMuc(!themLoaiTietMuc);

  const handleChangeLoaiTietMuc = (event) => {
    setLoaiTietMuc(event.target.value);
    setTenTietMuc(document.getElementById("tentietmuc").value);
    const loai = event.target.value;
    if (loai > 6) {
      setNhanSo("");
    }
    if (loai <= 6) {
      if (loai == 1 || loai == 2) setNhanSo(1);
      if (loai == 3 || loai == 4) setNhanSo(2);
      if (loai == 5) setNhanSo(3);
      if (loai == 6) setNhanSo(4);
    }
  };

  const handleChangeNhanSo = (event) => {
    setNhanSo(event.target.value);
  };

  const [rowCount, setRowCount] = useState(0);

  var arr = [];
  for (let i = 0; i < dataThiSinhThuocDV.length; i++) {
    arr.push([dataThiSinhThuocDV[i].stt, dataThiSinhThuocDV[i].MaThiSinh]);
  }

  const [dataMaThiSinh, setDataMaThiSinh] = useState([]);

  const [refresh, setRefresh] = useState(-1);

  // Lấy Thông Tin Đơn vị Tổ chức, Địa Điểm Từ Database
  useEffect(() => {
    const getDataLoaiTietMuc = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/loaitietmuc"
      );
      setDataLoaiTietMuc(data);
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
      setThoiGianThucHien(data[0].NgayGioToChuc);
      setMaNhomTruong(data[0].MaTruongDonVi);
      setRefresh(Math.random());
    };
    getDataChiTietCT();
  }, []);

  useEffect(() => {
    const getDataThiSinhThuocDonVi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/thisinhthuocdoandoitruongdonvi/${maNhomTruong}`
      );
      setDataThiSinhThuocDV(data);
    };
    getDataThiSinhThuocDonVi();
  }, [refresh]);

  const optionsThiSinh = {
    search: true,
    searchPlaceholder: "Tên thí sinh, email, phone...",
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
    selectableRowsHeader: rowCount > 0 ? true : false,
    isRowSelectable: (dataIndex, selectedRows) => {
      if (rowCount < nhanSo) {
        return true;
      } else {
        return selectedRows.lookup[dataIndex];
      }
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
    },
    onDownload: (buildHead, buildBody, columns, data) => {
      return "\uFEFF" + buildHead(columns) + buildBody(data);
    },
    textLabels: {
      body: {
        noMatch: "Bảng rỗng",
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
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
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

  const handleAddTietMuc = () => {
    var arrMaThiSinh = [];
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
      alert("Chưa đủ thí sinh trình bày!");
    } else {
      Axios.post("http://localhost:3001/api/admin/addtietmucchuongtrinh", {
        maCuocThi: params.idCuocThi,
        maChuongTrinh: params.idChuongTrinh,
        tenTietMuc: tenTietMuc,
        loaiTietMuc: loaiTietMuc,
        noiDungTietMuc: noiDungTietMuc,
        thoiGianThucHien: thoiGianThucHien,
        nhanSo: nhanSo,
        arrMaThiSinh: arrMaThiSinh,
        arrMaGiamKhao: dataMaGiamKhao,
      }).then((response) => {
        navigate(
          `/chitietcuocthi/truyenthong/${params.idCuocThi}/chitietchuongtrinh/${
            params.idChuongTrinh
          }/${localStorage.getItem("MaNguoiDung")}`
        );
      });
    }
  };

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
      document.getElementById("cuocthi").classList.add("actives");
      document.getElementById("tietmuc").classList.remove("actives");
      document.title = "Thêm Tiết Mục Chương Trình";
    }, 200);
  }, [refresh]);

  return (
    <div className="wrapper">
      <Container fluid style={{ display: "flex", transition: "0.55s" }}>
        <div id="body-pd" className="body-pd">
          <TopBar />
          <Sidebar />
        </div>
        <Container
          fluid
          style={{ paddingTop: "13px", minHeight: "800px" }}
          id="container-bg"
        >
          {load ? (
            <div
              style={{ position: "relative", width: "100%", height: "100vh" }}
            >
              <Spinner
                animation="border"
                variant="primary"
                id="spinner"
                style={{
                  position: "absolute",
                  top: "43%",
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
                  <Link to="/userhome" className="link">
                    Home
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#" tabIndex="-1">
                  <Link to="/cuocthithamdu" className="link">
                    Cuộc Thi Tham Dự
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  href="#"
                  tabIndex="-1"
                  style={{ textAlign: "left" }}
                >
                  <Link
                    to={`/chitietcuocthi/truyenthong/${
                      params.idCuocThi
                    }/${localStorage.getItem("MaNguoiDung")}`}
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
                    to={`/chitietcuocthi/truyenthong/${
                      params.idCuocThi
                    }/chitietchuongtrinh/${
                      params.idChuongTrinh
                    }/${localStorage.getItem("MaNguoiDung")}`}
                    className="link"
                  >
                    {tenChuongTrinh}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Thêm Tiết Mục</Breadcrumb.Item>
              </Breadcrumb>

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

                    {/* Loại Tiết Mục */}
                    <Col xs="12" md="4">
                      <Form.Group className="mb-1">
                        <Form.Label
                          className="d-flex align-items-center justify-content-between"
                          style={{ fontWeight: "500", width: "100%" }}
                        >
                          <span>
                            <QueueMusicRounded /> Loại Tiết Mục{" "}
                          </span>
                          <p
                            className="text-primary my-0 mx-2"
                            onClick={handleShowThemLoaiTietMuc}
                          >
                            + Add New
                          </p>
                        </Form.Label>
                        <Form.Select
                          onChange={(e) => handleChangeLoaiTietMuc(e)}
                          name="slLoaiTietMuc"
                          value={loaiTietMuc}
                        >
                          {dataLoaiTietMuc.map((data) => (
                            <option
                              key={data.MaLoaiTietMuc}
                              value={data.MaLoaiTietMuc}
                              name={`slLoaiTietMuc-${data.MaLoaiTietMuc}`}
                            >
                              {data.TenLoaiTietMuc}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <CDBCollapse isOpen={themLoaiTietMuc} className="pb-3">
                        <Card style={{ width: "100%" }}>
                          <Card.Header>Thêm Loại Tiết Mục</Card.Header>
                          <Card.Body>
                            <Form.Group>
                              <Row className="px-5">
                                <Form.Label className="px-0">
                                  Tên Loại tiết Mục
                                </Form.Label>
                                <Form.Control type="text"></Form.Control>
                              </Row>
                              <Row className="pt-2 text-center">
                                <Col md="12">
                                  <Button
                                    variant="primary"
                                    className="mx-2 px-5"
                                  >
                                    Add
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    onClick={handleShowThemLoaiTietMuc}
                                    className="px-5"
                                  >
                                    Cancel
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Group>
                          </Card.Body>
                        </Card>
                      </CDBCollapse>
                    </Col>

                    {/* Nhân Số */}
                    <Col xs="12" md="4">
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
                          onChange={handleChangeNhanSo}
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
                  </Row>

                  <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
                    <MusicNote style={{ fontSize: "2.6rem" }} />
                    Thêm Thí Sinh Trình Bày
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
                          <Button variant="outline-primary">
                            Thêm Thí Sinh Mới
                          </Button>
                          &nbsp;
                          <Button variant="outline-success">
                            Nhập Từ Excel
                          </Button>
                        </Col>
                      </Row>

                      <MuiDatatable
                        title="Danh sách Thí Sinh Thuộc Đơn Vị"
                        data={dataThiSinhThuocDV}
                        columns={columnsThiSinh}
                        options={optionsThiSinh}
                      />
                    </>
                  </Row>

                  {/* Button Add, Back */}
                  <Row className="pt-2">
                    <Col className="text-center my-2">
                      <Button
                        type="button"
                        className="px-5"
                        onClick={() => {
                          handleAddTietMuc();
                        }}
                      >
                        Add
                      </Button>
                      &nbsp;
                      <Button
                        type="reset"
                        variant="warning"
                        className="px-5 text-white"
                      >
                        Reset
                      </Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        className="px-5"
                        onClick={() =>
                          navigate(
                            `/chinhsuachuongtrinh/${params.idChuongTrinh}`
                          )
                        }
                      >
                        Back
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </>
          )}
        </Container>
      </Container>
      <Footer />
    </div>
  );
}
