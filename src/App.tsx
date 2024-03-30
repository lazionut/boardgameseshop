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
import CostumerAuthenticatedRoute from "./routes/CostumerAuthenticatedRoute";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import WishlistsPage from "./pages/WishlistsPage";
import CartContextProvider from "./context/CartContext";
import CheckoutOrderPage from "./pages/CheckoutOrderPage";
import Footer from "./components/footer/Footer";
import { theme } from "./theme/Theme";
import WishlistContextProvider from "./context/WishlistContext";
import AdminOrdersHistoryPage from "./pages/AdminOrdersHistoryPage";
import AdminAccountsPage from "./pages/AdminAccountsPage";
import AdminAuthenticatedRoute from "./routes/AdminAuthenticatedRoute";

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
              <Route path={`/boardgames/search`} element={<BoardgamesPage />} />
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
      </ThemeProvider>
    </div>
  );
}

export default App;
