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
            app.delete("/delete-all-data",authRouter)
            
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
            app.delete('/delete-all-users',userRouter)

            // PROJECT REQUESTS
            app.get("/get-all-projects", projectRouter);
            app.get("/get-project-by-id/:projectId",projectRouter)
            app.get("/get-project-members-by-id/:projectId",projectRouter)
            app.get("/get-all-tasks-by-project-id/:projectId",projectRouter)
            app.get("/get-project-overall-performance-by-id/:projectId",projectRouter)
            app.post("/add-new-member-by-project-id/:projectId",projectRouter)
            app.post("/add-new-task-by-project-id/:projectId",projectRouter)
            app.put("/edit-project-by-id/:projectId",projectRouter)
            app.delete("/remove-member-from-project-by-id/:projectId",projectRouter)
            app.delete("/delete-project-by-id/:projectId",projectRouter)
            app.delete('/delete-all-projects',projectRouter)


            // TASK REQUESTS
            app.get("/get-all-tasks", taskRouter);
            app.get("/get-task-by-id/:taskId", taskRouter);
            app.put("/edit-task-by-id/:taskId",taskRouter);
            app.post("/change-task-status_by-id/:taskId",taskRouter)
            app.post("/add-comment-by-id/:taskId",taskRouter)
            app.delete("/delete-task-by-id/:taskId",taskRouter)
            app.delete('/delete-all-tasks',taskRouter)








             

            
        })  
    } catch (error) {
        console.log(`Error Connecting to the database: ${error}`)   
    }
})









