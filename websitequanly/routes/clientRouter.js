const clientController = require('../controllers/clientControllers.js');
const router = require('express').Router()

////////////////////////////////////////////////////////////////////////
////Action Giám Khảo
////////////////////////////////////////////////////////////////////////
router.post('/giamkhaodetail/:idGiamKhao',  clientController.getDetailGiamKhao);

router.post('/allcuocthilamgiamkhao/:idGiamKhao',  clientController.getAllCuocThiLamGiamKhao);
router.post('/allcuocthilamgiamkhao/:idGiamKhao/ngay',  clientController.getAllCuocThiLamGiamKhaoTheoNgay);
router.post('/allcuocthilamgiamkhao/:idGiamKhao/thang',  clientController.getAllCuocThiLamGiamKhaoTheoThang);
router.post('/allcuocthilamgiamkhao/:idGiamKhao/nam',  clientController.getAllCuocThiLamGiamKhaoTheoNam);

router.post('/allcuocthichuahoanthanh/:idGiamKhao',  clientController.getAllCuocThiChuaHoanThanh);

router.post('/alltietmuccanchamdiem/:idGiamKhao',  clientController.getAllTietMucCanChamDiem);

router.post('/alltietmucdachamdiem/:idGiamKhao',  clientController.getAllTietMucDaChamDiem);
router.post('/alltietmucdachamdiem/:idGiamKhao/ngay',  clientController.getAllTietMucDaChamDiemTheoNgay);
router.post('/alltietmucdachamdiem/:idGiamKhao/thang',  clientController.getAllTietMucDaChamDiemTheoThang);
router.post('/alltietmucdachamdiem/:idGiamKhao/nam',  clientController.getAllTietMucDaChamDiemTheoNam);

router.post('/alltietmucchuongtrinhdachamdiem/:idGiamKhao',  clientController.getAllTietMucChuongTrinhDaChamDiem);
router.post('/alltietmucchuongtrinhdachamdiem/:idGiamKhao/ngay',  clientController.getAllTietMucChuongTrinhDaChamDiemTheoNgay);
router.post('/alltietmucchuongtrinhdachamdiem/:idGiamKhao/thang',  clientController.getAllTietMucChuongTrinhDaChamDiemTheoThang);
router.post('/alltietmucchuongtrinhdachamdiem/:idGiamKhao/nam',  clientController.getAllTietMucChuongTrinhDaChamDiemTheoNam);

router.post('/tietmucchamdiemcuocthicanhan/:idCuocThi/vongthi/:idVongThi/giamkhao/:idGiamKhao', clientController.getAllTietMucChamDiemCuocThiCaNhan);
router.post('/tietmucchamdiemcuocthicanhan/:idCuocThi/vongthi/:idVongThi/giamkhao/:idGiamKhao/ngay', clientController.getAllTietMucChamDiemCuocThiCaNhanTheoNgay);

router.post('/tietmucchamdiemcuocthidoinhom/:idCuocThi/vongthi/:idVongThi/giamkhao/:idGiamKhao', clientController.getAllTietMucChamDiemCuocThiDoiNhom);
router.post('/tietmucchamdiemcuocthidoinhom/:idCuocThi/vongthi/:idVongThi/giamkhao/:idGiamKhao/ngay', clientController.getAllTietMucChamDiemCuocThiDoiNhomTheoNgay);

router.post('/allchuongtrinhcuocthitruyenthong/:idCuocThi/giamkhao/:idGiamKhao', clientController.getAllChuongTrinhCuocThiTruyenThong);
router.post('/allchuongtrinhcuocthitruyenthong/:idCuocThi/giamkhao/:idGiamKhao/ngay', clientController.getAllChuongTrinhCuocThiTruyenThongTheoNgay);

router.post('/alltietmuchuongtrinh/:idCuocThi/chuongtrinh/:idChuongTrinh/giamkhao/:idGiamKhao', clientController.getAllTietMucChuongTrinh);

router.post('/updatediemtietmuc', clientController.getUpdateDiemTietMuc);
router.post('/updatediemtietmucchuongtrinh', clientController.getUpdateDiemTietMucChuongTrinh);

router.post('/updatetrangthaitietmuc', clientController.getUpdateTrangThaiTietMuc);

////////////////////////////////////////////////////////////////////////
////Action Trưởng Nhóm
////////////////////////////////////////////////////////////////////////
router.post('/truongnhomdetail/:idTruongNhom',  clientController.getDetailTruongNhom);
router.post('/alldoandoi/:idTruongNhom',  clientController.getAllDoanDoiLamTruongNhom);
router.post('/thamducuocthi/dangdienra/:idTruongNhom',  clientController.getCoThamDuCuocThiDangDienRa);

router.post('/thongtindoandoi/:idDoanDoi',  clientController.getDetailDoanDoi);
router.post('/allthanhvien/:idDoanDoi',  clientController.getAllThiSinhThuocDoanDoi);

router.post('/allcuocthidahoacchuathamdu/:idTruongNhom',  clientController.getAllCuocThiDaHoacChuaThamDu);
router.post('/allcuocthichuahoacdangdienra/:idTruongNhom',  clientController.getAllCuocThiChuaHoacDangDienRa);
router.post('/allketquatietmucduthi/:idTruongNhom',  clientController.getAllKetQuaTietMucDuThi);

router.post('/allmacuocthithamdu/:idTruongNhom',  clientController.getAllMaCuocThiThamDu);

router.post('/allcuocthithamdu/:idTruongNhom',  clientController.getAllCuocThiThamDu);
router.post('/allcuocthithamdu/:idTruongNhom/ngay',  clientController.getAllCuocThiThamDuTheoNgay);
router.post('/allcuocthithamdu/:idTruongNhom/thang',  clientController.getAllCuocThiThamDuTheoThang);
router.post('/allcuocthithamdu/:idTruongNhom/nam',  clientController.getAllCuocThiThamDuTheoNam);

router.post('/alltietmucduthitudo/:idTruongNhom',  clientController.getAllTietMucDuThiTuDo);
router.post('/alltietmucduthitudo/:idTruongNhom/ngay',  clientController.getAllTietMucDuThiTuDoTheoNgay);
router.post('/alltietmucduthitudo/:idTruongNhom/thang',  clientController.getAllTietMucDuThiTuDoTheoThang);
router.post('/alltietmucduthitudo/:idTruongNhom/nam',  clientController.getAllTietMucDuThiTuDoTheoNam);

router.post('/alltietmucduthichuongtrinh/:idTruongNhom',  clientController.getAllTietMucDuThiChuongTrinh);
router.post('/alltietmucduthichuongtrinh/:idTruongNhom/ngay',  clientController.getAllTietMucDuThiChuongTrinhTheoNgay);
router.post('/alltietmucduthichuongtrinh/:idTruongNhom/thang',  clientController.getAllTietMucDuThiChuongTrinhTheoThang);
router.post('/alltietmucduthichuongtrinh/:idTruongNhom/nam',  clientController.getAllTietMucDuThiChuongTrinhTheoNam);

router.post('/alltietmucduthi/chuongtrinh/:idChuongTrinh/:idTruongNhom',  clientController.getAllTietMucDuThiChuongTrinhCuThe);

router.post('/cuocthi/:idCuocThi/vongthi/:idVongThi/truongnhom/:idTruongNhom', clientController.getAllTietMucDuThiCuocThiTuDoCuThe);

router.post('/cuocthi/:idCuocThi/vongthi/:idVongThi/truongnhom/:idTruongNhom/tietmucdau', clientController.getAllTietMucDuThiDauCuocThiCuThe);

router.post('/cuocthi/:idCuocThi/truongnhom/:idTruongNhom/chuongtrinhduthi', clientController.getDataChuongTrinhDuThi);

router.post('/loaitietmucphuhop/:nhanSo',  clientController.getAllLoaiTietMucPhuHop);


module.exports = router;