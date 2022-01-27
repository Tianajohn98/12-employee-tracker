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
    }
  });
}
