const express = require('express');
const cateRoute = express.Router();
const connection = require("../db.js");

cateRoute.get('/',(req,res) => {
    const cateSelect = `SELECT * FROM categories`;
    connection.query(cateSelect, (err,result) => {
        if(err) {
            console.log("Select category fail");
            return res.status(500).json({err : "Fail"});
        }
        return res.status(201).json(result); 
    })
})

module.exports = cateRoute;