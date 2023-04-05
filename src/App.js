import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainHeader from "./components/MainHeader";
import MobileHeader from "./components/MobileHeader";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import { useContext } from "react";
import HeaderContext from "./store/header-context";

function App() {
  const headerCtx = useContext(HeaderContext);
  const blurCategoriesHandler = () => {
    headerCtx.setVisibleCategories(false);
  };
  return (
    <div className="App" onClick={blurCategoriesHandler}>
      <MainHeader />
      <MobileHeader />
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
