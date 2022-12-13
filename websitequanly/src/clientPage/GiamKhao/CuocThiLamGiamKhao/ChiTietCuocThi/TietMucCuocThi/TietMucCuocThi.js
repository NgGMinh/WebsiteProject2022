/* eslint-disable eqeqeq */
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import TietMucVongMot from "./TietMucVongMot/TietMucVongMot";
import TietMucVongHai from "./TietMucVongHai/TietMucVongHai";
import TietMucVongBa from "./TietMucVongBa/TietMucVongBa";

export default function TietMucCuocThi(props) {
  console.log(props.SoVongThi)

  return (
    <Tabs defaultActiveKey="vongmot" className="my-3 responsive-tab">
      <Tab eventKey="vongmot" title={<strong>Vòng Sơ Tuyển</strong>}>
        <TietMucVongMot phanThi={props.phanThi} setRefresh={props.setRefresh} />
      </Tab>

      <Tab
        eventKey="vonghai"
        title={
          props.SoVongThi == 2
            ? <strong>Vòng Chung Kết</strong>
            : <strong>Vòng Chung Khảo</strong>
        }
      >
        <TietMucVongHai phanThi={props.phanThi} setRefresh={props.setRefresh} />
      </Tab>

      {props.SoVongThi == 2 ? (
        <></>
      ) : (
        <Tab eventKey="vongba" title={<strong>Vòng Chung Kết</strong>}>
          <TietMucVongBa phanThi={props.phanThi} setRefresh={props.setRefresh} />
        </Tab>
      )}
    </Tabs>
  );
}
