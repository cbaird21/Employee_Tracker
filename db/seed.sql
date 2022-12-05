INSERT INTO department (name)
VALUES 
("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO role(title, salary, department_id)
VALUES
("Sales Lead", "100000", 4),
("Salesperson", "80000", 4),
("Lead Engineer", "150000", 1),
("Software Engineer", "120000", 1),
("Account Manager", "160000", 2),
("Accountant", "125000", 2),
("Legal Team Leader", "250000", 3),
("Lawyer", "190000", 3),
("Sales Lead", "100000", 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Jackie", "Chan", 1, null),
("Rosco", "Dash", 2, 1),
("Harlow", "Girl", 3, null),
("John", "Doe", 4, 2),
("Mike", "Lebowksi", 5, null,),
("Jenn", "H", 6, 3),
("Connor", "M", 7, null),
("Cali", "L", 8, 4),
("Andy", "L", 9, null);