import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import ProjectDetails from "./ProjectDetails";
import SignUp from "./SignUp";
import Login from "./Login";
import SiteEngineer from "./SiteEngineer";
import Surveyor from "./Surveyor";
import Admin from "./Admin"
import Dashboard from "./Dashboard";


function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Sign Up Route */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Projects Route */}
        <Route path="/projects" element={<Projects />} />
        
        {/* Project Details Route */}
        <Route path="/project/:id" element={<ProjectDetails />} />
        
        {/* Site Engineer Route */}
        <Route path="/site-engineer" element={<SiteEngineer />} />


          {/* Surveyor */}
        <Route path="/surveyor" element={<Surveyor />} />

          {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Dashboard */}

        <Route path="/dashboard" element={<Dashboard />} />

      {/* Projectdetai */}
        <Route path="/project/:id" element={<ProjectDetails />} />



      </Routes>
    </Router>
  );
}

export default App;
