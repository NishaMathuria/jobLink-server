const express = require('express');
const router = express.Router();
const Employee = require('../model/employee');
const Project = require('../model/project');

// --------------- employee -------------------------

// for GET request (get the list of employee database)
router.get('/employee',function(req,res,next){
    Employee.find({}).then(function(employees){
        res.send({employees});
    }).catch(next);
});


// for POST request (add new employee in the database)
router.post('/employee',function(req,res,next){
    Employee.create({}).then(function(employee){
        res.send({employee});
    }).catch(next);
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
router.post('/project',function(req,res,next){
    Project.create({}).then(function(project){
        res.send({project});
    }).catch(next);
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