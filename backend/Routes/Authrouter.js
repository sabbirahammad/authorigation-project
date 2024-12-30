const express=require('express');
const {signupValidation, singinValidation } = require('../Middlewars/AuthValidation');
const { signup,
    signin  } = require('../Controllers/AuthController');
const router=express.Router();


router.post('/login',singinValidation,signin);
router.post('/signup',signupValidation,signup);

module.exports=router;