/* eslint-disable eqeqeq */
import "./App.css";
import Home from "./pages/Home/Home.js";
import Login from "./pages/DangNhap/Login";
import ChuongTrinhVanNghe from "./pages/ChuongTrinhVanNghe/ChuongTrinhVanNghe";
import CuocThiVanNghe from "./pages/CuocThiVanNghe/CuocThiVanNghe";
import DoanDoiThiSinh from "./pages/DoanDoiThiSinh/DoanDoiThiSinh";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import QuanLyNguoiDung from "./pages/QuanLyNguoiDung/QuanLyNguoiDung";
import Drawer from "./components/drawer/Drawer";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import { Container } from "react-bootstrap";
import ThongKe from "./pages/ThongKe/ThongKe";
import ThongTinTaiKhoan from "./pages/ThongTinTaiKhoan/ThongTinTaiKhoan";
import ThemDoanDoi from "./pages/DoanDoiThiSinh/ThemDoanDoi";
import ChinhSuaDoanDoi from "./pages/DoanDoiThiSinh/ChinhSuaDoanDoi";
import Axios from "axios";
import Reload from "./pages/Reload/Reload";
import AppProvider from "./components/context/AppProvider";
// import ChinhSuaCuocThiTruyenThong from "./pages/CuocThiVanNghe/ChinhSuaCuocThi/ChinhSuaCuocThiTruyenThong";
// import ChinhSuaCuocThiTuDo from "./pages/CuocThiVanNghe/ChinhSuaCuocThi/ChinhSuaCuocThiTuDo";
import ThemTietMucCaNhan from "./pages/CuocThiVanNghe/ThemTietMuc/ThemTietMucCaNhan";
import ThemTietMucDoiNhom from "./pages/CuocThiVanNghe/ThemTietMuc/ThemTietMucDoiNhom";
import ThemCuocThi from "./pages/CuocThiVanNghe/ThemCuocThi/ThemCuocThi";
import ThemTietMucChuongTrinh from "./pages/ChuongTrinhVanNghe/ThemTietMuc/ThemTietMucChuongTrinh";
import ThemChuongTrinh from "./pages/ChuongTrinhVanNghe/ThemChuongTrinh/ThemChuongTrinh";
import ChinhSuaChuongTrinh from "./pages/ChuongTrinhVanNghe/ChinhSuaChuongTrinh/ChinhSuaChuongTrinh";
import NotFound from "./pages/NotFound/NotFound";
import ThemChuongTrinhDuThi from "./pages/CuocThiVanNghe/ThemChuongTrinh/ThemChuongTrinhDuThi";
import ChinhSuaChuongTrinhDuThi from "./pages/CuocThiVanNghe/ThemChuongTrinh/ChinhSuaChuongTrinhDuThi";
import ThemTietMucChuongTrinhDuThi from "./pages/CuocThiVanNghe/ThemTietMuc/ThemTietMucChuongTrinhDuThi";
import TietMucVanNghe from "./pages/QuanLyTietMucVanNghe/TietMucVanNghe";
import ChinhSuaTietMucCaNhan from "./pages/CuocThiVanNghe/ChinhSuaTietMuc.js/ChinhSuaTietMucCaNhan";
import ChinhSuaTietMucDoiNhom from "./pages/CuocThiVanNghe/ChinhSuaTietMuc.js/ChinhSuaTietMucDoiNhom";
import ChinhSuaTietMucChuongTrinhDuThi from "./pages/CuocThiVanNghe/ChinhSuaTietMuc.js/ChinhSuaTietMucChuongTrinhDuThi";
import ClientHome from "./clientPage/ClientHome/ClientHome";
import CuocThiLamGiamKhao from "./clientPage/GiamKhao/CuocThiLamGiamKhao/CuocThiLamGiamKhao";
import TietMucDaCham from "./clientPage/GiamKhao/TietMucDaCham/TietMucDaCham";
import ChiTietCuocThiTuDo from "./clientPage/GiamKhao/CuocThiLamGiamKhao/ChiTietCuocThi/ChiTietCuocThiTuDo";
import ChiTietCuocThiTruyenThong from "./clientPage/GiamKhao/CuocThiLamGiamKhao/ChiTietCuocThi/ChiTietCuocThiTruyenThong";
import ChiTietChuongTrinh from "./clientPage/GiamKhao/CuocThiLamGiamKhao/ChiTietCuocThi/ChiTietChuongTrinh/ChiTietChuongTrinh";
import ChiTietCuocThiTuDoTruongNhom from "./clientPage/TruongNhom/CuocThiThamDu/ChiTietCuocThi/ChiTietCuocThiTuDoTruongNhom";
import ChiTietCuocThiTruyenThongTruongNhom from "./clientPage/TruongNhom/CuocThiThamDu/ChiTietCuocThi/ChiTietCuocThiTruyenThongTruongNhom";
import ChiTietChuongTrinhTruongNhom from "./clientPage/TruongNhom/CuocThiThamDu/ChiTietCuocThi/ChiTietChuongTrinh/ChiTietChuongTrinhTruongNhom";
import ThemTietMucTruongNhom from "./clientPage/TruongNhom/CuocThiThamDu/ChiTietCuocThi/ChiTietChuongTrinh/ThemTietMuc/ThemTietMucTruongNhom";
import ChinhSuaTietMucTruongNhom from "./clientPage/TruongNhom/CuocThiThamDu/ChiTietCuocThi/ChiTietChuongTrinh/ChinhSuaTietMuc/ChinhSuaTietMucTruongNhom";
import CuocThiThamDu from "./clientPage/TruongNhom/CuocThiThamDu/CuocThiThamDu";
import TietMucDuThi from "./clientPage/TruongNhom/TietMucDuThi/TietMucDuThi";
import TatCaDoanDoi from "./clientPage/TruongNhom/ThongTinDoanDoi/TatCaDoanDoi";
import ThongTinDoanDoi from "./clientPage/TruongNhom/ThongTinDoanDoi/ThongTinDoanDoi";
import ThongTinTaiKhoanClient from "./clientPage/ThongTinTaiKhoan/ThongTinTaiKhoanClient";
import DoiMatKhau from "./clientPage/DoiMatKhau/DoiMatKhau";
import DieuChinhThongTin from "./pages/CuocThiVanNghe/DieuChinhThongTin/DieuChinhThongTin";
import ChinhSuaCuocThi from "./pages/CuocThiVanNghe/ChinhSuaCuocThi/ChinhSuaCuocThi";
import DoiMatKhauQTV from "./pages/DoiMatKhau/DoiMatKhauQTV";

function App() {
  Axios.defaults.withCredentials = true;
  const ProtectRoutes = () => {
    const isAuth = localStorage.getItem("login");
    return isAuth === "true" ? <Outlet /> : <Navigate to="/" />;
  };
  document.title = "Website Quản lý công tác văn nghệ Trường Đại học Cần Thơ";

  return (
    <div className="App">
      {localStorage.getItem("chucvu") == 1 ? (
        <>
          <Router>
            <ScrollToTop>
              <AppProvider>
                <div className="wrapper">
                  <Container
                    fluid
                    style={{ display: "flex", transition: "0.55s" }}
                  >
                    <Drawer />
                    <Container
                      fluid
                      style={{ paddingTop: "13px", minHeight: "610px" }}
                      id="container-bg"
                    >
                      <Routes>
                        <Route path="/">
                          <Route
                            index
                            element={
                              localStorage.getItem("chucvu") == 1 ? (
                                <Navigate to="/home" />
                              ) : (
                                <Reload />
                              )
                            }
                          />
                          <Route element={<ProtectRoutes />}>
                            <>
                              <Route path="/home" element={<Home />} />

                              {/* Route Chương Trình Văn Nghệ */}
                              <Route
                                path="/tatcachuongtrinh"
                                element={<ChuongTrinhVanNghe />}
                              />
                              <Route
                                path="/themchuongtrinh"
                                element={<ThemChuongTrinh />}
                              />
                              <Route
                                path="/themtietmucchuongtrinh/:idChuongTrinh"
                                element={<ThemTietMucChuongTrinh />}
                              />
                              <Route
                                path="/chinhsuachuongtrinh/:idChuongTrinh"
                                element={<ChinhSuaChuongTrinh />}
                              />

                              {/* Route Cuộc Thi Văn Nghệ */}
                              <Route
                                path="/tatcacuocthi"
                                element={<CuocThiVanNghe />}
                              />
                              <Route
                                path="/themcuocthi"
                                element={<ThemCuocThi />}
                              />

                              <Route
                                path="/chinhsuacuocthi/:idCuocThi"
                                element={<ChinhSuaCuocThi />}
                              />

                              {/* <Route
                                path="/chinhsuacuocthi/truyenthong/:idCuocThi/themchuongtrinhduthi"
                                element={<ThemChuongTrinhDuThi />}
                              /> */}
                              <Route
                                path="/chinhsuacuocthi/:idCuocThi/themchuongtrinhduthi"
                                element={<ThemChuongTrinhDuThi />}
                              />
                              {/* <Route
                                path="/chinhsuacuocthi/truyenthong/:idCuocThi/chinhsuachuongtrinh/:idChuongTrinh"
                                element={<ChinhSuaChuongTrinhDuThi />}
                              /> */}
                              <Route
                                path="/chinhsuacuocthi/:idCuocThi/chinhsuachuongtrinh/:idChuongTrinh"
                                element={<ChinhSuaChuongTrinhDuThi />}
                              />
                              {/* <Route
                                path="/chinhsuacuocthi/truyenthong/:idCuocThi/chinhsuachuongtrinh/:idChuongTrinh/themtietmuc"
                                element={<ThemTietMucChuongTrinhDuThi />}
                              /> */}
                              <Route
                                path="/chinhsuacuocthi/:idCuocThi/chinhsuachuongtrinh/:idChuongTrinh/themtietmuc"
                                element={<ThemTietMucChuongTrinhDuThi />}
                              />
                              {/* <Route
                                path="/chinhsuacuocthi/truyenthong/:idCuocThi/chinhsuachuongtrinh/:idChuongTrinh/chinhsuatietmuc/:idTietMuc"
                                element={<ChinhSuaTietMucChuongTrinhDuThi />}
                              /> */}
                              <Route
                                path="/chinhsuacuocthi/:idCuocThi/chinhsuachuongtrinh/:idChuongTrinh/chinhsuatietmuc/:idTietMuc"
                                element={<ChinhSuaTietMucChuongTrinhDuThi />}
                              />
                              {/* <Route
                                path="/chinhsuacuocthi/truyenthong/:idCuocThi"
                                element={<ChinhSuaCuocThiTruyenThong />}
                              /> */}
                              {/* <Route
                                path="/chinhsuacuocthi/dangkytudo/:idCuocThi"
                                element={<ChinhSuaCuocThiTuDo />}
                              /> */}
                              <Route
                                path="/themtietmuccuocthi/canhan/:idCuocThi/vongthi/:idVongThi"
                                element={<ThemTietMucCaNhan />}
                              />
                              <Route
                                path="/themtietmuccuocthi/doinhom/:idCuocThi/vongthi/:idVongThi"
                                element={<ThemTietMucDoiNhom />}
                              />
                              {/* <Route
                                path="/chinhsuacuocthi/dangkytudo/:idCuocThi/canhan/chinhsuatietmuc/:idTietMuc"
                                element={<ChinhSuaTietMucCaNhan />}
                              />
                              <Route
                                path="/chinhsuacuocthi/dangkytudo/:idCuocThi/doinhom/chinhsuatietmuc/:idTietMuc"
                                element={<ChinhSuaTietMucDoiNhom />}
                              /> */}
                              <Route
                                path="/chinhsuacuocthi/:idCuocThi/canhan/chinhsuatietmuc/:idTietMuc"
                                element={<ChinhSuaTietMucCaNhan />}
                              />
                              <Route
                                path="/chinhsuacuocthi/:idCuocThi/doinhom/chinhsuatietmuc/:idTietMuc"
                                element={<ChinhSuaTietMucDoiNhom />}
                              />
                              <Route
                                path="/dieuchinhthongtin"
                                element={<DieuChinhThongTin />}
                              />

                              {/* Route Đoàn Đội, Thí Sinh */}
                              <Route
                                path="/tatcadoandoi"
                                element={<DoanDoiThiSinh />}
                              />
                              <Route
                                path="themdoandoi"
                                element={<ThemDoanDoi />}
                              />
                              <Route
                                path="chinhsuadoandoi/:idDoanDoi"
                                element={<ChinhSuaDoanDoi />}
                              />

                              {/* Route Người Dùng */}
                              <Route
                                path="/quanlynguoidung"
                                element={<QuanLyNguoiDung />}
                              />

                              {/* Route Tiết Mục Văn Nghệ */}
                              <Route
                                path="/tietmucvannghe"
                                element={<TietMucVanNghe />}
                              />

                              {/* Route Thống Kê */}
                              <Route path="/thongke" element={<ThongKe />} />

                              {/* Route Thông Tin Tài Khoản */}
                              <Route
                                path="/thongtintaikhoan"
                                element={<ThongTinTaiKhoan />}
                              />
                              <Route
                                path="/doimatkhau"
                                element={<DoiMatKhauQTV />}
                              />

                              <Route path="*" element={<NotFound />} />
                            </>
                          </Route>
                        </Route>
                      </Routes>
                    </Container>
                  </Container>
                  <Footer />
                </div>
              </AppProvider>
            </ScrollToTop>
          </Router>
        </>
      ) : (
        <>
          <Router>
            <ScrollToTop>
              <Routes>
                <Route path="/">
                  <Route index element={<Login />} />
                  <Route element={<ProtectRoutes />}>
                    <Route path="/userhome" element={<ClientHome />} />
                    <Route path="/home" element={<NotFound />} />
                    <Route
                      path="/giamkhaocuocthi"
                      element={<CuocThiLamGiamKhao />}
                    />
                    <Route path="/tietmucdacham" element={<TietMucDaCham />} />

                    <Route
                      path="/chitietcuocthi/tudo/:idCuocThi"
                      element={<ChiTietCuocThiTuDo />}
                    />
                    <Route
                      path="/chitietcuocthi/truyenthong/:idCuocThi"
                      element={<ChiTietCuocThiTruyenThong />}
                    />
                    <Route
                      path="/chitietcuocthi/truyenthong/:idCuocThi/chitietchuongtrinh/:idChuongTrinh/chamdiem"
                      element={<ChiTietChuongTrinh />}
                    />

                    <Route path="/cuocthithamdu" element={<CuocThiThamDu />} />
                    <Route path="/tietmucduthi" element={<TietMucDuThi />} />
                    <Route path="/thongtindoandoi" element={<TatCaDoanDoi />} />
                    <Route
                      path="/thongtindoandoi/:idDoanDoi"
                      element={<ThongTinDoanDoi />}
                    />
                    <Route
                      path="/thongtintaikhoan"
                      element={<ThongTinTaiKhoanClient />}
                    />
                    <Route path="/doimatkhau" element={<DoiMatKhau />} />
                    <Route
                      path="/chitietcuocthi/truyenthong/:idCuocThi/:idTruongNhom"
                      element={<ChiTietCuocThiTruyenThongTruongNhom />}
                    />
                    <Route
                      path="/chitietcuocthi/tudo/:idCuocThi/:idTruongNhom"
                      element={<ChiTietCuocThiTuDoTruongNhom />}
                    />
                    <Route
                      path="/chitietcuocthi/truyenthong/:idCuocThi/chitietchuongtrinh/:idChuongTrinh/:idTruongNhom"
                      element={<ChiTietChuongTrinhTruongNhom />}
                    />
                    <Route
                      path="/chitietcuocthi/truyenthong/:idCuocThi/chitietchuongtrinh/:idChuongTrinh/:idTruongNhom/themtietmuc"
                      element={<ThemTietMucTruongNhom />}
                    />
                    <Route
                      path="/chitietcuocthi/truyenthong/:idCuocThi/chitietchuongtrinh/:idChuongTrinh/:idTruongNhom/chinhsuatietmuc/:idTietMuc"
                      element={<ChinhSuaTietMucTruongNhom />}
                    />
                  </Route>
                </Route>
              </Routes>
            </ScrollToTop>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
