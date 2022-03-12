import { LoginGoogle } from "./components/LoginGoogle";
import { SignUpEmailForm } from "./components/SignUpEmail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FirebaseAuthData } from "./components/handlers/UserContext";
import "./App.css";
import LoginPage from "./pages/Login";
import SignUp from "./pages/Signup";
import HomePage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardPage from "./pages/Dashboard";
import SearchCMPage from "./pages/SearchCM";
function App() {
  return (
    <>
      <FirebaseAuthData>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route exact path="/search" element={<SearchCMPage />} />
          </Routes>
        </Router>
      </FirebaseAuthData>
    </>
  );
}

export default App;
