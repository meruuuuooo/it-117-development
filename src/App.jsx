// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import LayoutHeader from "./layouts/Header";
import LayoutFooter from "./layouts/Footer";
import LayoutSideMenu from "./layouts/SideMenu";
import Login from "./auth/Login";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";
import Product from "./components/Product";
// import Cart from "./components/Cart";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setToken(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setToken(null);
  };

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selections, setSelections] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchProducts = async () => {
    setIsLoading(true);
    const response = await axios.get("http://localhost:3000/products");
    const data = await response.data;

    const productsWithQuantities = data.map((product) => ({
      ...product,
      quantity: 0,
      selectedLength: 10, // default length
      isSelected: false,
      selectedPrice: product.lengthPrices[10],
    }));

    setProducts(productsWithQuantities);
    setSelections(productsWithQuantities);
    setIsLoading(false);
  };

  const handleQuantityChange = (index, delta) => {
    setSelections((prevSelections) =>
      prevSelections.map((selection, i) => {
        if (i === index) {
          const newQuantity = Math.max(selection.quantity + delta, 0);
          return {
            ...selection,
            quantity: newQuantity,
            selectedPrice:
              products[i].lengthPrices[selection.selectedLength] * newQuantity,
          };
        }
        return selection;
      })
    );
  };

  const handleLengthSelection = (index, length) => {
    setSelections((prevSelections) =>
      prevSelections.map((selection, i) => {
        if (i === index) {
          const isSelected =
            selection.isSelected && selection.selectedLength === length;
          return {
            ...selection,
            selectedLength: isSelected ? 10 : length, // default to 10m if unselected
            isSelected: !isSelected,
            selectedPrice: !isSelected
              ? products[i].lengthPrices[length] * selection.quantity
              : products[i].lengthPrices[10] * selection.quantity
          };
        }
        return selection;
      })
    );
  };

  const addProductToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + product.quantity,
              totalAmount: item.totalAmount + product.selectedPrice,
            }
          : item
      );
      setCart(updatedCart);
    } else {
      const newCartItem = {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        selectedLength: product.selectedLength,
        totalAmount: product.selectedPrice,
      };
      setCart([...cart, newCartItem]);
    }

    setTotalAmount(
      cart.reduce(
        (sum, item) =>
          sum +
          (item.id === product.id
            ? item.totalAmount + product.selectedPrice
            : item.totalAmount),
        0
      )
    );

    // Update product stock
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === product.id
          ? {
              ...item,
              stock: item.stock - product.quantity,
            }
          : item
      )
    );
    setSelections((prevSelections) =>
      prevSelections.map((item) =>
        item.id === product.id
          ? {
              ...item,
              stock: item.stock - product.quantity,
            }
          : item
      )
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!token) {
    return <Login />;
  }

  return (
    <Router>
      <div className="nk-app-root">
        <div className="nk-main">
          <LayoutSideMenu handleLogout={handleLogout} />
          <div className="nk-wrap">
            <LayoutHeader />
            <div className="nk-content">
              <div className="container-fluid">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/pos"
                    element={
                      <Menu
                        products={products}
                        isLoading={isLoading}
                        selections={selections}
                        handleQuantityChange={handleQuantityChange}
                        handleLengthSelection={handleLengthSelection}
                        addProductToCart={addProductToCart}
                        cart={cart}
                      />
                    }
                  />
                  <Route path="/product" element={<Product />} />
                  {/* Add more routes as needed */}
                </Routes>
              </div>
            </div>
            <LayoutFooter />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
