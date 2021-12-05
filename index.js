// Import
const express = require("express");
const app = express();
var mysql = require("mysql2");

// Port
const port = 3000;

// DB

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mesha@123",
  database: "news_system",
});

connection.connect();

// Services
app.get("/news-api/v1/categories", (req, res) => {
  connection.query(
    "SELECT id, name from news_system.categories",
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.get("/news-api/v1/categories/:categoryId/news", (req, res) => {
  categoryId = req.params.categoryId;
  connection.query(
    `SELECT id, title from news_system.news WHERE id_category=${categoryId}`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.get("/news-api/v1/categories/:categoryId/news/:newsId", (req, res) => {
  categoryId = req.params.categoryId;
  newsId = req.params.newsId;
  connection.query(
    `SELECT id, title, content from news_system.news WHERE id_category=${categoryId} AND id=${newsId}`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

// Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
