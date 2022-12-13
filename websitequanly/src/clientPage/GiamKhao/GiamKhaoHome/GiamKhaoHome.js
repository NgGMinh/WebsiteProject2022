/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import {
  Row,
  Form,
  Container,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Done, MusicNote, Visibility } from "@mui/icons-material";
import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import MuiDatatable from "../../../components/table/MuiDatatable";
import TopBar from "../../../components/topbars/TopBar";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "../../../components/footer/Footer";
import Sidebar from "../../../clientComponent/Siderbar/Sidebar";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function GiamKhaoHome() {
  const navigate = useNavigate();
  const dayjs = require("dayjs");
  const [refresh, setRefresh] = useState(-1);

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

  const [diem, setDiem] = useState();
  const handleChangeDiemTietMucChuongTrinh = (
    idCuocThi,
    idChuongTrinh,
    idTM
  ) => {
    Axios.post(
      "http://localhost:3001/api/client/updatediemtietmucchuongtrinh",
      {
        idCuocThi: idCuocThi,
        idChuongTrinh: idChuongTrinh,
        idTietMuc: idTM,
        idGiamKhao: localStorage.getItem("MaNguoiDung"),
        DiemSo: diem,
      }
    ).then((response) => {
      setDiem();
      setRefresh(Math.random());
      setTimeout(() => {
        alert("Chấm điểm thành công!");
      }, 400);
    });
  };

  const handleChangeDiemTietMucTuDo = (idCuocThi, idTM) => {
    Axios.post("http://localhost:3001/api/client/updatediemtietmuc", {
      idCuocThi: idCuocThi,
      idTietMuc: idTM,
      idGiamKhao: localStorage.getItem("MaNguoiDung"),
      DiemSo: diem,
    }).then((response) => {
      setDiem();
      setRefresh(Math.random());
      setTimeout(() => {
        alert("Chấm điểm thành công!");
      }, 400);
    });
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
      name: "ThoiGianDienRa",
      label: "Thời gian Diễn ra",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "TenHinhThuc",
      label: "Hình Thức Cuộc Thi",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "TenDiaDiem",
      label: "Địa Điểm",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "MaTrangThai",
      label: "Trạng Thái",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div style={{ display: "flex" }}>
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
            <MuiToolTip title="View Details">
              <IconButton
                edge="end"
                aria-label="edit"
                className="icon-hover"
                onClick={() => {
                  if (tableMeta.rowData[4] == "Đăng ký Thể loại Tự Do") {
                    navigate(`/chitietcuocthi/tudo/${tableMeta.rowData[0]}`);
                  } else {
                    navigate(
                      `/chitietcuocthi/truyenthong/${tableMeta.rowData[0]}`
                    );
                  }
                }}
              >
                <Visibility />
              </IconButton>
            </MuiToolTip>
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
    setCellProps: () => ({ align: "right" }),
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
    onDownload: (buildHead, buildBody, columns, data) => {
      return "\uFEFF" + buildHead(columns) + buildBody(data);
    },
  };

  const columnsTietMuc = [
    {
      name: "MaCuocThi",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    {
      name: "MaTietMuc",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    {
      name: "MaChuongTrinh",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
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
          return <div style={{ maxWidth: "180px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenLoaiTietMuc",
      label: "Loại",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
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
      name: "TrinhBay",
      label: "Trình Bày",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "150px" }}>
              {value.length <= 30 ? (
                value
              ) : (
                <OverlayTrigger
                  placement={"bottom"}
                  overlay={
                    <Tooltip>
                      <strong>{value}</strong>.
                    </Tooltip>
                  }
                >
                  <span>{value.slice(0, 30)}...</span>
                </OverlayTrigger>
              )}
            </div>
          );
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
          return (
            <div style={{ maxWidth: "190px" }}>
              {value.length <= 41 ? (
                value
              ) : (
                <OverlayTrigger
                  placement={"bottom"}
                  overlay={
                    <Tooltip>
                      <strong>{value}</strong>.
                    </Tooltip>
                  }
                >
                  <span>{value.slice(0, 41)}...</span>
                </OverlayTrigger>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "VongThi",
      label: "Vòng Thi",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            // eslint-disable-next-line eqeqeq
            <div>{value}</div>
          );
        },
      },
    },
    {
      name: "DiemSo",
      label: "Điểm",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ width: "100px", display: "flex" }}>
              <Form>
                <Form.Control
                  type="number"
                  step="0.1"
                  min="0"
                  max={tableMeta.rowData[13] * 10}
                  defaultValue={value}
                  onChange={(e) => {
                    setDiem(e.target.value);
                  }}
                  className="chamdiem"
                  sx={{
                    ".chamdiem:focus": {
                      borderColor: "#0d65ff !important",
                      boxShadow: "0 0 0 1px #2684ff !important",
                    },
                  }}
                  id={`form-${tableMeta.rowData[1]}`}
                  onFocus={() => {
                    document.getElementById(
                      `button-save-${tableMeta.rowData[1]}`
                    ).style.display = "flex";
                  }}
                  onBlur={() => {
                    if (
                      document.getElementById(`form-${tableMeta.rowData[1]}`)
                        .value == ""
                    ) {
                      document.getElementById(
                        `button-save-${tableMeta.rowData[1]}`
                      ).style.display = "none";
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // eslint-disable-next-line eqeqeq
                      if (diem < 0 || diem > tableMeta.rowData[11] * 10) {
                        if (diem < 0) alert(`Điểm không được nhỏ hơn 0 !`);

                        if (diem > tableMeta.rowData[11] * 10)
                          alert(
                            `Điểm không hợp lệ! Thang điểm tối đa là: ${
                              tableMeta.rowData[11] * 10
                            }`
                          );
                        e.preventDefault();
                      } else {
                        if (tableMeta.rowData[2] == null) {
                          handleChangeDiemTietMucTuDo(
                            tableMeta.rowData[0],
                            tableMeta.rowData[1]
                          );
                        } else if (tableMeta.rowData[2] != null) {
                          handleChangeDiemTietMucChuongTrinh(
                            tableMeta.rowData[0],
                            tableMeta.rowData[2],
                            tableMeta.rowData[1]
                          );
                        }
                        e.preventDefault();
                      }
                    }
                  }}
                  style={{ textAlign: "center", width: "50px" }}
                />
              </Form>
              &nbsp;&nbsp;
              <MuiToolTip title="Save">
                <IconButton
                  edge="end"
                  aria-label="edit"
                  id={`button-save-${tableMeta.rowData[1]}`}
                  style={{ display: "none" }}
                  onClick={(e) => {
                    if (diem < 0 || diem > tableMeta.rowData[11] * 10) {
                      if (diem < 0) alert(`Điểm không được nhỏ hơn 0 !`);

                      if (diem > tableMeta.rowData[11] * 10)
                        alert(
                          `Điểm không hợp lệ! Thang điểm tối đa là: ${
                            tableMeta.rowData[11] * 10
                          }`
                        );
                      e.preventDefault();
                    } else {
                      if (tableMeta.rowData[2] == null) {
                        handleChangeDiemTietMucTuDo(
                          tableMeta.rowData[0],
                          tableMeta.rowData[1]
                        );
                      } else if (tableMeta.rowData[2] != null) {
                        handleChangeDiemTietMucChuongTrinh(
                          tableMeta.rowData[0],
                          tableMeta.rowData[2],
                          tableMeta.rowData[1]
                        );
                      }
                      e.preventDefault();
                    }
                  }}
                >
                  <Done color="success" />
                </IconButton>
              </MuiToolTip>
            </div>
          );
        },
      },
    },
    {
      name: "MaThangDiem",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
  ];

  const optionsTietMuc = {
    search: true,
    searchPlaceholder: "Tên Thí Sinh, Mssv, Email,...",
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
        `http://localhost:3001/api/client/allcuocthichuahoanthanh/${localStorage.getItem(
          "MaNguoiDung"
        )}`
      );
      data.forEach((d) => {
        if (d.MaTrangThai == 1) d.MaTrangThai = "Chưa Tổ Chức";
        if (d.MaTrangThai == 2) d.MaTrangThai = "Đang Tổ Chức";
        if (d.MaTrangThai == 3) d.MaTrangThai = "Đã Tổ Chức";
        d.ThoiGianDienRa = `${dayjs(d.NgayBatDau).format(
          "DD/MM/YYYY"
        )} - ${dayjs(d.NgayKetThuc).format("DD/MM/YYYY")}`;
      });
      setDataCuocThi(data);
    };
    getDataCuocThi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  //Lấy Thông Tin Tiết Mục Dự Thi Cần Chấm Điểm
  useEffect(() => {
    const getDataTietMuc = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/alltietmuccanchamdiem/${localStorage.getItem(
          "MaNguoiDung"
        )}`
      );
      // eslint-disable-next-line array-callback-return
      const newData = data.filter(d => {
        let d1 = new Date(dayjs(d.NgayGioThucHien).format("YYYY-MM-DDTHH:MM"));
        let d2 = new Date();
        return d1.getTime() <= d2.getTime()
      })
      newData.forEach((d) => {
        if (d.SoVongThi == 0) d.VongThi = "Thi Chương Trình";
        else {
          if (d.SoVongThi == 2) {
            if (d.VongThi == 1) d.VongThi = "Sơ tuyển";
            else d.VongThi = "Chung kết";
          } else {
            if (d.VongThi == 1) d.VongThi = "Sơ tuyển";
            else if (d.VongThi == 2) d.VongThi = "Chung khảo";
            else d.VongThi = "Chung kết";
          }
        }

        if (d.VongThi == "Thi Chương Trình") {
          d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
            "Từ HH:mm, DD/MM/YYYY"
          );
        } else if (d.NgayGioThucHien == null) {
          d.NgayGioThucHien = "Chưa sắp lịch";
        } else {
          d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
            "HH:mm, DD/MM/YYYY"
          );
        }
      });
      setDataTietMuc(newData);
    };
    getDataTietMuc();
  }, [refresh]);

  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 300);
  }, [refresh]);

  return (
    <>
      <div className="wrapper">
        <Container fluid style={{ display: "flex", transition: "0.55s" }}>
          <div id="body-pd" className="body-pd">
            <TopBar />
            <Sidebar />
          </div>
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
                  top: "36%",
                  left: "48%",
                  width: "50px",
                  height: "50px",
                }}
              />
            </div>
          ) : (
            <Container
              fluid
              style={{ paddingTop: "13px", minHeight: "800px" }}
              id="container-bg"
            >
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
              <hr />
              <div className="text-start my-4">
                <Row style={{ padding: "0px 12px" }}>
                  <MuiDatatable
                    title="Danh Sách Tiết Mục Cần Chấm Điểm"
                    data={dataTietMuc}
                    columns={columnsTietMuc}
                    options={optionsTietMuc}
                  />
                </Row>
              </div>
            </Container>
          )}
        </Container>
        <Footer />
      </div>
    </>
  );
}
