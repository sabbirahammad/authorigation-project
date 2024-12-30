const joi = require('joi');

const signupValidation = (req, res, next) => {
    // Define the validation schema
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });

    // Validate the request body against the schema
    const { error } = schema.validate(req.body, { abortEarly: false });  // Use abortEarly to show all errors at once

    // If validation fails, return a 400 error with details
    if (error) {
        console.log(error.message);
        return res.status(400).json({
            message: 'Validation error',
            success: false,
            details: error.details.map(err => err.message)  // Provide detailed error messages
        });
    }

    // If validation passes, proceed to the next middleware
    next();
};


const singinValidation=(req,res,next)=>{
    const schema= joi.object({
     email:joi.string().email().required(),
     password:joi.string().min(4).max(100).required(),
     })
    const{error}= schema.validate(req.body);
    if(error){
     return res.status(400)
     .json({message:'bad request',error});

    }
    next();
 }

 module.exports={
    signupValidation,
    singinValidation
 }