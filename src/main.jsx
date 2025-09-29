
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Store.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="kameez" element={<Kameez />} />
      <Route path="suiting" element={<Suiting />} />
      <Route path="perfumes" element={<Perfumes />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="term" element={<TermsAndCondition />} />
      <Route path="founder" element={<FounderInfo />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="contact" element={<ContactUs />} />
    </Route>
  ),
  { basename: "/ReactJs-E-commerce-Project" }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
