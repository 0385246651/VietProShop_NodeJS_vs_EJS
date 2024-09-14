const CategoryModel = require('../../models/category')
const ProductModel = require('../../models/product')
const pagination = require('../../../libs/pagination');

module.exports = {
    index: async (req, res) => {
        try {
            const categories = await CategoryModel.find()

            return res.status(200).json({
                status: 'success',
                // message: "list data successfully!",
                data: {
                    docs: categories,
                }
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    show: async (req, res) => {
        try {
            const { id } = req.params
            const category = await CategoryModel.findById(id)

            if (!category) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Category not found'
                });
            }

            return res.status(200).json({
                status: 'success',
                data: category
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    categoryProducts:
        async (req, res) => {
            try {
                const { id } = req.params
                const query = {}
                query.cat_id = id
                const page = Number(req.query.page) || 1
                const limit = Number(req.query.limit) || 9
                const skip = page * limit - limit
                const products = await ProductModel.find(query)
                    .sort({ _id: -1 })
                    .limit(limit)
                    .skip(skip)

                return res.status(200).json({
                    status: 'success',
                    filters: {
                        cat_id: id,
                        limit
                    },
                    data: {
                        docs: products,
                        pages: await pagination(page, limit, ProductModel, query),
                    }
                })
            } catch (error) {
                return res.status(500).json(error);
            }
        },
}