const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'food_store_db'
})

connection.connect((error) => {
    if(error){
        console.log('Connect Fail');
    }else{
        console.log('Connect Success');
    }
})


module.exports = connection;