const express = require("express");
const app = express();
const config = require("config");
const session = require("express-session");

//config session
app.set('trust proxy', 1) 
app.use(session({ 
     secret: config.get('app.sessionKey'),
       resave: false,
         saveUninitialized: true,
           cookie: { secure: false 
}}));

// config template engine ejs tham số 1 là tên thư mục chưa views , tham số 2 là đường dẫn
// lấy ở config app file default.js
app.set("views", config.get("app.viewsFolder"));
app.set("view engine", config.get("app.viewEngine"));

//config static folder định nghĩa đường dẫn /static là đến thư mục public
app.use("/static", express.static(config.get("app.staticFolder")));

//config images  static folder
app.use("/images", express.static(config.get("app.staticImages")));

// http://localhost:9000/static/css/style.css
//config formdata (lấy du lieu tu form)
app.use(express.urlencoded({ extended: true }));
// lấy dữ liệu Json
app.use(express.json());

//config router
// config phải đặt trên router
app.use(require(config.get("app.router")));

module.exports = app;
