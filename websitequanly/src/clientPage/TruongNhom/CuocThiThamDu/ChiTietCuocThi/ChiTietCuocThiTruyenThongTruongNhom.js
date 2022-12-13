/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Container, Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MusicNote, Visibility } from "@mui/icons-material";
import TopBar from "../../../../components/topbars/TopBar";
import Sidebar from "../../../../clientComponent/Siderbar/Sidebar";
import Footer from "../../../../components/footer/Footer";
import { IconButton } from "@mui/material";
import MuiDatatable from "../../../../components/table/MuiDatatable";

export default function ChiTietCuocThiTruyenThongTruongNhom() {
  const params = useParams();
  const navigate = useNavigate();

  const dayjs = require("dayjs");

  const [tenCuocThi, setTenCuocThi] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [hinhThuc, setHinhThuc] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [trangThai, setTrangThai] = useState();
  // eslint-disable-next-line no-unused-vars
  const [phanThi, setPhanThi] = useState(1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [soVongThi, setSoVongThi] = useState(1);
  const [thangDiem, setThangDiem] = useState(1);
  const [noiDungCuocThi, setNoiDungCuocThi] = useState("");
  const [diaDiemToChuc, setDiaDiemToChuc] = useState(5);

  // eslint-disable-next-line no-unused-vars
  const [refresh, setRefresh] = useState(-1);
  // eslint-disable-next-line no-unused-vars
  const [dataChuongTrinh, setDataChuongTrinh] = useState([]);
  const [dataChuongTrinhCuThe, setDataChuongTrinhCuThe] = useState([]);

  const [dataTietMuc, setDataTietMuc] = useState([]);
  const [tenDoanDoi, setTenDoanDoi] = useState("");
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
    const getDataGiamKhao = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/giamkhaocuocthi/${params.idCuocThi}`
      );
      setDataGiamKhao(data);
    };
    getDataGiamKhao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getDataChiTietCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
      );
      data.forEach((d) => {
        if (d.SoVongThi == 1) d.SoVongThi = "1 Vòng";
        if (d.SoVongThi == 2) d.SoVongThi = "2 Vòng (Sơ khảo - Chung kết)";
        if (d.SoVongThi == 3)
          d.SoVongThi = "3 Vòng (Sơ khảo - Chung khảo - Chung kết)";
      });

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
    };
    getDataChiTietCuocThi();
  }, []);

  useEffect(() => {
    // const getDataChuongTrinh = async () => {
    //   const { data } = await Axios.post(
    //     `http://localhost:3001/api/client/allchuongtrinhcuocthitruyenthong/${
    //       params.idCuocThi
    //     }/giamkhao/${localStorage.getItem("MaNguoiDung")}`
    //   );
    //   setDataChuongTrinh(data);
    // };
    // getDataChuongTrinh();

    const getDataChuongTrinhCuThe = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/cuocthi/${
          params.idCuocThi
        }/truongnhom/${localStorage.getItem("MaNguoiDung")}/chuongtrinhduthi`
      );
      let result = data;
      data.forEach((d) => {
        d.NgayGioThucHien =
          d.NgayGioThucHien == null
            ? "Chưa sắp lịch"
            : dayjs(d.NgayGioThucHien).format("HH:mm, DD/MM/YYYY");
        if (d.CongBoKetQua == 0) {
          d.DiemTrungBinh = "CCB";
          d.TenGiaiThuong = "CCB";
        }
      });
      setDataChuongTrinhCuThe(data);

      const getDataChiTietCT = async () => {
        const { data } = await Axios.post(
          `http://localhost:3001/api/admin/chitietchuongtrinh/${result[0].MaChuongTrinh}`
        );
        setTenDoanDoi(data[0].TenDoanDoi);
      };
      getDataChiTietCT();

      const getDataTietMucThuocChuongTrinh = async () => {
        const { data } = await Axios.post(
          `http://localhost:3001/api/client//alltietmucduthi/chuongtrinh/${
            result[0].MaChuongTrinh
          }/${localStorage.getItem("MaNguoiDung")}`
        );
        data.forEach((d) => {
          if (d.DiemTrungBinh == null) d.DiemTrungBinh = "Chưa chấm";
        });
        setDataTietMuc(data);
      };
      getDataTietMucThuocChuongTrinh();
    };
    getDataChuongTrinhCuThe();
  }, []);

  const columnsChuongTrinhCuThe = [
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

    //Tên Chương Trình
    {
      name: "TenChuongTrinh",
      label: "Tên Chương Trình",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "380px", paddingLeft: "25px" }}>
              {value}
            </div>
          );
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>Tên Chương Trình</div>;
        },
      },
    },
    //Ngày Giờ Tổ Chức
    {
      name: "NgayGioToChuc",
      label: "Ngày Giờ Tổ Chức",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "220px" }}>
              {value == null
                ? "Chưa sắp lịch"
                : dayjs(value).format("HH:mm, DD/MM/YYYY")}
            </div>
          );
        },
      },
    },
    //Thuộc Khoa
    {
      name: "TenDonVi",
      label: "Đơn vị Tổ chức",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "200px" }}>{value}</div>;
        },
      },
    },

    {
      name: "DiemTrungBinh",
      label: "Điểm Thi",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {value == "CCB" ? (
                <div style={{ fontWeight: "600" }}>
                  <strong>{value}</strong>
                </div>
              ) : (
                <div
                  style={{
                    fontWeight: "600",
                    width: "65px",
                    textAlign: "center",
                  }}
                >
                  <strong>{value}</strong>
                </div>
              )}
            </>
          );
        },
      },
    },
    {
      name: "TenGiaiThuong",
      label: "Giải Thưởng",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {value == "CCB" ? (
                <div style={{ fontWeight: "600" }}>
                  <strong>{value}</strong>
                </div>
              ) : value == "Không có giải" ? (
                <div>
                  <strong>{value}</strong>
                </div>
              ) : (
                <div className="text-success">
                  <strong>{value}</strong>
                </div>
              )}
            </>
          );
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
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>
                  <strong>Xem Chi Tiết</strong>
                </Tooltip>
              }
            >
              <IconButton edge="end" aria-label="edit">
                <Visibility
                  className="icon-hover"
                  onClick={() =>
                    navigate(
                      `/chitietcuocthi/truyenthong/${
                        params.idCuocThi
                      }/chitietchuongtrinh/${
                        tableMeta.rowData[0]
                      }/${localStorage.getItem("MaNguoiDung")}`
                    )
                  }
                />
              </IconButton>
            </OverlayTrigger>
          );
        },
      },
    },
  ];

  const optionsChuongTrinhCuThe = {
    search: false,
    searchPlaceholder: "Tên Chương Trình, Địa Điểm, Ngày Tổ Chức,...",
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "1200px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "none",
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
      name: "MaTietMuc",
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
          return <div style={{ paddingLeft: "25px" }}>{value}</div>;
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "15px" }}>STT</div>;
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
      },
    },
    {
      name: "TenLoaiTietMuc",
      label: "Loại Tiết Mục",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "NhanSo",
      label: "Nhân Số",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ width: "65px", textAlign: "center" }}>{value}</div>
          );
        },
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
              {value == "Chưa chấm" ? (
                <div>
                  <strong>{value}</strong>
                </div>
              ) : (
                <div
                  style={{
                    width: "65px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
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
    searchPlaceholder: "Tên Tiết mục, loại tiết mục,...",
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
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

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
      document.title = "Chi Tiết Cuộc Thi";
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
              style={{
                position: "relative",
                width: "100%",
                height: "100vh",
              }}
            >
              <Spinner
                animation="border"
                variant="primary"
                id="spinner"
                style={{
                  position: "absolute",
                  top: "38%",
                  left: "49%",
                  width: "50px",
                  height: "50px",
                }}
              />
            </div>
          ) : (
            <div id="chinhsuachuongtrinhtudo">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/userhome" className="link">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/cuocthithamdu" className="link">
                    Cuộc Thi Tham Dự
                  </Link>
                </li>

                <li className="breadcrumb-item active">Chi Tiết Cuộc Thi</li>
              </ol>

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
                    </p>
                    <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Hình Thức Cuộc Thi:&nbsp;
                      <span style={{ fontWeight: "400" }}>
                        Chương trình truyền thống.
                      </span>
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
                      <span style={{ fontWeight: "400" }}>
                        &nbsp;{soVongThi}.
                      </span>
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
                  <div className="my-5">
                    <>
                      <MuiDatatable
                        title={"Thông Tin Chương Trình Dự Thi"}
                        data={dataChuongTrinhCuThe}
                        columns={columnsChuongTrinhCuThe}
                        options={optionsChuongTrinhCuThe}
                      />
                      <br />
                      <MuiDatatable
                        title={tenDoanDoi}
                        data={dataTietMuc}
                        columns={columnsTietMuc}
                        options={optionsTietMuc}
                      />
                    </>
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
