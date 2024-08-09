const paginate = require('../../common/paginate');
const UserModel = require('../models/user');

const UserController = {
  index: async (req, res) => {
    const page = Number(req.query.page) || 1
    const limit = 10;
    const skip = page * limit - limit;
    const total = await UserModel.find().countDocuments();
    const totalPages = Math.ceil(total / limit);

    const users = await UserModel.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    res.render("admin/users/user", {
      users,
      paginate: paginate(totalPages, page),
      prev: page - 1,
      next: page + 1,
      currentPage: page,
      totalPages,
      ID: skip + 1// Số thứ tự bắt đầu
    })
  },
  create: (req, res) => {
    res.render("admin/users/add_user", { data: {} })
  },
  store: async (req, res) => {
    const { body } = req
    const isExit = await UserModel.findOne({ email: body.email })
    console.log(isExit);
    if (body.password !== body.re_password) {
      return res.render("admin/users/add_user", { data: { error: "Mật khẩu và nhập lại mật khẩu không khớp." } });
    }
    if (!isExit) {
      let user = {
        email: body.email,
        password: body.password,
        role: Number(body.role) === 1 ? 'admin' : 'member',
        full_name: body.full_name
      }
      await new UserModel(user).save()
      res.redirect("/admin/users")
    }
    else {
      console.error("Email đã tồn tại !");
      let error = "Email đã tồn tại !"
      res.render("admin/users/add_user", { data: { error } })
    }
  },
  edit: async (req, res) => {
    const { id } = req.params
    const user = await UserModel.findById(id)
    res.render("admin/users/edit_user", { user, data: {} })
  },
  update: async (req, res) => {
    const { id } = req.params
    const { body } = req
    const user = await UserModel.findById(id)
    const isExit = await UserModel.findOne({ email: body.email })
    if (body.password !== body.re_password) {
      return res.render("admin/users/edit_user", { user, data: { error: "Mật khẩu và nhập lại mật khẩu không khớp." } });
    }
    if (!isExit) {
      let user = {
        email: body.email,
        password: body.password,
        role: Number(body.role) === 1 ? 'admin' : 'member',
        full_name: body.full_name
      }
      await UserModel.updateOne({ _id: id }, user)
      res.redirect("/admin/users")
    }
    else {
      console.error("Email đã tồn tại !");
      let error = "Email đã tồn tại !"
      res.render("admin/users/edit_user", { user, data: { error } })
    }
  },
  del: async (req, res) => {
    const { id } = req.params
    await UserModel.deleteOne({ _id: id })
    res.redirect("/admin/users")
  }
};

module.exports = UserController;
