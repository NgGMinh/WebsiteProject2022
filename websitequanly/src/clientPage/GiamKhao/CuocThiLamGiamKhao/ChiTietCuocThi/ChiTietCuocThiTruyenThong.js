/* eslint-disable eqeqeq */
import React from "react";
import {
  Row,
  Col,
  Container,
  Breadcrumb,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MusicNote,
  HistoryEdu,
  ManageSearch,
  Visibility,
} from "@mui/icons-material";

import TopBar from "../../../../components/topbars/TopBar";
import Sidebar from "../../../../clientComponent/Siderbar/Sidebar";
import Footer from "../../../../components/footer/Footer";
import {
  Button,
  Divider,
  IconButton,
  Tooltip as MuiToolTip,
} from "@mui/material";
import MuiDatatable from "../../../../components/table/MuiDatatable";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function ChiTietCuocThiTruyenThong() {
  const params = useParams();
  const navigate = useNavigate();

  const dayjs = require("dayjs");

  const [dataNguyenBan, setDataNguyenBan] = useState([]);

  const [batDau, setBatDau] = useState(null);
  const [ketThuc, setKetThuc] = useState(null);

  const handleFilter = () => {
    if (batDau == null) alert("Chưa chọn Ngày Bắt đầu!");
    else if (ketThuc == null) alert("Chưa chọn Ngày Kết thúc!");
    else {
      Axios.post(
        `http://localhost:3001/api/client/allchuongtrinhcuocthitruyenthong/${
          params.idCuocThi
        }/giamkhao/${localStorage.getItem("MaNguoiDung")}/ngay`,
        {
          NgayBatDau: batDau,
          NgayKetThuc: ketThuc,
        }
      ).then((response) => {
        const data = response.data;
        data.forEach((d) => {
          if (d.NgayGioToChuc == null) d.NgayGioToChuc = "Chưa sắp lịch";
          else
            d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format(
              "HH:mm, DD/MM/YYYY"
            );
        });
        setDataChuongTrinh(data);
      });
    }
  };

  const [tenCuocThi, setTenCuocThi] = useState("");
  const [hinhThuc, setHinhThuc] = useState(1);
  const [trangThai, setTrangThai] = useState();
  const [phanThi, setPhanThi] = useState(1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [soVongThi, setSoVongThi] = useState(1);
  const [thangDiem, setThangDiem] = useState(1);
  const [noiDungCuocThi, setNoiDungCuocThi] = useState("");
  const [diaDiemToChuc, setDiaDiemToChuc] = useState(5);
  const [choPhepDangKy, setChoPhepDangKy] = useState();

  const [refresh, setRefresh] = useState(-1);
  const [dataChuongTrinh, setDataChuongTrinh] = useState([]);
  const [dataChuongTrinhCuThe, setDataChuongTrinhCuThe] = useState([]);
  const [maTrangThai, setMaTrangThai] = useState(1);

  const [dataGiamKhao, setDataGiamKhao] = useState([]);

  let giamKhao = "";
  if (dataGiamKhao.length == 0) giamKhao = "Chưa mời.";

  dataGiamKhao.forEach((d) => {
    if (d.stt == 1) giamKhao = giamKhao + d.HoTenNguoiDung;
    else {
      giamKhao = giamKhao + ", " + d.HoTenNguoiDung;
    }
  });

  useEffect(() => {
    const getDataChiTietCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
      );
      setTenCuocThi(data[0].TenCuocThi);
      setHinhThuc(data[0].MaHinhThucCuocThi);
      setNoiDungCuocThi(data[0].NoiDungCuocThi);
      setDiaDiemToChuc(data[0].TenDiaDiem);
      setNgayBatDau(dayjs(data[0].NgayBatDau).format("DD/MM/YYYY"));
      setNgayKetThuc(dayjs(data[0].NgayKetThuc).format("DD/MM/YYYY"));
      setSoVongThi(data[0].SoVongThi);
      setThangDiem(data[0].MaThangDiem);
      setPhanThi(data[0].MaPhanThi);
      setTrangThai(data[0].TenTrangThai);
      setChoPhepDangKy(data[0].ChoPhepDangKy);
      setMaTrangThai(data[0].MaTrangThai);
      setRefresh(Math.random());
    };
    getDataChiTietCuocThi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getDataChuongTrinh = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/allchuongtrinhcuocthitruyenthong/${
          params.idCuocThi
        }/giamkhao/${localStorage.getItem("MaNguoiDung")}`
      );
      data.forEach((d) => {
        let d1 = new Date(dayjs(d.NgayGioToChuc).format("YYYY-MM-DDTHH:MM"));
        let d2 = new Date();
        if (d1.getTime() <= d2.getTime()) d.CoTheCham = 1;
        else d.CoTheCham = 0;

        if (d.NgayGioToChuc == null) d.NgayGioToChuc = "Chưa sắp lịch";
        else
          d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format("HH:mm, DD/MM/YYYY");
      });
      setDataNguyenBan(data);
      setDataChuongTrinh(data);
    };
    getDataChuongTrinh();

    const getDataChuongTrinhCuThe = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/cuocthi/${
          params.idCuocThi
        }/truongnhom/${localStorage.getItem("MaNguoiDung")}/chuongtrinhduthi`
      );
      setDataChuongTrinhCuThe(data);
    };
    getDataChuongTrinhCuThe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getDataGiamKhao = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/giamkhaocuocthi/${params.idCuocThi}`
      );
      setDataGiamKhao(data);
    };
    getDataGiamKhao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsChuongTrinh = [
    // ID
    {
      name: "MaChuongTrinh",
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

    //STT
    {
      name: "stt",
      label: "STT",
      options: {
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "35px" }}>{value}</div>;
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>STT</div>;
        },
      },
    },

    //Tên Chương Trình
    {
      name: "TenChuongTrinh",
      label: "Tên Chương Trình",
      options: {
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "280px" }}>{value}</div>;
        },
      },
    },
    //Ngày Giờ Tổ Chức
    {
      name: "NgayGioToChuc",
      label: "Ngày Giờ Tổ Chức",
      options: {
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "220px" }}>{value}</div>;
        },
      },
    },
    //Thuộc Khoa
    {
      name: "TenDonVi",
      label: "Đơn vị Tổ chức",
      options: {
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "200px" }}>{value}</div>;
        },
      },
    },

    {
      name: "DiemTrungBinh",
      label: "Điểm TB",
      options: {
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value == null ? "..." : value}</div>;
        },
      },
    },
    //Xem Chi Tiết / Chỉnh Sửa
    {
      name: "",
      options: {
        filter: true,
        sort: false,
        empty: true,
        print: false,
        disableColumnMenu: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {maTrangThai == 1 ? (
                <></>
              ) : tableMeta.rowData[7] == 0 ? (
                <></>
              ) : (
                <>
                  <MuiToolTip
                    title={maTrangThai < 3 ? "Chấm điểm" : "Xem chi tiết"}
                  >
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() =>
                        navigate(
                          `/chitietcuocthi/truyenthong/${params.idCuocThi}/chitietchuongtrinh/${tableMeta.rowData[0]}/chamdiem`
                        )
                      }
                    >
                      {maTrangThai < 3 ? (
                        <HistoryEdu className="icon-hover" />
                      ) : (
                        <Visibility className="icon-hover" />
                      )}
                    </IconButton>
                  </MuiToolTip>
                </>
              )}
            </>
          );
        },
      },
    },
    {
      name: "CoTheCham",
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
  ];

  const optionsChuongTrinh = {
    search: true,
    searchPlaceholder: "Tên Chương Trình, Địa Điểm, Ngày Tổ Chức,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "470px",
    tableBodyMaxHeight: "1200px",
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

      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);

      const fileName = `DanhSachChuongTrinh`;
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

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
      document.title = "Chi Tiết Cuộc Thi";
    }, 300);
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
            <div id="chinhsuachuongtrinhtudo">
              <Breadcrumb href="#" tabIndex="-1">
                <Breadcrumb.Item>
                  <Link to="/userhome" className="link">
                    Home
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#" tabIndex="-1">
                  <Link to="/giamkhaocuocthi" className="link">
                    Giám Khảo Cuộc Thi
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Chi Tiết Cuộc Thi</Breadcrumb.Item>
              </Breadcrumb>

              {/* Chi Tiết Cuộc Thi */}
              <div className="newContest text-start">
                {/* Chi Tiết Cuộc Thi */}
                <div>
                  <h2 className="text-center d-flex align-items-center justify-content-center pb-3">
                    <MusicNote style={{ fontSize: "2.6rem" }} />
                    Chi Tiết Cuộc Thi
                    <MusicNote style={{ fontSize: "2.6rem" }} />
                  </h2>
                  <div className="mb-4">
                    <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Tên Cuộc Thi:&nbsp;
                      <span style={{ fontWeight: "400" }}>{tenCuocThi}.</span>
                      &nbsp;Hình Thức Cuộc Thi:&nbsp;
                      <span style={{ fontWeight: "400" }}>
                        Chương trình truyền thống.
                      </span>
                    </p>

                    <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Địa Điểm Tổ Chức:&nbsp;
                      <span style={{ fontWeight: "400" }}>
                        {diaDiemToChuc}.&nbsp;
                      </span>
                      Thời gian diễn ra: &nbsp;
                      <span style={{ fontWeight: "400" }}>
                        Từ {ngayBatDau} - {ngayKetThuc}.
                      </span>
                    </p>

                    <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Trạng Thái:{" "}
                      <span style={{ fontWeight: "400" }}>
                        &nbsp;{trangThai}.{" "}
                      </span>
                    </p>
                    <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Số Vòng Thi:{" "}
                      <span style={{ fontWeight: "400" }}>&nbsp;1 Vòng.</span>
                      &nbsp;Thang Điểm:{" "}
                      <span style={{ fontWeight: "400" }}>
                        &nbsp;{thangDiem * 10}.
                      </span>
                    </p>
                    <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Giám Khảo:{" "}
                      <span style={{ fontWeight: "400" }}>
                        &nbsp;{giamKhao}.{" "}
                      </span>
                    </p>
                    <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Nội Dung Cuộc Thi:&nbsp;
                    </p>
                    <div
                      style={{ paddingLeft: "15px" }}
                      dangerouslySetInnerHTML={{ __html: noiDungCuocThi }}
                    ></div>
                  </div>

                  <hr />

                  <div>
                    <h2 className="text-center d-flex align-items-center justify-content-center pt-3">
                      <MusicNote style={{ fontSize: "2.6rem" }} /> Chương Trình
                      Dự Thi
                      <MusicNote style={{ fontSize: "2.6rem" }} />
                    </h2>
                  </div>
                  <div className="mt-4">
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
                            setDataChuongTrinh(dataNguyenBan);
                            setBatDau(null);
                            setKetThuc(null);
                          }}
                        >
                          Clear
                        </Button>
                      </Col>
                    </Row>
                    <MuiDatatable
                      title={"Danh Sách Chương Trình Dự Thi"}
                      data={dataChuongTrinh}
                      columns={columnsChuongTrinh}
                      options={optionsChuongTrinh}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Container>
      <Footer />
    </div>
  );
}
