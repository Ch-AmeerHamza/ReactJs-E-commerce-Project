// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Store.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Kameez from "./Components/Kameez";
import Suiting from "./Components/Suiting";
import Perfumes from "./Components/Perfumes";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import TermsAndCondition from "./Components/TermsAndCondition";
import FounderInfo from "./Components/FounderInfo";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Dashboard from "./Components/Dashboard";

// Simple 404 component
const NotFound = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'white', background: '#1a1a1a', minHeight: '100vh' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="#/" style={{ color: '#ffd700' }}>Go back to home</a>
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="kameez" element={<Kameez />} />
            <Route path="suiting" element={<Suiting />} />
            <Route path="perfumes" element={<Perfumes />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="term" element={<TermsAndCondition />} />
            <Route path="founder" element={<FounderInfo />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </StrictMode>
);