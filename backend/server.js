const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const messageRouter = require('./routes/messageRoutes');
const PORT = process.env.PORT || 3001
const {jwtMiddleWare} = require('./jwt');
const {app,server} = require('./socket/socket.js');
const path = require('path');

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRouter);
app.use('/api/messages',jwtMiddleWare,messageRouter);

app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist","index.html"))
})

server.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT}`)
})