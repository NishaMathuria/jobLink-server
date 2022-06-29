const mongoose = require("mongoose");
const schema = mongoose.Schema;


// employee schema & modal
const EmployeeSchema = new schema (
    {
        firstName: {
            type : String,
            required: true,
        },
        lastName: {
            type : String,
            required: true,
        },
        phoneNumber: {
            type : Number,
            required: true,
        },
        email: {
            type : String,
            unique:true,
            required: true,
        },
        certificate: {
            type : String,
            required: true,
            default: null,
        },
        welder: {
            type : String,
            required: true,
        },
        fitter: {
            type : String,
            required: true,
        },
        rigger: {
            type : String,
            required: true,
        },
        sacffolder: {
            type : String,
            required: true,
        },
        instructionTech: {
            type : String,
            required: true,
        },
        election: {
            type : String,
            required: true,
        },
        mechanic: {
            type : String,
            required: true,
        },
        craneOperator: {
            type : String,
            required: true,
        }
    }
) ;

const Employee = mongoose.model("Employee",Employee);
module.exports = Employee;