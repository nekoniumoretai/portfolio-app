const e = require("express");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 3000;

app.get("/api/todos", (req, res) => {
  res.json([
    {
      id: 1,
      userId: 1,
      title: "Todo-title",
      completed: false,
    },
    {
      id: 2,
      userId: 2,
      title: "Todo-title",
      completed: false,
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});