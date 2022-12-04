const inquirer = require("inquirer");
const mysql = require("mysql2");
const Sequelize = require('sequelize');
require('dotenv').config();
const consoleTable = require("console.table");
const fs = require("fs");
const Connection = require("mysql2/typings/mysql/lib/Connection");
const sequelize = new Sequelize(
    // Database name
    process.env.DB_NAME,
    // User
    process.env.DB_USER,
    // Password
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);
// prompts options choice
const initalPrompt = () => {
    return inquirer.prompt([
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
    ]
    )
}
// create prompt questions
function showPrompts() {
    inquirer.prompt(initalPrompt).then((response) => {
        if (Response.choice === "View all departments") { showDepartments(); }
        if (Response.choice === "View all employees") { showEmployees(); }
        if (Response.choice === "View all Roles") { showRoles(); }
        if (Response.choice === "Add a department") { addDepartment(); }
        if (Response.choice === "Add an Employee") { addEmployee(); }
        if (Response.choice === "Add a role") { addRole(); }
        if (Response.choice === "Update an employee") { updateEmployeeRole(); }
    })
}

function addDepartment() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department?",
            name: "departmentName"
        }
    ]).then((results) => {
            db.query("INSERT INTO department(name) VALUES(`${results.department_name})`, (err,results)
    })


// create function to add department to the database
// function addDepartment() {
//     inquirer.prompt(addDepartment).then((response) => {
//         const department = new department(
//             response.name
//         )
//     })
// }

const addEmployee = [
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
]
// create function to add employee
// function addEmployee() { }

const addRole = [
    {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName"
    },
    {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary"
    },
    {
        type: "list",
        message: "Which department does that role belong to?",
        choices: ["Engineering", "Finance", "Legal", "Sales"]
    }
]
// create function to add to role to database
// function addRole() {

// }

const updateEmployeeRole = [
    {
        type: "list",
        message: "Which employee's role do you want to update?",
        // should i be pulling the table data for this ?
        choices: ["Jackie Chan", "Rosco Dash", "Harlow Girl", "John Doe", "Mike Lebowski", "Jenn H", "Connor M", "Cali L", "Andy L"],
        name: "updateThisEmp"
    },
    {
        type: "list",
        message: "Which role do you want to assign the selected employee?",
        // should these choices be db queries?
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Account Manager", "Accountant", "Legal Team Leader", "Laywer", "Sales Lead"],
    }

]
// create function to update employe
// function updateEmployeeRole() { }



//makes a query and returns back employee table
function showEmployees() {
    db.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary, employee.manager_id  FROM((employee JOIN role ON employee.role_id = role.id) JOIN department ON department.id = role.department_id) ",
        (err, results) => {
            console.table(results);
            showPrompts();
        }
    );
}
//makes a query and returns back roles table
function showRoles() {
    db.query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id",
        (err, results) => {
            console.table(results);
            showPrompts();
        }
    );
}
// make query to view all departments
function showDepartments() {
    db.query(
        "SELECT * FROM department", (err, results) => {
            console.table(results);
            showPrompts();
        }
    )
}

init();

module.exports = sequelize;