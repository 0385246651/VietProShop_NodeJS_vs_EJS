// cách 1 : sử dụng function  và dexport 1 obj chứa các hàm đó
// const Test1 = (req, res) => {
//   let { id } = req.params;
//   res.send(`<h1>Tesst ${id}!</h1>`);
// };

// const Test2 = (req, res) => {
//   res.send("<h1>Well come Tesst 2!</h1>");
// };

// module.exports = { Test1, Test2 };

// cách 2 : sử dụng object chưa các function và export ra obj đó

// ------------------gọi các model DB-------------------------
const CategoryModel = require("../models/category");

const TestController = {
  Test1: async (req, res) => {
    req.session.email = "admin@example.com";
    req.session.password = "123456"
    const data  = 1000;
    res.send(req.session.email);
  },
  Test2: (req, res) => {
    req.session.destroy();
    // delete req.session.password;  
    res.send(req.session.password);
  },
};

module.exports = TestController;
