const express = require("express");
const router = express.Router();

// import controllers
const TestController = require("../apps/controllers/test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const CategoryController = require("../apps/controllers/category");
const UserController = require("../apps/controllers/user");

// mặc định controllers đc hệ thống truyền vào req, res
router.get("/test1", TestController.Test1);
// router.get("/test2/:id", TestController.Test2);
// --------------------------------

// Router Backend
router.get("/", (req, res) => {
  res.send("<h1>Welcome NodeJS !</h1>");
});

router.get("/admin/login", AuthController.logIn);
router.post("/admin/login", AuthController.postLogin);

router.get("/admin/logout", AuthController.logOut);
router.get("/admin/dashboard", AdminController.index);
//////////////////
router.get("/admin/users", UserController.index);
router.get("/admin/users/create", UserController.create);
router.get("/admin/users/edit/:id", UserController.edit);
router.get("/admin/users/delete/:id", UserController.del);
//////////////////
router.get("/admin/categories", CategoryController.index);
router.get("/admin/categories/create", CategoryController.create);
router.get("/admin/categories/edit/:id", CategoryController.edit);
router.get("/admin/categories/delete/:id", CategoryController.del);
router.get("/admin/products", ProductController.index);
router.get("/admin/products/create", ProductController.create);
router.get("/admin/products/edit/:id", ProductController.edit);
router.get("/admin/products/delete/:id", ProductController.del);

// Router Frontend

module.exports = router;
