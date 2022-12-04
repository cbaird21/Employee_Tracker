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
        if (Response.choice === "View all Roles") { showRoles(); }
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
function showRoles() {
    db.query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id,", (err, results) => {
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
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Account Manager", "Accountant", "Legal Team Leader", "Laywer", "Sales Lead"],
            name: "newEmpRole"
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: ["None", "Jackie Chan", "Harlow Girl", "John Doe", "Mike Lebowski", "Connor M", "Andy L"],
            name: "newEmpManager"
        }
    ]).then((results) => {
        db.query("INSERT INTO employee (first_name, last_name, manager_id) VALUES (?)", ([results.firstName, results.lastName, results.newEmpManager]), function (err, results) {
            console.log(results);
            initalPrompt();
        })
    })
};
function addRole() {
    // creates an active log to be able to be selecting from all departments including any added
    currentDeparments = [];
    db.query("SELECT * FROM department", (err, results) => {
        // console.log(results);
        for (i = 0; i < results.length; i++) {
            currentDeparments.push(results[i].name)
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
            choices: currentDeparments,
            name: "department"
        }
    ]).then((results) => {
        db.query("INSERT INTO role (title, salary, department) VALUES (?, ?, ?)", [results.title, results.salary, results.department], (err, results) => {
            console.log(results);
            initalPrompt();
        })
    })
}

initalPrompt();