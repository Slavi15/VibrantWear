const mongoose = require("mongoose");
const Joi = require("joi");
const Joigoose = require("joigoose")(mongoose);

const joiProductSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    edition: Joi.string(),
    price: Joi.object({
        value: Joi.number().required(),
        currency: Joi.string().required(),
    }),
    shipping_price: Joi.object({
        value: Joi.number().required(),
        currency: Joi.string().required()
    }),
    images: Joi.array().items(Joi.string()).length(4).required(),
    category: Joi.string().required(),
    section: Joi.string().required(),
    reviews: Joi.array().items(Joi.string()),
    sizes: Joi.array().items(Joi.string()).required(),
    colours: Joi.array().items(Joi.string()),
});

const mongooseProductSchema = new mongoose.Schema(Joigoose.convert(joiProductSchema));

const Product = mongoose.model('products', mongooseProductSchema, 'products');
module.exports = Product;