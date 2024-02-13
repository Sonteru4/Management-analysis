// define the task schema
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority:{
    type:String,
    enum:['high','medium','low']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assignedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  taskStatus: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    default: 'To Do',
  },
  dueDate: {
    type: Date,
  },
  attachedMediaURLSet:{
    type:[{type:String}]
  },
  
  comments:{
    type:[{type: mongoose.Schema.Types.ObjectId,
       ref: 'Comment'}]
  }
  

  // Add any additional task-related fields here
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
