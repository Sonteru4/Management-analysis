// define the project schema
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String, 
  },
  projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  projectMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
],
allTasks: 
[{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Task',
  }],
  startDate:{
    type: Date,
    required:true
  },
projectStatus:{
  type: String,
  enum: ['In Progress', 'Completed'],
},
attachedMediaURLSet:{
  type:[{type:String}]
}

  // Add any additional project-related fields here
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
