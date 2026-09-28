import { Navigate, Route, HashRouter as Router, Routes } from "react-router-dom";
import { CheckoutLayout, StoreLayout } from "./components/Layouts";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { ProductProvider } from "./context/ProductContext";
import GlobalStyles from "./emotion/GlobalStyles";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import PaymentPage from "./pages/PaymentPage";
import ProductPage from "./pages/ProductPage";
import ReceiptPage from "./pages/ReceiptPage";
import ThankYouPage from "./pages/ThankYouPage";

export default function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <GlobalStyles />
            <Routes>
              <Route element={<StoreLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/game/:gameSlug" element={<CategoryPage mode="game" />} />
                <Route path="/game/:gameSlug/set/:setSlug" element={<CategoryPage mode="set" />} />
                <Route path="/shop/:typeSlug" element={<CategoryPage mode="type" />} />
                <Route path="/search" element={<CategoryPage mode="search" />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
              <Route element={<CheckoutLayout />}>
                <Route path="/checkout" element={<PaymentPage />} />
                <Route path="/order/:ref" element={<ThankYouPage />} />
                <Route path="/order/:ref/receipt" element={<ReceiptPage />} />
              </Route>
            </Routes>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}
