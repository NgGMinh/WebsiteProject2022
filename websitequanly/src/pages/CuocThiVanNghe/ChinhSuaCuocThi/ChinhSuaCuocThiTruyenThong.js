/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Form, Row, Col, Breadcrumb, Modal, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../CuocThiVanNghe.css";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MusicNote,
  LibraryMusic,
  EditLocationAlt,
  HourglassTop,
  HourglassBottom,
  NoteAlt,
  Radio,
  BallotRounded,
  Add,
  Edit,
  AppRegistration,
  Mail,
  Delete,
  LockOpen,
  Lock,
} from "@mui/icons-material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import MuiDatatable from "../../../components/table/MuiDatatable";
import { IconButton, Tooltip as MuiToolTip } from "@mui/material";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Button } from "@mui/material";

export default function ChinhSuaCuocThiTruyenThong() {
  const defaultFonts = [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
  ];

  const sortedFontOptions = [
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
    ...defaultFonts,
  ].sort();

  const params = useParams();
  const navigate = useNavigate();

  const [tableBodyHeight, setTableBodyHeight] = useState("470px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const dayjs = require("dayjs");

  const dataThangDiem = [
    { value: 1, label: "Thang Điểm 10" },
    { value: 2, label: "Thang Điểm 20" },
  ];

  const [dataDiaDiem, setDataDiaDiem] = useState([]);
  const [dataTrangThai, setDataTrangThai] = useState([]);

  const [tenCuocThi, setTenCuocThi] = useState();
  const [trangThai, setTrangThai] = useState(1);
  //   const [phanThi, setPhanThi] = useState(1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [soVongThi, setSoVongThi] = useState(1);
  const [thangDiem, setThangDiem] = useState();
  const [noiDungCuocThi, setNoiDungCuocThi] = useState("");
  const [diaDiemToChuc, setDiaDiemToChuc] = useState();
  const [chuaCongBo, setChuaCongBo] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const [dataNguyenBan, setDataNguyenBan] = useState([]);

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

  const [dataGiamKhao, setDataGiamKhao] = useState([]);
  const [dataChuongTrinh, setDataChuongTrinh] = useState([]);
  const [dataGiamKhaoKhongThuocCuocThi, setDataGiamKhaoKhongThuocCuocThi] =
    useState([]);

  const [refresh, setRefresh] = useState(-1);

  useEffect(() => {
    const getDataDiaDiem = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/diadiem"
      );
      let arr = [];
      data.forEach((d) => {
        arr.push({ value: d.MaDiaDiem, label: d.TenDiaDiem });
      });
      setDataDiaDiem(arr);
    };
    getDataDiaDiem();

    const getDataTrangThai = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/trangthai"
      );
      let arr = [];
      data.forEach((d) => {
        arr.push({ value: d.MaTrangThai, label: d.TenTrangThai });
      });
      setDataTrangThai(arr);
    };
    getDataTrangThai();
  }, [refresh]);

  useEffect(() => {
    const getDataChiTietCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
      );
      setTenCuocThi(data[0].TenCuocThi);
      setNoiDungCuocThi(data[0].NoiDungCuocThi);
      setDiaDiemToChuc({ value: data[0].MaDiaDiem, label: data[0].TenDiaDiem });
      setNgayBatDau(dayjs(data[0].NgayBatDau).format("YYYY-MM-DD"));
      setNgayKetThuc(dayjs(data[0].NgayKetThuc).format("YYYY-MM-DD"));
      setSoVongThi(data[0].SoVongThi);
      setThangDiem({ value: data[0].MaThangDiem, label: data[0].TenThangDiem });
      setTrangThai({ value: data[0].MaTrangThai, label: data[0].TenTrangThai });
    };
    getDataChiTietCuocThi();
  }, [refresh]);

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
        d.DiemTrungBinh =
          d.DiemTrungBinh == null ? "Chưa chấm" : d.DiemTrungBinh;
        d.TenGiaiThuong =
          d.DiemTrungBinh == "Chưa chấm" ? "Chưa xét" : d.TenGiaiThuong;
        if (d.CongBoKetQua == 0) setChuaCongBo(chuaCongBo + 1);
      });
      setDataChuongTrinh(data);
      setDataNguyenBan(data);
    };
    getDataChuongTrinhThuocCuocThi();

    const getDataGiamKhao = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/giamkhaocuocthi/${params.idCuocThi}`
      );
      setDataGiamKhao(data);
    };
    getDataGiamKhao();

    const getDataGiamKhaoKhongThuocCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/giamkhaokhongthuoccuocthi/${params.idCuocThi}`
      );
      setDataGiamKhaoKhongThuocCuocThi(data);
    };
    getDataGiamKhaoKhongThuocCuocThi();
  }, [refresh]);

  const columnsNguoiDung = [
    //ID
    {
      name: "MaNguoiDung",
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
        filterOptions: { fullWidth: true },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ marginLeft: "25px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "35px" }}>{value}</div>;
        },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    //Họ Tên Giám Khảo
    {
      name: "HoTenNguoiDung",
      label: "Họ Tên",
      options: {
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    //Giới Tính
    {
      name: "GioiTinh",
      label: "Giới Tính",
      options: {
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value === 1 ? "Nam" : "Nữ"}</div>;
        },
      },
    },
    //Email
    {
      name: "Email",
      label: "Email",
      options: {
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    //Phone
    {
      name: "Phone",
      label: "Phone",
      options: {
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ marginRight: "150px" }}>{value}</div>;
        },
      },
    },
    //Sent Mail
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
            <MuiToolTip title={"Sent Mail"}>
              <IconButton edge="end" aria-label="edit" className="edit-hover">
                <Mail />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
    //Delete
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
            <MuiToolTip title={"Delete"}>
              <IconButton edge="end" aria-label="edit" className="delete-hover">
                <Delete />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
  ];

  const optionsNguoiDung = {
    search: true,
    searchPlaceholder: "Tên Người Dùng, Email, Chuyên Môn,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    selectableRows: "none",
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      setDataMaGiamKhao(allRowsSelected);
    },
    customToolbar: () => {
      return (
        <>
          <MuiToolTip title={"Thêm Giám Khảo"}>
            <IconButton
              className="icon-hover"
              onClick={() => {
                setShow(true);
              }}
            >
              <Add />
            </IconButton>
          </MuiToolTip>
          <MuiToolTip title={"Gửi Tất Cả"}>
            <IconButton
              className="icon-hover"
              onClick={() => {
                handleSentMail();
              }}
            >
              <Mail />
            </IconButton>
          </MuiToolTip>
        </>
      );
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

  const optionsThemNguoiDung = {
    search: true,
    searchPlaceholder: "Tên Người Dùng, Email, Chuyên Môn,...",
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "370px",
    tableBodyMaxHeight: "800px",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: 5,
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      setDataMaGiamKhao(allRowsSelected);
    },
    onRowsDelete: (rowsDeleted, newData) => {
      // const idsToDelete = rowsDeleted.data.map(d => dataNguoiDung[d.dataIndex][0])
      // console.log(idsToDelete);
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
          return <div style={{ maxWidth: "180px" }}>{value}</div>;
        },
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortDescFirst: true,
        sortThirdClickReset: true,
      },
    },
    //Điểm Trung Bình
    {
      name: "DiemTrungBinh",
      label: "Điểm",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
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
          return <div>{value == null ? "Chưa xét" : value}</div>;
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
            <MuiToolTip title={"Edit"}>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  navigate(
                    `/chinhsuacuocthi/truyenthong/${params.idCuocThi}/chinhsuachuongtrinh/${tableMeta.rowData[0]}`
                  );
                }}
                className="edit-hover"
              >
                <Edit />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
    //Delete
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
            <MuiToolTip title={"Delete"}>
              <IconButton edge="end" aria-label="edit" className="delete-hover">
                <Delete />
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

  var arr = [];
  for (let i = 0; i < dataGiamKhaoKhongThuocCuocThi.length; i++) {
    arr.push([
      dataGiamKhaoKhongThuocCuocThi[i].stt,
      dataGiamKhaoKhongThuocCuocThi[i].MaNguoiDung,
    ]);
  }

  const [dataMaGiamKhao, setDataMaGiamKhao] = useState([]);

  const handleAddGiamKhao = () => {
    var arrMaGiamKhao = [];
    for (let i = 0; i < dataMaGiamKhao.length; i++) {
      let value = dataMaGiamKhao[i].dataIndex + 1;

      for (let n = 0; n < arr.length; n++) {
        if (value == arr[n][0]) {
          arrMaGiamKhao.push(arr[n][1]);
          break;
        }
      }
    }
    Axios.post(
      `http://localhost:3001/api/admin/addgiamkhaocuocthi/${params.idCuocThi}`,
      {
        arrMaGiamKhao: arrMaGiamKhao,
      }
    ).then((response) => {
      setRefresh(Math.random());
    });
  };

  const handleSaveChange = () => {
    Axios.post(
      `http://localhost:3001/api/admin/updatecuocthi/${params.idCuocThi}`,
      {
        TenCuocThi: tenCuocThi,
        NoiDungCuocThi: noiDungCuocThi,
        MaPhanThi: null,
        SoVongThi: soVongThi,
        ThangDiem: thangDiem.value,
        NgayBatDau: ngayBatDau,
        NgayKetThuc: ngayKetThuc,
        DiaDiemToChuc: diaDiemToChuc.value,
        TrangThai: trangThai.value,
      }
    ).then((response) => {
      document.getElementById("topBtn").click();
      setRefresh(Math.random());
    });
  };

  const handleSentMail = () => {
    let noidungEmail = `Kính gửi Anh/ Chị, Chúng tôi gửi đến Anh/ Chị lịch tổ chức ${tenCuocThi}. Địa Điểm Tổ Chức: Hội Trường Rùa, Từ Ngày ${dayjs(
      ngayBatDau
    ).format("DD/MM/YYYY")} - ${dayjs(ngayKetThuc).format(
      "DD/MM/YYYY"
    )}. Thông tin chi tiết Cuộc thi cũng như thời gian tổ chức các mục thi xin mời Anh/ chị truy cập Website: http://localhost:3000 .`;
    let mail = "gminh09052000@gmail.com";
    let title = "Lịch Tổ Chức Cuộc Thi";
    Axios.post(`http://localhost:3001/mailto`, {
      mail: mail,
      title: title,
      noidungEmail: noidungEmail,
    }).then((response) => {});
  };

  const handleChangeCongBo = (cb) => {
    Axios.post(
      `http://localhost:3001/api/admin/updatecongbo/thichuongtrinh/${params.idCuocThi}`,
      {
        CongBoKetQua: cb,
      }
    ).then((response) => {
      setChuaCongBo(0);
      setRefresh(Math.random());
    });
  };

  useEffect(() => {
    document.getElementById("cuocthivannghe").classList.add("actives");
    document.title = "Chỉnh Sửa Cuộc Thi";
  },[]);

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 300);
  }, [refresh]);

  return (
    <>
      {load ? (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Spinner
            animation="border"
            variant="primary"
            id="spinner"
            style={{
              position: "absolute",
              top: "38%",
              left: "48%",
              width: "50px",
              height: "50px",
              border: "2px soft black",
            }}
          />
        </div>
      ) : (
        <>
          <Breadcrumb>
            <Breadcrumb.Item href="#x" tabIndex="-1">
              <Link to="/home" className="link">
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#x" tabIndex="-1">
              <Link to="/tatcacuocthi" className="link">
                Cuộc Thi Văn Nghệ
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Chỉnh Sửa Chương Trình</Breadcrumb.Item>
          </Breadcrumb>

          {/* Chỉnh Sửa Cuộc Thi */}
          <div className="newContest text-start">
            {/* Chỉnh Sửa Cuộc Thi */}
            <div>
              <h2 className="text-center d-flex align-items-center justify-content-center pb-3">
                <MusicNote style={{ fontSize: "2.6rem" }} />
                Chỉnh Sửa Cuộc Thi Văn Nghệ
                <MusicNote style={{ fontSize: "2.6rem" }} />
              </h2>
              {/* Tên Cuộc Thi, Hình Thức Cuộc Thi */}
              <Row className="pb-2">
                {/* Tên Cuộc Thi */}
                <Col xs="12" md="8">
                  <Form.Group className="mb-3">
                    <Form.Label
                      htmlFor="tenchuongtrinh"
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <Radio />
                      &nbsp;Tên Cuộc Thi
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên chương trình"
                      id="tenCuocThi"
                      defaultValue={tenCuocThi}
                      onBlur={(e) => setTenCuocThi(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      <b style={{ color: "red" }}></b>
                    </Form.Text>
                  </Form.Group>
                </Col>
                {/* Hình Thức Cuộc Thi */}
                <Col xs="12" md="4">
                  <Form.Group className="mb-1">
                    <Form.Label
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <LibraryMusic />
                      &nbsp;Hình Thức Cuộc Thi
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value="Thi Chương Trình"
                      readOnly
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              {/* Địa Điểm, Thời Gian Tổ chức */}
              <Row className="pb-2">
                {/* Địa Điểm */}
                <Col xs="12" md="7">
                  <Form.Group className="mb-1">
                    <Form.Label
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500", width: "100%" }}
                    >
                      <EditLocationAlt /> &nbsp;Địa Điểm Tổ Chức
                    </Form.Label>
                    <Select
                      options={dataDiaDiem}
                      value={diaDiemToChuc}
                      onChange={setDiaDiemToChuc}
                      className="zIndex-998"
                      id="diadiem"
                    />
                  </Form.Group>
                </Col>
                {/* Thời Gian Tổ chức */}
                <Col xs="12" md="5">
                  <Form.Group className="mb-3">
                    <Row>
                      <Col xs="12" md="6">
                        <Form.Label
                          className="d-flex align-items-center"
                          style={{ fontWeight: "500" }}
                        >
                          <HourglassTop /> &nbsp;Ngày Bắt Đầu
                        </Form.Label>

                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          id="ngaybatdau"
                        >
                          <DesktopDatePicker
                            inputFormat="DD/MM/YYYY"
                            value={ngayBatDau}
                            maxDate={ngayKetThuc}
                            onChange={(newValue) =>
                              setNgayBatDau(
                                dayjs(newValue).format("YYYY-MM-DD")
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                helperText={null}
                                sx={{
                                  ".MuiInputBase-root": {
                                    marginTop: "4.4px",
                                    background: "white",
                                  },
                                  ".MuiInputBase-input": {
                                    paddingTop: "4.2px",
                                  },
                                }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Col>
                      <Col xs="12" md="6">
                        <Form.Label
                          className="d-flex align-items-center"
                          style={{ fontWeight: "500" }}
                        >
                          <HourglassBottom /> &nbsp;Ngày Kết Thúc
                        </Form.Label>

                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          id="ngayketthuc"
                        >
                          <DesktopDatePicker
                            inputFormat="DD/MM/YYYY"
                            value={ngayKetThuc}
                            minDate={ngayBatDau}
                            onChange={(newValue) =>
                              setNgayKetThuc(
                                dayjs(newValue).format("YYYY-MM-DD")
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                helperText={null}
                                sx={{
                                  ".MuiInputBase-root": {
                                    marginTop: "4.4px",
                                    background: "white",
                                  },
                                  ".MuiInputBase-input": {
                                    paddingTop: "4.2px",
                                  },
                                }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Col>
                    </Row>
                    <Form.Text className="text-muted">
                      {/* <b style={{ color: "red" }}>{amountContestMess}</b> */}
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              {/* Trạng Thái, Thang Điểm */}
              <Row className="pb-4">
                {/* Trạng Thái */}
                <Col xs="12" md="7">
                  <Form.Group className="mb-3">
                    <Form.Label
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <AppRegistration /> &nbsp;Trạng Thái
                    </Form.Label>
              
                    <Select
                      options={dataTrangThai}
                      value={trangThai}
                      onChange={setTrangThai}
                      className="zIndex-997"
                      id="trangthai"
                    />
                    <Form.Text className="text-muted">
                      {/* <b style={{ color: "red" }}>{pricePerformanceMess}</b> */}
                    </Form.Text>
                  </Form.Group>
                </Col>
                {/* Thang Điểm */}
                <Col xs="12" md="5">
                  <Form.Group className="mb-1">
                    <Form.Label
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <BallotRounded />
                      &nbsp;Thang Điểm
                    </Form.Label>
                    
                    <Select
                      options={dataThangDiem}
                      value={thangDiem}
                      onChange={setThangDiem}
                      className="zIndex-997"
                      id="thangdiem"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              {/* Chi Tiết Cuộc Thi */}
              <Row className="pb-1">
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <NoteAlt /> &nbsp;Nội Dung Cuộc Thi
                    </Form.Label>
                    <SunEditor
                      plugin=""
                      placeholder="Nhập nội dung Cuộc thi..."
                      setContents={noiDungCuocThi}
                      onChange={setNoiDungCuocThi}
                      setDefaultStyle="font-family: Arial; font-size: 16px;"
                      setOptions={{
                        buttonList: [
                          ["undo", "redo"],
                          ["font", "fontSize"],
                          // ['paragraphStyle', 'blockquote'],
                          [
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "subscript",
                            "superscript",
                          ],
                          ["fontColor", "hiliteColor"],
                          ["align", "list", "lineHeight"],
                          ["outdent", "indent"],

                          ["table", "horizontalRule", "link", "image", "video"],
                          // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                          // ['imageGallery'], // You must add the "imageGalleryUrl".
                          // ["fullScreen", "showBlocks", "codeView"],
                          ["preview", "print"],
                          ["removeFormat"],

                          // ['save', 'template'],
                          // '/', Line break
                        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                        defaultTag: "div",
                        minHeight: "300px",
                        height: "auto",
                        showPathLabel: false,
                        font: sortedFontOptions,
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div>
              {/* Thêm Giám Khảo */}
              <h2 className="text-center d-flex align-items-center justify-content-center pt-2">
                <MusicNote style={{ fontSize: "2.6rem" }} /> Giám Khảo Cuộc Thi
                <MusicNote style={{ fontSize: "2.6rem" }} />
              </h2>

              {/* Bảng Giám Khảo */}
              <Row style={{ padding: "15px 12px" }}>
                <MuiDatatable
                  title="Danh Sách Giám Khảo"
                  data={dataGiamKhao}
                  columns={columnsNguoiDung}
                  options={optionsNguoiDung}
                />
              </Row>
            </div>

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

            {/* Button Action */}
            <Row className="pt-2">
              <Col className="text-center my-2">
                <Button
                  variant="contained"
                  style={{ padding: "7px 45px" }}
                  onClick={handleSaveChange}
                >
                  Save Changes
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="error"
                  style={{ padding: "7px 80px" }}
                  onClick={() => navigate("/tatcacuocthi")}
                >
                  Back
                </Button>
              </Col>
            </Row>
          </div>

          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton className="px-4">
              <Modal.Title className="ms-auto" style={{ color: "#344767" }}>
                <MusicNote style={{ fontSize: "2.6rem" }} />
                Thêm Giám Khảo Cuộc Thi
                <MusicNote style={{ fontSize: "2.6rem" }} />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Thêm Tiết Mục */}
              <div style={{ color: "#344767" }}>
                <Row
                  className="mx-0 justify-content-end"
                  style={{ padding: "0px 15px" }}
                >
                  <MuiDatatable
                    title="Danh Sách Giám Khảo Hiện Tại"
                    data={dataGiamKhaoKhongThuocCuocThi}
                    columns={columnsNguoiDung}
                    options={optionsThemNguoiDung}
                  />
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button
                variant="contained"
                style={{ padding: "7px 80px" }}
                onClick={() => {
                  handleAddGiamKhao();
                  handleClose();
                  setDataMaGiamKhao([]);
                  setRefresh(Math.random());
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ padding: "7px 80px" }}
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
