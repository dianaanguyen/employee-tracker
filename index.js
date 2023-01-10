
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment, deleteDepartment } = require("./db/departments");
const { viewAllEmployees } = require("./db/employees");
const { viewAllRoles, addRole, deleteRole } = require("./db/roles");

const start = async () => {
    console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Delete a department',
                'Add a role',
                'Delete a role',
                'Add an employee',
                'Delete an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])

    switch (choice) {
        // departments
        case 'View all departments':
            const departments = await viewAllDepartments();
            console.table(departments);
            break;
        case 'Add a department':
            const newDepartment = await addDepartment();
            console.table(newDepartment)
            break;
        case 'Delete a department':
            const removeDepartment = await deleteDepartment();
            console.table(removeDepartment)
            break;
        // roles
        case 'View all roles':
            const viewRoles = await viewAllRoles();
            console.table(viewRoles)
            break;
        case 'Add a role':
            const newRole = await addRole();
            console.table(newRole)
            break;
        case 'Delete a role':
            const removeRole = await deleteRole();
            console.table(removeRole)
            break;
        // employees
        case 'View all employees':
            const viewEmployees = await viewAllEmployees();
            console.table(viewEmployees)
            break;
        case 'Add an employee':
            const newEmployee = await addEmployees();
            console.table(newEmployee)
            break;
        case 'Update an employee role':
            const updateEmployee = await updateEmployeeRole();
            console.table(updateEmployee)
            break;
        case 'Delete an employee':
            const removeEmployee = await deleteEmployees();
            console.table(removeEmployee)
            break;
        // exit
        case 'Exit':
            console.log("Goodbye!")
            process.exit()
    }
    start();
}
console.log("Welcome to the Employee Management!")
start();
