const mongoose = require("mongoose")
const express = require('express');
const router = express.Router();
const Employee = require('../model/employee');
const Project = require('../model/project');
const jwt = require("jsonwebtoken");

// --------------- employee -------------------------

// for GET request (get the list of employee database)
router.get("/employee", function (req, res, next) {
    Employee.find({})
      .then((employees) => {
        res.send({ employees });
      })
      .catch(next);
  });


// for POST request (add new employee in the database)
router.post("/newEmployee", async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        email,
        certificate,
        welder,
        fitter,
        rigger,
        sacffolder,
        instructionTech,
        election,
        mechanic,
        craneOperator,
      } = req.body;
  
      if (
        !(
          firstName &&
          lastName &&
          phoneNumber &&
          email &&
          certificate &&
          welder &&
          fitter &&
          rigger &&
          sacffolder &&
          instructionTech &&
          election &&
          mechanic &&
          craneOperator
        )
      ) {
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
        craneOperator,
      });
  
      const token = jwt.sign({ employee_id: employee._id }, "joblink");
  
      employee.token = token;
      res.status(201).send({ employee, token });
    } catch (err) {
      console.log(err);
    }
  });
  


// for PUT request (update of employee in the database)
router.patch("/employee/:id", async (req, res, next) => {
    try {
      const employee_id = mongoose.mongo.ObjectId(req.params.id);
  
      const updates = Object.keys(req.body);
      const allowedUpdates = [
        "firstName",
        "lastName",
        "phoneNumber",
        "email",
        "certificate",
        "welder",
        "fitter",
        "rigger",
        "sacffolder",
        "instructionTech",
        "election",
        "mechanic",
        "craneOperator",
      ];
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update),
      );
      if (!isValidOperation) {
        res.status(400).send({ error: "Invalid request" });
      }
  
      if (!employee_id) {
        return res.status(404).send();
      }
      const employee = await Employee.findOne({ _id: employee_id });
  
      updates.forEach((update) => (employee[update] = req.body[update]));
      await employee.save();
      res.send(employee);
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
  });



// for DELETE request (delete the employee in the database)
router.delete("/employee/:id", async (req, res, next) => {
    const employee = await Employee.findOneAndDelete({ _id: req.params.id });
  
    if (employee.length == 0) {
      return res.status(400).send();
    }
  
    try {
      await employee.remove();
      res.send(employee);
    } catch (error) {
      res.status(500).send();
    }
  });



// ------------- project -------------------------

// for GET request (get the list of project database)
router.get('/project',function(req,res,next){
    Project.find({})
        .then((projects) => {
            res.send({projects});
        })
        .catch(next);
});


// for POST request (add new project in the database)
router.post('/newProject',async (req,res,next) => {
    try {

        // get use input
        const {projectTitle ,
            projectDescription ,
            startDate ,
            endDate ,
            projectLocation ,
            selectSupervisor ,
            expectedMember,
            addUser
        } = req.body;

        // validation
        if(
            !(
                projectTitle && 
                projectDescription && 
                startDate && 
                endDate && 
                projectLocation &&
                selectSupervisor && 
                expectedMember && 
                addUser
                )
                ) {
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
router.patch("/project/:id", async (req, res, next) => {
    try {
      const project_id = mongoose.mongo.ObjectId(req.params.id);
  
      const updates = Object.keys(req.body);
      const allowedUpdates = [
        "projectTitle" ,
            "projectDescription" ,
            "startDate" ,
            "projectLocation" ,
            "selectSupervisor" ,
            "expectedMember",
            "addUser"
      ];
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update),
      );
      if (!isValidOperation) {
        res.status(400).send({ error: "Invalid request" });
      }
  
      if (!project_id) {
        return res.status(404).send();
      }
      const project = await Project.findOne({ _id: project_id });
  
      updates.forEach((update) => (project[update] = req.body[update]));
      await project.save();
      res.send(project);
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
  });


// for DELETE request (delete the project in the database)
router.delete("/project/:id", async (req, res, next) => {
    const project = await Project.findOneAndDelete({ _id: req.params.id });
  
    if (project.length == 0) {
      return res.status(400).send();
    }
  
    try {
      await project.remove();
      res.send(project);
    } catch (error) {
      res.status(500).send();
    }
  });

module.exports = router;