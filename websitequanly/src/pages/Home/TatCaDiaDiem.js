import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./Home.css";
import Axios from "axios";
import { IconButton } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MuiDatatable from "../../components/table/MuiDatatable";

export default function TatCaDiaDiem() {
  const navigate = useNavigate();
  const [dataDiaDiem, setDataDiaDiem] = useState([]);

  useEffect(() => {
    const getDataDiaDiem = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/diadiem"
      );
      setDataDiaDiem(data);
    };
    getDataDiaDiem();
  }, []);

  const columnsDiaDiem = [
    {
      name: "MaDiaDiem",
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
      options: { filterOptions: { fullWidth: true } },
    },
    { name: "TenDiaDiem", label: "Tên Địa Điểm" },
    {
      name: "",
      options: {
        filter: true,
        sort: false,
        empty: true,
        print: false,
        disableColumnMenu: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton edge="end" aria-label="edit">
              <Edit
                onClick={() => {
                  navigate(`/chinhsuatietmuc/${tableMeta.rowData[0]}`);
                }}
              />
            </IconButton>
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
        print: false,
        disableColumnMenu: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton edge="end" aria-label="edit">
              <Delete
                onClick={() => {
                  navigate(`/chinhsuatietmuc/${tableMeta.rowData[0]}`);
                }}
              />
            </IconButton>
          );
        },
      },
    },
  ];

  const optionsDiaDiem = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "450px",
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

  return (
    <>
      <Row className="mb-2">
        <Col md="9"></Col>
        <Col md="3" style={{ textAlign: "right" }}>
          <Button type="button" variant="outline-primary">
            <Add /> Thêm Địa Điểm
          </Button>
        </Col>
      </Row>
      <Row style={{ padding: "0px 10px" }}>
        <MuiDatatable
          title="Danh Sách Địa Điểm Tổ chức"
          data={dataDiaDiem}
          columns={columnsDiaDiem}
          options={optionsDiaDiem}
        />
      </Row>
    </>
  );
}
