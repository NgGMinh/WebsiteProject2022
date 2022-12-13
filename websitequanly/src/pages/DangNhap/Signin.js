import React from "react";
import "./Signin.css";
import { Login, AccountCircle, Person, Lock } from "@mui/icons-material";

export default function Signin() {
  return (
    <div className="container-fluid body-bg">
      <div className="container">
        <div className="form-box">
          <div className="header-form">
            <h4 className="text-primary text-center">
              <AccountCircle style={{ fontSize: "110px" }} />
            </h4>
            <div className="image"></div>
          </div>
          <div className="body-form">
            <form>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text none-border-radius-right" >
                    <Person />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text none-border-radius-right" >
                    <Lock />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-block buttonLogin"
              >
               LOGIN
              </button>
              <div className="message">
                {/* <div>
                <input type="checkbox" /> Remember ME
              </div>
              <div>
                <a href="#">Forgot your password</a>
              </div> */}
              </div>
            </form>
            {/* <div className="social">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-google"></i>
            </a>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
