const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controller/taskController");

taskRouter.get("/get-all-tasks", taskController.get_all_tasks);//
taskRouter.get("/get-task-by-id/:taskId", taskController.get_task_by_id);//
taskRouter.put("/edit-task-by-id/:taskId",taskController.edit_task_by_id);//
taskRouter.put("/change-task-status-by-id/:taskId",taskController.change_task_status_by_id)//
taskRouter.post("/add-comment-by-id/:taskId",taskController.add_comment_by_task_id)//
taskRouter.delete("/delete-task-by-id/:taskId",taskController.delete_task_by_id)//
taskRouter.delete("/delete-all-tasks",taskController.delete_all_tasks)//
taskRouter.post("/add-media-to-task/:taskId",taskController.add_new_media_to_project)//
taskRouter.delete("/remove-media-from-task/:taskId",taskController.remove_media_from_task)//



module.exports = taskRouter;