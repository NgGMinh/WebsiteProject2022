/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { Button, Divider } from "@mui/material";
import React, { useState } from "react";
import {
  Breadcrumb,
  Col,
  Form,
  Row,
  Card,
  Container,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";
import image from "../../img/profile.webp";
import { ArrowBack, MusicNote, Save } from "@mui/icons-material";
import TopBar from "../../components/topbars/TopBar";
import Sidebar from "../../clientComponent/Siderbar/Sidebar";
import Footer from "../../components/footer/Footer";
import Select from "react-select";

export default function ThongTinTaiKhoanClient() {
  const navigate = useNavigate();
  // const [tenChuyenMon, setTenChuyenMon] = React.useState([]);
  const [taiKhoan, setTaiKhoan] = useState("");
  const [maDinhDanh, setMaDinhDanh] = useState();
  const [hoten, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [chucvu, setChucVu] = useState(1);
  const [gioiTinh, setGioiTinh] = useState(1);
  const [maLop, setMaLop] = useState();
  const [donVi, setDonVi] = useState();
  const [emailErr, setEmailErr] = useState("");

  const [hotenErr, setHoTenErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const [dataDonVi, setDataDonVi] = useState([]);
  const [refresh, setRefresh] = useState(-1);

  const dataGioiTinh = [
    { value: 1, label: "Nam" },
    { value: 2, label: "Nữ" },
  ];

  const handleChangChucVu = (event) => {
    setChucVu(event.target.value);
  };

  const handleEmailCheck = (event) => {
    const value = event.target.value;

    setTimeout(() => {
      setEmail(value);
      let btcq_email =
        // eslint-disable-next-line no-useless-escape
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})/;

      if (!btcq_email.test(value)) {
        setEmailErr("Email không hợp lệ");
      } else {
        setEmailErr("");
      }

      if (event.target.value == "") setEmailErr("");
    }, 300);
  };

  const handlePhoneCheck = (event) => {
    const value = event.target.value;
    let phoneno = /^\d{10}$/;

    if (!phoneno.test(value)) {
      setPhoneErr("Số điện thoại không hợp lệ.");
    } else {
      setPhoneErr("");
    }
  };

  const handleUpdateThongTinCaNhan = () => {
    if (hotenErr == "" && emailErr == "" && phoneErr == "") {
      if (localStorage.getItem("chucvu") == 2) {
        Axios.post(
          `http://localhost:3001/api/admin/thongtincanhan/nguoidung/${localStorage.getItem(
            "MaNguoiDung"
          )}`,
          {
            HoTen: hoten,
            MaDinhDanh: maDinhDanh,
            GioiTinh: gioiTinh.value,
            Email: email,
            Phone: phone,
          }
        ).then((response) => {
          setTimeout(() => {
            alert("Chỉnh sửa Thành Công !");
          }, 400);
          setRefresh(Math.random());
        });
      } else {
        Axios.post(
          `http://localhost:3001/api/admin/thongtincanhan/truongnhomthisinh/${localStorage.getItem(
            "MaNguoiDung"
          )}`,
          {
            HoTen: hoten,
            MaDinhDanh: maDinhDanh,
            GioiTinh: gioiTinh.value,
            Email: email,
            Phone: phone,
            MaLop: maLop,
            MaDonVi: donVi.value,
          }
        ).then((response) => {
          setTimeout(() => {
            alert("Chỉnh sửa thông tin Thành Công !");
          }, 400);
          setRefresh(Math.random());
        });
      }
    }
  };

  useEffect(() => {
    const getDetailNguoiDung = async () => {
      if (localStorage.getItem("chucvu") == 2) {
        const { data } = await Axios.post(
          `http://localhost:3001/api/client/giamkhaodetail/${localStorage.getItem(
            "MaNguoiDung"
          )}`
        );
        setTaiKhoan(data[0].TaiKhoan);
        setHoTen(data[0].HoTenNguoiDung);
        setGioiTinh({
          value: data[0].GioiTinh,
          label: data[0].GioiTinh == 1 ? "Nam" : "Nữ",
        });
        setEmail(data[0].Email);
        setPhone(data[0].Phone);
        setChucVu(data[0].MaChucVu);
      } else {
        const { data } = await Axios.post(
          `http://localhost:3001/api/client/truongnhomdetail/${localStorage.getItem(
            "MaNguoiDung"
          )}`
        );
        setTaiKhoan(data[0].TaiKhoan);
        setHoTen(data[0].HoTenNguoiDung);
        setGioiTinh({
          value: data[0].GioiTinh,
          label: data[0].GioiTinh == 1 ? "Nam" : "Nữ",
        });
        setEmail(data[0].Email);
        setPhone(data[0].Phone);
        setChucVu(data[0].MaChucVu);
        setMaLop(data[0].MaLop);
        setDonVi({ value: data[0].MaDonVi, label: data[0].TenDonVi });
      }
    };
    getDetailNguoiDung();

    const getDataDonVi = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/donvitochuc"
      );
      let arr = [];
      data.forEach((d) => {
        arr.push({ value: d.MaDonVi, label: d.TenDonVi });
      });
      setDataDonVi(arr);
    };
    getDataDonVi();
  }, [refresh]);

  useEffect(() => {
    document.getElementById("thongtintaikhoan").classList.add("actives");
  }, []);

  const [load, setLoad] = useState(true);
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
          <Container
            fluid
            style={{ paddingTop: "13px", minHeight: "593px" }}
            id="container-bg"
          >
            {load ? (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Spinner
                  animation="border"
                  variant="primary"
                  id="spinner"
                  style={{
                    position: "absolute",
                    top: "31%",
                    left: "49%",
                    width: "50px",
                    height: "50px",
                  }}
                />
              </div>
            ) : (
              <>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to="/home" className="link">
                      Home
                    </Link>
                  </Breadcrumb.Item>

                  <Breadcrumb.Item active>Thông Tin Tài Khoản</Breadcrumb.Item>
                </Breadcrumb>
                <div className="newPerformance text-start mb-5">
                  <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
                    <MusicNote style={{ fontSize: "2.6rem" }} />
                    Thông Tin Tài Khoản
                    <MusicNote style={{ fontSize: "2.6rem" }} />
                  </h2>{" "}
                  <Row style={{ fontWeight: "500" }}>
                    <Col md="5" className="pt-0">
                      <img
                        src={image}
                        alt=""
                        style={{ objectFit: "contain", width: "100%" }}
                      />
                    </Col>
                    <Col md="7">
                      <Row className="pt-1 pb-3 px-2">
                        <Col xs="12" md="7">
                          <Form.Group className="pb-2">
                            <Form.Label>Tên Tài Khoản</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập Username"
                              defaultValue={taiKhoan}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col xs="12" md="5">
                          <Form.Group className="pb-2">
                            <Form.Label>Chức Vụ</Form.Label>

                            <Form.Control
                              type="text"
                              value={
                                localStorage.getItem("chucvu") == 2
                                  ? "Giám khảo"
                                  : localStorage.getItem("chucvu") == 3
                                  ? "Nhóm trưởng"
                                  : "Thí sinh tự do"
                              }
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Divider />

                        <Col xs="12" md="7">
                          <Form.Group className="py-2">
                            <Form.Label>Họ Tên</Form.Label>

                            <Form.Control
                              type="text"
                              placeholder="Nhập Họ Tên..."
                              defaultValue={hoten}
                              onChange={(e) => {
                                if (e.target.value.length > 0) setHoTenErr("");
                              }}
                              onBlur={(e) => {
                                if (e.target.value == "")
                                  setHoTenErr("Họ tên không được để trống.");
                                else {
                                  setHoTenErr("");
                                }
                                setHoTen(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs="12" md="5">
                          <Form.Group className="py-2">
                            <Form.Label>Giới Tính</Form.Label>

                            <Select
                              options={dataGioiTinh}
                              value={gioiTinh}
                              id="gioitinh"
                              onChange={setGioiTinh}
                              className="zIndex-997"
                            />
                          </Form.Group>
                        </Col>
                        <Divider />

                        <Col
                          xs="12"
                          md={localStorage.getItem("chucvu") == 2 ? "12" : "7"}
                        >
                          <Form.Group className="py-2">
                            <Form.Label>Email</Form.Label>

                            <Form.Control
                              type="email"
                              placeholder="Nhập Email..."
                              defaultValue={email}
                              onChange={(e) => handleEmailCheck(e)}
                              onBlur={(e) => {
                                if (e.target.value == "")
                                  setEmailErr("Email không được để trống.");
                                else {
                                  setEmailErr("");
                                }
                              }}
                            />
                            <Form.Text className="text-danger">
                              {emailErr}
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col
                          xs="12"
                          md={localStorage.getItem("chucvu") == 2 ? "12" : "5"}
                        >
                          <Form.Group className="py-2">
                            <Form.Label>Phone</Form.Label>

                            <Form.Control
                              placeholder="Nhập Số Điện Thoại..."
                              onChange={(e) => handlePhoneCheck(e)}
                              defaultValue={phone}
                              onBlur={(e) => {
                                if (e.target.value == "")
                                  setPhoneErr(
                                    "Số điện thoại không được để trống."
                                  );
                                else {
                                  setPhoneErr("");
                                }
                                setPhone(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Divider />

                        {localStorage.getItem("chucvu") == 2 ? (
                          <></>
                        ) : (
                          <>
                            <Col xs="12" md="12">
                              <Form.Group className="py-2">
                                <Form.Label>Mã Lớp</Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={maLop}
                                  onBlur={(e) => setMaLop(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                  {/* <b style={{ color: "red" }}>{pricePerformanceMess}</b> */}
                                </Form.Text>
                              </Form.Group>
                            </Col>
                            <Col xs="12" md="12">
                              <Form.Group className="py-2">
                                <Form.Label>Thuộc Đơn Vị</Form.Label>
                                <Select
                                  options={dataDonVi}
                                  value={donVi}
                                  id="donvi"
                                  onChange={setDonVi}
                                  className="zIndex-998"
                                />
                                <Form.Text className="text-muted">
                                  {/* <b style={{ color: "red" }}>{pricePerformanceMess}</b> */}
                                </Form.Text>
                              </Form.Group>
                            </Col>
                          </>
                        )}
                      </Row>
                      <Row className="px-2">
                        <Col xs="12" md="6" className="text-center my-2">
                          <Button
                            variant="contained"
                            style={{ width: "100%", padding: "7px 0px" }}
                            startIcon={<Save />}
                            onClick={handleUpdateThongTinCaNhan}
                          >
                            Save
                          </Button>
                        </Col>
                        <Col xs="12" md="6" className="text-center my-2">
                          <Button
                            variant="contained"
                            color="error"
                            style={{ width: "100%", padding: "7px 0px" }}
                            startIcon={<ArrowBack />}
                            onClick={() => navigate("/userhome")}
                          >
                            Back
                          </Button>
                        </Col>
                      </Row>
                    </Col>
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
