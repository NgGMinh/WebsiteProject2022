const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

var nodemailer = require('nodemailer');

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "exp://192.168.1.7:19000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

app.use(cors({origin: true, credentials: true}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 86400000,
      // maxAge: 10000,
    },
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const adminRouter = require("./websitequanly/routes/adminRouter.js");
const db = require("./websitequanly/models/index.js");
app.use("/api/admin", adminRouter);

const clientRouter = require("./websitequanly/routes/clientRouter.js");
app.use("/api/client", clientRouter);

app.post("/mailto", (req, res) => {
  let mail = req.body.mail;
  let title = req.body.title;
  let noidungEmail = req.body.noidungEmail;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ngminh9520@gmail.com',
      pass: 'dvqaknpaarkenfvj'
    },
    tls:{rejectUnauthorized:false}
  });

  var mailOptions = {
    from: 'ngminh9520@gmail.com',
    to: mail,
    subject: title,
    html: noidungEmail
  };

  transporter.sendMail(mailOptions);
});

let successLogin = {
  isLogin: false,
  message: "",
  info: {},
};

app.get("/login", (req, res) => {
  if (req.session.user) {
    successLogin.isLogin = true;
    successLogin.info = req.session.user;
    res.send(successLogin);
  } else {
    successLogin.isLogin = false;
    successLogin.info = {};
    res.send(successLogin);
  }
});

app.post("/login", (req, res) => {
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
              req.session.user = results;
              // Redirect to home page
              successLogin.isLogin = true;
              successLogin.message = "da login";
              successLogin.info = req.session.user;
              res.send(successLogin);
            } else {
              successLogin.message = "Mật khẩu của bạn đã nhập sai";
              res.send(successLogin);
            }
          }
        );
      } else {
        successLogin.message = "Tài khoản này không tồn tại";
        res.send(successLogin);
      }
    }
  );
  // Ensure the input fields exists and are not empty
});

app.use(express.static('img'));
app.listen(3001, () => {
  console.log("server is running on port 3001");
});
