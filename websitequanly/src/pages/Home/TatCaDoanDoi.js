import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./Home.css";
import { IconButton } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import MuiDatatable from "../../components/table/MuiDatatable";
import { useState } from "react";
import { useEffect } from "react";

export default function TatCaDoanDoi() {
  const navigate = useNavigate();

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
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "TenDoanDoi",
      label: "Tên Đoàn Đội",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "220px" }}>{value}</div>;
        },
      },
    },

    { name: "TenNhomTruong", label: "Trưởng Nhóm" },
    {
      name: "Email",
      label: "Email Trưởng Nhóm",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "200px", lineBreak: "anywhere" }}>
              {value}
            </div>
          );
        },
      },
    },
    { name: "Phone", label: "Phone" },
    { name: "SoLuongThanhVien", label: "Sỉ Số" },
    {
      name: "TenDonVi",
      label: "Thuộc Đơn vị",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "180px" }}>{value}</div>;
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
            <IconButton edge="end" aria-label="edit">
              <Edit
                onClick={() =>
                  navigate(`/chinhsuadoandoi/${tableMeta.rowData[0]}`)
                }
              />
            </IconButton>
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
    tableBodyHeight: "480px",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
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
  };

  const [dataDoanDoi, setDataDoanDoi] = useState([]);

  useEffect(() => {
    const getDataDoanDoi = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/tatcadoandoi"
      );
      setDataDoanDoi(data);
    };
    getDataDoanDoi();
  }, []);

  return (
    <>
      <Row className="mb-2">
        <Col md="9"></Col>
        <Col md="3" style={{ textAlign: "right" }}>
          <Button
            type="button"
            variant="outline-primary"
            onClick={() => navigate("/themdoandoi")}
          >
            <Add /> Thêm Đoàn Đội
          </Button>
        </Col>
      </Row>
      <Row style={{ padding: "0px 10px" }}>
        <MuiDatatable
          title="Danh Sách Đoàn Đội Văn Nghệ"
          data={dataDoanDoi}
          columns={columnsDoanDoi}
          options={optionsDoanDoi}
        />
      </Row>
    </>
  );
}
