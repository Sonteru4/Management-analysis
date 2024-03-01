import React, { useEffect } from "react";
import "./App.css";
import "aos/dist/aos.css"
import AOS from "aos";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import TaskPage from "./pages/TaskPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";



function App() {
  useEffect(()=>{
    AOS.init();
  },[])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/project-page" element={<ProjectPage/>}/>
          <Route path="/task-page" element={<TaskPage/>}/>
          <Route path ="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
