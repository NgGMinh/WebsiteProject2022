const adminController = require('../controllers/adminControllers.js')
const router = require('express').Router()

// Router Chương Trình
router.post('/tatcachuongtrinh',  adminController.getAllChuongTrinh);
router.post('/filterchuongtrinh/ngay',  adminController.getAllDataLocChuongTrinhTheoNgay);
router.post('/filterchuongtrinh/thang',  adminController.getAllDataLocChuongTrinhTheoThang);
router.post('/filterchuongtrinh/nam',  adminController.getAllDataLocChuongTrinhTheoNam);

router.post('/chitietchuongtrinh/:idChuongTrinh',  adminController.getDetailChuongTrinh);
router.post('/thisinhchuongtrinh/:idChuongTrinh',  adminController.getThiSinhThamDuChuongTrinh);
router.post('/tietmucthuocchuongtrinh/:idChuongTrinh',  adminController.getAllTietMucThuocChuongTrinh);

router.post('/addtietmucchuongtrinh', adminController.getAddTietMucChuongTrinh);
router.post('/addtietmucchuongtrinh/khonggiamkhao', adminController.getAddTietMucChuongTrinhKhongGiamKhao);

router.post('/updatechuongtrinh/:idChuongTrinh', adminController.getUpdateChuongTrinh);
router.post('/deletechuongtrinh/:idChuongTrinh', adminController.getDeleteChuongTrinh);
// router.post('/danhsachtietmuc/:idChuongTrinh',  adminController.getDetailChuongTrinh);

// Router Cuộc Thi
router.post('/tatcacuocthi',  adminController.getAllCuocThi);
router.post('/cuocthichuahoacdangdienra',  adminController.getAllCuocThiChuaHoacDangDienRa);
router.post('/filtercuocthi/ngay',  adminController.getAllDataLocCuocThiTheoNgay);
router.post('/filtercuocthi/thang',  adminController.getAllDataLocCuocThiTheoThang);
router.post('/filtercuocthi/nam',  adminController.getAllDataLocCuocThiTheoNam);
router.post('/tatcacuocthi/:idCuocThi',  adminController.getDetailCuocThi);
router.post('/updatecuocthi/:idCuocThi',  adminController.getUpdateThongTinCuocThi);

router.post('/addchuongtrinhcuocthi/:idCuocThi',  adminController.getAddChuongTrinhDuThi);

router.post('/themcuocthitruyenthong',  adminController.getAddChuongTrinhTruyenThong);
router.post('/themcuocthitudo',  adminController.getAddDangKyTheLoaiTuDo);

router.post('/chuongtrinhthuoccuocthi/:idCuocThi',  adminController.getAllChuongTrinhThuocCuocThi);
router.post('/chuongtrinhthuoccuocthi/:idCuocThi/ngay',  adminController.getAllChuongTrinhThuocCuocThiTheoNgay);
router.post('/updatecongbo/thichuongtrinh/:idCuocThi',  adminController.getUpdateCongBoKetQuaThiChuongTrinh);
router.post('/updatecongbo/tudo/:idCuocThi/:VongThi',  adminController.getUpdateCongBoKetQuaCuocThiTuDo);

router.post('/chuongtrinhthuoccuocthi/chitiet/:idCuocThi',  adminController.getAllChiTietChuongTrinhThuocCuocThi);

router.post('/updatetrangthaitietmuc/:idCuocThi/:VongThi',  adminController.getUpdateTrangThaiTietMuc);

router.post('/allmagiamkhao/:idCuocThi',  adminController.getAllMaGiamKhaoCuocThi);

router.post('/giamkhaocuocthi/:idCuocThi',  adminController.getAllGiamKhaoCuocThi);
router.post('/giamkhaokhongthuoccuocthi/:idCuocThi',  adminController.getAllGiamKhaoKhongThuocCuocThi);
router.post('/addgiamkhaocuocthi/:idCuocThi',  adminController.getAddGiamKhaoCuocThi);

router.post('/deletegiamkhao/:idCuocThi/:MaGiamKhao',  adminController.getDeleteGiamKhaoCuocThi);

router.post('/allmatietmuccuocthi/:idCuocThi',  adminController.getAllMaTietMucCuocThi);

router.post('/alltietmuccuocthi/:idCuocThi',  adminController.getAllTietMucCaCuocThi);
router.post('/allthisinhcuocthi/:idCuocThi',  adminController.getAllThiSinhCaCuocThi);

router.post('/alltietmuccuocthichuongtrinh/:idCuocThi',  adminController.getAllTietMucCaCuocThiChuongTrinh);
router.post('/allthisinhcuocthichuongtrinh/:idCuocThi',  adminController.getAllThiSinhCuocThiChuongTrinh);


router.post('/tietmucthuoccuocthicanhan/:idCuocThi/vongthi/:idVongThi',  adminController.getAllTietMucThuocCuocThiCaNhan);
router.post('/tietmucthuoccuocthicanhan/:idCuocThi/vongthi/:idVongThi/ngay',  adminController.getAllTietMucThuocCuocThiCaNhanTheoNgay);

router.post('/tietmucthuoccuocthidoinhom/:idCuocThi/vongthi/:idVongThi',  adminController.getAllTietMucThuocCuocThiDoiNhom);
router.post('/tietmucthuoccuocthidoinhom/:idCuocThi/vongthi/:idVongThi/ngay',  adminController.getAllTietMucThuocCuocThiDoiNhomTheoNgay);

router.post('/thisinhcuocthicanhan/:idCuocThi/vongthi/:idVongThi',  adminController.getAllThiSinhThamDuCuocThiCaNhan);
router.post('/thisinhcuocthidoinhom/:idCuocThi/vongthi/:idVongThi',  adminController.getAllThiSinhThamDuCuocThiDoiNhom);

router.post('/doandoiconhansotoithieu/:nhanSoToiThieu',  adminController.getAllDoanDoiCoNhanSoToiThieu);
router.post('/doandoiconhanphuhop/codinh/:nhanSoToiThieu',  adminController.getAllDoanDoiPhuHopTietMucNhanSoCoDinh);

router.post('/thisinhdauvongtruoc/:idCuocThi/vongthi/:idVongThi',  adminController.getAllThiSinhDauVongTruoc);
router.post('/doandoidauvongtruoc/:idCuocThi/vongthi/:idVongThi/nhanso/:nhanSoToiThieu',  adminController.getAllDoanDoiDauVongTruoc);

router.post('/addtietmuccanhan/:idCuocThi/vongthi/:idVongThi',  adminController.getAddTietMucCaNhan);
router.post('/addtietmuccanhan/khonggiamkhao/:idCuocThi/vongthi/:idVongThi',  adminController.getAddTietMucCaNhanKhongGiamKhao);

router.post('/addtietmucdoinhom/:idCuocThi/vongthi/:idVongThi',  adminController.getAddTietMucDoiNhom);
router.post('/addtietmucdoinhom/khonggiamkhao/:idCuocThi/vongthi/:idVongThi',  adminController.getAddTietMucDoiNhomKhongGiamKhao);

router.post('/thisinhtrinhbaytietmuc/:idTietMuc',  adminController.getAllThiSinhTrinhBayTietMuc);
router.post('/doinhomtrinhbaytietmuc/:idTietMuc',  adminController.getAllDoiNhomTrinhBayTietMuc);

router.post('/doinhomkhongtrinhbay/nhansocodinh/:idDoanDoi/:nhanSo',  adminController.getAllDoiNhomKhongTrinhBayNhanSoTietMucCoDinh);
router.post('/doinhomkhongtrinhbay/nhansokhongcodinh/:idDoanDoi/:nhanSo',  adminController.getAllDoiNhomKhongTrinhBayNhanSoTietMucKhongCoDinh);

router.post('/chuongtrinh/:idChuongTrinh/thisinhtrinhbay/:idTietMuc',  adminController.getAllThiSinhTrinhBayTietMucChuongTrinh);
router.post('/chuongtrinh/:idChuongTrinh/thisinhkhongtrinhbay/:idTietMuc',  adminController.getAllThiSinhChuongTrinhKhongTrinhBay);
router.post('/bosungthanhvientrinhbay/:idTietMuc',  adminController.getAddThanhVienBoSungTrinhBayTietMuc);
router.post('/deletethanhvientrinhbay/:idTietMuc',  adminController.getDeleteThanhVienTrinhBayTietMuc);

router.post('/thisinhkhongtrinhbay/:idThiSinh', adminController.getAllThiSinhKhongTrinhBayTietMucCaNhan);
router.post('/updatethisinhtrinhbay',  adminController.getUpdateThiSinhTrinhBay);
router.post('/changedoandoitrinhbay',  adminController.getChangeDoanDoiTrinhBay);

// Router Địa Điểm Tổ Chức
router.post('/diadiem',  adminController.getAllDiaDiem);
router.post('/themdiadiem',  adminController.getAddDiaDiem);
router.post('/updatediadiem/:MaDiaDiem',  adminController.getUpdateDiaDiem);
router.post('/deletediadiem/:MaDiaDiem',  adminController.getDeleteDiaDiem);

// Router Đơn vị Tổ Chức
router.post('/donvitochuc',  adminController.getAllDonViToChuc);
router.post('/themdonvitochuc',  adminController.getAddDonViToChuc);
router.post('/updatedonvitochuc/:MaDonVi',  adminController.getUpdateDonViToChuc);
router.post('/deletedonvitochuc/:MaDonVi',  adminController.getDeleteDonViToChuc);

// Router Giải Thưởng
router.post('/giaithuong',  adminController.getAllGiaiThuong);
router.post('/themgiaithuong',  adminController.getAddGiaiThuong);
router.post('/updategiaithuong/:MaGiaiThuong',  adminController.getUpdateGiaiThuong);
router.post('/deletegiaithuong/:MaGiaiThuong',  adminController.getDeleteGiaiThuong);

// Router Trạng Thái
router.post('/trangthai',  adminController.getAllTrangThai);

// Router Tiết Mục
router.post('/loaitietmuc',  adminController.getAllLoaiTietMuc);
router.post('/loaitietmucphuhop/:NhanSo',  adminController.getAllLoaiTietMucPhuHop);
router.post('/addloaitietmuc',  adminController.getAddLoaiTietMuc);
router.post('/updateloaitietmuc/:MaLoaiTietMuc',  adminController.getUpdateLoaiTietMuc);
router.post('/deleteloaitietmuc/:MaLoaiTietMuc',  adminController.getDeleteLoaiTietMuc);

router.post('/chitiettietmuc/:idTietMuc',  adminController.getDetailTietMuc);
router.post('/updatetietmuc/:idTietMuc',  adminController.getUpdateTietMuc);
router.post('/deletetietmuc/:idTietMuc',  adminController.getDeleteTietMuc);

router.post('/alltietmuc/chuongtrinhvannghe',  adminController.getAllTietMucChuongTrinhVanNghe);

router.post('/alltietmuc/chuongtrinhduthi',  adminController.getAllTietMucChuongTrinhDuThi);
router.post('/alltietmuc/chuongtrinhduthi/ngay',  adminController.getAllTietMucChuongTrinhDuThiTheoNgay);
router.post('/alltietmuc/chuongtrinhduthi/thang',  adminController.getAllTietMucChuongTrinhDuThiTheoThang);
router.post('/alltietmuc/chuongtrinhduthi/nam',  adminController.getAllTietMucChuongTrinhDuThiTheoNam);

router.post('/alltietmuc/cuocthicanhan',  adminController.getAllTietMucCaNhan);
router.post('/alltietmuc/cuocthicanhan/ngay',  adminController.getAllTietMucCaNhanTheoNgay);
router.post('/alltietmuc/cuocthicanhan/thang',  adminController.getAllTietMucCaNhanTheoThang);
router.post('/alltietmuc/cuocthicanhan/nam',  adminController.getAllTietMucCaNhanTheoNam);

router.post('/alltietmuc/cuocthidoinhom',  adminController.getAllTietMucDoiNhom);
router.post('/alltietmuc/cuocthidoinhom/ngay',  adminController.getAllTietMucDoiNhomTheoNgay);
router.post('/alltietmuc/cuocthidoinhom/thang',  adminController.getAllTietMucDoiNhomTheoThang);
router.post('/alltietmuc/cuocthidoinhom/nam',  adminController.getAllTietMucDoiNhomTheoNam);

// Router Đoàn đội văn nghệ
router.post('/tatcadoandoi',  adminController.getAllDoanDoi);
router.post('/adddoandoi',  adminController.getAddDoanDoi);
router.post('/chitietdoandoi/:idDoanDoi',  adminController.getDetailDoanDoi);
router.post('/tietmuccuadoandoi/:idDoanDoi',  adminController.getTietMucThamDuCuaDoanDoi);
router.post('/updatedoandoi/:idDoanDoi',  adminController.getUpdateDoanDoi);
router.post('/deletedoandoi/:idDoanDoi',  adminController.getDeleteDoanDoi);

router.post('/thisinhthuocdoandoi/:idDoanDoi',  adminController.getThiSinhThuocDoanDoi);

router.post('/addthanhvien/:idDoanDoi',  adminController.getAddThanhVienDoanDoi);
router.post('/updatethanhvien/:idThiSinh',  adminController.getUpdateThanhVienDoanDoi);
router.post('/deletethanhvien/:idDoanDoi/:idThiSinh',  adminController.getDeleteThanhVien);

router.post('/tatcathisinh',  adminController.getAllThiSinh);
router.post('/addthisinh',  adminController.getAddThiSinh);
router.post('/updatethisinh/:idThiSinh',  adminController.getUpdateThongTinThiSinh);
router.post('/thisinhthuocdonvi/:idDonVi',  adminController.getThiSinhThuocDonVi);
router.post('/thisinhthuocdoandoitruongdonvi/:idDoanDoi',  adminController.getThiSinhThuocDoanDoiTruongDonVi);

// Router Người Dùng
router.post('/tatcanguoidung',  adminController.getAllNguoiDung);
router.post('/nguoidungtruongnhom',  adminController.getAllNguoiDungTruongNhom);
router.post('/nguoidungtruongnhom/:MaDonVi',  adminController.getAllNguoiDungTruongNhomTheoDonVi);
router.post('/doandoi/nguoidungtruongnhom/:idDonVi',  adminController.getAllNguoiDungTruongNhomCoDoanDoi);
router.post('/chuyenmon',  adminController.getAllChuyenMon);
router.post('/addgiamkhao',  adminController.getAddGiamKhao);
router.post('/addquantrivien',  adminController.getAddQuanTriVien);
router.post('/addtruongnhom',  adminController.getAddTruongNhom);
router.post('/quantriviendetail/:idQuanTriVien',  adminController.getDetailQuanTriVien);

router.post('/updatenguoidung/:idNguoiDung',  adminController.getUpdateNguoiDung);
router.post('/updatenguoidung/truongnhomthisinh/:idNguoiDung',  adminController.getUpdateNguoiDungTruongNhomThiSinh);

router.post('/changematkhau/:idNguoiDung',  adminController.getChangeMatkhau);
router.post('/thongtincanhan/nguoidung/:idNguoiDung',  adminController.getUpdateThongTinCaNhanNguoiDung);
router.post('/thongtincanhan/truongnhomthisinh/:idNguoiDung',  adminController.getUpdateThongTinCaNhanTruongNhomThiSinh);

//Router Thống Kê
router.post('/allthongke',  adminController.getAllThongKe);
router.post('/allthongke/ngay',  adminController.getAllThongKeTheoNgay);
router.post('/allthongke/thang',  adminController.getAllThongKeTheoThang);
router.post('/allthongke/nam',  adminController.getAllThongKeTheoNam);

router.post('/thongkecuthe/:idCuocThi',  adminController.getAllThongKeCuocThiCuThe);

router.post('/thongkecuthe/:idCuocThi/songay',  adminController.getAllThongKeCuocThiCuTheSoNgay);
router.post('/thongkecuthe/:idCuocThi/tatcangay',  adminController.getAllThongKeCuocThiCuTheTatCaNgay);
router.post('/thongkecuthe/:idCuocThi/theongay',  adminController.getAllThongKeCuocThiCuTheTheoNgay);

router.post('/thongkecuthe/:idCuocThi/sovong',  adminController.getAllThongKeCuocThiCuTheSoVong);
router.post('/thongkecuthe/:idCuocThi/tatcavong',  adminController.getAllThongKeCuocThiCuTheTatCaVong);
router.post('/thongkecuthe/:idCuocThi/theovong',  adminController.getAllThongKeCuocThiCuTheTheoVong);

// Log in & Log out
router.post('/addchuongtrinh',  adminController.getAddChuongTrinh);
router.post('/adminlogin',  adminController.getAdminLogin)
router.get('/admingetlogin',  adminController.getAdminGetLogin)
router.get('/adminlogout',  adminController.getAdminLogout)


module.exports = router