/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import {
  Row,
  Col,
  Container,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { ManageSearch, MusicNote, Visibility } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import MuiDatatable from "../../../components/table/MuiDatatable";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import TopBar from "../../../components/topbars/TopBar";
import Sidebar from "../../../clientComponent/Siderbar/Sidebar";
import Footer from "../../../components/footer/Footer";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function TruongNhomHome() {
  const navigate = useNavigate();
  const dayjs = require("dayjs");

  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isSmallSize = width <= 769;

  const [dataNguyenBan, setDataNguyenBan] = useState([]);

  const [batDau, setBatDau] = useState(null);
  const [ketThuc, setKetThuc] = useState(null);

  const [isCT, setISCT] = useState(false);


  const handleFilter = () => {
    if (batDau == null) alert("Chưa chọn Ngày Bắt đầu!");
    else if (ketThuc == null) alert("Chưa chọn Ngày Kết thúc!");
    else {
      Axios.post(
        `http://localhost:3001/api/admin/tietmucthuoccuocthidoinhom/vongthi/1/ngay`,
        {
          NgayBatDau: batDau,
          NgayKetThuc: ketThuc,
        }
      ).then((response) => {
        const data = response.data;
        data.forEach((d) => {
          if (d.DiemTrungBinh == null) {
            d.DaCham = "Chưa chấm";
          } else {
            d.DaCham = "Đã chấm";
          }
          if (d.CongBoKetQua == 1) {
            if (d.TrangThai == 1) d.TrangThai = "Đạt";
            else d.TrangThai = "Không Đạt";
            if (d.SoVongThi == d.VongThi) {
              d.TrangThai = d.TenGiaiThuong;
            }
          }
          if (d.CongBoKetQua == 0) {
            d.DiemTrungBinh = "CCB";
            d.TrangThai = "CCB";
          }
          if (d.DiemTrungBinh == null) {
            d.DiemTrungBinh = "CCB";
            d.TrangThai = "CCB";
          }

          if (d.SoVongThi == d.VongThi) {
            d.VongThi = "Chung kết";
          }
          if (d.SoVongThi == 3) {
            if (d.VongThi == 2) d.VongThi = "Chung khảo";
          }
          if (d.VongThi == 1) d.VongThi = "Sơ khảo";
          if (d.VongThi == 0) d.VongThi = "Thi Chương Trình";
          if (d.VongThi == "Thi Chương Trình") {
            d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
              "Từ HH:mm, DD/MM/YYYY"
            );
            d.TrangThai = "Không xét";
          } else if (d.NgayGioThucHien == null) {
            d.NgayGioThucHien = "Chưa sắp lịch";
          } else {
            d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
              "HH:mm, DD/MM/YYYY"
            );
          }
        });
        setDataTietMuc(data);
      });
    }
  };

  const columnsCuocThi = [
    {
      name: "MaCuocThi",
      options: {
        display: false,
        filter: false,
        viewColumn: false,
        sort: false,
        download: false,
        print: false,
      },
    },
    {
      name: "stt",
      label: "STT",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "20px" }}>{value}</div>;
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "10px" }}>STT</div>;
        },
      },
    },
    {
      name: "TenCuocThi",
      label: "Tên Cuộc Thi",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "290px" }}>{value}</div>;
        },
      },
    },
    {
      name: "NgayBatDau",
      options: {
        display: false,
        filter: false,
        viewColumn: false,
        sort: false,
        download: false,
        print: false,
      },
    },
    {
      name: "NgayKetThuc",
      options: {
        display: false,
        filter: false,
        viewColumn: false,
        sort: false,
        download: false,
        print: false,
      },
    },
    {
      name: "ThoiGianDienRa",
      label: "Thời gian Diễn ra",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          let ngaybd = tableMeta.rowData[3];
          let ngaykt = tableMeta.rowData[4];
          return (
            <>
              <div>
                {dayjs(ngaybd).format("DD/MM/YYYY")} -{" "}
                {dayjs(ngaykt).format("DD/MM/YYYY")}
              </div>
            </>
          );
        },
      },
    },
    {
      name: "TenHinhThuc",
      label: "Hình Thức Cuộc Thi",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenDiaDiem",
      label: "Địa Điểm",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenTrangThai",
      label: "Trạng Thái",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div>
                {value == "Chưa Tổ Chức" && (
                  <Button
                    style={{
                      background: "white",
                      border: "1px solid rgb(237, 108, 2)",
                      color: "rgb(230, 81, 0)",
                      fontSize: "0.6rem",
                      padding: "3px 4px",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    Chưa Tổ Chức
                  </Button>
                )}

                {value == "Đang Tổ Chức" && (
                  <Button
                    style={{
                      background: "white",
                      border: "1px solid rgb(2, 136, 209)",
                      color: "rgb(1, 87, 155)",
                      fontSize: "0.6rem",
                      padding: "3px 4px",
                      borderRadius: "10px",
                      display: "flex",
                    }}
                  >
                    Đang Tổ Chức
                  </Button>
                )}

                {value == "Đã Tổ Chức" && (
                  <Button
                    style={{
                      background: "white",
                      border: "1px solid rgb(46, 125, 50)",
                      color: "rgb(27, 94, 32)",
                      fontSize: "0.6rem",
                      padding: "3px 4px",
                      borderRadius: "10px",
                      display: "flex",
                    }}
                  >
                    Đã Tổ Chức
                  </Button>
                )}
              </div>
            </>
          );
        },
      },
    },
    {
      name: "",
      options: {
        filter: false,
        viewColumn: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>
                  <strong>Xem chi tiết</strong>
                </Tooltip>
              }
            >
              <IconButton edge="end" aria-label="edit">
                <Visibility
                  className="icon-hover"
                  onClick={() => {
                    if (tableMeta.rowData[6] === "Đăng ký Thể loại Tự Do") {
                      navigate(
                        `/chitietcuocthi/tudo/${
                          tableMeta.rowData[0]
                        }/${localStorage.getItem("MaNguoiDung")}`
                      );
                    } else {
                      navigate(
                        `/chitietcuocthi/truyenthong/${
                          tableMeta.rowData[0]
                        }/${localStorage.getItem("MaNguoiDung")}`
                      );
                    }
                  }}
                />
              </IconButton>
            </OverlayTrigger>
          );
        },
      },
    },
  ];

  const optionsCuocThi = {
    search: false,
    searchPlaceholder: "Tên Cuộc Thi, Địa Điểm, Ngày Tổ Chức,...",
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "none",
  };

  const columnsTietMuc = [
    {
      name: "stt",
      label: "STT",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "20px" }}>{value}</div>;
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "10px" }}>STT</div>;
        },
      },
    },
    {
      name: "TenTietMuc",
      label: "Tên Tiết Mục",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "200px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenLoaiTietMuc",
      label: "Loại",
      options: {
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "NgayGioThucHien",
      label: "Ngày Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "TenCuocThi",
      label: "Thuộc Cuộc Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "240px" }}>{value}</div>;
        },
      },
    },
    {
      name: "VongThi",
      label: "Vòng Thi",
      options: {
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "DaCham",
      label: "Chấm Điểm",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: "DiemTrungBinh",
      label: "Điểm Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div>
                <strong>{value}</strong>
              </div>
            </>
          );
        },
      },
    },
    {
      name: "TrangThai",
      label: "Kết Quả",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        display: isCT ? false : true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {value == "CCB" ? (
                <div>
                  <strong>{value}</strong>
                </div>
              ) : value == "Không xét" ? (
                <div>
                  <strong>{value}</strong>
                </div>
              ) : value == "Không Đạt" ? (
                <div className="text-danger">
                  <strong>{value}</strong>
                </div>
              ) : value == "Không có giải" ? (
                <div>
                  <strong className="text-muted">{value}</strong>
                </div>
              ): (
                <div className="text-success">
                  <strong>{value}</strong>
                </div>
              )}
            </>
          );
        },
      },
    },
  ];

  const optionsTietMuc = {
    search: true,
    searchPlaceholder: "Tên Tiết mục, Ngày thi, Điểm thi,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "none",
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

      const fileName = `DanhSachTietMuc`;
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

  const [dataCuocThi, setDataCuocThi] = useState([]);
  const [dataTietMuc, setDataTietMuc] = useState([]);

  //Lấy Danh Sách Cuộc Thi Chưa(Đang) Tổ Chức
  useEffect(() => {
    const getDataCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/allcuocthichuahoacdangdienra/${localStorage.getItem(
          "MaNguoiDung"
        )}`
      );
      setDataCuocThi(data);
    };
    getDataCuocThi();
  }, []);

  //Lấy Thông Tin Kết Quả Tiết Mục Dự Thi
  useEffect(() => {
    const getDataTietMuc = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/allketquatietmucduthi/${localStorage.getItem(
          "MaNguoiDung"
        )}`
      );
      data.forEach((d) => {
        if (d.DiemTrungBinh == null) {
          d.DaCham = "Chưa chấm";
        } else {
          d.DaCham = "Đã chấm";
        }
        if (d.CongBoKetQua == 1) {
          if (d.TrangThai == 1) d.TrangThai = "Đạt";
          else d.TrangThai = "Không Đạt";
          if (d.SoVongThi == d.VongThi) {
            d.TrangThai = d.TenGiaiThuong;
          }
        }
        if (d.CongBoKetQua == 0) {
          d.DiemTrungBinh = "CCB";
          d.TrangThai = "CCB";
        }
        if (d.DiemTrungBinh == null) {
          d.DiemTrungBinh = "CCB";
          d.TrangThai = "CCB";
        }

        if (d.SoVongThi == d.VongThi) {
          d.VongThi = "Chung kết";
        }
        if (d.SoVongThi == 3) {
          if (d.VongThi == 2) d.VongThi = "Chung khảo";
          setISCT(false);
        }
        if (d.VongThi == 1) {
          d.VongThi = "Sơ khảo";
          setISCT(false);
        }
        if (d.VongThi == 0) {
          d.VongThi = "Thi Chương Trình";
          setISCT(true);
        }
        if (d.VongThi == "Thi Chương Trình") {
          d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
            "Từ HH:mm, DD/MM/YYYY"
          );
          d.TrangThai = "Không xét";
        } else if (d.NgayGioThucHien == null) {
          d.NgayGioThucHien = "Chưa sắp lịch";
        } else {
          d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
            "HH:mm, DD/MM/YYYY"
          );
        }
      });
      setDataNguyenBan(data);
      setDataTietMuc(data);
    };
    getDataTietMuc();
  }, []);

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 300);
  }, []);

  return (
    <>
      <div className="wrapper">
        <Container fluid style={{ display: "flex", transition: "0.55s" }}>
          <div id="body-pd" className="body-pd">
            <TopBar />
            <Sidebar />
          </div>
          <Container
            fluid
            style={{ paddingTop: "13px", minHeight: "610px" }}
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
                    top: "38%",
                    left: "48%",
                    width: "50px",
                    height: "50px",
                  }}
                />
              </div>
            ) : (
              <>
                {/* Tất Cả Cuộc Thi */}

                <div style={{ width: "100%" }}>
                  <img
                    className="d-block w-100"
                    style={{ borderRadius: "20px" }}
                    src={"http://localhost:3001/slide.png"}
                    alt="First slide"
                  />
                </div>

                <Row style={{ padding: "15px 10px" }}>
                  <MuiDatatable
                    title="Cuộc Thi Văn Nghệ Chưa Hoặc Đang Tổ Chức"
                    data={dataCuocThi}
                    columns={columnsCuocThi}
                    options={optionsCuocThi}
                  />
                </Row>

                {/* Kết Quả Tiết Mục */}
                <div className="text-start mt-4 mb-5">
                  <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
                    <MusicNote style={{ fontSize: "2.6rem" }} />
                    Kết Quả Tiết Mục Dự Thi
                    <MusicNote style={{ fontSize: "2.6rem" }} />
                  </h2>{" "}
                  <Row className="d-flex align-items-center py-2">
                    <Col
                      xs="12"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ManageSearch /> &nbsp;LỌC THEO THỜI GIAN: &nbsp;
                      </div>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        id="ngaybatdau"
                      >
                        <DesktopDatePicker
                          inputFormat="DD/MM/YYYY"
                          value={batDau}
                          maxDate={ketThuc}
                          label="Ngày Bắt Đầu"
                          onChange={(newValue) =>
                            setBatDau(dayjs(newValue).format("YYYY-MM-DD"))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              helperText={null}
                            />
                          )}
                        />
                      </LocalizationProvider>
                      &nbsp; - &nbsp;
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        id="ngayketthuc"
                      >
                        <DesktopDatePicker
                          inputFormat="DD/MM/YYYY"
                          value={ketThuc}
                          minDate={batDau}
                          label="Ngày Kết Thúc"
                          onChange={(newValue) =>
                            setKetThuc(dayjs(newValue).format("YYYY-MM-DD"))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              helperText={null}
                            />
                          )}
                        />
                      </LocalizationProvider>
                      &nbsp;
                      <Button
                        variant="contained"
                        sx={{ padding: "7px 10px 5px 10px" }}
                        onClick={handleFilter}
                      >
                        Filter
                      </Button>
                      &nbsp;
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ padding: "7px 10px 5px 10px" }}
                        onClick={() => {
                          setDataTietMuc(dataNguyenBan);
                          setBatDau(null);
                          setKetThuc(null);
                        }}
                      >
                        Clear
                      </Button>
                    </Col>
                  </Row>
                  <Row style={{ padding: "0px 12px" }}>
                    <MuiDatatable
                      title="Danh Sách Tiết Mục Tham Dự"
                      data={dataTietMuc}
                      columns={columnsTietMuc}
                      options={optionsTietMuc}
                    />
                  </Row>
                </div>
              </>
            )}
          </Container>
        </Container>
        <Footer />
      </div>
    </>
  );
}
