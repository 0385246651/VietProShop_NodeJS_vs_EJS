const express = require("express");
const router = express.Router();

// import controllers
const TestController = require("../apps/controllers/test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const CategoryController = require("../apps/controllers/category");
const UserController = require("../apps/controllers/user");

//import middleware
const UploadMiddleware = require("../apps/middlewares/upload")
const AuthMiddleware = require("../apps/middlewares/auth")

// mặc định controllers đc hệ thống truyền vào req, res
router.get("/test1", TestController.Test1);
router.get("/test2", TestController.Test2);
// --------------------------------

// Router Backend
router.get("/", (req, res) => {
  res.send("<h1>Welcome NodeJS !</h1>");
});

router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.logIn);
router.post("/admin/login", AuthMiddleware.checkLogin, AuthController.postLogin);

router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logOut);

router.get("/admin/dashboard", AuthMiddleware.checkAdmin, AdminController.index);
//////////////////
router.get("/admin/users", AuthMiddleware.checkAdmin, UserController.index);
router.get("/admin/users/create", AuthMiddleware.checkAdmin, UserController.create);
router.post("/admin/users/store", AuthMiddleware.checkAdmin, UserController.store);
router.get("/admin/users/edit/:id", AuthMiddleware.checkAdmin, UserController.edit);
router.post("/admin/users/update/:id", AuthMiddleware.checkAdmin, UserController.update);
router.get("/admin/users/delete/:id", AuthMiddleware.checkAdmin, UserController.del);
//////////////////
router.get("/admin/categories", AuthMiddleware.checkAdmin, CategoryController.index);
router.get("/admin/categories/create", AuthMiddleware.checkAdmin, CategoryController.create);
router.post("/admin/categories/store", AuthMiddleware.checkAdmin, CategoryController.store);
router.get("/admin/categories/edit/:id", AuthMiddleware.checkAdmin, CategoryController.edit);
router.post("/admin/categories/update/:id", AuthMiddleware.checkAdmin, CategoryController.update);
router.get("/admin/categories/delete/:id", AuthMiddleware.checkAdmin, CategoryController.del);

router.get("/admin/products", AuthMiddleware.checkAdmin, ProductController.index);
router.get("/admin/products/create", AuthMiddleware.checkAdmin, ProductController.create);
router.post("/admin/products/store", AuthMiddleware.checkAdmin, UploadMiddleware.single("thumbnail"), ProductController.store);
router.get("/admin/products/edit/:id", AuthMiddleware.checkAdmin, ProductController.edit);
router.post("/admin/products/update/:id", AuthMiddleware.checkAdmin, UploadMiddleware.single("thumbnail"), ProductController.update);
router.get("/admin/products/delete/:id", AuthMiddleware.checkAdmin, ProductController.del);


// Router Frontend

module.exports = router;
