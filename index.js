
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment } = require("./db/departments");

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
        case 'View all departments':
            const departments = await viewAllDepartments();
            console.table(departments);
            break;
        case 'Add a department':
            const newDepartment = await addDepartment();
            console.table(newDepartment)
            break;
    }
}

start();
