const express=require('express');
const ensureAutharacated = require('../Middlewars/Auth');
const Router=express.Router();


Router.get('/',ensureAutharacated,(req,res)=>{
    console.log(req.user);
    res.status(200).json([
        {
            name:"mobile",
            prize:15000
        },
        {
            name:"tv",
            prize:35000
        }
    ])
})
module.exports=Router;