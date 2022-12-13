import React from "react";
import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Reload() {
  const navigate = useNavigate();
  useEffect(() => {
    window.location.reload(1);
    if (localStorage.getItem("chucvu") == 1) {
      navigate("/home");
    } else {
      navigate("/userhome");
    }
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Spinner
        animation="border"
        variant="primary"
        id="spinner"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: "50px",
          height: "50px",
        }}
      />
    </div>
  );
}
