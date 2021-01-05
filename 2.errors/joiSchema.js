const Joi = require('joi');
// farmschema
module.exports.farmSchema = Joi.object({
    farm: Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required()
    }).required()
});

// product schema
module.exports.productSchema = Joi.object({
    product: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required().min(0),
        category: Joi.string().required()
    }).required()
});