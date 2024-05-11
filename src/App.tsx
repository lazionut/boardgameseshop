import "./App.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/footer/Footer";
import NavigationBar from "./components/navigationBar/NavigationBar";
import { AuthContextProvider } from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import WishlistContextProvider from "./context/WishlistContext";
import AccountPage from "./pages/AccountPage";
import AdminAccountsPage from "./pages/AdminAccountsPage";
import AdminOrdersHistoryPage from "./pages/AdminOrdersHistoryPage";
import BoardgamesPage from "./pages/BoardgamesPage";
import CheckoutOrderPage from "./pages/CheckoutOrderPage";
import EditAddressPage from "./pages/EditAddressPage";
import EditAccountPage from "./pages/EditProfilePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import RegisterPage from "./pages/RegisterPage";
import SingleBoardGamePage from "./pages/SingleBoardgamePage";
import WishlistsPage from "./pages/WishlistsPage";
import AdminAuthenticatedRoute from "./routes/AdminAuthenticatedRoute";
import CostumerAuthenticatedRoute from "./routes/CostumerAuthenticatedRoute";
import { theme } from "./theme/Theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContextProvider>
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
                    <CostumerAuthenticatedRoute>
                      <AccountPage />
                    </CostumerAuthenticatedRoute>
                  }
                />
                <Route
                  path="/account/profile/edit"
                  element={
                    <CostumerAuthenticatedRoute>
                      <EditAccountPage />
                    </CostumerAuthenticatedRoute>
                  }
                />
                <Route
                  path="/account/address/edit"
                  element={
                    <CostumerAuthenticatedRoute>
                      <EditAddressPage />
                    </CostumerAuthenticatedRoute>
                  }
                />
                <Route
                  path="/wishlists"
                  element={
                    <CostumerAuthenticatedRoute>
                      <WishlistsPage />
                    </CostumerAuthenticatedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <CostumerAuthenticatedRoute>
                      <OrderHistoryPage />
                    </CostumerAuthenticatedRoute>
                  }
                />
                <Route
                  path="/orders/:id"
                  element={
                    <CostumerAuthenticatedRoute>
                      <OrderDetailsPage />
                    </CostumerAuthenticatedRoute>
                  }
                />
                <Route
                  path="/orders/checkout"
                  element={
                    <CostumerAuthenticatedRoute>
                      <CheckoutOrderPage />
                    </CostumerAuthenticatedRoute>
                  }
                />
                <Route
                  path="/orders/all"
                  element={
                    <AdminAuthenticatedRoute>
                      <AdminOrdersHistoryPage />
                    </AdminAuthenticatedRoute>
                  }
                />
                <Route
                  path="/accounts"
                  element={
                    <AdminAuthenticatedRoute>
                      <AdminAccountsPage />
                    </AdminAuthenticatedRoute>
                  }
                />
              </Routes>
              <Footer />
            </WishlistContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
