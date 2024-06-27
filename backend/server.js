const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const userRouter = require('./routes/userRoutes');
const PORT = process.env.PORT || 3001

dotenv.config();
const app = express();

app.use(express.json());

app.use('/user',userRouter);

app.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT}`)
})