import express from 'express' 
import mongoose from 'mongoose'

const app = express() // set up for express

app.listen(3000, () => console.log('Server Started at ${3000}'))

// to connect the mongodb
mongoose.connect('mongodb://localhost/joblink')
app.use(express.static('public'));
mongoose.Promise = global.Promise;
app.use(express.json());
const db = mongoose.connection // it show the message in the terminal

// routes
// app.use('/api',require('./routes/api'));

// for error handling
app.use(function(err,req,res,next) {
    console.log(err);
    res.status(422).send({error: err.message})
});

// listen for request
app.listen(process.env.port || 4000, function(){
    console.log('ready to go');
})
