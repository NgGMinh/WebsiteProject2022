/* eslint-disable eqeqeq */
import React from "react";
import { Row, Tabs, Tab } from "react-bootstrap";
import { MusicNote } from "@mui/icons-material";
import Axios from "axios";
import TatCaDiaDiem from "./DiaDiem/TatCaDiaDiem";
import TatCaDonVi from "./DonVi/TatCaDonVi";
import TatCaGiaiThuong from "./GiaiThuong/TatCaGiaiThuong";

export default function DieuChinhThongTin() {
  Axios.defaults.withCredentials = true;

  return (
    <>
      <Row className="pt-2 pb-3">
        <h2 className="text-center d-flex align-items-center justify-content-center pb-2">
          <MusicNote style={{ fontSize: "2.6rem" }} />
          Điều Chỉnh Thông Tin
          <MusicNote style={{ fontSize: "2.6rem" }} />
        </h2>
      </Row>
      <Tabs
        defaultActiveKey="tatcadiadiem"
        id="uncontrolled-tab-example"
        className="responsive-tab mb-3"
      >
        <Tab
          eventKey="tatcadiadiem"
          title="Địa Điểm Tổ Chức"
          style={{ minHeight: "600px", width: "100%" }}
        >
          <div>
            <TatCaDiaDiem />
          </div>
        </Tab>
        <Tab
          eventKey="tatcadonvi"
          title="Đơn Vị Tổ Chức"
          style={{ minHeight: "600px", width: "100%" }}
        >
          <div>
            <TatCaDonVi />
          </div>
        </Tab>
        <Tab
          eventKey="tatcagiaithuong"
          title="Loại Giải Thưởng"
          style={{ minHeight: "600px", width: "100%" }}
        >
          <div>
            <TatCaGiaiThuong />
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
