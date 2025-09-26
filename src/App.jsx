
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import Kameez from "./Components/Kameez";
import Suiting from "./Components/Suiting";
import Perfumes from "./Components/Perfumes";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import TermsAndCondition from "./Components/TermsAndCondition";
import FounderInfo from "./Components/FounderInfo";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";


function App() {
  
  return (
    <>
<BrowserRouter>
<Navbar/>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/kameez" element={<Kameez/>}/>
<Route path="/suiting" element={<Suiting/>}/>
<Route path="/perfumes" element={<Perfumes/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/term" element={<TermsAndCondition/>}/>
<Route path="/founder" element={<FounderInfo/>}/>
<Route path="/aboutus" element={<AboutUs/>}/>
<Route path="/contact" element={<ContactUs/>}/>
</Routes>
<Footer/>
</BrowserRouter>

    </>
  )
}

export default App
