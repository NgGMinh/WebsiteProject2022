/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import TietMucVongBa from "./TietMucVongBa/TietMucDoanDoiVongBa";
import TietMucVongHai from "./TietMucVongHai/TietMucDoanDoiVongHai";
import TietMucVongMot from "./TietMucVongMot/TietMucDoanDoiVongMot";

export default function TietMucCuocThiDoanDoi(props) {
  const params = useParams();
  const [soLuongTietMuc, setSoLuongTietMuc] = useState();
  const [soLuongTietMucVK, setSoLuongTietMucVK] = useState();

  useEffect(() => {
    const getDataCuocThiTuDo = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/cuocthi/${
          params.idCuocThi
        }/vongthi/1/truongnhom/${localStorage.getItem(
          "MaNguoiDung"
        )}/tietmucdau`
      );
      setSoLuongTietMuc(data.length);
    };
    getDataCuocThiTuDo();

    const getDataCuocThiTuDoVK = async () => {
      const { data } = await Axios.post(
        `http://localhost:3001/api/client/cuocthi/${
          params.idCuocThi
        }/vongthi/2/truongnhom/${localStorage.getItem(
          "MaNguoiDung"
        )}/tietmucdau`
      );
      setSoLuongTietMucVK(data.length);
    };
    getDataCuocThiTuDoVK();
  }, []);

  return (
    <>
      {soLuongTietMuc >= 1 ? (
        <>
          <Tabs defaultActiveKey="vongmot" className="my-3 responsive-tab">
            <Tab
              eventKey="vongmot"
              title={<strong className="text-primary">Vòng Sơ Tuyển</strong>}
            >
              <TietMucVongMot
                phanThi={props.phanThi}
                choPhepDangKy={props.choPhepDangKy}
              />
            </Tab>

            <Tab
              eventKey="vonghai"
              title={
                props.SoVongThi === 2 ? (
                  <strong className="text-primary">Vòng Chung Kết</strong>
                ) : (
                  <strong className="text-primary">Vòng Chung Khảo</strong>
                )
              }
            >
              <TietMucVongHai
                phanThi={props.phanThi}
                choPhepDangKy={props.choPhepDangKy}
              />
            </Tab>

            {props.SoVongThi == 2 ? (
              <></>
            ) : soLuongTietMucVK == 0 ? (
              <></>
            ) : (
              <Tab
                eventKey="vongba"
                title={<strong className="text-primary">Vòng Chung Kết</strong>}
              >
                <TietMucVongBa
                  phanThi={props.phanThi}
                  choPhepDangKy={props.choPhepDangKy}
                />
              </Tab>
            )}
          </Tabs>
        </>
      ) : (
        <>
          <TietMucVongMot
            phanThi={props.phanThi}
            choPhepDangKy={props.choPhepDangKy}
          />
        </>
      )}
    </>
  );
}
