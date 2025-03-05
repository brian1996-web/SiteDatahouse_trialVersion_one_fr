import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Projects.css";

function Projects() {
  const navigate = useNavigate();

  // Retrieve saved projects from localStorage or initialize with a default project
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects
      ? JSON.parse(savedProjects)
      : [
          {
            id: 1,
            name: "New Project",
            location: "Kampala - Entebbe Road",
            nature: "Highway",
            isEditing: true,
          },
        ];
  });

  // Save projects to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: "New Project",
      location: "New Location",
      nature: "Unknown",
      isEditing: true,
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  const saveProjectField = (id) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? { ...project, isEditing: false } : project
    );
    setProjects(updatedProjects);
  };

  const updateProjectField = (id, field, value) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
  };

  const viewProjectDetails = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="projects">
      <h1>Projects</h1>
      <p>Welcome to the Projects page. Manage your projects below.</p>

      {/* Add Project Button */}
      <button className="add-button" onClick={addProject}>
        Add Project
      </button>

      {/* Scrollable Projects List */}
      <div className="projects-container">
        <ul className="projects-list">
          {projects.map((project) => (
            <li
              key={project.id}
              className="project-item"
              onClick={() => viewProjectDetails(project.id)}
            >
              {project.isEditing ? (
                <div>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      updateProjectField(project.id, "name", e.target.value)
                    }
                    placeholder="Type here the site name"
                    className="project-name-input"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <input
                    type="text"
                    value={project.location}
                    onChange={(e) =>
                      updateProjectField(project.id, "location", e.target.value)
                    }
                    placeholder="Type location"
                    className="project-name-input"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <input
                    type="text"
                    value={project.nature}
                    onChange={(e) =>
                      updateProjectField(project.id, "nature", e.target.value)
                    }
                    placeholder="Type nature"
                    className="project-name-input"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    className="save-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      saveProjectField(project.id);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <span className="project-name">{project.name}</span>
                  <p>Location: {project.location}</p>
                  <p>Nature: {project.nature}</p>
                </div>
              )}
              <button
                className="remove-button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeProject(project.id);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Projects;
