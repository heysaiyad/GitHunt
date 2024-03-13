import React from "react";

const Tabs = ({ type, setType }) => {
  return (
    <>
      <button
        className={`${type === "repos" && "text-pink-500"}`}
        onClick={() => setType("repos")}
      >
        Repositories
      </button>
      <button
        className={`${type === "followers" && "text-pink-500"}`}
        onClick={() => setType("followers")}
      >
        Followers
      </button>
    </>
  );
};

export default Tabs;
