const Task = require("../model/task")
const User = require("../model/user")
const Project = require("../model/project")


exports.get_all_tasks = async (req,res)=>{
    try {
        // Fetch all tasks from the database
        const tasks = await Task.find();
    
        // Respond with the fetched tasks
        res.status(200).json(tasks);
      } catch (error) {
        console.error(error);
        // Handle errors appropriately
        res.status(500).json({ error: 'Internal Server Error' });
      }}

exports.get_task_by_id = async(req,res)=>{
    try {
        const taskId = req.params.taskId; // Use req.params to get the task ID from the URL
    
        // Find the task in the database based on the provided task ID
        const task = await Task.findById(taskId)
        .populate('project')
        .populate('assignedBy')
        .populate('assignedTo')
       
        if (!task) {
          // If the task is not found, respond with a 404 status
          return res.status(404).json({ error: 'Task not found' });
        }
    
        // Respond with the fetched task
        res.status(200).json(task);
      } catch (error) {
        console.error(error);
        // Handle errors appropriately
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


exports.edit_task_by_id= async(req,res)=>{
  try {
    const taskId = req.params.taskId;
    const { taskTitle, taskDescription, dueDate,taskStatus,taskPriority} = req.body;

    // Implement the logic to edit the task in the database
    // Use the Task model and its findOneAndUpdate method
    // const editedTask = await Task.findOneAndUpdate(
    //   {  _id: taskId },
    //   { title, description, details, dueDate },
    //   { new: true } // This option ensures you get the updated document in the response
    // );

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" ,status:false});
    }

    // Update project properties with the new values
    task.taskTitle = taskTitle;
    task.taskDescription = taskDescription;
    task.taskStatus = taskStatus;
    task.dueDate = dueDate
    task.taskPriority = taskPriority

    const editedTask = await task.save()

    if (!editedTask) {
      // Handle the case where the task with the given ID is not found
      return res.status(404).json({ error: "Task not found",editStatus: false });
    }

    // Respond with the edited task or any relevant information
    res.status(200).json({ message: "Task edited successfully", editStatus: true });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error",editStatus: true });
  }
  
}

exports.add_comment_by_task_id= async(req,res)=>{
  try {
    const taskId = req.params.taskId;
    const { comment } = req.body;

    // Implement the logic to add a comment to the task in the database
    // Use the Task model and its findOneAndUpdate method
    const updatedTask = await Task.findOneAndUpdate(
      { taskId },
      { $push: { comments: comment } },
      { new: true } // This option ensures you get the updated document in the response
    );

    if (!updatedTask) {
      // Handle the case where the task with the given ID is not found
      return res.status(404).json({ error: "Task not found" });
    }

    // Respond with the updated task or any relevant information
    res.status(200).json({ message: "Comment added successfully", task: updatedTask });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }

  
}

exports.change_task_status_by_id= async(req,res)=>{
  try {
    const taskId = req.params.taskId;
    const { newStatus } = req.body;

    // Implement the logic to change the task status in the database
    // Use the Task model and its findOneAndUpdate method
    const updatedTask = await Task.findOneAndUpdate(
      { "taskId": taskId },
      { $set: { taskStatus: newStatus } },
      { new: true } // This option ensures you get the updated document in the response
    );

    if (!updatedTask) {
      // Handle the case where the task with the given ID is not found
      return res.status(404).json({ error: "Task not found" });
    }

    // Respond with the updated task or any relevant information
    res.status(200).json({ message: "Task status changed successfully", task: updatedTask });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }
  
}

exports.delete_task_by_id = async(req,res)=>{
  try {
    const taskId = req.params.taskId;

    // Implement the logic to delete the task from the database
    // Use the Task model and its findOneAndDelete method
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      // Handle the case where the task with the given ID is not found
      return res.status(404).json({ error: "Task not found" ,deleteStatus:false});
    }

    // Respond with a success message or any relevant information
    res.status(200).json({ message: "Task deleted successfully",deleteStatus:false});
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }
  
}


exports.delete_all_tasks = async (req, res) => {
  try {
    console.log("delete all task called");
    await Task.deleteMany();
    res.status(200).json({ message: 'All tasks deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


