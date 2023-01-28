const http = require("http");
const chalk = require("chalk");
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
const movies = require("./data/movies.json");
require("dotenv").config();

const PORT = 5001 || process.env.PORT;
const server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;

    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          title: "Not found",
          message: "Route Not found",
        })
      );
      res.end();
      break;
  }
});

server.listen(PORT, () => {
  console.log(chalk.blueBright("server is running on " + PORT));
});
