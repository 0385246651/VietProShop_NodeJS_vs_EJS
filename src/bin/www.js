const app = require("../apps/app");

//server
// phương thức listen nhận 2 tham sôs , 1 là cổng chạy server , 2 là 1 function 2 tham số
//tất cả gửi từ client lên server là tham số thư nhất , còn tham sôs thứ 2 là server trả về, server cứ chay là sẽ log ra
const server = app.listen((PORT = 9000), (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
