import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Events from "../components/Events";
import Loading from "../components/Loading";
import Repo from "../components/Repo";
import Tabs from "../components/Tabs";
import UsersContainer from "../components/UsersContainer";

const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [type, setType] = useState("repos");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  let EndPoint = "https://api.github.com/users";
  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function GetUserInfo() {
    const res = await fetch(EndPoint + pathname);
    const data = await res.json();
    setUser(() => [data]);
  }

  async function GetUrls() {
    setUsers([]);
    setLoading(true);
    const res = await fetch(EndPoint + pathname + `/${type}`);
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    GetUserInfo();
    GetUrls();
  }, [pathname, type]);

  return (
    <div className="py-8 bg-gradient-to-b from-gray-900 to-black min-h-screen text-gray-300">
      <button
        onClick={() => navigate("/user")}
        className="px-5 py-2 font-medium hover:text-blue-600 text-blue-500 rounded-lg shadow-md transition mx-4 my-6"
      >
        BACK
      </button>

      {user &&
        user?.map((uinfo, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row justify-center items-center gap-10 bg-gray-800 p-6 rounded-xl shadow-lg mx-4"
          >
            <img
              src={uinfo.avatar_url}
              alt="User Avatar"
              className="w-[250px] h-[250px] border-4 border-blue-500 rounded-full shadow-md"
            />
            <div className="text-lg leading-8">
              <h1 className="text-3xl font-bold text-blue-500 pb-4">{uinfo.name}</h1>
              <p><span className="font-semibold">Username:</span> {uinfo.login}</p>
              <p><span className="font-semibold">Followers:</span> {uinfo.followers}</p>
              <p><span className="font-semibold">Following:</span> {uinfo.following}</p>
              <p><span className="font-semibold">Public Repositories:</span> {uinfo.public_repos}</p>
              <p><span className="font-semibold">Joined:</span> {new Date(uinfo.created_at).toLocaleDateString()}</p>
              <a
                href={uinfo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-gray-900 font-semibold rounded-lg shadow-md transition"
              >
                Visit GitHub Profile
              </a>
            </div>
          </div>
        ))}

      <div className="flex border-b border-gray-600 pb-4 gap-8 mt-10 mb-6 justify-center text-lg">
        <Tabs type={type} setType={setType} />
      </div>

      {loading && <Loading />}

      {type === "repos" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-10/12 mx-auto">
          {users && <Repo users={users} />}
        </div>
      )}

      {type === "received_events" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-10/12 mx-auto">
          {users && <Events data={users} />}
        </div>
      )}

      {type === "followers" && <UsersContainer users={users} />}
    </div>
  );
};

export default UserInfo;
