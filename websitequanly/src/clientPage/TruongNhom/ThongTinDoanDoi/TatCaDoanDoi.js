/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Row, Breadcrumb, Container, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Add, MusicNote, Visibility } from "@mui/icons-material";
import { IconButton, Tooltip as MuiToolTip } from "@mui/material";
import { useEffect } from "react";
import Axios from "axios";
import MuiDatatable from "../../../components/table/MuiDatatable";
import TopBar from "../../../components/topbars/TopBar";
import Sidebar from "../../../clientComponent/Siderbar/Sidebar";
import Footer from "../../../components/footer/Footer";
import ThongTinDoanDoi from "./ThongTinDoanDoi";

export default function TatCaDoanDoi() {
  const navigate = useNavigate();

  const [show, setShow] = useState("");
  const [maDoanDoi, setMaDoanDoi] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  const columnsDoanDoi = [
    {
      name: "MaDoanDoi",
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
    {
      name: "stt",
      label: "STT",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ paddingLeft: "32px", marginRight: "45px" }}>
              {value}
            </div>
          );
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>STT</div>;
        },
      },
    },

    {
      name: "TenDoanDoi",
      label: "Tên Đoàn Đội",
      options: {
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "220px" }}>{value}</div>;
        },
      },
    },
    {
      name: "SoLuongThanhVien",
      label: "Sỉ Số",
      options: {
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ marginRight: "80px", paddingLeft: "15px" }}>
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "TenDonVi",
      label: "Thuộc Đơn vị",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "200px", marginRight: "160px" }}>
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "",
      options: {
        filter: true,
        sort: false,
        empty: true,
        disableColumnMenu: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <MuiToolTip title="View">
              <IconButton edge="end" aria-label="edit" className="icon-hover">
                <Visibility
                  onClick={() => {
                    setMaDoanDoi(tableMeta.rowData[0]);
                    setShow(true);
                  }}
                />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
  ];

  const optionsDoanDoi = {
    search: true,
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "560px",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "none",
    onRowsDelete: (rowsDeleted, newData) => {
      if (window.confirm("Bạn Có Muốn Xóa Không")) {
        console.log(rowsDeleted);
        // return true;
      } else return false;
    },
    onTableChange: (action, state) => {
      // console.log(action);
      // console.dir(state);
    },
    customToolbar: () => {
      return (
        <MuiToolTip title={"Thêm Đoàn Đội"}>
          <IconButton
            className="icon-hover"
            onClick={() => navigate("/themdoandoi")}
          >
            <Add />
          </IconButton>
        </MuiToolTip>
      );
    },
    textLabels: {
      toolbar: {
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

  const [dataDoanDoi, setDataDoanDoi] = useState([]);

  useEffect(() => {
    const getDataDoanDoi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/alldoandoi/${localStorage.getItem(
          "MaNguoiDung"
        )}`
      );
      setDataDoanDoi(data);
    };
    getDataDoanDoi();
  }, []);

  useEffect(() => {
    document.getElementById("tatcadoandoi").classList.add("actives");
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
            <Breadcrumb>
              <Breadcrumb.Item href="#" tabIndex="-1">
                <Link to="/home" className="link">
                  Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Thông Tin Đoàn Đội</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ textAlign: "left" }} className="mb-2">
              <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
                <MusicNote style={{ fontSize: "2.6rem" }} />
                Quản Lý Đoàn Đội, Thí Sinh Tham Gia Văn Nghệ
                <MusicNote style={{ fontSize: "2.6rem" }} />
              </h2>

              <Row style={{ padding: "15px 12px" }}>
                <MuiDatatable
                  title="Danh Sách Đoàn Đội"
                  data={dataDoanDoi}
                  columns={columnsDoanDoi}
                  options={optionsDoanDoi}
                />
              </Row>
            </div>
          </Container>{" "}
        </Container>{" "}
        <Footer />
      </div>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-width">
        <Modal.Header closeButton className="px-4">
          <Modal.Title className="ms-auto fw-bold">
            Thông Tin Đoàn Đội
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ThongTinDoanDoi maDoanDoi={maDoanDoi} />
        </Modal.Body>
      </Modal>
    </>
  );
}
