import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../base";

export let UserFirebaseAuth = React.createContext();

export const FirebaseAuthData = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("changed...");
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <UserFirebaseAuth.Provider value={currentUser}>
        {!loading && children}
      </UserFirebaseAuth.Provider>
    </>
  );
};
