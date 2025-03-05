import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import SignupImage from "./images/signup page.png";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    phone: "",
    location: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Sending data to backend:", formData); // 🛠 Debugging step

        const response = await fetch("http://localhost:3001/signup/signup", {
          // ✅ Changed to 3001
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("Server Response:", data); // 🛠 Debugging step

        if (response.ok) {
          alert("Signup Successful!");
          navigateBasedOnPosition(formData.position);
        } else {
          setErrors(data.errors || {});
        }
      } catch (error) {
        console.error("Signup error:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const navigateBasedOnPosition = (position) => {
    if (position === "engineer") navigate("/site-engineer");
    else if (position === "surveyor") navigate("/surveyor");
    else if (position === "admin") navigate("/dashboard");
    else alert("Invalid position. Please select a valid option.");
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name) errors.name = "Name is required";

    if (!data.position) errors.position = "Position is required";

    if (!data.phone) errors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(data.phone))
      errors.phone = "Phone number must be exactly 10 digits";

    if (!data.location) errors.location = "Site location is required";

    if (!data.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      errors.email = "Invalid email format";

    if (!data.password) errors.password = "Password is required";
    else if (data.password.length < 6)
      errors.password = "Password must be at least 6 characters long";
    return errors;
  };

  return (
    <div className="signup-page">
      <form id="signup-form" onSubmit={handleSubmit}>
        <h2>Enter relevant details</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <select
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
        {errors.position && <p className="error-message">{errors.position}</p>}

        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}

        <input
          type="text"
          name="location"
          placeholder="Enter your site location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <p className="error-message">{errors.location}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>

      <img src={SignupImage} alt="sign up page" className="signup-image" />
    </div>
  );
}

export default SignUp;
