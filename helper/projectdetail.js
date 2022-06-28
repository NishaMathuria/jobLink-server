const project = require("../model/project");
const project = require("../model/project");

const projectdetail = async(req, res) => {
    const project = await project.findById(req.project.id).populate(req.historyType);
    let data = employee[req.historyType].map((details) => {
        return {
            projectTitle: details.projectTitle,
            projectDescription: details.projectDescription,
            startDate: details.startDate,
            endDate: details.endDate,
            projectLocation: details.projectLocation,
            selectSupervisor: details.selectSupervisor,
            expectedMembers: details.expectedMembers,
            addUser: details.addUser
        };
    });
    res.send(data);
};
module.exports = projectdetail;