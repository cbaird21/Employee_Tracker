// Import the connection object
const inquirer = require("inquirer");
const mysql = require("mysql2");
// custom module
require('dotenv').config();



// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log(`Connected to the employeeTracker_ database.`)
);
// prompts options choice
const initalPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all employees",
                "View all roles",
                "Add a department",
                "Add an Employee",
                "Add a role",
                "Update an employee",
                "Quit"
            ],
            name: "choice",
        }
    ]).then((Response) => {
        if (Response.choice === "View all departments") { showDepartments(); }
        if (Response.choice === "View all employees") { showEmployees(); }
        if (Response.choice === "View all roles") { showRoles(); }
        if (Response.choice === "Add a department") { addDepartment(); }
        if (Response.choice === "Add an Employee") { addEmployee(); }
        if (Response.choice === "Add a role") { addRole(); }
        if (Response.choice === "Update an employee") { updateEmployeeRole(); }
    })
}
//makes a query and returns back employee table
function showEmployees() {
    db.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary, employee.manager_id  FROM((employee JOIN role ON employee.role_id = role.id) JOIN department ON department.id = role.department_id) ",
        (err, results) => {
            console.table(results);
            initalPrompt();
        }
    );
}
function showDepartments() {
    db.query(
        "SELECT * FROM department", (err, results) => {
            console.table(results);
            initalPrompt();
        }
    )
}
// SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id,
function showRoles() {
    db.query(
        "SELECT * FROM role", (err, results) => {
            if (err) throw err;
            console.table(results);
            initalPrompt();
        }
    )
}
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department?",
            name: "departmentName"
        }
    ]).then((results) => {
        db.query("INSERT INTO department (name) VALUES (?)", [results.departmentName], function (err, results) {
            console.log(results);
            initalPrompt();
        })

    })
}
function addEmployee() {
    db.query("SELECT * FROM role", (err, results) => {
        // console.log(results);
        const roles = results.map((role) => {
            return {
                name: role.title,
                value: role.id,
            }
        })

        db.query("SELECT * FROM employee", (err, results) => {
            const manager = results.map((employee) => {
                return {
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.role_id,
                }
            })
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the Employees first name?",
                    name: "firstName",
                },
                {
                    type: "input",
                    message: "What is the Employees last name?",
                    name: "lastName",
                },
                {
                    type: "list",
                    message: "What is the employee's role?",
                    choices: roles,
                    name: "role"
                },
                {
                    type: "confirm",
                    message: "Does this employee have a manger?",
                    name: "managerConfirm"
                },
                {
                    type: "list",
                    message: "Who is the Employee's manager?",
                    choices: manager,
                    when(data) {
                        return data.managerConfirm;
                    },
                    name: "employeeManager",
                },
            ])
                .then((results) => {
                    db.query(
                        "INSERT INTO employee (first_name, last_name,  role_id, manager_id) VALUES (?, ?, ?, ?)", [results.firstName, results.lastName, results.role, results.employeeManager],
                        (err, results) => {
                            console.log(results);
                            initalPrompt();
                        })

                })
        })
    })
}
function addRole() {
    // creates an active log to be able to be selecting from all departments including any added
    currentDepartments = [];
    db.query("SELECT * FROM department", (err, results) => {
        // console.log(results);
        for (i = 0; i < results.length; i++) {
            currentDepartments.push(results[i].name)
        }
    })
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary of the role?",
            name: "salary"
        },
        {
            type: "list",
            message: "Which department does that role belong to?",
            choices: currentDepartments,
            name: "department"
        }
    ]).then((results) => {
        let department_id = 0;
        for (i = 0; i < results.length; i++) {
            if (results.department == results[i].name) {
                department_id = results[i].id;
            }
        }
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [results.title, results.salary, results.department_id], (err, results) => {
            console.log(results);
            initalPrompt();
        })
    })
}
function updateEmployeeRole() {
    db.query("SELECT * FROM employee", (err, results) => {
        // console.log(results);
        const employee = results.map((employee) => {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.id
            }
        })
        db.query("SELECT * FROM role", (err, results) => {
            const role = results.map((role) => {
                return {
                    role: role.title,
                    value: role.id
                }
            })
            inquirer.prompt([
                {
                    type: "list",
                    message: "Please choose employee to update.",
                    choices: employee,
                    name: "updatedEmployee",
                },
                {
                    type: "list",
                    message: "What is the employee new role?",
                    choices: role,
                    name: "role"
                }
            ])
                .then((answer) => {
                    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.role, answer.employeeManager], (err, results) => {
                        console.log("updateRole"),
                            initalPrompt()
                    })
                })
        })
    })
}

initalPrompt();
//updates an employees role
// function updateEmployee() {
//     roleList = [];
//     db.query("SELECT * FROM role", (err, results) => {
//         for (i = 0; i < results.length; i++) {
//             roleList.push(results[i].name);
//         }
//     });
//     employeeList = [];
//     db.query("SELECT * FROM employee", (err, results) => {
//         for (i = 0; i < results.length; i++) {
//             employeeList.push(results[i].first_name);
//         }
//     });

//     const updateEmployeeQuestions = [
//         {
//             type: "list",
//             message: "Whos role will be updated?",
//             choices: employeeList,
//             name: "selectedEmployee",
//         },
//         {
//             type: "list",
//             message: "What will their new role be?",
//             choices: roleList,
//             name: "newRole",
//         },
//     ];
//     inquirer.promt(updateEmployeeQuestions).then((Response) => {
//         console.log(Response);
//     });

//     // db.query(`UPDATE employee SET role_id = ? WHERE id = ?`);
// }