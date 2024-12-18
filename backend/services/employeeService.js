const pool = require("../config/db");

const EmployeeService = {
  async checkDuplicate(employeeId, email) {
    const result = await pool.query(
      "SELECT * FROM employees WHERE employee_id = $1 OR email = $2",
      [employeeId, email]
    );
    return result.rows.length > 0;
  },

  async addEmployee({ name, employeeId, email, phoneNumber, department, dateOfJoining, role }) {
    await pool.query(
      "INSERT INTO employees (name, employee_id, email, phone_number, department, date_of_joining, role) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [name, employeeId, email, phoneNumber, department, dateOfJoining, role]
    );
  },
};

module.exports = EmployeeService;
