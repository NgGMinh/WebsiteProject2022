import { Row, Breadcrumb, Tabs, Tab } from "react-bootstrap";
import "./TietMucVanNghe.css";
import { MusicNote } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import TietMucCuocThiTruyenThong from "./TietMucCuocThi/TietMucCuocThiTruyenThong/TietMucCuocThiTruyenThong";
import TietMucCaNhan from "./TietMucCuocThi/TietMucCuocThiTuDo/TietMucCaNhan";
import TietMucDoiNhom from "./TietMucCuocThi/TietMucCuocThiTuDo/TietMucDoiNhom";
import LoaiTietMuc from "./LoaiTietMuc/LoaiTietMuc";

export default function TietMucVanNghe() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="#" tabIndex="-1">
          <Link to="/home" className="link">
            Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Tiết Mục Văn Nghệ</Breadcrumb.Item>
      </Breadcrumb>

      <div className="m-2" style={{ textAlign: "left" }}>
        <h2 className="text-center d-flex align-items-center justify-content-center pb-3">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Quản Lý Tiết Mục Văn Nghệ
          <MusicNote style={{ fontSize: "2.6rem" }} />
        </h2>

        <Row>
          <Tabs
            defaultActiveKey="chuongtrinhduthi"
            id="uncontrolled-tab-example"
            className="responsive-tab mb-3 mx-0 px-0"
          >
            <Tab
              eventKey="chuongtrinhduthi"
              title="Chương Trình Dự Thi"
              style={{ minHeight: "600px", width: "100%" }}
            >
              <div>
                <TietMucCuocThiTruyenThong />
              </div>
            </Tab>
            <Tab
              eventKey="cuocthicanhan"
              title="Cuộc Thi Cá Nhân"
              style={{ minHeight: "600px", width: "100%" }}
            >
              <div>
                <TietMucCaNhan />
              </div>
            </Tab>
            <Tab
              eventKey="cuocthidoinhom"
              title="Cuộc Thi Đội Nhóm"
              style={{ minHeight: "600px", width: "100%" }}
            >
              <div>
                <TietMucDoiNhom />
              </div>
            </Tab>
            <Tab
              eventKey="loaitietmuc"
              title="Loại Tiết Mục"
              style={{ minHeight: "600px", width: "100%" }}
            >
              <div>
                <LoaiTietMuc />
              </div>
            </Tab>
          </Tabs>
        </Row>
      </div>
    </>
  );
}
