const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001

const app = express();

app.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT}`)
})