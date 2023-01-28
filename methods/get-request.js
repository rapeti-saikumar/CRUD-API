module.exports = (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (baseUrl === "/api/movies/" && !regexV4.test(id)) {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    res.setHeader("Content-type", "application/json");
    const filterMovie = req.movies.filter((movie) => {
      return movie.id === id;
    });
    if (filterMovie.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filterMovie));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not found", message: "Movie not found" })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "route not found" }));
  }
};
