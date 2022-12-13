/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Row, Breadcrumb, Container, Spinner } from "react-bootstrap";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ArrowBack, MusicNote } from "@mui/icons-material";

import TopBar from "../../../../../components/topbars/TopBar";
import Sidebar from "../../../../../clientComponent/Siderbar/Sidebar";
import Footer from "../../../../../components/footer/Footer";
import MuiDatatable from "../../../../../components/table/MuiDatatable";
import { Button } from "@mui/material";

export default function ChiTietChuongTrinhTruongNhom() {
  const navigate = useNavigate();
  const params = useParams();
  const dayjs = require("dayjs");

  const [dataTietMuc, setDataTietMuc] = useState([]);

  const [tenCuocThi, setTenCuocThi] = useState("");

  const [tenChuongTrinh, setTenChuongTrinh] = useState("");
  const [ngayGioToChuc, setNgayGioToChuc] = useState("");
  const [diaDiemToChuc, setDiaDiemToChuc] = useState("");

  const [donViToChuc, setDonViToChuc] = useState();
  const [noiDungChuongTrinh, setNoiDungChuongTrinh] = useState("");
  const [tenDoanDoi, setTenDoanDoi] = useState("");


  // Lấy Thông Tin Đơn vị Tổ chức, Địa Điểm Từ Database
  useEffect(() => {
    const getDataChiTietCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
      );
      setTenCuocThi(data[0].TenCuocThi);
      setDiaDiemToChuc(data[0].TenDiaDiem);
    };
    getDataChiTietCuocThi();
  }, []);

  // Lấy Thông Tin Từ Database
  useEffect(() => {
    const getDataChiTietCT = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chitietchuongtrinh/${params.idChuongTrinh}`
      );

      setTenChuongTrinh(data[0].TenChuongTrinh);
      setDonViToChuc(data[0].TenDonVi);
      setNgayGioToChuc(dayjs(data[0].NgayGioToChuc).format("YYYY-MM-DDTHH:mm"));
      setNoiDungChuongTrinh(data[0].NoiDungChuongTrinh);
      setTenDoanDoi(data[0].TenDoanDoi);
    };
    getDataChiTietCT();
  }, []);
  
  useEffect(() => {
    const getDataTietMucThuocChuongTrinh = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client//alltietmucduthi/chuongtrinh/${
          params.idChuongTrinh
        }/${localStorage.getItem("MaNguoiDung")}`
      );
      data.forEach((d) => {
        if (d.DiemTrungBinh == null) d.DiemTrungBinh = "Chưa chấm";
      });
      setDataTietMuc(data);
    };
    getDataTietMucThuocChuongTrinh();
  }, []);

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
                    <Link to="/giamkhaocuocthi" className="link">
                      Cuộc Thi Văn Nghệ
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#" tabIndex="-1">
                    <Link
                      to={`/chitietcuocthi/truyenthong/${
                        params.idCuocThi
                      }/${localStorage.getItem("MaNguoiDung")}`}
                      className="link"
                    >
                      {tenCuocThi}
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    Chi Tiết Chương Trình
                  </Breadcrumb.Item>
                </Breadcrumb>
                {/* Thêm Chương Trình */}
                <div className="text-start">
                  {/* Thẻ Tên "Thêm Chương Trình" */}
                  <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
                    <MusicNote style={{ fontSize: "2.6rem" }} />
                    Chi Tiết Chương Trình Dự Thi
                    <MusicNote style={{ fontSize: "2.6rem" }} />
                  </h2>
                  <div className="mb-4">
                    <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Tên Chương Trình:&nbsp;
                      <span style={{ fontWeight: "400" }}>
                        {tenChuongTrinh}.
                      </span>
                      &nbsp;Đơn Vị Tổ Chức:&nbsp;
                      <span style={{ fontWeight: "400" }}>{donViToChuc}.</span>
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
                      Thời gian thi: &nbsp;
                      <span style={{ fontWeight: "400" }}>
                        {dayjs(ngayGioToChuc).format("HH:mm, DD/MM/YYYY")}
                      </span>
                    </p>
                    <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Trình Bày:&nbsp;
                      <span style={{ fontWeight: "400" }}>
                        {tenDoanDoi}.&nbsp;
                      </span>
                    </p>
                    <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Nội Dung Chương Trình:&nbsp;
                    </p>
                    <div
                      style={{ paddingLeft: "15px" }}
                      dangerouslySetInnerHTML={{ __html: noiDungChuongTrinh }}
                    ></div>
                  </div>
                  <div>
                    {/* Bảng Tiết Mục */}
                    <Row style={{ padding: "0px 12px" }}>
                      <MuiDatatable
                        title="Danh Sách Tiết Mục Dự Thi"
                        data={dataTietMuc}
                        columns={columnsTietMuc}
                        options={optionsTietMuc}
                      />
                    </Row>
                  </div>
                  <div style={{textAlign: "center", padding: "15px 0px"}}>
                    <Button
                      variant="contained"
                      color="error"
                      style={{ padding: "7px 80px 7px 70px" }}
                      startIcon={<ArrowBack />}
                      onClick={() =>
                        navigate(
                          `/chitietcuocthi/truyenthong/${
                            params.idCuocThi
                          }/${localStorage.getItem("MaNguoiDung")}`
                        )
                      }
                    >
                      Back
                    </Button>
                  </div>
                </div>{" "}
              </>
            )}
          </Container>
        </Container>
        <Footer />
      </div>
    </>
  );
}
