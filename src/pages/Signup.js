import { LoginGoogle } from "../components/LoginGoogle";
import { SignUpEmailForm } from "../components/SignUpEmail";
import { useContext, useEffect } from "react";
import { FirebaseAuthData } from "../components/handlers/UserContext";
import { Navigate, useNavigate } from "react-router";
import { auth } from "../base";
const SignUp = () => {
  const navigate = useNavigate();
  const currentUser = useContext(FirebaseAuthData);
  return (
    <>
      <SignUpEmailForm />
      <LoginGoogle />
    </>
  );
};
export default SignUp;
