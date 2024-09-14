const ProductModel = require('../../models/product')
const pagination = require('../../../libs/pagination');
const CommentModel = require('../../models/comment');

module.exports = {
    index: async (req, res) => {
        try {
            const query = {};
            if (req.query.featured) query.featured = req.query.featured;
            if (req.query.name) query.$text = { $search: req.query.name };
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 6;
            const skip = page * limit - limit;
            // Text Search là một tính năng trong module mongose, 
            // cho phép thực hiện các logic tìm kiếm một cách tương đối giá trị của một thuộc tính bất kỳ
            const products = await ProductModel.find(query)
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit);

            return res.status(200).json({
                status: 'success',
                filters: {
                    featured: req.query.featured || null,
                    limit
                },
                data: {
                    docs: products,
                    pages: await pagination(page, limit, ProductModel, query),
                }
            })
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    show: async (req, res) => {
        try {
            const id = req.params.id
            const product = await ProductModel.findById(id);
            if (!product) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Sản phẩm không tồn tại !'
                });
            }
            else {
                return res.status(200).json({
                    status: 'success',
                    data: product
                });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    commentsProduct: async (req, res) => {
        try {
            const id = req.params.id
            const query = {}
            query.prd_id = id
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10
            const skip = page * limit - limit
            const comments = await CommentModel.find(query)
                // .populate({ path: "prd_id" })
                .limit(limit)
                .skip(skip)
                .sort({ _id: -1 })
            if (!comments) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Prd_id không tồn tại !'
                });
            }
            else {
                return res.status(200).json({
                    status: 'success',
                    filters: {
                        prd_id: id,
                        limit
                    },
                    data: {
                        docs: comments,
                        pages: await pagination(page, limit, CommentModel, query)
                    }
                });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    storeCommentProduct: async (req, res) => {
        const { id } = req.params;
        const { body } = req;
        const comment = {
            prd_id: id,
            full_name: body.full_name,
            email: body.email,
            body: body.body
        }
        await new CommentModel(comment).save();
        return res.status(200).json("Thêm bình luận thành công ! ")
    }
}