import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage";
import Home from "./pages/Home"; 
import Login from "./pages/Login";
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup-profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  )
}

export default App;
