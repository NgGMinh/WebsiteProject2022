import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Axios from "axios";
import "./Home.css";
import { IconButton, Tooltip as MuiToolTip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MuiDatatable from "../../components/table/MuiDatatable";

export default function TatCaChuongTrinh() {
  const navigate = useNavigate();

  const dayjs = require("dayjs");

  const columnsChuongTrinh = [
    {
      name: "MaCuocThi",
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
      name: "MaChuongTrinh",
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

    //Tên Chương Trình
    {
      name: "TenChuongTrinh",
      label: "Tên Chương Trình",
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
      name: "TenHinhThucChuongTrinh",
      label: "Hình Thức",
      options: {
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },

    //Ngày Giờ Tổ Chức
    {
      name: "NgayGioToChuc",
      label: "Thời Gian",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "220px" }}>
              {value == null
                ? "Chưa sắp lịch"
                : dayjs(value).format("HH:mm, DD/MM/YYYY")}
            </div>
          );
        },
      },
    },

    //Địa Điểm Tổ Chức
    {
      name: "TenDiaDiem",
      label: "Địa Điểm",
      options: {
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    //Thuộc Khoa
    {
      name: "TenDonVi",
      label: "Đơn vị Tổ chức",
      options: {
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "150px" }}>{value}</div>;
        },
      },
    },

    //Trạng Thái
    {
      name: "TenTrangThai",
      label: "Trạng Thái",
      options: {
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div>
                {value === "Chưa Tổ Chức" && (
                  <Button
                    style={{
                      background: "white",
                      border: "1px solid rgb(237, 108, 2)",
                      color: "rgb(230, 81, 0)",
                      fontSize: "0.75rem",
                      padding: "3px 4px",
                      borderRadius: "10px",
                    }}
                  >
                    {value}
                  </Button>
                )}

                {value === "Đang Tổ Chức" && (
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
                    {value}
                  </Button>
                )}

                {value === "Đã Tổ Chức" && (
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
                    {value}
                  </Button>
                )}
              </div>
            </>
          );
        },
      },
    },

    //Xem Chi Tiết / Chỉnh Sửa
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
            <MuiToolTip title="Edit">
              <IconButton edge="end" aria-label="edit">
                <Edit
                  onClick={() => {
                    if (tableMeta.rowData[0] > 0)
                      navigate(
                        `/chinhsuacuocthi/truyenthong/${tableMeta.rowData[0]}/chinhsuachuongtrinh/${tableMeta.rowData[1]}`
                      );
                    else
                      navigate(`/chinhsuachuongtrinh/${tableMeta.rowData[1]}`);
                  }}
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
                      window.confirm("Bạn có chắc muốn xóa chương trình này ?")
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

  const optionsChuongTrinh = {
    search: true,
    searchPlaceholder: "Tên Chương Trình, Địa Điểm, Ngày Tổ Chức,...",
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "540px",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "none",
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

  const [dt, setDT] = useState([]);

  useEffect(() => {
    const getDataChuongTrinh = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/tatcachuongtrinh"
      );
      setDT(data);
    };
    getDataChuongTrinh();
  }, []);

  return (
    <>
      <Row className="mb-2">
        <Col md="9"></Col>
        <Col md="3" style={{ textAlign: "right" }}>
          <Button
            type="button"
            variant="outline-primary"
            onClick={() => navigate("/themchuongtrinh")}
          >
            <Add /> Thêm Chương Trình
          </Button>
        </Col>
      </Row>
      <Row style={{ padding: "0px 10px" }}>
        <MuiDatatable
          title="Danh Sách Chương Trình Văn Nghệ"
          data={dt}
          columns={columnsChuongTrinh}
          options={optionsChuongTrinh}
        />
      </Row>
    </>
  );
}
