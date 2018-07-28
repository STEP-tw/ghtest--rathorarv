const https = require("https");

const parseRepoName = function(reposDetails) {
  return reposDetails.map(repo => repo.name);
};

const requestOptions = function(path) {
  return (request = {
    host: "api.github.com",
    path: path,
    method: "GET",
    headers: {
      "User-agent": "rathorarv"
    }
  });
};

const fetchReposDetails = function(options) {
  return new Promise((resolve, reject) => {
    const req = https.get(options, res => {
      let responseData = "";
      res.on("data", data => (responseData += data));
      res.on("end", () => {
        resolve(responseData);
      });
      res.on("error", error => {
        console.log("rejeced in read response body");
        reject(error);
      });
    });
    req.on("error", error => {
      console.log("can not make a request on this host", options.host);
      reject(error);
    });
  });
};

const fetchAllReposeByUserName = function(req, res) {
  const username = req.params.user;
  const repoPath = `/users/${username}/repos`;
  const repoNameRequest = requestOptions(repoPath);
  fetchReposDetails(repoNameRequest)
    .then(response => {
      const reposDetails = JSON.parse(response);
      const repoName = parseRepoName(reposDetails);
      res.send(repoName);
    })
    .catch(e => {
      console.log(e);
      res.send("can not find user by this name " + username);
    });
};

exports.fetchUserRepo = fetchAllReposeByUserName;
