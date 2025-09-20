const express = require("express");
const connection = require("../db");
const orderRoute = express.Router();

orderRoute.get("/", (req, res) => {
  const orderSelect = `SELECT orders.*, customers.full_name
      FROM orders
      JOIN customers ON orders.customer_id = customers.customer_id`;
  connection.query(orderSelect, (err, result) => {
    if (err) {
      console.log("Order Select Fail");
      return res.status(500).json({ err: "Fail" });
    }
    return res.status(200).json(result);
  });
});

orderRoute.delete("/delorders/:id", (req, res) => {
  const { id } = req.params;
  const queryDeleteOrderDetailById = `DELETE FROM order_details WHERE order_id = ?`;
  const queryDeleteOrderById = `DELETE FROM orders WHERE order_id = ?`;
  connection.query(queryDeleteOrderDetailById, [id], (err, result) => {
    if (err) {
      console.log("Delete order_details fail", err);
      return res.status(500).json({ error: "Fail to delete order details" });
    }
    connection.query(queryDeleteOrderById, [id], (error, result) => {
      if (error) {
        console.log("Delete order fail");
        return res.status(500).json({ error: "Fail" });
      }
      return res.status(200).json({ message: "Success" });
    });
  });
});

module.exports = orderRoute;
