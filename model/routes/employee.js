const { Router } = require("express");
const express = require("express");
const employee = require("link") 


// fetch all employee
router.get("/",auth, async(req,res)=> {
    await User.find()
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      res.send({ message: "error in fetching employee", err });
    });
});

//fetch employee by id
router.get("/:id", async (req, res) => {
    await User.findById(req.params.id)
      .then((data) => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(404).send({ err: "error in getting employee by id" });
      });
  });

module.exports = router;