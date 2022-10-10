import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import NavigationBar from "./components/navigationBar/NavigationBar";
import BoardgamesPage from "./pages/BoardgamesPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import EditAccountPage from "./pages/EditProfilePage";
import EditAddressPage from "./pages/EditAddressPage";
import SingleBoardGamePage from "./pages/SingleBoardgamePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import WishlistsPage from "./pages/WishlistsPage";
import CartContextProvider from "./context/CartContext";
import CheckoutOrderPage from "./pages/CheckoutOrderPage";
import Footer from "./components/footer/Footer";
import { theme } from "./theme/Theme";
import WishlistContextProvider from "./context/WishlistContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartContextProvider>
          <WishlistContextProvider>
            <NavigationBar />
            <Routes>
              <Route path="*" element={<ErrorPage />} />
              <Route path="/" element={<BoardgamesPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/boardgames" element={<BoardgamesPage />} />
              <Route
                path="/boardgames/:boardgameId"
                element={<SingleBoardGamePage />}
              />
              <Route path="/error" element={<ErrorPage />} />
              <Route
                path={`/categories/:categoryId/boardgames`}
                element={<BoardgamesPage />}
              />
              <Route
                path={`/boardgames/search`}
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
                path="/account/profile/edit"
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
              <Route
                path="/wishlists"
                element={
                  <AuthenticatedRoute>
                    <WishlistsPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <AuthenticatedRoute>
                    <OrderHistoryPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <AuthenticatedRoute>
                    <OrderDetailsPage />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/orders/checkout"
                element={
                  <AuthenticatedRoute>
                    <CheckoutOrderPage />
                  </AuthenticatedRoute>
                }
              />
            </Routes>
            <Footer />
          </WishlistContextProvider>
        </CartContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
