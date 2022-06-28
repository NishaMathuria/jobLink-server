// const express = require("express");
// const app = express();
// const mongoose = require('mongoose');
 
// mongoose.connect('mongodb://localhost:27017/Tutorial',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// }).then(()=>{
//     console.log("DB Connected Successfully");
// });
 
// app.get("/",(req, res)=>{
//     res.send("Hello World");
// });
 
// const PORT = 2000;
// app.listen(PORT,()=>{
//     console.log(`Listening on port 4200`);
// });

import express from 'express'

const PORT = 4000

const app = express()



app.listen(PORT, () =>
  console.log(`The JobLink API is running on: http://localhost:${PORT}.`)
)

app.get('/',(req,res) => {
    res.send('welcome')
})