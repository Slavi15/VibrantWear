const Product = require("../../models/productModel.js");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: 1 });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const getPaginationProducts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (parseInt(page) - 1) * LIMIT;

        const total = await Product.countDocuments({});
        const products = await Product.find().sort({ _id: 1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({
            products: products,
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productID);
        
        product ? res.status(200).json(product) : res.status(400).json({ message: "Product cannot be found!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
};

const createProduct = async (req, res) => {
    const product = new Product(req.body);

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productID, req.body, { new: true });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
};

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productID);
        res.status(200).json({ message: `Product ${req.params.productID} has been successfully deleted!` });
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
};

module.exports = { getProducts, getProductById, getPaginationProducts, createProduct, updateProduct, deleteProduct };