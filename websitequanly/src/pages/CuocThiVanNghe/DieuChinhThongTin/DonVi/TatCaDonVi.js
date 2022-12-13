/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Row, Spinner, Modal, Form, Col } from "react-bootstrap";
import Axios from "axios";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import MuiDatatable from "../../../../components/table/MuiDatatable";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function TatCaDonVi() {
  const [dataDonVi, setDataDonVi] = useState([]);

  const [refresh, setRefresh] = useState(-1);
  const [load, setLoad] = useState(false);

  const [tableBodyHeight, setTableBodyHeight] = useState("450px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [show, setShow] = useState(false);
  const [maDonVi, setMaDonVi] = useState(-1);
  const [tenDonVi, setTenDonVi] = useState("");

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setMaDonVi(-1);
      setTenDonVi("");
    }, 100);
  };

  useEffect(() => {
    const getDataDonVi = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/donvitochuc"
      );
      setDataDonVi(data);
    };
    getDataDonVi();
  }, [refresh]);

  const columnsDonVi = [
    {
      name: "MaDonVi",
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
          return <div style={{ paddingLeft: "25px" }}>STT</div>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div style={{ paddingLeft: "35px" }}>{value}</div>;
        },
      },
    },
    {
      name: "TenDonVi",
      label: "Tên Đơn Vị",
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
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        print: false,
        viewColumns: false,
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
                        setMaDonVi(tableMeta.rowData[0]);
                        setTenDonVi(tableMeta.rowData[2]);
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

  const optionsDonVi = {
    search: true,
    download: true,
    print: false,
    viewColumns: true,
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: tableBodyHeight,
    tableBodyMaxHeight: "auto",
    rowsPerPageOptions: [5, 10, 50, 100],
    rowsPerPage: rowsPerPage,
    selectableRows: "none",
    setCellProps: () => ({ align: "right" }),
    customToolbar: () => {
      return (
        <MuiToolTip title={"Thêm Chương Trình"}>
          <IconButton className="icon-hover" onClick={() => setShow(true)}>
            <Add />
          </IconButton>
        </MuiToolTip>
      );
    },
    onChangeRowsPerPage: (number) => {
      if (number > 5) {
        setTableBodyHeight("auto");
        setRowsPerPage(number);
      } else {
        setTableBodyHeight("450px");
        setRowsPerPage(number);
      }
    },
    page: page,
    onChangePage: (number) => {
      setPage(number);
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

  const handleAddDonVi = () => {
    if (tenDonVi == "") {
      alert("Tên đơn vị không được để trống !");
    } else {
      Axios.post(`http://localhost:3001/api/admin/themdonvitochuc`, {
        TenDonVi: tenDonVi,
      }).then((response) => {
        setRefresh(Math.random());
        handleClose();
        setTimeout(() => {
          alert("Thêm đơn vị thành công!");
        }, 400);
      });
    }
  };

  const handleUpdateDonVi = () => {
    if (tenDonVi == "") {
      alert("Tên đơn vị không được để trống !");
    } else {
      Axios.post(
        `http://localhost:3001/api/admin/updatedonvitochuc/${maDonVi}`,
        {
          TenDonVi: tenDonVi,
        }
      ).then((response) => {
        setRefresh(Math.random());
        handleClose();
        setTimeout(() => {
          alert("Cập nhật đơn vị thành công!");
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
          <Row style={{ padding: "0px 10px" }}>
            <MuiDatatable
              title="Danh Sách Đơn Vị Tổ chức"
              data={dataDonVi}
              columns={columnsDonVi}
              options={optionsDonVi}
            />
          </Row>
          <Modal show={show} onHide={handleClose} className="modal-lg">
            <Modal.Header closeButton className="px-4">
              <Modal.Title className="ms-auto">
                {maDonVi == -1 ? "Thêm Đơn Vị" : "Chỉnh Sửa Đơn Vị"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên Đơn Vị</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập Tên Đơn Vị..."
                      defaultValue={tenDonVi}
                      onBlur={(e) => setTenDonVi(e.target.value)}
                      required
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
                      if (maDonVi == -1) {
                        handleAddDonVi();
                      } else {
                        handleUpdateDonVi();
                      }
                    }}
                  >
                    {maDonVi == -1 ? "Add" : "Save"}
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
