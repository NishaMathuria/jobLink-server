const express = require('express');
const router = express.Router();
const Employee = require('../model/employee');
const Project = require('../model/project');
const jwt = require("jsonwebtoken");

// --------------- employee -------------------------

// for GET request (get the list of employee database)
router.get('/employee',function(req,res,next){
    Employee.find({}).then(function(employees){
        res.send({employees});
    }).catch(next);
});


// for POST request (add new employee in the database)
router.post('/newEmployee',async(req,res,next) => {
    

    try {
        const {firstName,lastName,phoneNumber,email,certificate,welder,fitter,rigger,sacffolder,instructionTech,election,mechanic,craneOperator} = req.body;

        if(!(firstName && lastName && phoneNumber &&email && certificate && welder && fitter && rigger && sacffolder && instructionTech && election && mechanic && craneOperator)) {
            res.status(400).send("All input is required");
        }

        const employee = await Employee.create({
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
            {employee_id : employee._id},
            "joblink"
        );

        employee.token = token;
        res.status(201).send({employee,token});
    } catch(err) {
        console.log(err);
    }
});


// for PUT request (update of employee in the database)
router.put('/employee/:id', function(req, res,next){
    Employee.findOneAndUpdate({_id: req.params.id},req.body).then(function(employee){
        Employee.findOne({_id:req.params.id}).then(function(employee){
            res.send({employee});
        })
    })
})

// for DELETE request (delete the employee in the database)
router.delete('/employee/:id', function(req,res,next) {
    employee.findOneAndDelete({_id: req.params.id}).then(function(employee){
        res.send({employee});
    });
});



// ------------- project -------------------------

// for GET request (get the list of project database)
router.get('/project',function(req,res,next){
    Project.find({}).then(function(projects){
        res.send({projects});
    }).catch(next);
});


// for POST request (add new project in the database)
router.post('/newProject',async (req,res,next) => {
    // Project.create({}).then(function(project){
    //      res.send({project});
    // }).catch(next);

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

        // return new project 
        res.status(201).json(project);
    } catch (err) {
        console.log(err);
    }
});


// for PUT request (update of project in the database)
router.put('/project/:id', function(req, res,next){
    Project.findOneAndUpdate({_id: req.params.id},req.body).then(function(project){
        Project.findOne({_id:req.params.id}).then(function(project){
            res.send({project});
        })
    })
})

// for DELETE request (delete the project in the database)
router.delete('/project/:id', function(req,res,next) {
    Project.findOneAndDelete({_id: req.params.id}).then(function(project){
        res.send({project});
    });
});

module.exports = router;