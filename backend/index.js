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

app.patch("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  // 更新するIDの整合性チェック
  if (!Number.isInteger(id) || id <= 0){
    return res.status(400).json({
      message: "有効なTodo IDを指定してください"
    });
  }

  // 更新するフラグのデータ型チェック
  const completed = req.body?.completed;
  if (typeof completed !== "boolean") {
    return res.status(400).json({
      message: "completedはboolean型で指定してください"
    });
  }

  connection.query(
    `UPDATE todos SET completed = ? WHERE id = ?`,
    [completed, id],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "データベースエラーが発生しました"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "指定されたTodoが見つかりません"
        })
      };

      res.status(200).json({
        id: id,
        completed: completed
      });
    }
  );
});

app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "有効なTodo IDを指定してください"
    });
  }

  connection.query(
    `DELETE FROM todos WHERE id = ?`,
    [id],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "データベースエラーが発生しました"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "指定されたTodoが見つかりません"
        })
      }

      res.status(200).json({
        id: id,
        message: "Todoを削除しました"
      });
    }
  )
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
