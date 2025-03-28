import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`).then((res) => setUser(res.data.data));
  }, [id]);

  const handleUpdate = async () => {
    await axios.put(`https://reqres.in/api/users/${id}`, user);
    navigate("/users");
  };

  return (
    <div className="p-6">
      <h2>Edit User</h2>
      <input className="border p-2 w-full mb-2" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} placeholder="First Name" />
      <input className="border p-2 w-full mb-2" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} placeholder="Last Name" />
      <button onClick={handleUpdate} className="bg-blue-500 text-white p-2">Update</button>
    </div>
  );
};

export default EditUser;

