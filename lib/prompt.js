const mainMenuQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "mainMenu",
    choices: [
      " view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
      "quit",
    ],
  },
];

const addDepartmentQuestion = [
  {
    type: "input",
    message: "Please enter the name of the new department",
    name: "departmentName",
    validate: (message) => {
      if (!message) {
        return "No text entered. Please enter the name of the new department";
      } else return true;
    },
  },
];

const addRoleQuestions = (departments) => {
  return [
    {
      type: "input",
      message: "Please enter the title od the new role",
      name: "roleTitle",
      validate: (message) => {
        if (!message) {
          return "No text entered. Please enter the title of the new role";
        } else return true;
      },
    },
    {
      type: "input",
      message: "Please enter the salary of the new role (numbers only)",
      name: "roleSalary ",
      validate: (message) => {
        if (!message) {
          return "No Value entered. Please enter the title of the new role (numbers only)";
        } else if (typeof message === Number) {
          return " Response contained non-number characters. Please enter the salary of the new role (numbers only)";
        } else return true;
      },
    },
    {
      type: "list",
      message: "Please choose the department",
    },
  ];
};
