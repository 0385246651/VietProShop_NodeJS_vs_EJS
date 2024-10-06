const CustomerModel = require("../../models/customer");
const jwt = require('jsonwebtoken');

const config = require('config');

const generateAccessToken = async (customer) => {
    const secretKey = config.get("app.jwtAccessKey")
    const payload = {
        _id: customer.id
    };
    return await jwt.sign(payload, secretKey, { expiresIn: '1d' });
};

const generateRereshToken = async (customer) => {
    const refreshKey = config.get("app.jwtRefreshKey");
    const payloadRefresh = {
        _id: customer.id
    };
    return await jwt.sign(payloadRefresh, refreshKey, { expiresIn: '1y' });
};

module.exports = {
    registerCustomer: async (req, res) => {
        try {
            const { body } = req;

            const isEmail = await CustomerModel.findOne({
                email: body.email
            });
            if (isEmail) return res.status(422).json("Email đã tồn tại !");
            const isPhone = await CustomerModel.findOne({
                phone: body.phone
            });
            if (isPhone) return res.status(422).json("Số điện thoại đã tồn tại!");
            if (!isEmail && !isPhone) {
                const customer = new CustomerModel(body);
                await customer.save();
                return res.status(201).json("Đăng ký khách hàng thành công !");
                // res.status(201).json(customer);
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    },
    loginCustomer: async (req, res) => {
        try {
            const { body } = req;

            const existedEmail = await CustomerModel.findOne({ email: body.email });
            if (!existedEmail) return res.status(422).json("Email không tồn tại !");
            const existedPassword = existedEmail.password === body.password
            if (!existedPassword) {
                return res.status(422).json("Mật khẩu không tồn tại !");
            }
            if (existedPassword && existedEmail) {
                const accessToken = await generateAccessToken(existedEmail)
                const refreshToken = await generateRereshToken(existedEmail)
                const { password, ...other } = existedEmail._doc;
                // console.log(other);
                // refreshToken lưu vao cookie
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                });
                return res.status(200).json({
                    message: "Đăng nhập thành công !",
                    customer: other,
                    accessToken
                });
            }
        } catch (error) {
            return res.status(500).json(err);
        }
    }
} 