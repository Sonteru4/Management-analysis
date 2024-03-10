const User = require("../model/user"); // Assuming you have a User model
const Task = require("../model/task")
const Project = require("../model/project")
const mongoose = require("mongoose")

// ----- GET REQUESTS ------
exports.get_all_users = async (req,res)=>{
    try {
        const users = await User.find().populate('myProjects').populate('involvedProjects').populate('allTasks');
        res.status(200).json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.get_user_by_id = async(req,res)=>{
    try {
        const userId = req.params.userId;
        console.log(userId);
        
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).json({ error: "Invalid userId format" });
        }
    
        const user = await User.findById(userId)
        .populate('myProjects')
        .populate('involvedProjects')
        .populate('allTasks');
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

    
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.get_all_my_projects_by_user_id = async(req,res)=>{
    try {
        const userId = req.params.userId;
        console.log(userId)
    
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).json({ error: "Invalid userId format" });
        }
    
        // Find the user by userId
        const user = await User.findById(userId).populate("myProjects")
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Retrieve the user's projects
        const myProjects = user.myProjects;
    
        res.status(200).json(myProjects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.get_all_involved_projects_by_user_id = async(req,res)=>{
    try {
        const userId = req.params.userId;
    
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).json({ error: "Invalid userId format" });
        }
    
        // Find the user by userId
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Retrieve the user's involved projects
        const involvedProjects = await Project.find({
          _id: { $in: user.involvedProjects },
        }).populate('involvedProjects');
    
        res.status(200).json(involvedProjects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.get_all_tasks_by_user_id=async(req,res)=>{
    try {
        const userId = req.params.userId;
        console.log(userId)
    
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).json({ error: "Invalid userId format" });
        }
    
        // Find the user by userId
        const user = await User.findById(userId);
        console.log(user);
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Retrieve all tasks associated with the user
        const allTasks = await Task.find({_id: { $in: user.allTasks } });
    
        res.status(200).json(allTasks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.get_all_completed_tasks_by_user_id=async(req,res)=>{
    try {
        const userId = req.params.userId;
    
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).json({ error: "Invalid userId format" });
        }
    
        // Find the user by userId
        const user = await User.find({"userId":userId});
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Retrieve all completed tasks associated with the user
        const completedTasks = await Task.find({ _id: { $in: user.completedTasks } });
    
        res.status(200).json(completedTasks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.get_all_pending_tasks_by_user_id=async(req,res)=>{
    try {
        const userId = req.params.userId;
    
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).json({ error: "Invalid userId format" });
        }
    
        // Find the user by userId
        const user = await User.find({"userId":userId});
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Retrieve all pending tasks associated with the user
        const pendingTasks = await Task.find({ userId: { $in: user.pendingTasks } });
    
        res.status(200).json(pendingTasks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}



// ----- POST REQUESTS -----
exports.create_new_project_for_user_id = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { projectName, projectDescription } = req.body;

    // Validate the input data, you can add more validation based on your requirements

    // Fetch user details for project manager
    const projectManager = await User.findById(userId);
    if (!projectManager) {
      return res.status(404).json({ error: "Project manager not found" });
    }

    // Create a new project
    const newProject = new Project({
      projectName: projectName,
      projectDescription: projectDescription,
      startDate: `${new Date()}`,
      projectStatus: 'In Progress',
      projectManager:userId,
      projectMembers: [userId],
      completedTasks: [], // Initialize completed tasks array as empty
      pendingTasks: [], // Initialize pending tasks array as empty
      attachedMediaURLSet: [], // Initialize attached media array as empty
    });

    // Save the new project
    await newProject.save();

    // Update the user's myProjects array with the new project
    await User.findByIdAndUpdate(
      userId,
      { $push: { myProjects: newProject._id } },
      { new: true }
    );

    // Respond with success or any relevant information
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }
};




// ----- UPDATE REQUESTS -----
exports.update_user_profile_by_user_id = async(req,res)=>{
  try {
    const userId = req.params.userId;
    const updatedUserProfile = req.body;

    console.log("NEW USER DATA : ",updatedUserProfile)

    // Implement the logic to update the user profile in the database
    // Use the User model and its findOneAndUpdate method
    const USER = await User.findById(userId)
    USER.firstName=updatedUserProfile.firstName
    USER.lastName=updatedUserProfile.lastName
    USER.email=updatedUserProfile.email
    USER.username=updatedUserProfile.username
    USER.dateOfBirth=updatedUserProfile.dateOfBirth
    USER.bio=updatedUserProfile.bio

    const updatedUser = await USER.save()


    if (!updatedUser) {
      // Handle the case where the user with the given username is not found
      return res.status(404).json({ error: "User not found",updateStatus:false });
    }

    // Respond with the updated user profile
    res.status(200).json({message:"User updated successfully",updateStatus:true});
  } catch (error) { 
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error",updateStatus:false });
  }

}

// -----  DELETE REQUESTS -----
exports.delete_user_by_user_id = async(req,res)=>{
  try {
    const userId = req.params.userId;

    // Implement the logic to delete the user from the database
    // Use the User model and its deleteOne method
    const deletedUser = await User.deleteOne({ _id: userId });

    if (deletedUser.deletedCount === 0) {
      // Handle the case where the user with the given ID is not found
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with a success message or any relevant information
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }
  
}


exports.delete_all_users = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};