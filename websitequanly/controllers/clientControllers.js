const db = require("../models");

//////////////////////////////////////////////////////////////////
////Giám Khảo/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
const getDetailGiamKhao = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT * FROM nguoidung nd WHERE nd.MaNguoiDung = ?`;
  db.query(sqlSelect, idGiamKhao, (err, result) => {
    res.send(result);
  });
};

const getAllCuocThiLamGiamKhao = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT *, 0 as ThoiGianDienRa FROM (SELECT ctvn.MaCuocThi, ctvn.TenCuocThi, ht.TenHinhThuc, ctvn.NgayBatDau, ctvn.NgayKetThuc, dd.TenDiaDiem, tt.TenTrangThai, ROW_NUMBER() OVER (ORDER BY ctvn.NgayKetThuc DESC) stt 
  FROM cuocthivannghe ctvn JOIN giamkhaocuocthi gk JOIN nguoidung nd JOIN hinhthuccuocthi ht JOIN diadiem dd JOIN trangthai tt
  WHERE ctvn.MaCuocThi = gk.MaCuocThi AND nd.MaNguoiDung = gk.MaGiamKhao AND tt.MaTrangThai = ctvn.MaTrangThai
  AND ctvn.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND dd.MaDiaDiem = ctvn.MaDiaDiem
  AND gk.MaGiamKhao = ?) ntb`;
  db.query(sqlSelect, idGiamKhao, (err, result) => {
    res.send(result);
  });
};

const getAllCuocThiLamGiamKhaoTheoNgay = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, 0 as ThoiGianDienRa FROM (SELECT ctvn.MaCuocThi, ctvn.TenCuocThi, ht.TenHinhThuc, ctvn.NgayBatDau, ctvn.NgayKetThuc, dd.TenDiaDiem, tt.TenTrangThai, ROW_NUMBER() OVER (ORDER BY ctvn.NgayKetThuc DESC) stt 
  FROM cuocthivannghe ctvn JOIN giamkhaocuocthi gk JOIN nguoidung nd JOIN hinhthuccuocthi ht JOIN diadiem dd JOIN trangthai tt
  WHERE ctvn.MaCuocThi = gk.MaCuocThi AND nd.MaNguoiDung = gk.MaGiamKhao AND tt.MaTrangThai = ctvn.MaTrangThai
  AND ctvn.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND dd.MaDiaDiem = ctvn.MaDiaDiem
  AND gk.MaGiamKhao = ?) ntb
  WHERE (DATE_FORMAT(ntb.NgayBatDau, '%Y-%m-%d') BETWEEN ? AND ?) OR (DATE_FORMAT(ntb.NgayKetThuc, '%Y-%m-%d') BETWEEN ? AND ?)
  OR (DATE_FORMAT(ntb.NgayBatDau, '%Y-%m-%d') <= ? AND DATE_FORMAT(ntb.NgayKetThuc, '%Y-%m-%d') >= ?)
  OR (DATE_FORMAT(ntb.NgayBatDau, '%Y-%m-%d') <= ? AND DATE_FORMAT(ntb.NgayKetThuc, '%Y-%m-%d') >= ?)
  `;
  db.query(
    sqlSelect,
    [
      idGiamKhao,
      NgayBatDau,
      NgayKetThuc,
      NgayBatDau,
      NgayKetThuc,
      NgayBatDau,
      NgayBatDau,
      NgayKetThuc,
      NgayKetThuc,
    ],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllCuocThiLamGiamKhaoTheoThang = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, 0 as ThoiGianDienRa FROM (SELECT ctvn.MaCuocThi, ctvn.TenCuocThi, ht.TenHinhThuc, ctvn.NgayBatDau, ctvn.NgayKetThuc, dd.TenDiaDiem, tt.TenTrangThai, ROW_NUMBER() OVER (ORDER BY ctvn.NgayKetThuc DESC) stt 
  FROM cuocthivannghe ctvn JOIN giamkhaocuocthi gk JOIN nguoidung nd JOIN hinhthuccuocthi ht JOIN diadiem dd JOIN trangthai tt
  WHERE ctvn.MaCuocThi = gk.MaCuocThi AND nd.MaNguoiDung = gk.MaGiamKhao AND tt.MaTrangThai = ctvn.MaTrangThai
  AND ctvn.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND dd.MaDiaDiem = ctvn.MaDiaDiem
  AND gk.MaGiamKhao = ?) ntb
  WHERE DATE_FORMAT(ntb.NgayBatDau, '%Y-%m') BETWEEN ? AND ?
  `;
  db.query(
    sqlSelect,
    [idGiamKhao, NgayBatDau, NgayKetThuc, NgayBatDau],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllCuocThiLamGiamKhaoTheoNam = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, 0 as ThoiGianDienRa FROM (SELECT ctvn.MaCuocThi, ctvn.TenCuocThi, ht.TenHinhThuc, ctvn.NgayBatDau, ctvn.NgayKetThuc, dd.TenDiaDiem, tt.TenTrangThai, ROW_NUMBER() OVER (ORDER BY ctvn.NgayKetThuc DESC) stt 
  FROM cuocthivannghe ctvn JOIN giamkhaocuocthi gk JOIN nguoidung nd JOIN hinhthuccuocthi ht JOIN diadiem dd JOIN trangthai tt
  WHERE ctvn.MaCuocThi = gk.MaCuocThi AND nd.MaNguoiDung = gk.MaGiamKhao AND tt.MaTrangThai = ctvn.MaTrangThai
  AND ctvn.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND dd.MaDiaDiem = ctvn.MaDiaDiem
  AND gk.MaGiamKhao = ?) ntb
  WHERE DATE_FORMAT(ntb.NgayBatDau, '%Y') BETWEEN ? AND ?
  `;
  db.query(
    sqlSelect,
    [idGiamKhao, NgayBatDau, NgayKetThuc, NgayBatDau],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllCuocThiChuaHoanThanh = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT *,0 as ThoiGianDienRa, ROW_NUMBER() OVER (ORDER BY ctvn.NgayKetThuc DESC) stt 
  FROM cuocthivannghe ctvn JOIN giamkhaocuocthi gk JOIN nguoidung nd JOIN hinhthuccuocthi ht JOIN diadiem dd
  WHERE ctvn.MaCuocThi = gk.MaCuocThi AND nd.MaNguoiDung = gk.MaGiamKhao AND ctvn.MaTrangThai IN (1,2)
  AND ctvn.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND dd.MaDiaDiem = ctvn.MaDiaDiem
  AND gk.MaGiamKhao = ?`;
  db.query(sqlSelect, idGiamKhao, (err, result) => {
    res.send(result);
  });
};

const getAllTietMucCanChamDiem = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.NgayGioThucHien) stt FROM 
  (SELECT ct.MaCuocThi, null as MaChuongTrinh, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ts.TenThiSinh AS TrinhBay, ct.TenCuocThi, ctct.VongThi, ct.SoVongThi, htct.TenHinhThuc, d.DiemSo, ct.MaThangDiem
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN thisinhtrinhbaytietmuc tstm
  JOIN loaitietmuc ltm JOIN thisinh ts JOIN hinhthuccuocthi htct JOIN diem d
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND d.DiemSo IS NULL AND d.MaTietMuc = tm.MaTietMuc
  AND d.MaCuocThi = ctct.MaCuocThi AND ct.MaTrangThai = 2 AND htct.MaHinhThucCuocThi = ct.MaHinhThucCuocThi
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tstm.MaTietMuc = tm.MaTietMuc AND ts.MaThiSinh = tstm.MaThiSinh
  AND d.MaGiamKhao = ?
  UNION ALL
  SELECT ct.MaCuocThi, null as MaChuongTrinh, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, dd.TenDoanDoi AS TrinhBay, ct.TenCuocThi, ctct.VongThi, ct.SoVongThi, htct.TenHinhThuc, d.DiemSo, ct.MaThangDiem
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN doandoitrinhbaytietmuc ddtm
  JOIN diem d JOIN loaitietmuc ltm JOIN doandoi dd JOIN hinhthuccuocthi htct
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND d.DiemSo IS null AND d.MaTietMuc = tm.MaTietMuc
  AND d.MaCuocThi = ctct.MaCuocThi AND ct.MaTrangThai = 2 AND htct.MaHinhThucCuocThi = ct.MaHinhThucCuocThi
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND ddtm.MaTietMuc = tm.MaTietMuc AND dd.MaDoanDoi = ddtm.MaDoanDoi
  AND d.MaGiamKhao = ?
  UNION ALL
  SELECT ct.MaCuocThi, ctr.MaChuongTrinh, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ctr.TenChuongTrinh as TrinhBay, ct.TenCuocThi, 0 as VongThi, 0 as SoVongThi, htct.TenHinhThuc, d.DiemSo, ct.MaThangDiem
  FROM chuongtrinhvannghe ctr JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm JOIN diem d
  JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct JOIN loaitietmuc ltm JOIN hinhthuccuocthi htct
  WHERE ctctr.MaChuongTrinh = ctr.MaChuongTrinh AND d.DiemSo IS NULL AND tm.MaTietMuc = ctctr.MaTietMuc 
  AND tm.MaTietMuc = d.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND ct.MaTrangThai = 2 
  AND d.MaCuocThi = ctct.MaCuocThi AND ctct.MaChuongTrinh = ctr.MaChuongTrinh 
  AND ctct.MaCuocThi = ct.MaCuocThi AND htct.MaHinhThucCuocThi = ct.MaHinhThucCuocThi
  AND d.MaGiamKhao = ?) tb
  WHERE DATE_FORMAT(tb.NgayGioThucHien, '%Y-%m-%d') <= DATE_FORMAT(NOW(), '%Y-%m-%d')
  `;
  db.query(sqlSelect, [idGiamKhao, idGiamKhao, idGiamKhao], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucDaChamDiem = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.NgayGioThucHien DESC) stt FROM
  (SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ctct.VongThi, d.DiemSo, 
  ctct.DiemTrungBinh, ctct.TrangThai, ct.SoVongThi, ts.TenThiSinh as TrinhBay
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN diem d JOIN loaitietmuc ltm
  JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND tm.MaTietMuc = ctct.MaTietMuc AND d.MaTietMuc = tm.MaTietMuc 
  AND tstm.MaTietMuc = tm.MaTietMuc AND ts.MaThiSinh = tstm.MaThiSinh AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND d.DiemSo IS NOT NULL AND d.MaGiamKhao = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ctct.VongThi, d.DiemSo, 
  ctct.DiemTrungBinh, ctct.TrangThai, ct.SoVongThi, dd.TenDoanDoi as TrinhBay
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN diem d JOIN loaitietmuc ltm
  JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND tm.MaTietMuc = ctct.MaTietMuc AND d.MaTietMuc = tm.MaTietMuc 
  AND ddtm.MaTietMuc = tm.MaTietMuc AND dd.MaDoanDoi = ddtm.MaDoanDoi AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND d.DiemSo IS NOT NULL AND d.MaGiamKhao = ?) tb`;
  db.query(sqlSelect, [idGiamKhao, idGiamKhao], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucDaChamDiemTheoNgay = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.NgayGioThucHien DESC) stt FROM
  (SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ctct.VongThi, d.DiemSo, 
  ctct.DiemTrungBinh, ctct.TrangThai, ct.SoVongThi, ts.TenThiSinh as TrinhBay
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN diem d JOIN loaitietmuc ltm
  JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND tm.MaTietMuc = ctct.MaTietMuc AND d.MaTietMuc = tm.MaTietMuc 
  AND tstm.MaTietMuc = tm.MaTietMuc AND ts.MaThiSinh = tstm.MaThiSinh AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND d.DiemSo IS NOT NULL AND d.MaGiamKhao = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ctct.VongThi, d.DiemSo, 
  ctct.DiemTrungBinh, ctct.TrangThai, ct.SoVongThi, dd.TenDoanDoi as TrinhBay
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN diem d JOIN loaitietmuc ltm
  JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND tm.MaTietMuc = ctct.MaTietMuc AND d.MaTietMuc = tm.MaTietMuc 
  AND ddtm.MaTietMuc = tm.MaTietMuc AND dd.MaDoanDoi = ddtm.MaDoanDoi AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND d.DiemSo IS NOT NULL AND d.MaGiamKhao = ?) tb
  WHERE DATE_FORMAT(tb.NgayGioThucHien, '%Y-%m-%d') BETWEEN ? AND ?`;
  db.query(
    sqlSelect,
    [idGiamKhao, idGiamKhao, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucDaChamDiemTheoThang = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.NgayGioThucHien DESC) stt FROM
  (SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ctct.VongThi, d.DiemSo, 
  ctct.DiemTrungBinh, ctct.TrangThai, ct.SoVongThi, ts.TenThiSinh as TrinhBay
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN diem d JOIN loaitietmuc ltm
  JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND tm.MaTietMuc = ctct.MaTietMuc AND d.MaTietMuc = tm.MaTietMuc 
  AND tstm.MaTietMuc = tm.MaTietMuc AND ts.MaThiSinh = tstm.MaThiSinh AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND d.DiemSo IS NOT NULL AND d.MaGiamKhao = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ctct.VongThi, d.DiemSo, 
  ctct.DiemTrungBinh, ctct.TrangThai, ct.SoVongThi, dd.TenDoanDoi as TrinhBay
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN diem d JOIN loaitietmuc ltm
  JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND tm.MaTietMuc = ctct.MaTietMuc AND d.MaTietMuc = tm.MaTietMuc 
  AND ddtm.MaTietMuc = tm.MaTietMuc AND dd.MaDoanDoi = ddtm.MaDoanDoi AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND d.DiemSo IS NOT NULL AND d.MaGiamKhao = ?) tb
  WHERE DATE_FORMAT(tb.NgayGioThucHien, '%Y') BETWEEN ? AND ?`;
  db.query(
    sqlSelect,
    [idGiamKhao, idGiamKhao, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucDaChamDiemTheoNam = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.NgayGioThucHien DESC) stt FROM
  (SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ctct.VongThi, d.DiemSo, 
  ctct.DiemTrungBinh, ctct.TrangThai, ct.SoVongThi, ts.TenThiSinh as TrinhBay
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN diem d JOIN loaitietmuc ltm
  JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND tm.MaTietMuc = ctct.MaTietMuc AND d.MaTietMuc = tm.MaTietMuc 
  AND tstm.MaTietMuc = tm.MaTietMuc AND ts.MaThiSinh = tstm.MaThiSinh AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND d.DiemSo IS NOT NULL AND d.MaGiamKhao = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ctct.VongThi, d.DiemSo, 
  ctct.DiemTrungBinh, ctct.TrangThai, ct.SoVongThi, dd.TenDoanDoi as TrinhBay
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN diem d JOIN loaitietmuc ltm
  JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND tm.MaTietMuc = ctct.MaTietMuc AND d.MaTietMuc = tm.MaTietMuc 
  AND ddtm.MaTietMuc = tm.MaTietMuc AND dd.MaDoanDoi = ddtm.MaDoanDoi AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND d.DiemSo IS NOT NULL AND d.MaGiamKhao = ?) tb
  WHERE DATE_FORMAT(tb.NgayGioThucHien, '%Y') BETWEEN ? AND ?`;
  db.query(
    sqlSelect,
    [idGiamKhao, idGiamKhao, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucChuongTrinhDaChamDiem = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien) stt, ct.MaCuocThi, ctctr.MaChuongTrinh, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ctr.TenChuongTrinh as TrinhBay, ct.TenCuocThi, d.DiemSo, ctctr.DiemTrungBinh
  FROM chuongtrinhvannghe ctr JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm 
  JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct JOIN diem d JOIN loaitietmuc ltm
  WHERE ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.DiemTrungBinh IS NOT null 
  AND ctr.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi 
  AND d.MaCuocThi = ct.MaCuocThi AND d.MaTietMuc = ctctr.MaTietMuc 
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctctr.MaTietMuc  
  AND d.MaGiamKhao = ?`;
  db.query(sqlSelect, idGiamKhao, (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChuongTrinhDaChamDiemTheoNgay = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT * FROM (SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien) stt, ct.MaCuocThi, ctctr.MaChuongTrinh, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ctr.TenChuongTrinh as TrinhBay, ct.TenCuocThi, d.DiemSo, ctctr.DiemTrungBinh
  FROM chuongtrinhvannghe ctr JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm 
  JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct JOIN diem d JOIN loaitietmuc ltm
  WHERE ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.DiemTrungBinh IS NOT null 
  AND ctr.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi 
  AND d.MaCuocThi = ct.MaCuocThi AND d.MaTietMuc = ctctr.MaTietMuc 
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctctr.MaTietMuc  
  AND d.MaGiamKhao = ?) tb
  WHERE DATE_FORMAT(tb.NgayGioThucHien, '%Y-%m-%d') BETWEEN ? AND ?`;
  db.query(sqlSelect, [idGiamKhao, NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChuongTrinhDaChamDiemTheoThang = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT * FROM (SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien) stt, ct.MaCuocThi, ctctr.MaChuongTrinh, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ctr.TenChuongTrinh as TrinhBay, ct.TenCuocThi, d.DiemSo, ctctr.DiemTrungBinh
  FROM chuongtrinhvannghe ctr JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm 
  JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct JOIN diem d JOIN loaitietmuc ltm
  WHERE ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.DiemTrungBinh IS NOT null 
  AND ctr.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi 
  AND d.MaCuocThi = ct.MaCuocThi AND d.MaTietMuc = ctctr.MaTietMuc 
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctctr.MaTietMuc  
  AND d.MaGiamKhao = ?) tb
  WHERE DATE_FORMAT(tb.NgayGioThucHien, '%Y-%m') BETWEEN ? AND ?`;
  db.query(sqlSelect, [idGiamKhao, NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChuongTrinhDaChamDiemTheoNam = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT * FROM (SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien) stt, ct.MaCuocThi, ctctr.MaChuongTrinh, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ctr.TenChuongTrinh as TrinhBay, ct.TenCuocThi, d.DiemSo, ctctr.DiemTrungBinh
  FROM chuongtrinhvannghe ctr JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm 
  JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct JOIN diem d JOIN loaitietmuc ltm
  WHERE ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.DiemTrungBinh IS NOT null 
  AND ctr.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi 
  AND d.MaCuocThi = ct.MaCuocThi AND d.MaTietMuc = ctctr.MaTietMuc 
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctctr.MaTietMuc 
  AND d.MaGiamKhao = ?) tb
  WHERE DATE_FORMAT(tb.NgayGioThucHien, '%Y') BETWEEN ? AND ?`;
  db.query(sqlSelect, [idGiamKhao, NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChamDiem = async (req, res) => {
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, d.DiemSo, ct.TenCuocThi
  FROM diem d JOIN cuocthivannghe ct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  WHERE ct.MaCuocThi = d.MaCuocThi AND tm.MaTietMuc = d.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND d.MaGiamKhao = ?`;
  db.query(sqlSelect, idGiamKhao, (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChamDiemCuocThiCaNhan = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT tm.MaTietMuc,ROW_NUMBER() OVER (ORDER BY ctct.TrangThai DESC, tm.NgayGioThucHien) stt, tm.TenTietMuc, tm.NhanSo, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ts.TenThiSinh as TrinhBayBoi, d.DiemSo, ctct.DiemTrungBinh, ctct.TrangThai, ct.MaThangDiem, ctct.CongBoKetQua
  FROM thisinh ts JOIN thisinhtrinhbaytietmuc ctm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN tietmucvannghe tm JOIN loaitietmuc ltm JOIN diem d 
  WHERE ctm.MaThiSinh = ts.MaThiSinh AND ctct.MaTietMuc = ctm.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND d.MaCuocThi = ct.MaCuocThi AND d.MaTietMuc = tm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND tm.MaTietMuc = ctm.MaTietMuc AND ct.MaPhanThi = 1 AND d.MaGiamKhao = ? AND ctct.VongThi = ?
  AND ctct.MaCuocThi = ?`;
  db.query(sqlSelect, [idGiamKhao, idVongThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChamDiemCuocThiCaNhanTheoNgay = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT * FROM (SELECT tm.MaTietMuc,ROW_NUMBER() OVER (ORDER BY ctct.TrangThai DESC, tm.NgayGioThucHien) stt, tm.TenTietMuc, tm.NhanSo, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ts.TenThiSinh as TrinhBayBoi, d.DiemSo, ctct.DiemTrungBinh, ctct.TrangThai, ct.MaThangDiem, ctct.CongBoKetQua
  FROM thisinh ts JOIN thisinhtrinhbaytietmuc ctm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN tietmucvannghe tm JOIN loaitietmuc ltm JOIN diem d 
  WHERE ctm.MaThiSinh = ts.MaThiSinh AND ctct.MaTietMuc = ctm.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND d.MaCuocThi = ct.MaCuocThi AND d.MaTietMuc = tm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND tm.MaTietMuc = ctm.MaTietMuc AND ct.MaPhanThi = 1 AND d.MaGiamKhao = ? AND ctct.VongThi = ?
  AND ctct.MaCuocThi = ?) tb
  WHERE DATE_FORMAT(tb.NgayGioThucHien, '%Y-%m-%d') BETWEEN ? AND ?
  `;
  db.query(
    sqlSelect,
    [idGiamKhao, idVongThi, idCuocThi, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucChamDiemCuocThiDoiNhom = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT tm.MaTietMuc,ROW_NUMBER() OVER (ORDER BY ctct.TrangThai DESC, tm.NgayGioThucHien) stt, tm.TenTietMuc, tm.NhanSo, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, dd.TenDoanDoi as TrinhBayBoi, d.DiemSo, ctct.DiemTrungBinh, ctct.TrangThai, ct.MaThangDiem, ctct.CongBoKetQua
  FROM doandoi dd JOIN doandoitrinhbaytietmuc ctm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN tietmucvannghe tm JOIN loaitietmuc ltm JOIN diem d 
  WHERE ctm.MaDoanDoi = dd.MaDoanDoi AND ctct.MaTietMuc = ctm.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND d.MaCuocThi = ct.MaCuocThi AND d.MaTietMuc = tm.MaTietMuc AND d.MaGiamKhao = ?
  AND tm.MaTietMuc = ctm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND ct.MaPhanThi = 2 AND ctct.VongThi = ?
  AND ctct.MaCuocThi = ?`;
  db.query(sqlSelect, [idGiamKhao, idVongThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChamDiemCuocThiDoiNhomTheoNgay = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT tm.MaTietMuc,ROW_NUMBER() OVER (ORDER BY ctct.TrangThai DESC, tm.NgayGioThucHien) stt, tm.TenTietMuc, tm.NhanSo, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, dd.TenDoanDoi as TrinhBayBoi, d.DiemSo, ctct.DiemTrungBinh, ctct.TrangThai, ct.MaThangDiem, ctct.CongBoKetQua
  FROM doandoi dd JOIN doandoitrinhbaytietmuc ctm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN tietmucvannghe tm JOIN loaitietmuc ltm JOIN diem d 
  WHERE ctm.MaDoanDoi = dd.MaDoanDoi AND ctct.MaTietMuc = ctm.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND d.MaCuocThi = ct.MaCuocThi AND d.MaTietMuc = tm.MaTietMuc AND d.MaGiamKhao = ?
  AND tm.MaTietMuc = ctm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND ct.MaPhanThi = 2 AND ctct.VongThi = ?
  AND ctct.MaCuocThi = ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') BETWEEN ? AND ?`;
  db.query(
    sqlSelect,
    [idGiamKhao, idVongThi, idCuocThi, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllChuongTrinhCuocThiTruyenThong = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc) stt
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctct JOIN chuongtrinhvannghe ctr 
  JOIN giamkhaocuocthi gk JOIN donvitochuc dv
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaChuongTrinh = ctr.MaChuongTrinh 
  AND gk.MaCuocThi = ct.MaCuocThi AND dv.MaDonVi = ctr.MaDonVi
  AND gk.MaGiamKhao = ? AND ct.MaCuocThi = ?`;
  db.query(sqlSelect, [idGiamKhao, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllChuongTrinhCuocThiTruyenThongTheoNgay = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idGiamKhao = req.params.idGiamKhao;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc) stt
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctct JOIN chuongtrinhvannghe ctr 
  JOIN giamkhaocuocthi gk JOIN donvitochuc dv
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaChuongTrinh = ctr.MaChuongTrinh 
  AND gk.MaCuocThi = ct.MaCuocThi AND dv.MaDonVi = ctr.MaDonVi
  AND gk.MaGiamKhao = ? AND ct.MaCuocThi = ? AND DATE_FORMAT(ctr.NgayGioToChuc, '%Y-%m-%d') BETWEEN ? AND ?`;
  db.query(
    sqlSelect,
    [idGiamKhao, idCuocThi, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucChuongTrinh = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idChuongTrinh = req.params.idChuongTrinh;
  const idGiamKhao = req.params.idGiamKhao;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ctctr.MaTietMuc) as stt, tm.MaTietMuc, tm.TenTietMuc,ltm.TenLoaiTietMuc, tm.NhanSo, d.DiemSo, ctctr.DiemTrungBinh 
  FROM chuongtrinhvannghe ct JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm 
  JOIN chitietcuocthitruyenthong ctct JOIN diem d JOIN loaitietmuc ltm
  WHERE ct.MaChuongTrinh = ctctr.MaChuongTrinh AND tm.MaTietMuc = ctctr.MaTietMuc AND ctct.MaChuongTrinh = ct.MaChuongTrinh
  AND d.MaCuocThi = ctct.MaCuocThi AND d.MaTietMuc = ctctr.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND d.MaGiamKhao = ? AND ctct.MaCuocThi = ? AND ct.MaChuongTrinh = ?`;
  db.query(sqlSelect, [idGiamKhao, idCuocThi, idChuongTrinh], (err, result) => {
    res.send(result);
  });
};

const getUpdateDiemTietMuc = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const idCuocThi = req.body.idCuocThi;
  const idTietMuc = req.body.idTietMuc;
  const idGiamKhao = req.body.idGiamKhao;
  const DiemSo = req.body.DiemSo;
  db.query(
    `UPDATE diem d set d.DiemSo = ? WHERE d.MaCuocThi = ? AND d.MaTietMuc = ? AND d.MaGiamKhao = ?`,
    [DiemSo, idCuocThi, idTietMuc, idGiamKhao],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thất Bại!";
        res.send(success);
        throw error;
      }
      if (results.affectedRows > 0) {
        db.query(
          `SELECT COUNT(*) as ChuaChamDiem FROM diem d 
          WHERE d.MaCuocThi = ? and d.MaTietMuc = ? AND d.DiemSo IS NULL`,
          [idCuocThi, idTietMuc],
          function (error, results, fields) {
            if (error) {
              success.isSuccess = false;
              success.message = "Thất Bại!";
              res.send(success);
              throw error;
            } else {
              // eslint-disable-next-line eqeqeq
              if (results[0].ChuaChamDiem == 0) {
                db.query(
                  `UPDATE chitietcuocthidangkytudo ct 
                    set ct.DiemTrungBinh = (SELECT CAST(AVG(d.DiemSo) AS DECIMAL(10,2)) 
                                            FROM diem d
                                            WHERE d.MaCuocThi = ? AND d.MaTietMuc = ?) 
                    WHERE ct.MaCuocThi = ? AND ct.MaTietMuc = ?`,
                  [idCuocThi, idTietMuc, idCuocThi, idTietMuc],
                  function (error, results, fields) {
                    if (error) {
                      success.isSuccess = false;
                      success.message = "Thất Bại!";
                      res.send(success);
                      throw error;
                    }

                    if (results.affectedRows > 0) {
                      success.isSuccess = true;
                      success.message = "Thành Công!";
                      success.idCTH = results.insertId;
                      res.send(success);
                    } else {
                      success.message = "Thất Bại!";
                      success.isSuccess = false;
                      res.send(success);
                    }
                  }
                );
              } else {
                success.isSuccess = true;
                success.message = "Thành Công!";
                res.send(success);
              }
            }
          }
        );
      } else {
        success.message = "Thất Bại!";
        success.isSuccess = false;
        res.send(success);
      }
    }
  );
};

const getUpdateDiemTietMucChuongTrinh = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const idCuocThi = req.body.idCuocThi;
  const idChuongTrinh = req.body.idChuongTrinh;
  const idTietMuc = req.body.idTietMuc;
  const idGiamKhao = req.body.idGiamKhao;
  const DiemSo = req.body.DiemSo;
  db.query(
    `UPDATE diem d set d.DiemSo = ? WHERE d.MaCuocThi = ? AND d.MaTietMuc = ? AND d.MaGiamKhao = ?`,
    [DiemSo, idCuocThi, idTietMuc, idGiamKhao],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thất Bại!";
        res.send(success);
        throw error;
      }
      if (results.affectedRows > 0) {
        db.query(
          `SELECT COUNT(*) as ChuaChamDiem FROM diem d 
          WHERE d.MaCuocThi = ? and d.MaTietMuc = ? AND d.DiemSo IS NULL`,
          [idCuocThi, idTietMuc],
          function (error, results, fields) {
            if (error) {
              success.isSuccess = false;
              success.message = "Thất Bại!";
              res.send(success);
              throw error;
            } else {
              // eslint-disable-next-line eqeqeq
              if (results[0].ChuaChamDiem == 0) {
                db.query(
                  `UPDATE chitietchuongtrinh ct 
                    set ct.DiemTrungBinh = (SELECT CAST(AVG(d.DiemSo) AS DECIMAL(10,1)) 
                                            FROM diem d
                                            WHERE d.MaCuocThi = ? AND d.MaTietMuc = ?) 
                    WHERE ct.MaChuongTrinh = ? AND ct.MaTietMuc = ?`,
                  [idCuocThi, idTietMuc, idChuongTrinh, idTietMuc],
                  function (error, results, fields) {
                    if (error) {
                      success.isSuccess = false;
                      success.message = "Thất Bại!";
                      res.send(success);
                      throw error;
                    }
                    if (results.affectedRows > 0) {
                      db.query(
                        `SELECT COUNT(*) as ChuaChamDiem FROM chitietchuongtrinh ct 
                        WHERE ct.MaChuongTrinh = ? AND ct.DiemTrungBinh IS NUll`,
                        [idChuongTrinh],
                        function (error, results, fields) {
                          if (error) {
                            success.isSuccess = false;
                            success.message = "Thất Bại!";
                            res.send(success);
                            throw error;
                          } else {
                            // eslint-disable-next-line eqeqeq
                            if (results[0].ChuaChamDiem == 0) {
                              db.query(
                                `UPDATE chitietcuocthitruyenthong ct SET ct.DiemTrungBinh = 
                                (SELECT CAST(AVG(ctct.DiemTrungBinh) AS DECIMAL(10,1)) FROM chitietchuongtrinh ctct 
                                WHERE ctct.MaChuongTrinh = ?)
                                WHERE ct.MaChuongTrinh = ?`,
                                [idChuongTrinh, idChuongTrinh],
                                function (error, results, fields) {
                                  if (error) {
                                    success.isSuccess = false;
                                    success.message = "Thất Bại!";
                                    res.send(success);
                                    throw error;
                                  }

                                  if (results.affectedRows > 0) {
                                    success.isSuccess = true;
                                    success.message = "Thành Công!";
                                    success.idCTH = results.insertId;
                                    res.send(success);
                                  } else {
                                    success.message = "Thất Bại!";
                                    success.isSuccess = false;
                                    res.send(success);
                                  }
                                }
                              );
                            } else {
                              success.isSuccess = true;
                              success.message = "Thành Công!";
                              res.send(success);
                            }
                          }
                        }
                      );
                    } else {
                      success.isSuccess = true;
                      success.message = "Thành Công!";
                      res.send(success);
                    }
                  }
                );
              } else {
                success.isSuccess = true;
                success.message = "Thành Công!";
                res.send(success);
              }
            }
          }
        );
      } else {
        success.message = "Thất Bại!";
        success.isSuccess = false;
        res.send(success);
      }
    }
  );
};

const getUpdateTrangThaiTietMuc = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const idCuocThi = req.body.idCuocThi;
  const idTietMuc = req.body.idTietMuc;
  const TrangThai = req.body.TrangThai;
  db.query(
    `UPDATE chitietcuocthidangkytudo ctct set ctct.TrangThai = ? 
    WHERE ctct.MaCuocThi = ? AND ctct.MaTietMuc = ?`,
    [TrangThai, idCuocThi, idTietMuc],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thất Bại!";
        res.send(success);
        throw error;
      }
      if (results.affectedRows > 0) {
        db.query(
          `SELECT COUNT(*) as ChuaChamDiem FROM diem d 
          WHERE d.MaCuocThi = ? and d.MaTietMuc = ? AND d.DiemSo IS NULL`,
          [idCuocThi, idTietMuc],
          function (error, results, fields) {
            if (error) {
              success.isSuccess = false;
              success.message = "Thất Bại!";
              res.send(success);
              throw error;
            } else {
              if (results.affectedRows > 0) {
                success.isSuccess = true;
                success.message = "Thành Công!";
                success.idCTH = results.insertId;
                res.send(success);
              } else {
                success.message = "Thất Bại!";
                success.isSuccess = false;
                res.send(success);
              }
            }
          }
        );
      } else {
        success.message = "Thất Bại!";
        success.isSuccess = false;
        res.send(success);
      }
    }
  );
};

//////////////////////////////////////////////////////////////////
////Trưởng Nhóm/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
const getDetailTruongNhom = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT nd.MaNguoiDung, nd.TaiKhoan, nd.HoTenNguoiDung, nd.MaDinhDanh, nd.GioiTinh, nd.MaChucVu, nd.Email, nd.Phone, dv.MaDonVi, dv.TenDonVi, ts.MaLop
  FROM nguoidung nd JOIN thisinh ts JOIN donvitochuc dv
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaDonVi = dv.MaDonVi AND nd.MaNguoiDung = ?`;
  db.query(sqlSelect, idTruongNhom, (err, result) => {
    res.send(result);
  });
};

const getAllCuocThiDaHoacChuaThamDu = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ntb.NgayKetThuc DESC) stt 
  FROM (SELECT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, ct.MaTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht
  WHERE ddtc.MaDiaDiem = ct.MaDiaDiem AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi
  AND ct.MaPhanThi = 2
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, ct.MaTrangThai, ddtc.TenDiaDiem
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chuongtrinhvannghe ctr 
  JOIN thisinh ts JOIN nguoidung nd JOIN diadiem ddtc JOIN hinhthuccuocthi ht
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi AND ddtc.MaDiaDiem = ct.MaDiaDiem
  AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi AND ctr.MaChuongTrinh = ctth.MaChuongTrinh 
  AND ctth.MaCuocThi = ct.MaCuocThi AND nd.MaNguoiDung = ?) ntb`;
  db.query(sqlSelect, idTruongNhom, (err, result) => {
    res.send(result);
  });
};

const getAllCuocThiChuaHoacDangDienRa = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ntb.NgayKetThuc DESC) stt 
  FROM (
  SELECT DISTINCT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN nguoidung nd JOIN thisinhtrinhbaytietmuc tstm JOIN chitietcuocthidangkytudo ctct JOIN thisinh ts JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = ctct.MaTietMuc 
  AND ctct.MaCuocThi = ct.MaCuocThi AND ct.MaTrangThai IN (1,2) AND ct.MaDiaDiem = ddtc.MaDiaDiem 
  AND ct.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND ct.MaTrangThai = tt.MaTrangThai
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT DISTINCT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN nguoidung nd JOIN doandoitrinhbaytietmuc ddtm JOIN chitietcuocthidangkytudo ctct JOIN thisinh ts JOIN trangthai tt JOIN doandoi dd
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
  AND ddtm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi AND ct.MaTrangThai IN (1,2) 
  AND ct.MaDiaDiem = ddtc.MaDiaDiem AND ct.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND ct.MaTrangThai = tt.MaTrangThai 
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chuongtrinhvannghe ctr 
  JOIN thisinh ts JOIN nguoidung nd JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi AND ddtc.MaDiaDiem = ct.MaDiaDiem 
  AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi AND ctr.MaChuongTrinh = ctth.MaChuongTrinh AND tt.MaTrangThai = ct.MaTrangThai
  AND ct.MaTrangThai IN (1,2) AND ctth.MaCuocThi = ct.MaCuocThi 
  AND nd.MaNguoiDung = ?
  ) ntb`;
  db.query(
    sqlSelect,
    [idTruongNhom, idTruongNhom, idTruongNhom],
    (err, result) => {
      res.send(result);
    }
  );
};

const getDataChuongTrinhDuThi = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT * FROM chuongtrinhvannghe ctr JOIN thisinh ts JOIN nguoidung nd JOIN donvitochuc dv JOIN chitietcuocthitruyenthong ctct JOIN giaithuong gt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi AND ctct.MaChuongTrinh = ctr.MaChuongTrinh
  AND ctr.MaDonVi = dv.MaDonVi AND gt.MaGiaiThuong = ctct.MaGiaiThuong AND ctct.MaCuocThi = ?
  AND nd.MaNguoiDung = ?`;
  db.query(sqlSelect, [idCuocThi, idTruongNhom], (err, result) => {
    res.send(result);
  });
};

const getAllDoanDoiLamTruongNhom = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY dd.MaDoanDoi DESC) stt FROM doandoi dd JOIN thisinh ts JOIN nguoidung nd JOIN donvitochuc dv
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dv.MaDonVi = dd.MaDonVi AND nd.MaNguoiDung = ?`;
  db.query(sqlSelect, idTruongNhom, (err, result) => {
    res.send(result);
  });
};

const getCoThamDuCuocThiDangDienRa = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT ctctr.MaTietMuc
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctct JOIN chuongtrinhvannghe ctr JOIN chitietchuongtrinh ctctr
  JOIN thisinh ts JOIN nguoidung nd
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi AND ct.MaTrangThai = 2 AND nd.MaNguoiDung = ?
  UNION ALL 
  SELECT cttd.MaTietMuc FROM doandoi dd JOIN thisinh ts JOIN nguoidung nd JOIN doandoitrinhbaytietmuc ddtm JOIN chitietcuocthidangkytudo cttd JOIN cuocthivannghe ct
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh 
  AND dd.MaDoanDoi = ddtm.MaDoanDoi AND ddtm.MaTietMuc = cttd.MaTietMuc 
  AND cttd.MaCuocThi = ct.MaCuocThi AND ct.MaTrangThai = 2 AND nd.MaNguoiDung = ?`;
  db.query(sqlSelect, [idTruongNhom, idTruongNhom], (err, result) => {
    res.send(result);
  });
};

const getDetailDoanDoi = async (req, res) => {
  const idDoanDoi = req.params.idDoanDoi;
  const sqlSelect = `SELECT * FROM doandoi dd JOIN donvitochuc dv
    WHERE dv.MaDonVi = dd.MaDonVi AND dd.MaDoanDoi = ?`;
  db.query(sqlSelect, idDoanDoi, (err, result) => {
    res.send(result);
  });
};

const getAllThiSinhThuocDoanDoi = async (req, res) => {
  const idDoanDoi = req.params.idDoanDoi;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ts.MaThiSinh) stt
  FROM doandoi dd JOIN thisinhthuocdoandoi tstd JOIN thisinh ts
  WHERE dd.MaDoanDoi = tstd.MaDoanDoi AND tstd.MaThiSinh = ts.MaThiSinh 
  AND dd.MaDoanDoi = ?`;
  db.query(sqlSelect, idDoanDoi, (err, result) => {
    res.send(result);
  });
};

const getAllKetQuaTietMucDuThi = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ntb.NgayGioThucHien DESC) stt FROM 
  (SELECT ct.MaCuocThi, ct.TenCuocThi, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien,ctct.VongThi, ctct.DiemTrungBinh, ctct.TrangThai, ctct.MaGiaiThuong, gt.TenGiaiThuong, ct.SoVongThi, ctct.CongBoKetQua, -1 as DaCham
  FROM thisinh ts JOIN nguoidung nd JOIN thisinhtrinhbaytietmuc tstm JOIN tietmucvannghe tm
  JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct JOIN loaitietmuc ltm JOIN giaithuong gt
  WHERE ts.MaNguoiDung = nd.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = ctct.MaTietMuc 
  AND ctct.MaTietMuc = tm.MaTietMuc AND ct.MaCuocThi = ctct.MaCuocThi AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND ct.MaTrangThai IN (1,2) AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien,ctct.VongThi, ctct.DiemTrungBinh, ctct.TrangThai, ctct.MaGiaiThuong, gt.TenGiaiThuong, ct.SoVongThi, ctct.CongBoKetQua, -1 as DaCham
  FROM doandoi d JOIN thisinh ts JOIN nguoidung nd JOIN doandoitrinhbaytietmuc ddtm JOIN tietmucvannghe tm
  JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct JOIN loaitietmuc ltm JOIN giaithuong gt
  WHERE d.MaThiSinh = ts.MaThiSinh and ts.MaNguoiDung = nd.MaNguoiDung AND ddtm.MaDoanDoi = d.MaDoanDoi 
  AND tm.MaTietMuc = ddtm.MaTietMuc AND ctct.MaTietMuc = tm.MaTietMuc AND ct.MaCuocThi = ctct.MaCuocThi
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND ct.MaTrangThai IN (1,2) AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, tm.TenTietMuc, ltm.TenLoaiTietMuc, ctr.NgayGioToChuc as NgayGioThucHien,0 as VongThi, ctct.DiemTrungBinh, null as TrangThai, null as MaGiaiThuong, null as TenGiaiThuong, ct.SoVongThi, -1 as CongBoKetQua, -1 as DaCham
  FROM tietmucvannghe tm JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct 
  JOIN chitietchuongtrinh ctctr JOIN chuongtrinhvannghe ctr JOIN thisinh ts
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi 
  AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaChuongTrinh = ctct.MaChuongTrinh 
  AND ctct.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi 
  AND tm.MaTietMuc = ctctr.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai AND ct.MaTrangThai IN (1,2)
  AND nd.MaNguoiDung = ?) ntb`;
  db.query(
    sqlSelect,
    [idTruongNhom, idTruongNhom, idTruongNhom],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllMaCuocThiThamDu = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT DISTINCT ctct.MaCuocThi 
  FROM chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN doandoitrinhbaytietmuc ddtm 
  JOIN thisinh ts JOIN doandoi dd JOIN nguoidung nd
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
  AND ddtm.MaTietMuc = ctct.MaTietMuc AND ctct.MaTietMuc = tm.MaTietMuc 
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT DISTINCT ctth.MaCuocThi FROM chitietcuocthitruyenthong ctth 
  JOIN chuongtrinhvannghe ctr JOIN thisinh ts JOIN nguoidung nd
  WHERE ts.MaNguoiDung = nd.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi
  AND ctr.MaChuongTrinh = ctth.MaChuongTrinh
  AND nd.MaNguoiDung = ?`;
  db.query(sqlSelect, [idTruongNhom, idTruongNhom], (err, result) => {
    res.send(result);
  });
};

const getAllCuocThiThamDu = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ntb.NgayKetThuc DESC) stt 
  FROM (
  SELECT DISTINCT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN nguoidung nd JOIN thisinhtrinhbaytietmuc tstm JOIN chitietcuocthidangkytudo ctct JOIN thisinh ts JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = ctct.MaTietMuc 
  AND ctct.MaCuocThi = ct.MaCuocThi AND ct.MaDiaDiem = ddtc.MaDiaDiem 
  AND ct.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND ct.MaTrangThai = tt.MaTrangThai
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT DISTINCT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN nguoidung nd JOIN doandoitrinhbaytietmuc ddtm JOIN chitietcuocthidangkytudo ctct JOIN thisinh ts JOIN trangthai tt JOIN doandoi dd
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
  AND ddtm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND ct.MaDiaDiem = ddtc.MaDiaDiem AND ct.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND ct.MaTrangThai = tt.MaTrangThai 
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chuongtrinhvannghe ctr 
  JOIN thisinh ts JOIN nguoidung nd JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi AND ddtc.MaDiaDiem = ct.MaDiaDiem 
  AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi AND ctr.MaChuongTrinh = ctth.MaChuongTrinh AND tt.MaTrangThai = ct.MaTrangThai
  AND ctth.MaCuocThi = ct.MaCuocThi 
  AND nd.MaNguoiDung = ?
  ) ntb`;
  db.query(
    sqlSelect,
    [idTruongNhom, idTruongNhom, idTruongNhom],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllCuocThiThamDuTheoNgay = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ntb.NgayKetThuc DESC) stt 
  FROM (
  SELECT DISTINCT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN nguoidung nd JOIN thisinhtrinhbaytietmuc tstm JOIN chitietcuocthidangkytudo ctct JOIN thisinh ts JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = ctct.MaTietMuc 
  AND ctct.MaCuocThi = ct.MaCuocThi AND ct.MaDiaDiem = ddtc.MaDiaDiem 
  AND ct.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND ct.MaTrangThai = tt.MaTrangThai
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT DISTINCT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN nguoidung nd JOIN doandoitrinhbaytietmuc ddtm JOIN chitietcuocthidangkytudo ctct JOIN thisinh ts JOIN trangthai tt JOIN doandoi dd
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
  AND ddtm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND ct.MaDiaDiem = ddtc.MaDiaDiem AND ct.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND ct.MaTrangThai = tt.MaTrangThai 
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chuongtrinhvannghe ctr 
  JOIN thisinh ts JOIN nguoidung nd JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi AND ddtc.MaDiaDiem = ct.MaDiaDiem 
  AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi AND ctr.MaChuongTrinh = ctth.MaChuongTrinh AND tt.MaTrangThai = ct.MaTrangThai
  AND ctth.MaCuocThi = ct.MaCuocThi 
  AND nd.MaNguoiDung = ?
  ) ntb
  WHERE (DATE_FORMAT(ntb.NgayBatDau, '%Y-%m-%d') BETWEEN ? AND ?) OR (DATE_FORMAT(ntb.NgayKetThuc, '%Y-%m-%d') BETWEEN ? AND ?)
  OR (DATE_FORMAT(ntb.NgayBatDau, '%Y-%m-%d') <= ? AND DATE_FORMAT(ntb.NgayKetThuc, '%Y-%m-%d') >= ?)
  OR (DATE_FORMAT(ntb.NgayBatDau, '%Y-%m-%d') <= ? AND DATE_FORMAT(ntb.NgayKetThuc, '%Y-%m-%d') >= ?)
  `;
  db.query(
    sqlSelect,
    [
      idTruongNhom,
      idTruongNhom,
      idTruongNhom,
      NgayBatDau,
      NgayKetThuc,
      NgayBatDau,
      NgayKetThuc,
      NgayBatDau,
      NgayBatDau,
      NgayKetThuc,
      NgayKetThuc,
    ],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllCuocThiThamDuTheoThang = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ntb.NgayKetThuc DESC) stt 
  FROM (
  SELECT DISTINCT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN nguoidung nd JOIN thisinhtrinhbaytietmuc tstm JOIN chitietcuocthidangkytudo ctct JOIN thisinh ts JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = ctct.MaTietMuc 
  AND ctct.MaCuocThi = ct.MaCuocThi AND ct.MaDiaDiem = ddtc.MaDiaDiem 
  AND ct.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND ct.MaTrangThai = tt.MaTrangThai
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT DISTINCT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN nguoidung nd JOIN doandoitrinhbaytietmuc ddtm JOIN chitietcuocthidangkytudo ctct JOIN thisinh ts JOIN trangthai tt JOIN doandoi dd
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
  AND ddtm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND ct.MaDiaDiem = ddtc.MaDiaDiem AND ct.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND ct.MaTrangThai = tt.MaTrangThai 
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chuongtrinhvannghe ctr 
  JOIN thisinh ts JOIN nguoidung nd JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi AND ddtc.MaDiaDiem = ct.MaDiaDiem 
  AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi AND ctr.MaChuongTrinh = ctth.MaChuongTrinh AND tt.MaTrangThai = ct.MaTrangThai
  AND ctth.MaCuocThi = ct.MaCuocThi 
  AND nd.MaNguoiDung = ?
  ) ntb
  WHERE DATE_FORMAT(ntb.NgayBatDau, '%Y-%m') BETWEEN ? AND ?`;
  db.query(
    sqlSelect,
    [idTruongNhom, idTruongNhom, idTruongNhom, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllCuocThiThamDuTheoNam = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ntb.NgayKetThuc DESC) stt 
  FROM (
  SELECT DISTINCT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN nguoidung nd JOIN thisinhtrinhbaytietmuc tstm JOIN chitietcuocthidangkytudo ctct JOIN thisinh ts JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = ctct.MaTietMuc 
  AND ctct.MaCuocThi = ct.MaCuocThi AND ct.MaDiaDiem = ddtc.MaDiaDiem 
  AND ct.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND ct.MaTrangThai = tt.MaTrangThai
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT DISTINCT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem FROM cuocthivannghe ct JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN nguoidung nd JOIN doandoitrinhbaytietmuc ddtm JOIN chitietcuocthidangkytudo ctct JOIN thisinh ts JOIN trangthai tt JOIN doandoi dd
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
  AND ddtm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND ct.MaDiaDiem = ddtc.MaDiaDiem AND ct.MaHinhThucCuocThi = ht.MaHinhThucCuocThi AND ct.MaTrangThai = tt.MaTrangThai 
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, ht.TenHinhThuc, ct.NgayBatDau, ct.NgayKetThuc, tt.TenTrangThai, ddtc.TenDiaDiem
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chuongtrinhvannghe ctr 
  JOIN thisinh ts JOIN nguoidung nd JOIN diadiem ddtc JOIN hinhthuccuocthi ht JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi AND ddtc.MaDiaDiem = ct.MaDiaDiem 
  AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi AND ctr.MaChuongTrinh = ctth.MaChuongTrinh AND tt.MaTrangThai = ct.MaTrangThai
  AND ctth.MaCuocThi = ct.MaCuocThi 
  AND nd.MaNguoiDung = ?
  ) ntb
  WHERE DATE_FORMAT(ntb.NgayBatDau, '%Y') BETWEEN ? AND ?`;
  db.query(
    sqlSelect,
    [idTruongNhom, idTruongNhom, idTruongNhom, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllLoaiTietMucPhuHop = async (req, res) => {
  const NhanSo = req.params.nhanSo;
  const sqlSelect = `SELECT * FROM loaitietmuc ltm WHERE ltm.CoDinh = 1 AND ltm.NhanSoToiThieu = ?
  UNION ALL
  SELECT * FROM loaitietmuc ltm WHERE ltm.CoDinh = 0 AND ltm.NhanSoToiThieu <= ?`;
  db.query(sqlSelect, [NhanSo, NhanSo], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucDuThiTuDo = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT *, -1 as ChamDiem, -1 as SapLich ,ROW_NUMBER() OVER (ORDER BY ntb.NgayGioThucHien DESC) stt 
  FROM 
  (SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, ltm.TenLoaiTietMuc, ctct.VongThi, ctct.TrangThai, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.CongBoKetQua, ct.SoVongThi
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd JOIN thisinh ts JOIN giaithuong gt
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
  AND ddtm.MaTietMuc = tm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctct.MaTietMuc 
  AND ctct.MaCuocThi = ct.MaCuocThi AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai
  AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, ltm.TenLoaiTietMuc, ctct.VongThi, ctct.TrangThai, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.CongBoKetQua, ct.SoVongThi
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts JOIN giaithuong gt
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = tm.MaTietMuc 
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND nd.MaNguoiDung = ?) ntb`;
  db.query(sqlSelect, [idTruongNhom, idTruongNhom], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucDuThiTuDoTheoNgay = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, -1 as ChamDiem, -1 as SapLich,  ROW_NUMBER() OVER (ORDER BY ntb.NgayGioThucHien DESC) stt 
  FROM 
  (SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, ltm.TenLoaiTietMuc, ctct.VongThi, ctct.TrangThai, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.CongBoKetQua, ct.SoVongThi
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd JOIN thisinh ts JOIN giaithuong gt
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
  AND ddtm.MaTietMuc = tm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctct.MaTietMuc 
  AND ctct.MaCuocThi = ct.MaCuocThi AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai
  AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, ltm.TenLoaiTietMuc, ctct.VongThi, ctct.TrangThai, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.CongBoKetQua, ct.SoVongThi
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts JOIN giaithuong gt
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = tm.MaTietMuc 
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND nd.MaNguoiDung = ?) ntb
  WHERE DATE_FORMAT(ntb.NgayGioThucHien, '%Y-%m-%d') BETWEEN ? AND ?
  `;
  db.query(
    sqlSelect,
    [idTruongNhom, idTruongNhom, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucDuThiTuDoTheoThang = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, -1 as ChamDiem,-1 as SapLich , ROW_NUMBER() OVER (ORDER BY ntb.NgayGioThucHien DESC) stt 
  FROM 
  (SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, ltm.TenLoaiTietMuc, ctct.VongThi, ctct.TrangThai, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.CongBoKetQua, ct.SoVongThi
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd JOIN thisinh ts JOIN giaithuong gt
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
  AND ddtm.MaTietMuc = tm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctct.MaTietMuc 
  AND ctct.MaCuocThi = ct.MaCuocThi AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai
  AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, ltm.TenLoaiTietMuc, ctct.VongThi, ctct.TrangThai, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.CongBoKetQua, ct.SoVongThi
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts JOIN giaithuong gt
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = tm.MaTietMuc 
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND nd.MaNguoiDung = ?) ntb
  WHERE DATE_FORMAT(ntb.NgayGioThucHien, '%Y-%m') BETWEEN ? AND ?
  `;
  db.query(
    sqlSelect,
    [idTruongNhom, idTruongNhom, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucDuThiTuDoTheoNam = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, -1 as ChamDiem,-1 as SapLich,  ROW_NUMBER() OVER (ORDER BY ntb.NgayGioThucHien DESC) stt 
  FROM 
  (SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, ltm.TenLoaiTietMuc, ctct.VongThi, ctct.TrangThai, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.CongBoKetQua, ct.SoVongThi
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd JOIN thisinh ts JOIN giaithuong gt
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
  AND ddtm.MaTietMuc = tm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctct.MaTietMuc 
  AND ctct.MaCuocThi = ct.MaCuocThi AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai
  AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND nd.MaNguoiDung = ?
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, ltm.TenLoaiTietMuc, ctct.VongThi, ctct.TrangThai, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.CongBoKetQua, ct.SoVongThi
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts JOIN giaithuong gt
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = tm.MaTietMuc 
  AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND tm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi 
  AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND nd.MaNguoiDung = ?) ntb
  WHERE DATE_FORMAT(ntb.NgayGioThucHien, '%Y') BETWEEN ? AND ?
  `;
  db.query(
    sqlSelect,
    [idTruongNhom, idTruongNhom, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucDuThiChuongTrinh = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ctctr.DiemTrungBinh, ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, -1 as ChamDiem, -1 as SapLich 
  FROM tietmucvannghe tm JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct 
  JOIN chitietchuongtrinh ctctr JOIN chuongtrinhvannghe ctr JOIN thisinh ts
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi 
  AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaChuongTrinh = ctct.MaChuongTrinh 
  AND ctct.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi 
  AND tm.MaTietMuc = ctctr.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai
  AND nd.MaNguoiDung = ?
  `;
  db.query(sqlSelect, [idTruongNhom], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucDuThiChuongTrinhTheoNgay = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ctctr.DiemTrungBinh, ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, -1 as ChamDiem
  FROM tietmucvannghe tm JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct 
  JOIN chitietchuongtrinh ctctr JOIN chuongtrinhvannghe ctr JOIN thisinh ts
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi 
  AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaChuongTrinh = ctct.MaChuongTrinh 
  AND ctct.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi 
  AND tm.MaTietMuc = ctctr.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai
  AND nd.MaNguoiDung = ?
  AND (DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') BETWEEN ? AND ?)
  `;
  db.query(
    sqlSelect,
    [idTruongNhom, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucDuThiChuongTrinhTheoThang = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ctctr.DiemTrungBinh, ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, -1 as ChamDiem, -1 as SapLich 
  FROM tietmucvannghe tm JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct 
  JOIN chitietchuongtrinh ctctr JOIN chuongtrinhvannghe ctr JOIN thisinh ts
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi 
  AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaChuongTrinh = ctct.MaChuongTrinh 
  AND ctct.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi 
  AND tm.MaTietMuc = ctctr.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai
  AND nd.MaNguoiDung = ?
  AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m') BETWEEN ? AND ?
  `;
  db.query(
    sqlSelect,
    [idTruongNhom, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucDuThiChuongTrinhTheoNam = async (req, res) => {
  const idTruongNhom = req.params.idTruongNhom;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ct.MaCuocThi, ct.TenCuocThi, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ctctr.DiemTrungBinh, ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, -1 as ChamDiem, -1 as SapLich 
  FROM tietmucvannghe tm JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct 
  JOIN chitietchuongtrinh ctctr JOIN chuongtrinhvannghe ctr JOIN thisinh ts
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi 
  AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaChuongTrinh = ctct.MaChuongTrinh 
  AND ctct.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi 
  AND tm.MaTietMuc = ctctr.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai
  AND nd.MaNguoiDung = ?
  AND DATE_FORMAT(tm.NgayGioThucHien, '%Y') BETWEEN ? AND ?
  `;
  db.query(
    sqlSelect,
    [idTruongNhom, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucDuThiChuongTrinhCuThe = async (req, res) => {
  const idChuongTrinh = req.params.idChuongTrinh;
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT tm.MaTietMuc,tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NhanSo, ctctr.DiemTrungBinh, ROW_NUMBER() OVER (ORDER BY tm.MaTietMuc) stt
  FROM tietmucvannghe tm JOIN chitietcuocthitruyenthong ctct JOIN cuocthivannghe ct 
  JOIN chitietchuongtrinh ctctr JOIN chuongtrinhvannghe ctr JOIN thisinh ts
  JOIN nguoidung nd JOIN loaitietmuc ltm JOIN diadiem ddtc JOIN trangthai tt
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = ctr.MaTruongDonVi 
  AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaChuongTrinh = ctct.MaChuongTrinh 
  AND ctct.MaChuongTrinh = ctct.MaChuongTrinh AND ctct.MaCuocThi = ct.MaCuocThi 
  AND tm.MaTietMuc = ctctr.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND ddtc.MaDiaDiem = ct.MaDiaDiem AND tt.MaTrangThai = ct.MaTrangThai
  AND ctr.MaChuongTrinh = ? AND nd.MaNguoiDung = ?`;
  db.query(sqlSelect, [idChuongTrinh, idTruongNhom], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucDuThiCuocThiTuDoCuThe = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `
    SELECT *, ROW_NUMBER() OVER (ORDER BY ntb.NgayGioThucHien) stt 
    FROM 
    (SELECT tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, tm.NhanSo, ltm.TenLoaiTietMuc, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.TrangThai, ctct.VongThi, ct.SoVongThi, ctct.CongBoKetQua, dd.TenDoanDoi as TrinhBay
    FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm 
    JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd JOIN thisinh ts JOIN nguoidung nd JOIN giaithuong gt
    WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
    AND ddtm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc 
    AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND gt.MaGiaiThuong = ctct.MaGiaiThuong
    AND ct.MaCuocThi = ? AND ctct.VongThi = ? AND nd.MaNguoiDung = ?
    UNION ALL
    SELECT tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, tm.NhanSo, ltm.TenLoaiTietMuc, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.TrangThai, ctct.VongThi, ct.SoVongThi, ctct.CongBoKetQua, ts.TenThiSinh as TrinhBay
    FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm 
    JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts JOIN nguoidung nd JOIN giaithuong gt
    WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = ctct.MaTietMuc 
    AND ctct.MaCuocThi = ct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
    AND gt.MaGiaiThuong = ctct.MaGiaiThuong
    AND ct.MaCuocThi = ? AND ctct.VongThi = ? AND nd.MaNguoiDung = ?
    ) ntb`;
  db.query(
    sqlSelect,
    [idCuocThi, idVongThi, idTruongNhom, idCuocThi, idVongThi, idTruongNhom],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucDuThiDauCuocThiCuThe = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const idTruongNhom = req.params.idTruongNhom;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ntb.NgayGioThucHien) stt FROM (SELECT tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, tm.NhanSo, ltm.TenLoaiTietMuc, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.TrangThai, ctct.VongThi, ct.SoVongThi, ctct.CongBoKetQua
    FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm 
    JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd JOIN thisinh ts JOIN nguoidung nd JOIN giaithuong gt
    WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDoanDoi = ddtm.MaDoanDoi 
    AND ddtm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc 
    AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND gt.MaGiaiThuong = ctct.MaGiaiThuong AND ctct.TrangThai = 1
    AND ct.MaCuocThi = ? AND ctct.VongThi = ? AND nd.MaNguoiDung = ?
    UNION ALL
    SELECT tm.MaTietMuc, tm.TenTietMuc, tm.NgayGioThucHien, tm.NhanSo, ltm.TenLoaiTietMuc, ctct.DiemTrungBinh, gt.TenGiaiThuong, ctct.TrangThai, ctct.VongThi, ct.SoVongThi, ctct.CongBoKetQua
    FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm 
    JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts JOIN nguoidung nd JOIN giaithuong gt
    WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = tstm.MaThiSinh AND tstm.MaTietMuc = ctct.MaTietMuc 
    AND ctct.MaCuocThi = ct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
    AND gt.MaGiaiThuong = ctct.MaGiaiThuong AND ctct.TrangThai = 1
    AND ct.MaCuocThi = ? AND ctct.VongThi = ? AND nd.MaNguoiDung = ?) ntb`;
  db.query(
    sqlSelect,
    [idCuocThi, idVongThi, idTruongNhom, idCuocThi, idVongThi, idTruongNhom],
    (err, result) => {
      res.send(result);
    }
  );
};

module.exports = {
  getAllCuocThiLamGiamKhao,
  getDetailDoanDoi,
  getAllThiSinhThuocDoanDoi,
  getAllTietMucChamDiem,
  getAllCuocThiChuaHoanThanh,
  getAllTietMucCanChamDiem,
  getAllTietMucDaChamDiem,
  getAllTietMucChuongTrinhDaChamDiem,
  getAllTietMucChamDiemCuocThiCaNhan,
  getAllTietMucChamDiemCuocThiDoiNhom,
  getAllChuongTrinhCuocThiTruyenThong,
  getAllTietMucChuongTrinh,
  getUpdateDiemTietMuc,
  getUpdateDiemTietMucChuongTrinh,
  getUpdateTrangThaiTietMuc,
  getAllKetQuaTietMucDuThi,
  getAllMaCuocThiThamDu,
  getAllCuocThiThamDu,
  getAllTietMucDuThiTuDo,
  getAllTietMucDuThiChuongTrinh,
  getAllTietMucDuThiCuocThiTuDoCuThe,
  getAllDoanDoiLamTruongNhom,
  getAllCuocThiDaHoacChuaThamDu,
  getDataChuongTrinhDuThi,
  getAllTietMucDuThiChuongTrinhCuThe,
  getAllLoaiTietMucPhuHop,
  getAllTietMucDuThiDauCuocThiCuThe,
  getCoThamDuCuocThiDangDienRa,
  getDetailGiamKhao,
  getDetailTruongNhom,
  getAllCuocThiChuaHoacDangDienRa,
  getAllCuocThiThamDuTheoNgay,
  getAllCuocThiThamDuTheoThang,
  getAllCuocThiThamDuTheoNam,
  getAllTietMucDuThiTuDoTheoNgay,
  getAllTietMucDuThiTuDoTheoThang,
  getAllTietMucDuThiTuDoTheoNam,
  getAllTietMucDuThiChuongTrinhTheoNgay,
  getAllTietMucDuThiChuongTrinhTheoThang,
  getAllTietMucDuThiChuongTrinhTheoNam,
  getAllCuocThiLamGiamKhaoTheoNgay,
  getAllCuocThiLamGiamKhaoTheoThang,
  getAllCuocThiLamGiamKhaoTheoNam,
  getAllTietMucDaChamDiemTheoNgay,
  getAllTietMucDaChamDiemTheoThang,
  getAllTietMucDaChamDiemTheoNam,
  getAllTietMucChuongTrinhDaChamDiemTheoNgay,
  getAllTietMucChuongTrinhDaChamDiemTheoThang,
  getAllTietMucChuongTrinhDaChamDiemTheoNam,
  getAllTietMucChamDiemCuocThiCaNhanTheoNgay,
  getAllTietMucChamDiemCuocThiDoiNhomTheoNgay,
  getAllChuongTrinhCuocThiTruyenThongTheoNgay,
};
