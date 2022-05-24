import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { StyledNav } from "./components/Navbar";
import "./App.css";
import { Newsfeed } from "./app/Newsfeed";
import { SignInPage } from "./app/SignInPage";
import { auth } from "./firebase";

function App() {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (auth.currentUser) setShowNav(true);
  }, [location]);
  return (
    <div>
      {showNav && <StyledNav />}
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
      </Routes>
    </div>

  );
}

export default App;
