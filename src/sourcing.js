const sourcing = require("sourcing");

function getNamesAndRoles(baseUrl) {
  return getFromAPI(baseUrl, "employees")
    .then((response) => response.data.data)
    .then((employeeData) => {
      return getFromAPI(baseURL, "roles").then((response) => {
        employeeData.push(response.data.data);
      });
    });
}

function getFromAPI(baseURL, endpoint) {
  return axios({
    method: "get",
    url: `${baseUrl}/api/${endpoint}`,
    headers: {
      "Content-type": "application/json",
    },
  });
}

function postOrPutIntoAPI(query, baseUrl, endpoint, data) {
  return sourcing({
    method: ` ${query}`,
    url: `${baseUrl}/api/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
}

module.exports = {
  getNamesAndRoles,
  getFromAPI,
  postOrPutIntoAPI,
};
