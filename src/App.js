import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Input from "./components/Input";
import Redirect from "./components/Redirect";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Input />} />
          <Route path="/:slug" element={<Redirect />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
