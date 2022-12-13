/* eslint-disable eqeqeq */
import { Delete, Edit, ManageSearch } from "@mui/icons-material";
import React from "react";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MuiDatatable from "../../../components/table/MuiDatatable";
import { IconButton, Tooltip as MuiToolTip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function TietMucChuongTrinh() {
  const navigate = useNavigate();

  const dayjs = require("dayjs");

  const [dt, setDT] = useState([]);
  // const [dataNguyenBan, setDataNguyenBan] = useState([]);
  const [onSearch, setOnSearch] = useState(false);
  const [selectRadio, setSelectRadio] = useState(1);
  const [tableBodyHeight, setTableBodyHeight] = useState("480px");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRadioChange = (e) => {
    setBatDau(null);
    setKetThuc(null);
    setSelectRadio(e.target.value);
  };
  const [batDau, setBatDau] = useState(null);
  const [ketThuc, setKetThuc] = useState(null);

  const handleFilter = () => {
    // setOnSearch(true);
    // if (selectRadio == 1) {
    //   Axios.post(`http://localhost:3001/api/admin/filtercuocthi/ngay`, {
    //     NgayBatDau: batDau,
    //     NgayKetThuc: ketThuc,
    //   }).then((response) => {});
    // }
    // if (selectRadio == 2) {
    //   Axios.post(`http://localhost:3001/api/admin/filtercuocthi/thang`, {
    //     NgayBatDau: batDau,
    //     NgayKetThuc: ketThuc,
    //   }).then((response) => {});
    // }
    // if (selectRadio == 3) {
    //   Axios.post(`http://localhost:3001/api/admin/filtercuocthi/nam`, {
    //     NgayBatDau: batDau,
    //     NgayKetThuc: ketThuc,
    //   }).then((response) => {});
    // }
  };

  useEffect(() => {
    const getDataTietMuc = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/alltietmuc/chuongtrinhvannghe"
      );
      setDT(data);
    };
    getDataTietMuc();
  }, []);

  const columnsTietMuc = [
    {
      name: "MaTietMuc",
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
      options: {
        filter: false,
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "10px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenChuongTrinh",
      label: "Tên Chương Trình",
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
      name: "TenTietMuc",
      label: "Tên Tiết Mục",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenLoaiTietMuc",
      label: "Loại Tiết Mục",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "NgayGioThucHien",
      label: "Thời Gian",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "220px" }}>
              {dayjs(value).format("HH:mm, DD/MM/YYYY")}
            </div>
          );
        },
      },
    },
    {
      name: "NhanSo",
      label: "Nhân Số",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
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
            <MuiToolTip title="Edit">
              <IconButton edge="end" aria-label="edit" className="edit-hover">
                <Edit
                  onClick={() => {
                    navigate(`chinhsuatietmuc/${tableMeta.rowData[0]}`);
                  }}
                />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
  ];

  const optionsTietMuc = {
    search: true,
    searchPlaceholder: "Tên Thí Sinh, Mssv, Email,...",
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "500px",
    tableBodyMaxHeight: "800px",
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

      const fileName = `DanhSachTietMuc`;
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

  return (
    <>
      <Row className="d-flex align-items-center">
        <Col xs="12" md="5">
          <div
            className="p-0 m-0 d-flex align-items-center justify-content-between"
            style={{ fontWeight: "500" }}
          >
            <span>
              <ManageSearch /> Lọc Theo Thời Gian: &nbsp;
            </span>
            <Form.Check
              type="radio"
              value="1"
              name="dateCTR"
              label={"Ngày"}
              defaultChecked
              onChange={(e) => handleRadioChange(e)}
              // style={{ marginRight: "50px" }}
            />
            <Form.Check
              type="radio"
              value="2"
              name="dateCTR"
              label={"Tháng"}
              onChange={(e) => handleRadioChange(e)}
              // style={{ marginRight: "50px" }}
            />
            <Form.Check
              type="radio"
              value="3"
              name="dateCTR"
              label={"Năm"}
              onChange={(e) => handleRadioChange(e)}
              // style={{ marginRight: "50px" }}
            />
          </div>
        </Col>
        <Col
          xs="12"
          md="7"
          className="pt-1 pb-2"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-end",
          }}
        >
          {selectRadio == 1 && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs} id="ngaybatdau">
                <DesktopDatePicker
                  inputFormat="DD/MM/YYYY"
                  value={batDau}
                  label="Ngày Bắt Đầu"
                  onChange={(newValue) =>
                    setBatDau(dayjs(newValue).format("YYYY-MM-DD"))
                  }
                  renderInput={(params) => (
                    <TextField {...params} size="small" helperText={null} />
                  )}
                />
              </LocalizationProvider>
              &nbsp; - &nbsp;
              <LocalizationProvider dateAdapter={AdapterDayjs} id="ngayketthuc">
                <DesktopDatePicker
                  inputFormat="DD/MM/YYYY"
                  value={ketThuc}
                  minDate={batDau}
                  label="Ngày Kết Thúc"
                  onChange={(newValue) =>
                    setKetThuc(dayjs(newValue).format("YYYY-MM-DD"))
                  }
                  renderInput={(params) => (
                    <TextField {...params} size="small" helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </>
          )}
          {selectRadio == 2 && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs} id="thangbatdau">
                <DesktopDatePicker
                  inputFormat="MM/YYYY"
                  views={["year", "month"]}
                  value={batDau}
                  label="Tháng Bắt Đầu"
                  onChange={(newValue) =>
                    setBatDau(dayjs(newValue).format("YYYY-MM"))
                  }
                  renderInput={(params) => (
                    <TextField {...params} size="small" helperText={null} />
                  )}
                />
              </LocalizationProvider>
              &nbsp; - &nbsp;
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                id="thangketthuc"
              >
                <DesktopDatePicker
                  inputFormat="MM/YYYY"
                  views={["year", "month"]}
                  value={ketThuc}
                  minDate={batDau}
                  label="Tháng Kết Thúc"
                  onChange={(newValue) =>
                    setKetThuc(dayjs(newValue).format("YYYY-MM"))
                  }
                  renderInput={(params) => (
                    <TextField {...params} size="small" helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </>
          )}
          {selectRadio == 3 && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs} id="nambatdau">
                <DesktopDatePicker
                  inputFormat="YYYY"
                  views={["year"]}
                  value={batDau}
                  label="Năm Bắt Đầu"
                  onChange={(newValue) =>
                    setBatDau(dayjs(newValue).format("YYYY"))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      helperText={null}
                      className="focus-d"
                    />
                  )}
                />
              </LocalizationProvider>
              &nbsp; - &nbsp;
              <LocalizationProvider dateAdapter={AdapterDayjs} id="namketthuc">
                <DesktopDatePicker
                  inputFormat="YYYY"
                  views={["year"]}
                  value={ketThuc}
                  minDate={batDau}
                  label="Năm Kết Thúc"
                  onChange={(newValue) =>
                    setKetThuc(dayjs(newValue).format("YYYY"))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      helperText={null}
                      className="focus-d"
                    />
                  )}
                />
              </LocalizationProvider>
            </>
          )}
          &nbsp;
          <Button variant="outline-primary" onClick={handleFilter}>
            Search
          </Button>
          &nbsp;
          {onSearch == true ? (
            <Button
              variant="outline-danger"
              onClick={() => {
                setOnSearch(false);
              }}
            >
              Clear
            </Button>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row style={{ padding: "0px 10px" }}>
        <MuiDatatable
          title="Danh Sách Tiết Mục"
          data={dt}
          columns={columnsTietMuc}
          options={optionsTietMuc}
        />
      </Row>
    </>
  );
}
