import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import "./Home.css";
import { IconButton } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MuiDatatable from "../../components/table/MuiDatatable";
import { useEffect } from "react";
import { useState } from "react";

export default function TatCaThiSinh() {
  const navigate = useNavigate();

  const columnsThiSinh = [
    {
      name: "MaThiSinh",
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
      options: { filterOptions: { fullWidth: true } },
    },
    { name: "TenThiSinh", label: "Họ Tên" },
    { name: "MaDinhDanh", label: "Mã Định Danh" },
    {
      name: "MaLop",
      label: "Mã Lớp",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    {
      name: "GioiTinh",
      label: "Giới Tính",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    { name: "Email", label: "Email Thí Sinh" },
    { name: "Phone", label: "Phone" },
    { name: "TenDonVi", label: "Thuộc Đơn Vị" },
    {
      name: "",
      options: {
        filter: true,
        sort: false,
        empty: true,
        disableColumnMenu: true,
        customBodyRender: (
          value,
          tableMeta,
          updateValue,
          displayData,
          selectableRows
        ) => {
          return (
            <IconButton edge="end" aria-label="edit">
              <Edit
                onClick={() =>
                  window.alert(`Clicked "Edit" for row ${selectableRows}`)
                }
              />
            </IconButton>
          );
        },
      },
    },
  ];

  const optionsThiSinh = {
    search: true,
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "450px",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
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
  };

  const [dataThiSinh, setDataThiSinh] = useState([]);

  useEffect(() => {
    const getDataThiSinh = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/tatcathisinh"
      );
      setDataThiSinh(data);
    };
    getDataThiSinh();
  }, []);
  return (
    <>
      <Row className="mb-2">
        <Col md="9"></Col>
        <Col md="3" style={{ textAlign: "right" }}>
          <Button
            type="button"
            variant="outline-primary"
            onClick={() => navigate("/themthisinh")}
          >
            <Add /> Thêm Thí Sinh
          </Button>
        </Col>
      </Row>
      <Row style={{ padding: "0px 10px" }}>
        <MuiDatatable
          title="Danh Sách Thí Sinh"
          data={dataThiSinh}
          columns={columnsThiSinh}
          options={optionsThiSinh}
        />
      </Row>
    </>
  );
}
