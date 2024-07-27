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
    const data = [
      {
        name: "iphone",
        price: 10000000000,
      },
      {
        name: "SUmsung",
        price: 20000000000,
      },
    ];

    // const category = {
    //   title: "Huawei",
    //   slug: "huawei",
    //   description: "Hãng Huawei",
    // };
    // const categories = await CategoryModel.find();
    // console.log(categories);
    // CategoryModel.updateOne(
    //   { _id: "66924815bc662e3b53bc3e9c" },
    //   { description: "pro china" }
    // ).exec((error, docs) => {
    //   console.log(docs);
    // });
    // CategoryModel.deleteOne(
    //   { _id: "66924815bc662e3b53bc3e9c" },
    //   (err, docs) => {
    //     console.log(err);
    //     console.log(docs);
    //   }
    // );
    // ProductModel.find()
    //   .populate({ path: "cat_id" })
    //   .limit(5)
    //   .exec((err, docs) => {
    //     console.log(docs);
    //     console.error(err);
    //     // console.log("áđasa");
    //   });
    // UserModel.find().exec((err, docs) => {
    //   console.log(docs);
    //   console.log(err);
    // });

    // ví dụ về rpomise
    // const data1 = 10;
    // const promise = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(20);
    //   }, 2000);
    // });
    // promise.then((data2) => {
    //   console.log(data1 + data2);
    // });
    res.render("admin/test1", { data });
  },
  Test2: (req, res) => {
    res.send("<h1>Well come Tesst 2!</h1>");
  },
};

module.exports = TestController;
