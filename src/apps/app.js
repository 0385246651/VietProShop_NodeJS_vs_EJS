const express = require("express");
const app = express();
const config = require("config");
const session = require("express-session");
const cookieParser = require('cookie-parser');

//config session
app.set('trust proxy', 1)
app.use(session({
  secret: config.get('app.sessionKey'),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

// config template engine ejs tham số 1 là tên thư mục chưa views , tham số 2 là đường dẫn
// lấy ở config app file default.js
app.set("views", config.get("app.viewsFolder"));
app.set("view engine", config.get("app.viewEngine"));
//config.cookie
app.use(cookieParser());

//config static folder định nghĩa đường dẫn /static là đến thư mục public
app.use("/static", express.static(config.get("app.staticFolder")));

//config images  static folder
app.use("/images", express.static(config.get("app.staticImages")));
// config towsi file base imgages trogn public
app.use("/asset/upload/images", express.static(config.get("app.baseImageUrl")));

// http://localhost:9000/static/css/style.css
//config formdata (lấy du lieu tu form)
app.use(express.urlencoded({ extended: true }));
//config lấy dữ liệu json để chạy POST
app.use(express.json());
// lấy dữ liệu Json
app.use(express.json());

//config router
// config phải đặt trên router
app.use(require(config.get("app.router")));
//router cho api
app.use(config.get("app.prefixApiVersion"), require('../routers/api'));

module.exports = app;
