const paginate = require('../../common/paginate');
const CategoryModel = require('../models/category')

const CategoryController = {
  index: async (req, res) => {
    const page = Number(req.params.page) || 1
    const limit = 10;
    const total = await CategoryModel.find().countDocuments();
    const skip = page * limit - limit;
    const totalPages = Math.ceil(total/limit);


    let categories = await CategoryModel.find()
    .sort({_id: -1})
    .skip(skip)
    .limit(limit);
    res.render("admin/categories/category",{categories,
      paginate:paginate(totalPages, page),
      prev: page -1 ,
      next: page + 1,
      currentPage: page,
      totalPages,
    });
  },
  create: (req, res) => {
    res.render("admin/categories/add_category");
  },
  edit: (req, res) => {
    res.render("admin/categories/edit_category");
  },
  del: (req, res) => {
    res.send("/admin/categories/delete/:id");
  },
};

module.exports = CategoryController;
