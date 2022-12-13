import { Row, Col, Button, Breadcrumb, Form, Container } from "react-bootstrap";
import { Add, Edit, ManageSearch, MusicNote } from "@mui/icons-material";
import React from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import MuiDatatable from "../../components/table/MuiDatatable";
import TopBar from "../../components/topbars/TopBar";
import { useEffect } from "react";
import { useState } from "react";

export default function GiamKhao() {
  const navigate = useNavigate();
  const dayjs = require("dayjs");

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
      name: "stt", label:"STT",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "10px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenCuocThi",
      label: "Tên Cuộc Thi",
      options: {
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
        customBodyRender: (value, tableMeta, updateValue) => {
          let ngaybd = tableMeta.rowData[3];
          let ngaykt = tableMeta.rowData[4];
          return (
            <>
              <div>
                {dayjs(ngaybd).format("DD/MM/YYYY")} -{" "}
                {dayjs(ngaykt).format("DD/MM/YYYY")}
              </div>
            </>
          );
        },
      },
    },
    { name: "TenHinhThuc", label: "Hình Thức Cuộc Thi" },
    { name: "TenDiaDiem", label: "Địa Điểm" },
    {
      name: "MaTrangThai",
      label: "Trạng Thái",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {value == 1 && (
                  <Button
                    style={{
                      background: "white",
                      border: "1px solid rgb(237, 108, 2)",
                      color: "rgb(230, 81, 0)",
                      fontSize: "0.75rem",
                      padding: "3px 4px",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    Chưa Tổ Chức
                  </Button>
                )}

                {value == 2 && (
                  <Button
                    style={{
                      background: "white",
                      border: "1px solid rgb(2, 136, 209)",
                      color: "rgb(1, 87, 155)",
                      fontSize: "0.75rem",
                      padding: "3px 4px",
                      borderRadius: "10px",
                      display: "flex",
                    }}
                  >
                    Đang Tổ Chức
                  </Button>
                )}

                {value == 3 && (
                  <Button
                    style={{
                      background: "white",
                      border: "1px solid rgb(46, 125, 50)",
                      color: "rgb(27, 94, 32)",
                      fontSize: "0.75rem",
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
              <Edit
                onClick={() => {
                  if (tableMeta.rowData[6] == "Chương trình Truyền thống")
                    navigate(`/chinhsuacuocthi/truyenthong/${tableMeta.rowData[0]}`);
                  if (tableMeta.rowData[6] == "Đăng ký Thể loại Tự Do")
                    navigate(`/chinhsuacuocthi/dangkytudo/${tableMeta.rowData[0]}`);
                }}
                style={{ cursor: "pointer" }}
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
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "550px",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
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


  const [dataCuocThi, setDataCuocThi] = useState([]);

  useEffect(() => {
    const getDataCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/allcuocthilamgiamkhao/${localStorage.getItem(
          "MaNguoiDung"
        )}`
      );
      setDataCuocThi(data);
    };
    getDataCuocThi();
  }, []);

  return (
    <>
      <TopBar />
      <Container>
        <div className="text-start mb-2" style={{paddingTop: "300px"}}>
          <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
            <MusicNote style={{ fontSize: "2.6rem" }} />
            Quản Lý Cuộc Thi Văn Nghệ
            <MusicNote style={{ fontSize: "2.6rem" }} />
          </h2>{" "}
          <Row className="d-flex align-items-center">
            <Col xs="12">
              <div
                className="p-0 m-0 d-flex align-items-center"
                style={{ fontWeight: "500" }}
              >
                <ManageSearch /> Tìm Kiếm Theo Thời Gian
              </div>
            </Col>
            <Col xs="12" md="9" className="pt-1 pb-2">
              <Form>
                <Row className="d-flex align-items-center">
                  <Col>
                    <Form.Control type="datetime-local" />
                  </Col>
                  -
                  <Col>
                    <Form.Control type="datetime-local" />
                  </Col>
                  <Col>
                    <Button variant="outline-primary" type="submit">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col xs="12" md="3" className="text-end pt-1 pb-2">
              <Button
                type="button"
                variant="outline-primary"
                onClick={() => navigate("/themcuocthi")}
              >
                <Add /> Thêm Cuộc Thi
              </Button>
            </Col>
          </Row>
        </div>
        <Row style={{ padding: "0px 10px" }}>
          <MuiDatatable
            title="Danh Sách Cuộc Thi Văn Nghệ"
            data={dataCuocThi}
            columns={columnsCuocThi}
            options={optionsCuocThi}
          />
        </Row>
      </Container>
    </>
  );
}
