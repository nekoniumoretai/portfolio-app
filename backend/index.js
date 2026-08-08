const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "portfolio_app",
  port: 3306,
});

app.get("/api/todos", (req, res) => {
  connection.query(
    "SELECT * FROM todos",
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: "データベースエラーが発生しました",
        });
      }

      // Todo型への変換に対応させるため
      const todo = results.map((todo) => ({
        id: todo.id,
        user_id: todo.user_id,
        title: todo.title,
        completed: Boolean(todo.completed),
      }));

      res.json(todo);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});