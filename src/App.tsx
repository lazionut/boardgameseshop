import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import BoardgamesPage from "./pages/BoardgamesPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";
import AccountPage from "./pages/AccountPage";
import EditAccountPage from "./pages/EditAccountPage";
import EditAddressPage from "./pages/EditAddressPage";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<BoardgamesPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/boardgames" element={<BoardgamesPage />} />
        <Route
          path={`/categories/:categoryId/boardgames`}
          element={<BoardgamesPage />}
        />
        <Route
          path="/account"
          element={
            <AuthenticatedRoute>
              <AccountPage />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/account/edit"
          element={
            <AuthenticatedRoute>
              <EditAccountPage />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/account/address/edit"
          element={
            <AuthenticatedRoute>
              <EditAddressPage />
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
