import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { StyledNav } from "./components/Navbar";
import { UserOptionsCard } from "./components/UserOptionsCard";
import "./App.css";
import { Newsfeed } from "./app/Newsfeed";
import { SignInPage } from "./app/SignInPage";
import { auth } from "./firebase";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [showNav, setShowNav] = useState(false);
  const [showOptionsCard, setShowOptionsCard] = useState(false);
  const toggleOptionsCard = () => {
    setShowOptionsCard(!showOptionsCard ? true : false);
  }
  const toggleNav = () => {
    setShowNav(false);
  }
  const location = useLocation();
  useEffect(() => {
    if (auth.currentUser) setShowNav(true);
  }, [location]);
  return (
    <div>
      {showNav && <StyledNav toggleCard={toggleOptionsCard} />}
      {showOptionsCard && <UserOptionsCard toggleCard={toggleOptionsCard} toggleNav={toggleNav} />}
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/newsfeed" element={<ProtectedRoute user={auth.currentUser}><Newsfeed /></ProtectedRoute>} />
      </Routes>
    </div>

  );
}

export default App;
