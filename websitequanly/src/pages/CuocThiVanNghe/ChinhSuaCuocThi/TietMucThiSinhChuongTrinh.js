/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../CuocThiVanNghe.css";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  MusicNote,
  Add,
  Edit,
  LockOpen,
  Lock,
  ImportExport,
  Visibility,
} from "@mui/icons-material";
import MuiDatatable from "../../../components/table/MuiDatatable";
import { IconButton, Tooltip as MuiToolTip } from "@mui/material";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Button } from "@mui/material";

export default function TietMucThiSinhChuongTrinh(props) {
  const params = useParams();
  const navigate = useNavigate();

  const [tableBodyHeight, setTableBodyHeight] = useState("470px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const dayjs = require("dayjs");
  const XLSX = require("xlsx");

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClickDownloadIcon = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleCloseDownloadIcon = () => {
  //   setAnchorEl(null);
  // };

  // const [tenCuocThi, setTenCuocThi] = useState();
  // const [trangThai, setTrangThai] = useState(1);
  // //   const [phanThi, setPhanThi] = useState(1);
  // const [ngayBatDau, setNgayBatDau] = useState("");
  // const [ngayKetThuc, setNgayKetThuc] = useState("");
  // const [soVongThi, setSoVongThi] = useState(1);
  // const [thangDiem, setThangDiem] = useState();
  // const [noiDungCuocThi, setNoiDungCuocThi] = useState("");
  // const [diaDiemToChuc, setDiaDiemToChuc] = useState();
  const [chuaCongBo, setChuaCongBo] = useState(0);

  const [dataNguyenBan, setDataNguyenBan] = useState([]);

  const [dataChiTietChuongTrinh, setDataChiTietChuongTrinh] = useState([]);

  const [batDau, setBatDau] = useState(null);
  const [ketThuc, setKetThuc] = useState(null);

  const handleFilter = () => {
    if (batDau == null) alert("Chưa chọn Ngày Bắt đầu!");
    else if (ketThuc == null) alert("Chưa chọn Ngày Kết thúc!");
    else {
      Axios.post(
        `http://localhost:3001/api/admin/chuongtrinhthuoccuocthi/${params.idCuocThi}/ngay`,
        {
          NgayBatDau: batDau,
          NgayKetThuc: ketThuc,
        }
      ).then((response) => {
        console.log(response.data);
        const data = response.data;
        data.forEach((d) => {
          if (d.NgayGioToChuc == null) {
            d.NgayGioToChuc = "Chưa sắp lịch";
            d.NgayToChuc = "Chưa sắp lịch";
          } else {
            d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format(
              "HH:mm, DD/MM/YYYY"
            );
            d.NgayToChuc = dayjs(d.NgayToChuc).format("DD/MM/YYYY");
          }
          d.DiemTrungBinh =
            d.DiemTrungBinh == null ? "Chưa chấm" : d.DiemTrungBinh;
          d.TenGiaiThuong =
            d.DiemTrungBinh == "Chưa chấm" ? "Chưa xét" : d.TenGiaiThuong;
          if (d.CongBoKetQua == 0) setChuaCongBo(chuaCongBo + 1);
        });
        setDataChuongTrinh(data);
        setPage(0);
      });
    }
  };

  const [dataChuongTrinh, setDataChuongTrinh] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [refresh, setRefresh] = useState(-1);

  // useEffect(() => {
  //   const getDataChiTietCuocThi = async () => {
  //     const { data } = await Axios.post(
  //       `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
  //     );
  //     setTenCuocThi(data[0].TenCuocThi);
  //     setNoiDungCuocThi(data[0].NoiDungCuocThi);
  //     setDiaDiemToChuc({ value: data[0].MaDiaDiem, label: data[0].TenDiaDiem });
  //     setNgayBatDau(dayjs(data[0].NgayBatDau).format("YYYY-MM-DD"));
  //     setNgayKetThuc(dayjs(data[0].NgayKetThuc).format("YYYY-MM-DD"));
  //     setSoVongThi(data[0].SoVongThi);
  //     setThangDiem({ value: data[0].MaThangDiem, label: data[0].TenThangDiem });
  //     setTrangThai({ value: data[0].MaTrangThai, label: data[0].TenTrangThai });
  //   };
  //   getDataChiTietCuocThi();
  // }, [refresh]);

  useEffect(() => {
    const getDataChuongTrinhThuocCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chuongtrinhthuoccuocthi/${params.idCuocThi}`
      );
      data.forEach((d) => {
        if (d.NgayGioToChuc == null) {
          d.NgayGioToChuc = "Chưa sắp lịch";
          d.NgayToChuc = "Chưa sắp lịch";
        } else {
          d.NgayGioToChuc = dayjs(d.NgayGioToChuc).format("HH:mm, DD/MM/YYYY");
          d.NgayToChuc = dayjs(d.NgayToChuc).format("DD/MM/YYYY");
        }
        if (d.DiemTrungBinh == null) {
          d.DiemTrungBinh = "";
          d.ChamDiem = "Chưa chấm";
        } else {
          d.ChamDiem = "Đã chấm";
        }
        d.TenGiaiThuong = d.DiemTrungBinh == "" ? "Chưa xét" : d.TenGiaiThuong;
        if (d.CongBoKetQua == 0) setChuaCongBo(chuaCongBo + 1);
      });
      setDataChuongTrinh(data);
      setDataNguyenBan(data);
    };
    getDataChuongTrinhThuocCuocThi();
  }, [refresh]);

  useEffect(() => {
    const getDataChuongTrinhThuocCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/chuongtrinhthuoccuocthi/chitiet/${params.idCuocThi}`
      );
      setDataChiTietChuongTrinh(data);
    };
    getDataChuongTrinhThuocCuocThi();
  }, [refresh]);

  const columnsChuongTrinh = [
    // ID
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
        sortDescFirst: true,
        sortThirdClickReset: true,
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "35px" }}>{value}</div>;
        },
      },
    },
    //Tên Chương Trình
    {
      name: "TenChuongTrinh",
      label: "Tên Chương Trình",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "240px" }}>{value}</div>;
        },
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "NgayToChuc",
      label: "Ngày Thi",
      options: {
        display: false,
        viewColumns: false,
        sort: false,
        disableColumnMenu: false,
        download: false,
        print: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
        filterOptions: { fullWidth: true },
        filterType: "multiselect",
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },
    //Ngày Giờ Tổ Chức
    {
      name: "NgayGioToChuc",
      label: "Thời Gian Thi",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },
    //Thuộc Khoa
    {
      name: "TenDonVi",
      label: "Đơn vị Tổ chức",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "220px" }}>{value}</div>;
        },
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "ChanDiem",
      label: "Chấm Điểm",
      options: {
        display: false,
        filter: true,
        filterOptions: { fullWidth: true },
        viewColumns: false,
        sort: false,
        disableColumnMenu: false,
      },
    },
    //Điểm Trung Bình
    {
      name: "DiemTrungBinh",
      label: "Điểm TB",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value == "" ? "Chưa chấm" : value}</div>;
        },
        filter: false,
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },
    //Giải Thưởng
    {
      name: "TenGiaiThuong",
      label: "Giải Thưởng",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {value == "Chưa xét" ? (
                <div>Chưa xét</div>
              ) : value == "Không có giải" ? (
                <div style={{ fontWeight: "600" }} className="text-muted">
                  {value}
                </div>
              ) : (
                <div style={{ fontWeight: "600" }} className="text-success">
                  {value}
                </div>
              )}
            </>
          );
        },
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
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
            <MuiToolTip title={props.trangThai < 3 ? "Edit" : "View Detail"}>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  navigate(`chinhsuachuongtrinh/${tableMeta.rowData[0]}`);
                }}
                className={props.trangThai < 3 ? "edit-hover" : "icon-hover"}
              >
                {props.trangThai < 3 ? <Edit /> : <Visibility />}
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
    customToolbar: () => {
      return (
        <>
          <MuiToolTip title={"Xuất Danh Sách Chi Tiết"}>
            <IconButton
              className="icon-hover"
              onClick={handleDownLoadDanhSachChiTietChuongTrinh}
            >
              <ImportExport />
            </IconButton>
          </MuiToolTip>
          {props.trangThai > 1 ? (
            <></>
          ) : (
            <MuiToolTip title={"Thêm Chương Trình"}>
              <IconButton
                className="icon-hover"
                onClick={() => {
                  navigate("themchuongtrinhduthi");
                }}
              >
                <Add />
              </IconButton>
            </MuiToolTip>
          )}
        </>
      );
    },
    page: page,
    onChangePage: (number) => {
      setPage(number);
    },
    onChangeRowsPerPage: (number) => {
      if (number > 5) {
        setTableBodyHeight("auto");
        setRowsPerPage(number);
      } else {
        setTableBodyHeight("470px");
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

      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);

      const fileName = `DanhSachChuongTrinh`;
      const ws = utils.json_to_sheet(json);
      const header = Object.keys(json[0]); // columns name
      var wscols = [];
      for (var i = 0; i < header.length; i++) {
        // columns length added
        wscols.push({ wch: header[i].length + 10 });
      }
      ws["!cols"] = wscols;
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      saveAs(data, fileName + fileExtension);

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

  const handleChangeCongBo = (cb) => {
    Axios.post(
      `http://localhost:3001/api/admin/updatecongbo/thichuongtrinh/${params.idCuocThi}`,
      {
        CongBoKetQua: cb,
      }
    ).then((response) => {
      setChuaCongBo(0);
      props.setRefresh(Math.random());
    });
  };

  // const handleDownLoadDanhSachChuongTrinh = () => {
  //   let json = [];
  //   dataChuongTrinh.forEach((d) => {
  //     json.push({
  //       STT: d.stt,
  //       "Tên Chương Trình": d.TenChuongTrinh,
  //       "Thời Gian Thi": d.NgayGioToChuc,
  //       "Đơn vị Tổ chức": d.TenDonVi,
  //       Điểm: d.DiemTrungBinh,
  //       "Giải Thưởng": d.TenGiaiThuong,
  //     });
  //   });
  //   const fileExtension = ".xlsx";

  //   const workbook = XLSX.utils.book_new();

  //   let data = utils.json_to_sheet(json);

  //   const header = Object.keys(json[0]);
  //   var wscols = [];
  //   for (var i = 0; i < header.length; i++) {
  //     wscols.push({ wch: header[i].length + 10 });
  //   }
  //   data["!cols"] = wscols;
  //   XLSX.utils.book_append_sheet(workbook, data, "DanhSachChuongTrinh");
  //   const fileName = `DanhSachChuongTrinh`;
  //   XLSX.writeFile(workbook, fileName + fileExtension, { compression: true });
  // };

  const handleDownLoadDanhSachChiTietChuongTrinh = () => {
    let json = [];
    dataChuongTrinh.forEach((d) => {
      json.push({
        "Tên Chương Trình": d.TenChuongTrinh,
        "Thời Gian Thi": d.NgayGioToChuc,
        "Đơn vị Tổ chức": d.TenDonVi,
        "Điểm Trung Bình": d.DiemTrungBinh,
        "Giải Thưởng": d.TenGiaiThuong,
      });
    });
    const fileExtension = ".xlsx";
    // console.log(values.forEach((val) => console.log(val)));
    const workbook = XLSX.utils.book_new();

    json.forEach((t) => {
      let arr = [];
      arr.push({
        "Tên Chương Trình": t["Tên Chương Trình"],
        "Thời Gian Thi": t["Thời Gian Thi"],
        "Đơn vị Tổ chức": t["Đơn vị Tổ chức"],
        "Điểm Trung Bình": t["Điểm Trung Bình"],
        "Giải Thưởng": t["Giải Thưởng"],
      });

      let ctct = dataChiTietChuongTrinh.filter((d) => {
        return d["Tên Chương Trình"] == t["Tên Chương Trình"];
      });

      let arr2 = [];
      ctct.forEach((d) => {
        let narr = [];
        narr.push({
          "Tên Tiết Mục": d["Tên Tiết Mục"],
          "Loại Tiết Mục": d["Loại Tiết Mục"],
          "Nhân Số": d["Nhân Số"],
          "Điểm Thi": d["Điểm Thi"],
        });
        arr2.push(narr[0]);
      });

      let data = utils.json_to_sheet(arr);
      XLSX.utils.sheet_add_json(data, arr2, {
        origin: "A4",
      });

      const header = Object.keys(arr[0]); // columns name
      var wscols = [];
      for (var i = 0; i < header.length; i++) {
        // columns length added
        wscols.push({ wch: header[i].length + 10 });
      }
      data["!cols"] = wscols;

      // console.log(utils.json_to_sheet(arr));
      XLSX.utils.book_append_sheet(
        workbook,
        data,
        t["Đơn vị Tổ chức"].length > 31
          ? `${t["Đơn vị Tổ chức"].slice(0, 28)}...`
          : t["Đơn vị Tổ chức"]
      );
    });

    const fileName = `DanhSachChiTietChuongTrinh`;
    XLSX.writeFile(workbook, fileName + fileExtension, { compression: true });
    // saveAs(data, fileName + fileExtension);
    // cancel default  CSV download from table
    return false;
  };

  useEffect(() => {
    document.getElementById("cuocthivannghe").classList.add("actives");
    document.title = "Chỉnh Sửa Cuộc Thi";
  }, []);

  return (
    <>
      <div>
        {/* Thêm Chương Trình */}
        <h2 className="text-center d-flex align-items-center justify-content-center py-2">
          <MusicNote style={{ fontSize: "2.6rem" }} /> Chương Trình Dự Thi
          <MusicNote style={{ fontSize: "2.6rem" }} />
        </h2>

        {/* Bảng Chương Trình */}
        <Row className="d-flex align-items-center">
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
              {chuaCongBo > 0 ? "Công Bố Kết Quả" : "Khóa Công Bố Kết Quả"}
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
            <LocalizationProvider dateAdapter={AdapterDayjs} id="ngaybatdau">
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
                setDataChuongTrinh(dataNguyenBan);
                setBatDau(null);
                setKetThuc(null);
                setPage(0);
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
        <Row style={{ padding: "0px 12px" }}>
          <MuiDatatable
            title="Danh Sách Chương Trình Dự Thi"
            data={dataChuongTrinh}
            columns={columnsChuongTrinh}
            options={optionsChuongTrinh}
          />
        </Row>
      </div>
    </>
  );
}
