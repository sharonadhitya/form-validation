const yup = require("yup");

const employeeSchema = yup.object({
  name: yup.string().required("Name is required"),
  employeeId: yup
    .string()
    .required("Employee ID is required")
    .max(10, "Employee ID cannot exceed 10 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone Number is required"),
  department: yup.string().required("Department is required"),
  dateOfJoining: yup
    .date()
    .max(new Date(), "Future dates not allowed")
    .required("Date of Joining is required"),
  role: yup.string().required("Role is required"),
});

module.exports = employeeSchema;
