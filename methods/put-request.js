const requestBodyParser = require("../util/body-parser");
const writeToFIle = require("../util/write-to-file");
module.exports = async (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );
  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    try {
      let body = await requestBodyParser(req);
      const index = req.movies.findIndex((movie) => {
        return movie.id === id;
      });
      if (index == -1) {
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: "Not found", message: "Movie not found" })
        );
        res.end();
      } else {
        req.movies[index] = { id, ...body };
        writeToFIle(req.movies);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end();
      }
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
