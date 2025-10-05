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


orderRoute.post("/addorder", (req, res) => {
  const { customer_id, total } = req.body;
  const query = `INSERT INTO orders (customer_id, status, total_amount) VALUES (?, 'pending', ?)`;
  connection.query(query, [customer_id, total], (err, result) => {
    if (err) return res.status(500).json({ error: "Insert order failed" });
    return res.status(201).json({ order_id: result.insertId });
  });
});

// API cập nhật trạng thái order
orderRoute.put("/updatestatus/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Kiểm tra trạng thái hợp lệ
  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  // Lấy trạng thái hiện tại để kiểm tra logic chuyển đổi
  const getCurrentStatusQuery = `SELECT status FROM orders WHERE order_id = ?`;
  
  connection.query(getCurrentStatusQuery, [id], (err, result) => {
    if (err) {
      console.error("Get current status error:", err);
      return res.status(500).json({ error: "Failed to get current status" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const currentStatus = result[0].status;

    // Kiểm tra logic chuyển đổi hợp lệ
    let isValidTransition = false;
    
    if (currentStatus === 'pending') {
      // Từ pending có thể chuyển sang confirmed hoặc cancelled
      isValidTransition = status === 'confirmed' || status === 'cancelled';
    } else if (currentStatus === 'confirmed') {
      // Từ confirmed chỉ có thể chuyển sang completed
      isValidTransition = status === 'completed';
    }
    // completed và cancelled không thể chuyển sang trạng thái khác

    if (!isValidTransition) {
      return res.status(400).json({ 
        error: `Cannot change status from ${currentStatus} to ${status}` 
      });
    }

    // Cập nhật trạng thái
    const updateQuery = `UPDATE orders SET status = ? WHERE order_id = ?`;
    
    connection.query(updateQuery, [status, id], (updateErr, updateResult) => {
      if (updateErr) {
        console.error("Update status error:", updateErr);
        return res.status(500).json({ error: "Failed to update status" });
      }

      console.log(`Order ${id} status updated from ${currentStatus} to ${status}`);
      return res.status(200).json({ 
        message: `Order status updated to ${status}`,
        order_id: id,
        old_status: currentStatus,
        new_status: status
      });
    });
  });
});

module.exports = orderRoute;
