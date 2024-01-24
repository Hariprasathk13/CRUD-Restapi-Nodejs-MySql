const http = require("http");
const { routehandler } = require("./routes");

const port = 3001;
const server = http.createServer((req, res) => {
  routehandler(req, res);
});
server.listen(port, () => {
  console.log(`server started at PORT ${port}`);
});
