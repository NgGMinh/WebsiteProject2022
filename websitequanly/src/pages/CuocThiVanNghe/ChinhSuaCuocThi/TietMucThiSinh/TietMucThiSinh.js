/* eslint-disable eqeqeq */
import { MusicNote } from "@mui/icons-material";
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import TietMucThiSinhVongChungKet from "./TietMucThiSinhVongChungKet";
import TietMucThiSinhVongChungKhao from "./TietMucThiSinhVongChungKhao";

import TietMucThiSinhVongSoTuyen from "./TietMucThiSinhVongSoTuyen";

export default function TietMucThiSinh(props) {
  return (
    <Tabs defaultActiveKey="vong1" className="my-3 responsive-tab">
      <Tab
        eventKey="vong1"
        title={
          <>
            <strong style={{ color: "#0d6efd" }}>Vòng Sơ Tuyển</strong>
          </>
        }
      >
        <div>
          <h2 className="text-center d-flex align-items-center justify-content-center pt-2">
            <MusicNote style={{ fontSize: "2.6rem" }} /> Tiết Mục Dự Thi
            <MusicNote style={{ fontSize: "2.6rem" }} />
          </h2>
        </div>
        <TietMucThiSinhVongSoTuyen
          phanThi={props.phanThi}
          setRefresh={props.setRefresh}
          trangThai={props.trangThai}
        />
      </Tab>

      <Tab
        eventKey="vong2"
        title={
          props.SoVongThi == 2 ? (
            <>
              <strong style={{ color: "#0d6efd" }}>Vòng Chung Kết</strong>
            </>
          ) : (
            <>
              <strong style={{ color: "#0d6efd" }}>Vòng Chung Khảo</strong>
            </>
          )
        }
      >
        <div>
          <h2 className="text-center d-flex align-items-center justify-content-center pt-2">
            <MusicNote style={{ fontSize: "2.6rem" }} /> Tiết Mục Dự Thi
            <MusicNote style={{ fontSize: "2.6rem" }} />
          </h2>
        </div>
        <TietMucThiSinhVongChungKhao
          phanThi={props.phanThi}
          soVongThi={props.SoVongThi}
          setRefresh={props.setRefresh}
          trangThai={props.trangThai}
        />
      </Tab>

      {props.SoVongThi == 2 ? (
        <></>
      ) : (
        <Tab
          eventKey="vong3"
          title={
            <>
              <strong style={{ color: "#0d6efd" }}>Vòng Chung Kết</strong>
            </>
          }
        >
          <div>
            <h2 className="text-center d-flex align-items-center justify-content-center pt-2">
              <MusicNote style={{ fontSize: "2.6rem" }} /> Tiết Mục Dự Thi
              <MusicNote style={{ fontSize: "2.6rem" }} />
            </h2>
          </div>
          <TietMucThiSinhVongChungKet
            phanThi={props.phanThi}
            setRefresh={props.setRefresh}
            trangThai={props.trangThai}
          />
        </Tab>
      )}
    </Tabs>
  );
}
