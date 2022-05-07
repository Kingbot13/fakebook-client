import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Newsfeed } from "./app/Newsfeed";
import { SignInPage } from "./app/SignInPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
      </Routes>
    </Router>
  );
}

export default App;
