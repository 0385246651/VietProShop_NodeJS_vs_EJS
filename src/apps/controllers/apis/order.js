const transporter = require('../../../libs/transporter');
const path = require('path');
const _ = require('lodash');
const ejs = require('ejs');
const OrderModel = require('../../models/order');
const ProductModel = require('../../models/product');

module.exports = {
    index: async (req, res, next) => {
        try {
            const orders = await OrderModel.find().limit(10).sort({ _id: -1 })
            return res.status(200).json({
                status: 'success',
                data: {
                    docs: orders,
                }
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    customerOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const orders = await OrderModel.find({
                customerId: id,
            })
                .sort({ _id: -1 });
            return res.status(200).json({
                status: "success",
                data: {
                    docs: orders,
                }
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    order: async (req, res) => {
        try {
            const order = req.body;
            const { items } = order
            const prdIds = items.map(item => item.prd_id)
            // tim kiếm theo mảng id bảng products
            const products = await ProductModel.find({ _id: { $in: prdIds } })
            let newItems = []
            //map ra dữ liệu phù hợp
            for (let product of products) {
                const item = _.find(items, { prd_id: product._id.toString() });
                if (item) {
                    item.name = product.name;
                    newItems.push(item)
                }
            }
            order.items = newItems;
            console.log("newItems", order, path.join(req.app.get("views"), "site", "mail.ejs"));

            const html = await ejs.renderFile(
                path.join(req.app.get("views"), "site", "mail.ejs"),
                order
            );

            // gửi mail bằng Node Mailler
            await transporter.sendMail({
                from: '"Vietpro Store" <quantri.vietproshop@gmail.com>',
                to: order.email,
                subject: "Xác nhận đơn hàng từ Vietpro Store",
                html,
            })

            await new OrderModel(order).save();
            return res.status(200).json("Tạo đơn hàng thành công !");
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    show: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await OrderModel.findById(id);
            return res.status(200).json({
                status: "success",
                data: order,
            });
        } catch (error) {
            return res.status(500).json(error);
        }

    },
    orderCanceled: async (req, res) => {
        try {
            const { id } = req.params;
            await OrderModel.updateOne(
                { _id: id },
                { status: 0 }
            );
            return res.status(200).json("Canceled order successfully");
        } catch (error) {
            return res.status(500).json(error);
        }
    },
} 