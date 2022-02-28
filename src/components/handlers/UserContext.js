import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../base";

export let UserFirebaseAuth = React.createContext();
export let UserAllowedAccess = React.createContext();

export const useAuth = () => {
  return useContext(UserFirebaseAuth);
};

export const useAccess = () => {
  return useContext(UserAllowedAccess);
};

export const FirebaseAuthData = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [access, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      try {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            setAccess(doc.data()["access"]);
          });
      } catch (TypeError) {
        //console.log("getting access...");
      }
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <UserFirebaseAuth.Provider value={currentUser}>
        <UserAllowedAccess.Provider value={access}>
          {!loading && children}
        </UserAllowedAccess.Provider>
      </UserFirebaseAuth.Provider>
    </>
  );
};
