import React from "react";
import { Link } from "react-router-dom";

const UsersContainer = ({ users }) => {
  return (
    <div className="flex gap-8 flex-wrap justify-center py-8">
      {users &&
        users?.map((user, idx) =>
          user?.login ? (
            <div
              key={idx}
              className="flex w-[250px] border border-gray-600 shadow-lg bg-gradient-to-br from-gray-800 to-black p-5 rounded-lg flex-col items-center hover:scale-105 transform transition-transform"
            >
              <img
                src={user?.avatar_url}
                alt={`${user?.login} avatar`}
                className="w-28 h-28 mb-4 border-4 border-teal-400 rounded-full shadow-md"
              />

              <h1 className="text-2xl font-semibold text-white mb-1">{user?.login}</h1>
              <h2 className="text-md text-teal-400 font-medium mb-4">{user?.name || "GitHub User"}</h2>
              <Link to={`/${user?.login}`}>
                <span
                  className="text-gray-200 font-semibold rounded px-6 py-2 bg-teal-600 hover:bg-teal-500 transition tracking-wide text-lg shadow-sm"
                >
                  View Profile
                </span>
              </Link>
            </div>
          ) : (
            <div className="text-lg text-gray-400">No user found</div>
          )
        )}
    </div>
  );
};

export default UsersContainer;
