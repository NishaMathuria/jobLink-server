const { useColors } = require('debug/src/browser');
const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./model/employee');
const Project = require('./model/project');
const apiRoutes = require('./routes/api')
const app = express() // set up for express




// to connect the mongodb
mongoose.connect('mongodb://localhost/joblink').then(()=>{
    console.log("connected")
})
app.use(express.static('public'));
mongoose.Promise = global.Promise;
app.use(express.json());

const db = mongoose.connection // it show the message in the terminal

app.get('/',(req,res) => {
    res.send('welcome')
})

// routes
app.use('/api',apiRoutes);


// for error handling
app.use(function(err,req,res,next) {
    console.log(err);
    res.status(422).send({error: err.message})
});

// ---------------------------------------------------
    

// ---------------------------------------------------

// listen for request
app.listen(4000, () => 
console.log('Server Started at 4000')
)

// app.get('/api/project', (req,res) => {
//     database.collection('project').find({}).toArray((err,result) => {
//         if(err) throw err
//         res.send(result)
//     })
// })
