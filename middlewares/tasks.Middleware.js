const Joi = require("joi");

const ValidateTaskCreation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()
        })
    
        const valid = await schema.validateAsync(req.body, { abortEarly: true })

        next()
        
    } catch (error) {
        return res.status(422).send({
            message: error.message
        })
    }
}


const ValidateUpdateDetails = async (req, res, next) => {
    try {
        const schema = Joi.object({
            // title: Joi.string().optional().allow(""),
            // description: Joi.string().optional().allow(""),
            state: Joi.string().valid("pending", "completed", "deleted")
        })
    
        const valid = await schema.validateAsync(req.body, { abortEarly: true })

        next()
        
    } catch (error) {
        return res.status(422).send({
            message: error.message
        })
    }
}

module.exports = {
    ValidateTaskCreation,
    ValidateUpdateDetails
}