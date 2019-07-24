const mongoose = require('mongoose');

const Product = require('../../db/models/product');

exports.get_all = async (req, res, next) => {
    try {
        const products = await Product.find().select('_id name price').exec();
        const response = {
            count: products.length,
            products: products
        };
        res.status(200).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

exports.create_one = async (req, res, next) => {
    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        })
    
        const doc = await product.save();
    
        res.status(200).json({
            message: 'Create product successfully!',
            createdProduct: doc
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

exports.get_one = async (req, res, next) => {
    try {
        const id = req.params.productId;
        const products = await Product.findById(id).exec();
        res.status(200).json(products);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

exports.update_one = async (req, res, next) => {
    try {
        const id = req.params.productId;
        const result = await Product.update({ _id: id }, { $set: req.body }).exec();
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

exports.delete_one = async (req, res, next) => {
    try {
        const id = req.params.productId;
        const result = await Product.remove({ _id: id }).exec();
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}
