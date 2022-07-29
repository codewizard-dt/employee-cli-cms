# Employee CMS on Command Line
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://opensource.org/licenses/MIT)

## A robust content management system for the command line
Manage your company's employees. View, add, update, and delete employees, as well as their roles, managers, and departments. Data is stored in MySQL. 

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
# Installation
- Clone repository
- Run `npm i` for dependencies
- Add your MySQL connection details to `.env`


# Usage
## View employees
See all employees' ids and names, as well as their department, role, salary and manager.

## View roles
See all roles' ids and titles, as well as their department, salary, and number of employees who have the role.

## View departments
See all departments' ids and names, as well as number of employees and number of roles in that department.

## View budgets
See the budgets of each department, which includes the number of employees in the department, the sum of all their salaries, and their average salary.

## View employees by manager
Select a manager, then see all the employees they oversee including department, title, and salary.

## View employees by role
Select a role, then see all employees with that role and their manager.

## View employees by department
Select a deparment, then see all employees in that department with their title, salary, and manager.

## Add a role
Create a new role based on user provided title, salary, and department.

## Add a department
Create a new department based on user provided department name.

## Add an employee
Create a new employee based on user provided name, role, and manager.

## Change an employee's role
Select an employee, and then select a new role for them.

## Change an employee's manager
Select an employee, and then select a new manager for them.

## Delete a role
Select from a list of current roles and delete one.

## Delete a department
Select from a list of current departments and delete one.

## Delete an employee
Select from a list of current employees and delete one.

## QUIT
Exit the program.



# License
This project is provisioned under the [MIT License](https://opensource.org/licenses/MIT)

# Contributing
[Repo link](https://github.com/codewizard-dt/employee-cli-cms)

Do you want to help make this project better? Visit the the repo to check out existing issues or create a new branch to start working on a suggested feature

# Questions
If you have any questions, please contact me on [Github](https://github.com/codewizard-dt) or [email](mailto:david@codewizard.app).