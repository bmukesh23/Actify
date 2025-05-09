import React from "react";
import Table from "./components/Table";
import UserForm from "./components/UserForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<UserForm />} />
        <Route path="/" element={<Table />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
