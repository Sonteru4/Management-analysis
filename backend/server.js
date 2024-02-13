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
            app.post("/register",authRouter); 
            app.post("/login",authRouter)  
             //Register User Route

            
        })  
    } catch (error) {
        console.log(`Error Connecting to the database: ${error}`)   
    }
})









