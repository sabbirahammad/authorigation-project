const joi = require('joi');

const signupValidation = (req, res, next) => {
   
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });

 
    const { error } = schema.validate(req.body, { abortEarly: false });  


    if (error) {
        console.log(error.message);
        return res.status(400).json({
            message: 'Validation error',
            success: false,
            details: error.details.map(err => err.message)  
        });
    }


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
