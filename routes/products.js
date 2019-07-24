const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('./middlewares/check-auth');
const Product = require('../db/models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .select('_id name price')
    .exec()
    .then(docs => {
        console.log(docs);
        const response = {
            count: docs.length,
            products: docs
        };
        res.status(200).json(response);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

router.post('/', checkAuth, (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Create product successfully!',
            createdProduct: product
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

router.patch('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

router.delete('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

module.exports = router;
