const Project = require("../model/project")
const User = require("../model/user")
const Task = require("../model/task")
const File = require('../model/file'); 
const fs = require('fs').promises;
 // Assuming your file model is in the correct path

const multer = require("multer")
const upload = multer({ dest: 'uploads/' }); // Specify the destination folder for uploaded files

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
        const  projectId = req.params.projectId; 
        // Retrieve the project with the given projectID from the database
        const project = await Project.findById(projectId)
        .populate("allTasks")
        .populate("projectManager")
        .populate("projectMembers")

    
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
    console.log(req.body);
    const projectId = req.params.projectId;
  
    const { taskTitle, taskDescription, dueDate, assignedTo,assignedBy,taskPriority,taskAttachedMediaURLSet} = req.body;

    // Validate the input data, you can add more validation based on your requirements


    // Create a new task using the Task model
    const newTask = new Task({
      taskTitle:taskTitle,
      taskDescription:taskDescription,
      taskPriority:taskPriority,
      project: projectId, // Assign the task to the specified project
      assignedBy:assignedBy,
      assignedTo:assignedTo,
      taskStatus:'In Progress',
      dueDate:dueDate,
      taskAttachedMediaURLSet:taskAttachedMediaURLSet?taskAttachedMediaURLSet:[],
      taskComments:[] 
    });

    // Save the new task to the database
    await newTask.save();

    // Update the project's array of all tasks
   const PROJECT = await Project.findByIdAndUpdate(
    projectId,
      { $push: { allTasks: newTask._id } }, // Assuming 'allTasks' is the array field in the Project model
      { new: true }
    );
   const USER = await User.findByIdAndUpdate(
      assignedTo,
      {$push:{allTasks:newTask._id}},
      {new :true}
    )


    console.log("ASSIGNED USER DATA : ",USER)
    // if project Doesnt Exist 
    if(!PROJECT){
      await  Task.deleteOne(newTask._id)
      res.status(404).json({message:"Project not found!",status:false});
    }
    // if assignee doesnt exist
    else if(!USER){
      await  Task.deleteOne(newTask._id)
      res.status(404).json({message:"Assignee not Found!",status:false});
    }

    // update the pending Tasks of the assignee


    // Respond with success or any relevant information
    res.status(201).json({ message: "New task added to the project successfully", taskId: newTask._id,status:true });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error",status:false });
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

    // Update the involvedProjects array of the newly added member
    if (!member.involvedProjects.includes(projectId)) {
      member.involvedProjects.push(projectId);
      await member.save();
      }
    
    

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
    console.log('this is the id : ',memberId)
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
    project.projectMembers = project.projectMembers.filter((id )=> id.toString() !== memberId.toString());
    await project.save();

    console.log(project.projectMembers,"after removing")

    // Remove the projectId from the involvedProjects array of the member
    member.involvedProjects = member.involvedProjects.filter((id) => id.toString() !== projectId.toString());
    await member.save();
    

    // Respond with success or any relevant information
    res.status(200).json({ message: "Member removed from the project successfully", deleteStatus:true });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }

}

exports.edit_project_by_id = async(req,res)=>{
  try {
    const projectId = req.params.projectId;
    const { projectName, projectDescription, projectStatus } = req.body;

    // Validate the input data, you can add more validation based on your requirements

    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" ,status:false});
    }

    // Update project properties with the new values
    project.projectName = projectName;
    project.projectDescription = projectDescription;
    project.projectStatus = projectStatus;

    // Save the updated project
    await project.save();

    // Respond with success or any relevant information
    res.status(200).json({ message: "Project updated successfully", status:true});
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error",status:false });
  }


}

exports.delete_project_by_id=async(req,res)=>{
  try {
    const projectId = req.params.projectId;

    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found',status:false });
    }

   // Get all task IDs within the project
   const taskIds = project.allTasks;

   // Delete the project and tasks
   await Project.findByIdAndDelete(projectId);
   await Task.deleteMany({ _id: { $in: taskIds } });

   // Remove the project from the involvedProjects array of project members
   await User.updateMany(
     { _id: { $in: project.projectMembers } },
     { $pull: { involvedProjects: projectId } }
   );

   // Remove the project from the myProjects array of the project manager
   await User.findByIdAndUpdate(
     project.projectManager,
     { $pull: { myProjects: projectId } }
   );

   // Remove tasks from the allTasks array of all project members
   await User.updateMany(
     { _id: { $in: project.projectMembers } },
     { $pullAll: { allTasks: taskIds } }
   );

    // Respond with success or any relevant information
    res.status(200).json({ message: 'Project deleted successfully' ,deleteStatus:true});
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: 'Internal Server Error',deleteStatus:false });
  }

    // ---------------------------------------------------------------------


}



exports.delete_all_projects = async (req, res) => {
  try {


    await Project.deleteMany();
    res.status(200).json({ message: 'All projects deleted successfully' });



  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.add_new_media_to_project = async(req,res)=>{
  try {
    const projectId = req.params.projectId;
    const {mediaDataArray} = req.body; // Assuming the URL is sent in the request body

    console.log("MEDIA ARRAY IN BACKEND : ",mediaDataArray)
    // Validate if projectId and mediaUrl are provided
    // Find the project by projectId
    const project = await Project.findById(projectId);

    // Check if the project exists
    if (!project) {
      return res.status(404).json({ message: 'Project not found',addSuccess:false });
    }

    // Append the mediaUrl to the attachedmediaurlset array
    // project.attachedmediaurlset.push(mediaUrl);
    project.attachedMediaURLSet.push(...mediaDataArray);


    // Save the updated project
    await project.save()

    res.status(200).json({ message: 'Media URL added to project', addSuccess:true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error',addSuccess:false });
  }

}










