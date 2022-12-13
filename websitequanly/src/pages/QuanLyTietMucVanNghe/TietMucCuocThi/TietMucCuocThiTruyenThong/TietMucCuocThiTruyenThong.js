/* eslint-disable eqeqeq */
import { Edit, ManageSearch, Visibility } from "@mui/icons-material";
import React from "react";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MuiDatatable from "../../../../components/table/MuiDatatable";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function TietMucCuocThiTruyenThong() {
  const navigate = useNavigate();

  const dayjs = require("dayjs");

  const [dt, setDT] = useState([]);
  const [dataNguyenBan, setDataNguyenBan] = useState([]);
  const [selectRadio, setSelectRadio] = useState(1);
  const [tableBodyHeight, setTableBodyHeight] = useState("480px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [refresh, setRefresh] = useState(-1);
  const [load, setLoad] = useState(false);

  const handleRadioChange = (e) => {
    setBatDau(null);
    setKetThuc(null);
    setSelectRadio(e.target.value);
    setDT(dataNguyenBan);
  };
  const [batDau, setBatDau] = useState(null);
  const [ketThuc, setKetThuc] = useState(null);

  const handleFilter = () => {
    if (batDau == null)
      alert('Chưa chọn "Ngày" hoặc "Tháng" hoặc "Năm" Bắt đầu!');
    else if (ketThuc == null)
      alert('Chưa chọn "Ngày" hoặc "Tháng" hoặc "Năm" Kết thúc!');
    else {
      if (selectRadio == 1) {
        Axios.post(
          `http://localhost:3001/api/admin/alltietmuc/chuongtrinhduthi/ngay`,
          {
            NgayBatDau: batDau,
            NgayKetThuc: ketThuc,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.NgayGioToChuc == null) {
              d.NgayGioToChuc = "Chưa sắp lịch";
              d.SapLich = "Chưa sắp lịch";
            } else {
              d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format(
                "Từ HH:mm, DD/MM/YYYY"
              );
              d.SapLich = "Đã sắp lịch";
            }
          });
          setDT(data);
          setPage(0);
        });
      }
      if (selectRadio == 2) {
        Axios.post(
          `http://localhost:3001/api/admin/alltietmuc/chuongtrinhduthi/thang`,
          {
            NgayBatDau: batDau,
            NgayKetThuc: ketThuc,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.NgayGioToChuc == null) {
              d.NgayGioToChuc = "Chưa sắp lịch";
              d.SapLich = "Chưa sắp lịch";
            } else {
              d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format(
                "Từ HH:mm, DD/MM/YYYY"
              );
              d.SapLich = "Đã sắp lịch";
            }
          });
          setDT(data);
          setPage(0);
        });
      }
      if (selectRadio == 3) {
        Axios.post(
          `http://localhost:3001/api/admin/alltietmuc/chuongtrinhduthi/nam`,
          {
            NgayBatDau: batDau,
            NgayKetThuc: ketThuc,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.NgayGioToChuc == null) {
              d.NgayGioToChuc = "Chưa sắp lịch";
              d.SapLich = "Chưa sắp lịch";
            } else {
              d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format(
                "Từ HH:mm, DD/MM/YYYY"
              );
              d.SapLich = "Đã sắp lịch";
            }
          });
          setDT(data);
          setPage(0);
        });
      }
    }
  };

  useEffect(() => {
    const getDataTietMuc = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/alltietmuc/chuongtrinhduthi"
      );
      data.forEach((d) => {
        if (d.NgayGioToChuc == null) {
          d.NgayGioToChuc = "Chưa sắp lịch";
          d.SapLich = "Chưa sắp lịch";
        } else {
          d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format(
            "Từ HH:mm, DD/MM/YYYY"
          );
          d.SapLich = "Đã sắp lịch";
        }
      });
      setDT(data);
      setDataNguyenBan(data);
    };
    getDataTietMuc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const columnsTietMuc = [
    {
      name: "MaCuocThi",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    {
      name: "MaChuongTrinh",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
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
      name: "TenTietMuc",
      label: "Tên Tiết Mục",
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
      name: "TenChuongTrinh",
      label: "Thuộc Chương Trình",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "250px" }}>{value}</div>;
        },
      },
    },
    {
      name: "SapLich",
      label: "Lịch Thi",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        display: false,
        viewColumns: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "NgayGioToChuc",
      label: "Thời Gian Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "120px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenCuocThi",
      label: "Tên Cuộc Thi",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "250px" }}>{value}</div>;
        },
      },
    },
    {
      name: "MaTrangThai",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
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
            <MuiToolTip title={tableMeta.rowData[10] == 3 ? "View" : "Edit"}>
              <IconButton
                edge="end"
                aria-label="edit"
                className={
                  tableMeta.rowData[10] == 3 ? "icon-hover" : "edit-hover"
                }
                onClick={() => {
                  navigate(
                    `/chinhsuacuocthi/${tableMeta.rowData[0]}/chinhsuachuongtrinh/${tableMeta.rowData[1]}/chinhsuatietmuc/${tableMeta.rowData[2]}`
                  );
                }}
              >
                {tableMeta.rowData[10] == 3 ? <Visibility /> : <Edit />}
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
  ];

  const optionsTietMuc = {
    search: true,
    searchPlaceholder: "Tên Tiết mục, loại tiết muc, ngày diễn...",
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: tableBodyHeight,
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPage,
    selectableRows: "none",
    page: page,
    onChangePage: (number) => {
      setPage(number);
    },
    onChangeRowsPerPage: (number) => {
      if (number > 5) {
        setTableBodyHeight("auto");
        setRowsPerPage(number);
      } else {
        setTableBodyHeight("480px");
        setRowsPerPage(number);
      }
    },
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
      {load ? (
        <div style={{ position: "relative", width: "100%", height: "510px" }}>
          <Spinner
            animation="border"
            variant="primary"
            id="spinner"
            style={{
              position: "absolute",
              top: "50%",
              left: "49%",
              width: "50px",
              height: "50px",
            }}
          />
        </div>
      ) : (
        <>
          <Row className="d-flex align-items-center">
            <Col xs="12" md="4">
              <div
                className="p-0 m-0 d-flex align-items-center justify-content-between"
                style={{ fontWeight: "500" }}
              >
                <span>
                  <ManageSearch /> Lọc Theo: &nbsp;
                </span>
                <Form.Check
                  type="radio"
                  value="1"
                  id="dateCTTT1"
                  name="dateCTTT"
                  label={
                    <>
                      <label htmlFor="dateCTTT1">Ngày</label>
                    </>
                  }
                  defaultChecked
                  onChange={(e) => handleRadioChange(e)}
                  // style={{ marginRight: "50px" }}
                />
                <Form.Check
                  type="radio"
                  value="2"
                  name="dateCTTT"
                  id="dateCTTT2"
                  label={
                    <>
                      <label htmlFor="dateCTTT2">Tháng</label>
                    </>
                  }
                  onChange={(e) => handleRadioChange(e)}
                  // style={{ marginRight: "50px" }}
                />
                <Form.Check
                  type="radio"
                  value="3"
                  name="dateCTTT"
                  id="dateCTTT3"
                  label={
                    <>
                      <label htmlFor="dateCTTT3">Năm</label>
                    </>
                  }
                  onChange={(e) => handleRadioChange(e)}
                  // style={{ marginRight: "50px" }}
                />
              </div>
            </Col>
            <Col
              xs="12"
              md="8"
              className="pt-1 pb-2"
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "flex-end",
              }}
            >
              {selectRadio == 1 && (
                <>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    id="ngaybatdau"
                  >
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
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    id="ngayketthuc"
                  >
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
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    id="thangbatdau"
                  >
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
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    id="nambatdau"
                  >
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
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    id="namketthuc"
                  >
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
              <Button
                variant="contained"
                sx={{ padding: "7px 10px 5px 10px" }}
                onClick={handleFilter}
              >
                Filter
              </Button>
              &nbsp;
              <Button
                variant="contained"
                color="error"
                sx={{ padding: "7px 10px 5px 10px" }}
                onClick={() => {
                  setDT(dataNguyenBan);
                  setBatDau(null);
                  setKetThuc(null);
                  setPage(0);
                }}
              >
                Clear
              </Button>
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
      )}
    </>
  );
}
