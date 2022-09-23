import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import BoardgamesPage from "./pages/BoardgamesPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<BoardgamesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/boardgames" element={<BoardgamesPage />} />
          <Route
            path={`/categories/:categoryId/boardgames`}
            element={<BoardgamesPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
