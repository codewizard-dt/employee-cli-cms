const inquirer = require('inquirer')
const table = require('console.table')
const getConnection = require('./lib/db/getConnection.js')
const getEmployeeList = require('./lib/db/getEmployeeList.js')
const newQuestion = require('./lib/inquirer/newQuestion.js')
const getManagerList = require('./lib/db/getManagerList.js')
const getEmployeesByManagerId = require('./lib/db/getEmployeesByManager.js')
const getRoleList = require('./lib/db/getRoleList.js')
const getEmployeesByRoleId = require('./lib/db/getEmployeesByRole.js')

const db = getConnection()
// const employees = async () => await getEmployeeList()

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
  console.table('Current Employees', employeeList)
  mainMenu()
}

async function mainMenu() {
  inquirer.prompt([
    newQuestion('action_name', 'list', 'What would you like to do?', {
      choices: [
        'View all employees',
        'View employees by manager',
        'View employees by role',
        'View employees by department',
        'Add a role',
        'Add a department',
        'Add an employee',
        'Update a role'
      ]
    })
  ]).then(async ({ action_name }) => {

    switch (action_name) {

      case 'View all employees':
        const employeeList = await getEmployeeList()
        console.table('Current Employees', employeeList)
        break;

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
          console.table(`\nEmployees managed by ${manager.first_name} ${manager.last_name}`, employees)
        })
        break;

      case 'View employees by role':
        const roles = await getRoleList()
        const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        inquirer.prompt([
          newQuestion('role', 'list', `For which role would you like to see employees?`, {
            choices: roles.map((role) => ({
              name: `${role.title} - ${money.format(role.salary)} (${role.num_employees} employees)`, value: role
            }))
          })
        ]).then(async ({ role }) => {
          const employees = await getEmployeesByRoleId(role.id)
          console.table(`\nEmployees with title ${role.title}`, employees)
        })

        break;

      case 'View employees by department':
        break;

      case 'Add a role':
        break;

      case 'Add a department':
        break;

      case 'Add an employee':
        break;

      case 'Update a role':
        break;
    }
  })
}

welcome()



