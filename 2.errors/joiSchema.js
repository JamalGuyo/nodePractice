const Joi = require('joi');
// farmschema
module.exports.farmSchema = Joi.object({
    farm: Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required()
    }).required()
});