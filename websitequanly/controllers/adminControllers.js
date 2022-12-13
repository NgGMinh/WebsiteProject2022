const db = require("../models");

////////////////////////////////////////////////////////////////////////
////Action Chương Trình Văn Nghệ
////////////////////////////////////////////////////////////////////////
const getAllChuongTrinh = async (req, res) => {
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc DESC) stt, ctct.MaCuocThi, ctr.MaChuongTrinh, ctr.TenChuongTrinh,  ctr.NgayGioToChuc, d.TenDiaDiem, dv.TenDonVi, ct.MaTrangThai,
  ctct.DiemTrungBinh, gt.TenGiaiThuong
  FROM chuongtrinhvannghe ctr JOIN diadiem d join trangthai t join donvitochuc dv
  JOIN chitietcuocthitruyenthong ctct JOIN giaithuong gt JOIN cuocthivannghe ct
  WHERE ctr.MaDiaDiem = d.MaDiaDiem and t.MaTrangThai = ctr.MaTrangThai and dv.MaDonVi = ctr.MaDonVi AND ctct.MaChuongTrinh = ctr.MaChuongTrinh AND gt.MaGiaiThuong = ctct.MaGiaiThuong AND ct.MaCuocThi = ctct.MaCuocThi`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllDataLocChuongTrinhTheoNgay = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc DESC) stt, ctct.MaCuocThi, ctr.MaChuongTrinh, ctr.TenChuongTrinh,  ctr.NgayGioToChuc, d.TenDiaDiem, dv.TenDonVi, ct.MaTrangThai,
  ctct.DiemTrungBinh, gt.TenGiaiThuong
  FROM chuongtrinhvannghe ctr JOIN diadiem d join trangthai t join donvitochuc dv
  JOIN chitietcuocthitruyenthong ctct JOIN giaithuong gt JOIN cuocthivannghe ct
  WHERE ctr.MaDiaDiem = d.MaDiaDiem and t.MaTrangThai = ctr.MaTrangThai and dv.MaDonVi = ctr.MaDonVi AND ctct.MaChuongTrinh = ctr.MaChuongTrinh AND gt.MaGiaiThuong = ctct.MaGiaiThuong AND ct.MaCuocThi = ctct.MaCuocThi
  AND DATE_FORMAT(ctr.NgayGioToChuc, '%Y-%m-%d') BETWEEN ? AND ?`;
  db.query(
    sqlSelect,
    [NgayBatDau, NgayKetThuc, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllDataLocChuongTrinhTheoThang = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc DESC) stt, ctct.MaCuocThi, ctr.MaChuongTrinh, ctr.TenChuongTrinh,  ctr.NgayGioToChuc, d.TenDiaDiem, dv.TenDonVi, ct.MaTrangThai,
  ctct.DiemTrungBinh, gt.TenGiaiThuong
  FROM chuongtrinhvannghe ctr JOIN diadiem d join trangthai t join donvitochuc dv
  JOIN chitietcuocthitruyenthong ctct JOIN giaithuong gt JOIN cuocthivannghe ct
  WHERE ctr.MaDiaDiem = d.MaDiaDiem and t.MaTrangThai = ctr.MaTrangThai and dv.MaDonVi = ctr.MaDonVi AND ctct.MaChuongTrinh = ctr.MaChuongTrinh AND gt.MaGiaiThuong = ctct.MaGiaiThuong AND ct.MaCuocThi = ctct.MaCuocThi
  AND DATE_FORMAT(ctr.NgayGioToChuc, '%Y-%m') BETWEEN ? AND ?`;
  db.query(
    sqlSelect,
    [NgayBatDau, NgayKetThuc, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllDataLocChuongTrinhTheoNam = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc DESC) stt, ctct.MaCuocThi, ctr.MaChuongTrinh, ctr.TenChuongTrinh,  ctr.NgayGioToChuc, d.TenDiaDiem, dv.TenDonVi, ct.MaTrangThai,
  ctct.DiemTrungBinh, gt.TenGiaiThuong
  FROM chuongtrinhvannghe ctr JOIN diadiem d join trangthai t join donvitochuc dv
  JOIN chitietcuocthitruyenthong ctct JOIN giaithuong gt JOIN cuocthivannghe ct
  WHERE ctr.MaDiaDiem = d.MaDiaDiem and t.MaTrangThai = ctr.MaTrangThai and dv.MaDonVi = ctr.MaDonVi AND ctct.MaChuongTrinh = ctr.MaChuongTrinh AND gt.MaGiaiThuong = ctct.MaGiaiThuong AND ct.MaCuocThi = ctct.MaCuocThi
  AND DATE_FORMAT(ctr.NgayGioToChuc, '%Y') BETWEEN ? AND ?`;
  db.query(
    sqlSelect,
    [NgayBatDau, NgayKetThuc, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getDetailChuongTrinh = async (req, res) => {
  const idChuongTrinh = req.params.idChuongTrinh;
  const sqlSelect = `SELECT *
  FROM chuongtrinhvannghe ctr JOIN diadiem d join trangthai t 
  JOIN donvitochuc dv JOIN doandoi dd JOIN thisinh ts JOIN chitietcuocthitruyenthong ctth JOIN giaithuong gt
  WHERE ctr.MaDiaDiem = d.MaDiaDiem and t.MaTrangThai = ctr.MaTrangThai AND dd.MaThiSinh = ctr.MaTruongDonVi
  and dv.MaDonVi = ctr.MaDonVi AND dd.MaThiSinh = ts.MaThiSinh AND ctth.MaChuongTrinh = ctr.MaChuongTrinh 
  AND ctth.MaGiaiThuong = gt.MaGiaiThuong and dd.MaDoanDoi = ctr.MaDoanDoi
  and ctr.MaChuongTrinh = ?`;
  db.query(sqlSelect, idChuongTrinh, (err, result) => {
    res.send(result);
  });
};

const getAddChuongTrinh = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
    idCTR: "",
  };
  let TenChuongTrinh = req.body.TenChuongTrinh;
  let DiaDiemToChuc = req.body.DiaDiemToChuc;
  let DonViToChuc = req.body.DonViToChuc;
  let NgayGioToChuc = req.body.NgayGioToChuc;
  let NoiDungChuongTrinh = req.body.NoiDungChuongTrinh;
  let MaTruongDonVi = req.body.MaTruongDonVi;
  let TrangThai = 1;
  db.query(
    "INSERT INTO chuongtrinhvannghe(TenChuongTrinh,NoiDungChuongTrinh,NgayGioToChuc,MaDiaDiem,MaDonVi,MaTrangThai, MaTruongDonVi) VALUE (?,?,?,?,?,?,?,?)",
    [
      TenChuongTrinh,
      NoiDungChuongTrinh,
      NgayGioToChuc,
      DiaDiemToChuc,
      DonViToChuc,
      TrangThai,
      MaTruongDonVi,
    ],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Chương Trình Thất Bại!";
        res.send(successAdd);
        throw error;
      }

      if (results.affectedRows > 0) {
        successAdd.isAdd = true;
        successAdd.message = "Thêm Chương Trình Thành Công!";
        successAdd.idCTR = results.insertId;
        res.send(successAdd);
      } else {
        successAdd.message = "Thêm Chương Trình Thất Bại!";
        successAdd.isAdd = false;
        res.send(successAdd);
      }
    }
  );
};

const getUpdateChuongTrinh = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const idChuongTrinh = req.params.idChuongTrinh;
  let TenChuongTrinh = req.body.TenChuongTrinh;
  let DonViToChuc = req.body.DonViToChuc;
  let NgayGioToChuc = req.body.NgayGioToChuc;
  let NoiDungChuongTrinh = req.body.NoiDungChuongTrinh;
  let MaTruongDonVi = req.body.MaTruongDonVi;
  let MaGiaiThuong = req.body.MaGiaiThuong;
  let MaDoanDoi = req.body.MaDoanDoi;
  db.query(
    `UPDATE chuongtrinhvannghe ctr SET ctr.TenChuongTrinh = ?, ctr.NgayGioToChuc = ?, 
    ctr.NoiDungChuongTrinh = ?, ctr.MaDonVi = ?, ctr.MaTruongDonVi = ?, ctr.MaDoanDoi = ?
    WHERE ctr.MaChuongTrinh = ?`,
    [
      TenChuongTrinh,
      NgayGioToChuc,
      NoiDungChuongTrinh,
      DonViToChuc,
      MaTruongDonVi,
      MaDoanDoi,
      idChuongTrinh,
    ],
    function (error, results, fields) {
      if (error) {
        success.isAdd = false;
        success.message = "Thất Bại!";
        res.send(success);
        throw error;
      }
      if (results.affectedRows > 0) {
        db.query(
          `UPDATE tietmucvannghe tm SET tm.NgayGioThucHien = ? 
          WHERE tm.MaTietMuc IN (SELECT ctctr.MaTietMuc FROM chitietchuongtrinh ctctr WHERE ctctr.MaChuongTrinh = ?)`,
          [NgayGioToChuc, idChuongTrinh],
          function (error, results, fields) {
            if (error) {
              success.isAdd = false;
              success.message = "Thất Bại!";
              res.send(success);
              throw error;
            }

            if (results.affectedRows > 0) {
              db.query(
                `UPDATE chitietcuocthitruyenthong ctth SET ctth.MaGiaiThuong = ? WHERE ctth.MaChuongTrinh = ?`,
                [MaGiaiThuong, idChuongTrinh],
                function (error, results, fields) {
                  if (error) {
                    success.isAdd = false;
                    success.message = "Thất Bại!";
                    res.send(success);
                    throw error;
                  }

                  if (results.affectedRows > 0) {
                    success.isAdd = true;
                    success.message = "Thành Công!";
                    success.idCTR = results.insertId;
                    res.send(success);
                  } else {
                    success.message = "Thất Bại!";
                    success.isAdd = false;
                    res.send(success);
                  }
                }
              );
            } else {
              success.message = "Thất Bại!";
              success.isAdd = false;
              res.send(success);
            }
          }
        );
      } else {
        success.message = "Thất Bại!";
        success.isAdd = false;
        res.send(success);
      }
    }
  );
};

const getDeleteChuongTrinh = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  const idChuongTrinh = req.params.idChuongTrinh;
  db.query(
    `DELETE FROM tietmucvannghe WHERE MaTietMuc IN 
    (SELECT ctr.MaTietMuc FROM chitietchuongtrinh ctr WHERE ctr.MaChuongTrinh = ?)`,
    [idChuongTrinh],
    function (error, results, fields) {
      if (error) {
        successAdd.message = "Thất bại";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          if (results.affectedRows > 0) {
            db.query(
              `DELETE FROM chuongtrinhvannghe WHERE MaChuongTrinh = ?`,
              [idChuongTrinh],
              function (error, results, fields) {
                if (error) {
                  successAdd.message = "Thất bại";
                  res.send(successAdd);
                  throw error;
                } else {
                  if (results.affectedRows > 0) {
                    if (results.affectedRows > 0) {
                      successAdd.message = "Thành Công!";
                      successAdd.isAdd = true;
                      res.send(successAdd);
                    } else {
                      successAdd.message = "Thất Bại!";
                      successAdd.isAdd = false;
                      res.send(successAdd);
                    }
                  }
                }
              }
            );
          } else {
            successAdd.message = "Thất Bại!";
            successAdd.isAdd = false;
            res.send(successAdd);
          }
        }
      }
    }
  );
};

let successLogin = {
  isLogin: false,
  message: "",
  info: {},
};

const getThiSinhThamDuChuongTrinh = async (req, res) => {
  const idChuongTrinh = req.params.idChuongTrinh;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY nts.MaThiSinh) stt FROM
  (SELECT DISTINCT ts.MaThiSinh, ts.TenThiSinh,ts.GioiTinh, ts.MaDinhDanh, ts.Email, ts.Phone, ts.MaLop 
  FROM chitietchuongtrinh ct JOIN thisinhtrinhbaytietmuc ctm JOIN thisinh ts 
  WHERE ct.MaTietMuc = ctm.MaTietMuc and ts.MaThiSinh = ctm.MaThiSinh and ct.MaChuongTrinh = ?) nts`;
  db.query(sqlSelect, idChuongTrinh, (err, result) => {
    res.send(result);
  });
};

const getAllTietMucThuocChuongTrinh = async (req, res) => {
  const idChuongTrinh = req.params.idChuongTrinh;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt,tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, tm.NhanSo, ct.DiemTrungBinh
  FROM chitietchuongtrinh ct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  WHERE ct.MaTietMuc = tm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc
  AND ct.MaChuongTrinh = ?`;
  db.query(sqlSelect, idChuongTrinh, (err, result) => {
    res.send(result);
  });
};

////////////////////////////////////////////////////////////////////////
////Action Cuộc Thi Văn Nghệ
////////////////////////////////////////////////////////////////////////
const getAllCuocThi = async (req, res) => {
  const sqlSelect = `select cth.MaCuocThi, ROW_NUMBER() OVER (ORDER BY cth.NgayBatDau DESC) stt, cth.TenCuocThi, ht.TenHinhThuc, cth.SoVongThi ,d.TenDiaDiem ,cth.NgayBatDau, cth.NgayKetThuc, t.MaTrangThai
  from cuocthivannghe cth join diadiem d join trangthai t join hinhthuccuocthi ht join thangdiem td 
  where cth.MaDiaDiem = d.MaDiaDiem and cth.MaHinhThucCuocThi = ht.MaHinhThucCuocThi and cth.MaTrangThai = t.MaTrangThai and cth.MaThangDiem = td.MaThangDiem`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllCuocThiChuaHoacDangDienRa = async (req, res) => {
  const sqlSelect = `select cth.MaCuocThi, ROW_NUMBER() OVER (ORDER BY cth.NgayBatDau DESC) stt, cth.TenCuocThi, ht.TenHinhThuc, cth.SoVongThi ,d.TenDiaDiem ,cth.NgayBatDau, cth.NgayKetThuc, t.MaTrangThai
  from cuocthivannghe cth join diadiem d join trangthai t join hinhthuccuocthi ht join thangdiem td 
  where cth.MaDiaDiem = d.MaDiaDiem and cth.MaHinhThucCuocThi = ht.MaHinhThucCuocThi and cth.MaTrangThai = t.MaTrangThai and cth.MaThangDiem = td.MaThangDiem AND cth.MaTrangThai IN (1,2)`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllDataLocCuocThiTheoNgay = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT * FROM (select distinct cth.MaCuocThi, ROW_NUMBER() OVER (ORDER BY cth.NgayBatDau DESC) stt, cth.TenCuocThi, ht.TenHinhThuc, cth.SoVongThi ,d.TenDiaDiem ,cth.NgayBatDau, cth.NgayKetThuc, t.MaTrangThai
  from cuocthivannghe cth join diadiem d join trangthai t join hinhthuccuocthi ht join thangdiem td 
  where cth.MaDiaDiem = d.MaDiaDiem and cth.MaHinhThucCuocThi = ht.MaHinhThucCuocThi and cth.MaTrangThai = t.MaTrangThai and cth.MaThangDiem = td.MaThangDiem) tktb
  WHERE (DATE_FORMAT(tktb.NgayBatDau, '%Y-%m-%d') BETWEEN ? AND ?) OR (DATE_FORMAT(tktb.NgayKetThuc, '%Y-%m-%d') BETWEEN ? AND ?)
  OR (DATE_FORMAT(tktb.NgayBatDau, '%Y-%m-%d') <= ? AND DATE_FORMAT(tktb.NgayKetThuc, '%Y-%m-%d') >= ?)
  OR (DATE_FORMAT(tktb.NgayBatDau, '%Y-%m-%d') <= ? AND DATE_FORMAT(tktb.NgayKetThuc, '%Y-%m-%d') >= ?)
  `;
  db.query(
    sqlSelect,
    [
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

const getAllDataLocCuocThiTheoThang = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `select cth.MaCuocThi, ROW_NUMBER() OVER (ORDER BY cth.NgayBatDau DESC) stt, cth.TenCuocThi, ht.TenHinhThuc, cth.SoVongThi ,d.TenDiaDiem ,cth.NgayBatDau, cth.NgayKetThuc, t.MaTrangThai
  from cuocthivannghe cth join diadiem d join trangthai t join hinhthuccuocthi ht join thangdiem td 
  where cth.MaDiaDiem = d.MaDiaDiem and cth.MaHinhThucCuocThi = ht.MaHinhThucCuocThi and cth.MaTrangThai = t.MaTrangThai and cth.MaThangDiem = td.MaThangDiem
  AND DATE_FORMAT(cth.NgayBatDau, '%Y-%m') BETWEEN ? AND ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllDataLocCuocThiTheoNam = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `select cth.MaCuocThi, ROW_NUMBER() OVER (ORDER BY cth.NgayBatDau DESC) stt, cth.TenCuocThi, ht.TenHinhThuc, cth.SoVongThi ,d.TenDiaDiem ,cth.NgayBatDau, cth.NgayKetThuc, t.MaTrangThai
  from cuocthivannghe cth join diadiem d join trangthai t join hinhthuccuocthi ht join thangdiem td 
  where cth.MaDiaDiem = d.MaDiaDiem and cth.MaHinhThucCuocThi = ht.MaHinhThucCuocThi and cth.MaTrangThai = t.MaTrangThai and cth.MaThangDiem = td.MaThangDiem
  AND DATE_FORMAT(cth.NgayBatDau, '%Y') BETWEEN ? AND ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllMaGiamKhaoCuocThi = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT gk.MaGiamKhao FROM giamkhaocuocthi gk
  WHERE gk.MaCuocThi = ?`;
  db.query(sqlSelect, [idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucThuocCuocThiDoiNhom = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const sqlSelect = `SELECT tm.MaTietMuc, ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien, ltm.TenLoaiTietMuc, tm.TenTietMuc) stt, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, tm.NhanSo, dd.TenDoanDoi as TrinhBayBoi, ctct.DiemTrungBinh, ctct.TrangThai, ctct.MaGiaiThuong, gt.TenGiaiThuong, 0 as SapLich, ctct.CongBoKetQua
  FROM doandoi dd JOIN doandoitrinhbaytietmuc cttm JOIN tietmucvannghe tm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN loaitietmuc ltm JOIN giaithuong gt
  WHERE dd.MaDoanDoi = cttm.MaDoanDoi AND tm.MaTietMuc = cttm.MaTietMuc AND ctct.MaTietMuc = cttm.MaTietMuc AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND ct.MaCuocThi = ctct.MaCuocThi AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND ctct.VongThi = ?
  AND ct.MaPhanThi = 2 AND ct.MaCuocThi = ?`;
  db.query(sqlSelect, [idVongThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucThuocCuocThiDoiNhomTheoNgay = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT tm.MaTietMuc, ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien, ltm.TenLoaiTietMuc, tm.TenTietMuc) stt, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, tm.NhanSo, dd.TenDoanDoi as TrinhBayBoi, ctct.DiemTrungBinh, ctct.TrangThai, ctct.MaGiaiThuong, gt.TenGiaiThuong, 0 as SapLich, ctct.CongBoKetQua
  FROM doandoi dd JOIN doandoitrinhbaytietmuc cttm JOIN tietmucvannghe tm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  JOIN loaitietmuc ltm JOIN giaithuong gt
  WHERE dd.MaDoanDoi = cttm.MaDoanDoi AND tm.MaTietMuc = cttm.MaTietMuc AND ctct.MaTietMuc = cttm.MaTietMuc AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND ct.MaCuocThi = ctct.MaCuocThi AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND ctct.VongThi = ?
  AND ct.MaPhanThi = 2 AND ct.MaCuocThi = ?
  AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') >= ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') <= ?`;
  db.query(
    sqlSelect,
    [idVongThi, idCuocThi, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucThuocCuocThiCaNhan = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const sqlSelect = `SELECT tm.MaTietMuc,ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien, ltm.TenLoaiTietMuc, tm.TenTietMuc) stt, tm.TenTietMuc, tm.NhanSo, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ts.TenThiSinh as TrinhBayBoi, ctct.DiemTrungBinh, ctct.TrangThai, ctct.MaGiaiThuong, gt.TenGiaiThuong, 0 as SapLich, ctct.CongBoKetQua
  FROM thisinh ts JOIN thisinhtrinhbaytietmuc ctm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct JOIN tietmucvannghe tm 
  JOIN loaitietmuc ltm JOIN giaithuong gt
  WHERE ctm.MaThiSinh = ts.MaThiSinh AND ctct.MaTietMuc = ctm.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND tm.MaTietMuc = ctm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND ct.MaPhanThi = 1 
  AND ctct.VongThi = ? AND ctct.MaCuocThi = ?`;
  db.query(sqlSelect, [idVongThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucThuocCuocThiCaNhanTheoNgay = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT tm.MaTietMuc,ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien, ltm.TenLoaiTietMuc, tm.TenTietMuc) stt, tm.TenTietMuc, tm.NhanSo, ltm.TenLoaiTietMuc,tm.NgayGioThucHien, ts.TenThiSinh as TrinhBayBoi, ctct.DiemTrungBinh, ctct.TrangThai, ctct.MaGiaiThuong, gt.TenGiaiThuong, 0 as SapLich, ctct.CongBoKetQua
  FROM thisinh ts JOIN thisinhtrinhbaytietmuc ctm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct JOIN tietmucvannghe tm 
  JOIN loaitietmuc ltm JOIN giaithuong gt
  WHERE ctm.MaThiSinh = ts.MaThiSinh AND ctct.MaTietMuc = ctm.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND tm.MaTietMuc = ctm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND ct.MaPhanThi = 1 
  AND ctct.VongThi = ? AND ctct.MaCuocThi = ?
  AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') >= ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') <= ?`;
  db.query(
    sqlSelect,
    [idVongThi, idCuocThi, NgayBatDau, NgayKetThuc],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllTietMucCaCuocThi = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien, ltm.TenLoaiTietMuc, tm.TenTietMuc) stt, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ts.TenThiSinh as TrinhBay, ctct.VongThi, gt.TenGiaiThuong, ctct.TrangThai, ct.SoVongThi, ctct.DiemTrungBinh
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm 
  JOIN loaitietmuc ltm JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts JOIN giaithuong gt
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND tm.MaTietMuc = tstm.MaTietMuc AND tstm.MaThiSinh = ts.MaThiSinh AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND ct.MaCuocThi = ?
  UNION ALL
  SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien, ltm.TenLoaiTietMuc, tm.TenTietMuc) stt, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, dd.TenDoanDoi as TrinhBay, ctct.VongThi, gt.TenGiaiThuong, ctct.TrangThai, ct.SoVongThi, ctct.DiemTrungBinh
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm 
  JOIN loaitietmuc ltm JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd JOIN giaithuong gt
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND tm.MaTietMuc = ddtm.MaTietMuc AND ddtm.MaDoanDoi = dd.MaDoanDoi AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  AND ct.MaCuocThi = ?`;
  db.query(sqlSelect, [idCuocThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllThiSinhCaCuocThi = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.MaDinhDanh) stt FROM 
  (SELECT DISTINCT ts.TenThiSinh, ts.MaDinhDanh, ts.GioiTinh, ts.Email, ts.Phone, ts.MaLop, dv.TenDonVi 
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm 
  JOIN thisinhtrinhbaytietmuc tstm JOIN thisinh ts JOIN donvitochuc dv 
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaTietMuc = tstm.MaTietMuc 
  AND tstm.MaThiSinh = ts.MaThiSinh AND ts.MaDonVi = dv.MaDonVi 
  AND ct.MaCuocThi = ?
  UNION ALL 
  SELECT DISTINCT ts.TenThiSinh, ts.MaDinhDanh, ts.GioiTinh, ts.Email, ts.Phone, ts.MaLop, dv.TenDonVi
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm 
  JOIN doandoitrinhbaytietmuc ddtm JOIN doandoi dd JOIN thisinh ts JOIN thisinhthuocdoandoi tstd JOIN donvitochuc dv
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaTietMuc = ddtm.MaTietMuc 
  AND ddtm.MaDoanDoi = tstd.MaDoanDoi AND tstd.MaThiSinh = ts.MaThiSinh AND ts.MaDonVi = dv.MaDonVi
  AND ct.MaCuocThi = ?) tb`;
  db.query(sqlSelect, [idCuocThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucCaCuocThiChuongTrinh = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien) stt, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, tm.NhanSo, ctr.TenChuongTrinh, ctctr.DiemTrungBinh
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN tietmucvannghe tm 
  JOIN loaitietmuc ltm JOIN chuongtrinhvannghe ctr JOIN chitietchuongtrinh ctctr
  WHERE ct.MaCuocThi = ctth.MaCuocThi AND ctth.MaChuongTrinh = ctr.MaChuongTrinh AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh 
  AND ctctr.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ct.MaCuocThi = ?`;
  db.query(sqlSelect, [idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllThiSinhCuocThiChuongTrinh = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc) stt, ts.TenThiSinh, ts.MaDinhDanh, ts.GioiTinh, ts.Email, ts.Phone, ts.MaLop, dv.TenDonVi
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chuongtrinhvannghe ctr 
  JOIN doandoi dd JOIN thisinhthuocdoandoi tstd JOIN thisinh ts JOIN donvitochuc dv
  WHERE ct.MaCuocThi = ctth.MaCuocThi AND ctth.MaChuongTrinh = ctr.MaChuongTrinh AND ctr.MaTruongDonVi = dd.MaThiSinh 
  AND dd.MaDoanDoi = tstd.MaDoanDoi AND tstd.MaThiSinh = ts.MaThiSinh AND dv.MaDonVi = ts.MaDonVi
  AND ct.MaCuocThi = ?`;
  db.query(sqlSelect, [idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllThiSinhThamDuCuocThiCaNhan = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const sqlSelect = `SELECT DISTINCT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien) stt, ts.MaThiSinh, ts.TenThiSinh, ts.MaDinhDanh, ts.GioiTinh, ts.Email, ts.Phone, dv.TenDonVi
  FROM thisinh ts JOIN thisinhtrinhbaytietmuc ctm JOIN chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  JOIN donvitochuc dv
  WHERE ctm.MaThiSinh = ts.MaThiSinh AND ctct.MaTietMuc = ctm.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi AND dv.MaDonVi = ts.MaDonVi
  AND tm.MaTietMuc = ctm.MaTietMuc AND ltm.MaLoaiTietMuc = tm.MaLoaiTietMuc AND ct.MaPhanThi = 1 
  AND ctct.VongThi = ? AND ctct.MaCuocThi = ?`;
  db.query(sqlSelect, [idVongThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllThiSinhThamDuCuocThiDoiNhom = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const sqlSelect = `SELECT DISTINCT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien) stt, ts.MaThiSinh, ts.TenThiSinh, ts.MaDinhDanh, ts.GioiTinh, ts.Email, ts.Phone, dd.TenDoanDoi, dv.TenDonVi
  FROM doandoi dd JOIN thisinhthuocdoandoi tsdd JOIN thisinh ts JOIN doandoitrinhbaytietmuc ctm JOIN donvitochuc dv
  JOIN cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm
  WHERE dd.MaDoanDoi = tsdd.MaDoanDoi AND tsdd.MaThiSinh = ts.MaThiSinh and ctm.MaDoanDoi = dd.MaDoanDoi AND ct.MaPhanThi = 2
  AND ctm.MaTietMuc = ctct.MaTietMuc AND ctct.MaCuocThi = ct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND dv.MaDonVi = ts.MaDonVi
  AND ctct.VongThi = ? AND ct.MaCuocThi = ?`;
  db.query(sqlSelect, [idVongThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllChuongTrinhThuocCuocThi = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT ctr.MaChuongTrinh, ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc) stt, ctr.TenChuongTrinh, ctr.NgayGioToChuc, d.TenDiaDiem, dv.TenDonVi, t.TenTrangThai, ct.DiemTrungBinh, ct.CongBoKetQua, gt.MaGiaiThuong, gt.TenGiaiThuong, DATE_FORMAT(ctr.NgayGioToChuc, '%Y-%m-%d') AS NgayToChuc
  FROM chuongtrinhvannghe ctr JOIN diadiem d join trangthai t join donvitochuc dv JOIN chitietcuocthitruyenthong ct JOIN giaithuong gt
  WHERE ctr.MaDiaDiem = d.MaDiaDiem and t.MaTrangThai = ctr.MaTrangThai and dv.MaDonVi = ctr.MaDonVi and ct.MaChuongTrinh = ctr.MaChuongTrinh AND gt.MaGiaiThuong = ct.MaGiaiThuong
  and ct.MaCuocThi = ?`;
  db.query(sqlSelect, idCuocThi, (err, result) => {
    res.send(result);
  });
};

const getAllChiTietChuongTrinhThuocCuocThi = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT ctr.TenChuongTrinh as "Tên Chương Trình", tm.TenTietMuc as "Tên Tiết Mục", ltm.TenLoaiTietMuc as "Loại Tiết Mục", tm.NhanSo as "Nhân Số", ctctr.DiemTrungBinh as "Điểm Thi"
  FROM chitietchuongtrinh ctctr JOIN chitietcuocthitruyenthong ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm JOIN chuongtrinhvannghe ctr
  WHERE ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ctct.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaTietMuc = tm.MaTietMuc 
  AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND ctct.MaCuocThi = ?`;
  db.query(sqlSelect, idCuocThi, (err, result) => {
    res.send(result);
  });
};

const getAllChuongTrinhThuocCuocThiTheoNgay = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ctr.MaChuongTrinh, ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc) stt, ctr.TenChuongTrinh, ctr.NgayGioToChuc, d.TenDiaDiem, dv.TenDonVi, t.TenTrangThai, ct.DiemTrungBinh, ct.CongBoKetQua, gt.MaGiaiThuong, gt.TenGiaiThuong, DATE_FORMAT(ctr.NgayGioToChuc, '%Y-%m-%d') AS NgayToChuc
  FROM chuongtrinhvannghe ctr JOIN diadiem d join trangthai t join donvitochuc dv JOIN chitietcuocthitruyenthong ct JOIN giaithuong gt
  WHERE ctr.MaDiaDiem = d.MaDiaDiem and t.MaTrangThai = ctr.MaTrangThai and dv.MaDonVi = ctr.MaDonVi and ct.MaChuongTrinh = ctr.MaChuongTrinh AND gt.MaGiaiThuong = ct.MaGiaiThuong
  and ct.MaCuocThi = ?
  AND (DATE_FORMAT(ctr.NgayGioToChuc, '%Y-%m-%d') BETWEEN ? AND ?)
  `;
  db.query(sqlSelect, [idCuocThi, NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllGiamKhaoCuocThi = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT nd.MaNguoiDung, nd.HoTenNguoiDung, nd.GioiTinh, nd.Email, nd.Phone, ROW_NUMBER() OVER (ORDER BY nd.MaNguoiDung DESC) stt 
  FROM nguoidung nd JOIN giamkhaocuocthi gkct
  WHERE nd.MaChucVu = 2 and nd.MaNguoiDung = gkct.MaGiamKhao and gkct.MaCuocThi = ?`;
  db.query(sqlSelect, idCuocThi, (err, result) => {
    res.send(result);
  });
};

const getDeleteGiamKhaoCuocThi = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const idCuocThi = req.params.idCuocThi;
  const MaGiamKhao = req.params.MaGiamKhao;

  db.query(
    `DELETE FROM diem WHERE MaCuocThi = ? AND MaGiamKhao = ?`,
    [idCuocThi, MaGiamKhao],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thất Bại!";
        res.send(success);
        throw error;
      } else {
        db.query(
          `DELETE FROM giamkhaocuocthi WHERE MaCuocThi = ? AND MaGiamKhao = ?`,
          [idCuocThi, MaGiamKhao],
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
                res.send(success);
              } else {
                success.message = "Thất Bại!";
                success.isSuccess = false;
                res.send(success);
              }
            }
          }
        );
      }
    }
  );
};

const getAllGiamKhaoKhongThuocCuocThi = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT nd.MaNguoiDung, nd.HoTenNguoiDung, nd.GioiTinh, nd.Email, nd.Phone, ROW_NUMBER() OVER (ORDER BY nd.MaNguoiDung DESC) stt 
  FROM nguoidung nd
  WHERE nd.MaNguoiDung and nd.MaChucVu = 2 
  and nd.MaNguoiDung NOT IN 
  (SELECT nd.MaNguoiDung 
   FROM nguoidung nd JOIN giamkhaocuocthi gkct
  WHERE nd.MaChucVu = 2 and nd.MaNguoiDung = gkct.MaGiamKhao and gkct.MaCuocThi = ?)`;
  db.query(sqlSelect, idCuocThi, (err, result) => {
    res.send(result);
  });
};

const getDetailCuocThi = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT DISTINCT cth.TenCuocThi, cth.NoiDungCuocThi, cth.SoVongThi, cth.MaHinhThucCuocThi, cth.MaThangDiem, cth.NgayBatDau, cth.NgayKetThuc, cth.MaDiaDiem, cth.MaTrangThai, dd.TenDiaDiem, tt.TenTrangThai, td.TenThangDiem, 0 as MaPhanThi, 0 as TenPhanThi, v.TenSoVong, htct.TenHinhThuc
  FROM cuocthivannghe cth join diadiem dd JOIN thangdiem td JOIN trangthai tt JOIN vong v
  JOIN hinhthuccuocthi htct
  WHERE dd.MaDiaDiem = cth.MaDiaDiem AND td.MaThangDiem = cth.MaThangDiem AND tt.MaTrangThai = cth.MaTrangThai AND v.SoVongThi = cth.SoVongThi AND htct.MaHinhThucCuocThi = cth.MaHinhThucCuocThi AND cth.MaHinhThucCuocThi = 1
  AND cth.MaCuocThi = ?
  UNION ALL 
  SELECT DISTINCT cth.TenCuocThi, cth.NoiDungCuocThi, cth.SoVongThi, cth.MaHinhThucCuocThi, cth.MaThangDiem, cth.NgayBatDau, cth.NgayKetThuc, cth.MaDiaDiem, cth.MaTrangThai, dd.TenDiaDiem, tt.TenTrangThai, td.TenThangDiem,cth.MaPhanThi, pt.TenPhanThi, v.TenSoVong, htct.TenHinhThuc
  FROM cuocthivannghe cth join diadiem dd JOIN thangdiem td JOIN trangthai tt JOIN phanthi pt JOIN vong v JOIN hinhthuccuocthi htct
  WHERE dd.MaDiaDiem = cth.MaDiaDiem AND td.MaThangDiem = cth.MaThangDiem AND tt.MaTrangThai = cth.MaTrangThai AND pt.MaPhanThi = cth.MaPhanThi AND v.SoVongThi = cth.SoVongThi AND htct.MaHinhThucCuocThi = cth.MaHinhThucCuocThi 
  AND cth.MaHinhThucCuocThi = 2
  AND cth.MaCuocThi = ?`;
  db.query(sqlSelect, [idCuocThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getUpdateThongTinCuocThi = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const idCuocThi = req.params.idCuocThi;
  let TenCuocThi = req.body.TenCuocThi;
  let NoiDungCuocThi = req.body.NoiDungCuocThi;
  let MaHinhThucCuocThi = req.body.MaHinhThucCuocThi;
  let MaPhanThi = req.body.MaPhanThi;
  let SoVongThi = req.body.SoVongThi;
  let MaThangDiem = req.body.ThangDiem;
  let NgayBatDau = req.body.NgayBatDau;
  let NgayKetThuc = req.body.NgayKetThuc;
  let DiaDiemToChuc = req.body.DiaDiemToChuc;
  let TrangThai = req.body.TrangThai;

  db.query(
    `UPDATE cuocthivannghe ct 
    set ct.TenCuocThi = ?, ct.NoiDungCuocThi = ?, ct.MaPhanThi = ?, ct.SoVongThi = ?, ct.MaThangDiem = ?, ct.NgayBatDau = ?, ct.NgayKetThuc = ?, ct.MaDiaDiem = ?, ct.MaTrangThai = ?, ct.MaHinhThucCuocThi = ?
    WHERE ct.MaCuocThi = ?`,
    [
      TenCuocThi,
      NoiDungCuocThi,
      MaPhanThi,
      SoVongThi,
      MaThangDiem,
      NgayBatDau,
      NgayKetThuc,
      DiaDiemToChuc,
      TrangThai,
      MaHinhThucCuocThi,
      idCuocThi,
    ],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thất Bại!";
        res.send(success);
        throw error;
      }
      if (results.affectedRows > 0) {
        if (results.affectedRows > 0) {
          success.isSuccess = true;
          success.message = "Thành Công!";
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      } else {
        success.message = "Thất Bại!";
        success.isSuccess = false;
        res.send(success);
      }
    }
  );
};

const getUpdateCongBoKetQuaThiChuongTrinh = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const idCuocThi = req.params.idCuocThi;
  let CongBoKetQua = req.body.CongBoKetQua;
  db.query(
    `UPDATE chitietcuocthitruyenthong ctth SET ctth.CongBoKetQua = ? WHERE ctth.MaCuocThi = ?`,
    [CongBoKetQua, idCuocThi],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thất Bại!";
        res.send(success);
        throw error;
      }
      if (results.affectedRows > 0) {
        if (results.affectedRows > 0) {
          success.isSuccess = true;
          success.message = "Thành Công!";
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      } else {
        success.message = "Thất Bại!";
        success.isSuccess = false;
        res.send(success);
      }
    }
  );
};

const getUpdateCongBoKetQuaCuocThiTuDo = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const idCuocThi = req.params.idCuocThi;
  let VongThi = req.params.VongThi;
  let CongBoKetQua = req.body.CongBoKetQua;
  db.query(
    `UPDATE chitietcuocthidangkytudo ctct SET ctct.CongBoKetQua = ? WHERE ctct.VongThi = ? AND ctct.MaCuocThi = ?`,
    [CongBoKetQua, VongThi, idCuocThi],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thất Bại!";
        res.send(success);
        throw error;
      }
      if (results.affectedRows > 0) {
        if (results.affectedRows > 0) {
          success.isSuccess = true;
          success.message = "Thành Công!";
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
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
  const idCuocThi = req.params.idCuocThi;
  const VongThi = req.params.VongThi;
  let MaTietMuc = req.body.MaTietMuc;
  let TrangThai = req.body.TrangThai;
  db.query(
    `UPDATE chitietcuocthidangkytudo ctct SET ctct.TrangThai = ? 
    WHERE ctct.MaTietMuc = ? AND ctct.VongThi = ? AND ctct.MaCuocThi = ?`,
    [TrangThai, MaTietMuc, VongThi, idCuocThi],
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
        res.send(success);
      } else {
        success.message = "Thất Bại!";
        success.isSuccess = false;
        res.send(success);
      }
    }
  );
};

const getAddChuongTrinhTruyenThong = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
    idCTH: "",
  };
  let TenCuocThi = req.body.TenCuocThi;
  let NoiDungCuocThi = req.body.NoiDungCuocThi;
  let MaHinhThucCuocThi = 1;
  let SoVongThi = 1;
  let MaThangDiem = req.body.ThangDiem;
  let NgayBatDau = req.body.NgayBatDau;
  let NgayKetThuc = req.body.NgayKetThuc;
  let DiaDiemToChuc = req.body.DiaDiemToChuc;
  let TrangThai = 1;
  db.query(
    "INSERT INTO cuocthivannghe(TenCuocThi,NoiDungCuocThi,MaHinhThucCuocThi,SoVongThi,MaThangDiem,NgayBatDau,NgayKetThuc,MaDiaDiem,MaTrangThai) VALUE (?,?,?,?,?,?,?,?,?)",
    [
      TenCuocThi,
      NoiDungCuocThi,
      MaHinhThucCuocThi,
      SoVongThi,
      MaThangDiem,
      NgayBatDau,
      NgayKetThuc,
      DiaDiemToChuc,
      TrangThai,
    ],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Cuộc Thi Thất Bại!";
        res.send(successAdd);
        throw error;
      }

      if (results.affectedRows > 0) {
        successAdd.isAdd = true;
        successAdd.message = "Thêm Cuộc Thi Thành Công!";
        successAdd.idCTH = results.insertId;
        res.send(successAdd);
      } else {
        successAdd.message = "Thêm Cuộc Thi Thất Bại!";
        successAdd.isAdd = false;
        res.send(successAdd);
      }
    }
  );
};

const getAddDangKyTheLoaiTuDo = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
    idCTH: "",
  };
  let TenCuocThi = req.body.TenCuocThi;
  let NoiDungCuocThi = req.body.NoiDungCuocThi;
  let MaHinhThucCuocThi = 2;
  let MaPhanThi = req.body.MaPhanThi;
  let SoVongThi = req.body.SoVongThi;
  let MaThangDiem = req.body.ThangDiem;
  let NgayBatDau = req.body.NgayBatDau;
  let NgayKetThuc = req.body.NgayKetThuc;
  let DiaDiemToChuc = req.body.DiaDiemToChuc;
  let TrangThai = 1;
  db.query(
    "INSERT INTO cuocthivannghe(TenCuocThi,NoiDungCuocThi,MaHinhThucCuocThi,MaPhanThi,SoVongThi,MaThangDiem,NgayBatDau,NgayKetThuc,MaDiaDiem,MaTrangThai) VALUE (?,?,?,?,?,?,?,?,?,?)",
    [
      TenCuocThi,
      NoiDungCuocThi,
      MaHinhThucCuocThi,
      MaPhanThi,
      SoVongThi,
      MaThangDiem,
      NgayBatDau,
      NgayKetThuc,
      DiaDiemToChuc,
      TrangThai,
    ],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Cuộc Thi Thất Bại!";
        res.send(successAdd);
        throw error;
      }

      if (results.affectedRows > 0) {
        successAdd.isAdd = true;
        successAdd.message = "Thêm Cuộc Thi Thành Công!";
        successAdd.idCTH = results.insertId;
        res.send(successAdd);
      } else {
        successAdd.message = "Thêm Cuộc Thi Thất Bại!";
        successAdd.isAdd = false;
        res.send(successAdd);
      }
    }
  );
};

const getAllMaTietMucCuocThi = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT DISTINCT ctct.MaTietMuc FROM chitietcuocthidangkytudo ctct
  WHERE ctct.MaCuocThi = ?
  UNION ALL
  SELECT DISTINCT ctctr.MaTietMuc FROM chitietcuocthitruyenthong ctth JOIN chitietchuongtrinh ctctr
  WHERE ctth.MaChuongTrinh = ctctr.MaChuongTrinh
  AND ctth.MaCuocThi = ?`;
  db.query(sqlSelect, [idCuocThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAddGiamKhaoCuocThi = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  let idCuocThi = req.params.idCuocThi;
  let arrMaGiamKhao = req.body.arrMaGiamKhao;
  let arrMaTietMuc = req.body.arrMaTietMuc;
  let array = [];
  for (let i = 0; i < arrMaGiamKhao.length; i++) {
    let arr = [];
    arr.push(idCuocThi);
    arr.push(arrMaGiamKhao[i]);
    array.push(arr);
  }
  let arrayDiem = [];
  for (let n = 0; n < arrMaTietMuc.length; n++) {
    for (let i = 0; i < arrMaGiamKhao.length; i++) {
      let arr = [];
      arr.push(idCuocThi);
      arr.push(arrMaGiamKhao[i]);
      arr.push(arrMaTietMuc[n]);
      arrayDiem.push(arr);
    }
  }

  db.query(
    "INSERT INTO giamkhaocuocthi(MaCuocThi,MaGiamKhao) VALUE ?",
    [array],
    function (error, results, fields) {
      if (error) {
        successAdd.message = "Thất bại";
        res.send(successAdd);
      } else {
        if (results.affectedRows > 0) {
          db.query(
            "INSERT INTO diem(MaCuocThi,MaGiamKhao,MaTietMuc) VALUE ?",
            [arrayDiem],
            function (error, results, fields) {
              if (error) {
                successAdd.message = "Thất bại";
                res.send(successAdd);
              } else {
                if (results.affectedRows > 0) {
                  successAdd.message = "Thêm Thành Công";
                  successAdd.isAdd = true;
                  res.send(successAdd);
                }
              }
            }
          );
        }
      }
    }
  );
};

const getAllThiSinhDauVongTruoc = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ts.MaThiSinh) stt 
  FROM thisinh ts JOIN thisinhtrinhbaytietmuc cttm JOIN chitietcuocthidangkytudo ctct JOIN donvitochuc dv
  WHERE ts.MaThiSinh = cttm.MaThiSinh AND ctct.MaTietMuc = cttm.MaTietMuc AND ts.MaDonVi = dv.MaDonVi AND trangthai = 1 
  AND ctct.VongThi = ? AND ctct.MaCuocThi = ?`;
  db.query(sqlSelect, [idVongThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllDoanDoiDauVongTruoc = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const idVongThi = req.params.idVongThi;
  const NhanSoToiThieu = req.params.nhanSoToiThieu;
  const sqlSelect = `SELECT dd.MaDoanDoi, ROW_NUMBER() OVER (ORDER BY dd.MaDoanDoi DESC) stt, dd.TenDoanDoi, ts.TenThiSinh as TenNhomTruong, ts.Email, ts.Phone, dd.SoLuongThanhVien, dv.TenDonVi
  FROM doandoi dd JOIN doandoitrinhbaytietmuc cttm JOIN chitietcuocthidangkytudo ctct JOIN donvitochuc dv JOIN thisinh ts
  WHERE dd.MaDoanDoi = cttm.MaDoanDoi AND ctct.MaTietMuc = cttm.MaTietMuc AND dv.MaDonVi = dd.MaDonVi 
  AND ts.MaThiSinh = dd.MaThiSinh AND ctct.TrangThai = 1  
  AND ctct.VongThi = ? AND ctct.MaCuocThi = ? AND dd.SoLuongThanhVien >= ?`;
  db.query(sqlSelect, [idVongThi, idCuocThi, NhanSoToiThieu], (err, result) => {
    res.send(result);
  });
};

const getAllDoanDoiCoNhanSoToiThieu = async (req, res) => {
  const NhanSoToiThieu = req.params.nhanSoToiThieu;
  const sqlSelect = `SELECT dd.MaDoanDoi, ROW_NUMBER() OVER (ORDER BY dd.MaDoanDoi DESC) stt, dd.TenDoanDoi, ts.TenThiSinh as TenNhomTruong, ts.Email, ts.Phone, dd.SoLuongThanhVien, dv.TenDonVi
  FROM doandoi dd join thisinh ts join donvitochuc dv 
  WHERE dd.MaDonVi = dv.MaDonVi and ts.MaThiSinh = dd.MaThiSinh AND dd.SoLuongThanhVien >= ?`;
  db.query(sqlSelect, NhanSoToiThieu, (err, result) => {
    res.send(result);
  });
};

const getAllDoanDoiPhuHopTietMucNhanSoCoDinh = async (req, res) => {
  const NhanSoToiThieu = req.params.nhanSoToiThieu;
  const sqlSelect = `SELECT dd.MaDoanDoi, ROW_NUMBER() OVER (ORDER BY dd.MaDoanDoi DESC) stt, dd.TenDoanDoi, ts.TenThiSinh as TenNhomTruong, ts.Email, ts.Phone, dd.SoLuongThanhVien, dv.TenDonVi
  FROM doandoi dd join thisinh ts join donvitochuc dv 
  WHERE dd.MaDonVi = dv.MaDonVi and ts.MaThiSinh = dd.MaThiSinh AND dd.SoLuongThanhVien = ?`;
  db.query(sqlSelect, NhanSoToiThieu, (err, result) => {
    res.send(result);
  });
};

const getAddChuongTrinhDuThi = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
    idCTR: "",
  };
  let idCuocThi = req.params.idCuocThi;
  let TenChuongTrinh = req.body.TenChuongTrinh;
  let DiaDiemToChuc = req.body.DiaDiemToChuc;
  let DonViToChuc = req.body.DonViToChuc;
  let NgayGioToChuc = req.body.NgayGioToChuc;
  let NoiDungChuongTrinh = req.body.NoiDungChuongTrinh;
  let MaTruongDonVi = req.body.MaTruongDonVi;
  let TrangThai = 1;
  let MaDoanDoi = req.body.MaDoanDoi;
  db.query(
    "INSERT INTO chuongtrinhvannghe(TenChuongTrinh,NoiDungChuongTrinh,NgayGioToChuc,MaDiaDiem,MaDonVi,MaTrangThai, MaTruongDonVi, MaDoanDoi) VALUE (?,?,?,?,?,?,?,?)",
    [
      TenChuongTrinh,
      NoiDungChuongTrinh,
      NgayGioToChuc,
      DiaDiemToChuc,
      DonViToChuc,
      TrangThai,
      MaTruongDonVi,
      MaDoanDoi
    ],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Thất Bại!";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          const idChuongTrinh = results.insertId;
          successAdd.idCTR = results.insertId;
          db.query(
            "INSERT INTO chitietcuocthitruyenthong(MaCuocThi, MaChuongTrinh) VALUE (?,?)",
            [idCuocThi, idChuongTrinh],
            function (error, results, fields) {
              if (error) {
                successAdd.isAdd = false;
                successAdd.message = "Thêm Thất Bại!";
                res.send(successAdd);
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  successAdd.isAdd = true;
                  successAdd.message = "Thêm Thành Công!";
                  res.send(successAdd);
                } else {
                  successAdd.message = "Thêm Thất Bại!";
                  successAdd.isAdd = false;
                  res.send(successAdd);
                }
              }
            }
          );
        } else {
          successAdd.message = "Thêm Thất Bại!";
          successAdd.isAdd = false;
          res.send(successAdd);
        }
      }
    }
  );
};

const getAddTietMucCaNhanKhongGiamKhao = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  let idCuocThi = req.params.idCuocThi;
  let idVongThi = req.params.idVongThi;
  let TenTietMuc = req.body.TenTietMuc;
  let MaLoaiTietMuc = req.body.MaLoaiTietMuc;
  let NhanSo = req.body.NhanSo;
  let NgayGioThucHien = req.body.NgayGioThucHien;
  let NoiDungTietMuc = req.body.NoiDungTietMuc;
  let MaThiSinh = req.body.MaThiSinh;
  db.query(
    "INSERT INTO tietmucvannghe(TenTietMuc,NoiDungTietMuc,NgayGioThucHien,NhanSo,MaLoaiTietMuc) VALUE (?,?,?,?,?)",
    [TenTietMuc, NoiDungTietMuc, NgayGioThucHien, NhanSo, MaLoaiTietMuc],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Thất Bại!";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          const idTietMuc = results.insertId;
          db.query(
            "INSERT INTO thisinhtrinhbaytietmuc(MaTietMuc, MaThiSinh) VALUE (?,?)",
            [idTietMuc, MaThiSinh],
            function (error, results, fields) {
              if (error) {
                successAdd.isAdd = false;
                successAdd.message = "Thêm Thất Bại!";
                res.send(successAdd);
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  db.query(
                    "INSERT INTO chitietcuocthidangkytudo(MaCuocThi,MaTietMuc,VongThi) VALUE (?,?,?)",
                    [idCuocThi, idTietMuc, idVongThi],
                    function (error, results, fields) {
                      if (error) {
                        successAdd.isAdd = false;
                        successAdd.message = "Thêm Thất Bại!";
                        res.send(successAdd);
                        throw error;
                      } else {
                        if (results.affectedRows > 0) {
                          successAdd.message = "Thêm Thành Công!";
                          successAdd.isAdd = true;
                          res.send(successAdd);
                        } else {
                          successAdd.message = "Thêm Thất Bại!";
                          successAdd.isAdd = false;
                          res.send(successAdd);
                        }
                      }
                    }
                  );
                } else {
                  successAdd.message = "Thêm Thất Bại!";
                  successAdd.isAdd = false;
                  res.send(successAdd);
                }
              }
            }
          );
        } else {
          successAdd.message = "Thêm Thất Bại!";
          successAdd.isAdd = false;
          res.send(successAdd);
        }
      }
    }
  );
};

const getAddTietMucCaNhan = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  let idCuocThi = req.params.idCuocThi;
  let idVongThi = req.params.idVongThi;
  let TenTietMuc = req.body.TenTietMuc;
  let MaLoaiTietMuc = req.body.MaLoaiTietMuc;
  let NhanSo = req.body.NhanSo;
  let NgayGioThucHien = req.body.NgayGioThucHien;
  let NoiDungTietMuc = req.body.NoiDungTietMuc;
  let MaThiSinh = req.body.MaThiSinh;
  let arrMaGiamKhao = req.body.arrMaGiamKhao;
  let arrDiem = [];
  db.query(
    "INSERT INTO tietmucvannghe(TenTietMuc,NoiDungTietMuc,NgayGioThucHien,NhanSo,MaLoaiTietMuc) VALUE (?,?,?,?,?)",
    [TenTietMuc, NoiDungTietMuc, NgayGioThucHien, NhanSo, MaLoaiTietMuc],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Thất Bại!";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          const idTietMuc = results.insertId;
          for (let i = 0; i < arrMaGiamKhao.length; i++) {
            let arr = [];
            arr.push(idCuocThi);
            arr.push(arrMaGiamKhao[i].MaGiamKhao);
            arr.push(idTietMuc);
            arrDiem.push(arr);
          }
          db.query(
            "INSERT INTO thisinhtrinhbaytietmuc(MaTietMuc, MaThiSinh) VALUE (?,?)",
            [idTietMuc, MaThiSinh],
            function (error, results, fields) {
              if (error) {
                successAdd.isAdd = false;
                successAdd.message = "Thêm Thất Bại!";
                res.send(successAdd);
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  db.query(
                    "INSERT INTO chitietcuocthidangkytudo(MaCuocThi,MaTietMuc,VongThi) VALUE (?,?,?)",
                    [idCuocThi, idTietMuc, idVongThi],
                    function (error, results, fields) {
                      if (error) {
                        successAdd.isAdd = false;
                        successAdd.message = "Thêm Thất Bại!";
                        res.send(successAdd);
                        throw error;
                      } else {
                        if (results.affectedRows > 0) {
                          db.query(
                            "INSERT INTO diem(MaCuocThi,MaGiamKhao,MaTietMuc) VALUE ?",
                            [arrDiem],
                            function (error, results, fields) {
                              if (error) {
                                successAdd.isAdd = false;
                                successAdd.message = "Thêm Thất Bại!";
                                res.send(successAdd);
                                throw error;
                              } else {
                                if (results.affectedRows > 0) {
                                  successAdd.message = "Thêm Thành Công!";
                                  successAdd.isAdd = true;
                                  res.send(successAdd);
                                } else {
                                  successAdd.message = "Thêm Thất Bại!";
                                  successAdd.isAdd = false;
                                  res.send(successAdd);
                                }
                              }
                            }
                          );
                        } else {
                          successAdd.message = "Thêm Thất Bại!";
                          successAdd.isAdd = false;
                          res.send(successAdd);
                        }
                      }
                    }
                  );
                } else {
                  successAdd.message = "Thêm Thất Bại!";
                  successAdd.isAdd = false;
                  res.send(successAdd);
                }
              }
            }
          );
        } else {
          successAdd.message = "Thêm Thất Bại!";
          successAdd.isAdd = false;
          res.send(successAdd);
        }
      }
    }
  );
};

const getAddTietMucDoiNhomKhongGiamKhao = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  let idCuocThi = req.params.idCuocThi;
  let idVongThi = req.params.idVongThi;
  let TenTietMuc = req.body.TenTietMuc;
  let MaLoaiTietMuc = req.body.MaLoaiTietMuc;
  let NhanSo = req.body.NhanSo;
  let NgayGioThucHien = req.body.NgayGioThucHien;
  let NoiDungTietMuc = req.body.NoiDungTietMuc;
  let MaDoanDoi = req.body.MaDoanDoi;
  db.query(
    "INSERT INTO tietmucvannghe(TenTietMuc,NoiDungTietMuc,NgayGioThucHien,NhanSo,MaLoaiTietMuc) VALUE (?,?,?,?,?)",
    [TenTietMuc, NoiDungTietMuc, NgayGioThucHien, NhanSo, MaLoaiTietMuc],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Thất Bại!";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          const idTietMuc = results.insertId;
          db.query(
            "INSERT INTO doandoitrinhbaytietmuc(MaTietMuc, MaDoanDoi) VALUE (?,?)",
            [idTietMuc, MaDoanDoi],
            function (error, results, fields) {
              if (error) {
                successAdd.isAdd = false;
                successAdd.message = "Thêm Thất Bại!";
                res.send(successAdd);
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  db.query(
                    "INSERT INTO chitietcuocthidangkytudo(MaCuocThi,MaTietMuc,VongThi) VALUE (?,?,?)",
                    [idCuocThi, idTietMuc, idVongThi],
                    function (error, results, fields) {
                      if (error) {
                        successAdd.isAdd = false;
                        successAdd.message = "Thêm Thất Bại!";
                        res.send(successAdd);
                        throw error;
                      } else {
                        if (results.affectedRows > 0) {
                          successAdd.message = "Thêm Thành Công!";
                          successAdd.isAdd = true;
                          res.send(successAdd);
                        } else {
                          successAdd.message = "Thêm Thất Bại!";
                          successAdd.isAdd = false;
                          res.send(successAdd);
                        }
                      }
                    }
                  );
                } else {
                  successAdd.message = "Thêm Thất Bại!";
                  successAdd.isAdd = false;
                  res.send(successAdd);
                }
              }
            }
          );
        } else {
          successAdd.message = "Thêm Thất Bại!";
          successAdd.isAdd = false;
          res.send(successAdd);
        }
      }
    }
  );
};

const getAddTietMucDoiNhom = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  let idCuocThi = req.params.idCuocThi;
  let idVongThi = req.params.idVongThi;
  let TenTietMuc = req.body.TenTietMuc;
  let MaLoaiTietMuc = req.body.MaLoaiTietMuc;
  let NhanSo = req.body.NhanSo;
  let NgayGioThucHien = req.body.NgayGioThucHien;
  let NoiDungTietMuc = req.body.NoiDungTietMuc;
  let MaDoanDoi = req.body.MaDoanDoi;
  let arrMaGiamKhao = req.body.arrMaGiamKhao;
  let arrDiem = [];
  db.query(
    "INSERT INTO tietmucvannghe(TenTietMuc,NoiDungTietMuc,NgayGioThucHien,NhanSo,MaLoaiTietMuc) VALUE (?,?,?,?,?)",
    [TenTietMuc, NoiDungTietMuc, NgayGioThucHien, NhanSo, MaLoaiTietMuc],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Thất Bại!";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          const idTietMuc = results.insertId;
          for (let i = 0; i < arrMaGiamKhao.length; i++) {
            let arr = [];
            arr.push(idCuocThi);
            arr.push(arrMaGiamKhao[i].MaGiamKhao);
            arr.push(idTietMuc);
            arrDiem.push(arr);
          }
          db.query(
            "INSERT INTO doandoitrinhbaytietmuc(MaTietMuc, MaDoanDoi) VALUE (?,?)",
            [idTietMuc, MaDoanDoi],
            function (error, results, fields) {
              if (error) {
                successAdd.isAdd = false;
                successAdd.message = "Thêm Thất Bại!";
                res.send(successAdd);
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  db.query(
                    "INSERT INTO chitietcuocthidangkytudo(MaCuocThi,MaTietMuc,VongThi) VALUE (?,?,?)",
                    [idCuocThi, idTietMuc, idVongThi],
                    function (error, results, fields) {
                      if (error) {
                        successAdd.isAdd = false;
                        successAdd.message = "Thêm Thất Bại!";
                        res.send(successAdd);
                        throw error;
                      } else {
                        if (results.affectedRows > 0) {
                          db.query(
                            "INSERT INTO diem(MaCuocThi,MaGiamKhao,MaTietMuc) VALUE ?",
                            [arrDiem],
                            function (error, results, fields) {
                              if (error) {
                                successAdd.isAdd = false;
                                successAdd.message = "Thêm Thất Bại!";
                                res.send(successAdd);
                                throw error;
                              } else {
                                if (results.affectedRows > 0) {
                                  successAdd.message = "Thêm Thành Công!";
                                  successAdd.isAdd = true;
                                  res.send(successAdd);
                                } else {
                                  successAdd.message = "Thêm Thất Bại!";
                                  successAdd.isAdd = false;
                                  res.send(successAdd);
                                }
                              }
                            }
                          );
                        } else {
                          successAdd.message = "Thêm Thất Bại!";
                          successAdd.isAdd = false;
                          res.send(successAdd);
                        }
                      }
                    }
                  );
                } else {
                  successAdd.message = "Thêm Thất Bại!";
                  successAdd.isAdd = false;
                  res.send(successAdd);
                }
              }
            }
          );
        } else {
          successAdd.message = "Thêm Thất Bại!";
          successAdd.isAdd = false;
          res.send(successAdd);
        }
      }
    }
  );
};

const getAllThiSinhTrinhBayTietMucChuongTrinh = async (req, res) => {
  const idTietMuc = req.params.idTietMuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ts.MaThiSinh) stt, ts.MaThiSinh, ts.TenThiSinh, ts.MaDinhDanh, ts.GioiTinh, ts.Email, ts.Phone, ts.MaLop, dv.TenDonVi 
  FROM tietmucvannghe tm JOIN thisinhtrinhbaytietmuc cttm JOIN thisinh ts JOIN donvitochuc dv
  WHERE cttm.MaTietMuc = tm.MaTietMuc AND ts.MaThiSinh = cttm.MaThiSinh AND ts.MaDonVi = dv.MaDonVi
  AND tm.MaTietMuc = ?`;
  db.query(sqlSelect, idTietMuc, (err, result) => {
    res.send(result);
  });
};

const getAllThiSinhTrinhBayTietMuc = async (req, res) => {
  const idTietMuc = req.params.idTietMuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ts.MaThiSinh) stt, ts.MaThiSinh, ts.TenThiSinh, ts.MaDinhDanh, ts.GioiTinh, ts.Email, ts.Phone, ts.MaLop, dv.TenDonVi 
  FROM tietmucvannghe tm JOIN thisinhtrinhbaytietmuc cttm JOIN thisinh ts JOIN donvitochuc dv JOIN nguoidung nd
  WHERE cttm.MaTietMuc = tm.MaTietMuc AND ts.MaThiSinh = cttm.MaThiSinh AND ts.MaDonVi = dv.MaDonVi AND ts.MaNguoiDung = nd.MaNguoiDung
  AND tm.MaTietMuc = ?`;
  db.query(sqlSelect, idTietMuc, (err, result) => {
    res.send(result);
  });
};

const getAllDoiNhomTrinhBayTietMuc = async (req, res) => {
  const idTietMuc = req.params.idTietMuc;
  const sqlSelect = `SELECT dd.MaDoanDoi, dd.TenDoanDoi, ts.TenThiSinh, ts.Email, ts.Phone, dv.TenDonVi 
  FROM tietmucvannghe tm JOIN doandoitrinhbaytietmuc cttm JOIN doandoi dd JOIN thisinh ts JOIN donvitochuc dv
  WHERE cttm.MaTietMuc = tm.MaTietMuc AND cttm.MaDoanDoi = dd.MaDoanDoi AND ts.MaThiSinh = dd.MaThiSinh AND dv.MaDonVi = dd.MaDonVi 
  AND tm.MaTietMuc = ?`;
  db.query(sqlSelect, idTietMuc, (err, result) => {
    res.send(result);
  });
};

const getAllDoiNhomKhongTrinhBayNhanSoTietMucCoDinh = async (req, res) => {
  const idDoiNhom = req.params.idDoanDoi;
  const nhanSo = req.params.nhanSo;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY dd.MaDoanDoi) stt FROM doandoi dd JOIN thisinh ts JOIN donvitochuc dv
  WHERE ts.MaThiSinh = dd.MaThiSinh AND dd.MaDonVi = dv.MaDonVi AND dd.MaDoanDoi NOT IN (?) AND dd.SoLuongThanhVien = ?`;
  db.query(sqlSelect, [idDoiNhom, nhanSo], (err, result) => {
    res.send(result);
  });
};
const getAllDoiNhomKhongTrinhBayNhanSoTietMucKhongCoDinh = async (req, res) => {
  const idDoiNhom = req.params.idDoanDoi;
  const nhanSo = req.params.nhanSo;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY dd.MaDoanDoi) stt FROM doandoi dd JOIN thisinh ts JOIN donvitochuc dv
  WHERE ts.MaThiSinh = dd.MaThiSinh AND dd.MaDonVi = dv.MaDonVi AND dd.MaDoanDoi NOT IN (?) AND dd.SoLuongThanhVien >= ?`;
  db.query(sqlSelect, [idDoiNhom, nhanSo], (err, result) => {
    res.send(result);
  });
};

const getAllThiSinhChuongTrinhKhongTrinhBay = async (req, res) => {
  const idChuongTrinh = req.params.idChuongTrinh;
  const idTietMuc = req.params.idTietMuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tsct.MaThiSinh) stt FROM (SELECT tsdd.MaThiSinh FROM chuongtrinhvannghe ctr JOIN thisinh ts JOIN doandoi dd JOIN thisinhthuocdoandoi tsdd
    WHERE ts.MaThiSinh = ctr.MaTruongDonVi AND ctr.MaTruongDonVi = dd.MaThiSinh AND dd.MaDoanDoi = tsdd.MaDoanDoi AND dd.MaDoanDoi = ctr.MaDoanDoi
    AND ctr.MaChuongTrinh = ?) tsct JOIN thisinh ts
    WHERE tsct.MaThiSinh = ts.MaThiSinh 
    AND tsct.MaThiSinh NOT IN 
    (SELECT ts.MaThiSinh
    FROM tietmucvannghe tm JOIN thisinhtrinhbaytietmuc cttm JOIN thisinh ts
    WHERE cttm.MaTietMuc = tm.MaTietMuc AND ts.MaThiSinh = cttm.MaThiSinh AND tm.MaTietMuc = ?)`;
  db.query(sqlSelect, [idChuongTrinh, idTietMuc], (err, result) => {
    res.send(result);
  });
};

const getAddThanhVienBoSungTrinhBayTietMuc = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };

  const idTietMuc = req.params.idTietMuc;
  const arrMaThiSinh = req.body.arrMaThiSinh;
  let array = [];

  for (let i = 0; i < arrMaThiSinh.length; i++) {
    let arr = [];
    arr.push(idTietMuc);
    arr.push(arrMaThiSinh[i]);
    array.push(arr);
  }

  db.query(
    "INSERT INTO thisinhtrinhbaytietmuc(MaTietMuc,MaThiSinh) VALUE ?",
    [array],
    function (error, results, fields) {
      if (error) {
        success.message = "Thất bại";
        res.send(success);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          db.query(
            "UPDATE tietmucvannghe tm SET tm.NhanSo = tm.NhanSo + ? WHERE tm.MaTietMuc = ?",
            [arrMaThiSinh.length, idTietMuc],
            function (error, results, fields) {
              if (error) {
                success.message = "Thất bại";
                res.send(success);
              } else {
                if (results.affectedRows > 0) {
                  success.isSuccess = true;
                  success.message = "Thành Công!";
                  res.send(success);
                } else {
                  success.message = "Thất Bại!";
                  success.isSuccess = false;
                  res.send(success);
                }
              }
            }
          );
        }
      }
    }
  );
};

const getDeleteThanhVienTrinhBayTietMuc = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };

  const idTietMuc = req.params.idTietMuc;
  let idThiSinh = req.body.MaThiSinh;

  db.query(
    "DELETE FROM thisinhtrinhbaytietmuc WHERE MaThiSinh = ? AND MaTietMuc = ?",
    [idThiSinh, idTietMuc],
    function (error, results, fields) {
      if (error) {
        success.message = "Thất bại";
        res.send(success);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          db.query(
            "UPDATE tietmucvannghe tm SET tm.NhanSo =  tm.NhanSo - 1 WHERE tm.MaTietMuc = ?",
            [idTietMuc],
            function (error, results, fields) {
              if (error) {
                success.message = "Thất bại";
                res.send(success);
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  success.isSuccess = true;
                  success.message = "Thành Công!";
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
    }
  );
};

const getAllThiSinhKhongTrinhBayTietMucCaNhan = async (req, res) => {
  const idThiSinh = req.params.idThiSinh;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ts.MaThiSinh) stt  
  FROM thisinh ts JOIN donvitochuc dv JOIN nguoidung nd
  WHERE ts.MaDonVi = dv.MaDonVi AND nd.MaNguoiDung = ts.MaNguoiDung 
  AND ts.MaThiSinh NOT IN(?)`;
  db.query(sqlSelect, idThiSinh, (err, result) => {
    res.send(result);
  });
};

const getUpdateThiSinhTrinhBay = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  let MaTietMuc = req.body.MaTietMuc;
  let MaThiSinh = req.body.MaThiSinh;
  db.query(
    `UPDATE thisinhtrinhbaytietmuc tstm set tstm.MaThiSinh = ?  WHERE tstm.MaTietMuc = ?`,
    [MaThiSinh, MaTietMuc],
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
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

const getUpdateTietMuc = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  let idTietMuc = req.params.idTietMuc;
  let TenTietMuc = req.body.TenTietMuc;
  let MaLoaiTietMuc = req.body.MaLoaiTietMuc;
  let NhanSo = req.body.NhanSo;
  let NgayGioThucHien = req.body.NgayGioThucHien;
  let NoiDungTietMuc = req.body.NoiDungTietMuc;
  let MaGiaiThuong = req.body.MaGiaiThuong;
  db.query(
    "UPDATE tietmucvannghe tm SET tm.TenTietMuc = ?, tm.NoiDungTietMuc= ?, tm.NgayGioThucHien = ?, tm.NhanSo = ?, tm.MaLoaiTietMuc = ? WHERE tm.MaTietMuc = ?",
    [
      TenTietMuc,
      NoiDungTietMuc,
      NgayGioThucHien,
      NhanSo,
      MaLoaiTietMuc,
      idTietMuc,
    ],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thất Bại!";
        res.send(success);
        throw error;
      } else {
        db.query(
          "UPDATE chitietcuocthidangkytudo ctct set ctct.MaGiaiThuong = ? WHERE ctct.MaTietMuc = ?",
          [MaGiaiThuong, idTietMuc],
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
                res.send(success);
              } else {
                success.message = "Thất Bại!";
                success.isSuccess = false;
                res.send(success);
              }
            }
          }
        );
      }
    }
  );
};

const getChangeDoanDoiTrinhBay = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  let MaTietMuc = req.body.MaTietMuc;
  let MaDoanDoi = req.body.MaDoanDoi;
  let NhanSo = req.body.NhanSo;
  db.query(
    `UPDATE doandoitrinhbaytietmuc ddtm SET ddtm.MaDoanDoi = ? WHERE ddtm.MaTietMuc = ?`,
    [MaDoanDoi, MaTietMuc],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thất Bại!";
        res.send(success);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          db.query(
            `UPDATE tietmucvannghe tm SET tm.NhanSo = ? WHERE tm.MaTietMuc = ?`,
            [NhanSo, MaTietMuc],
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
    }
  );
};

////////////////////////////////////////////////////////////////////////
////Action Địa Điểm
////////////////////////////////////////////////////////////////////////
const getAllDiaDiem = async (req, res) => {
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY dd.MaDiaDiem DESC) stt from diadiem dd`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAddDiaDiem = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  let TenDiaDiem = req.body.TenDiaDiem;
  db.query(
    `INSERT INTO diadiem(TenDiaDiem) VALUE (?)`,
    [TenDiaDiem],
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
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

const getUpdateDiaDiem = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const MaDiaDiem = req.params.MaDiaDiem;
  let TenDiaDiem = req.body.TenDiaDiem;
  db.query(
    `UPDATE diadiem dd SET dd.TenDiaDiem = ? WHERE dd.MaDiaDiem = ?`,
    [TenDiaDiem, MaDiaDiem],
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
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

const getDeleteDiaDiem = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const MaDiaDiem = req.params.MaDiaDiem;
  db.query(
    `DELETE FROM diadiem WHERE MaDiaDiem = ?`,
    [MaDiaDiem],
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
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

////////////////////////////////////////////////////////////////////////
////Action Đơn Vị Tổ Chức
////////////////////////////////////////////////////////////////////////
const getAllDonViToChuc = async (req, res) => {
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY dv.MaDonVi DESC) stt from donvitochuc dv`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAddDonViToChuc = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  let TenDonVi = req.body.TenDonVi;
  db.query(
    `INSERT INTO donvitochuc(TenDonVi) VALUE (?)`,
    [TenDonVi],
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
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

const getUpdateDonViToChuc = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const MaDonVi = req.params.MaDonVi;
  let TenDonVi = req.body.TenDonVi;
  db.query(
    `UPDATE donvitochuc dv SET dv.TenDonVi = ? WHERE dv.MaDonVi = ?`,
    [TenDonVi, MaDonVi],
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
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

const getDeleteDonViToChuc = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const MaDonVi = req.params.MaDonVi;
  db.query(
    `DELETE FROM donvitochuc WHERE MaDonVi = ?`,
    [MaDonVi],
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
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

////////////////////////////////////////////////////////////////////////
////Action Giải Thương
////////////////////////////////////////////////////////////////////////
const getAllGiaiThuong = async (req, res) => {
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY gt.MaGiaiThuong DESC) stt from giaithuong gt`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAddGiaiThuong = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  let TenGiaiThuong = req.body.TenGiaiThuong;
  db.query(
    `INSERT INTO giaithuong(TenGiaiThuong) VALUE (?)`,
    [TenGiaiThuong],
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
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

const getUpdateGiaiThuong = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const MaGiaiThuong = req.params.MaGiaiThuong;
  let TenGiaiThuong = req.body.TenGiaiThuong;
  db.query(
    `UPDATE giaithuong gt SET gt.TenGiaiThuong = ? WHERE gt.MaGiaiThuong = ?`,
    [TenGiaiThuong, MaGiaiThuong],
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
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

const getDeleteGiaiThuong = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const MaGiaiThuong = req.params.MaGiaiThuong;
  db.query(
    `DELETE FROM giaithuong WHERE MaGiaiThuong = ?`,
    [MaGiaiThuong],
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
          res.send(success);
        } else {
          success.message = "Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

////////////////////////////////////////////////////////////////////////
////Action Trạng Thái
////////////////////////////////////////////////////////////////////////
const getAllTrangThai = async (req, res) => {
  const sqlSelect = `SELECT * from trangthai`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

////////////////////////////////////////////////////////////////////////
////Action Tiết Mục Văn Nghệ
////////////////////////////////////////////////////////////////////////
const getAllLoaiTietMuc = async (req, res) => {
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ltm.MaPhanThi, ltm.NhanSoToiThieu, ltm.TenLoaiTietMuc) stt from loaitietmuc ltm`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllLoaiTietMucPhuHop = async (req, res) => {
  const NhanSo = req.params.NhanSo;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ltm.MaPhanThi, ltm.NhanSoToiThieu, ltm.TenLoaiTietMuc) stt 
  FROM loaitietmuc ltm
  WHERE ltm.NhanSoToiThieu <= ? AND ltm.CoDinh = 0
  UNION ALL
  SELECT *, ROW_NUMBER() OVER (ORDER BY ltm.MaPhanThi, ltm.NhanSoToiThieu, ltm.TenLoaiTietMuc) stt 
  FROM loaitietmuc ltm
  WHERE ltm.NhanSoToiThieu = ? AND ltm.CoDinh = 1`;
  db.query(sqlSelect, [NhanSo, NhanSo], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChuongTrinhVanNghe = async (req, res) => {
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, tm.MaTietMuc, ctr.TenChuongTrinh, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, tm.NhanSo
  FROM tietmucvannghe tm JOIN chuongtrinhvannghe ctr JOIN loaitietmuc ltm JOIN chitietchuongtrinh ctctr
  WHERE ctctr.MaChuongTrinh = ctr.MaChuongTrinh 
  AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND ctctr.MaTietMuc = tm.MaTietMuc`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChuongTrinhDuThi = async (req, res) => {
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, ctr.TenChuongTrinh,ctr.MaChuongTrinh, ctvn.TenCuocThi, ct.MaGiaiThuong, ctr.NgayGioToChuc, tm.NhanSo, ctvn.MaCuocThi, 0 AS SapLich, ctvn.MaTrangThai
  FROM tietmucvannghe tm JOIN cuocthivannghe ctvn JOIN chitietcuocthitruyenthong ct
  JOIN chuongtrinhvannghe ctr JOIN loaitietmuc ltm JOIN chitietchuongtrinh ctctr JOIN diadiem dd
  WHERE ct.MaCuocThi = ctvn.MaCuocThi AND ct.MaChuongTrinh = ctr.MaChuongTrinh AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh
  AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND ctctr.MaTietMuc = tm.MaTietMuc AND dd.MaDiaDiem = ctr.MaDiaDiem`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChuongTrinhDuThiTheoNgay = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, ctr.TenChuongTrinh,ctr.MaChuongTrinh, ctvn.TenCuocThi, ct.MaGiaiThuong, ctr.NgayGioToChuc, tm.NhanSo, ctvn.MaCuocThi, 0 AS SapLich, ctvn.MaTrangThai
  FROM tietmucvannghe tm JOIN cuocthivannghe ctvn JOIN chitietcuocthitruyenthong ct
  JOIN chuongtrinhvannghe ctr JOIN loaitietmuc ltm JOIN chitietchuongtrinh ctctr JOIN diadiem dd
  WHERE ct.MaCuocThi = ctvn.MaCuocThi AND ct.MaChuongTrinh = ctr.MaChuongTrinh AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh
  AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND ctctr.MaTietMuc = tm.MaTietMuc AND dd.MaDiaDiem = ctr.MaDiaDiem
  AND DATE_FORMAT(ctr.NgayGioToChuc, '%Y-%m-%d') >= ? AND DATE_FORMAT(ctr.NgayGioToChuc, '%Y-%m-%d') <= ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChuongTrinhDuThiTheoThang = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, ctr.TenChuongTrinh,ctr.MaChuongTrinh, ctvn.TenCuocThi, ct.MaGiaiThuong, ctr.NgayGioToChuc, tm.NhanSo, ctvn.MaCuocThi, 0 AS SapLich, ctvn.MaTrangThai
  FROM tietmucvannghe tm JOIN cuocthivannghe ctvn JOIN chitietcuocthitruyenthong ct
  JOIN chuongtrinhvannghe ctr JOIN loaitietmuc ltm JOIN chitietchuongtrinh ctctr JOIN diadiem dd
  WHERE ct.MaCuocThi = ctvn.MaCuocThi AND ct.MaChuongTrinh = ctr.MaChuongTrinh AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh
  AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND ctctr.MaTietMuc = tm.MaTietMuc AND dd.MaDiaDiem = ctr.MaDiaDiem
  AND DATE_FORMAT(ctr.NgayGioToChuc, '%Y-%m') >= ? AND DATE_FORMAT(ctr.NgayGioToChuc, '%Y-%m') <= ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucChuongTrinhDuThiTheoNam = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY ctr.NgayGioToChuc DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, ctr.TenChuongTrinh,ctr.MaChuongTrinh, ctvn.TenCuocThi, ct.MaGiaiThuong, ctr.NgayGioToChuc, tm.NhanSo, ctvn.MaCuocThi, 0 AS SapLich, ctvn.MaTrangThai
  FROM tietmucvannghe tm JOIN cuocthivannghe ctvn JOIN chitietcuocthitruyenthong ct
  JOIN chuongtrinhvannghe ctr JOIN loaitietmuc ltm JOIN chitietchuongtrinh ctctr JOIN diadiem dd
  WHERE ct.MaCuocThi = ctvn.MaCuocThi AND ct.MaChuongTrinh = ctr.MaChuongTrinh AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh
  AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND ctctr.MaTietMuc = tm.MaTietMuc AND dd.MaDiaDiem = ctr.MaDiaDiem
  AND DATE_FORMAT(ctr.NgayGioToChuc, '%Y') >= ? AND DATE_FORMAT(ctr.NgayGioToChuc, '%Y') <= ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucDoiNhom = async (req, res) => {
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ct.TrangThai, ct.DiemTrungBinh, ctvn.MaTrangThai,
  ct.MaGiaiThuong, ctvn.TenCuocThi, dd.TenDoanDoi, ct.VongThi, ctvn.MaCuocThi, ctvn.SoVongThi, gt.TenGiaiThuong, 0 AS SapLich
    FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ct JOIN loaitietmuc ltm 
    JOIN cuocthivannghe ctvn JOIN doandoitrinhbaytietmuc cttm JOIN doandoi dd JOIN giaithuong gt
    WHERE tm.MaTietMuc = ct.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND cttm.MaTietMuc = tm.MaTietMuc
    AND ct.MaCuocThi = ctvn.MaCuocThi AND cttm.MaDoanDoi = dd.MaDoanDoi AND gt.MaGiaiThuong = ct.MaGiaiThuong
    AND ctvn.MaPhanThi = 2`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllTietMucDoiNhomTheoNgay = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ct.TrangThai, ct.DiemTrungBinh, ctvn.MaTrangThai,
  ct.MaGiaiThuong, ctvn.TenCuocThi, dd.TenDoanDoi, ct.VongThi, ctvn.MaCuocThi, ctvn.SoVongThi, gt.TenGiaiThuong, 0 AS SapLich
    FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ct JOIN loaitietmuc ltm 
    JOIN cuocthivannghe ctvn JOIN doandoitrinhbaytietmuc cttm JOIN doandoi dd JOIN giaithuong gt
    WHERE tm.MaTietMuc = ct.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND cttm.MaTietMuc = tm.MaTietMuc
    AND ct.MaCuocThi = ctvn.MaCuocThi AND cttm.MaDoanDoi = dd.MaDoanDoi AND gt.MaGiaiThuong = ct.MaGiaiThuong
    AND ctvn.MaPhanThi = 2
    AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') >= ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') <= ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucDoiNhomTheoThang = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ct.TrangThai, ct.DiemTrungBinh, ctvn.MaTrangThai,
  ct.MaGiaiThuong, ctvn.TenCuocThi, dd.TenDoanDoi, ct.VongThi, ctvn.MaCuocThi, ctvn.SoVongThi, gt.TenGiaiThuong, 0 AS SapLich
    FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ct JOIN loaitietmuc ltm 
    JOIN cuocthivannghe ctvn JOIN doandoitrinhbaytietmuc cttm JOIN doandoi dd JOIN giaithuong gt
    WHERE tm.MaTietMuc = ct.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND cttm.MaTietMuc = tm.MaTietMuc
    AND ct.MaCuocThi = ctvn.MaCuocThi AND cttm.MaDoanDoi = dd.MaDoanDoi AND gt.MaGiaiThuong = ct.MaGiaiThuong
    AND ctvn.MaPhanThi = 2
    AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m') >= ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m') <= ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucDoiNhomTheoNam = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ct.TrangThai, ct.DiemTrungBinh, ctvn.MaTrangThai,
  ct.MaGiaiThuong, ctvn.TenCuocThi, dd.TenDoanDoi, ct.VongThi, ctvn.MaCuocThi, ctvn.SoVongThi, gt.TenGiaiThuong, 0 AS SapLich
    FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ct JOIN loaitietmuc ltm 
    JOIN cuocthivannghe ctvn JOIN doandoitrinhbaytietmuc cttm JOIN doandoi dd JOIN giaithuong gt
    WHERE tm.MaTietMuc = ct.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND cttm.MaTietMuc = tm.MaTietMuc
    AND ct.MaCuocThi = ctvn.MaCuocThi AND cttm.MaDoanDoi = dd.MaDoanDoi AND gt.MaGiaiThuong = ct.MaGiaiThuong
    AND ctvn.MaPhanThi = 2
    AND DATE_FORMAT(tm.NgayGioThucHien, '%Y') >= ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y') <= ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucCaNhan = async (req, res) => {
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ct.MaGiaiThuong, ts.TenThiSinh, ctvn.TenCuocThi, ct.VongThi, 
  ctvn.MaCuocThi, ctvn.SoVongThi, gt.TenGiaiThuong, 0 AS SapLich, ct.TrangThai, ct.DiemTrungBinh, ctvn.MaTrangThai
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ct JOIN loaitietmuc ltm 
  JOIN cuocthivannghe ctvn JOIN thisinhtrinhbaytietmuc cttm JOIN thisinh ts JOIN giaithuong gt
  WHERE tm.MaTietMuc = ct.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND cttm.MaTietMuc = tm.MaTietMuc
  AND ct.MaCuocThi = ctvn.MaCuocThi AND ts.MaThiSinh = cttm.MaThiSinh AND gt.MaGiaiThuong = ct.MaGiaiThuong
  AND ctvn.MaPhanThi = 1`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllTietMucCaNhanTheoNgay = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ct.MaGiaiThuong, ts.TenThiSinh, ctvn.TenCuocThi, ct.VongThi, 
  ctvn.MaCuocThi, ctvn.SoVongThi, gt.TenGiaiThuong, 0 AS SapLich, ct.TrangThai, ct.DiemTrungBinh, ctvn.MaTrangThai
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ct JOIN loaitietmuc ltm 
  JOIN cuocthivannghe ctvn JOIN thisinhtrinhbaytietmuc cttm JOIN thisinh ts JOIN giaithuong gt
  WHERE tm.MaTietMuc = ct.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND cttm.MaTietMuc = tm.MaTietMuc
  AND ct.MaCuocThi = ctvn.MaCuocThi AND ts.MaThiSinh = cttm.MaThiSinh AND gt.MaGiaiThuong = ct.MaGiaiThuong
  AND ctvn.MaPhanThi = 1
  AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') >= ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') <= ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucCaNhanTheoThang = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ct.MaGiaiThuong, ts.TenThiSinh, ctvn.TenCuocThi, ct.VongThi, 
  ctvn.MaCuocThi, ctvn.SoVongThi, gt.TenGiaiThuong, 0 AS SapLich, ct.TrangThai, ct.DiemTrungBinh, ctvn.MaTrangThai
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ct JOIN loaitietmuc ltm 
  JOIN cuocthivannghe ctvn JOIN thisinhtrinhbaytietmuc cttm JOIN thisinh ts JOIN giaithuong gt
  WHERE tm.MaTietMuc = ct.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND cttm.MaTietMuc = tm.MaTietMuc
  AND ct.MaCuocThi = ctvn.MaCuocThi AND ts.MaThiSinh = cttm.MaThiSinh AND gt.MaGiaiThuong = ct.MaGiaiThuong
  AND ctvn.MaPhanThi = 1
  AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m') >= ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m') <= ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllTietMucCaNhanTheoNam = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT ROW_NUMBER() OVER (ORDER BY tm.NgayGioThucHien DESC) stt, tm.MaTietMuc, tm.TenTietMuc, ltm.TenLoaiTietMuc, tm.NgayGioThucHien, ct.MaGiaiThuong, ts.TenThiSinh, ctvn.TenCuocThi, ct.VongThi, 
  ctvn.MaCuocThi, ctvn.SoVongThi, gt.TenGiaiThuong, 0 AS SapLich, ct.TrangThai, ct.DiemTrungBinh, ctvn.MaTrangThai
  FROM tietmucvannghe tm JOIN chitietcuocthidangkytudo ct JOIN loaitietmuc ltm 
  JOIN cuocthivannghe ctvn JOIN thisinhtrinhbaytietmuc cttm JOIN thisinh ts JOIN giaithuong gt
  WHERE tm.MaTietMuc = ct.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND cttm.MaTietMuc = tm.MaTietMuc
  AND ct.MaCuocThi = ctvn.MaCuocThi AND ts.MaThiSinh = cttm.MaThiSinh AND gt.MaGiaiThuong = ct.MaGiaiThuong
  AND ctvn.MaPhanThi = 1
  AND DATE_FORMAT(tm.NgayGioThucHien, '%Y') >= ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y') <= ?`;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAddTietMucChuongTrinhKhongGiamKhao = async (req, res) => {
  let successAddTietMuc = {
    isAddProduct: false,
    message: "",
  };
  // eslint-disable-next-line no-unused-vars
  let idCuocThi = req.body.maCuocThi;
  let MaChuongTrinh = req.body.maChuongTrinh;
  let TenTietMuc = req.body.tenTietMuc;
  let LoaiTietMuc = req.body.loaiTietMuc;
  let NoiDungTietMuc = req.body.noiDungTietMuc;
  let ThoiGianThucHien = req.body.thoiGianThucHien;
  let NhanSo = req.body.nhanSo;
  let arrMaThiSinh = req.body.arrMaThiSinh;
  let array = [];

  db.query(
    "INSERT INTO tietmucvannghe(TenTietMuc,NoiDungTietMuc,NgayGioThucHien,NhanSo,MaLoaiTietMuc) VALUE (?,?,?,?,?)",
    [TenTietMuc, NoiDungTietMuc, ThoiGianThucHien, NhanSo, LoaiTietMuc],
    function (error, results, fields) {
      if (error) {
        successAddTietMuc.message = "Thất bại";
        res.send(successAddTietMuc);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          const idTM = results.insertId;
          for (let i = 0; i < arrMaThiSinh.length; i++) {
            let arr = [];
            arr.push(idTM);
            arr.push(arrMaThiSinh[i]);
            array.push(arr);
          }
          db.query(
            "INSERT INTO chitietchuongtrinh(MaChuongTrinh,MaTietMuc) VALUE (?,?)",
            [MaChuongTrinh, idTM],
            function (error, results, fields) {
              if (error) {
                successAddTietMuc.message = "Thất bại";
                res.send(successAddTietMuc);
              } else {
                if (results.affectedRows > 0) {
                  db.query(
                    "INSERT INTO thisinhtrinhbaytietmuc(MaTietMuc,MaThiSinh) VALUE ?",
                    [array],
                    function (error, results, fields) {
                      if (error) {
                        successAddTietMuc.message = "Thất bại";
                        res.send(successAddTietMuc);
                      } else {
                        if (results.affectedRows > 0) {
                          successAddTietMuc.message = "Thêm Thành Công!";
                          successAddTietMuc.isAdd = true;
                          res.send(successAddTietMuc);
                        } else {
                          successAddTietMuc.message = "Thêm Thất Bại!";
                          successAddTietMuc.isAdd = false;
                          res.send(successAddTietMuc);
                        }
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    }
  );
};

const getAddTietMucChuongTrinh = async (req, res) => {
  let successAddTietMuc = {
    isAddProduct: false,
    message: "",
  };
  let idCuocThi = req.body.maCuocThi;
  let MaChuongTrinh = req.body.maChuongTrinh;
  let TenTietMuc = req.body.tenTietMuc;
  let LoaiTietMuc = req.body.loaiTietMuc;
  let NoiDungTietMuc = req.body.noiDungTietMuc;
  let ThoiGianThucHien = req.body.thoiGianThucHien;
  let NhanSo = req.body.nhanSo;
  let arrMaThiSinh = req.body.arrMaThiSinh;
  let array = [];
  let arrMaGiamKhao = req.body.arrMaGiamKhao;
  let arrDiem = [];

  db.query(
    "INSERT INTO tietmucvannghe(TenTietMuc,NoiDungTietMuc,NgayGioThucHien,NhanSo,MaLoaiTietMuc) VALUE (?,?,?,?,?)",
    [TenTietMuc, NoiDungTietMuc, ThoiGianThucHien, NhanSo, LoaiTietMuc],
    function (error, results, fields) {
      if (error) {
        successAddTietMuc.message = "Thất bại";
        res.send(successAddTietMuc);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          const idTM = results.insertId;
          for (let i = 0; i < arrMaThiSinh.length; i++) {
            let arr = [];
            arr.push(idTM);
            arr.push(arrMaThiSinh[i]);
            array.push(arr);
          }
          for (let i = 0; i < arrMaGiamKhao.length; i++) {
            let arr = [];
            arr.push(idCuocThi);
            arr.push(arrMaGiamKhao[i].MaGiamKhao);
            arr.push(idTM);
            arrDiem.push(arr);
          }
          db.query(
            "INSERT INTO chitietchuongtrinh(MaChuongTrinh,MaTietMuc) VALUE (?,?)",
            [MaChuongTrinh, idTM],
            function (error, results, fields) {
              if (error) {
                successAddTietMuc.message = "Thất bại";
                res.send(successAddTietMuc);
              } else {
                if (results.affectedRows > 0) {
                  db.query(
                    "INSERT INTO thisinhtrinhbaytietmuc(MaTietMuc,MaThiSinh) VALUE ?",
                    [array],
                    function (error, results, fields) {
                      if (error) {
                        successAddTietMuc.message = "Thất bại";
                        res.send(successAddTietMuc);
                      } else {
                        if (results.affectedRows > 0) {
                          db.query(
                            "INSERT INTO diem(MaCuocThi,MaGiamKhao,MaTietMuc) VALUE ?",
                            [arrDiem],
                            function (error, results, fields) {
                              if (error) {
                                successAddTietMuc.isAdd = false;
                                successAddTietMuc.message = "Thêm Thất Bại!";
                                res.send(successAddTietMuc);
                                throw error;
                              } else {
                                if (results.affectedRows > 0) {
                                  successAddTietMuc.message =
                                    "Thêm Thành Công!";
                                  successAddTietMuc.isAdd = true;
                                  res.send(successAddTietMuc);
                                } else {
                                  successAddTietMuc.message = "Thêm Thất Bại!";
                                  successAddTietMuc.isAdd = false;
                                  res.send(successAddTietMuc);
                                }
                              }
                            }
                          );
                        }
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    }
  );
};

const getDetailTietMuc = async (req, res) => {
  const idTietMuc = req.params.idTietMuc;
  const sqlSelect = `SELECT tm.MaTietMuc, tm.TenTietMuc, tm.NoiDungTietMuc, tm.NgayGioThucHien, tm.NhanSo, tm.MaLoaiTietMuc, ltm.TenLoaiTietMuc, ltm.CoDinh, ltm.NhanSoToiThieu, ltm.MaPhanThi, ctct.VongThi, ctct.MaGiaiThuong, gt.TenGiaiThuong
  FROM tietmucvannghe tm JOIN loaitietmuc ltm JOIN chitietcuocthidangkytudo ctct JOIN giaithuong gt 
  WHERE tm.MaTietMuc = ? AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND ctct.MaTietMuc = tm.MaTietMuc AND gt.MaGiaiThuong = ctct.MaGiaiThuong
  UNION ALL
  SELECT tm.MaTietMuc, tm.TenTietMuc, tm.NoiDungTietMuc, tm.NgayGioThucHien, tm.NhanSo, tm.MaLoaiTietMuc, ltm.TenLoaiTietMuc, ltm.CoDinh, ltm.NhanSoToiThieu, ltm.MaPhanThi,1 as VongThi, -1 AS MaGiaiThuong, null as TenGiaiThuong
  FROM tietmucvannghe tm JOIN loaitietmuc ltm JOIN chitietchuongtrinh ctctr
  WHERE tm.MaTietMuc = ? AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND ctctr.MaTietMuc = tm.MaTietMuc`;
  db.query(sqlSelect, [idTietMuc, idTietMuc], (err, result) => {
    res.send(result);
  });
};

const getAddLoaiTietMuc = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  let TenLoaiTietMuc = req.body.TenLoaiTietMuc;
  let CoDinh = req.body.CoDinh;
  let MaPhanThi = req.body.MaPhanThi;
  let NhanSoToiThieu = req.body.NhanSoToiThieu;

  db.query(
    "INSERT INTO loaitietmuc(TenLoaiTietMuc,CoDinh,NhanSoToiThieu,MaPhanThi) VALUE (?,?,?,?)",
    [TenLoaiTietMuc, CoDinh, NhanSoToiThieu, MaPhanThi],
    function (error, results, fields) {
      if (error) {
        successAdd.message = "Thất bại";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          if (results.affectedRows > 0) {
            successAdd.message = "Thành Công!";
            successAdd.isAdd = true;
            res.send(successAdd);
          } else {
            successAdd.message = "Thất Bại!";
            successAdd.isAdd = false;
            res.send(successAdd);
          }
        }
      }
    }
  );
};

const getUpdateLoaiTietMuc = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  const MaLoaiTietMuc = req.params.MaLoaiTietMuc;
  let TenLoaiTietMuc = req.body.TenLoaiTietMuc;
  let CoDinh = req.body.CoDinh;
  let MaPhanThi = req.body.MaPhanThi;
  let NhanSoToiThieu = req.body.NhanSoToiThieu;

  db.query(
    `UPDATE loaitietmuc ltm 
    set ltm.TenLoaiTietMuc = ?, CoDinh = ?, NhanSoToiThieu = ?, MaPhanThi = ? 
    WHERE ltm.MaLoaiTietMuc = ?`,
    [TenLoaiTietMuc, CoDinh, NhanSoToiThieu, MaPhanThi, MaLoaiTietMuc],
    function (error, results, fields) {
      if (error) {
        successAdd.message = "Thất bại";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          if (results.affectedRows > 0) {
            successAdd.message = "Thành Công!";
            successAdd.isAdd = true;
            res.send(successAdd);
          } else {
            successAdd.message = "Thất Bại!";
            successAdd.isAdd = false;
            res.send(successAdd);
          }
        }
      }
    }
  );
};

const getDeleteLoaiTietMuc = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  const MaLoaiTietMuc = req.params.MaLoaiTietMuc;
  db.query(
    `DELETE FROM loaitietmuc WHERE MaLoaiTietMuc = ?`,
    [MaLoaiTietMuc],
    function (error, results, fields) {
      if (error) {
        successAdd.message = "Thất bại";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          if (results.affectedRows > 0) {
            successAdd.message = "Thành Công!";
            successAdd.isAdd = true;
            res.send(successAdd);
          } else {
            successAdd.message = "Thất Bại!";
            successAdd.isAdd = false;
            res.send(successAdd);
          }
        }
      }
    }
  );
};

const getDeleteTietMuc = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  const MaTietMuc = req.params.idTietMuc;
  db.query(
    `DELETE FROM tietmucvannghe WHERE MaTietMuc = ?`,
    [MaTietMuc],
    function (error, results, fields) {
      if (error) {
        successAdd.message = "Thất bại";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          if (results.affectedRows > 0) {
            successAdd.message = "Thành Công!";
            successAdd.isAdd = true;
            res.send(successAdd);
          } else {
            successAdd.message = "Thất Bại!";
            successAdd.isAdd = false;
            res.send(successAdd);
          }
        }
      }
    }
  );
};

////////////////////////////////////////////////////////////////////////
////Action Đoàn Đội
////////////////////////////////////////////////////////////////////////
const getAllDoanDoi = async (req, res) => {
  const sqlSelect = `SELECT dd.MaDoanDoi, ROW_NUMBER() OVER (ORDER BY dd.MaDoanDoi DESC) stt, dd.TenDoanDoi, ts.TenThiSinh as TenNhomTruong, ts.Email, ts.Phone, dd.SoLuongThanhVien, dv.TenDonVi
  FROM doandoi dd join thisinh ts join donvitochuc dv 
  WHERE dd.MaDonVi = dv.MaDonVi and ts.MaThiSinh = dd.MaThiSinh`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getDetailDoanDoi = async (req, res) => {
  const idDoanDoi = req.params.idDoanDoi;
  const sqlSelect = `SELECT dd.MaDoanDoi, dd.TenDoanDoi, dd.MoTaDoanDoi, dd.SoLuongThanhVien, dd.MaDonVi, dv.TenDonVi, ts.MaThiSinh, ts.TenThiSinh, ts.Email, ts.Phone
  FROM doandoi dd JOIN thisinh ts JOIN donvitochuc dv
  WHERE ts.MaThiSinh = dd.MaThiSinh AND dv.MaDonVi = dd.MaDonVi AND dd.MaDoanDoi = ?`;
  db.query(sqlSelect, idDoanDoi, (err, result) => {
    res.send(result);
  });
};

const getTietMucThamDuCuaDoanDoi = async (req, res) => {
  const idDoanDoi = req.params.idDoanDoi;
  const sqlSelect = `SELECT * FROM
  (SELECT DISTINCT ct.MaTrangThai FROM doandoitrinhbaytietmuc ddtm JOIN cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = ddtm.MaTietMuc
  AND ddtm.MaDoanDoi = ?
  UNION ALL
  SELECT DISTINCT ct.MaTrangThai FROM chuongtrinhvannghe ctr JOIN chitietchuongtrinh ctctr JOIN doandoi dd JOIN cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth
  WHERE ctr.MaTruongDonVi = dd.MaThiSinh AND ctr.MaChuongTrinh = ctctr.MaChuongTrinh AND ct.MaCuocThi = ctth.MaCuocThi AND ctth.MaChuongTrinh = ctr.MaChuongTrinh
  AND ctr.MaDoanDoi = ?) tb
  ORDER BY tb.MaTrangThai`;
  db.query(sqlSelect, [idDoanDoi, idDoanDoi], (err, result) => {
    res.send(result);
  });
};

const getThiSinhThuocDoanDoi = async (req, res) => {
  const idDoanDoi = req.params.idDoanDoi;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ts.MaThiSinh) stt FROM thisinhthuocdoandoi tsdd JOIN thisinh ts
  WHERE tsdd.MaThiSinh = ts.MaThiSinh and tsdd.MaDoanDoi = ?`;
  db.query(sqlSelect, idDoanDoi, (err, result) => {
    res.send(result);
  });
};

const getThiSinhThuocDoanDoiTruongDonVi = async (req, res) => {
  const idThiSinh = req.params.idThiSinh;
  const idDoanDoi = req.params.idDoanDoi;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ts.MaThiSinh) stt FROM thisinh ts JOIN thisinhthuocdoandoi tsdd
  WHERE ts.MaThiSinh = tsdd.MaThiSinh AND tsdd.MaDoanDoi = ?`;
  db.query(sqlSelect, [idDoanDoi], (err, result) => {
    res.send(result);
  });
};

const getAddDoanDoi = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
    idDoanDoi: "",
  };
  let TenDoanDoi = req.body.TenDoanDoi;
  let MoTaDoanDoi = req.body.MoTaDoanDoi;
  let SoLuongThanhVien = req.body.SoLuongThanhVien;
  let MaThiSinh = req.body.MaThiSinh;
  let MaDonVi = req.body.MaDonVi;
  db.query(
    "INSERT INTO doandoi(TenDoanDoi,MoTaDoanDoi,SoLuongThanhVien,MaThiSinh,MaDonVi) VALUE (?,?,?,?,?)",
    [TenDoanDoi, MoTaDoanDoi, SoLuongThanhVien, MaThiSinh, MaDonVi],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Thất Bại!";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          const id = results.insertId;
          successAdd.idDoanDoi = id;

          db.query(
            "INSERT INTO thisinhthuocdoandoi(MaDoanDoi,MaThiSinh) VALUE (?,?)",
            [id, MaThiSinh],
            function (error, results, fields) {
              if (error) {
                successAdd.isAdd = false;
                successAdd.message = "Thêm Thất Bại!";
                res.send(successAdd);
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  db.query(
                    "UPDATE thisinh SET MaDonVi = ? WHERE MaThiSinh = ?",
                    [MaDonVi, MaThiSinh],
                    function (error, results, fields) {
                      if (error) {
                        successAdd.isAdd = false;
                        successAdd.message = "Thêm Thất Bại!";
                        res.send(successAdd);
                        throw error;
                      } else {
                        if (results.affectedRows > 0) {
                          successAdd.isAdd = true;
                          successAdd.message = "Thêm Thành Công!";
                          res.send(successAdd);
                        }
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    }
  );
};

const getAddThanhVienDoanDoi = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  let TenThiSinh = req.body.TenThiSinh;
  let MaDinhDanh = req.body.MaDinhDanh;
  let GioiTinh = req.body.GioiTinh;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let MaLop = req.body.MaLop;
  let MaDonVi = req.body.MaDonVi;
  const idDoanDoi = req.params.idDoanDoi;

  db.query(
    "INSERT INTO thisinh(TenThiSinh,MaDinhDanh,GioiTinh,Email,Phone,MaLop,MaDonVi) VALUE (?,?,?,?,?,?,?)",
    [TenThiSinh, MaDinhDanh, GioiTinh, Email, Phone, MaLop, MaDonVi],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Thất Bại!";
        res.send(successAdd);
        throw error;
      }
      if (results.affectedRows > 0) {
        const idThiSinh = results.insertId;
        db.query(
          "INSERT INTO thisinhthuocdoandoi(MaDoanDoi,MaThiSinh) VALUE (?,?)",
          [idDoanDoi, idThiSinh],
          function (error, results, fields) {
            if (error) {
              successAdd.isAdd = false;
              successAdd.message = "Thêm Thất Bại!";
              res.send(successAdd);
              throw error;
            } else {
              if (results.affectedRows > 0) {
                db.query(
                  "UPDATE doandoi set SoLuongThanhVien = SoLuongThanhVien + 1 WHERE MaDoanDoi = ?",
                  [idDoanDoi],
                  function (error, results, fields) {
                    if (error) {
                      successAdd.isAdd = false;
                      successAdd.message = "Thêm Thất Bại!";
                      res.send(successAdd);
                      throw error;
                    } else {
                      if (results.affectedRows > 0) {
                        successAdd.isAdd = true;
                        successAdd.message = "Thêm Thành Công!";
                        res.send(successAdd);
                      }
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  );
};

const getDeleteThanhVien = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const idDoanDoi = req.params.idDoanDoi;
  const idThiSinh = req.params.idThiSinh;
  db.query(
    `DELETE FROM thisinh WHERE MaThiSinh = ?`,
    [idThiSinh],
    function (error, results, fields) {
      if (error) {
        success.isAdd = false;
        success.message = "Thêm Thất Bại!";
        res.send(success);
        throw error;
      } else {
        db.query(
          `UPDATE doandoi dd SET dd.SoLuongThanhVien = dd.SoLuongThanhVien - 1 WHERE dd.MaDoanDoi = ?`,
          [idDoanDoi],
          function (error, results, fields) {
            if (error) {
              success.isSuccess = false;
              success.message = "Thất Bại!";
              res.send(success);
              throw error;
            } else {
              if (results.affectedRows > 0) {
                success.isSuccess = true;
                success.message = "Thành công!";
                res.send(success);
              }
            }
          }
        );
      }
    }
  );
};

const getUpdateThanhVienDoanDoi = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  const MaThiSinh = req.params.idThiSinh;
  let TenThiSinh = req.body.TenThiSinh;
  let MaDinhDanh = req.body.MaDinhDanh;
  let GioiTinh = req.body.GioiTinh;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let MaLop = req.body.MaLop;
  db.query(
    `UPDATE thisinh ts 
    SET ts.TenThiSinh = ?, ts.MaDinhDanh = ?, ts.GioiTinh = ?, ts.Email = ?, ts.Phone = ?, ts.MaLop = ? 
    WHERE ts.MaThiSinh = ?`,
    [TenThiSinh, MaDinhDanh, GioiTinh, Email, Phone, MaLop, MaThiSinh],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thất Bại!";
        res.send(successAdd);
        throw error;
      }
      if (results.affectedRows > 0) {
        if (results.affectedRows > 0) {
          successAdd.isAdd = true;
          successAdd.message = "Thành Công!";
          res.send(successAdd);
        }
      }
    }
  );
};

const getUpdateDoanDoi = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
    idDoanDoi: "",
  };
  const idDoanDoi = req.params.idDoanDoi;
  let TenDoanDoi = req.body.TenDoanDoi;
  let MoTaDoanDoi = req.body.MoTaDoanDoi;
  let MaNhomTruong = req.body.MaNhomTruong;
  let MaThiSinh = req.body.MaThiSinh;
  db.query(
    "UPDATE doandoi dd SET dd.TenDoanDoi = ?, dd.MoTaDoanDoi = ?, dd.MaThiSinh=  ? WHERE dd.MaDoanDoi = ?",
    [TenDoanDoi, MoTaDoanDoi, MaNhomTruong, idDoanDoi],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Thất Bại!";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          db.query(
            "UPDATE thisinhthuocdoandoi tstd SET tstd.MaThiSinh = ? WHERE tstd.MaThiSinh = ? AND tstd.MaDoanDoi = ?",
            [MaNhomTruong, MaThiSinh, idDoanDoi],
            function (error, results, fields) {
              if (error) {
                successAdd.isAdd = false;
                successAdd.message = "Thêm Thất Bại!";
                res.send(successAdd);
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  successAdd.isAdd = true;
                  successAdd.message = "Thành công!";
                  res.send(successAdd);
                }
              }
            }
          );
        }
      }
    }
  );
};

const getDeleteDoanDoi = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const idDoanDoi = req.params.idDoanDoi;
  db.query(
    `DELETE FROM thisinh WHERE MaThiSinh IN(
     SELECT tsdd.MaThiSinh FROM thisinhthuocdoandoi tsdd 
     WHERE tsdd.MaDoanDoi = ? AND tsdd.MaThiSinh NOT IN ( SELECT dd.MaThiSinh FROM doandoi dd WHERE dd.MaDoanDoi = ?))`,
    [idDoanDoi, idDoanDoi],
    function (error, results, fields) {
      if (error) {
        success.isAdd = false;
        success.message = "Thêm Thất Bại!";
        res.send(success);
        throw error;
      } else {
        db.query(
          `DELETE FROM doandoi WHERE MaDoanDoi = ?`,
          [idDoanDoi],
          function (error, results, fields) {
            if (error) {
              success.isSuccess = false;
              success.message = "Thất Bại!";
              res.send(success);
              throw error;
            } else {
              if (results.affectedRows > 0) {
                success.isSuccess = true;
                success.message = "Thành công!";
                res.send(success);
              }
            }
          }
        );
      }
    }
  );
};

////////////////////////////////////////////////////////////////////////
////Action Thí Sinh
////////////////////////////////////////////////////////////////////////
const getAllThiSinh = async (req, res) => {
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY ts.MaThiSinh DESC) stt from thisinh ts JOIN donvitochuc dv JOIN nguoidung nd
  WHERE ts.MaDonVi = dv.MaDonVi AND nd.MaNguoiDung = ts.MaNguoiDung`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getThiSinhThuocDonVi = async (req, res) => {
  const idDonVi = req.params.idDonVi;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY nts.MaThiSinh DESC) stt FROM 
  (SELECT ts.MaThiSinh, ts.TenThiSinh, ts.MaDinhDanh, ts.Email, ts.Phone, ts.MaLop, tt.TenDoanDoi, ts.MaDonVi
  from thisinh ts LEFT JOIN 
  (SELECT dd.MaDoanDoi, dd.TenDoanDoi, tsdd.MaThiSinh 
   from thisinhthuocdoandoi tsdd JOIN doandoi dd 
   WHERE dd.MaDoanDoi = tsdd.MaDoanDoi) tt 
  on ts.MaThiSinh = tt.MaThiSinh) nts JOIN donvitochuc dv 
  WHERE nts.MaDonVi = dv.MaDonVi AND dv.MaDonVi = ?`;
  db.query(sqlSelect, idDonVi, (err, result) => {
    res.send(result);
  });
};

const getAddThiSinh = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  let TenThiSinh = req.body.TenThiSinh;
  let MaDinhDanh = req.body.MaDinhDanh;
  let GioiTinh = req.body.GioiTinh;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let MaLop = req.body.MaLop;
  let MaDonVi = req.body.MaDonVi;
  db.query(
    "INSERT INTO thisinh(TenThiSinh,MaDinhDanh,GioiTinh,Email,Phone,MaLop,MaDonVi) VALUE (?,?,?,?,?,?,?)",
    [TenThiSinh, MaDinhDanh, GioiTinh, Email, Phone, MaLop, MaDonVi],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Thất Bại!";
        res.send(successAdd);
        throw error;
      }
      if (results.affectedRows > 0) {
        successAdd.isAdd = true;
        successAdd.message = "Thêm Thành Công!";
        res.send(successAdd);
      } else {
        successAdd.message = "Thêm Thất Bại!";
        successAdd.isAdd = false;
        res.send(successAdd);
      }
    }
  );
};

const getUpdateThongTinThiSinh = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  const idThiSinh = req.params.idThiSinh;
  let TenThiSinh = req.body.TenThiSinh;
  let MaDinhDanh = req.body.MaDinhDanh;
  let GioiTinh = req.body.GioiTinh;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let MaLop = req.body.MaLop;
  let MaDonVi = req.body.MaDonVi;
  db.query(
    "UPDATE thisinh ts SET ts.TenThiSinh = ?, ts.MaDinhDanh = ?, ts.GioiTinh = ?, ts.Email = ?, ts.Phone = ?, ts.MaLop= ?, ts.MaDonVi = ? WHERE ts.MaThiSinh = ?",
    [TenThiSinh, MaDinhDanh, GioiTinh, Email, Phone, MaLop, MaDonVi, idThiSinh],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Thất Bại!";
        res.send(successAdd);
        throw error;
      }
      if (results.affectedRows > 0) {
        successAdd.isAdd = true;
        successAdd.message = "Thêm Thành Công!";
        res.send(successAdd);
      } else {
        successAdd.message = "Thêm Thất Bại!";
        successAdd.isAdd = false;
        res.send(successAdd);
      }
    }
  );
};

////////////////////////////////////////////////////////////////////////
////Action Người Dùng
////////////////////////////////////////////////////////////////////////
const getAllNguoiDung = async (req, res) => {
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.MaNguoiDung DESC) stt  FROM
  (SELECT nd.MaNguoiDung, nd.HoTenNguoiDung, c.TenChucVu, nd.GioiTinh, nd.Email, nd.Phone, nd.TaiKhoan, nd.MatKhau, 
  nd.MaDinhDanh, null as MaDonVi, null as TenDonVi, null as MaLop
  FROM nguoidung nd join chucvu c
  WHERE nd.MaChucVu = c.MaChucVu AND c.MaChucVu < 3
  UNION ALL 
  SELECT nd.MaNguoiDung, nd.HoTenNguoiDung, c.TenChucVu, nd.GioiTinh, nd.Email, nd.Phone, nd.TaiKhoan, nd.MatKhau, 
  nd.MaDinhDanh, ts.MaDonVi, dv.TenDonVi, ts.MaLop
  FROM nguoidung nd JOIN thisinh ts JOIN chucvu c JOIN donvitochuc dv
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND nd.MaChucVu = c.MaChucVu AND dv.MaDonVi = ts.MaDonVi) tb`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllNguoiDungTruongNhom = async (req, res) => {
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY nd.MaNguoiDung DESC) stt 
  FROM nguoidung nd JOIN thisinh ts JOIN donvitochuc dv
    WHERE nd.MaNguoiDung = ts.MaNguoiDung AND dv.MaDonVi = ts.MaDonVi AND nd.MaChucVu = 3`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllNguoiDungTruongNhomTheoDonVi = async (req, res) => {
  const MaDonVi = req.params.MaDonVi;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY nd.MaNguoiDung DESC) stt 
  FROM nguoidung nd JOIN thisinh ts JOIN donvitochuc dv
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND dv.MaDonVi = ts.MaDonVi AND ts.MaDonVi = ? AND nd.MaChucVu = 3`;
  db.query(sqlSelect, MaDonVi, (err, result) => {
    res.send(result);
  });
};

const getAllNguoiDungTruongNhomCoDoanDoi = async (req, res) => {
  const idDonVi = req.params.idDonVi;
  const sqlSelect = `SELECT ts.MaThiSinh, ts.TenThiSinh, nd.MaDinhDanh ,nd.Email, nd.GioiTinh, nd.Phone, dd.TenDoanDoi,dd.MaDoanDoi, ROW_NUMBER() OVER (ORDER BY nd.MaNguoiDung DESC) stt 
  FROM nguoidung nd JOIN thisinh ts JOIN donvitochuc dv JOIN doandoi dd
  WHERE nd.MaNguoiDung = ts.MaNguoiDung AND ts.MaThiSinh = dd.MaThiSinh AND dd.MaDonVi = dv.MaDonVi
  AND dv.MaDonVi = ?`;
  db.query(sqlSelect, idDonVi, (err, result) => {
    res.send(result);
  });
};

const getAllChuyenMon = async (req, res) => {
  const sqlSelect = `SELECT * from chuyenmon`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAddQuanTriVien = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  let HoTenNguoiDung = req.body.HoTen;
  let TaiKhoan = req.body.TaiKhoan;
  let GioiTinh = req.body.GioiTinh;
  let MaChucVu = 1;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let MatKhau = req.body.MatKhau;
  db.query(
    "INSERT INTO nguoidung(HoTenNguoiDung,TaiKhoan,GioiTinh,MaChucVu,Email,Phone,MatKhau) VALUE (?,?,?,?,?,?,?)",
    [HoTenNguoiDung, TaiKhoan, GioiTinh, MaChucVu, Email, Phone, MatKhau],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Người Dùng Thất Bại!";
        res.send(successAdd);
        throw error;
      }
      if (results.affectedRows > 0) {
        successAdd.isAdd = true;
        successAdd.message = "Thêm Người Dùng Thành Công!";
        res.send(successAdd);
      } else {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Người Dùng Thất Bại!";
        res.send(successAdd);
      }
    }
  );
};

const getAddGiamKhao = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
  };
  let HoTenNguoiDung = req.body.HoTen;
  let TaiKhoan = req.body.TaiKhoan;
  let GioiTinh = req.body.GioiTinh;
  let MaChucVu = 2;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let MatKhau = req.body.MatKhau;
  db.query(
    "INSERT INTO nguoidung(HoTenNguoiDung,TaiKhoan,GioiTinh,MaChucVu,Email,Phone,MatKhau) VALUE (?,?,?,?,?,?,?)",
    [HoTenNguoiDung, TaiKhoan, GioiTinh, MaChucVu, Email, Phone, MatKhau],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Người Dùng Thất Bại!";
        res.send(successAdd);
        throw error;
      }
      if (results.affectedRows > 0) {
        successAdd.isAdd = true;
        successAdd.message = "Thêm Người Dùng Thành Công!";
        res.send(successAdd);
      } else {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Người Dùng Thất Bại!";
        res.send(successAdd);
      }
    }
  );
};

const getAddTruongNhom = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
    idTN: "",
  };
  let HoTenNguoiDung = req.body.HoTen;
  let TaiKhoan = req.body.TaiKhoan;
  let MaDinhDanh = req.body.MaDinhDanh;
  let GioiTinh = req.body.GioiTinh;
  let MaChucVu = req.body.MaChucVu;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let MatKhau = req.body.MatKhau;
  let MaLop = req.body.MaLop;
  let MaDonVi = req.body.MaDonVi;

  db.query(
    "INSERT INTO nguoidung(HoTenNguoiDung,TaiKhoan,MaDinhDanh,GioiTinh,MaChucVu,Email,Phone,MatKhau) VALUE (?,?,?,?,?,?,?,?)",
    [
      HoTenNguoiDung,
      TaiKhoan,
      MaDinhDanh,
      GioiTinh,
      MaChucVu,
      Email,
      Phone,
      MatKhau,
    ],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Người Dùng Thất Bại!";
        res.send(successAdd);
        throw error;
      }
      if (results.affectedRows > 0) {
        const idND = results.insertId;
        db.query(
          "INSERT INTO thisinh(TenThiSinh,MaDinhDanh,GioiTinh,Email,Phone,MaLop,MaDonVi,MaNguoiDung) VALUE (?,?,?,?,?,?,?,?)",
          [
            HoTenNguoiDung,
            MaDinhDanh,
            GioiTinh,
            Email,
            Phone,
            MaLop,
            MaDonVi,
            idND,
          ],
          function (error, results, fields) {
            if (error) {
              successAdd.message = "Thất bại";
              res.send(successAdd);
              throw error;
            } else {
              if (results.affectedRows > 0) {
                successAdd.message = "Thêm Thành Công";
                successAdd.isAddProduct = true;
                successAdd.idTN = results.insertId;
                res.send(successAdd);
              }
            }
          }
        );
      } else {
        successAdd.message = "Thêm Người Dùng Thất Bại!";
        successAdd.isAdd = false;
        res.send(successAdd);
      }
    }
  );
};

const getUpdateNguoiDung = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
    idTN: "",
  };
  const MaNguoiDung = req.params.idNguoiDung;
  let HoTenNguoiDung = req.body.HoTen;
  let TaiKhoan = req.body.TaiKhoan;
  let MaDinhDanh = req.body.MaDinhDanh;
  let GioiTinh = req.body.GioiTinh;
  let MaChucVu = req.body.MaChucVu;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let MatKhau = req.body.MatKhau;
  db.query(
    `UPDATE nguoidung nd 
    SET nd.HoTenNguoiDung = ?, nd.TaiKhoan = ?, nd.MaDinhDanh = ?, nd.GioiTinh = ?, nd.MaChucVu = ?, nd.Email = ?, nd.Phone = ?, nd.MatKhau = ?
    WHERE nd.MaNguoiDung = ?`,
    [
      HoTenNguoiDung,
      TaiKhoan,
      MaDinhDanh,
      GioiTinh,
      MaChucVu,
      Email,
      Phone,
      MatKhau,
      MaNguoiDung,
    ],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Người Dùng Thất Bại!";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          successAdd.message = "Thêm Thành Công";
          successAdd.isAddProduct = true;
          successAdd.idTN = results.insertId;
          res.send(successAdd);
        }
      }
    }
  );
};

const getUpdateNguoiDungTruongNhomThiSinh = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const MaNguoiDung = req.params.idNguoiDung;
  let HoTenNguoiDung = req.body.HoTen;
  let TaiKhoan = req.body.TaiKhoan;
  let MaDinhDanh = req.body.MaDinhDanh;
  let GioiTinh = req.body.GioiTinh;
  let MaChucVu = req.body.MaChucVu;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let MatKhau = req.body.MatKhau;
  let MaLop = req.body.MaLop;
  let MaDonVi = req.body.MaDonVi;
  db.query(
    `UPDATE nguoidung nd 
    SET nd.HoTenNguoiDung = ?, 
    nd.TaiKhoan = ?, 
    nd.MaDinhDanh = ?, 
    nd.GioiTinh = ?, 
    nd.MaChucVu = ?, 
    nd.Email = ?, 
    nd.Phone = ?, 
    nd.MatKhau = ?
    WHERE nd.MaNguoiDung = ?`,
    [
      HoTenNguoiDung,
      TaiKhoan,
      MaDinhDanh,
      GioiTinh,
      MaChucVu,
      Email,
      Phone,
      MatKhau,
      MaNguoiDung,
    ],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thêm Người Dùng Thất Bại!";
        res.send(success);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          db.query(
            `UPDATE thisinh ts 
            SET ts.TenThiSinh = ?, 
            ts.MaDinhDanh = ?, 
            ts.GioiTinh = ?, 
            ts.Email = ?, 
            ts.Phone = ?, 
            ts.MaLop = ?, 
            ts.MaDonVi = ?
            WHERE ts.MaNguoiDung = ?`,
            [
              HoTenNguoiDung,
              MaDinhDanh,
              GioiTinh,
              Email,
              Phone,
              MaLop,
              MaDonVi,
              MaNguoiDung,
            ],
            function (error, results, fields) {
              if (error) {
                success.isSuccess = false;
                success.message = "Thất Bại!";
                res.send(success);
                throw error;
              }
              if (error) {
                success.message = "Thất bại";
                res.send(success);
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  success.message = "Thêm Thành Công";
                  success.isSuccess = true;
                  res.send(success);
                }
              }
            }
          );
        } else {
          success.message = "Thêm Người Dùng Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

const getDetailQuanTriVien = async (req, res) => {
  const idQuanTriVien = req.params.idQuanTriVien;
  const sqlSelect = `SELECT * FROM nguoidung nd WHERE nd.MaNguoiDung = ?`;
  db.query(sqlSelect, idQuanTriVien, (err, result) => {
    res.send(result);
  });
};

const getChangeMatkhau = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
    idTN: "",
  };
  const MaNguoiDung = req.params.idNguoiDung;
  let MatKhau = req.body.MatKhau;
  db.query(
    `UPDATE nguoidung nd SET nd.MatKhau = ? WHERE nd.MaNguoiDung = ?`,
    [MatKhau, MaNguoiDung],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thất Bại!";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          successAdd.message = "Thành Công";
          successAdd.isAddProduct = true;
          successAdd.idTN = results.insertId;
          res.send(successAdd);
        }
      }
    }
  );
};

const getUpdateThongTinCaNhanNguoiDung = async (req, res) => {
  let successAdd = {
    isAdd: false,
    message: "",
    idTN: "",
  };
  const MaNguoiDung = req.params.idNguoiDung;
  let HoTenNguoiDung = req.body.HoTen;
  let MaDinhDanh = req.body.MaDinhDanh;
  let GioiTinh = req.body.GioiTinh;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  db.query(
    `UPDATE nguoidung nd 
    SET nd.HoTenNguoiDung = ?, nd.MaDinhDanh = ?, nd.GioiTinh = ?, nd.Email = ?, nd.Phone = ?
    WHERE nd.MaNguoiDung = ?`,
    [HoTenNguoiDung, MaDinhDanh, GioiTinh, Email, Phone, MaNguoiDung],
    function (error, results, fields) {
      if (error) {
        successAdd.isAdd = false;
        successAdd.message = "Thêm Người Dùng Thất Bại!";
        res.send(successAdd);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          successAdd.message = "Thêm Thành Công";
          successAdd.isAddProduct = true;
          successAdd.idTN = results.insertId;
          res.send(successAdd);
        }
      }
    }
  );
};

const getUpdateThongTinCaNhanTruongNhomThiSinh = async (req, res) => {
  let success = {
    isSuccess: false,
    message: "",
  };
  const MaNguoiDung = req.params.idNguoiDung;
  let HoTenNguoiDung = req.body.HoTen;
  let MaDinhDanh = req.body.MaDinhDanh;
  let GioiTinh = req.body.GioiTinh;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let MaLop = req.body.MaLop;
  let MaDonVi = req.body.MaDonVi;
  db.query(
    `UPDATE nguoidung nd 
    SET nd.HoTenNguoiDung = ?, nd.MaDinhDanh = ?, nd.GioiTinh = ?, nd.Email = ?, nd.Phone = ?
    WHERE nd.MaNguoiDung = ?`,
    [HoTenNguoiDung, MaDinhDanh, GioiTinh, Email, Phone, MaNguoiDung],
    function (error, results, fields) {
      if (error) {
        success.isSuccess = false;
        success.message = "Thêm Người Dùng Thất Bại!";
        res.send(success);
        throw error;
      } else {
        if (results.affectedRows > 0) {
          db.query(
            `UPDATE thisinh ts 
            SET ts.TenThiSinh = ?, ts.MaDinhDanh = ?, ts.GioiTinh = ?, ts.Email = ?, ts.Phone = ?, ts.MaLop = ?, ts.MaDonVi = ?
            WHERE ts.MaNguoiDung = ?`,
            [
              HoTenNguoiDung,
              MaDinhDanh,
              GioiTinh,
              Email,
              Phone,
              MaLop,
              MaDonVi,
              MaNguoiDung,
            ],
            function (error, results, fields) {
              if (error) {
                success.isSuccess = false;
                success.message = "Thất Bại!";
                res.send(success);
                throw error;
              }
              if (error) {
                success.message = "Thất bại";
                res.send(success);
                throw error;
              } else {
                if (results.affectedRows > 0) {
                  success.message = "Thêm Thành Công";
                  success.isSuccess = true;
                  res.send(success);
                }
              }
            }
          );
        } else {
          success.message = "Thêm Người Dùng Thất Bại!";
          success.isSuccess = false;
          res.send(success);
        }
      }
    }
  );
};

////////////////////////////////////////////////////////////////////////
////Action Login và Logout
////////////////////////////////////////////////////////////////////////

const getAllThongKe = async (req, res) => {
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.NgayBatDau DESC, tb.MaCuocThi DESC) stt 
  FROM (SELECT ct.MaCuocThi, ct.TenCuocThi, ct.NgayBatDau, ct.NgayKetThuc, ht.TenHinhThuc, dd.TenDiaDiem, COUNT(*) as SLTM, sumtb.SLTS, ct.NoiDungCuocThi, ct.SoVongThi, ct.MaThangDiem, ct.MaTrangThai, ct.MaPhanThi
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN hinhthuccuocthi ht JOIN diadiem dd
  JOIN (SELECT ctct.MaCuocThi, SUM(tm.NhanSo) as SLTS
  FROM chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm 
  WHERE ctct.MaTietMuc = tm.MaTietMuc AND ctct.VongThi = 1
  GROUP BY ctct.MaCuocThi) sumtb      
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi 
  AND dd.MaDiaDiem = ct.MaDiaDiem AND ht.MaHinhThucCuocThi = 2 AND sumtb.MaCuocThi = ct.MaCuocThi
  GROUP BY ct.MaCuocThi
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, ct.NgayBatDau, ct.NgayKetThuc, ht.TenHinhThuc, dd.TenDiaDiem, COUNT(*) as SLTM,SUM(tm.NhanSo) as SLTS, ct.NoiDungCuocThi, ct.SoVongThi, ct.MaThangDiem, ct.MaTrangThai, ct.MaPhanThi
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm
  JOIN hinhthuccuocthi ht JOIN diadiem dd 
  WHERE ct.MaCuocThi = ctth.MaCuocThi AND ctth.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaTietMuc = tm.MaTietMuc AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi AND ct.MaDiaDiem = dd.MaDiaDiem AND ht.MaHinhThucCuocThi = 1
  GROUP BY ct.MaCuocThi) tb`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

const getAllThongKeTheoNgay = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.NgayBatDau DESC, tb.MaCuocThi DESC) stt 
  FROM (SELECT ct.MaCuocThi, ct.TenCuocThi, ct.NgayBatDau, ct.NgayKetThuc, ht.TenHinhThuc, dd.TenDiaDiem, COUNT(*) as SLTM, sumtb.SLTS, ct.NoiDungCuocThi, ct.SoVongThi, ct.MaThangDiem, ct.MaTrangThai, ct.MaPhanThi
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN hinhthuccuocthi ht JOIN diadiem dd
  JOIN (SELECT ctct.MaCuocThi, SUM(tm.NhanSo) as SLTS
  FROM chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm 
  WHERE ctct.MaTietMuc = tm.MaTietMuc AND ctct.VongThi = 1
  GROUP BY ctct.MaCuocThi) sumtb      
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi 
  AND dd.MaDiaDiem = ct.MaDiaDiem AND ht.MaHinhThucCuocThi = 2 AND sumtb.MaCuocThi = ct.MaCuocThi
  GROUP BY ct.MaCuocThi
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, ct.NgayBatDau, ct.NgayKetThuc, ht.TenHinhThuc, dd.TenDiaDiem, COUNT(*) as SLTM,SUM(tm.NhanSo) as SLTS, ct.NoiDungCuocThi, ct.SoVongThi, ct.MaThangDiem, ct.MaTrangThai, ct.MaPhanThi
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm
  JOIN hinhthuccuocthi ht JOIN diadiem dd 
  WHERE ct.MaCuocThi = ctth.MaCuocThi AND ctth.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaTietMuc = tm.MaTietMuc AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi AND ct.MaDiaDiem = dd.MaDiaDiem AND ht.MaHinhThucCuocThi = 1
  GROUP BY ct.MaCuocThi) tb
  WHERE (DATE_FORMAT(tb.NgayBatDau, '%Y-%m-%d') BETWEEN ? AND ?) OR (DATE_FORMAT(tb.NgayKetThuc, '%Y-%m-%d') BETWEEN ? AND ?)
  OR (DATE_FORMAT(tb.NgayBatDau, '%Y-%m-%d') <= ? AND DATE_FORMAT(tb.NgayKetThuc, '%Y-%m-%d') >= ?)
  OR (DATE_FORMAT(tb.NgayBatDau, '%Y-%m-%d') <= ? AND DATE_FORMAT(tb.NgayKetThuc, '%Y-%m-%d') >= ?)
  `;
  db.query(
    sqlSelect,
    [
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

const getAllThongKeTheoThang = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.NgayBatDau DESC, tb.MaCuocThi DESC) stt 
  FROM (SELECT ct.MaCuocThi, ct.TenCuocThi, ct.NgayBatDau, ct.NgayKetThuc, ht.TenHinhThuc, dd.TenDiaDiem, COUNT(*) as SLTM, sumtb.SLTS, ct.NoiDungCuocThi, ct.SoVongThi, ct.MaThangDiem, ct.MaTrangThai, ct.MaPhanThi
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN hinhthuccuocthi ht JOIN diadiem dd
  JOIN (SELECT ctct.MaCuocThi, SUM(tm.NhanSo) as SLTS
  FROM chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm 
  WHERE ctct.MaTietMuc = tm.MaTietMuc AND ctct.VongThi = 1
  GROUP BY ctct.MaCuocThi) sumtb      
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi 
  AND dd.MaDiaDiem = ct.MaDiaDiem AND ht.MaHinhThucCuocThi = 2 AND sumtb.MaCuocThi = ct.MaCuocThi
  GROUP BY ct.MaCuocThi
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, ct.NgayBatDau, ct.NgayKetThuc, ht.TenHinhThuc, dd.TenDiaDiem, COUNT(*) as SLTM,SUM(tm.NhanSo) as SLTS, ct.NoiDungCuocThi, ct.SoVongThi, ct.MaThangDiem, ct.MaTrangThai, ct.MaPhanThi
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm
  JOIN hinhthuccuocthi ht JOIN diadiem dd 
  WHERE ct.MaCuocThi = ctth.MaCuocThi AND ctth.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaTietMuc = tm.MaTietMuc AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi AND ct.MaDiaDiem = dd.MaDiaDiem AND ht.MaHinhThucCuocThi = 1
  GROUP BY ct.MaCuocThi) tb
  WHERE DATE_FORMAT(tb.NgayBatDau, '%Y-%m') BETWEEN ? AND ?
  `;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllThongKeTheoNam = async (req, res) => {
  const NgayBatDau = req.body.NgayBatDau;
  const NgayKetThuc = req.body.NgayKetThuc;
  const sqlSelect = `SELECT *, ROW_NUMBER() OVER (ORDER BY tb.NgayBatDau DESC, tb.MaCuocThi DESC) stt 
  FROM (SELECT ct.MaCuocThi, ct.TenCuocThi, ct.NgayBatDau, ct.NgayKetThuc, ht.TenHinhThuc, dd.TenDiaDiem, COUNT(*) as SLTM, sumtb.SLTS, ct.NoiDungCuocThi, ct.SoVongThi, ct.MaThangDiem, ct.MaTrangThai, ct.MaPhanThi
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN hinhthuccuocthi ht JOIN diadiem dd
  JOIN (SELECT ctct.MaCuocThi, SUM(tm.NhanSo) as SLTS
  FROM chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm 
  WHERE ctct.MaTietMuc = tm.MaTietMuc AND ctct.VongThi = 1
  GROUP BY ctct.MaCuocThi) sumtb      
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi 
  AND dd.MaDiaDiem = ct.MaDiaDiem AND ht.MaHinhThucCuocThi = 2 AND sumtb.MaCuocThi = ct.MaCuocThi
  GROUP BY ct.MaCuocThi
  UNION ALL
  SELECT ct.MaCuocThi, ct.TenCuocThi, ct.NgayBatDau, ct.NgayKetThuc, ht.TenHinhThuc, dd.TenDiaDiem, COUNT(*) as SLTM,SUM(tm.NhanSo) as SLTS, ct.NoiDungCuocThi, ct.SoVongThi, ct.MaThangDiem, ct.MaTrangThai, ct.MaPhanThi
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm
  JOIN hinhthuccuocthi ht JOIN diadiem dd 
  WHERE ct.MaCuocThi = ctth.MaCuocThi AND ctth.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaTietMuc = tm.MaTietMuc AND ht.MaHinhThucCuocThi = ct.MaHinhThucCuocThi AND ct.MaDiaDiem = dd.MaDiaDiem AND ht.MaHinhThucCuocThi = 1
  GROUP BY ct.MaCuocThi) tb
  WHERE DATE_FORMAT(tb.NgayBatDau, '%Y') BETWEEN ? AND ?
  `;
  db.query(sqlSelect, [NgayBatDau, NgayKetThuc], (err, result) => {
    res.send(result);
  });
};

const getAllThongKeCuocThiCuThe = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT ltm.TenLoaiTietMuc as name, COUNT(*) AS SLTM, ntb.SLTS
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  JOIN(SELECT tb.MaLoaiTietMuc, COUNT(*) AS SLTS FROM (SELECT DISTINCT ltm.MaLoaiTietMuc, tstm.MaThiSinh
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm 
  JOIN loaitietmuc ltm JOIN thisinhtrinhbaytietmuc tstm
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND tstm.MaTietMuc = tm.MaTietMuc
  AND ct.MaCuocThi = ?) tb
  GROUP BY tb.MaLoaiTietMuc) ntb
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ct.MaCuocThi = ? AND ltm.MaLoaiTietMuc = ntb.MaLoaiTietMuc
  GROUP BY ltm.MaLoaiTietMuc
  UNION ALL
  SELECT ltm.TenLoaiTietMuc AS name, COUNT(*) AS SLTM, ntb.SLTS
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  JOIN (SELECT tb.MaLoaiTietMuc, COUNT(*) AS SLTS
  FROM (SELECT DISTINCT ltm.MaLoaiTietMuc, tsdd.MaThiSinh
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN doandoitrinhbaytietmuc ddtm 
  JOIN doandoi dd JOIN thisinhthuocdoandoi tsdd JOIN loaitietmuc ltm
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = ddtm.MaTietMuc AND ddtm.MaDoanDoi = dd.MaDoanDoi 
  AND dd.MaDoanDoi = tsdd.MaDoanDoi AND ddtm.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ct.MaCuocThi = ?) tb
  GROUP BY tb.MaLoaiTietMuc) ntb
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ltm.MaLoaiTietMuc = ntb.MaLoaiTietMuc AND ct.MaCuocThi = ?
  GROUP BY ltm.MaLoaiTietMuc
  UNION ALL
  SELECT ltm.TenLoaiTietMuc as name, COUNT(*) SLTM, tb.SLTS
  FROM chitietcuocthitruyenthong ctth JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  JOIN (SELECT ltm.MaLoaiTietMuc, COUNT(*) as SLTS
  FROM chitietcuocthitruyenthong ctth JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm 
  JOIN thisinhtrinhbaytietmuc tstm JOIN loaitietmuc ltm
  WHERE ctth.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaTietMuc = tstm.MaTietMuc AND tstm.MaTietMuc = tm.MaTietMuc 
  AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc AND ctth.MaCuocThi = ?
  GROUP BY ltm.MaLoaiTietMuc) tb
  WHERE ctth.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ltm.MaLoaiTietMuc = tb.MaLoaiTietMuc AND ctth.MaCuocThi = ?
  GROUP BY ltm.MaLoaiTietMuc`;
  db.query(
    sqlSelect,
    [idCuocThi, idCuocThi, idCuocThi, idCuocThi, idCuocThi, idCuocThi],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllThongKeCuocThiCuTheSoNgay = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT DISTINCT DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') as NgayThi
  FROM chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm
  WHERE ctct.MaTietMuc = tm.MaTietMuc 
  AND ctct.MaCuocThi = ?
  UNION ALL
  SELECT DISTINCT DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') as NgayThi
  FROM chitietcuocthitruyenthong ctth JOIN chitietchuongtrinh ctr JOIN tietmucvannghe tm
  WHERE ctth.MaChuongTrinh = ctr.MaChuongTrinh AND ctr.MaTietMuc = tm.MaTietMuc 
  AND ctth.MaCuocThi = ?`;
  db.query(sqlSelect, [idCuocThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllThongKeCuocThiCuTheTatCaNgay = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') as name, COUNT(*) AS SLTM, SUM(tm.NhanSo) AS SLTS
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm 
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc
  AND ct.MaCuocThi = ?
  GROUP BY DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d')
  UNION ALL
  SELECT DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') as name, COUNT(*) AS SLTM, SUM(tm.NhanSo) AS SLTS
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctth JOIN chitietchuongtrinh ctctr JOIN tietmucvannghe tm
  WHERE ct.MaCuocThi = ctth.MaCuocThi AND ctth.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaTietMuc = tm.MaTietMuc
  AND ct.MaCuocThi = ?
  GROUP BY DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d')`;
  db.query(sqlSelect, [idCuocThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllThongKeCuocThiCuTheTheoNgay = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const ngayChon = req.body.NgayChon;
  const sqlSelect = `SELECT ltm.TenLoaiTietMuc as name, COUNT(*) AS SLTM, SUM(tm.NhanSo) as SLTS
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ct.MaCuocThi = ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') = DATE_FORMAT(?, '%Y-%m-%d')
  GROUP BY ltm.TenLoaiTietMuc
  UNION ALL
  SELECT ltm.TenLoaiTietMuc as name, COUNT(*) AS SLTM, SUM(tm.NhanSo) as SLTS
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctct JOIN chitietchuongtrinh ctctr 
  JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaTietMuc = tm.MaTietMuc 
  AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND ct.MaCuocThi = ? AND DATE_FORMAT(tm.NgayGioThucHien, '%Y-%m-%d') = DATE_FORMAT(?, '%Y-%m-%d')
  GROUP BY ltm.TenLoaiTietMuc
  UNION ALL 
  SELECT ltm.TenLoaiTietMuc as name, COUNT(*) AS SLTM, SUM(tm.NhanSo) as SLTS
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ct.MaCuocThi = ? AND tm.NgayGioThucHien is null
  GROUP BY ltm.TenLoaiTietMuc
  UNION ALL
  SELECT ltm.TenLoaiTietMuc as name, COUNT(*) AS SLTM, SUM(tm.NhanSo) as SLTS
  FROM cuocthivannghe ct JOIN chitietcuocthitruyenthong ctct JOIN chitietchuongtrinh ctctr 
  JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaChuongTrinh = ctctr.MaChuongTrinh AND ctctr.MaTietMuc = tm.MaTietMuc 
  AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc 
  AND ct.MaCuocThi = ? AND tm.NgayGioThucHien is null
  GROUP BY ltm.TenLoaiTietMuc`;
  db.query(
    sqlSelect,
    [idCuocThi, ngayChon, idCuocThi, ngayChon, idCuocThi, idCuocThi],
    (err, result) => {
      res.send(result);
    }
  );
};

const getAllThongKeCuocThiCuTheSoVong = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT DISTINCT ctct.VongThi, ct.SoVongThi
  FROM chitietcuocthidangkytudo ctct JOIN cuocthivannghe ct 
  WHERE ctct.MaCuocThi = ct.MaCuocThi 
  AND ct.MaCuocThi = ?
  UNION ALL
  SELECT DISTINCT -1 as VongThi, -1 as SoVongThi FROM chitietcuocthitruyenthong ctth
  WHERE ctth.MaCuocThi = ?`;
  db.query(sqlSelect, [idCuocThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllThongKeCuocThiCuTheTatCaVong = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const sqlSelect = `SELECT ctct.VongThi as name, COUNT(*) AS SLTM, SUM(tm.NhanSo) as SLTS, (COUNT(*) - tb.SLTMD) as SLTMD, ct.SoVongThi
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  JOIN (SELECT ctct.VongThi, COUNT(*) AS SLTMD
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ct.MaCuocThi = ? AND ctct.TrangThai is null
  GROUP BY ctct.VongThi) tb
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ct.MaCuocThi = ? AND tb.VongThi = ctct.VongThi
  GROUP BY ctct.VongThi`;
  db.query(sqlSelect, [idCuocThi, idCuocThi], (err, result) => {
    res.send(result);
  });
};

const getAllThongKeCuocThiCuTheTheoVong = async (req, res) => {
  const idCuocThi = req.params.idCuocThi;
  const vongThi = req.body.VongThi;
  const sqlSelect = `SELECT ltm.TenLoaiTietMuc as name, COUNT(*) AS SLTM, SUM(tm.NhanSo) as SLTS, (COUNT(*) - tb.SLTMD) as SLTMD
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  JOIN (SELECT ltm.TenLoaiTietMuc, COUNT(*) AS SLTMD
  FROM cuocthivannghe ct JOIN chitietcuocthidangkytudo ctct JOIN tietmucvannghe tm JOIN loaitietmuc ltm
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ctct.TrangThai is null AND ct.MaCuocThi = ? AND ctct.VongThi = ?
  GROUP BY ltm.TenLoaiTietMuc) tb
  WHERE ct.MaCuocThi = ctct.MaCuocThi AND ctct.MaTietMuc = tm.MaTietMuc AND tm.MaLoaiTietMuc = ltm.MaLoaiTietMuc
  AND ltm.TenLoaiTietMuc = tb.TenLoaiTietMuc AND ct.MaCuocThi = ? AND ctct.VongThi = ?
  GROUP BY ltm.TenLoaiTietMuc`;
  db.query(
    sqlSelect,
    [idCuocThi, vongThi, idCuocThi, vongThi],
    (err, result) => {
      res.send(result);
    }
  );
};

////////////////////////////////////////////////////////////////////////
////Action Login và Logout
////////////////////////////////////////////////////////////////////////
const getAdminGetLogin = async (req, res) => {
  if (req.session.admin) {
    successLogin.isLogin = true;
    successLogin.info = req.session.admin;
    res.send(successLogin);
  } else {
    successLogin.isLogin = false;
    successLogin.info = {};
    res.send(successLogin);
  }
  // Ensure the input fields exists and are not empty
};

const getAdminLogin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  db.query(
    "SELECT * FROM nguoidung WHERE taikhoan = ?",
    [username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        db.query(
          "SELECT * FROM nguoidung WHERE taikhoan = ? AND matkhau = ?",
          [username, password],
          function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
              // Authenticate the user
              req.session.admin = results;
              // Redirect to home page
              successLogin.isLogin = true;
              successLogin.message = "da login";
              successLogin.info = req.session.admin;
              res.send(successLogin);
            } else {
              successLogin.isLogin = false;
              successLogin.message = "Sai tài khoản hoặc mật khẩu.";
              res.send(successLogin);
            }
          }
        );
      } else {
        successLogin.isLogin = false;
        successLogin.message = "Tài khoản không tồn tại.";
        res.send(successLogin);
      }
    }
  );
  // Ensure the input fields exists and are not empty
};

const getAdminLogout = async (req, res) => {
  if (req.session.admin) {
    successLogin.isLogin = false;
    successLogin.info = {};
    req.session.destroy();
    res.send(successLogin);
  } else {
    res.send(successLogin);
  }
};

////////////////////////////////////////////////////////////////////////

module.exports = {
  getAllChuongTrinh,
  getAllCuocThi,
  getAllDiaDiem,
  getAllDonViToChuc,
  getAllLoaiTietMuc,
  getAllTrangThai,
  getAddChuongTrinh,
  getAdminLogin,
  getAdminLogout,
  getAdminGetLogin,
  getAllDoanDoi,
  getAllThiSinh,
  getAllNguoiDung,
  getDetailChuongTrinh,
  getAllTietMucThuocChuongTrinh,
  getThiSinhThuocDonVi,
  getThiSinhThamDuChuongTrinh,
  getAddTietMucChuongTrinh,
  getAddChuongTrinhTruyenThong,
  getAddDangKyTheLoaiTuDo,
  getAllNguoiDungTruongNhom,
  getAllChuyenMon,
  getAddGiamKhao,
  getAddQuanTriVien,
  getAddTruongNhom,
  getAddDoanDoi,
  getDetailCuocThi,
  getAllChuongTrinhThuocCuocThi,
  getAllGiamKhaoCuocThi,
  getAllGiamKhaoKhongThuocCuocThi,
  getDetailDoanDoi,
  getThiSinhThuocDoanDoi,
  getAllTietMucThuocCuocThiDoiNhom,
  getAllTietMucThuocCuocThiCaNhan,
  getAllThiSinhThamDuCuocThiCaNhan,
  getAllThiSinhThamDuCuocThiDoiNhom,
  getAddThanhVienDoanDoi,
  getAllDoanDoiCoNhanSoToiThieu,
  getAllThiSinhDauVongTruoc,
  getAllDoanDoiDauVongTruoc,
  getAddTietMucCaNhan,
  getAddTietMucDoiNhom,
  getDetailTietMuc,
  getAllThiSinhTrinhBayTietMuc,
  getAllDoiNhomTrinhBayTietMuc,
  getAddChuongTrinhDuThi,
  getAllMaGiamKhaoCuocThi,
  getAllTietMucChuongTrinhVanNghe,
  getAllTietMucChuongTrinhDuThi,
  getAllTietMucDoiNhom,
  getAllTietMucCaNhan,
  getThiSinhThuocDoanDoiTruongDonVi,
  getAddGiamKhaoCuocThi,
  getAllNguoiDungTruongNhomCoDoanDoi,
  getUpdateThongTinCuocThi,
  getUpdateDoanDoi,
  getAddThiSinh,
  getUpdateThongTinThiSinh,
  getDetailQuanTriVien,
  getAllDataLocChuongTrinhTheoNgay,
  getAllDataLocChuongTrinhTheoThang,
  getAllDataLocChuongTrinhTheoNam,
  getAllDataLocCuocThiTheoNgay,
  getAllDataLocCuocThiTheoThang,
  getAllDataLocCuocThiTheoNam,
  getAllDoiNhomKhongTrinhBayNhanSoTietMucCoDinh,
  getAllDoiNhomKhongTrinhBayNhanSoTietMucKhongCoDinh,
  getAllThiSinhKhongTrinhBayTietMucCaNhan,
  getAllCuocThiChuaHoacDangDienRa,
  getAllThongKe,
  getAllThongKeCuocThiCuThe,
  getAllThongKeTheoNgay,
  getAllThongKeTheoThang,
  getAllThongKeTheoNam,
  getAllTietMucCaNhanTheoNgay,
  getAllTietMucCaNhanTheoThang,
  getAllTietMucCaNhanTheoNam,
  getAllTietMucChuongTrinhDuThiTheoNgay,
  getAllTietMucChuongTrinhDuThiTheoThang,
  getAllTietMucChuongTrinhDuThiTheoNam,
  getAllTietMucDoiNhomTheoNgay,
  getAllTietMucDoiNhomTheoThang,
  getAllTietMucDoiNhomTheoNam,
  getDeleteTietMuc,
  getAddLoaiTietMuc,
  getUpdateLoaiTietMuc,
  getDeleteLoaiTietMuc,
  getDeleteDoanDoi,
  getUpdateThanhVienDoanDoi,
  getDeleteThanhVien,
  getAllNguoiDungTruongNhomTheoDonVi,
  getDeleteChuongTrinh,
  getAllGiaiThuong,
  getAddDiaDiem,
  getUpdateDiaDiem,
  getDeleteDiaDiem,
  getAddDonViToChuc,
  getUpdateDonViToChuc,
  getDeleteDonViToChuc,
  getAddGiaiThuong,
  getUpdateGiaiThuong,
  getDeleteGiaiThuong,
  getUpdateCongBoKetQuaThiChuongTrinh,
  getUpdateCongBoKetQuaCuocThiTuDo,
  getAllChuongTrinhThuocCuocThiTheoNgay,
  getUpdateChuongTrinh,
  getDeleteGiamKhaoCuocThi,
  getUpdateTrangThaiTietMuc,
  getAllTietMucThuocCuocThiCaNhanTheoNgay,
  getAllTietMucThuocCuocThiDoiNhomTheoNgay,
  getAllThiSinhChuongTrinhKhongTrinhBay,
  getAddThanhVienBoSungTrinhBayTietMuc,
  getDeleteThanhVienTrinhBayTietMuc,
  getAllDoanDoiPhuHopTietMucNhanSoCoDinh,
  getUpdateTietMuc,
  getUpdateThiSinhTrinhBay,
  getAllLoaiTietMucPhuHop,
  getChangeDoanDoiTrinhBay,
  getUpdateNguoiDung,
  getUpdateNguoiDungTruongNhomThiSinh,
  getAllThongKeCuocThiCuTheSoNgay,
  getAllThongKeCuocThiCuTheSoVong,
  getAllThongKeCuocThiCuTheTatCaNgay,
  getAllThongKeCuocThiCuTheTheoNgay,
  getAllThongKeCuocThiCuTheTatCaVong,
  getAllThongKeCuocThiCuTheTheoVong,
  getChangeMatkhau,
  getUpdateThongTinCaNhanNguoiDung,
  getUpdateThongTinCaNhanTruongNhomThiSinh,
  getAllChiTietChuongTrinhThuocCuocThi,
  getAllTietMucCaCuocThi,
  getAllTietMucCaCuocThiChuongTrinh,
  getAllThiSinhCuocThiChuongTrinh,
  getAllThiSinhCaCuocThi,
  getTietMucThamDuCuaDoanDoi,
  getAllThiSinhTrinhBayTietMucChuongTrinh,
  getAllMaTietMucCuocThi,
  getAddTietMucCaNhanKhongGiamKhao,
  getAddTietMucDoiNhomKhongGiamKhao,
  getAddTietMucChuongTrinhKhongGiamKhao
};
