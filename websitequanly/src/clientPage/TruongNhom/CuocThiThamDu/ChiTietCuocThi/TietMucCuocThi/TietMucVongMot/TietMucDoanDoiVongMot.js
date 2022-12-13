/* eslint-disable eqeqeq */

import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import MuiDatatable from "../../../../../../components/table/MuiDatatable";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function TietMucDoanDoiVongMot(props) {
  const params = useParams();

  const dayjs = require("dayjs");

  const [dataTMDD, setDataTMDD] = useState([]);
  const [trinhBay, setTrinhBay] = useState("");

  const columnsTietMuc = [
    {
      name: "TenTietMuc",
      label: "Tên Tiết Mục",
      options: {
        filterOptions: { fullWidth: true },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>{value}</div>;
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "25px" }}>Tên Tiết Mục</div>;
        },
      },
    },
    { name: "TenLoaiTietMuc", label: "Loại Tiết Mục" },
    {
      name: "NgayGioThucHien",
      label: "Ngày Thi",
      options: {
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
    {
      name: "DiemTrungBinh",
      label: "Điểm Thi",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div
              style={{ width: "65px", textAlign: "center" }}
            >
              <strong>{value}</strong>
            </div>
          );
        },
      },
    },
    {
      name: "TrangThai",
      label: "Kết Quả",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {value == "CCB" ? (
                <div
                  style={{
                    width: "60px",
                    textAlign: "center",
                  }}
                >
                  <strong>{value}</strong>
                </div>
              ) : value == "Không Đạt" ? (
                <div className="text-danger">
                  <strong>{value}</strong>
                </div>
              ) : (
                <div className="text-success">
                  <strong>{value}</strong>
                </div>
              )}
            </>
          );
        },
      },
    },
  ];

  const optionsTietMuc = {
    search: true,
    searchPlaceholder: "Tên Tiết Mục, Ngày Thi,...",
    download: true,
    print: false,
    viewColumns: true,
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "auto",
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

  useEffect(() => {
    const getDataCuocThiTuDo = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/cuocthi/${
          params.idCuocThi
        }/vongthi/1/truongnhom/${localStorage.getItem("MaNguoiDung")}`
      );
      // eslint-disable-next-line array-callback-return
      data.forEach((item) => {
        if (item.CongBoKetQua == 0) {
          item.DiemTrungBinh = "CCB";
          item.TrangThai = "CCB";
        } else {
          if (item.TrangThai == 1) item.TrangThai = "Đạt";
          else item.TrangThai = "Không Đạt";
        }
      });
      setTrinhBay(data[0].TrinhBay);
      setDataTMDD(data);
    };
    getDataCuocThiTuDo();
  }, [params.idCuocThi]);

  return (
    <>
      {/* Bảng Tiết Mục */}
      <Row style={{ padding: "15px 12px 30px 12px" }}>
        <MuiDatatable
          title={trinhBay}
          data={dataTMDD}
          columns={columnsTietMuc}
          options={optionsTietMuc}
        />
      </Row>
    </>
  );
}
