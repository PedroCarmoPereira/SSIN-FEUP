'use strict';

const express = require('express');
const db = require("./database.js")

// Constants
const PORT = 4500;
const HOST = '0.0.0.0';


// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});


app.get("/api/users", (req, res, next) => {
  var sql = "select * from user"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:49160`);
