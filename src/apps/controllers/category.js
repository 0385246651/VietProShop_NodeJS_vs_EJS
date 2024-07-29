const slug = require('slug');
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
    res.render("admin/categories/add_category", {data: {}});
  },
  store: async (req, res) => {
    const {body} = req;
    const isExit = await CategoryModel.findOne({  slug: slug(body.title) });
    if(!isExit){
      const category = { 
        description: body.description ,
        title : body.title,
        slug: slug(body.title)
        }
     await new CategoryModel(category).save();
      res.redirect("/admin/categories")
    }else{
      console.log("Danh mục đã tồn tại !");
     let error = "Danh mục đã tồn tại !";
      res.render("admin/categories/add_category", { data: {error} });
    }
  },
  edit: (req, res) => {
    res.render("admin/categories/edit_category");
  },
  del: async (req, res) => {
    const id = req.params.id;
    await CategoryModel.deleteOne({_id: id});
    res.redirect("/admin/categories")
  },
};

module.exports = CategoryController;
