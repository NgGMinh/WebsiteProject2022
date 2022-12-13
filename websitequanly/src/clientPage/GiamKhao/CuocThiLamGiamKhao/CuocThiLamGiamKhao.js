/* eslint-disable eqeqeq */
import { Row, Col, Form, Container } from "react-bootstrap";
import { ManageSearch, MusicNote, Visibility } from "@mui/icons-material";
import React from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import MuiDatatable from "../../../components/table/MuiDatatable";
import TopBar from "../../../components/topbars/TopBar";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "../../../components/footer/Footer";
import Sidebar from "../../../clientComponent/Siderbar/Sidebar";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function CuocThiLamGiamKhao() {
  const navigate = useNavigate();
  const dayjs = require("dayjs");

  const [page, setPage] = useState(0);

  const [dataCuocThi, setDataCuocThi] = useState([]);
  const [dataNguyenBan, setDataNguyenBan] = useState([]);
  const [selectRadio, setSelectRadio] = useState(1);

  const handleRadioChange = (e) => {
    setBatDau(null);
    setKetThuc(null);
    setSelectRadio(e.target.value);
  };
  const [batDau, setBatDau] = useState(null);
  const [ketThuc, setKetThuc] = useState(null);

  const handleFilter = () => {
    if (batDau == null)
      alert('Chưa chọn "Ngày" hoặc "Tháng" hoặc "Năm" Bắt đầu!');
    else if (ketThuc == null)
      alert('Chưa chọn "Ngày" hoặc "Tháng" hoặc "Năm" Kết thúc!');
    else {
      if (selectRadio == 1) {
        Axios.post(
          `http://localhost:3001/api/client/allcuocthilamgiamkhao/${localStorage.getItem(
            "MaNguoiDung"
          )}/ngay`,
          {
            NgayBatDau: batDau,
            NgayKetThuc: ketThuc,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            d.ThoiGianDienRa = `${dayjs(d.NgayBatDau).format(
              "DD/MM/YYYY"
            )} - ${dayjs(d.NgayKetThuc).format("DD/MM/YYYY")}`;
          });
          setDataCuocThi(data);
          setPage(0);
        });
      }
      if (selectRadio == 2) {
        Axios.post(
          `http://localhost:3001/api/client/allcuocthilamgiamkhao/${localStorage.getItem(
            "MaNguoiDung"
          )}/thang`,
          {
            NgayBatDau: batDau,
            NgayKetThuc: ketThuc,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            d.ThoiGianDienRa = `${dayjs(d.NgayBatDau).format(
              "DD/MM/YYYY"
            )} - ${dayjs(d.NgayKetThuc).format("DD/MM/YYYY")}`;
          });
          setDataCuocThi(data);
          setPage(0);
        });
      }
      if (selectRadio == 3) {
        Axios.post(
          `http://localhost:3001/api/client/allcuocthilamgiamkhao/${localStorage.getItem(
            "MaNguoiDung"
          )}/nam`,
          {
            NgayBatDau: batDau,
            NgayKetThuc: ketThuc,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            d.ThoiGianDienRa = `${dayjs(d.NgayBatDau).format(
              "DD/MM/YYYY"
            )} - ${dayjs(d.NgayKetThuc).format("DD/MM/YYYY")}`;
          });
          setDataCuocThi(data);
          setPage(0);
        });
      }
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
      name: "TenCuocThi",
      label: "Tên Cuộc Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "220px" }}>{value}</div>;
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
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div>{value}</div>
            </>
          );
        },
      },
    },
    {
      name: "TenHinhThuc",
      label: "Hình Thức Cuộc Thi",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenDiaDiem",
      label: "Địa Điểm",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenTrangThai",
      label: "Trạng Thái",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
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
            <IconButton edge="end" aria-label="edit">
              <Visibility
                style={{ cursor: "pointer" }}
                className="icon-hover"
                onClick={() => {
                  if (tableMeta.rowData[6] == "Đăng ký Thể loại Tự Do") {
                    navigate(`/chitietcuocthi/tudo/${tableMeta.rowData[0]}`);
                  } else {
                    navigate(
                      `/chitietcuocthi/truyenthong/${tableMeta.rowData[0]}`
                    );
                  }
                }}
              />
            </IconButton>
          );
        },
      },
    },
  ];

  const optionsCuocThi = {
    search: true,
    searchPlaceholder: "Tên Cuộc Thi, Địa Điểm, Ngày Tổ Chức,...",
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
    page: page,
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

      const fileName = `DanhSachCuocThi`;
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

  useEffect(() => {
    const getDataCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/allcuocthilamgiamkhao/${localStorage.getItem(
          "MaNguoiDung"
        )}`
      );
      data.forEach((d) => {
        d.ThoiGianDienRa = `${dayjs(d.NgayBatDau).format(
          "DD/MM/YYYY"
        )} - ${dayjs(d.NgayKetThuc).format("DD/MM/YYYY")}`;
      });
      setDataNguyenBan(data);
      setDataCuocThi(data);
    };
    getDataCuocThi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            style={{ paddingTop: "13px", minHeight: "800px" }}
            id="container-bg"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/userhome" className="link">
                  Home
                </Link>
              </li>

              <li className="breadcrumb-item active">Giám Khảo Cuộc Thi</li>
            </ol>

            <div className="text-start mb-2">
              <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
                <MusicNote style={{ fontSize: "2.6rem" }} />
                Cuộc Thi Văn Nghệ
                <MusicNote style={{ fontSize: "2.6rem" }} />
              </h2>{" "}
            </div>
            <Row className="d-flex align-items-center">
              <Col xs="12" md="5">
                <div
                  className="p-0 m-0 d-flex align-items-center justify-content-between"
                  style={{ fontWeight: "500" }}
                >
                  <span>
                    <ManageSearch /> Lọc Theo Thời Gian: &nbsp;
                  </span>
                  <Form.Check
                    type="radio"
                    value="1"
                    name="date"
                    id="date1"
                    label={
                      <>
                        <label htmlFor="date1">Ngày</label>
                      </>
                    }
                    defaultChecked
                    onChange={(e) => handleRadioChange(e)}
                    // style={{ marginRight: "50px" }}
                  />
                  <Form.Check
                    type="radio"
                    value="2"
                    id="date2"
                    name="date"
                    label={
                      <>
                        <label htmlFor="date2">Tháng</label>
                      </>
                    }
                    onChange={(e) => handleRadioChange(e)}
                    // style={{ marginRight: "50px" }}
                  />
                  <Form.Check
                    type="radio"
                    value="3"
                    id="date3"
                    name="date"
                    label={
                      <>
                        <label htmlFor="date3">Năm</label>
                      </>
                    }
                    onChange={(e) => handleRadioChange(e)}
                    // style={{ marginRight: "50px" }}
                  />
                </div>
              </Col>
              <Col
                xs="12"
                md="7"
                className="pt-1 pb-2"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                }}
              >
                {selectRadio == 1 && (
                  <>
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
                  </>
                )}
                {selectRadio == 2 && (
                  <>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="thangbatdau"
                    >
                      <DesktopDatePicker
                        inputFormat="MM/YYYY"
                        views={["year", "month"]}
                        value={batDau}
                        maxDate={ketThuc}
                        label="Tháng Bắt Đầu"
                        onChange={(newValue) =>
                          setBatDau(dayjs(newValue).format("YYYY-MM"))
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
                      id="thangketthuc"
                    >
                      <DesktopDatePicker
                        inputFormat="MM/YYYY"
                        views={["year", "month"]}
                        value={ketThuc}
                        minDate={batDau}
                        label="Tháng Kết Thúc"
                        onChange={(newValue) =>
                          setKetThuc(dayjs(newValue).format("YYYY-MM"))
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
                  </>
                )}
                {selectRadio == 3 && (
                  <>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="nambatdau"
                    >
                      <DesktopDatePicker
                        inputFormat="YYYY"
                        views={["year"]}
                        value={batDau}
                        maxDate={ketThuc}
                        label="Năm Bắt Đầu"
                        onChange={(newValue) =>
                          setBatDau(dayjs(newValue).format("YYYY"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                            className="focus-d"
                          />
                        )}
                      />
                    </LocalizationProvider>
                    &nbsp; - &nbsp;
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      id="namketthuc"
                    >
                      <DesktopDatePicker
                        inputFormat="YYYY"
                        views={["year"]}
                        value={ketThuc}
                        minDate={batDau}
                        label="Năm Kết Thúc"
                        onChange={(newValue) =>
                          setKetThuc(dayjs(newValue).format("YYYY"))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                            className="focus-d"
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </>
                )}
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
                    setDataCuocThi(dataNguyenBan);
                    setBatDau(null);
                    setKetThuc(null);
                    setPage(0);
                  }}
                >
                  Clear
                </Button>
              </Col>
            </Row>
            <Row style={{ padding: "0px 10px" }}>
              <MuiDatatable
                title="Danh Sách Cuộc Thi"
                data={dataCuocThi}
                columns={columnsCuocThi}
                options={optionsCuocThi}
              />
            </Row>
          </Container>
        </Container>
        <Footer />
      </div>
    </>
  );
}
