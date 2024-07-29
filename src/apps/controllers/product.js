const ProductModel = require("../models/product");
const CategoryModel = require('../models/category')

const paginate = require('../../common/paginate');

const slug = require('slug');
const fs = require('fs');
const path = require('path');

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
  create:  async (req, res) => {
    const categories = await CategoryModel.find()
    res.render("admin/products/add_product",{categories});
  },
  store: async (req, res) => {
    const {body, file} = req;
    const product = {
      name: body.name,
      price: body.price,
      cat_id: body.cat_id,
      status: body.status,
      featured: body.featured === 'on' || false,
      warranty: body.warranty,
      accessories: body.accessories,
      promotion: body.promotion,
      is_stock: body.is_stock,
      // slug: body.name.replace(/\s+/g, '-').toLowerCase(),
      slug: slug(body.name),
      description: body.description,
    }
    if (file) {
      //di chuyển ngay lập tức từ tmp về image/products
      //cập nhật lại thumbnail obj product
      //thêm vào csdl
      //chuyển hướng về trang danh sách sp 
      const thumbnail = `products/${file.originalname}`
      product.image = file.filename;
      fs.renameSync(file.path, path.resolve(`src/public/uploads/images/`, thumbnail))
      product.thumbnail = thumbnail;
      await new ProductModel(product).save();
      res.redirect("/admin/products");
    }
  },
  edit: (req, res) => {
    res.render("admin/products/edit_product");
  },
  del: async (req, res) => {
    const id = req.params.id;
    await ProductModel.deleteOne({_id: id});
    res.redirect("/admin/products")
  },
};

module.exports = ProductController;
