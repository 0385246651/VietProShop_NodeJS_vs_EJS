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
      console.log("Lỗi rồi");
      error = "Tài khoản không hợp lệ !";
      // khi view login lên thì luôn chạy phuong thức GET
      // nên nếu không truyền tham số thì sẽ ko có tham error để check
      res.render("admin/login", { data: { error } });
    }
    // console.log("isErr", isErr);
  },
  logOut: (req, res) => {
    res.send("/admin/login");
  },
};

module.exports = AuthController;
