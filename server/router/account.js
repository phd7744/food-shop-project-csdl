const express = require("express");
const route = express.Router();
const connection = require("../db.js");

route.post("/", (req, res) => {
  const { username, password } = req.body;
  const value = [username, password];
  const selectAccount =
    "SELECT user_name, password FROM accounts WHERE user_name = ? AND password = ?";
  connection.query(selectAccount, value, (err, result) => {
    if (err) {
      console.log("Account not found");
      return res.status(500).json({ error: "Fail Select Account" });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    return res.status(201).json({ result });
  });
});

module.exports = route;
