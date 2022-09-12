const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
    try {
        const prod = res.json(await Product.find());
        if (!prod) res.status(400).json({ message: 'Not found' })
        else res.json(data)
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const prod = await Product.findOne().skip(rand)
        if (prod) res.json(prod)
        else res.status(400).json({ message: 'Not found' });
    } catch (err) { res.status(500).json({ message: err }) };
};

exports.getSingle = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id);
        if (prod) res.json(prod)
        else res.status(400).json({ message: 'Not found' });
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.postSingle = async (req, res) => {
    const { name, client } = req.body;
    try {
        const newProd = new Product({ name, client })
        await newProd.save();
        res.json(await newProd);
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.editSingle = async (req, res) => {
    const { name, client } = req.body;
    try {
        const prod = await Product.findById(req.params.id)
        if (prod) {
            prod.name = name;
            prod.client = client;
            await prod.save();
            res.json(prod)
        } else res.status(400).json({ message: 'Not found' });
    } catch (err) { res.status(500).json({ message: err }) };
};

exports.deleteSingle = async (req, res) => {
    try {
        const prod = await Product.findById({ _id: req.params.id });
        if (prod) {
            await Product.deleteOne({ _id: req.params.id });
            res.json(await Product.find());
        } else res.status(400).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: err }) }
};