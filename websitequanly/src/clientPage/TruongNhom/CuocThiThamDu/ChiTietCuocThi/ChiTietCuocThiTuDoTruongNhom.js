/* eslint-disable eqeqeq */
import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { MusicNote } from "@mui/icons-material";
import TopBar from "../../../../components/topbars/TopBar";
import Sidebar from "../../../../clientComponent/Siderbar/Sidebar";
import Footer from "../../../../components/footer/Footer";
import { Divider } from "@mui/material";
import TietMucCuocThiDoanDoi from "./TietMucCuocThi/TietMucCuocThiDoanDoi";

export default function ChiTietCuocThiTuDoTruongNhom() {
  const params = useParams();

  const dayjs = require("dayjs");

  const [tenCuocThi, setTenCuocThi] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [hinhThuc, setHinhThuc] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [trangThai, setTrangThai] = useState();
  const [phanThi, setPhanThi] = useState(1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [soVongThi, setSoVongThi] = useState(1);
  const [tenSoVongThi, setTenSoVongThi] = useState("");
  const [thangDiem, setThangDiem] = useState(1);
  const [noiDungCuocThi, setNoiDungCuocThi] = useState("");
  const [diaDiemToChuc, setDiaDiemToChuc] = useState(5);
  const [choPhepDangKy, setChoPhepDangKy] = useState();

  // eslint-disable-next-line no-unused-vars
  const [soLuongTietMuc, setSoLuongTietMuc] = useState();
  // eslint-disable-next-line no-unused-vars
  const [refresh, setRefresh] = useState(-1);

  const [dataGiamKhao, setDataGiamKhao] = useState([]);

  let giamKhao = "";
  if (dataGiamKhao.length == 0) giamKhao = "Chưa mời.";

  dataGiamKhao.forEach((d) => {
    if (d.stt == 1) giamKhao = giamKhao + d.HoTenNguoiDung;
    else {
      giamKhao = giamKhao + ", " + d.HoTenNguoiDung;
    }
  });

  useEffect(() => {
    const getDataGiamKhao = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/giamkhaocuocthi/${params.idCuocThi}`
      );
      setDataGiamKhao(data);
    };
    getDataGiamKhao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getDataChiTietCuocThi = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/admin/tatcacuocthi/${params.idCuocThi}`
      );
      data.forEach((d) => {
        if (d.SoVongThi == 1) {
          setTenSoVongThi("1 Vòng");
        }
        if (d.SoVongThi == 2) {
          setTenSoVongThi("2 Vòng (Sơ tuyển - Chung kết)");
        }
        if (d.SoVongThi == 3) {
          setTenSoVongThi("3 Vòng (Sơ tuyển - Chung khảo - Chung kết)");
        }
      });

      setTenCuocThi(data[0].TenCuocThi);
      setHinhThuc(data[0].MaHinhThucCuocThi);
      setNoiDungCuocThi(data[0].NoiDungCuocThi);
      setDiaDiemToChuc(data[0].TenDiaDiem);
      setNgayBatDau(dayjs(data[0].NgayBatDau).format("DD/MM/YYYY"));
      setNgayKetThuc(dayjs(data[0].NgayKetThuc).format("DD/MM/YYYY"));
      setSoVongThi(data[0].SoVongThi);
      setThangDiem(data[0].MaThangDiem);
      setPhanThi(data[0].MaPhanThi);
      setChoPhepDangKy(data[0].ChoPhepDangKy);
      setTrangThai(data[0].TenTrangThai);
    };
    getDataChiTietCuocThi();

    const getDataCuocThiTuDo = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/cuocthi/${
          params.idCuocThi
        }/vongthi/1/truongnhom/${localStorage.getItem("MaNguoiDung")}`
      );
      setSoLuongTietMuc(data.length);
    };
    getDataCuocThiTuDo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
      document.title = "Chi Tiết Cuộc Thi";
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper">
      <Container fluid style={{ display: "flex" }}>
        <div id="body-pd" className="body-pd">
          <TopBar />
          <Sidebar />
        </div>
        <Container
          fluid
          style={{ paddingTop: "13px", minHeight: "610px" }}
          id="container-bg"
        >
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
              <div id="chinhsuachuongtrinhtudo">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/userhome" className="link">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/cuocthithamdu" className="link">
                      Cuộc Thi Tham Dự
                    </Link>
                  </li>

                  <li className="breadcrumb-item active">Chi Tiết Cuộc Thi</li>
                </ol>

                {/* Thêm Cuộc Thi */}
                <div className="newContest text-start">
                  {/* Thêm Cuộc Thi */}
                  <div>
                    <h2 className="text-center d-flex align-items-center justify-content-center pb-3">
                      <MusicNote style={{ fontSize: "2.6rem" }} />
                      Chi Tiết Cuộc Thi
                      <MusicNote style={{ fontSize: "2.6rem" }} />
                    </h2>
                    <div className="mb-4">
                      <p
                        className="d-flex align-items-center"
                        style={{ fontWeight: "500" }}
                      >
                        <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                        &nbsp;Tên Cuộc Thi:&nbsp;
                        <span style={{ fontWeight: "400" }}>{tenCuocThi}.</span>
                      </p>
                      <p
                        className="d-flex align-items-center"
                        style={{ fontWeight: "500" }}
                      >
                        <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                        &nbsp;Hình Thức Cuộc Thi:&nbsp;
                        <span style={{ fontWeight: "400" }}>
                          Đăng Ký Thể Loại Tự Do.
                        </span>
                        &nbsp;Địa Điểm Tổ Chức:&nbsp;
                        <span style={{ fontWeight: "400" }}>
                          {diaDiemToChuc}.&nbsp;
                        </span>
                        Thời gian diễn ra: &nbsp;
                        <span style={{ fontWeight: "400" }}>
                          Từ {ngayBatDau} - {ngayKetThuc}.
                        </span>
                      </p>

                      <p
                        className="d-flex align-items-center"
                        style={{ fontWeight: "500" }}
                      >
                        <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                        &nbsp;Trạng Thái:{" "}
                        <span style={{ fontWeight: "400" }}>
                          &nbsp;{trangThai}.{" "}
                        </span>
                      </p>
                      <p
                        className="d-flex align-items-center"
                        style={{ fontWeight: "500" }}
                      >
                        <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                        &nbsp;Số Vòng Thi:{" "}
                        <span style={{ fontWeight: "400" }}>
                          &nbsp;{tenSoVongThi}.
                        </span>
                        &nbsp;Thang Điểm:{" "}
                        <span style={{ fontWeight: "400" }}>
                          &nbsp;{thangDiem * 10}.
                        </span>
                      </p>
                      <p
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                      &nbsp;Giám Khảo:{" "}
                      <span style={{ fontWeight: "400" }}>
                        &nbsp;{giamKhao}.{" "}
                      </span>
                    </p>
                      <p
                        className="d-flex align-items-center"
                        style={{ fontWeight: "500" }}
                      >
                        <span style={{ fontFamily: "Wingdings" }}>&#118;</span>
                        &nbsp;Nội Dung Cuộc Thi:&nbsp;
                      </p>
                      <div
                        style={{ paddingLeft: "15px" }}
                        dangerouslySetInnerHTML={{ __html: noiDungCuocThi }}
                      ></div>
                    </div>
                    <Divider />
                    <div>
                      <h2 className="text-center d-flex align-items-center justify-content-center pt-3">
                        <MusicNote style={{ fontSize: "2.6rem" }} /> Tiết Mục Dự
                        Thi
                        <MusicNote style={{ fontSize: "2.6rem" }} />
                      </h2>
                    </div>
                    <div>
                      <TietMucCuocThiDoanDoi
                        SoVongThi={soVongThi}
                        phanThi={phanThi}
                        choPhepDangKy={choPhepDangKy}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Container>
      </Container>
      <Footer />
    </div>
  );
}
