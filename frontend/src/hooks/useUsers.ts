import { useState } from "react";
import type { User } from "../types/User";

function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {

    setLoading(true); //通信直前に通信中のstateに更新

    try {
      const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
      );
      const data: User[] = await response.json();
      setUsers(data);
    } catch {
      setError("通信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false); //通信成功・失敗に関わらず最後は通信していない状態に更新
    }
  };

  return {
    users,
    fetchUsers,
    loading,
    error,
  };
}

export default useUsers;