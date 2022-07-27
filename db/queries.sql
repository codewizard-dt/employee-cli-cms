-- Gets all employees with title, salary, department
SELECT employees.id, 
      employees.first_name, 
      employees.last_name, 
      roles.title as title, 
      roles.salary as salary,
      departments.name as department
FROM employees
LEFT JOIN roles ON roles.id = employees.role_id
LEFT JOIN departments ON departments.id = roles.department_id;

-- Who is a manager? (with employee count)
SELECT managers.id, managers.first_name, managers.last_name, COUNT(employees.id) as number_employees, AVG(roles.salary) as average_salary
FROM employees managers
INNER JOIN employees ON managers.id = employees.manager_id
INNER JOIN roles ON roles.id = employees.role_id
GROUP BY managers.id

-- Who is managed by this manager?
SELECT employees.id, first_name, last_name, name as department, title, salary 
FROM employees
LEFT JOIN roles ON roles.id = employees.role_id
LEFT JOIN departments on departments.id = roles.department_id
WHERE manager_id = ?

-- What are all the roles?
SELECT roles.id, title, departments.name as department, salary, COUNT(employees.id) as num_employees
FROM roles
INNER JOIN employees ON employees.role_id = roles.id
INNER JOIN departments on departments.id = roles.department_id
GROUP BY roles.id


-- Which employees have this role?
SELECT employees.id, 
	employees.first_name, 
  employees.last_name, 
  CONCAT(managers.first_name, ' ', managers.last_name) as manager
FROM employees
LEFT JOIN employees managers ON managers.id = employees.manager_id
WHERE employees.role_id = ?
