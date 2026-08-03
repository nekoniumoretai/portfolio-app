import { useEffect } from "react";
import useTodos from "../hooks/useTodos";

function TodoList() {
  const { todos, loading, error, fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, [])

  if(loading) {
    return (<p>Loading...</p>)
  }

  if(error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>TodoList</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;