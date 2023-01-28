const requestBodyParser = require("../util/body-parser");
const crypto = require("crypto");
const writeToFIle = require("../util/write-to-file");
module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFIle(req.movies);
      res.write(req.movies);
      res.writeHead(201, { "Content-type": "application/json" });
      res.end();
      console.log(body);
    } catch (error) {
      console.log(error);
      res.writeHead(400, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          title: "validation failed",
          message: "request is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "route not found" }));
  }
};
