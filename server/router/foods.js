const express = require("express");
const router = express.Router();
const connection = require("../db.js");

router.get("/", (req, res) => {
  const querySelect = `
    SELECT foods.*, categories.name AS category_name 
    FROM foods 
    JOIN categories on foods.category_id = categories.category_id
  `;
  connection.query(querySelect, (err, result) => {
    if (err) {
      console.log("Select Food Fail");
      return res.status(500).json({ error: "Select Fail" });
    }

    return res.status(200).json(result);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const querySelectById = `
    SELECT f.*, c.category_id, c.name AS category_name
    FROM foods f
    JOIN categories c ON f.category_id = c.category_id
    WHERE f.food_id = ?`;

  connection.query(querySelectById, [id], (err, result) => {
    if (err) {
      console.log("get food by id fail", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Food not found" });
    }

    return res.status(200).json(result[0]);
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

  router.delete("/delfood/:id", (req, res) => {
  const id = req.params.id;
  const foodDel = `DELETE FROM foods WHERE food_id = ?`;
  connection.query(foodDel, [id], (err, result) => {
    if (err) {
      console.error("Delete food Fail", err);
      return res.status(500).json({ error: "Fail to delete food" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Food not found" });
    }

    return res.status(200).json({ message: "Delete food success" });
  });
});

router.put('/updfood/:id', (req, res) => {
  const { id } = req.params;
  const { category_id, name, price, description, is_available, img_url } = req.body;

  const value = [category_id, name, price, description, is_available, img_url, id];
  const queryUpdate = `
    UPDATE foods 
    SET category_id = ?, name = ?, price = ?, description = ?, is_available = ?, img_url = ?
    WHERE food_id = ? 
  `;

  connection.query(queryUpdate, value, (err, result) => {
    if (err) {
      console.error("Update Food Fail", err);
      return res.status(500).json({ error: "Update Food Fail" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Food not found" });
    }

    return res.status(200).json({ message: "Update food success" });
  });
});




module.exports = router;
