const UserModel = require("../models/user");

const AuthController = {
  logIn: (req, res) => {
    // nên nếu không truyền tham số thì sẽ ko có tham error để check
    res.render("admin/login", { data: {} });
  },
  postLogin: async (req, res) => {
    let { email, password } = req.body;
    const users = await UserModel.findOne({ email: email, password: password });
    let error;
    if (users) {
      return res.redirect("/admin/dashboard");
    } else {
      console.error("Tài khoản không hợp lệ !");
      error = "Tài khoản không hợp lệ !";
      res.render("admin/login", { data: { error } });
    }
  },
  logOut: (req, res) => {
    res.send("/admin/login");
  },
};

module.exports = AuthController;
