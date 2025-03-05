import React from 'react';
import './Admin.css';

function Admin() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-content">
        <p>Welcome, Admin! Here are your management tools:</p>
        <ul>
          <li><button className="dashboard-btn">View Users</button></li>
          <li><button className="dashboard-btn">Manage Projects</button></li>
          <li><button className="dashboard-btn">Reports</button></li>
          <li><button className="dashboard-btn">Settings</button></li>
        </ul>
      </div>
    </div>
  );
}

export default Admin;
