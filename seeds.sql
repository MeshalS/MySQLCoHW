 DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE departments(
id INT AUTO_INCREMENT,

PRIMARY KEY (id),
name VARCHAR(30)
);

CREATE TABLE roles(
id INT AUTO_INCREMENT,
title VARCHAR(40),
salary DECIMAL(10, 5),
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
id INT AUTO_INCREMENT,
PRIMARY KEY (id),
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,


FOREIGN KEY (role_id) REFERENCES roles(id)


);

INSERT INTO departments (name) values ('testing');
INSERT INTO departments (name) values ('development');
INSERT INTO departments (name) values ('MKT');
INSERT INTO departments (name) values ('Rules');

INSERT INTO roles (title, salary,department_id) values ('tester', 10000,1);
INSERT INTO roles (title, salary,department_id) values ('developer', 20000,2);

INSERT INTO employees (first_name, last_name,role_id) values ('meshal', 'saud',1);
INSERT INTO employees (first_name, last_name,role_id,manager_id) values ('talal', 'saud',2,1);