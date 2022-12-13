/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import {
  Add,
  Edit,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
  Lock,
  LockOpen,
  Visibility,
} from "@mui/icons-material";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import MuiDatatable from "../../../../components/table/MuiDatatable";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function TietMucThiSinhVongChungKhao(props) {
  const navigate = useNavigate();
  const params = useParams();

  const dayjs = require("dayjs");

  const [dataThiSinh, setDataThiSinh] = useState([]);
  const [dataCaNhan, setDataCaNhan] = useState([]);
  const [dataDoiNhom, setDataDoiNhom] = useState([]);

  const [chuaCongBo, setChuaCongBo] = useState(0);

  const [refresh, setRefresh] = useState(-1);

  const [tableBodyHeightTS, setTableBodyHeightTS] = useState("450px");
  const [rowsPerPageTS, setRowsPerPageTS] = useState(5);
  const [pageTS, setPageTS] = useState(0);

  const [tableBodyHeightTM, setTableBodyHeightTM] = useState(
    props.phanThi == 1 ? "500px" : "600px"
  );
  const [rowsPerPageTM, setRowsPerPageTM] = useState(5);
  const [pageTM, setPageTM] = useState(0);

  const [dataNguyenBan, setDataNguyenBan] = useState([]);

  const [batDau, setBatDau] = useState(null);
  const [ketThuc, setKetThuc] = useState(null);

  const [coDiem, setCoDiem] = useState(false);

  const handleFilterCN = () => {
    if (batDau == null) alert("Chưa chọn Ngày Bắt đầu!");
    else if (ketThuc == null) alert("Chưa chọn Ngày Kết thúc!");
    else {
      Axios.post(
        `http://localhost:3001/api/admin/tietmucthuoccuocthicanhan/${params.idCuocThi}/vongthi/2/ngay`,
        {
          NgayBatDau: batDau,
          NgayKetThuc: ketThuc,
        }
      ).then((response) => {
        const data = response.data;
        setChuaCongBo(0);
        data.forEach((d) => {
          if (d.NgayGioThucHien == null) {
            d.NgayGioThucHien = "Chưa sắp lịch";
            d.SapLich = "Chưa sắp lịch";
          } else {
            d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
              "HH:mm, DD/MM/YYYY"
            );
            d.SapLich = "Đã sắp lịch";
          }

          if (d.DiemTrungBinh == null) {
            d.DiemTrungBinh = "Chưa chấm";
          } else {
            setCoDiem(true);
          }

          if (d.TrangThai == 1) d.TrangThai = "Đạt";
          if (d.TrangThai == null && d.DiemTrungBinh != "Chưa chấm")
            d.TrangThai = "Không Đạt";
          if (d.TrangThai == null && d.DiemTrungBinh == "Chưa chấm")
            d.TrangThai = "Chưa xét";

          if (d.CongBoKetQua == 0) setChuaCongBo(chuaCongBo + 1);
        });
        setDataCaNhan(data);
        setPageTM(0);
      });
    }
  };

  const handleFilterDN = () => {
    if (batDau == null) alert("Chưa chọn Ngày Bắt đầu!");
    else if (ketThuc == null) alert("Chưa chọn Ngày Kết thúc!");
    else {
      Axios.post(
        `http://localhost:3001/api/admin/tietmucthuoccuocthidoinhom/${params.idCuocThi}/vongthi/2/ngay`,
        {
          NgayBatDau: batDau,
          NgayKetThuc: ketThuc,
        }
      ).then((response) => {
        const data = response.data;
        setChuaCongBo(0);
        data.forEach((d) => {
          if (d.NgayGioThucHien == null) {
            d.NgayGioThucHien = "Chưa sắp lịch";
            d.SapLich = "Chưa sắp lịch";
          } else {
            d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
              "HH:mm, DD/MM/YYYY"
            );
            d.SapLich = "Đã sắp lịch";
          }

          if (d.DiemTrungBinh == null) {
            d.DiemTrungBinh = "Chưa chấm";
          } else {
            setCoDiem(true);
          }

          if (d.TrangThai == 1) d.TrangThai = "Đạt";
          if (d.TrangThai == null && d.DiemTrungBinh != "Chưa chấm")
            d.TrangThai = "Không Đạt";
          if (d.TrangThai == null && d.DiemTrungBinh == "Chưa chấm")
            d.TrangThai = "Chưa xét";

          if (d.CongBoKetQua == 0) setChuaCongBo(chuaCongBo + 1);
        });
        setDataDoiNhom(data);
        setPageTM(0);
      });
    }
  };

  const handleChangeCongBo = (cb) => {
    Axios.post(
      `http://localhost:3001/api/admin/updatecongbo/tudo/${params.idCuocThi}/2`,
      {
        CongBoKetQua: cb,
      }
    ).then((response) => {
      setChuaCongBo(0);
      setRefresh(Math.random());
    });
  };

  const handleChangeKetQua = (idTM, kq) => {
    Axios.post(
      `http://localhost:3001/api/admin/updatetrangthaitietmuc/${params.idCuocThi}/2`,
      {
        MaTietMuc: idTM,
        TrangThai: kq,
      }
    ).then((response) => {
      setRefresh(Math.random());
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
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ marginLeft: "10px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ textAlign: "center", width: "50px" }}>{value}</div>
          );
        },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenTietMuc",
      label: "Tên Tiết Mục",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "200px" }}>{value}</div>;
        },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenLoaiTietMuc",
      label: "Loại",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "SapLich",
      label: "Sắp Lịch",
      options: {
        display: false,
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        viewColumns: false,
        download: false,
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
          return <div style={{ maxWidth: "240px" }}>{value}</div>;
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
            <div style={{ width: "60px", textAlign: "center" }}>{value}</div>
          );
        },
      },
    },
    {
      name: "TrangThai",
      label: "Kết Quả",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        filter: props.soVongThi == 2 ? false : true,
        sortThirdClickReset: true,
        sortDescFirst: true,
        display: props.soVongThi == 2 ? false : true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {value == "Đạt" ? (
                <div style={{ fontWeight: "600" }} className="text-success">
                  {value}
                </div>
              ) : (
                <div style={{ fontWeight: "600" }} className="text-danger">
                  {value}
                </div>
              )}
            </>
          );
        },
      },
    },
    {
      name: "TenGiaiThuong",
      label: "Kết Quả",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        filter: props.soVongThi == 2 ? true : false,
        display: props.soVongThi == 2 ? true : false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {value == "Không có giải" ? (
                <div style={{ fontWeight: "600" }} className="text-muted">{value}</div>
              ) : (
                <div style={{ fontWeight: "600" }} className="text-success">
                  {value}
                </div>
              )}
            </>
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
            <>
              {props.trangThai < 3 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "18px",
                  }}
                >
                  {props.soVongThi == 2 ? (
                    <></>
                  ) : (
                    <>
                      {tableMeta.rowData[8] == "Đạt" ? (
                        <MuiToolTip title="Không Đạt">
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            color="error"
                            onClick={() =>
                              handleChangeKetQua(tableMeta.rowData[0], null)
                            }
                          >
                            <KeyboardDoubleArrowDown />
                          </IconButton>
                        </MuiToolTip>
                      ) : (
                        <MuiToolTip title="Đạt">
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            color="success"
                            onClick={() =>
                              handleChangeKetQua(tableMeta.rowData[0], 1)
                            }
                          >
                            <KeyboardDoubleArrowUp />
                          </IconButton>
                        </MuiToolTip>
                      )}
                    </>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <MuiToolTip title="Edit">
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      className="edit-hover"
                      onClick={() => {
                        if (props.phanThi == 1)
                          navigate(
                            `canhan/chinhsuatietmuc/${tableMeta.rowData[0]}`
                          );
                        if (props.phanThi == 2)
                          navigate(
                            `doinhom/chinhsuatietmuc/${tableMeta.rowData[0]}`
                          );
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </MuiToolTip>
                </div>
              ) : (
                <MuiToolTip title="View Detail">
                  <IconButton
                    edge="end"
                    aria-label="view"
                    className="icon-hover"
                    onClick={() => {
                      if (props.phanThi == 1)
                        navigate(
                          `canhan/chinhsuatietmuc/${tableMeta.rowData[0]}`
                        );
                      if (props.phanThi == 2)
                        navigate(
                          `doinhom/chinhsuatietmuc/${tableMeta.rowData[0]}`
                        );
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </MuiToolTip>
              )}
            </>
          );
        },
      },
    },
  ];

  const optionsTietMuc = {
    search: true,
    searchPlaceholder: "Tên Tiết mục, Loại, Ngày diễn,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPageTM,
    selectableRows: "none",
    customToolbar: () => {
      return (
        <>
          {coDiem ? (
            <></>
          ) : (
            <MuiToolTip title={"Thêm Tiết Mục"}>
              <IconButton
                className="icon-hover"
                onClick={() => {
                  if (props.phanThi == 1) {
                    navigate(
                      `/themtietmuccuocthi/canhan/${params.idCuocThi}/vongthi/2`
                    );
                  } else {
                    navigate(
                      `/themtietmuccuocthi/doinhom/${params.idCuocThi}/vongthi/2`
                    );
                  }
                }}
              >
                <Add />
              </IconButton>
            </MuiToolTip>
          )}
        </>
      );
    },
    page: pageTM,
    onChangePage: (number) => {
      setPageTM(number);
    },
    onChangeRowsPerPage: (number) => {
      if (number > 5) {
        setTableBodyHeightTM("auto");
        setRowsPerPageTM(number);
      } else {
        setTableBodyHeightTM(props.phanThi == 1 ? "500px" : "600px");
        setRowsPerPageTM(number);
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
      options: {
        filter: false,
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ marginLeft: "10px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ textAlign: "center", width: "50px" }}>{value}</div>
          );
        },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenThiSinh",
      label: "Họ Tên",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "GioiTinh",
      label: "Giới Tính",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "MaDinhDanh",
      label: "Mã Định Danh",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "Email",
      label: "Email Thí Sinh",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "Phone",
      label: "Phone",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenDonVi",
      label: "Thuộc Đơn Vị",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "220px" }}>{value}</div>;
        },
      },
    },
  ];

  const optionsThiSinh = {
    search: true,
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPageTS,
    selectableRows: "none",
    page: pageTS,
    onChangePage: (number) => {
      setPageTS(number);
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

      const fileName = `DanhSachThiSinh`;
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
          `http://localhost:3001/api/admin/tietmucthuoccuocthicanhan/${params.idCuocThi}/vongthi/2`
        );
        data.forEach((d) => {
          if (d.NgayGioThucHien == null) {
            d.NgayGioThucHien = "Chưa sắp lịch";
            d.SapLich = "Chưa sắp lịch";
          } else {
            d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
              "HH:mm, DD/MM/YYYY"
            );
            d.SapLich = "Đã sắp lịch";
          }

          if (d.DiemTrungBinh == null) {
            d.DiemTrungBinh = "Chưa chấm";
          } else {
            setCoDiem(true);
          }

          if (d.TrangThai == 1) d.TrangThai = "Đạt";
          if (d.TrangThai == null && d.DiemTrungBinh != "Chưa chấm")
            d.TrangThai = "Không Đạt";
          if (d.TrangThai == null && d.DiemTrungBinh == "Chưa chấm")
            d.TrangThai = "Chưa xét";

          if (d.CongBoKetQua == 0) setChuaCongBo(chuaCongBo + 1);
        });
        setDataNguyenBan(data);
        setDataCaNhan(data);
      };
      getDataCuocThiTuDoCaNhan();
    } else {
      const getDataCuocThiTuDoDoiNhom = async () => {
        const { data } = await Axios.post(
          `http://localhost:3001/api/admin/tietmucthuoccuocthidoinhom/${params.idCuocThi}/vongthi/2`
        );
        data.forEach((d) => {
          if (d.NgayGioThucHien == null) {
            d.NgayGioThucHien = "Chưa sắp lịch";
            d.SapLich = "Chưa sắp lịch";
          } else {
            d.NgayGioThucHien = dayjs(d.NgayGioThucHien).format(
              "HH:mm, DD/MM/YYYY"
            );
            d.SapLich = "Đã sắp lịch";
          }

          if (d.DiemTrungBinh == null) {
            d.DiemTrungBinh = "Chưa chấm";
          } else {
            setCoDiem(true);
          }

          if (d.TrangThai == 1) d.TrangThai = "Đạt";
          if (d.TrangThai == null && d.DiemTrungBinh != "Chưa chấm")
            d.TrangThai = "Không Đạt";
          if (d.TrangThai == null && d.DiemTrungBinh == "Chưa chấm")
            d.TrangThai = "Chưa xét";

          if (d.CongBoKetQua == 0) setChuaCongBo(chuaCongBo + 1);
        });
        setDataNguyenBan(data);
        setDataDoiNhom(data);
      };
      getDataCuocThiTuDoDoiNhom();
    }
  }, [props.phanThi, refresh]);

  useEffect(() => {
    if (props.phanThi == 1) {
      const getDataThiSinhCuocThiCaNhan = async () => {
        const { data } = await Axios.post(
          `http://localhost:3001/api/admin/thisinhcuocthicanhan/${params.idCuocThi}/vongthi/2`
        );
        data.forEach((d) => {
          d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ";
          if (d.MaDinhDanh == null || d.MaDinhDanh == "") {
            d.MaDinhDanh = "Không có";
          }
        });
        setDataThiSinh(data);
      };
      getDataThiSinhCuocThiCaNhan();
    }

    if (props.phanThi == 2) {
      const getDataThiSinhCuocThiDoiNhom = async () => {
        const { data } = await Axios.post(
          `http://localhost:3001/api/admin/thisinhcuocthidoinhom/${params.idCuocThi}/vongthi/2`
        );
        data.forEach((d) => {
          d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ";
          if (d.MaDinhDanh == null || d.MaDinhDanh == "") {
            d.MaDinhDanh = "Không có";
          }
        });
        setDataThiSinh(data);
      };
      getDataThiSinhCuocThiDoiNhom();
    }
  }, [props.phanThi, refresh]);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 300);
  }, [refresh]);

  return (
    <Tabs defaultActiveKey="tietmucvongloai" className="my-3 responsive-tab">
      <Tab eventKey="tietmucvongloai" title="Tiết Mục Dự Thi">
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
            {props.phanThi == 1 ? (
              <>
                {/* Bảng Tiết Mục */}
                <Row className="d-flex align-items-center pt-2">
                  <Col xs="12" md="4">
                    <Button
                      variant="contained"
                      style={{
                        background: "#00bfa5",
                      }}
                      startIcon={chuaCongBo > 0 ? <LockOpen /> : <Lock />}
                      onClick={() => {
                        if (chuaCongBo > 0) {
                          handleChangeCongBo(1);
                        } else {
                          handleChangeCongBo(0);
                        }
                      }}
                    >
                      {chuaCongBo > 0
                        ? "Công Bố Kết Quả"
                        : "Khóa Công Bố Kết Quả"}
                    </Button>
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
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
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
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    &nbsp;
                    <Button
                      variant="contained"
                      sx={{ padding: "7px 10px 5px 10px" }}
                      onClick={handleFilterCN}
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
                        setPageTM(0);
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
                <Row className="d-flex align-items-center pt-2">
                  <Col xs="12" md="4">
                    <Button
                      variant="contained"
                      style={{
                        background: "#00bfa5",
                      }}
                      startIcon={chuaCongBo > 0 ? <LockOpen /> : <Lock />}
                      onClick={() => {
                        if (chuaCongBo > 0) {
                          handleChangeCongBo(1);
                        } else {
                          handleChangeCongBo(0);
                        }
                      }}
                    >
                      {chuaCongBo > 0
                        ? "Công Bố Kết Quả"
                        : "Khóa Công Bố Kết Quả"}
                    </Button>
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
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
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
                          <TextField
                            {...params}
                            size="small"
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    &nbsp;
                    <Button
                      variant="contained"
                      sx={{ padding: "7px 10px 5px 10px" }}
                      onClick={handleFilterDN}
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
                        setPageTM(0);
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
      </Tab>

      <Tab eventKey="nguoithamduvongloai" title="Thí Sinh Tham Dự">
        {/* Bảng Sinh Viên Tham Dự */}
        <Row style={{ padding: "15px 12px" }}>
          <MuiDatatable
            title="Danh Sách Thí Sinh Tham Dự"
            data={dataThiSinh}
            columns={columnsThiSinh}
            options={optionsThiSinh}
          />
        </Row>
      </Tab>
    </Tabs>
  );
}
