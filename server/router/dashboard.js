const express = require("express");
const connection = require("../db");
const dashboardRoute = express.Router();

// API lấy thống kê cho Dashboard
dashboardRoute.get("/stats", (req, res) => {
  const queries = {
    totalOrders: `SELECT COUNT(*) as total FROM orders`,
    totalRevenue: `SELECT SUM(total_amount) as revenue FROM orders WHERE status = 'completed'`,
    totalCustomers: `SELECT COUNT(*) as total FROM customers`,
    pendingOrders: `SELECT COUNT(*) as total FROM orders WHERE status = 'pending'`,
    completedOrders: `SELECT COUNT(*) as total FROM orders WHERE status = 'completed'`,
    cancelledOrders: `SELECT COUNT(*) as total FROM orders WHERE status = 'cancelled'`
  };

  const stats = {};
  let completedQueries = 0;
  const totalQueries = Object.keys(queries).length;

  Object.entries(queries).forEach(([key, query]) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.error(`Error executing ${key} query:`, err);
        stats[key] = 0;
      } else {
        stats[key] = result[0].total || result[0].revenue || 0;
      }
      
      completedQueries++;
      if (completedQueries === totalQueries) {
        return res.status(200).json(stats);
      }
    });
  });
});

// API lấy recent orders cho Dashboard (chỉ OrderID, Total Amount, Status)
dashboardRoute.get("/recent", (req, res) => {
  const limit = req.query.limit || 10;
  const recentOrdersQuery = `
    SELECT order_id, total_amount, status 
    FROM orders 
    ORDER BY order_date DESC 
    LIMIT ?
  `;
  
  connection.query(recentOrdersQuery, [parseInt(limit)], (err, result) => {
    if (err) {
      console.error("Recent orders query error:", err);
      return res.status(500).json({ error: "Failed to fetch recent orders" });
    }
    
    return res.status(200).json(result);
  });
});

module.exports = dashboardRoute;