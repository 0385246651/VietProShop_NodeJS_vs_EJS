const express = require("express");
const router = express.Router();

//import controller 
const CategoryController = require("../apps/controllers/apis/category");
const ProductController = require("../apps/controllers/apis/product");
const OrderController = require("../apps/controllers/apis/order");

router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.get("/categories/:id/products", CategoryController.categoryProducts);

router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
//comments of prod
router.get("/products/:id/comments", ProductController.commentsProduct);
router.post("/products/:id/comment", ProductController.storeCommentProduct)

router.get("/order", OrderController.index);

module.exports = router