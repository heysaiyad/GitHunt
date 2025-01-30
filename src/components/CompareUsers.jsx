import React, { useState } from "react";
import Loading from "./Loading";

const CompareUsers = () => {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);

  const fetchUserData = async (username, setData, setError) => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");
      const userData = await res.json();

      const reposRes = await fetch(userData.repos_url);
      if (!reposRes.ok) throw new Error("Repositories not found");
      const reposData = await reposRes.json();

      setData({ ...userData, repos: reposData });
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const handleCompare = async () => {
    setLoading(true);
    setError1(null);
    setError2(null);
    await Promise.all([
      fetchUserData(user1, setData1, setError1),
      fetchUserData(user2, setData2, setError2),
    ]);
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="GitHub Username 1"
          value={user1}
          onChange={(e) => setUser1(e.target.value)}
          className="input w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="GitHub Username 2"
          value={user2}
          onChange={(e) => setUser2(e.target.value)}
          className="input w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCompare}
          className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Compare
        </button>
      </div>
      {loading && <Loading />}
      {error1 && !error2 && <div className="text-red-500 mb-4 flex justify-center font-semibold text-[18px]"> User 1 not found. Please check the username and try again.</div>}
      {error2 && !error1 && <div className="text-red-500 mb-4 flex justify-center font-semibold text-[18px]">User 2 not found. Please check the username and try again.</div>}
      {error1 && error2 && <div className="text-red-500 mb-4 flex justify-center font-semibold text-[18px]">Both Users not found. Please check the username and try again.</div>}
      {data1 && data2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserCard user={data1} compareUser={data2} />
          <UserCard user={data2} compareUser={data1} />
        </div>
      )}
    </div>
  );
};

const UserCard = ({ user, compareUser }) => {
  const highlightClass = (value, compareValue) => {
    if (value > compareValue) return "text-green-500";
    if (value < compareValue) return "text-red-500";
    return "";
  };

  const topRepos = user.repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);

  return (
    <div className="card bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
      <p className="text-gray-400 mb-4">{user.bio}</p>
      <p className={`mb-2 ${highlightClass(user.followers, compareUser.followers)}`}>
        Followers: {user.followers}
      </p>
      <p className={`mb-2 ${highlightClass(user.following, compareUser.following)}`}>
        Following: {user.following}
      </p>
      <p className={`mb-4 ${highlightClass(user.public_repos, compareUser.public_repos)}`}>
        Public Repos: {user.public_repos}
      </p>
      <h3 className="text-xl font-semibold mb-2">Top Repositories:</h3>
      <ul className="list-disc list-inside">
        {topRepos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {repo.name}
            </a> - ⭐ {repo.stargazers_count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompareUsers;