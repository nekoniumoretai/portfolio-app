import { useState } from "react";
import type { Todo } from "../types/Todo";

function useTodos() {
  const[todos, setTodos] = useState<Todo[]>([]);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");


  const addTodos = async (title: string) => {

    setError("");//API通信直前でエラーの無いstateに更新（初回通信で失敗したら2回目以降もerrorのstateがエラーありの状態のままになってしまうため）
    setLoading(true); //API通信直前に通信中のstateに更新

    try{
      const response = await fetch(
        "http://localhost:3000/api/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("レスポンスが正しくありません");
      }
  
      const data: Todo = await response.json();
      setTodos([
        ...todos,
        data
      ]);
      return true; //通信成功時trueを返す。TODO追加ボタン押下時に使用する真偽値

    } catch {
      setError("通信に失敗しました。時間をおいて再度お試しください。");
      return false;//通信失敗時falseを返す。TODO追加ボタン押下時に使用する真偽値

    } finally {
      setLoading(false); //API通信が成功・失敗に関わらず通信していない状態に更新
    }
  };

  const fetchTodos = async () => {

    setError(""); //API通信直前でエラーの無いstateに更新（初回通信で失敗したら2回目以降もerrorのstateがエラーありの状態のままになってしまうため）
    setLoading(true); //API通信直前に通信中のstateに更新
    
    try {
      const response = await fetch(
        "http://localhost:3000/api/todos"
      );
      if (!response.ok) {
        throw new Error("HTTPエラーが発生しました。");
      }
      const data: Todo[] = await response.json();
      
      setTodos(data);
    } catch {
      setError("通信に失敗しました。時間を置いて再度お試しください。");
    } finally {
      setLoading(false); //API通信が成功・失敗に関わらず通信していない状態に更新
    }
  };

  return {
    todos,
    loading,
    error,
    addTodos,
    fetchTodos,
  }
}

export default useTodos;