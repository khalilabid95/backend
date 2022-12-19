const Joi = require('joi');

const articleValidator = Joi.object({
    size: Joi.string(),
    stock: Joi.number().required()
    
})
const itemValidator = Joi.object({
    title: Joi.string().required().min(2).max(70),
    description: Joi.string(),
    photos: Joi.array().items(Joi.string().uri()),
    categorie: Joi.string().required(),
    price: Joi.number().required(),
    articles: Joi.array().items(articleValidator)
});
const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    adress: Joi.string().required(),
    admin:Joi.boolean().required(),
    password: Joi.string().required().min(4)
})
const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
module.exports = {
    itemValidator,
    registerValidator,
    loginValidator
}
