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
    res.render("admin/users/add_user", {data: {}})
  },
  store: async (req, res) => {
    const {body} = req
    const isExit  = await UserModel.findOne({email: body.email})
    console.log( isExit);
    if (body.password !== body.re_password ) {
      return res.render("admin/users/add_user", { data: { error: "Mật khẩu và nhập lại mật khẩu không khớp." } });
    }
    if(!isExit){
      let user = {   
        email: body.email,
        password: body.password,
        role: Number(body.role) === 1 ? 'admin' : 'member',
        full_name: body.full_name
      }
      await new UserModel(user).save()
      res.redirect("/admin/users")
    }
    else{
      console.error("Email đã tồn tại !");
      let error = "Email đã tồn tại !"
      res.render("admin/users/add_user", {data: {error}})
    }
  },
  edit: (req, res) => {
    res.render("admin/users/edit_user")
  },
  del: async (req, res) => {
    const {id} = req.params
    await UserModel.deleteOne({_id: id})
    res.redirect("/admin/users")
  }
};

module.exports = UserController;
