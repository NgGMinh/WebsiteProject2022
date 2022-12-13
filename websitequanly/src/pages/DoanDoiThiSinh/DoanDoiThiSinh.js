/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Add, MusicNote, Visibility } from "@mui/icons-material";
import { IconButton, Tooltip as MuiToolTip } from "@mui/material";
import MuiDatatable from "../../components/table/MuiDatatable";
import { useEffect } from "react";
import Axios from "axios";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function DoanDoiThiSinh() {
  const navigate = useNavigate();

  const [tableBodyHeight, setTableBodyHeight] = useState("560px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(-1);

  const columnsDoanDoi = [
    {
      name: "MaDoanDoi",
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
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ paddingLeft: "32px", marginRight: "45px" }}>
              {value}
            </div>
          );
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>STT</div>;
        },
      },
    },
    {
      name: "TenDoanDoi",
      label: "Tên Đoàn Đội",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "215px" }}>{value}</div>;
        },
      },
    },

    {
      name: "TenNhomTruong",
      label: "Trưởng Nhóm",
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
      name: "Email",
      label: "Email Trưởng Nhóm",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "180px", lineBreak: "anywhere" }}>
              {value}
            </div>
          );
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "SoLuongThanhVien",
      label: "Sỉ Số",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ textAlign: "center", paddingRight: "16px" }}>
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "TenDonVi",
      label: "Thuộc Đơn vị",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "180px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TrangThai",
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
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        disableColumnMenu: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <MuiToolTip title={tableMeta.rowData[8] == 3 ? "View" : "Edit"}>
              <IconButton
                edge="end"
                aria-label="edit"
                className={tableMeta.rowData[8] == 3 ? "icon-hover" : "edit-hover"}
                onClick={() =>
                  navigate(`/chinhsuadoandoi/${tableMeta.rowData[0]}`)
                }
              >
                {tableMeta.rowData[8] == 3 ? <Visibility /> : <Edit />}
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
  ];

  const optionsDoanDoi = {
    search: true,
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "simple",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPage,
    selectableRows: "none",
    page: page,
    onChangePage: (number) => {
      setPage(number);
    },
    customToolbar: () => {
      return (
        <MuiToolTip title={"Thêm Đoàn Đội"}>
          <IconButton
            className="icon-hover"
            onClick={() => navigate("/themdoandoi")}
          >
            <Add />
          </IconButton>
        </MuiToolTip>
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

      const fileName = `DanhSachDoanDoi`;
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

  const [dataDoanDoi, setDataDoanDoi] = useState([]);

  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const getDataDoanDoi = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/tatcadoandoi"
      );
      data.forEach((d) => {
        Axios.post(
          `http://localhost:3001/api/admin/tietmuccuadoandoi/${d.MaDoanDoi}`
        ).then((response) => {
          if (response.data.length > 0) {
            d.TrangThai = response.data[0].MaTrangThai;
          } else {
            d.TrangThai = -1;
          }
        });
      });
      setDataDoanDoi(data);
    };
    getDataDoanDoi();
  }, [refresh]);

  useEffect(() => {
    setTimeout(() => {
      setPage(0);
    }, 300);
  },[refresh]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="#" tabIndex="-1">
          <Link to="/home" className="link">
            Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Đoàn Đội Văn Nghệ</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ textAlign: "left" }} className="mb-2">
        <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Quản Lý Đoàn Đội Văn Nghệ
          <MusicNote style={{ fontSize: "2.6rem" }} />
        </h2>

        <div>
          <Row style={{ padding: "15px 12px" }}>
            <MuiDatatable
              title="Danh Sách Đoàn Đội Văn Nghệ"
              data={dataDoanDoi}
              columns={columnsDoanDoi}
              options={optionsDoanDoi}
            />
          </Row>
        </div>
      </div>
    </>
  );
}
