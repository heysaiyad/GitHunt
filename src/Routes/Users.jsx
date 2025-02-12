import React, { useEffect, useState, useRef } from "react";
import Loading from "../components/Loading";
import UsersContainer from "../components/UsersContainer";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);
  const user = useRef("");
  let EndPoint = "https://api.github.com/users";
  const navigate = useNavigate();

  async function FindUser() {
    setLoading(true);
    if (user.current.value !== "") {
      setUsers("");
      const res = await fetch(EndPoint + "/" + user.current.value);
      const data = await res.json();
      setUsers(() => [data]);
      console.log(users);
      user.current.value = "";
    }
    setLoading(null);
  }

  useEffect(() => {}, [user, setUsers]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 py-8 px-4">
      <div
        className="font-medium hover:text-blue-500 text-blue-400 shadow-md transition mx-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        BACK
      </div>
      <div className="flex justify-center items-center my-8 gap-4">
        <input
          placeholder="Search GitHub username"
          ref={user}
          type="text"
          className="h-12 w-2/3 md:w-1/3 bg-gray-800 text-gray-200 placeholder-gray-400 rounded-lg px-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-md"
        />
        <button
          onClick={FindUser}
          className="h-12 bg-blue-500 text-white font-semibold px-8 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          Search
        </button>
      </div>
      <div className="text-center text-gray-400 mb-6">
        <p>"Explore GitHub users, repositories, and more!"</p>
        <p className="italic">"Start by typing a username above."</p>
      </div>
      <div className="mt-8">
        {loading ? <Loading /> : <UsersContainer users={users} />}
      </div>
    </div>
  );
};

export default Users;
