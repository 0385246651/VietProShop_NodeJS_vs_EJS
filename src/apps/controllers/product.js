const ProductModel = require("../models/product");
const CategoryModel = require('../models/category')

const paginate = require('../../common/paginate');

const ProductController = {
  index: async (req, res) => {
    let page = Number(req.query.page) || 1
    let limit = 10;
    let skip= page * limit -limit
    let total = await ProductModel.find().countDocuments();
    const totalPages = Math.ceil(total/limit);

    let products = await ProductModel.find().populate({ path: "cat_id"})
    .sort({_id : -1})
    .skip(skip)
    .limit(limit);
    res.render("admin/products/product", { products,
      paginate : paginate(totalPages, page) ,
      prev: page - 1,
      next: page + 1,
      currentPage: page,
     totalPages
    });
  },
  create: (req, res) => {
    res.render("admin/products/add_product",);
  },
  edit: (req, res) => {
    res.render("admin/products/edit_product");
  },
  del: (req, res) => {
    res.send("admin/products/delete/:id");
  },
};

module.exports = ProductController;
