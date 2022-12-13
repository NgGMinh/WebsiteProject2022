/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Topbar.css";
import { Menu } from "@mui/icons-material";
import { Button, Modal, Dropdown, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export default function TopBar() {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowSidebar = () => {
    document.getElementById("nav-bar").classList.toggle("shows");
    document.getElementById("body-pd").classList.toggle("body-pd");
    document.getElementById("header").classList.toggle("body-pd");
    document.getElementById("header-title").classList.toggle("pl-n");
  };

  const handleBlurBG = () => {
    document.getElementById("header").classList.toggle("blur-bg");
    document.getElementById("container-bg").classList.toggle("blur-bg");
    document.getElementById("footer").classList.toggle("blur-bg");
  };

  const logout = () => {
    localStorage.clear();
  };
  const signinName = localStorage.getItem("tennguoidung");
  const name = signinName.substring(signinName.lastIndexOf(" ") + 1);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 100);
  }, []);

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

  const [isTabletSize, setIsTabletSize] = useState(false);
  useEffect(() => {
    if (width >= 592 && width <= 768) setIsTabletSize(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="header body-pd" id="header" style={{ zIndex: "999" }}>
        <div className="header_toggle pl-n" id="header-title">
          <div className="display-mb">
            {isTabletSize ? (
              <></>
            ) : (
              <Menu
                className="header_toggle display-mb"
                id="header-toggle"
                onClick={() => {
                  handleShowSidebar();
                  handleBlurBG();
                }}
                style={{ color: "#0087f7", marginTop: "6px" }}
              />
            )}
            <div
              style={{
                fontSize: isTabletSize ? "1.5rem" : "1.3rem",
                transition: "all 0.25s",
                color: "#0087f7",
                fontWeight: "500",
              }}
            >
              {load ? (
                <></>
              ) : (
                <>
                  &nbsp;
                  <img src={logo} alt="logo" style={{ width: "32px" }} />
                  &nbsp;Đại Học Cần Thơ
                </>
              )}
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div
              className="display-nmb text-primary"
              style={{
                fontSize: "1.8rem",
                transition: "all 0.25s",
                color: "#0087f7",
                fontWeight: "500",
              }}
            >
              {load ? (
                <></>
              ) : (
                <>
                  <img src={logo} alt="logo" style={{ width: "10%" }} />
                  &nbsp;Đại Học Cần Thơ
                </>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: "82px",
            fontSize: "1rem",
            fontWeight: "500",
          }}
          className="display-nmb"
        >
          {signinName}
        </div>
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            className="dropdown-avt"
            style={{ boxShadow: "none", background: "none" }}
          >
            <div className="header_img">
              <p className="text-white display-letter-img">
                {name?.charAt(0)?.toUpperCase()}
              </p>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {localStorage.getItem("chucvu") == 1 ? (
              <>
                <Dropdown.Item href="/thongtintaikhoan" tabIndex="-1">
                  <Link
                    to="/thongtintaikhoan"
                    className="text-decoration-none text-black"
                  >
                    Thông Tin Cá Nhân
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="/doimatkhau" tabIndex="-1">
                  <Link
                    to="/doimatkhau"
                    className="text-decoration-none text-black"
                  >
                    Đổi Mật Khẩu
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
              </>
            ) : (
              <></>
            )}

            <Dropdown.Item href="/" tabIndex="-1" onClick={logout}>
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Modal Đổi Mật Khẩu */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="px-4">
          <Modal.Title className="ms-auto">Đổi Mật Khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="py-2">
            <Form.Group>
              <Form.Label>Mật Khẩu Cũ</Form.Label>
              <Form.Control placeholder="Nhập mật khẩu cũ..." />
            </Form.Group>
          </Row>
          <Row className="py-2">
            <Form.Group>
              <Form.Label>Mật Khẩu Mới</Form.Label>
              <Form.Control placeholder="Nhập mật khẩu mới..." />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary">Đổi Mật Khẩu</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
