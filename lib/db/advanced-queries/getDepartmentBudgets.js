const promiseQuery = require("../promiseQuery")

/**
 * Gets all departments
 * `total_budget` is the sum of the salaries of each employee in the department
 * `number_employees` is the total number of employees in the department
 * `average_salary` is the average salary of the employees in the department
 * `LEFT JOIN roles` ensures we include any department without roles
 * `LEFT JOIN employees` ensures we include departments without employees
 * @returns DB query result as promise
 */
function getDepartmentBudgets() {
  return promiseQuery(`
    SELECT 
      name as department, 
      SUM(roles.salary) as total_budget, 
      COUNT(employees.id) as number_employees, 
      AVG(roles.salary) as average_salary
    FROM departments
    LEFT JOIN roles ON roles.department_id = departments.id
    LEFT JOIN employees ON employees.role_id = roles.id
    GROUP BY departments.id
  `)
}

module.exports = getDepartmentBudgets