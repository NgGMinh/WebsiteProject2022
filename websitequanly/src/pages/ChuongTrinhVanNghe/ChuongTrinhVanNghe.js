/* eslint-disable eqeqeq */
import { Row, Col, Form } from "react-bootstrap";
import { Edit, ManageSearch, MusicNote } from "@mui/icons-material";
import React, { useEffect } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import MuiDatatable from "../../components/table/MuiDatatable";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function ChuongTrinhVanNghe() {
  const navigate = useNavigate();

  const dayjs = require("dayjs");
  const [tableBodyHeight, setTableBodyHeight] = useState("480px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

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
          return <div style={{ maxWidth: "280px" }}>{value}</div>;
        },
      },
    },
    {
      name: "SapLich",
      label: "Sắp Lịch",
      options: {
        display: false,
        viewColumns: false,
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
          return <div style={{ maxWidth: "220px" }}>{value}</div>;
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
          return <div style={{ maxWidth: "180px" }}>{value}</div>;
        },
      },
    },
    {
      name: "ChamDiem",
      label: "Chấm Điểm",
      options: {
        display: false,
        viewColumns: false,
        filterType: "multiselect",
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "DiemTrungBinh",
      label: "Điểm Thi",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "290px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenGiaiThuong",
      label: "Giải",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "290px" }}>{value}</div>;
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
              <IconButton
                edge="end"
                aria-label="edit"
                className="edit-hover"
                onClick={() => {
                  navigate(
                    `/chinhsuacuocthi/${tableMeta.rowData[0]}/chinhsuachuongtrinh/${tableMeta.rowData[1]}`
                  );
                }}
              >
                <Edit />
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
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
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

      const fileName = `DanhSachThongKe`;
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

  const [dt, setDT] = useState([]);
  const [selectRadio, setSelectRadio] = useState(1);
  const [dataNguyenBan, setDataNguyenBan] = useState([]);

  useEffect(() => {
    const getDataChuongTrinh = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/tatcachuongtrinh"
      );
      data.forEach((d) => {
        if (d.DiemTrungBinh == null) {
          d.DiemTrungBinh = "Chưa chấm";
          d.TenGiaiThuong = "Chưa xét";
          d.ChamDiem = "Chưa chấm";
        } else {
          d.ChamDiem = "Đã chấm";
        }
        if (d.NgayGioToChuc == null) {
          d.NgayGioToChuc = "Chưa sắp lịch";
          d.SapLich = "Chưa sắp lịch";
        } else {
          d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format("HH:mm, DD/MM/YYYY");
          d.SapLich = "Đã sắp lịch";
        }
      });
      setDT(data);
      setDataNguyenBan(data);
    };
    getDataChuongTrinh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRadioChange = (e) => {
    setBatDau(null);
    setKetThuc(null);
    setSelectRadio(e.target.value);
  };
  const [batDau, setBatDau] = useState(null);
  const [ketThuc, setKetThuc] = useState(null);

  const handleFilter = () => {
    if (selectRadio == 1) {
      Axios.post(`http://localhost:3001/api/admin/filterchuongtrinh/ngay`, {
        NgayBatDau: batDau,
        NgayKetThuc: ketThuc,
      }).then((response) => {
        const data = response.data;
        data.forEach((d) => {
          if (d.DiemTrungBinh == null) {
            d.DiemTrungBinh = "Chưa chấm";
            d.TenGiaiThuong = "Chưa xét";
            d.ChamDiem = "Chưa chấm";
          } else {
            d.ChamDiem = "Đã chấm";
          }
          if (d.NgayGioToChuc == null) {
            d.NgayGioToChuc = "Chưa sắp lịch";
            d.SapLich = "Chưa sắp lịch";
          } else {
            d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format(
              "HH:mm, DD/MM/YYYY"
            );
            d.SapLich = "Đã sắp lịch";
          }
        });
        setDT(data);
      });
    }
    if (selectRadio == 2) {
      Axios.post(`http://localhost:3001/api/admin/filterchuongtrinh/thang`, {
        NgayBatDau: batDau,
        NgayKetThuc: ketThuc,
      }).then((response) => {
        const data = response.data;
        data.forEach((d) => {
          if (d.DiemTrungBinh == null) {
            d.DiemTrungBinh = "Chưa chấm";
            d.TenGiaiThuong = "Chưa xét";
            d.ChamDiem = "Chưa chấm";
          } else {
            d.ChamDiem = "Đã chấm";
          }
          if (d.NgayGioToChuc == null) {
            d.NgayGioToChuc = "Chưa sắp lịch";
            d.SapLich = "Chưa sắp lịch";
          } else {
            d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format(
              "HH:mm, DD/MM/YYYY"
            );
            d.SapLich = "Đã sắp lịch";
          }
        });
        setDT(data);
      });
    }
    if (selectRadio == 3) {
      Axios.post(`http://localhost:3001/api/admin/filterchuongtrinh/nam`, {
        NgayBatDau: batDau,
        NgayKetThuc: ketThuc,
      }).then((response) => {
        const data = response.data;
        data.forEach((d) => {
          if (d.DiemTrungBinh == null) {
            d.DiemTrungBinh = "Chưa chấm";
            d.TenGiaiThuong = "Chưa xét";
            d.ChamDiem = "Chưa chấm";
          } else {
            d.ChamDiem = "Đã chấm";
          }
          if (d.NgayGioToChuc == null) {
            d.NgayGioToChuc = "Chưa sắp lịch";
            d.SapLich = "Chưa sắp lịch";
          } else {
            d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format(
              "HH:mm, DD/MM/YYYY"
            );
            d.SapLich = "Đã sắp lịch";
          }
        });
        setDT(data);
      });
    }
  };

  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/home" className="link">
            Home
          </Link>
        </li>
        <li className="breadcrumb-item active">Chương Trình Văn Nghệ</li>
      </ol>

      <div className="text-start pb-1">
        <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Quản Lý Chương Trình Văn Nghệ
          <MusicNote style={{ fontSize: "2.6rem" }} />
        </h2>{" "}
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
                name="date"
                label={"Ngày"}
                defaultChecked
                onChange={(e) => handleRadioChange(e)}
                // style={{ marginRight: "50px" }}
              />
              <Form.Check
                type="radio"
                value="2"
                name="date"
                label={"Tháng"}
                onChange={(e) => handleRadioChange(e)}
                // style={{ marginRight: "50px" }}
              />
              <Form.Check
                type="radio"
                value="3"
                name="date"
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
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  id="ngaybatdau"
                >
                  <DesktopDatePicker
                    inputFormat="DD/MM/YYYY"
                    value={batDau}
                    label="Ngày Bắt Đầu"
                    maxDate={ketThuc}
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
                    maxDate={ketThuc}
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
                    maxDate={ketThuc}
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
            {/* &nbsp;
            <Button onClick={handleFilter}>Search</Button>&nbsp;
            {onSearch == true ? (
              <Button
                variant="outline-danger"
                onClick={() => {
                  setDT(dataNguyenBan);
                  setOnSearch(false);
                }}
              >
                Clear
              </Button>
            ) : (
              <></>
            )} */}
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
            title="Danh Sách Chương Trình Văn Nghệ"
            data={dt}
            columns={columnsChuongTrinh}
            options={optionsChuongTrinh}
          />
        </Row>
      </div>
    </>
  );
}
