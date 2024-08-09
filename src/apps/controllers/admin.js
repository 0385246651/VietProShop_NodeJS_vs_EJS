const ProductModel = require("../models/product");
const UserModel = require("../models/user");
const CommentModel = require("../models/comment");
const CategoryModel = require("../models/category");

const AdminController = {
  index: async (req, res) => {
    let products = await ProductModel.find().countDocuments();
    let users = await UserModel.find().countDocuments()
    let comments = await CommentModel.find().countDocuments()
    let categories = await CommentModel.find().countDocuments()
    res.render("admin/dashboard", {
      products, users, comments, categories
    });
  },
};

module.exports = AdminController;
