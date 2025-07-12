import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage";
import Home from "./pages/Home"; 
import Pagination from "./components/Pagination";
import SkillCard from "./components/SkillCard";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
