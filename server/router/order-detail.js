const express = require("express");
const route = express.Router();
const connection = require("../db.js");

route.get("/:id", (req, res) => {
  const { id } = req.params;
  const querySelect = `SELECT od.*, f.name AS food_name, o.status AS status
                        FROM order_details od
                        JOIN foods f ON od.food_id = f.food_id
                        JOIN orders o ON od.order_id = o.order_id
                        WHERE od.order_id = ?`;
  connection.query(querySelect, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ err: "Fail" });
    }

    return res.status(200).json(result);
  });
});

route.post("/addorderdetail", (req, res) => {
  const { order_id, order_details } = req.body;

  if (!order_id || !order_details || order_details.length === 0) {
    return res.status(400).json({ error: "Fail" });
  }

  const query = `
      INSERT INTO order_details (order_id, food_id, quantity, price, subtotal, note)
      VALUES ?`;

  const values = order_details.map((item) => [
    order_id,
    item.id,
    item.quantity,
    item.price,
    item.quantity * item.price,
    item.note || "",
  ]);

  console.log("Inserting values:", values);

  connection.query(query, [values], (err, result) => {
    if (err) {
      console.error("Insert order details failed:", err);
      return res.status(500).json({ error: err.sqlMessage }); 
    }
    return res.status(201).json({ message: "Order details inserted", result });
  });
});

module.exports = route;
