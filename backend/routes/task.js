const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controller/taskController");

taskRouter.get("/get-all-tasks", taskController.get_all_tasks);
taskRouter.get("/get-task-by-id/:taskId", taskController.get_task_by_id);

taskRouter.put("/edit_task_by_id/:taskId",taskController.edit_task_by_id);
taskRouter.post("/change_task_status_by_id/:taskId",taskController.change_task_status_by_id)
taskRouter.post("/add_comment_by_id",taskController.add_comment_by_task_id)

taskRouter.delete("/delete_task_by_id",taskController.delete_task_by_id)
module.exports = taskRouter;