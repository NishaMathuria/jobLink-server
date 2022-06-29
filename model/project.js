const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProjectSchema = new schema({
    projectTitle:{
        type:String,
        require: true,
    },
    projectDescription:{
        type:String,
        require: true,
    },
    startDate:{
        type:Date,
        require: true,
    },
    endDate:{
        type:Date,
        require: true,
    },
    projectLocation:{
        type:String,
        require: true,
    },
    selectSupervisor:{
        type:String,
        require: true,
    },
    expectedMember:{
        type:String,
        require: true,
    },
    addUser:{
        type:String,
        require: true,
    }
});

const Project = mongoose.model("Project",Project);
module.exports= Project;
