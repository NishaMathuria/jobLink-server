const { useColors } = require('debug/src/browser');
const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./model/employee');
const Project = require('./model/project');
const apiRoutes = require('./routes/api')
const app = express() // set up for express


const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

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

app.post("/create-project",async (req,res) => {
    try {

        // get use input
        const {projectTitle ,projectDescription ,startDate ,endDate ,projectLocation ,selectSupervisor ,expectedMember,addUser} = req.body;

        // validation
        if(!(projectTitle && projectDescription && startDate && endDate && projectLocation &&selectSupervisor && expectedMember && addUser)){
            res.status(400).send("All input is required");
        }

        // create project in database
        const project = await Project.create({
            projectTitle ,
            projectDescription ,
            startDate ,
            projectLocation ,
            selectSupervisor ,
            expectedMember,
            addUser
        });


        // create token
        const token = jwt.sign(
            process.env.TOKEN_KEY,
            {

            }
        );
            
            // save project token
            project.token = token;

        // return new project 
        res.status(201).json(project);
    } catch (err) {
        console.log(err);
    }

});

app.post("/add-member",async (req, res) => {
    try {
        const {firstName,lastName,phoneNumber,email,certificate,welder,fitter,rigger,sacffolder,instructionTech,election,mechanic,craneOperator} = req.body;

        if(!(firstName && lastName && phoneNumber &&email && certificate && welder && fitter && rigger && sacffolder && instructionTech && election && mechanic && craneOperator)) {
            res.status(400).send("All input is required");
        }

        const user = await Employee.create({
            firstName,
            lastName,
            phoneNumber,
            email: email.toLowerCase(),
            certificate,
            welder,
            fitter,
            rigger,
            sacffolder,
            instructionTech,
            election,
            mechanic,
            craneOperator
        })


        const token = jwt.sign(
            process.env.TOKEN_KEY,
            {

            }
        );

        user.token = token;
        res.status(201).json(employee);
    } catch(err) {
        console.log(err);
    }
})

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
