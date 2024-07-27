const paginate = require('../../common/paginate');
const UserModel = require('../models/user');

const UserController = {
  index: async (req, res) => {
    const page = Number(req.params.page) || 1
    const limit = 10;
    const skip = page * limit -limit;
    const total = await UserModel.find().countDocuments();
    const totalPages = Math.ceil(total / limit);

    const users = await UserModel.find()
    .sort({_id: -1})
    .skip(skip)
    .limit(limit);
    res.render("admin/users/user",{users,
      paginate: paginate(totalPages, page),
      prev: page - 1,
      next: page + 1,
      currentPage: page,
      totalPages
    })
  },
  create: (req, res) => {
    res.render("admin/users/add_user")
  },
  edit: (req, res) => {
    res.render("admin/users/edit_user")
  },
  del: (req, res) => {
    res.send("/admin/users/delete/:id");
  },
};

module.exports = UserController;
