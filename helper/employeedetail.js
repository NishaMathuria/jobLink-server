const employee = require("../model/employee");
const employee = require("../model/employee");

const employeedetail = async (req, res) => {
    const employee = await Employee.findById(req.employee.id).populate(req.historyType);
    let data = employee[req.historyType].map((details) => {
        return {
          firstName : details.firstName,
          firstLast : details.firstLast,
          phoneNumber : details.phoneNumber,
          email : details.email,
          certificate : details.certificate,
          welder : details.welder,
          fitter : details.fitter,
          rigger : details.rigger,
          sacffolder : details.sacffolder,
          instrumentTech : details.instrumentTech,
          Election : details.Election,
          Mechanic : details.Mechanic,
          craneOperator : details.craneOperator,
        };
    });
    res.send(data);
};
module.exports = employeedetail;