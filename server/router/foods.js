const express = require('express');
const router = express.Router();
const connection = require('../db.js');

router.get('/', (req,res) => {
    const querySelect = "SELECT * FROM foods";
    connection.query(querySelect, (err,result) => {
        if(err) {
            console.log('Select Food Fail');
            return res.status(500).json({error : "Select Fail"});
        }

        return res.status(200).json(result)
    })
})

module.exports = router;
