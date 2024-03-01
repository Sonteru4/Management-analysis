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
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    managerName: {
      type: String,
      required: true,
    },
  },
  projectMembers: [{
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    memberName: {
      type: String,
    },
    memberRole: {
      type: String,
    },
  }],
  allTasks: [{
    taskTitle: {
      type: String,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    taskStatus: {
      type:String
    },
  }],
  completedTasks: [{
    taskTitle: {
      type: String,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    taskStatus: {
      type:String
    },
  }],
  pendingTasks: [{
    taskTitle: {
      type: String,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    taskStatus: {
      type:String
    },
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
