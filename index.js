const inquirer = require('inquirer')
const table = require('console.table')

const getEmployeeList = require('./lib/db/list/getEmployeeList.js')
const newQuestion = require('./lib/inquirer/newQuestion.js')
const getManagerList = require('./lib/db/list/getManagerList.js')
const getEmployeesByManagerId = require('./lib/db/advanced-queries/getEmployeesByManager.js')
const getRoleList = require('./lib/db/list/getRoleList.js')
const getEmployeesByRoleId = require('./lib/db/advanced-queries/getEmployeesByRole.js')


const pressToContinuePrompt = require('inquirer-press-to-continue');
const getDepartmentList = require('./lib/db/list/getDepartmentList.js')
const getEmployeesByDepartmentId = require('./lib/db/advanced-queries/getEmployeesByDepartment.js')
const currency = require('./lib/numberFormat.js')
const required = require('./lib/inquirer/validation/required.js')
const isNumber = require('./lib/inquirer/validation/isNumber.js')
const insertDepartment = require('./lib/db/insert/insertDepartment.js')
const deleteDepartment = require('./lib/db/delete/deleteDepartment.js')
const insertEmployee = require('./lib/db/insert/insertEmployee.js')
const deleteEmployee = require('./lib/db/delete/deleteEmployee.js')
const insertRole = require('./lib/db/insert/insertRole.js')
const deleteRole = require('./lib/db/delete/deleteRole.js')
const updateEmployeeRole = require('./lib/db/update/updateEmployeeRole.js')
const updateEmployeeManager = require('./lib/db/update/updateEmployeeManager.js')
const getDepartmentBudgets = require('./lib/db/advanced-queries/getDepartmentBudgets.js')
const mapCurrency = require('./lib/inquirer/mapping/mapCurrency.js')

inquirer.registerPrompt('press-to-continue', pressToContinuePrompt);

async function welcome() {
  console.log(` _______  __   __  _______  ___      _______  __   __  _______  _______ 
|       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |
|    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|
|   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___ 
|    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|
|   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___ 
|_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|
          _______  _______  ______    _______  _______  ___             
         |       ||       ||    _ |  |       ||   _   ||   |            
         |    _  ||   _   ||   | ||  |_     _||  |_|  ||   |            
         |   |_| ||  | |  ||   |_||_   |   |  |       ||   |            
         |    ___||  |_|  ||    __  |  |   |  |       ||   |___         
         |   |    |       ||   |  | |  |   |  |   _   ||       |        
         |___|    |_______||___|  |_|  |___|  |__| |__||_______|        \n\n`)
  const employeeList = await getEmployeeList()

  console.table('Current Employees', employeeList.map(mapCurrency('salary')))
  mainMenu()
}

function keyPressThen(next) {
  inquirer.prompt([
    {
      name: 'continue', type: 'press-to-continue', anyKey: true,
      pressToContinueMessage: 'Press any key to continue...',
    }
  ]).then(() => next())
}

async function mainMenu() {

  inquirer.prompt([
    newQuestion('action_name', 'list', 'What would you like to do?', {
      choices: [
        'View employees',
        'View roles',
        'View departments',
        'View budgets',
        'View employees by manager',
        'View employees by role',
        'View employees by department',
        'Add a role',
        'Add a department',
        'Add an employee',
        `Change an employee's role`,
        `Change an employee's manager`,
        'Delete a role',
        'Delete a department',
        'Delete an employee',
        'QUIT'
      ]
    })
  ]).then(async ({ action_name }) => {
    console.log('')
    const [employeeList, roleList, departmentList] = await Promise.all([
      getEmployeeList(), getRoleList(), getDepartmentList()
    ])
    switch (action_name) {

      case 'View employees':
        // const employeeList = await getEmployeeList()
        console.table('Current Employees', employeeList.map(mapCurrency('salary')))
        keyPressThen(mainMenu)
        break;
      case 'View roles':
        // const roleList = await getRoleList()
        console.table('Current Roles', roleList.map(mapCurrency('salary')))
        keyPressThen(mainMenu)
        break
      case 'View departments':
        // const departmentList = await getDepartmentList()
        console.table('Current Departments', departmentList)
        keyPressThen(mainMenu)
        break

      case 'View budgets':
        const budgets = await getDepartmentBudgets()
        console.table('Current Departmental Budgets', budgets.map(mapCurrency('total_budget', 'average_salary')))
        keyPressThen(mainMenu)
        break

      case 'View employees by manager':
        const managers = await getManagerList()
        inquirer.prompt([
          newQuestion('manager', 'list', `Which manager's employees would you like to see?`, {
            choices: managers.map((manager) => ({
              name: `${manager.first_name} ${manager.last_name} (${manager.number_employees} employees, average salary $${Math.floor(Number(manager.average_salary))})`, value: manager
            }))
          })
        ]).then(async ({ manager }) => {
          const employees = await getEmployeesByManagerId(manager.id)
          console.table(`\nEmployees managed by ${manager.first_name} ${manager.last_name}`, employees.map(mapCurrency('salary')))
          keyPressThen(mainMenu)
        })
        break;
      case 'View employees by role':
        const roles = await getRoleList()
        inquirer.prompt([
          newQuestion('role', 'list', `Select a role:`, {
            choices: roles.map((role) => ({
              name: `${role.title} - ${currency.format(role.salary)} (${role.num_employees} employees)`, value: role
            }))
          })
        ]).then(async ({ role }) => {
          const employees = await getEmployeesByRoleId(role.id)
          console.table(`\nEmployees with title ${role.title}`, employees.map(mapCurrency('salary')))
          keyPressThen(mainMenu)
        })
        break;
      case 'View employees by department':
        inquirer.prompt([
          newQuestion('department', 'list', `Select a department:`, {
            choices: departmentList.map((dep) => ({
              name: dep.name, value: dep
            }))
          })
        ]).then(async ({ department }) => {
          const employees = await getEmployeesByDepartmentId(department.id)
          console.table(`\nEmployees in ${department.name}`, employees.map(mapCurrency('salary')))
          keyPressThen(mainMenu)
        })
        break;

      case 'Add a role':
        inquirer.prompt([
          newQuestion('title', 'input', `Enter the title:`),
          newQuestion('salary', 'input', `Enter the salary:`, {
            validate: async (input) =>
              required(input).then(response => response !== true ? response : isNumber(input))
          }),
          newQuestion('department_id', 'list', 'Select a department:', {
            choices: departmentList.map(department => ({
              name: department.name, value: department.id
            }))
          })
        ]).then(async (props) => {
          let response = await insertRole(props)
          if (response) console.log(`Added ${props.title}`)
          else console.log('Error')
          keyPressThen(mainMenu)
        })
        break;
      case 'Add a department':
        inquirer.prompt([
          newQuestion('name', 'input', 'Enter the department name:')
        ]).then(async (props) => {
          let response = await insertDepartment(props)
          if (response) console.log(`Added ${props.name}`)
          else console.log('Error')
          keyPressThen(mainMenu)
        })
        break;
      case 'Add an employee':
        inquirer.prompt([
          newQuestion('first_name', 'input', 'Enter first name:'),
          newQuestion('last_name', 'input', 'Enter last name:'),
          newQuestion('role_id', 'list', 'Select role:', {
            choices: roleList.map(role => ({
              name: role.title, value: role.id
            }))
          }),
          newQuestion('manager_id', 'list', 'Select manager:', {
            choices: [...employeeList.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`, value: id
            })), { name: 'No manager', value: null }]
          }),
        ]).then(async props => {
          let response = await insertEmployee(props)
          if (response) console.log(`Added ${props.first_name} ${props.last_name}`)
          else console.log('Error')
          keyPressThen(mainMenu)
        })
        break;

      case `Change an employee's role`:
        inquirer.prompt([
          newQuestion('employee', 'list', 'Select a employee:', {
            choices: employeeList.map(employee => ({
              name: `${employee.first_name} ${employee.last_name}`, value: employee
            })),
          }),
          newQuestion('role_id', 'list', 'Select a new role:', {
            choices: [...roleList.map(role => ({
              name: role.title, value: role.id
            })), { name: '** Cancel change', value: null }]
          })
        ]).then(async ({ role_id, employee }) => {
          if (role_id) {
            const response = await updateEmployeeRole({ role_id, employee_id: employee.id })
            if (response) console.log(`Updated ${employee.first_name} ${employee.last_name}`)
            else console.log('Error')
          }
          keyPressThen(mainMenu)
        })
        break;
      case `Change an employee's manager`:
        inquirer.prompt([
          newQuestion('employee', 'list', 'Select a employee:', {
            choices: employeeList.map(employee => ({
              name: `${employee.first_name} ${employee.last_name}`, value: employee
            })),
          }),
          newQuestion('manager_id', 'list', 'Select a new manager:', {
            choices: [...employeeList.map(({ first_name, last_name, id }) => ({
              name: `${first_name} ${last_name}`, value: id
            })), { name: 'Cancel change', value: null }]
          })
        ]).then(async ({ manager_id, employee }) => {
          if (manager_id) {
            const response = await updateEmployeeManager({ manager_id, employee_id: employee.id })
            if (response) console.log(`Updated ${employee.first_name} ${employee.last_name}`)
            else console.log('Error')
          }
          keyPressThen(mainMenu)
        })
        break;

      case 'Delete a role':
        inquirer.prompt([
          newQuestion('role', 'list', 'Select a role:', {
            choices: roleList.map((role) => ({
              name: role.title, value: role
            }))
          })
        ]).then(({ role }) => {
          inquirer.prompt([
            newQuestion('confirm', 'confirm', `** DELETE ${role.title} **`)
          ]).then(async ({ confirm }) => {
            if (!confirm) keyPressThen(mainMenu)
            else {
              const response = await deleteRole(role.id)
              if (response) console.log(`Deleted ${role.title}`)
              else console.log('Error')
              keyPressThen(mainMenu)
            }
          })
        })
        break
      case 'Delete a department':
        inquirer.prompt([
          newQuestion('department', 'list', 'Select a department:', {
            choices: departmentList.map((department) => ({
              name: department.name, value: department
            }))
          })
        ]).then(({ department }) => {
          inquirer.prompt([
            newQuestion('confirm', 'confirm', `** DELETE ${department.name} **`)
          ]).then(async ({ confirm }) => {
            if (!confirm) keyPressThen(mainMenu)
            else {
              const response = await deleteDepartment(department.id)
              if (response) console.log(`Deleted ${department.name}`)
              else console.log('Error')
              keyPressThen(mainMenu)
            }
          })
        })
        break
      case 'Delete an employee':
        inquirer.prompt([
          newQuestion('employee', 'list', 'Select an employee:', {
            choices: employeeList.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`, value: employee
            }))
          })
        ]).then(({ employee }) => {
          inquirer.prompt([
            newQuestion('confirm', 'confirm', `** DELETE ${employee.first_name} ${employee.last_name} **`)
          ]).then(async ({ confirm }) => {
            if (!confirm) keyPressThen(mainMenu)
            else {
              const response = await deleteEmployee(employee.id)
              if (response) console.log(`Deleted ${employee.first_name} ${employee.last_name}`)
              else console.log('Error')
              keyPressThen(mainMenu)
            }
          })
        })
        break

      case 'QUIT':
        process.exit()
      default:
        console.log(`${action_name} not a valid choice`)
        keyPressThen(mainMenu)
    }
  })
}

welcome()



