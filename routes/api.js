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
router.patch('/employee/:id', async(req, res,next) => {
    try {
        
    } catch (error) {
        
    }
    // Employee.findOneAndUpdate({_id: req.params.id},req.body).then(function(employee){
    //     Employee.findOne({_id:req.params.id}).then(function(employee){
    //         res.send({employee});
    //     })
    // })

    const updates = Object.keys(req.body)
    const allowedUpdates = ["firstName","lastName","phoneNumber","email","certificate","welder","fitter","rigger","sacffolder","instructionTech","election","mechanic","craneOperator"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    // const employee_id =  req.employee._id 
    console.log(req.params);
    
    res.send({message:'success'});
    // if(!isValidOperation){
    //     res.status(400).send({error:'Invalid request'})
    // }

    // if (!ObjectID.isValid(employee_id)) {
    //     return res.status(404).send();
    // }

    // try {
    //     updates.forEach((update) => req.employee[update] = req.body[update])
    //     await req.employee.save()
    //     res.send(req.user);
    // } catch(error) {
    //     res.status(400).send()
    // }
})



// for DELETE request (delete the employee in the database)
router.delete('/employee/:id', function(req,res,next) {
    // employee.findOneAndDelete({_id: req.params.id}).then(function(employee){
    //     res.send({employee});
    // });

    if(!ObjectID.isValid(req.employee._id)) {
        return res.status(400).send();
    }

    try {
        await req.employee.remove()
        res.send(req.employee)
    } catch (error) {
        res.status(500).send()
    }

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
router.patch('/project/:id', function(req, res,next){
    // Project.findOneAndUpdate({_id: req.params.id},req.body).then(function(project){
    //     Project.findOne({_id:req.params.id}).then(function(project){
    //         res.send({project});
    //     })
    // })


})

// for DELETE request (delete the project in the database)
router.delete('/project/:id', function(req,res,next) {
    // Project.findOneAndDelete({_id: req.params.id}).then(function(project){
    //     res.send({project});
    // });

    // if(!ObjectID.isValid(req.employee._id)) {
    //     return res.status(400).send();
    // }

    // try {
    //     await req.project.remove()
    //     res.send(req.project)
    // } catch (error) {
    //     res.status(500).send()
    // }

});

module.exports = router;