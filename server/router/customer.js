const express = require('express');
const connection = require('../db');
const customerRoute = express.Router();

customerRoute.get('/',(req,res) => {
    const customerSelect = `SELECT * FROM customers`;
    connection.query(customerSelect,(err,result) => {
        if(err) {
            console.log('customer Select Fail');
            return res.status(500).json({err : "Fail"});
        }
        return res.status(200).json(result);
    })
})

customerRoute.get("/byphone/:phone", (req, res) => {
  const { phone } = req.params;
  const query = `SELECT * FROM customers WHERE phone = ?`;
  connection.query(query, [phone], (err, results) => {
    if (err) return res.status(500).json({ error: "Query failed" });

    if (results.length > 0) {
      return res.json({ exists: true, customer: results[0] });
    }
    return res.json({ exists: false });
  });
});

customerRoute.post('/addcustomer',(req,res) => {
    const {full_name, phone} = req.body;
    const value = [full_name, phone];
    const customerInsert = `INSERT INTO customers(full_name,phone) VALUES(?,?)`;
    connection.query(customerInsert,value,(err,result) => {
        if(err) {
            console.log('Insert Customer Fail');
            return res.status(500).json({err : "Fail"});
        }
        return res.status(201).json({ message: "Success", customer_id: result.insertId });
    })
})
module.exports = customerRoute;