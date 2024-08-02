// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutHeader from "./layouts/Header";
import LayoutFooter from "./layouts/Footer";
import LayoutSideMenu from "./layouts/SideMenu";
import Login from "./auth/Login";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";
import Product from "./components/Product";
// import Cart from "./components/Cart";


import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
                      <Menu />
                    }
                  />
                  <Route path="/product" element={<Product />} />
                  {/* Add more routes as needed */}
                </Routes>
                <ToastContainer
                  position="top-right"
                  autoClose={400}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover={false}
                  theme="light"
                />
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
