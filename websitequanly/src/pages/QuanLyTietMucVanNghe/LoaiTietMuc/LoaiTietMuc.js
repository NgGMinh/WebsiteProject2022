/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { Add, Edit } from "@mui/icons-material";
import React from "react";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import MuiDatatable from "../../../components/table/MuiDatatable";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function LoaiTietMuc() {
  const [dt, setDT] = useState([]);

  const [refresh, setRefresh] = useState(-1);
  const [load, setLoad] = useState(false);

  const [tableBodyHeight, setTableBodyHeight] = useState("480px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getDataTietMuc = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/loaitietmuc"
      );
      data.forEach((d) => {
        if (d.MaPhanThi == 1) d.MaPhanThi = "Cá Nhân";
        if (d.MaPhanThi == 2) d.MaPhanThi = "Đội Nhóm";
      });
      setDT(data);
    };
    getDataTietMuc();
  }, [refresh]);

  const columnsTietMuc = [
    {
      name: "MaLoaiTietMuc",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    {
      name: "CoDinh",
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
          return (
            <div style={{ textAlign: "center", paddingRight: "12px" }}>
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
      name: "TenLoaiTietMuc",
      label: "Tên Loại Tiết Mục",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ width: "180px", textAlign: "left" }}>{value}</div>
          );
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ width: "180px", textAlign: "left" }}>
              Tên Loại Tiết Mục
            </div>
          );
        },
      },
    },
    {
      name: "NhanSoToiThieu",
      label: "Nhân Số",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {tableMeta.rowData[1] == 1 ? (
                <div style={{ width: "110px", marginRight: "35px" }}>
                  {value} (Cố Định)
                </div>
              ) : (
                <div style={{ width: "110px", marginRight: "35px" }}>
                  {value} (Tối thiểu)
                </div>
              )}
            </>
          );
        },
        customHeadLabelRender: (value, tableMeta, updateValue) => {
          return <div style={{ maxWidth: "110px" }}>Nhân Số</div>;
        },
      },
    },
    {
      name: "MaPhanThi",
      label: "Phần Thi",
      options: {
        filterOptions: { fullWidth: true },
        sortThirdClickReset: true,
        sortDescFirst: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ maxWidth: "110px", marginRight: "280px" }}>
              {value}
            </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "20px",
                }}
              >
                <MuiToolTip title="Edit">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    className="edit-hover"
                  >
                    <Edit
                      onClick={() => {
                        setMaLoaiTietMuc(tableMeta.rowData[0]);
                        setTenLoaiTietMuc(tableMeta.rowData[3]);
                        setCoDinh(tableMeta.rowData[1]);
                        setPhanThi(tableMeta.rowData[5] == "Cá Nhân" ? 1 : 2);
                        setNhanSoToiThieu(tableMeta.rowData[4]);
                        setShow(true);
                      }}
                    />
                  </IconButton>
                </MuiToolTip>
              </div>
            </>
          );
        },
      },
    },
  ];

  const optionsTietMuc = {
    search: true,
    searchPlaceholder: "Tên Thí Sinh, Mssv, Email,...",
    download: true,
    print: false,
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
    customToolbar: () => {
      return (
        <MuiToolTip title={"Thêm Chương Trình"}>
          <IconButton className="icon-hover" onClick={() => setShow(true)}>
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

      const fileName = `DanhSachLoaiTietMuc`;
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

  const [maLoaiTietMuc, setMaLoaiTietMuc] = useState(-1);
  const [tenLoaiTietMuc, setTenLoaiTietMuc] = useState("");
  const [nhanSoToiThieu, setNhanSoToiThieu] = useState(1);
  const [phanThi, setPhanThi] = useState(1);
  const [coDinh, setCoDinh] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setMaLoaiTietMuc(-1);
      setTenLoaiTietMuc("");
      setNhanSoToiThieu(1);
      setPhanThi(1);
      setCoDinh(1);
    }, 100);
  };

  const handleAddLoaiTietMuc = () => {
    if (tenLoaiTietMuc == "") {
      alert("Tên tiết mục không được để trống !");
    } else if (
      nhanSoToiThieu == undefined ||
      nhanSoToiThieu == "" ||
      nhanSoToiThieu == null
    ) {
      alert("Nhân số không được để trống !");
    } else {
      Axios.post(`http://localhost:3001/api/admin/addloaitietmuc`, {
        TenLoaiTietMuc: tenLoaiTietMuc,
        CoDinh: coDinh,
        MaPhanThi: phanThi,
        NhanSoToiThieu: nhanSoToiThieu,
      }).then((response) => {
        setRefresh(Math.random());
        handleClose();
        setTimeout(() => {
          alert("Thêm loại tiết mục thành công!");
        }, 400);
      });
    }
  };

  const handleUpdateLoaiTietMuc = () => {
    if (tenLoaiTietMuc == "") {
      alert("Tên tiết mục không được để trống !");
    } else if (
      nhanSoToiThieu == undefined ||
      nhanSoToiThieu == "" ||
      nhanSoToiThieu == null
    ) {
      alert("Nhân số không được để trống !");
    } else {
      Axios.post(
        `http://localhost:3001/api/admin/updateloaitietmuc/${maLoaiTietMuc}`,
        {
          TenLoaiTietMuc: tenLoaiTietMuc,
          CoDinh: coDinh,
          MaPhanThi: phanThi,
          NhanSoToiThieu: nhanSoToiThieu,
        }
      ).then((response) => {
        setRefresh(Math.random());
        handleClose();
        setTimeout(() => {
          alert("Cập nhật thành công!");
        }, 400);
      });
    }
  };

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 300);
  }, [refresh]);

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
          <Row style={{ padding: "15px 10px" }}>
            <MuiDatatable
              title="Danh Sách Loại Tiết Mục"
              data={dt}
              columns={columnsTietMuc}
              options={optionsTietMuc}
            />
          </Row>

          <Modal show={show} onHide={handleClose} className="modal-lg">
            <Modal.Header closeButton className="px-4">
              <Modal.Title className="ms-auto">
                {maLoaiTietMuc == -1
                  ? "Thêm Loại Tiết Mục"
                  : "Chỉnh Sửa Loại Tiết Mục"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên Loại Tiết Mục</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập Tên Loại Tiết mục..."
                      value={tenLoaiTietMuc}
                      onChange={(e) => setTenLoaiTietMuc(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Thuộc Phần Thi</Form.Label>
                    <Form.Select
                      value={phanThi}
                      onChange={(e) => setPhanThi(e.target.value)}
                    >
                      <option value="1">Cá Nhân</option>
                      <option value="2">Đội Nhóm</option>
                    </Form.Select>
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Loại Nhân Số</Form.Label>
                    <Form.Select
                      value={coDinh}
                      onChange={(e) => setCoDinh(e.target.value)}
                    >
                      <option value="1">Số lượng Cố định</option>
                      <option value="0">Số lượng Không hạn định</option>
                    </Form.Select>
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      {coDinh == 1 ? "Nhân Số" : "Nhân Số Tối Thiểu"}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={nhanSoToiThieu}
                      placeholder="Nhập nhân số..."
                      onChange={(e) => setNhanSoToiThieu(e.target.value)}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Row>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    className="modal-button-style"
                    onClick={() => {
                      if (maLoaiTietMuc == -1) {
                        handleAddLoaiTietMuc();
                      } else {
                        handleUpdateLoaiTietMuc();
                      }
                    }}
                  >
                    {maLoaiTietMuc == -1 ? "Add" : "Save"}
                  </Button>
                </Col>
                <Col xs="12" md="6">
                  <Button
                    variant="contained"
                    color="error"
                    className="modal-button-style"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
