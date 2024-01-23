import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Crud from "./pages/Home/Crud.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Crud />} />
      </Routes>
    </Router>
  );
}

export default App;
