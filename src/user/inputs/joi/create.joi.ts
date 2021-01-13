import * as Joi from 'joi'
export function userValidator(user){
const schema = Joi.schema({
    username: Joi.string().min(5).max(30).required(),
    lname: Joi.string().min(5).max(30).required(),
    fname: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.email().min(8).max(30).required(),
    profile: Joi.string(),
    dob: Joi.date(),
})
return schema.validate(user);
}

export function loginValidator(user){
    const schema = Joi.schema({
        username: Joi.string().min(5).max(30).required(),
        password: Joi.string().min(3).max(30).required(),
    })
    return schema.validate(user);
}