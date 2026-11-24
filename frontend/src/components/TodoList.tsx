import { useEffect, useState } from "react";
import useTodos from "../hooks/useTodos";

function TodoList() {
  const [text, setText] = useState("");
  const { todos, loading, error, fetchTodos, addTodos, updateTodoStatus } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, [])

  // TODO追加ボタン押下時にPOST通信の結果次第でTODO入力フォームをリセットする
  const todoPostApi = async () => {

    // 空投稿制御。trimした結果が空ならreturnする。
    if (!text.trim()) {
      return;
    }

    const success = await addTodos(text);
    
    if (success) {
      setText("");
    }
  };

  if(loading) {
    return (<p>Loading...</p>)
  }

  if(error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>TodoList</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={todoPostApi}>
        追加
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={async (e) => {
                try {
                  await updateTodoStatus(todo.id, e.target.checked)
                } catch {
                  alert("Todoの更新に失敗しました")
                }
              }}
            />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;