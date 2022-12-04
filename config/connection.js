const inquirer = require("inquirer");
const mysql = require("mysql2");

const consoleTable = require("console.table");
const fs = require("fs");
const Connection = require("mysql2/typings/mysql/lib/Connection");






// create function to add department to the database
// function addDepartment() {
//     inquirer.prompt(addDepartment).then((response) => {
//         const department = new department(
//             response.name
//         )
//     })
// }


// create function to add employee
// function addEmployee() { }


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