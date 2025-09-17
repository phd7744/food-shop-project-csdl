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

module.exports = customerRoute;