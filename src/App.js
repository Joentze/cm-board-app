import { LoginGoogle } from "./components/LoginGoogle";
import { SignUpEmailForm } from "./components/SignUpEmail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FirebaseAuthData } from "./components/handlers/UserContext";
import "./App.css";
import LoginPage from "./pages/Login";
import SignUp from "./pages/Signup";
import HomePage from "./pages/Home";

function App() {
  return (
    <>
      <FirebaseAuthData>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </FirebaseAuthData>
    </>
  );
}

export default App;
