const express=require('express');
require('./mongodb/Mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');
const app=express();
const AuthRouter=require('./Routes/Authrouter')
const ProductRouter=require('./Routes/ProductRouter');
const dbconnected = require('./mongodb/Mongoose');
require('dotenv').config();

const PORT=8000;

app.get('/pong',(req,res)=>{
    res.send('PONG');
})

dbconnected();
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter)


app.listen(PORT,()=>{
    console.log(`server is running:${PORT}`);
})