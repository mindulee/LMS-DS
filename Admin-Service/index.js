const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')

const app = express();
const PORT = process.env.PORT ;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors())
app.use(express.json())  

mongoose.connect(MONGODB_URI)
   .then(() => console.log('DB connected succsessfully'))
   .catch(err => console.log(err));


   //Start server

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})

app.use('/' ,(req,res)=>{
    res.json('Admin Service')
})