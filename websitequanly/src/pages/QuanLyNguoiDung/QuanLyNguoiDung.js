/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Breadcrumb, Modal, Form, Spinner } from "react-bootstrap";
import "./ChinhSuaNguoiDung.css";
import { Edit, Add, MusicNote } from "@mui/icons-material";
import { Button, IconButton, Tooltip as MuiToolTip } from "@mui/material";
import MuiDatatable from "../../components/table/MuiDatatable";
import Axios from "axios";
import { useEffect } from "react";
import Select from "react-select";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export default function QuanLyNguoiDung() {
  const [tableBodyHeight, setTableBodyHeight] = useState("450px");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const dataGioiTinh = [
    { value: 1, label: "Nam" },
    { value: 2, label: "Nữ" },
  ];

  const dataChucVu = [
    { value: 1, label: "Quản trị viên" },
    { value: 2, label: "Giám khảo" },
    { value: 3, label: "Nhóm trưởng" },
    { value: 4, label: "Thí sinh tự do" },
  ];

  const [dataNguoiDung, setDataNguoiDung] = useState([]);
  const [dataDonVi, setDataDonVi] = useState([]);

  //useState Người Dùng
  const [maNguoiDung, setMaNguoiDung] = useState(-1);
  const [hoTen, setHoTen] = useState("");
  const [chucVu, setChucVu] = useState(dataChucVu[0]);
  const [gioiTinh, setGioiTinh] = useState(dataGioiTinh[0]);
  const [emailNguoiDung, setEmailNguoiDung] = useState("");
  const [phone, setPhone] = useState("");
  const [taiKhoan, setTaiKhoan] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [nhapLaiMatKhau, setNhapLaiMatKhau] = useState("");
  const [maDinhDanh, setMaDinhDanh] = useState("");
  const [maLop, setMaLop] = useState("");
  const [donVi, setDonVi] = useState(1);

  const [refresh, setRefresh] = useState(-1);

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setMaNguoiDung(-1);
      setHoTen("");
      setTaiKhoan("");
      setChucVu(dataChucVu[0]);
      setGioiTinh(dataGioiTinh[0]);
      setEmailNguoiDung("");
      setPhone("");
      setMatKhau("");
      setNhapLaiMatKhau("");
      setMaDinhDanh("");
      setMaLop("");
      setDonVi(dataDonVi[0]);

      setTaiKhoanMess("");
      setMatKhauMess("");
      setMaDinhDanhMess("");
      setNhapLaiMKMess("");
      setEmailMess("");
      setPhoneMess("");
      setHoTenMess("");
    }, 300);
  };

  const [taiKhoanMess, setTaiKhoanMess] = useState("");
  const [matKhauMess, setMatKhauMess] = useState("");
  const [nhapLaiMKMess, setNhapLaiMKMess] = useState("");
  const [hotenMess, setHoTenMess] = useState("");
  const [emailMess, setEmailMess] = useState("");
  const [phoneMess, setPhoneMess] = useState("");
  const [maDinhDanhMess, setMaDinhDanhMess] = useState("");

  const handleChangeTaiKhoan = (event) => {
    let value = event.target.value;
    setTaiKhoan(value);
    setTimeout(() => {
      let tk = dataNguoiDung.filter((d) => {
        return d.TaiKhoan == value;
      });
      if (tk.length > 0) setTaiKhoanMess("Tài khoản đã tồn tại.");
      else {
        setTaiKhoanMess("");
      }
    }, 300);
  };

  const handleChangeMatKhau = (event) => {
    let value = event.target.value;
    setMatKhau(value);
    setTimeout(() => {
      if (value.length < 8) setMatKhauMess("Mật khẩu phải có ít nhất 8 ký tự.");
      else {
        setMatKhauMess("");
      }
    }, 300);
  };

  const handleChangeMatKhauNhapLai = (event) => {
    let value = event.target.value;
    setNhapLaiMatKhau(value);
    setTimeout(() => {
      if (value != matKhau) setNhapLaiMKMess("Mật khẩu nhập lại không đúng.");
      else {
        setNhapLaiMKMess("");
      }
    }, 300);
  };

  const handleEmailCheck = (event) => {
    const value = event.target.value;

    let btcq_email =
      // eslint-disable-next-line no-useless-escape
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})/;
    let em = [];

    if (!btcq_email.test(value)) {
      setEmailMess("Email không hợp lệ");
    } else {
      setEmailMess("");

      em = dataNguoiDung.filter((d) => {
        return d.Email == value;
      });

      if (em.length > 0) setEmailMess("Email đã tồn tại.");
      else {
        setEmailMess("");
      }
    }
  };

  const handlePhoneCheck = (event) => {
    const value = event.target.value;
    let phoneno = /^\d{10}$/;

    if (!phoneno.test(value)) {
      setPhoneMess("Số điện thoại không hợp lệ.");
    } else {
      setPhoneMess("");
      let p = dataNguoiDung.filter((d) => {
        return d.Phone == value;
      });
      if (p.length > 0) setPhoneMess("Số điện thoại đã tồn tại.");
      else {
        setPhoneMess("");
      }
    }
  };

  const handleMaDinhDanhCheck = (event) => {
    const value = event.target.value;
    setMaDinhDanh(value);

    setTimeout(() => {
      let mdd = dataNguoiDung.filter((d) => {
        return d.MaDinhDanh == value;
      });
      if (mdd.length > 0) setMaDinhDanhMess("Mã định danh đã tồn tại.");
      else {
        setMaDinhDanhMess("");
      }
    }, 300);
  };

  // console.log(dataNguoiDung);

  const columnsNguoiDung = [
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
          return (
            <div style={{ width: "80px", textAlign: "center" }}>{value}</div>
          );
        },
      },
    },
    {
      name: "HoTenNguoiDung",
      label: "Họ Tên",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "TenChucVu",
      label: "Chức Vụ",
      options: {
        filterType: "multiselect",
        filterOptions: { fullWidth: true },
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
      name: "TaiKhoan",
      label: "Tài Khoản",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
      },
    },
    {
      name: "MatKhau",
      label: "Mật Khẩu",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
      },
    },
    {
      name: "Email",
      label: "Email",
      options: {
        filter: false,
        sortThirdClickReset: true,
        sortDescFirst: true,
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
      name: "MaLop",
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
      name: "MaDonVi",
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
      name: "TenDonVi",
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
      name: "MaDinhDanh",
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
        viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            // <Edit
            //   onClick={() =>
            //     window.alert(`Clicked "Edit" for row ${tableMeta.rowData[0]}`)
            //   }
            // />
            <MuiToolTip title="Edit">
              <IconButton edge="end" aria-label="edit" className="edit-hover">
                <Edit
                  onClick={() => {
                    // window.alert(`Clicked "Edit" for row ${tableMeta.rowData[0]}`);
                    setMaNguoiDung(tableMeta.rowData[0]);
                    setHoTen(tableMeta.rowData[2]);
                    if (tableMeta.rowData[3] == "Quản trị viên")
                      setChucVu(dataChucVu[0]);
                    if (tableMeta.rowData[3] == "Giám khảo")
                      setChucVu(dataChucVu[1]);
                    if (tableMeta.rowData[3] == "Nhóm trưởng")
                      setChucVu(dataChucVu[2]);
                    if (tableMeta.rowData[3] == "Thí sinh tự do")
                      setChucVu(dataChucVu[3]);
                    setGioiTinh(
                      tableMeta.rowData[4] == "Nam"
                        ? dataGioiTinh[0]
                        : dataGioiTinh[1]
                    );
                    setTaiKhoan(tableMeta.rowData[5]);
                    setMatKhau(tableMeta.rowData[6]);
                    setEmailNguoiDung(tableMeta.rowData[7]);
                    setPhone(tableMeta.rowData[8]);
                    setMaLop(tableMeta.rowData[9]);
                    setDonVi({
                      value: tableMeta.rowData[10],
                      label: tableMeta.rowData[11],
                    });
                    setMaDinhDanh(tableMeta.rowData[12]);
                    handleShow();
                  }}
                />
              </IconButton>
            </MuiToolTip>
          );
        },
      },
    },
  ];

  const optionsNguoiDung = {
    search: true,
    searchPlaceholder: "Tên Người Dùng, Email, Số điện thoại,...",
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
        setTableBodyHeight("450px");
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

      const fileName = `DanhSachNguoiDung`;
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
    const getDataNguoiDung = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/tatcanguoidung"
      );
      data.forEach((d) => {
        d.GioiTinh = d.GioiTinh == 1 ? "Nam" : "Nữ";
        if (
          d.MaDinhDanh == null ||
          d.MaDinhDanh == undefined ||
          d.MaDinhDanh == ""
        )
          d.MaDinhDanh = "Không";
        if (d.MaLop == null || d.MaLop == undefined || d.MaLop == "")
          d.MaLop = "Không";
      });
      setDataNguoiDung(data);
    };
    getDataNguoiDung();

    const getDataDonVi = async () => {
      const { data } = await Axios.post(
        "http://localhost:3001/api/admin/donvitochuc"
      );
      let arr = [];
      data.forEach((d) => {
        arr.push({ value: d.MaDonVi, label: d.TenDonVi });
      });
      setDonVi(arr[0]);
      setDataDonVi(arr);
    };
    getDataDonVi();
  }, [refresh]);

  const addNguoiDung = () => {
    if (
      taiKhoan == "" &&
      matKhau == "" &&
      nhapLaiMatKhau == "" &&
      hoTen == "" &&
      emailNguoiDung == "" &&
      phone == ""
    ) {
      if (taiKhoan == "") setTaiKhoanMess("Tài khoản không được để trống.");
      if (matKhau == "") setMatKhauMess("Mật khẩu không được để trống.");
      if (nhapLaiMatKhau == "")
        setNhapLaiMKMess("Xin hãy nhập lại mật khẩu để xác nhận.");
      if (hoTen == "") setHoTenMess("Họ tên không được để trống.");
      if (emailNguoiDung == "") setEmailMess("Email không được để trống.");
      if (phone == "") setPhoneMess("Số điện thoại không được để trống.");
    } else {
      if (
        taiKhoanMess == "" &&
        matKhauMess == "" &&
        nhapLaiMKMess == "" &&
        hotenMess == "" &&
        emailMess == "" &&
        phoneMess == ""
      )
        if (chucVu.value == 1) {
          Axios.post("http://localhost:3001/api/admin/addquantrivien", {
            HoTen: hoTen,
            TaiKhoan: taiKhoan,
            GioiTinh: gioiTinh.value,
            Email: emailNguoiDung,
            Phone: phone,
            MatKhau: matKhau,
          }).then((response) => {
            handleClose();
            setLoad(true);
            setRefresh(Math.random());
            setTimeout(() => {
              alert("Thêm người dùng Thành Công !");
            }, 400);
          });
        }

      if (chucVu.value == 2) {
        Axios.post("http://localhost:3001/api/admin/addgiamkhao", {
          HoTen: hoTen,
          TaiKhoan: taiKhoan,
          GioiTinh: gioiTinh.value,
          Email: emailNguoiDung,
          Phone: phone,
          MatKhau: matKhau,
        }).then((response) => {
          handleClose();
          setLoad(true);
          setRefresh(Math.random());
          setTimeout(() => {
            alert("Thêm người dùng Thành Công !");
          }, 400);
        });
      }

      if (chucVu.value > 2) {
        Axios.post("http://localhost:3001/api/admin/addtruongnhom", {
          HoTen: hoTen,
          TaiKhoan: taiKhoan,
          MaDinhDanh: maDinhDanh,
          GioiTinh: gioiTinh.value,
          MaChucVu: chucVu.value,
          Email: emailNguoiDung,
          Phone: phone,
          MatKhau: matKhau,
          MaLop: maLop,
          MaDonVi: donVi.value,
        }).then((response) => {
          handleClose();
          setLoad(true);
          setRefresh(Math.random());
          setTimeout(() => {
            alert("Thêm người dùng Thành Công !");
          }, 400);
        });
      }
    }
  };

  const handleUpdateNguoiDung = () => {
    if (
      taiKhoan == "" &&
      matKhau == "" &&
      hoTen == "" &&
      emailNguoiDung == "" &&
      phone == ""
    ) {
      if (taiKhoan == "") setTaiKhoanMess("Tài khoản không được để trống.");
      if (matKhau == "") setMatKhauMess("Mật khẩu không được để trống.");
      if (hoTen == "") setHoTenMess("Họ tên không được để trống.");
      if (emailNguoiDung == "") setEmailMess("Email không được để trống.");
      if (phone == "") setPhoneMess("Số điện thoại không được để trống.");
    } else {
      if (
        taiKhoanMess == "" &&
        matKhauMess == "" &&
        hotenMess == "" &&
        emailMess == "" &&
        phoneMess == ""
      ) {
        if (chucVu.value < 3) {
          Axios.post(
            `http://localhost:3001/api/admin/updatenguoidung/${maNguoiDung}`,
            {
              HoTen: hoTen,
              TaiKhoan: taiKhoan,
              GioiTinh: gioiTinh.value,
              MaChucVu: chucVu.value,
              Email: emailNguoiDung,
              Phone: phone,
              MatKhau: matKhau,
            }
          ).then((response) => {
            setLoad(true);
            setRefresh(Math.random());
            handleClose();
            setTimeout(() => {
              alert("Chỉnh sửa Thành Công !");
            }, 400);
          });
        } else {
          Axios.post(
            `http://localhost:3001/api/admin/updatenguoidung/truongnhomthisinh/${maNguoiDung}`,
            {
              HoTen: hoTen,
              TaiKhoan: taiKhoan,
              MaDinhDanh: maDinhDanh,
              GioiTinh: gioiTinh.value,
              MaChucVu: chucVu.value,
              Email: emailNguoiDung,
              Phone: phone,
              MatKhau: matKhau,
              MaLop: maLop,
              MaDonVi: donVi.value,
            }
          ).then((response) => {
            handleClose();
            setLoad(true);
            setRefresh(Math.random());
            setTimeout(() => {
              alert("Chỉnh sửa Thành Công !");
            }, 400);
          });
        }
      }
    }
  };

  const [load, setLoad] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 300);
  }, [refresh]);

  return (
    <>
      {load ? (
        <div style={{ position: "relative", width: "100%", height: "610px" }}>
          <Spinner
            animation="border"
            variant="primary"
            id="spinner"
            style={{
              position: "absolute",
              top: "40%",
              left: "49%",
              width: "50px",
              height: "50px",
            }}
          />
        </div>
      ) : (
        <>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home" className="link">
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Quản Lý Người Dùng</Breadcrumb.Item>
          </Breadcrumb>

          <div className="text-start pb-2">
            <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
              <MusicNote style={{ fontSize: "2.6rem" }} />
              Quản Lý Người Dùng
              <MusicNote style={{ fontSize: "2.6rem" }} />
            </h2>
            <Row className="pb-2">
              <Col md="9"></Col>
              <Col md="3" style={{ textAlign: "right" }}>
                <Button color="info" variant="contained" onClick={handleShow}>
                  <Add /> Thêm Người Dùng
                </Button>
              </Col>
            </Row>
            <Row style={{ padding: "0px 10px" }}>
              <MuiDatatable
                title="Danh Sách Người Dùng"
                data={dataNguoiDung}
                columns={columnsNguoiDung}
                options={optionsNguoiDung}
              />
            </Row>
          </div>

          {/* Modal Thêm - Chỉnh Sửa Người Dùng */}
          <Modal show={show} onHide={handleClose} className="modal-lg">
            <Modal.Header closeButton className="px-4">
              <Modal.Title>
                {maNguoiDung == -1
                  ? "Thêm Người Dùng"
                  : "Chỉnh Sửa Thông Tin Người Dùng"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <h5 className="text-center">Thông Tin Tài Khoản</h5>{" "}
                <Row>
                  <Col xs="12" md="8">
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: "500" }}>
                        Tài Khoản
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={taiKhoan}
                        onChange={(e) => handleChangeTaiKhoan(e)}
                        placeholder="Nhập Tài Khoản..."
                        onBlur={(e) => {
                          if (e.target.value == "")
                            setTaiKhoanMess("Tài khoản không được để trống.");
                        }}
                      />
                      <Form.Text className="text-danger">
                        {taiKhoanMess}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col xs="12" md="4">
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: "500" }}>
                        Chức Vụ
                      </Form.Label>
                      <Select
                        options={dataChucVu}
                        value={chucVu}
                        id="chucvu"
                        onChange={setChucVu}
                        className="zIndex-998"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Mật Khẩu
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={matKhau}
                    onChange={(e) => handleChangeMatKhau(e)}
                    placeholder="Nhập Mật Khẩu..."
                    onBlur={(e) => {
                      if (e.target.value == "")
                        setMatKhauMess("Mật khẩu không được để trống.");
                    }}
                  />
                  <Form.Text className="text-danger">{matKhauMess}</Form.Text>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ display: maNguoiDung != -1 ? "none" : "block" }}
                >
                  <Form.Label style={{ fontWeight: "500" }}>
                    Nhập Lại Mật Khẩu
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={nhapLaiMatKhau}
                    onChange={(e) => handleChangeMatKhauNhapLai(e)}
                    placeholder="Nhập Lại Mật Khẩu..."
                    onBlur={(e) => {
                      if (e.target.value == "")
                        setNhapLaiMKMess(
                          "Xin hãy nhập lại mật khẩu để xác nhận."
                        );
                    }}
                  />
                  <Form.Text className="text-danger">{nhapLaiMKMess}</Form.Text>
                </Form.Group>
                <hr className="mt-4" />
                <h5 className="text-center">Thông Tin Người Dùng</h5>
                <Row>
                  <Col xs="12" md="8">
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: "500" }}>
                        Họ Tên
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập Họ Tên..."
                        defaultValue={hoTen}
                        onBlur={(e) => {
                          setHoTen(e.target.value);
                          if (e.target.value == "")
                            setHoTenMess("Họ tên không được để trống.");
                        }}
                      />
                      <Form.Text className="text-danger">{hotenMess}</Form.Text>
                    </Form.Group>
                  </Col>
                  <Col xs="12" md="4">
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: "500" }}>
                        Giới Tính
                      </Form.Label>
                      <Select
                        options={dataGioiTinh}
                        value={gioiTinh}
                        id="gioitinh"
                        onChange={setGioiTinh}
                        className="zIndex-997"
                      />
                      <Form.Text className="text-danger"></Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                {chucVu.value > 2 ? (
                  <>
                    <Row>
                      <Col xs="12" md="8">
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: "500" }}>
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            defaultValue={emailNguoiDung}
                            onChange={(e) => handleEmailCheck(e)}
                            placeholder="Nhập Email..."
                            onBlur={(e) => {
                              setEmailNguoiDung(e.target.value);
                              if (e.target.value == "")
                                setEmailMess("Email không được để trống.");
                            }}
                          />
                          <Form.Text className="text-danger">
                            {emailMess}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col xs="12" md="4">
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: "500" }}>
                            Số Điện Thoại
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={phone}
                            onChange={(e) => handlePhoneCheck(e)}
                            placeholder="Nhập Số Điện Thoại..."
                            onBlur={(e) => {
                              setPhone(e.target.value);
                              if (e.target.value == "")
                                setPhoneMess(
                                  "Số điện thoại không được để trống."
                                );
                            }}
                          />
                          <Form.Text className="text-danger">
                            {phoneMess}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xx="12" md="6">
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: "500" }}>
                            Mã Định Danh
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={maDinhDanh}
                            onChange={(e) => handleMaDinhDanhCheck(e)}
                            placeholder="Nhập Mã định danh..."
                          />
                          <Form.Text className="text-danger">
                            {maDinhDanhMess}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col xx="12" md="6">
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: "500" }}>
                            Mã Lớp
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={maLop}
                            onBlur={(e) => setMaLop(e.target.value)}
                            placeholder="Nhập Mã lớp..."
                          />
                          <Form.Text className="text-danger"></Form.Text>
                        </Form.Group>
                      </Col>
                      <Col xx="12">
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: "500" }}>
                            Thuộc Đơn Vị
                          </Form.Label>
                          <Select
                            options={dataDonVi}
                            value={donVi}
                            id="donvi"
                            onChange={setDonVi}
                            className="zIndex-998"
                          />
                          <Form.Text className="text-danger"></Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col xs="12">
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: "500" }}>
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            defaultValue={emailNguoiDung}
                            onChange={(e) => handleEmailCheck(e)}
                            placeholder="Nhập Email..."
                            onBlur={(e) => {
                              setEmailNguoiDung(e.target.value);
                              if (e.target.value == "")
                                setEmailMess("Email không được để trống.");
                            }}
                          />
                          <Form.Text className="text-danger">
                            {emailMess}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col xs="12">
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: "500" }}>
                            Số Điện Thoại
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={phone}
                            onChange={(e) => handlePhoneCheck(e)}
                            placeholder="Nhập Số Điện Thoại..."
                            onBlur={(e) => {
                              setPhone(e.target.value);

                              if (e.target.value == "") {
                                setPhoneMess(
                                  "Số điện thoại không được để trống."
                                );
                              }
                            }}
                          />
                          <Form.Text className="text-danger">
                            {phoneMess}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Row>
                <Col xs="12" md="6" className="py-1">
                  <Button
                    variant="contained"
                    style={{ padding: "7px 60px", width: "100%" }}
                    onClick={() => {
                      if (maNguoiDung == -1) addNguoiDung();
                      else handleUpdateNguoiDung();
                    }}
                  >
                    {maNguoiDung == -1 ? "Add" : "Save"}
                  </Button>
                </Col>
                <Col xs="12" md="6" className="py-1">
                  <Button
                    variant="contained"
                    color="error"
                    style={{ padding: "7px 60px", width: "100%" }}
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
