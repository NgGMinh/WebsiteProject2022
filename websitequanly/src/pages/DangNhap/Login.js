import React from "react";
import "./Login.css";
import Axios from "axios";
import { useState } from "react";
import { AccountCircle, Person, Lock } from "@mui/icons-material";
import { Button, Container, Form, Row } from "react-bootstrap";
import logo from "../../img/Logo-login.png";

export default function Login() {
  const [loginmes, setLoginmes] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassWord] = useState("");
  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/api/admin/adminlogin", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      if (response.data.isLogin) {
        localStorage.setItem("login", true);
        localStorage.setItem(
          "tennguoidung",
          response.data.info[0].HoTenNguoiDung
        );
        localStorage.setItem("MaNguoiDung", response.data.info[0].MaNguoiDung);
        localStorage.setItem("chucvu", response.data.info[0].MaChucVu);
        localStorage.setItem("newChuongTrinh", -1);
        if (response.data.info[0].MaChucVu == 1)
          document.getElementById("home-tag").click();
        else document.getElementById("userhome-tag").click();
        setLoginmes("");
      } else {
        localStorage.setItem("login", false);
        setLoginmes(response.data.message);
      }
    });
  };

  return (
    <>
      <Container fluid className="body-bg" id="loginForm">
        <Container>
          <div className="form-box">
            <div className="header-form">
              {/* <AccountCircle style={{ fontSize: "110px" }} /> */}
              <img
                src={logo}
                alt="logo-ctu"
                style={{ width: "180px", padding: "0px", marginBottom: "-5px" }}
              />
            </div>
            <div className="body-form">
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Form.Label style={{ color: "white" }}>
                  {" "}
                  <Person /> Tài Khoản
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tài khoản..."
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      login();
                    }
                  }}
                  style={{ color: "black" }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Form.Label style={{ color: "white" }}>
                  {" "}
                  <Lock /> Mật Khẩu
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  value={password}
                  onChange={(e) => {
                    setPassWord(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      login();
                    }
                  }}
                />
                <div className="message">
                  <Form.Text className="text-muted pt-1">
                    <b style={{ color: "red" }}>{loginmes}</b>
                  </Form.Text>
                </div>
              </Form.Group>

              <Row
                style={{ paddingLeft: "11px", paddingRight: "11px" }}
                className="pt-2"
              >
                <Button variant="secondary" type="button" onClick={login}>
                  <b style={{ color: "white" }}>Login</b>
                </Button>
              </Row>
            </div>
            <a
              href="/home"
              tabIndex="-1"
              id="home-tag"
              style={{ display: "none" }}
            >
              Home
            </a>
            <a
              href="/userhome"
              tabIndex="-1"
              id="userhome-tag"
              style={{ display: "none" }}
            >
              userhome
            </a>
          </div>
        </Container>
      </Container>
    </>
  );
}
