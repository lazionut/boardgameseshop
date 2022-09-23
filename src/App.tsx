import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import BoardgamesPage from "./pages/BoardgamesPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<BoardgamesPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/boardgames" element={<BoardgamesPage />} />
        <Route
          path={`/categories/:categoryId/boardgames`}
          element={<BoardgamesPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
