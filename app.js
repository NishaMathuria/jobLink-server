const { application } = require("express");

const uth = ("./middleware/auth");

application.post("/welcome",auth,(req,res) => {
    res.status(200).send("welcome");
});