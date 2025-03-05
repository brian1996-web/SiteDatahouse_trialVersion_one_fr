import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    location: "",
    position: "",
    email:"",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const navigateBasedOnPosition = (position) => {
    if (position === "engineer") {
      navigate("/site-engineer");
    } else if (position === "surveyor") {
      navigate("/surveyor");
    } else if (position === "admin") {
      navigate("/dashboard");
    } else {
      alert("Invalid position. Please select a valid option.");
    }
  };
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Sending login request:", formData); // 🛠 Debugging step
  
        const response = await fetch("http://localhost:3001/login/login", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
         
        });
  
        const data = await response.json();
        console.log("Server Response:", data); // 🛠 Debugging step
  

        console.log("Raw Response:", response);

       

        if (response.ok) {
          localStorage.setItem("token", data.token); // ✅ Save token for authentication
          alert("Login Successful!");
  
          // Navigate based on position
          navigateBasedOnPosition(formData.position);
        } else {
          alert(data.message); // Show error message
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  


  



  const validateForm = (data) => {
    const errors = {};
    if (!data.location) errors.location = "Site location is required";
   
    if (!data.position) errors.position = "Position is required";
   
    if (!data.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      errors.email = "Invalid email format";
   
      if (!data.password) errors.password = "Password is required";
    else if (data.password.length < 6)
      errors.password = "Password must be at least 6 characters long";
    return errors;
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter site location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className="error-messages">{errors.location}</p>}
        </div>
        <div>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your position
            </option>
            <option value="engineer">Engineer</option>
            <option value="admin">Admin</option>
            <option value="surveyor">Surveyor</option>
          </select>
          {errors.position && <p className="error-messages">{errors.position}</p>}
        </div>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-messages">{errors.email}</p>}
        </div>

        
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-messages">{errors.password}</p>}
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
