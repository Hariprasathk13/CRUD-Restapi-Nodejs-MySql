const { fetchuser, adduser, updateuser, deleteuser } = require("./query");

function routehandler(req, res) {
  if (req.url == "/" && req.method === "GET") {
    const welcome = { title: "welocome to crud rest api using vanilla nodejs" };
    res.write(JSON.stringify(welcome));
    res.end();
  } else if (req.url === "/add" && req.method === "POST") {
    const op = [];
    req.on("data", (chunk) => {
      op.push(chunk);
    });
    req.on("end", () => {
      const final = Buffer.concat(op).toString();
      let user = JSON.parse(final);
      adduser(user, (err) => {
        if (err) res.end(JSON.stringify({ message: "failed" }));
        else res.end(JSON.stringify({ message: "success" }));
      });
    });
  } else if (req.url === "/fetch" && req.method === "GET") {
    fetchuser((err, res1) => {
      if (err) res.end(JSON.stringify({ message: "unable to fetch details" }));
      res.end(JSON.stringify(res1));
    });
  } else if (req.url === "/delete" && req.method === "DELETE") {
    let op = [];
    req.on("data", (chunk) => {
      op.push(chunk);
    });

    req.on("end", () => {
      let final = Buffer.concat(op);
      deleteuser(final, (err, res1) => {
        if (err) res.end(JSON.stringify({ message: "unable to delete user" }));
        else if (res1 == 0) {
          res.end(JSON.stringify({ message: `No user found with id ${op} ` }));
        } else res.end(JSON.stringify({ message: "deleted successfully" }));
      });
    });
  } else if (req.url === "/update" && req.method === "PUT") {
    let op = [];
    req.on("data", (chunk) => {
      op.push(chunk);
    });

    req.on("end", () => {
      let final = JSON.parse(Buffer.concat(op));

      updateuser(final.id, final, (err, res1) => {
        if (err) res.end(JSON.stringify({ message: "unable to update user" }));
        else if (res1 == 0) {
          res.end(
            JSON.stringify({ message: `No user found with id ${final.id} ` })
          );
        } else res.end(JSON.stringify({ message: "updated successfully" }));
      });
    });
  } else {
    res.end(JSON.stringify({ message: "invalid url" }));
  }
}

module.exports = { routehandler };
