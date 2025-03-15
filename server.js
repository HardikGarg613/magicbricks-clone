const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "magicbricks"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL Database");
});

// Fetch All Properties
app.get("/properties", (req, res) => {
    let sql = "SELECT * FROM properties";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Search Properties
app.get("/search", (req, res) => {
    let { location, budget } = req.query;
    let sql = `SELECT * FROM properties WHERE location LIKE '%${location}%' AND price <= ${budget}`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
