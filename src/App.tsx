import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { Layout } from "./components/layout/Layout";
import { About } from "./pages/about";
import { Cart } from "./pages/cart";
import { Checkout } from "./pages/checkout";
import { NotFound } from "./pages/error";
import { Home } from "./pages/home";
import { Products } from "./pages/products";
import { Profile } from "./pages/profile";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
