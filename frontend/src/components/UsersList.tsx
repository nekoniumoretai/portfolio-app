import { useEffect } from "react";
import useUsers from  "../hooks/useUsers";

function UsersList(){
  const { users, loading, error, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [])

  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>{error}</p>
  }
   
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  ); 
}

export default UsersList;