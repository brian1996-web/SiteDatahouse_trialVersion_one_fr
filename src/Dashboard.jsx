import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard({ children }) {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Construction Co.</h2>
        <nav className="menu">
          <ul>
            <li className="menu-item active"><Link to="/">Dashboard</Link></li>
            <li className="menu-item"><Link to="/projects">Projects</Link></li>
            <li className="menu-item">Team</li>
            <li className="menu-item">Reports</li>
            <li className="menu-item">Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1>Nec-T Dashboard</h1>
          <div className="user-profile">
            <span className="user-name">John Doe</span>
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="user-avatar"
            />
          </div>
        </header>

        {/* Overview Cards */}
        <section className="overview-cards">
          <div className="card">
            <h3>Total Projects</h3>
            <p>25</p>
          </div>
          <div className="card">
            <h3>Active Projects</h3>
            <p>15</p>
          </div>
          <div className="card">
            <h3>Completed</h3>
            <p>8</p>
          </div>
          <div className="card">
            <h3>Pending</h3>
            <p>2</p>
          </div>
        </section>

        {/* Children Content */}
        <section className="dynamic-content">
          {children}
        </section>

        {/* Project Table */}
        <section className="project-table">
          <h2>Projects Overview</h2>
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Highway Construction</td>
                <td>Active</td>
                <td>
                  <progress value="70" max="100"></progress> 70%
                </td>
                <td>March 2025</td>
              </tr>
              <tr>
                <td>Residential Complex</td>
                <td>Completed</td>
                <td>
                  <progress value="100" max="100"></progress> 100%
                </td>
                <td>Dec 2024</td>
              </tr>
              <tr>
                <td>Bridge Expansion</td>
                <td>Pending</td>
                <td>
                  <progress value="30" max="100"></progress> 30%
                </td>
                <td>May 2025</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
