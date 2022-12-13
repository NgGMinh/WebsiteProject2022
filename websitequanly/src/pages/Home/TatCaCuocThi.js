/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Row, Col, Button} from "react-bootstrap";
import "./Home.css";
import Axios from "axios";
import { IconButton, Tooltip as MuiToolTip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MuiDatatable from "../../components/table/MuiDatatable";

export default function TatCaCuocThi() {
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
    //STT
    {
      name: "stt",
      label: "STT",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "10px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenCuocThi",
      label: "Tên Cuộc Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
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
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
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
    {
      name: "TenHinhThuc",
      label: "Hình Thức Cuộc Thi",
      options: {
        filterType: "multiselect",
        filterOptions: {fullWidth: true},
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenDiaDiem",
      label: "Địa Điểm",
      options: {
        filterOptions: {fullWidth: true},
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "MaTrangThai",
      label: "Trạng Thái",
      options: {
        filterOptions: {fullWidth: true},
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div style={{ display: "flex"}}>
                {value == "Chưa Tổ Chức" && (
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

                {value == "Đang Tổ Chức" && (
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

                {value == "Đã Tổ Chức" && (
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
            <MuiToolTip title="Edit">
              <IconButton edge="end" aria-label="edit" className="edit-hover">
                <Edit
                  onClick={() => {
                    if (tableMeta.rowData[6] === "Thi Chương Trình")
                      navigate(
                        `/chinhsuacuocthi/truyenthong/${tableMeta.rowData[0]}`
                      );
                    if (tableMeta.rowData[6] === "Đăng ký Thể loại Tự Do")
                      navigate(
                        `/chinhsuacuocthi/dangkytudo/${tableMeta.rowData[0]}`
                      );
                  }}
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        print: false,
        disableColumnMenu: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <MuiToolTip title="Delete">
              <IconButton edge="end" aria-label="edit" className="delete-hover">
                <Delete
                  onClick={() => {
                    if (
                      window.confirm("Bạn có chắc muốn xóa Cuộc thi này ?")
                    ) {
                    }
                  }}
                />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
  ];

  const optionsCuocThi = {
    search: true,
    searchPlaceholder: "Tên Cuộc Thi, Địa Điểm, Ngày Tổ Chức,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "600px",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "none",
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

  const [dataCuocThi, setDataCuocThi] = useState([]);

  useEffect(() => {
    const getDataCuocThi = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/tatcacuocthi"
      );
      data.forEach(d => {
        if(d.MaTrangThai == 1) d.MaTrangThai = "Chưa Tổ Chức";
        if(d.MaTrangThai == 2) d.MaTrangThai = "Đang Tổ Chức";
        if(d.MaTrangThai == 2) d.MaTrangThai = "Đã Tổ Chức";
      });
      setDataCuocThi(data);
    };
    getDataCuocThi();
  }, []);

  return (
    <>
      <Row className="mb-2">
        <Col md="9"></Col>
        <Col md="3" style={{ textAlign: "right" }}>
          <Button
            type="button"
            variant="outline-primary"
            onClick={() => navigate("/themcuocthi")}
          >
            <Add /> Thêm Cuộc Thi
          </Button>
        </Col>
      </Row>
      <Row style={{ padding: "0px 10px" }}>
        <MuiDatatable
          title="Danh Sách Chương Trình Văn Nghệ"
          data={dataCuocThi}
          columns={columnsCuocThi}
          options={optionsCuocThi}
        />
      </Row>
    </>
  );
}
