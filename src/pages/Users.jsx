import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6">
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 mb-4">Logout</button>
      <h2 className="text-4xl relative ml-[45%] mb-8 font-bold">User List</h2>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className=" flex flex-col items-center border p-4 rounded-md shadow">
            <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full" />
            <h3>{user.first_name} {user.last_name}</h3>
            <button className="bg-yellow-500 text-white w-[100%] p-2 mt-2" onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-8 mt-8">
        <button className="px-6 text-white text-xl py-2 bg-blue-500" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button className="px-6 text-white text-xl py-2 bg-blue-500" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Users;
