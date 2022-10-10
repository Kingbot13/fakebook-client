import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { StyledNav } from "./components/Navbar";
import { UserOptionsCard } from "./components/UserOptionsCard";
import "./App.css";
import { Newsfeed } from "./app/Newsfeed";
import { SignInPage } from "./app/SignInPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [showNav, setShowNav] = useState(false);
  const [showOptionsCard, setShowOptionsCard] = useState(false);
  const toggleOptionsCard = () => {
    setShowOptionsCard(!showOptionsCard ? true : false);
  };
  const toggleNav = () => {
    setShowNav(false);
  };
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("token")) setShowNav(true);
  }, [location]);
  return (
    <div>
      {showNav && <StyledNav toggleCard={toggleOptionsCard} />}
      {showOptionsCard && (
        <UserOptionsCard toggleCard={toggleOptionsCard} toggleNav={toggleNav} />
      )}
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route
          path="/newsfeed"
          element={
            <ProtectedRoute user={localStorage.getItem("token")}>
              <Newsfeed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
