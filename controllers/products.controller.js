const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
    try {
        const selectedProduct = res.json(await Product.find());
        if (!selectedProduct) res.status(400).json({ message: 'Not found' })
        else res.json(data)
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const selectedProduct = await Product.findOne().skip(rand)
        if (selectedProduct) res.json(selectedProduct)
        else res.status(400).json({ message: 'Not found' });
    } catch (err) { res.status(500).json({ message: err }) };
};

exports.getSingle = async (req, res) => {
    try {
        const selectedProduct = await Product.findById(req.params.id);
        if (selectedProduct) res.json(selectedProduct)
        else res.status(400).json({ message: 'Not found' });
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.postSingle = async (req, res) => {
    const { name, client } = req.body;
    try {
        const newProduct = new Product({ name, client })
        await newProduct.save();
        res.json(await newProduct);
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.editSingle = async (req, res) => {
    const { name, client } = req.body;
    try {
        const selectedProduct = await Product.findById(req.params.id)
        if (selectedProduct) {
            selectedProduct.name = name;
            selectedProduct.client = client;
            await selectedProduct.save();
            res.json(selectedProduct)
        } else res.status(400).json({ message: 'Not found' });
    } catch (err) { res.status(500).json({ message: err }) };
};

exports.deleteSingle = async (req, res) => {
    try {
        const selectedProduct = await Product.findById({ _id: req.params.id });
        if (selectedProduct) {
            await Product.deleteOne({ _id: req.params.id });
            res.json(await Product.find());
        } else res.status(400).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: err }) }
};