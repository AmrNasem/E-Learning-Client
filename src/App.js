import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainHeader from "./components/MainHeader";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <MainHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
