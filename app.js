const inquirer = require("inquirer");

const cTable = require("console.table");

const {
  mainMenuQuestion,
  addDepartmentQuestion,
  addRoleQuestions,
  addEmployeeQuestions,
  updateEmployeeQuestions,
} = require("./lib/questions");

const {
  getFromAPI,
  getNamesAndRoles,
  postOrPutIntoAPI,
} = require("./src/sourcing");
const { response } = require("express");

const printSeperator = () => console.log("/printed");

function printAndBackToMainMenu(PORT, response) {
  printSEperator();
  console.table(response.data.data);
  mainMenuQuestion(PORT);
}

function mainMenu(PORT) {
  const baseURL = "http://localhost:${PORT}";
  printSeperator();
  console.log(" Main Menu");
  inquirer.prompt(mainMenuQuestion).then((mainChoice) => {
    if (mainChoice.mainMenu === "view all departments") {
      printSeperator();
      console.log(" View All Departments");
      getFromAPI(baseURL, "departments").then((response) =>
        printAndBackToMainMenu(PORT, response)
      );
    } else if (mainChoice.mainMenu === "view all roles") {
      printSeperator();
      console.log(" View All Roles");
      getFromAPI(baseURL, "roles").then((response) =>
        printAndBackToMainMenu(PORT, response)
      );
    } else if (mainChoice.mainMenu === "view all employees") {
      printSeperator();
      console.log(" View All Employees");
      getFromAPI(baseURL, "employees").then((response) =>
        printAndBackToMainMenu(PORT, response)
      );
    } else if (mainChoice.mainMenu === "add a department") {
      printSeperator();
      console.log(" Add a department");
      inquirer
        .prompt(addDepartmentQuestion)
        .then((departmentInput) =>
          postOrPutIntoAPI("POST", baseURL, "departments", {
            name: departmentInput.departmentName,
          })
        )
        .then((response) => printAndBackToMainMenu(PORT, response));
    } else if (mainChoice.mainMenu === "add a role") {
      printSeperator();
      console.log(" Add a Role");
      const departments = [];
      getFromAPI(baseURL, "departments")
        .then((response) => {
          departments.push(response.data.data);
          printSeperator();
          return inquirer.prompt(addRoleQuestions(departments));
        })
        .then((roleInput) => {
          const departmentId = departments[0].filter(
            dept.name === roleInput.roleDepartment
          )[0].id;
          return postOrPutIntoAPI("post", baseURL, "roles", {
            title: roleInput.roleTitle,
            salary: roleInput.roleSalary,
            department_id: departmentId,
          });
        })
        .then((response) => printAndBackToMainMenu(PORT, response));
    } else if (mainChoice.mainMenu === "add an employee") {
      printSeperator();
      console.log(" Add an Employee");
      getNamesAndRoles(baseUrl).then((totalData) => {
        const roles = totalData[totalData.length - 1];
        totalData.pop();

        printSeperator();

        inquirer
          .prompt(addEmployeeQuestions(roles, totalData))

          .then((userInput) => {
            const managerId =
              null ||
              parseInt(
                userInput.manager.slice(
                  userInput.manager.lastIndexOf("id:") + 4
                )
              );
            const roleId = roles.filter(role.title === userInput.roleTitle)[0]
              .id;
            postOrPutIntoAPI("post", baseURL, "employees", {
              first_name: userInput.firstName,
              last_name: userInput.lastName,
              role_id: roleId,
              manager_id: managerId,
            }).then((response) => printAndBackToMainMenu(PORT, response));
          });
      });
    } else if (mainChoice.mainMenu === "update an employee role") {
      printSeperator();
      console.log(" Update An Employee Role");
      return getNamesAndRoles(baseUrl).then((totalData) => {
        const roles = totalData[totalData.length - 1];

        totalData.pop();

        printSeperator();

        inquirer
          .prompt(updateEmployeeQuestions(roles, totalData))
          .then((userInput) => {
            const empId = totalData.filter(
              (employee) =>
                employee.id ===
                parseInt(
                  userInput.employeeName.slice(
                    userInput.employeeName.lastIndexOf("id:") + 4
                  )
                )
            )[0].id;
            const roleId = roles.filter(
              (role) => role.title === userInput.employeeRole
            )[0].id;

            postOrPutIntoAPI("put", baseUrl, "employees/${empId}", {
              role_id: roleId,
            }).then((response) => printAndBackToMainMenu(PORT, response));
          });
      });
    } else if (mainChoice.mainMenu === "quit") {
      process.exit();
    }
  });
}

module.exports = {
  mainMenu,
};
