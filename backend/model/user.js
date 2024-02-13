// define the user schema
const mongoose = require("mongoose");

// Username: A unique identifier for the user.
// Email: The email address associated with the user's account.
// Password: A secure, hashed representation of the user's password.
// Name: The user's full name.
// Profile Picture: A link or reference to the user's profile picture.
// Bio: A short description or biography about the user.
// Date of Birth: The user's date of birth.
// Role or Type: The role or type of user (e.g., regular user, admin, etc.).
// Creation Date: The date when the user account was created.
// Last Login Date: The date and time of the user's last login.
// Projects: An array or reference to the projects associated with the user.
// Tasks Assigned: An array or reference to tasks assigned to the user.

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        unique: true,
    },
    token: { type: String },
    email: {
        type: String,
        // required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
    },
    role:{
        type : String,
        // required:true
    },
    dateOfBirth:{
        type:String,
        // required:true
    },
    lastLoginDate:{
        type:Date  
    },
    loginStatus:{
        type:Boolean
    },
    allTasks:{
        type:[{type:mongoose.Types.ObjectId,ref:'Task'}],
    },
    completedTasks:{
        type:[{type:mongoose.Types.ObjectId,ref:'Task'}],
    },
    pendingTasks:{
        type:[{type:mongoose.Types.ObjectId,ref:'Task'}],
    },
    myProjects:{
        type:[{type: mongoose.Types.ObjectId,ref:'Project'}]
    },
    involvedProjects:{
        type:[{type: mongoose.Types.ObjectId,ref:'Project'}],
    },
    profilePictureURL:{
        type:String
    },
    bio:{
        type:String,
        required:false
    }




});
// Add any additional user-related fields here

const User = mongoose.model("User", userSchema);

module.exports = User;
