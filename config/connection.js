const inquirer = require("inquirer");
const mysql = require("mysql2");
const Sequelize = require('sequelize');
const { INITIALLY_DEFERRED } = require("sequelize/types/deferrable");
require('dotenv').config();

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
// create prompt questions
function showPrompts() {
    inquirer.prompt(listOptions).then((response) => {
        if (Response.choice === "View all departments") { showDepartments(); }
        if (Response.choice === "View all employees") { showEmployees(); }
        if (Response.choice === "View all Roles") { showRoles(); }
        if (Response.choice === "Add a department") { addDepartment(); }
        if (Response.choice === "Add an Employee") { addEmployee(); }
        if (Response.choice === "Add a role") { addRole(); }
        if (Response.choice === "Update an employee") { updateEmployee(); }
    })
}
// create function to add department
function addDepartment(){}

// create function to add employee
function addEmployee(){}

// create function to update employe
function updateEmployee(){}



// prompts options choice
const listOptions = [
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
];
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