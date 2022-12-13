/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React from "react";
import { Row, Button } from "react-bootstrap";
import "./Home.css";
import { Edit, MusicNote } from "@mui/icons-material";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip as MuiToolTip } from "@mui/material";
import MuiDatatable from "../../components/table/MuiDatatable";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function Home() {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dayjs = require("dayjs");

  const columnsCuocThi = [
    {
      name: "MaCuocThi",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
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
          return <div style={{ maxWidth: "300px" }}>{value}</div>;
        },
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
          return (
            <>
              <div>{value}</div>
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
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenDiaDiem",
      label: "Địa Điểm",
      options: {
        filterOptions: { fullWidth: true },
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "MaTrangThai",
      label: "Trạng Thái",
      options: {
        filterOptions: { fullWidth: true },
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div style={{ display: "flex" }}>
                {value == "Chưa Tổ Chức" && (
                  <Button
                    style={{
                      background: "white",
                      border: "1px solid rgb(237, 108, 2)",
                      color: "rgb(230, 81, 0)",
                      fontSize: "0.7rem",
                      padding: "3px 4px",
                      borderRadius: "10px",
                      textAlign: "center",
                      fontWeight: "600",
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
                      fontSize: "0.7rem",
                      padding: "3px 4px",
                      borderRadius: "10px",
                      display: "flex",
                      fontWeight: "600",
                    }}
                  >
                    Đang Tổ Chức
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
        viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <MuiToolTip title="Edit">
                <IconButton
                  edge="end"
                  aria-label="edit"
                  className="edit-hover"
                  onClick={() => {
                    navigate(`/chinhsuacuocthi/${tableMeta.rowData[0]}`);
                  }}
                >
                  <Edit />
                </IconButton>
              </MuiToolTip>
            </>
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
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "none",
    downloadOptions: {
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
    onDownload: (buildHead, buildBody, columns, values) => {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      // console.log(values.forEach((val) => console.log(val)));

      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);

      const fileName = `DanhSachCuocThi`;
      const ws = utils.json_to_sheet(json);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      saveAs(data, fileName + fileExtension);
      // cancel default  CSV download from table
      return false;
    },
    textLabels: {
      toolbar: {
        downloadCsv: "Xuất Excel",
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
        "http://localhost:3001/api/admin/cuocthichuahoacdangdienra"
      );
      data.forEach((d) => {
        if (d.MaTrangThai == 1) d.MaTrangThai = "Chưa Tổ Chức";
        if (d.MaTrangThai == 2) d.MaTrangThai = "Đang Tổ Chức";
        if (d.MaTrangThai == 3) d.MaTrangThai = "Đã Tổ Chức";
        d.ThoiGianDienRa = `${dayjs(d.NgayBatDau).format(
          "DD/MM/YYYY"
        )} - ${dayjs(d.NgayKetThuc).format("DD/MM/YYYY")}`;
      });
      setDataCuocThi(data);
    };
    getDataCuocThi();
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

  const isSmallSize = width <= 769;

  return (
    <>
      <Row
        className="py-2"
        style={{ position: "relative", width: "100%" }}
      >
        <h2 className="text-center d-flex align-items-center justify-content-center py-2">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Hệ Thống Quản Lý Công Tác Văn Nghệ
          <MusicNote style={{ fontSize: "2.6rem" }} />
        </h2>
        {isSmallSize ? (
          <></>
        ) : (
          <div class="muzieknootjes" style={{ top: "3rem" }}>
            <div class="noot-1">&#9835; &#9833;</div>
            <div class="noot-2">&#9833;</div>
            <div class="noot-3">&#9839; &#9834;</div>
            <div class="noot-4">&#9834;</div>
          </div>
        )}
      </Row>
      {/* <Container fluid>
        {isSmallSize ? (
          <></>
        ) : (
          <Carousel>
            <Carousel.Item>
              <Row>
                <Col xs="12" md="6" className="px-0 mx-0">
                  <img
                    className="d-block img"
                    src={"http://localhost:3001/2022_Hoidien_Anh_2.jpg"}
                    alt="First slide"
                  />
                </Col>
                <Col xs="12" md="6" className="px-0 mx-0">
                  <img
                    className="d-block img"
                    src={"http://localhost:3001/2022_Hoidien_Anh_3.jpg"}
                    alt="First slide"
                  />
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                <Col xs="12" md="6" className="px-0 mx-0">
                  <img
                    className="d-block img"
                    src={"http://localhost:3001/2022_Hoidien_Anh_4.jpg"}
                    alt="First slide"
                  />
                </Col>
                <Col xs="12" md="6" className="px-0 mx-0">
                  <img
                    className="d-block img"
                    src={"http://localhost:3001/2022_Hoidien_Anh_6.jpg"}
                    alt="First slide"
                  />
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                <Col xs="12" md="6" className="px-0 mx-0">
                  <img
                    className="d-block img"
                    src={"http://localhost:3001/2022_Hoidien_Anh_7.jpg"}
                    alt="First slide"
                  />
                </Col>
                <Col xs="12" md="6" className="px-0 mx-0">
                  <img
                    className="d-block img"
                    src={"http://localhost:3001/2022_Hoidien_Anh_8.jpg"}
                    alt="First slide"
                  />
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        )}
      </Container> */}
      <div style={{ width: "100%" }}>
        <img
          className="d-block w-100"
          style={{ borderRadius: "20px" }}
          src={"http://localhost:3001/slide.png"}
          alt="First slide"
        />
      </div>

      <Row style={{ padding: "20px 12px" }}>
        <MuiDatatable
          title="Danh Sách Cuộc Thi Chưa Hoặc Đang Tổ Chức"
          data={dataCuocThi}
          columns={columnsCuocThi}
          options={optionsCuocThi}
        />
      </Row>
    </>
  );
}
