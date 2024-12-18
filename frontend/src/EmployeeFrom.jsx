import React, { useState } from "react";
import * as Yup from "yup";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import ErrorMessage from "./components/ErrorMessage";
import Message from "./components/Message";

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

    const departments = ["HR", "Engineering", "Marketing", "Finance"];

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");


        try {
            await validationSchema.validate(formData, { abortEarly: false });

            const response = await fetch("https://form-validation-service-969897968223.us-central1.run.app/api/add-employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            console.log(formData)
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
                setErrorMessage(data.message || "An error occurred.");
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
        setFormData({ ...formData, [name]: value });
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

      
            <InputField
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
            />
            <ErrorMessage message={errors.name} />

            <InputField
                label="Employee ID"
                name="employeeId"
                type="text"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="Enter employee ID"
            />
            <ErrorMessage message={errors.employeeId} />

            <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
            />
            <ErrorMessage message={errors.email} />

            <InputField
                label="Phone Number"
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
            />
            <ErrorMessage message={errors.phoneNumber} />

            <SelectField
                label="Department"
                name="department"
                value={formData.department}
                options={departments}
                onChange={handleChange}
            />
            <ErrorMessage message={errors.department} />

            <InputField
                label="Date of Joining"
                name="dateOfJoining"
                type="date"
                value={formData.dateOfJoining}
                onChange={handleChange}
            />
            <ErrorMessage message={errors.dateOfJoining} />

            <InputField
                label="Role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter role"
            />
            <ErrorMessage message={errors.role} />

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
