import React from "react";
import { Route, Routes } from "react-router-dom";
import Logo from "./components/Logo";
import UserInfo from "./Routes/UserInfo";
import Users from "./Routes/Users";
import CompareUsers from "./components/CompareUsers";
import LandingPage from "./components/LandingPage";



const App = () => {
  return (
    
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user" element={<Users />} />
          <Route path="/:name" element={<UserInfo />} />
          <Route path="/compare" element={<CompareUsers />} />
        </Routes>
      </div>
    
  );
};

export default App;
