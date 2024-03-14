const express = require("express");
const projectRouter = express.Router();
const projectController = require("../controller/projectController");

// -----GET REQUESTS-----
projectRouter.get("/get-all-projects", projectController.get_all_projects);//
projectRouter.get("/get-project-by-id/:projectId",projectController.get_project_by_id)//
projectRouter.get("/get-project-members-by-id/:projectId",projectController.get_project_members_by_id)//
projectRouter.get("/get-all-tasks-by-project-id/:projectId",projectController.get_all_tasks_by_project_id)//
projectRouter.get("/get-project-overall-performance-by-id/:projectId",projectController.get_project_overall_performance_by_id)//

projectRouter.post("/add-new-member-by-project-id/:projectId",projectController.add_member_to_project_by_id)//
projectRouter.post("/add-new-task-by-project-id/:projectId",projectController.add_new_task_to_project_by_id)//
projectRouter.post("/add-media-to-project/:projectId",projectController.add_new_media_to_project) 
projectRouter.post("/add-comment-to-project-by-id/:projectId",projectController.add_comment_by_project_id)

projectRouter.put("/edit-project-by-id/:projectId",projectController.edit_project_by_id)//

projectRouter.delete("/remove-member-from-project-by-id/:projectId",projectController.remove_member_from_project_by_id)//
projectRouter.delete("/delete-project-by-id/:projectId",projectController.delete_project_by_id)
projectRouter.delete("/delete-all-projects",projectController.delete_all_projects)
projectRouter.delete("/remove-media-from-project/:projectId",projectController.remove_media_from_project)



module.exports = projectRouter;