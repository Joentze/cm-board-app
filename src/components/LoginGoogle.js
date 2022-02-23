import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../base";
import IconButton from "@mui/material/IconButton";
import GoogleIcon from "@mui/icons-material/Google";
import { userExistHandler } from "./handlers/UserExists";
import { useCallback, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserFirebaseAuth } from "./handlers/UserContext";

export const LoginGoogle = () => {
  const navigate = useNavigate();
  const LoginGoogleProvider = useCallback(async () => {
    let provider = new GoogleAuthProvider();
    await auth
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        let user = result.user;
        userExistHandler(user).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  });
  return (
    <>
      <IconButton onClick={LoginGoogleProvider}>
        <GoogleIcon />
      </IconButton>
    </>
  );
};
