/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { Button } from "@mui/material";
import React, { useState } from "react";
import { Breadcrumb, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";
import image from "../../img/reset-password.webp";
import { ArrowBack, MusicNote, Save } from "@mui/icons-material";

export default function DoiMatKhauQTV() {
  const navigate = useNavigate();
  // const [tenChuyenMon, setTenChuyenMon] = React.useState([]);
  const [matKhau, setMatKhau] = useState("");
  const [nhapLaiMatKhau, setNhapLaiMatKhau] = useState("");
  const [ErrMess, setErrMess] = useState("");
  const [ErrMessMK, setErrMessMK] = useState("");
  const [refresh, setRefresh] = useState(-1);

  const handleUpdateMatKhau = () => {
    if (matKhau == "" || matKhau == undefined || matKhau == null) {
      setErrMessMK("Chưa nhập mật khẩu mới.");
    } else if (matKhau.length < 8) {
      setErrMessMK("Mật khẩu phải có ít nhất 8 ký tự.");
    } else if (nhapLaiMatKhau.length <= 0) {
      setErrMess("Xin hãy nhập lại mật khẩu để kiểm tra.");
    } else if (ErrMess == "" && ErrMessMK == "") {
      Axios.post(
        `http://localhost:3001/api/admin/changematkhau/${localStorage.getItem(
          "MaNguoiDung"
        )}`,
        {
          MatKhau: matKhau,
        }
      ).then((response) => {
        setLoad(true);
        setMatKhau("");
        setNhapLaiMatKhau("");
        setRefresh(Math.random());
        setTimeout(() => {
          alert("Đổi mật khẩu thành công !");
        }, 400);
      });
    }
  };

  const [load, setLoad] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 300);
  }, [refresh]);

  return (
    <>
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

            <Breadcrumb.Item active>Đổi Mật Khẩu</Breadcrumb.Item>
          </Breadcrumb>
          <div className="newPerformance text-start">
            <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
              <MusicNote style={{ fontSize: "2.6rem" }} />
              Đổi Mật Khẩu
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
              <Col md="7" className="pt-5">
                <Row className="pt-4 pb-4 px-2">
                  <Form.Group className="pb-2">
                    <Form.Label>Mật Khẩu Mới</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Nhập Mật Khẩu Mới..."
                      defaultValue={matKhau}
                      onChange={(e) => {
                        setMatKhau(e.target.value);
                        setErrMessMK("");
                      }}
                    />
                    <Form.Text
                      className="text-danger"
                      style={{ fontWeight: "500" }}
                    >
                      {ErrMessMK}
                    </Form.Text>{" "}
                  </Form.Group>
                  <Form.Group className="py-2">
                    <Form.Label>Nhập Lại Mật Khẩu</Form.Label>

                    <Form.Control
                      type="password"
                      placeholder="Nhập Lại Mật Khẩu..."
                      defaultValue={nhapLaiMatKhau}
                      onChange={(e) => {
                        setNhapLaiMatKhau(e.target.value);
                        setTimeout(() => {
                          if (e.target.value != matKhau)
                            setErrMess("Mật khẩu nhập lại không trùng khớp.");
                          else if (e.target.value == matKhau) {
                            setErrMess("");
                          }
                        }, 200);
                      }}
                    />
                    <Form.Text
                      className="text-danger"
                      style={{ fontWeight: "500" }}
                    >
                      {ErrMess}
                    </Form.Text>
                  </Form.Group>
                </Row>
                <Row className="px-2">
                  <Col xs="12" md="6" className="text-center my-2">
                    <Button
                      variant="contained"
                      style={{ width: "100%", padding: "7px 0px" }}
                      startIcon={<Save />}
                      onClick={handleUpdateMatKhau}
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
    </>
  );
}
