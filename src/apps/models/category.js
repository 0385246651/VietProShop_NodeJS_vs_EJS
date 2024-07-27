const mongoose = require("../../common/database")();

const categorySchema = new mongoose.Schema(
  //tham so 1 kieu du lieu , tham số 2 nếu có thời gian tạo và update
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true, // có required hay không
    },
    description: {
      type: String,
      default: null, // giá trị mặc định
    },
  },
  {
    timestamps: true,
  }
);

// tham số 1 bí danh model , tham số 2 là schema, tham số 3 , collection_name
const CategoryModel = mongoose.model(
  "Categories",
  categorySchema,
  "categories"
);

module.exports = CategoryModel;

// Khi đã tạo schema và model thì cần chạy câu lệnh sau
// để đảm bảo r��ng collection "categories" đã tồn tại trong database
