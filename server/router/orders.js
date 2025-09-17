const express = require('express');
const connection = require('../db');
const orderRoute = express.Router();

orderRoute.get('/',(req,res) => {
    const orderSelect = `SELECT * FROM orders`;
    connection.query(orderSelect,(err,result) => {
        if(err) {
            console.log('Order Select Fail');
            return res.status(500).json({err : "Fail"});
        }
        return res.status(200).json(result);
    })
})

module.exports = orderRoute;