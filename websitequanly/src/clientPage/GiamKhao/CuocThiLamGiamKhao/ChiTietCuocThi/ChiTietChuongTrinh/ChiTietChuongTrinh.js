/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Form, Row, Breadcrumb, Container, Spinner } from "react-bootstrap";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Done, MusicNote } from "@mui/icons-material";
import MuiDatatable from "../../../../../components/table/MuiDatatable";
import { IconButton, Tooltip as MuiToolTip } from "@mui/material";
import TopBar from "../../../../../components/topbars/TopBar";
import Sidebar from "../../../../../clientComponent/Siderbar/Sidebar";
import Footer from "../../../../../components/footer/Footer";

export default function ChiTietChuongTrinh() {
  const navigate = useNavigate();
  const params = useParams();
  const dayjs = require("dayjs");

  const [dataTietMuc, setDataTietMuc] = useState([]);

  const [tenCuocThi, setTenCuocThi] = useState("");

  const [tenChuongTrinh, setTenChuongTrinh] = useState("");
  const [ngayGioToChuc, setNgayGioToChuc] = useState("");
  const [diaDiemToChuc, setDiaDiemToChuc] = useState("");
  const [tenDoanDoi, setTenDoanDoi] = useState("");

  const [donViToChuc, setDonViToChuc] = useState();
  const [noiDungChuongTrinh, setNoiDungChuongTrinh] = useState("");

  const [diem, setDiem] = useState();
  const [refresh, setRefresh] = useState([]);
  const [congBoKQ, setCongBoKB] = useState();

  const handleChangeDiem = (idTM) => {
    Axios.post(
      "http://localhost:3001/api/client/updatediemtietmucchuongtrinh",
      {
        idCuocThi: params.idCuocThi,
        idChuongTrinh: params.idChuongTrinh,
        idTietMuc: idTM,
        idGiamKhao: localStorage.getItem("MaNguoiDung"),
        DiemSo: diem,
      }
    ).then((response) => {
      setDiem();
      setRefresh(Math.random());
      setTimeout(() => {
        alert("Chấm điểm thành công!");
      },400);
    });
  };

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
      setCongBoKB(data[0].CongBoKetQua);
    };
    getDataChiTietCT();
  }, []);

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

  useEffect(() => {
    const getDataTietMucThuocChuongTrinh = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/alltietmuchuongtrinh/${
          params.idCuocThi
        }/chuongtrinh/${params.idChuongTrinh}/giamkhao/${localStorage.getItem(
          "MaNguoiDung"
        )}`
      );
      setDataTietMuc(data);
    };
    getDataTietMucThuocChuongTrinh();
  }, [refresh]);

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
          return <div style={{ paddingLeft: "35px" }}>{value}</div>;
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>STT</div>;
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
        filter: false,
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
      },
    },
    {
      name: "DiemTrungBinh",
      label: "Điểm TB",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "220px" }}>
              {value == null ? "..." : value}
            </div>
          );
        },
      },
    },
    {
      name: "DiemSo",
      label: "Điểm Chấm",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {congBoKQ == 1 ? (
                <div>{value}</div>
              ) : (
                <div style={{ display: "flex", width: "120px" }}>
                  <Form>
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max={tableMeta.rowData[7] * 10}
                      defaultValue={value}
                      onChange={(e) => {
                        setDiem(e.target.value);
                        setTimeout(() => {
                          document.getElementById(
                            `button-save-${tableMeta.rowData[0]}`
                          ).style.display = "flex";
                        }, 100);
                      }}
                      id={`form-${tableMeta.rowData[0]}`}
                      onFocus={() => {
                        document.getElementById(
                          `button-save-${tableMeta.rowData[0]}`
                        ).style.display = "flex";
                        setDiem(value);
                      }}
                      onBlur={() => {
                        if (
                          document.getElementById(
                            `form-${tableMeta.rowData[0]}`
                          ).value == "" ||
                          diem == value
                        ) {
                          document.getElementById(
                            `button-save-${tableMeta.rowData[0]}`
                          ).style.display = "none";
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          // eslint-disable-next-line eqeqeq
                          if (
                            diem < 0 ||
                            diem > tableMeta.rowData[7] * 10 ||
                            diem == null ||
                            diem == undefined ||
                            diem == ""
                          ) {
                            if (diem < 0) alert(`Điểm không được nhỏ hơn 0 !`);
                            if (diem == null || diem == undefined || diem == "")
                              alert(`Điểm không hợp lệ !`);
                            if (diem > tableMeta.rowData[7] * 10)
                              alert(
                                `Điểm không hợp lệ! Thang điểm tối đa là: ${
                                  tableMeta.rowData[7] * 10
                                }`
                              );
                            e.preventDefault();
                          } else {
                            handleChangeDiem(tableMeta.rowData[0]);
                            document.getElementById(
                              `button-save-${tableMeta.rowData[0]}`
                            ).style.display = "none";
                            e.preventDefault();
                          }
                        }
                      }}
                      style={{ textAlign: "center", width: "90px" }}
                    />
                  </Form>
                  &nbsp;&nbsp;
                  <MuiToolTip title="Save">
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      id={`button-save-${tableMeta.rowData[0]}`}
                      style={{ display: "none" }}
                      onClick={(e) => {
                        if (diem < 0 || diem > tableMeta.rowData[8] * 10) {
                          if (diem < 0) alert(`Điểm không được nhỏ hơn 0 !`);

                          if (diem > tableMeta.rowData[7] * 10)
                            alert(
                              `Điểm không hợp lệ! Thang điểm tối đa là: ${
                                tableMeta.rowData[7] * 10
                              }`
                            );
                          e.preventDefault();
                        } else {
                          handleChangeDiem(tableMeta.rowData[0]);
                          document.getElementById(
                            `button-save-${tableMeta.rowData[0]}`
                          ).style.display = "none";
                          e.preventDefault();
                        }
                      }}
                    >
                      <Done color="success" />
                    </IconButton>
                  </MuiToolTip>
                </div>
              )}
            </>
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
    selectableRows: "none",
    rowsPerPageOptions: [10, 50, 100],
    rowsPerPage: 10,
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
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
      document.title = "Chi Tiết Chương Trình";
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
                      to={`/chitietcuocthi/truyenthong/${params.idCuocThi}`}
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
                  {/* Bảng Tiết Mục */}
                  <Row style={{ padding: "0px 12px" }}>
                    <MuiDatatable
                      title="Tiết Mục Văn Nghệ"
                      data={dataTietMuc}
                      columns={columnsTietMuc}
                      options={optionsTietMuc}
                    />
                  </Row>
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
