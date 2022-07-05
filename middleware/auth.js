const jwt = require("jsonwebtoken");
const config = process.env;
const project = require("../model/project")
const employee = require("../model/employee")

const verifyToken = (req,res,next) => {
    const token = req.body.token || req.query.token || req.header["x-access-token"];

    if(!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decode = jwt.verify(token,"joblink");
        req.user = decode; 
        // req.user = User.find({_id:decode._id});
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}
