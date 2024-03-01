const express = require("express")
const app= express()
const PORT=8000;
var cors = require('cors');
const { connectToDatabase } = require("./config/database");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const taskRouter = require("./routes/task");
app.use(cors());
connectToDatabase().then(()=>{
    try {
        app.listen(PORT,()=>{
            console.log("Connected To Database");
            app.use(express.json())

            // AUTH REQUESTS
            app.post("/register",authRouter)
            app.post("/login",authRouter)
            app.post("/logout",authRouter)
            
            // USER REQUESTS
            app.get("/get-all-users",userRouter)
            app.get("/get-user-by-id/:userId",userRouter)
            app.get("/get-all-my-projects-by-user-id/:userId",userRouter) 
            app.get("/get-all-involved-projects-by-user-id/:userId",userRouter)
            app.get("/get-all-tasks-by-user-id/:userId",userRouter)
            app.get("/get-all-completed-tasks-by-user-id/:userId",userRouter)
            app.get("/get-all-pending-tasks-by-user-id/:userId",userRouter)
            app.post("/create-new-project-for-user-id/:userId",userRouter)
            app.put("/update-user-profile/:userId",userRouter)
            app.delete('/delete-user/:userId',userRouter)

            // PROJECT REQUESTS
            app.get("/get-all-projects", projectRouter);
            app.get("/get-project-by-id/:projectId",projectRouter)
            app.get("/get-project-members-by-id/:projectId",projectRouter)
            app.get("/get-all-tasks-by-project-id/:projectId",projectRouter)
            app.get("/get-project-overall-performance-by-id/:projectId",projectRouter)
            app.post("/add-new_member-by-project-id/:projectId",projectRouter)
            app.post("/add-new-task-by-project-id/:projectId",projectRouter)
            app.put("/edit-project-by-id/:projectId",projectRouter)
            app.delete("/remove-member-from-project-by-id/:projectId",projectRouter)

            // TASK REQUESTS
            app.get("/get-all-tasks", taskRouter);
            app.get("/get-task-by-id/:taskId", taskRouter);
            app.put("/edit_task_by_id/:taskId",taskRouter);
            app.post("/change_task_status_by_id/:taskId",taskRouter)
            app.post("/add_comment_by_id",taskRouter)
            app.delete("/delete_task_by_id",taskRouter)







             

            
        })  
    } catch (error) {
        console.log(`Error Connecting to the database: ${error}`)   
    }
})









