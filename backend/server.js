const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const messageRouter = require('./routes/messageRoutes');
const PORT = process.env.PORT || 3001
const {jwtMiddleWare} = require('./jwt');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/user',userRouter);
app.use('/messages',jwtMiddleWare,messageRouter);

app.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT}`)
})