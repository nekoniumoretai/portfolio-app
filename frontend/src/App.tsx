import './App.css'
import { useState } from "react";
import type { User } from "./types/User";
import type { Todo } from "./types/Todo";

import UsersList from './components/UsersList';
import TodoList from './components/TodoList';

function App() {
  return (
    <div>
      <UsersList/>
      <TodoList/>
    </div>
  );
}

export default App
