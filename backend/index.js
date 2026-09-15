const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

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
      const todos = results.map((todo) => ({
        id: todo.id,
        userId: todo.user_id,
        title: todo.title,
        completed: Boolean(todo.completed),
      }));

      res.json(todos);
    }
  );
});

app.post("/api/todos", (req, res) => {
  const title = req.body?.title;

  //空投稿の制御。空投稿やstring型以外ならreturnする。
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      message: "タイトルを入力してください。",
    });
  }

  const trimmedTitle = title.trim(); // trimした後のtitleをDBへ登録するための変数

  connection.query(
    `INSERT INTO todos (user_id, title)
    VALUES (?, ?)`,
    [1, trimmedTitle],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "データベースエラーが発生しました。"
        });
      }
      
      res.status(201).json({
        id: result.insertId,
        userId: 1,
        title: trimmedTitle,
        completed: false,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
