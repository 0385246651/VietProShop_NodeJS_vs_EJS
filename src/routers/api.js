const express = require("express");
const router = express.Router();

//import controller 
const SliderController = require("../apps/controllers/apis/slider");
const BannerController = require("../apps/controllers/apis/banner");
const AuthController = require("../apps/controllers/apis/auth");

const CategoryController = require("../apps/controllers/apis/category");
const ProductController = require("../apps/controllers/apis/product");
const OrderController = require("../apps/controllers/apis/order");

//import middleware
const AuthCustomerMiddleware = require("../apps/middlewares/authCustomer");

router.get("/sliders", SliderController.index);
router.get("/banners", BannerController.index);

router.get("/categories", AuthCustomerMiddleware.verifyAuthentication, CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.get("/categories/:id/products", CategoryController.categoryProducts);

router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
//comments of prod
router.get("/products/:id/comments", ProductController.commentsProduct);
router.post("/products/:id/comment", ProductController.storeCommentProduct)

router.get("/orders", OrderController.index);
router.post("/order", OrderController.order);
//customer 
router.post("/customers/register", AuthController.registerCustomer);
router.post("/customers/login", AuthController.loginCustomer);
router.get("/customers/:id/logout", AuthController.logoutCustomer);
router.get("/customers/:id/orders", OrderController.customerOrder);
router.get("/customer/orders/:id", OrderController.show);
router.get("/customer/orders/:id/canceled", OrderController.orderCanceled);

// request refresh token 
router.get("/customers/refreshtoken", AuthController.requestRefreshToken);

module.exports = router