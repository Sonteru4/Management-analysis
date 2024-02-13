const Project = require("../model/project")
const User = require("../model/user")
const Task = require("../model/task")


// ----- GET REQUESTS -----
exports.get_all_projects = async (req,res)=>{
    try {
        // Retrieve all projects from the database
        const projects = await Project.find();
    
        res.status(200).json(projects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }}

exports.get_project_by_id = async(req,res)=>{
    try {
        const  projectId = req.params.projectID; 
        // Retrieve the project with the given projectID from the database
        const project = await Project.find({"projectID":projectId});
    
        // Check if the project exists
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
    
        res.status(200).json(project);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.get_project_members_by_id = async(req,res)=>{
    try {
        const  projectId = req.params.projectID; 
        // Retrieve the project with the given projectID from the database
        const project = await Project.find({"projectID":projectId});
    
        // Check if the project exists
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
    
        // Retrieve the project members from the project
        const projectMembers = project.projectMembers;
    
        res.status(200).json(projectMembers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.get_all_tasks_by_project_id = async(req,res)=>{
    try {
        const  projectId = req.params.projectID; 
        // Retrieve the project with the given projectID from the database
        const project = await Project.find({"projectID":projectId});
    
        // Check if the project exists
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
    
        // Retrieve all tasks associated with the project
        const allTasks = project.allTasks;
    
        res.status(200).json(allTasks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }    
}

// exports.get_all_pending_tasks_by_id = async(req,res)=>{
//     const  projectID = req.params.projectID; 
//     console.log ('Getting project all pending tasks with project id : ' + projectID);
// }

// exports.get_all_completed_tasks_by_id = async(req,res)=>{
//     const  projectID = req.params.projectID; 
//     console.log ('Getting project all completed tasks with project id : ' + projectID);
// }

// exports.get_all_project_attached_media_by_id = async(req,res)=>{
//     const  projectID = req.params.projectID; 
//     console.log ('Getting project all attached media with project id : ' + projectID);
// }

exports.get_project_overall_performance_by_id = async(req,res)=>{
    try {
        const  projectId = req.params.projectID; 
        // Retrieve the project with the given projectID from the database
        const project = await Project.find({"projectID":projectId});
    
        // Check if the project exists
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
    
        // Calculate overall performance based on your criteria
        // Replace the following logic with your actual performance calculation
        const overallPerformance = calculateOverallPerformance(project);
    
        res.status(200).json({ overallPerformance });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}
function calculateOverallPerformance(project) {
    // Your performance calculation logic goes here
    // Example: Calculate the average completion rate of tasks
    const completedTasksCount = project.completedTasks.length;
    const allTasksCount = project.allTasks.length;
  
    if (allTasksCount === 0) {
      return 0; // Default value if no tasks are available
    }
  
    const completionRate = (completedTasksCount / allTasksCount) * 100;
    return completionRate;
  }


// ----- POST REQUESTS -----
exports.add_new_task_to_project_by_id = async (req, res) =>{
  try {
    const projectId = req.params.projectId;
    const { title, description, dueDate, assignedTo,assignedBy,priority,taskStatus ,attachedMediaURLSet} = req.body;

    // Validate the input data, you can add more validation based on your requirements

    // Create a new task using the Task model
    const newTask = new Task({
      title:title,
      description:description,
      priority:priority,
      project: projectId, // Assign the task to the specified project
      assignedBy:assignedBy,
      assignedTo:assignedTo,
      taskStatus:taskStatus,
      dueDate:dueDate,
      attachedMediaURLSet:attachedMediaURLSet?attachedMediaURLSet:[],
      comments:[] 
    });

    // Save the new task to the database
    await newTask.save();

    // Update the project's array of all tasks
    await Project.findByIdAndUpdate(
      projectId,
      { $push: { allTasks: newTask._id } }, // Assuming 'allTasks' is the array field in the Project model
      { new: true }
    );

    // Respond with success or any relevant information
    res.status(201).json({ message: "New task added to the project successfully", task: newTask });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }

}

exports.add_member_to_project_by_id = async(req,res)=>{
  try {
    const projectId = req.params.projectId;
    const { memberId } = req.body;

    // Validate the input data, you can add more validation based on your requirements

    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if the member exists (you might want to validate this based on your user schema)
    const member = await User.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the member is already part of the project
    if (project.projectMembers.includes(memberId)) {
      return res.status(400).json({ error: "User is already a member of the project" });
    }

    // Add the member to the project's array of project members
    project.projectMembers.push(memberId);
    await project.save();

    // Respond with success or any relevant information
    res.status(200).json({ message: "Member added to the project successfully", project });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }

}



// ----- UPDATE REQUESTS -----
exports.remove_member_from_project_by_id =async (req,res)=>{
  try {
    const projectId = req.params.projectId;
    const { memberId } = req.body;

    // Validate the input data, you can add more validation based on your requirements

    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if the member exists (you might want to validate this based on your user schema)
    const member = await User.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the member is a part of the project
    if (!project.projectMembers.includes(memberId)) {
      return res.status(400).json({ error: "User is not a member of the project" });
    }

    // Remove the member from the project's array of project members
    project.projectMembers = project.projectMembers.filter(id => id !== memberId);
    await project.save();

    // Respond with success or any relevant information
    res.status(200).json({ message: "Member removed from the project successfully", project });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }

}

exports.edit_project_by_id = async(req,res)=>{
  try {
    const projectId = req.params.projectId;
    const { projectName, projectDescription, startDate, projectStatus } = req.body;

    // Validate the input data, you can add more validation based on your requirements

    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update project properties with the new values
    project.projectName = projectName;
    project.projectDescription = projectDescription;
    project.startDate = startDate;
    project.projectStatus = projectStatus;

    // Save the updated project
    await project.save();

    // Respond with success or any relevant information
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }

}
// ----- DELETE REQUESTS -----





