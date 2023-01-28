const writeToFile = require("../util/write-to-file");
module.exports = (req, res) => {
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
      req.movies.splice(index, 1);
      writeToFile(req.movies);
      res.writeHead(204, { "content-type": "application/json" });
      res.end();
    }
  }
};
