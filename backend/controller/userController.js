const User = require("../model/user"); // Assuming you have a User model
const Task = require("../model/task")
const Project = require("../model/project")

// ----- GET REQUESTS ------
exports.get_all_users = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.get_user_by_id = async(req,res)=>{
    try {
        const userId = req.params.userId;
        
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).json({ error: "Invalid userId format" });
        }
    
        const user = await User.find({"userId":userId});
    
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
    
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).json({ error: "Invalid userId format" });
        }
    
        // Find the user by userId
        const user = await User.find({"userId":userId})
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Retrieve the user's projects
        const myProjects = await Project.find({ userId: { $in: user.myProjects } });
    
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
        const user = await User.find({"userId":userId});
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Retrieve the user's involved projects
        const involvedProjects = await Project.find({
          _id: { $in: user.involvedProjects },
        });
    
        res.status(200).json(involvedProjects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.get_all_tasks_by_user_id=async(req,res)=>{
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
    
        // Retrieve all tasks associated with the user
        const allTasks = await Task.find({userId: { $in: user.allTasks } });
    
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


// ----- UPDATE REQUESTS -----
exports.update_user_profile_by_user_id = async(req,res)=>{
  try {
    const userId = req.params.userId;
    const updatedUserProfile = req.body;

    // Implement the logic to update the user profile in the database
    // Use the User model and its findOneAndUpdate method
    const updatedUser = await User.findOneAndUpdate({ "userId":userId }, updatedUserProfile, { new: true });

    if (!updatedUser) {
      // Handle the case where the user with the given username is not found
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the updated user profile
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    // Handle any internal server error
    res.status(500).json({ error: "Internal Server Error" });
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