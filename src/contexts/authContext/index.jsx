"use client";

import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthContext: Setting up onAuthStateChanged listener.");
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => {
      console.log("AuthContext: Cleaning up onAuthStateChanged listener.");
      unsubscribe();
    };
  }, []);

  async function initializeUser(user) {
    console.log("AuthContext: initializeUser received user:", user);
    if (user) {
      setCurrentUser({ ...user });
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
    console.log(
      "AuthContext: State updated - currentUser:",
      user ? user.uid : null,
      "loading:",
      false
    );
  }

  // Return the actual user object instead of just boolean values
  const value = { currentUser, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
