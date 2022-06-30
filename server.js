// import express from 'express' 
// import mongoose from 'mongoose'
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api')
// import apiRoutes from './routes/api.js'
const app = express() // set up for express

// to connect the mongodb
mongoose.connect('mongodb://localhost/joblink').then(()=>{
    console.log("connected")
})
app.use(express.static('public'));
mongoose.Promise = global.Promise;
app.use(express.json());
const db = mongoose.connection // it show the message in the terminal

// routes
app.use('/api',apiRoutes);

// for error handling
app.use(function(err,req,res,next) {
    console.log(err);
    res.status(422).send({error: err.message})
});

// listen for request
app.listen(3000, () => console.log('Server Started at 3000'))
