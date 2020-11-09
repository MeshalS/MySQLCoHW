var mysql = require("mysql");
var inquirer = require("inquirer");
var util = require("util");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_DB"
});

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

main()
async function main() {
    await inquirer.prompt({
        type: "list",
        name: "action",
        message: "Select :",
        choices: ["Employee Menu", "Roles Menu", "Departments Menu"]
    }).then(response => {
        switch (response.action) {
            case "Employee Menu":
                employeeMenu()
                break;
            case "Roles Menu":
                Rolesmenu();
                break;
            case "Departments Menu":
                departmentMenu();
                break;
        }
    })


}


/// Emp 
async function employeeMenu() {

    await inquirer.prompt({
        type: "list",
        name: "action",
        message: "Select :",
        choices: ["Employeeadd", "Employee remove ", "Employee view ", "Employee update"]
    }).then(response => {
        switch (response.action) {
            case "Employeeadd":
                addEmp()
                break;
            case "Employee remove ":
                removemp()
                break;
            case "Employee view ":
                viewAllEmployees();
                break;
            case "Employee update":
                updateEmployees();
                break;
        }
    })


}

// add 
function addEmp() {

    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "enter your first name:-"

        },
        {
            type: "input",
            name: "second_name",
            message: "enter your second name:-"
        },

        {
            type: "input",
            name: "role_id",
            message: "enter your role id:-"
        },
        {
            type: "input",
            name: "manager_id",
            message: "enter your mannger id:-"
        },


    ])

        .then(answers => {


            let query = "INSERT INTO employees(first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)"

            connection.query(query, [answers.first_name, answers.second_name, answers.role_id, answers.manager_id], function (err) {
                if (err) throw err;

                // Log all results of the SELECT statement
                console.log("Done");
                connection.end();
            });

        })


}

// view all em Select * ALL 

function viewAllEmployees() {
    connection.query(
        `SELECT  * from employees`,
        function (err, res) {
            if (err) throw err;
            console.log("Employees:");
            console.table(res);

        })
}

// updateing 
async function updateEmployees() {
    const res = await connection.query(`SELECT * FROM employees`);

    // Man to have a new stracutre of the array with new value that being updated 
    const employees = res.map(elm => ({
        name: elm.first_name + " " + elm.last_name,
        value: elm.id
    }));

    const roles = res.map(elm => ({
        value: elm.id
    }));

    console.log(employees);

    const response = await inquirer.prompt([
    {
        type: "list",
        name: "employee",
        message: "Which employee would you like to update?",
        choices: employees
    },
    {
        type: "list",
        name: "role",
        message: "What role would you like to update them to?",
        choices: roles
    }]);

    console.log(response);

    let query = "UPDATE employees SET role_id = ? WHERE id = ?"

    connection.query(query, [response.role,response.employee], function (err,data) {
        if (err) throw err;

        console.log(data);

        // Log all results of the SELECT statement
        console.log("Done");

    });


}