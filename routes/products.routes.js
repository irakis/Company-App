const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAll);

router.get('/products/random', ProductController.getRandom);

router.get('/products/:id', ProductController.getSingle);

router.post('/products', ProductController.postSingle);

router.put('/products/:id', ProductController.editSingle);

router.delete('/products/:id', ProductController.deleteSingle);

module.exports = router;
