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