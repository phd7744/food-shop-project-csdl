const express = require("express");
const router = express.Router();
const connection = require("../db.js");

router.get("/", (req, res) => {
  const querySelect = "SELECT * FROM foods";
  connection.query(querySelect, (err, result) => {
    if (err) {
      console.log("Select Food Fail");
      return res.status(500).json({ error: "Select Fail" });
    }

    return res.status(200).json(result);
  });
});

router.post("/addfood", (req, res) => {
  let {
    category_id,
    name,
    price,
    order_count,
    description,
    is_available,
    img_url,
  } = req.body;

  order_count = order_count ?? 0;
  price = parseFloat(price);
  is_available = Number(is_available);

  const value = [
    category_id,
    name,
    price,
    order_count,
    description,
    is_available,
    img_url,
  ];

  const foodInsert = `
    INSERT INTO foods (category_id, name, price, order_count, description, is_available, img_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  connection.query(foodInsert, value, (err, result) => {
    if (err) {
      console.log("Add Food Fail");
      return res.status(500).json({ error: "Insert Food Fail" });
    }

    return res.status(201).json({
      message: "Food added successfully",
      foodId: result.insertId,
    });
  });
});

module.exports = router;
