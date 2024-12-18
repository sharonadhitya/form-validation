const employeeSchema = require("../schemas/employeeSchema");
const EmployeeService = require("../services/employeeService");

const EmployeeController = {
  async addEmployee(req, res) {
    try {
      await employeeSchema.validate(req.body, { abortEarly: false });

      const { name, employeeId, email, phoneNumber, department, dateOfJoining, role } = req.body;

      const isDuplicate = await EmployeeService.checkDuplicate(employeeId, email);
      if (isDuplicate) {
        return res.status(400).json({ message: "Employee ID or Email already exists" });
      }

      await EmployeeService.addEmployee({
        name,
        employeeId,
        email,
        phoneNumber,
        department,
        dateOfJoining,
        role,
      });

      res.status(201).json({ message: "Employee added successfully!" });
    } catch (error) {
      if (error.inner) {
        const errors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        return res.status(400).json({ errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = EmployeeController;
