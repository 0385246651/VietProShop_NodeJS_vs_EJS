const mongoose = require("../../common/database")();
const orderSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    items: [{
        prd_id: {
            type: mongoose.Types.ObjectId,
            required: true,
        }, price: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true
        },
    }],
}, {
    timestamps: true
});
const OrderModel = mongoose.model("orders", orderSchema, "orders");
module.exports = OrderModel