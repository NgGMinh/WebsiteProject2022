/* eslint-disable eqeqeq */
import { Done, ManageSearch } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import MuiDatatable from "../../../../../../components/table/MuiDatatable";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function TietMucVongMot(props) {
  const params = useParams();

  const dayjs = require("dayjs");

  const [tableBodyHeight, setTableBodyHeight] = useState("440px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [dataCaNhan, setDataCaNhan] = useState([]);
  const [dataDoiNhom, setDataDoiNhom] = useState([]);

  const [diem, setDiem] = useState();
  const [refresh, setRefresh] = useState(-1);

  const [diemSo, setDiemSo] = useState({});

  const [dataNguyenBan, setDataNguyenBan] = useState([]);

  const [batDau, setBatDau] = useState(null);
  const [ketThuc, setKetThuc] = useState(null);

  const handleFilter = () => {
    if (batDau == null) alert("Chưa chọn Ngày Bắt đầu!");
    else if (ketThuc == null) alert("Chưa chọn Ngày Kết thúc!");
    else {
      if (props.phanThi == 1) {
        Axios.post(
          `http://localhost:3001/api/client/tietmucchamdiemcuocthicanhan/${
            params.idCuocThi
          }/vongthi/1/giamkhao/${localStorage.getItem("MaNguoiDung")}/ngay`,
          {
            NgayBatDau: batDau,
            NgayKetThuc: ketThuc,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.DiemTrungBinh == null) d.DiemTrungBinh = "...";
            if (d.NgayGioThucHien == null) d.NgayGioThucHien = "Chưa sắp lịch";
            else {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "HH:mm, DD/MM/YYYY"
              );
            }
          });
          setDataCaNhan(data);
        });
      } else {
        Axios.post(
          `http://localhost:3001/api/client/tietmucchamdiemcuocthidoinhom/${
            params.idCuocThi
          }/vongthi/1/giamkhao/${localStorage.getItem("MaNguoiDung")}/ngay`,
          {
            NgayBatDau: batDau,
            NgayKetThuc: ketThuc,
          }
        ).then((response) => {
          const data = response.data;
          data.forEach((d) => {
            if (d.DiemTrungBinh == null) d.DiemTrungBinh = "...";
            if (d.NgayGioThucHien == null) d.NgayGioThucHien = "Chưa sắp lịch";
            else {
              d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
                "HH:mm, DD/MM/YYYY"
              );
            }
          });
          setDataDoiNhom(data);
        });
      }
    }
  };

  const handleChangeDiem = (idTM) => {
    Axios.post("http://localhost:3001/api/client/updatediemtietmuc", {
      idCuocThi: params.idCuocThi,
      idTietMuc: idTM,
      idGiamKhao: localStorage.getItem("MaNguoiDung"),
      DiemSo: diem,
    }).then((response) => {
      setRefresh(Math.random());
      setTimeout(() => {
        alert("Chấm điểm thành công !");
      }, 300);
    });
  };

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
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>{value}</div>;
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "15px" }}>STT</div>;
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
          return <div style={{ maxWidth: "180px" }}>{value}</div>;
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
      name: "NgayGioThucHien",
      label: "Ngày Thi",
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
      name: "TrinhBayBoi",
      label: "Trình Bày",
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
      name: "DiemTrungBinh",
      label: "Điểm TB",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ width: "65px", textAlign: "center" }}>
              {value == null ? "..." : value}
            </div>
          );
        },
      },
    },
    {
      name: "DiemSo",
      label: "Điểm Chấm",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          let max = tableMeta.rowData[8] * 10;
          let coTheCham = tableMeta.rowData[9];
          return (
            <>
              {tableMeta.rowData[10] == 1 ? (
                <div style={{ width: "85px", textAlign: "center" }}>{value}</div>
              ) : (
                <>
                  {coTheCham == 0 ? (
                    <div style={{ width: "85px", textAlign: "center" }}>...</div>
                  ) : (
                    <div style={{ display: "flex", width: "50px" }}>
                      <Form>
                        <Form.Control
                          type="number"
                          step="0.1"
                          min="0"
                          max={max}
                          value={diemSo[tableMeta.rowData[1] - 1]}
                          onChange={(e) => {
                            let arr = [...diemSo];
                            arr[tableMeta.rowData[1] - 1] = e.target.value;
                            setDiem(e.target.value);
                            setDiemSo(arr);
                            setTimeout(() => {
                              document.getElementById(
                                `button-save-${tableMeta.rowData[0]}`
                              ).style.display = "flex";
                            }, 100);
                          }}
                          id={`form-${tableMeta.rowData[0]}`}
                          onFocus={() => {
                            document.getElementById(
                              `button-save-${tableMeta.rowData[0]}`
                            ).style.display = "flex";
                            setDiem(value);
                          }}
                          onBlur={() => {
                            if (
                              document.getElementById(
                                `form-${tableMeta.rowData[0]}`
                              ).value == "" ||
                              diem == value
                            ) {
                              document.getElementById(
                                `button-save-${tableMeta.rowData[0]}`
                              ).style.display = "none";
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // eslint-disable-next-line eqeqeq
                              if (
                                diem < 0 ||
                                diem > max ||
                                diem == null ||
                                diem == undefined ||
                                diem == ""
                              ) {
                                if (diem < 0)
                                  alert(`Điểm không được nhỏ hơn 0 !`);
                                if (
                                  diem == null ||
                                  diem == undefined ||
                                  diem == ""
                                )
                                  alert(`Điểm không hợp lệ !`);
                                if (diem > max)
                                  alert(
                                    `Điểm không hợp lệ! Thang điểm tối đa là: ${max}`
                                  );
                                e.preventDefault();
                              } else {
                                handleChangeDiem(tableMeta.rowData[0]);
                                document.getElementById(
                                  `button-save-${tableMeta.rowData[0]}`
                                ).style.display = "none";
                                e.preventDefault();
                              }
                            }
                          }}
                          style={{ textAlign: "center", width: "90px" }}
                        />
                      </Form>
                      &nbsp;&nbsp;
                      <MuiToolTip title="Save">
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          id={`button-save-${tableMeta.rowData[0]}`}
                          style={{ display: "none" }}
                          onClick={(e) => {
                            if (diem < 0 || diem > tableMeta.rowData[8] * 10) {
                              if (diem < 0)
                                alert(`Điểm không được nhỏ hơn 0 !`);

                              if (diem > tableMeta.rowData[8] * 10)
                                alert(
                                  `Điểm không hợp lệ! Thang điểm tối đa là: ${
                                    tableMeta.rowData[8] * 10
                                  }`
                                );
                              e.preventDefault();
                            } else {
                              handleChangeDiem(tableMeta.rowData[0]);
                              document.getElementById(
                                `button-save-${tableMeta.rowData[0]}`
                              ).style.display = "none";
                              e.preventDefault();
                            }
                          }}
                        >
                          <Done color="success" />
                        </IconButton>
                      </MuiToolTip>
                    </div>
                  )}
                </>
              )}
            </>
          );
        },
      },
    },
    {
      name: "MaThangDiem",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    {
      name: "CoTheCham",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    {
      name: "CongBoKetQua",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
  ];

  const optionsTietMuc = {
    search: true,
    searchPlaceholder: "Tên Tiết mục, Loại tiết mục, Ngày thi,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPage,
    selectableRows: "none",
    page: page,
    onChangePage: (number) => {
      setPage(number);
    },
    setCellProps: () => ({ align: "right" }),
    onChangeRowsPerPage: (number) => {
      if (number > 5) {
        setTableBodyHeight("auto");
        setRowsPerPage(number);
      } else {
        setTableBodyHeight("auto");
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

  useEffect(() => {
    if (props.phanThi == 1) {
      const getDataCuocThiTuDoCaNhan = async () => {
        const { data } = await Axios.post(
          `http://localhost:3001/api/client/tietmucchamdiemcuocthicanhan/${
            params.idCuocThi
          }/vongthi/1/giamkhao/${localStorage.getItem("MaNguoiDung")}`
        );
        let arr = [];
        data.forEach((d) => {
          let d1 = new Date(dayjs(d.NgayGioThucHien).format("YYYY-MM-DDTHH:MM"));
          let d2 = new Date();
          if (d1.getTime() <= d2.getTime()) d.CoTheCham = 1;
          else d.CoTheCham = 0;
          if (d.DiemTrungBinh == null) d.DiemTrungBinh = "...";
          if (d.NgayGioThucHien == null) d.NgayGioThucHien = "Chưa sắp lịch";
          else {
            d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
              "HH:mm, DD/MM/YYYY"
            );
          }
          arr.push(d.DiemSo);
        });
        setDiemSo(arr);
        setDataNguyenBan(data);
        setDataCaNhan(data);
      };
      getDataCuocThiTuDoCaNhan();
    } else {
      const getDataCuocThiTuDoDoiNhom = async () => {
        const { data } = await Axios.post(
          `http://localhost:3001/api/client/tietmucchamdiemcuocthidoinhom/${
            params.idCuocThi
          }/vongthi/1/giamkhao/${localStorage.getItem("MaNguoiDung")}`
        );
        let arr = [];

        data.forEach((d) => {
          let d1 = new Date(dayjs(d.NgayGioThucHien).format("YYYY-MM-DD"));
          let d2 = new Date();
          if (d1.getTime() <= d2.getTime()) d.CoTheCham = 1;
          else d.CoTheCham = 0;
          if (d.DiemTrungBinh == null) d.DiemTrungBinh = "...";
          if (d.NgayGioThucHien == null) d.NgayGioThucHien = "Chưa sắp lịch";
          else {
            d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
              "HH:mm, DD/MM/YYYY"
            );
          }
          arr.push(d.DiemSo);
        });
        setDiemSo(arr);
        setDataNguyenBan(data);
        setDataDoiNhom(data);
      };
      getDataCuocThiTuDoDoiNhom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <>
      {load ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
          }}
        >
          <Spinner
            animation="border"
            variant="primary"
            id="spinner"
            style={{
              position: "absolute",
              top: "38%",
              left: "49%",
              width: "50px",
              height: "50px",
            }}
          />
        </div>
      ) : (
        <>
          {props.phanThi == 1 ? (
            <>
              {/* Bảng Tiết Mục */}
              <Row className="d-flex align-items-center py-2">
                <Col
                  xs="12"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ManageSearch /> &nbsp;LỌC THEO THỜI GIAN: &nbsp;
                  </div>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    id="ngaybatdau"
                  >
                    <DesktopDatePicker
                      inputFormat="DD/MM/YYYY"
                      value={batDau}
                      maxDate={ketThuc}
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
                      setDataCaNhan(dataNguyenBan);
                      setBatDau(null);
                      setKetThuc(null);
                    }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
              <Row style={{ padding: "0px 12px" }}>
                <MuiDatatable
                  title="Danh Sách Tiết Mục Dự Thi"
                  data={dataCaNhan}
                  columns={columnsTietMuc}
                  options={optionsTietMuc}
                />
              </Row>
            </>
          ) : (
            <>
              {/* Bảng Tiết Mục */}
              <Row className="d-flex align-items-center py-2">
                <Col
                  xs="12"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ManageSearch /> &nbsp;LỌC THEO THỜI GIAN: &nbsp;
                  </div>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    id="ngaybatdau"
                  >
                    <DesktopDatePicker
                      inputFormat="DD/MM/YYYY"
                      value={batDau}
                      maxDate={ketThuc}
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
                      setDataDoiNhom(dataNguyenBan);
                      setBatDau(null);
                      setKetThuc(null);
                    }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
              <Row style={{ padding: "0px 12px" }}>
                <MuiDatatable
                  title="Danh Sách Tiết Mục Dự Thi"
                  data={dataDoiNhom}
                  columns={columnsTietMuc}
                  options={optionsTietMuc}
                />
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
}
