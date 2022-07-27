USE employee_db;

INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Human Resources"),
       ("Sales"),
       ("Customer Service");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("Engineering Lead", 120000, 1),
       ("Front End Developer", 80000, 1),
       ("Back End Developer", 90000, 1),
       ("Full Stack Developer", 120000, 1),
       ("Human Resources Lead", 90000, 2),
       ("Benefits Manager", 60000, 2),
       ("Hiring Manager", 70000, 2),
       ("Sales Lead", 100000, 3),
       ("Direct Salesperson", 30000, 3),
       ("Hot Leads Generator", 50000, 3),
       ("Customer Service Lead", 70000, 4),
       ("Customer Specialist", 30000, 4),
       ("Onboarding Specialist", 40000, 4);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("David", "Taylor", 1, null),
       ("Sally","Johnson", 2, 1),
       ("Keisha", "Johnson", 5, null),
       ("Sayid", "Patel", 8, null),
       ("Cecilia", "Sirrius", 11, null);
       
