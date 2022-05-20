import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StyledNav } from "./components/Navbar";
import "./App.css";
import { Newsfeed } from "./app/Newsfeed";
import { SignInPage } from "./app/SignInPage";
import { auth } from "./firebase";

function App() {
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    if (auth.currentUser) setShowNav(true);
  },[]);
  return (
    <Router>
      {showNav && <StyledNav />}
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
      </Routes>
    </Router>
  );
}

export default App;
