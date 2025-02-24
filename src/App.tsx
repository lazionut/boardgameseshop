import "./App.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";

import Footer from "src/components/footer/Footer";
import NavigationBar from "src/components/navigationBar/NavigationBar";
import { AuthContextProvider } from "src/context/AuthContext";
import CartContextProvider from "src/context/CartContext";
import WishlistContextProvider from "src/context/WishlistContext";
import AccountPage from "src/pages/AccountPage";
import AdminAccountsPage from "src/pages/AdminAccountsPage";
import AdminOrdersHistoryPage from "src/pages/AdminOrdersHistoryPage";
import BoardgamesPage from "src/pages/BoardgamesPage";
import CheckoutOrderPage from "src/pages/CheckoutOrderPage";
import EditAddressPage from "src/pages/EditAddressPage";
import EditAccountPage from "src/pages/EditProfilePage";
import ErrorPage from "src/pages/ErrorPage";
import LoginPage from "src/pages/LoginPage";
import OrderDetailsPage from "src/pages/OrderDetailsPage";
import OrderHistoryPage from "src/pages/OrderHistoryPage";
import RegisterPage from "src/pages/RegisterPage";
import SingleBoardGamePage from "src/pages/SingleBoardgamePage";
import WishlistsPage from "src/pages/WishlistsPage";
import AdminAuthenticatedRoute from "src/routes/AdminAuthenticatedRoute";
import CostumerAuthenticatedRoute from "src/routes/CostumerAuthenticatedRoute";
import { theme } from "src/theme/Theme";

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
