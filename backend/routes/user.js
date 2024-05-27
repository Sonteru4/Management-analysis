const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

// Register a new user
userRouter.get("/get-all-users", userController.get_all_users);//
userRouter.get("/get-user-by-id/:userId", userController.get_user_by_id);//
userRouter.get("/get-all-my-projects-by-user-id/:userId",userController.get_all_my_projects_by_user_id)//
userRouter.get("/get-all-involved-projects-by-user-id/:userId",userController.get_all_involved_projects_by_user_id)//
userRouter.get("/get-all-tasks-by-user-id/:userId",userController.get_all_tasks_by_user_id)//
userRouter.get("/get-all-completed-tasks-by-user-id/:userId",userController.get_all_completed_tasks_by_user_id)//
userRouter.get("/get-all-pending-tasks-by-user-id/:userId",userController.get_all_pending_tasks_by_user_id)//
userRouter.post("/create-new-project-for-user-id/:userId",userController.create_new_project_for_user_id)//

userRouter.put("/update-user-profile/:userId",userController.update_user_profile_by_user_id)//
userRouter.delete("/delete-user/:userId",userController.delete_user_by_user_id)//

userRouter.delete("/delete-all-users",userController.delete_all_users)


module.exports = userRouter;