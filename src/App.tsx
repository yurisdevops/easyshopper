import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { About } from "./pages/about";
import { Cart } from "./pages/cart";
import { Checkout } from "./pages/checkout";
import { NotFound } from "./pages/error";
import { Home } from "./pages/home";
import { Products } from "./pages/products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
