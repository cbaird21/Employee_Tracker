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

INSERT INTO employee(first_name, last_name, manager_id,role_id)
VALUES
("Jackie", "chan", null, 1),
("Rosco", "Dash", 1, 2),
("Harlow", "Girl", null , 3),
("John", "Doe", null, 4),
("Mike", "Lebowksi", null, 5),
("Jenn", "H", 5, 6),
("Connor", "M", null, 7),
("Cali", "L", 7, 8),
("Andy", "L", null, 9);