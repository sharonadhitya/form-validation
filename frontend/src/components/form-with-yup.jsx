import React, { useState } from "react";
import * as Yup from "yup";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    employeeId: Yup.string()
      .required("Employee ID is required")
      .max(10, "Employee ID cannot exceed 10 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    department: Yup.string().required("Department is required"),
    dateOfJoining: Yup.date()
      .max(new Date(), "Future dates are not allowed")
      .required("Date of Joining is required"),
    role: Yup.string().required("Role is required"),
  });

  const departments = ["HR", "Engineering", "Marketing", "Finance"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await fetch("http://localhost:3000/api/add-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Employee added successfully!");
        setFormData({
          name: "",
          employeeId: "",
          email: "",
          phoneNumber: "",
          department: "",
          dateOfJoining: "",
          role: "",
        });
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "An error occurred while adding the employee.");
        setErrors(data.errors || {});
      }
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      employeeId: "",
      email: "",
      phoneNumber: "",
      department: "",
      dateOfJoining: "",
      role: "",
    });
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Add Employee</h2>

      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          placeholder="Enter employee ID"
        />
        {errors.employeeId && <div className="error">{errors.employeeId}</div>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
      </div>

      <div>
        <label>Department:</label>
        <select name="department" value={formData.department} onChange={handleChange}>
          <option value="">Select a department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors.department && <div className="error">{errors.department}</div>}
      </div>

      <div>
        <label>Date of Joining:</label>
        <input
          type="date"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleChange}
        />
        {errors.dateOfJoining && <div className="error">{errors.dateOfJoining}</div>}
      </div>

      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Enter role"
        />
        {errors.role && <div className="error">{errors.role}</div>}
      </div>

      <div className="buttons">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
