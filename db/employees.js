const db = require("./connection");
const { prompt, default: inquirer } = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() {
    try {
        const employees =
            await db.promise().query('SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id')
        return employees;
    } catch (err) {
        console.log(err);
    };
};

async function addEmployees() {
    try {
        const roles = await viewAllRoles();
        const employees = await viewAllEmployees();

        const { firstName, lastName, roleId, manager } =
        await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the employee you would like to add?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the employee you would like to add?"
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role in the company?",
                choices : roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            },
            {
                type: "list",
                name: "manager",
                message: "Who is this employee's manager?",
                choices: [ 
                    ...employees.map(employee => {
                        return {
                            value: employee.id,
                            name: `${employee.first_name} ${employee.last_name}`
                        }
                    }),
                    {name: "None", value: null}
                ]
            }
        ])
        await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${ firstName }", "${ lastName }", ${ roleId }, ${ manager })`);
        
        const newEmployees = await viewAllEmployees();
        return newEmployees;
    } catch (err) {
        console.log(err);
    };
};