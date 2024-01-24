const { connection } = require("./db.js");

function fetchuser(callback) {
  connection.query(`select * from user`, (err, res) => {
    callback(err, res);
  });
}

function adduser(obj, callback) {
  connection.query(`INSERT into user SET ?`, obj, (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return callback(err, null);
      }
    } else {
      return callback(null, true);
    }
  });
}

function updateuser(id, obj, callback) {
  connection.query(
    `UPDATE user SET name=?,age=?,mobile=?,email=? WHERE id=?`,
    [obj.name, obj.age, obj.mobile, obj.email, id],
    (err, res) => {
      if (err) callback(err, null);
      else if (res.affectedRows === 0) {
        callback(null, false);
      } else callback(null, true);
    }
  );
}

function deleteuser(id, callback) {
  connection.query(`DELETE FROM user WHERE id=?`, [id], (err, res) => {
    if (err) callback(err, null);
    else if (res.affectedRows === 0) {
      callback(null, false);
    } else callback(null, true);
  });
}

module.exports = { fetchuser, adduser, updateuser, deleteuser };
