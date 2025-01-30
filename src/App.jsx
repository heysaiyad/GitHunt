import React from "react";
import { Route, Routes } from "react-router-dom";
import Logo from "./components/Logo";
import UserInfo from "./Routes/UserInfo";
import Users from "./Routes/Users";
import CompareUsers from "./components/CompareUsers";

const App = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container text-gray-200 py-3">
        <Logo />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:name" element={<UserInfo />} />
          <Route path="/compare" element={<CompareUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;