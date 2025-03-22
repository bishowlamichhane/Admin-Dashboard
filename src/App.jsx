// In App.jsx of your admin dashboard
"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  browserLocalPersistence,
  setPersistence,
  signInWithCustomToken,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "./lib/utils";

// Initialize Firebase
import { app } from "./firebase/firebaseConfig";
const auth = getAuth(app);
const firestore = getFirestore(app);

// Set persistence explicitly
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

const App = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      } else if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [isSidebarOpen]);

  // Handle overlay click to close sidebar on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Check for token in URL (new approach)
  useEffect(() => {
    const checkForToken = async () => {
      console.log("Checking for token in URL...");
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        console.log("Token found in URL, attempting to sign in...");
        try {
          // Remove token from URL to prevent issues on refresh
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);

          // Store token in localStorage
          localStorage.setItem("firebase_token", token);

          // Use the token to sign in with Firebase
          // This is the key part that was missing
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdToken",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idToken: token,
                returnSecureToken: true,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to verify token");
          }

          console.log("Successfully authenticated with token");
          // The auth state listener will handle the rest
        } catch (error) {
          console.error("Error processing token:", error);
          setAuthError(error.message);
        }
      } else {
        console.log("No token found in URL");
      }
    };

    checkForToken();
  }, []);

  // Handle user authentication state
  useEffect(() => {
    console.log("Setting up auth state listener...");

    // Check localStorage for debugging
    console.log("Local Storage Contents:", Object.keys(localStorage));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(
        "Auth state changed:",
        currentUser ? `User logged in: ${currentUser.email}` : "No user"
      );

      if (currentUser) {
        console.log("User ID:", currentUser.uid);
        console.log("Email:", currentUser.email);
        console.log("Email verified:", currentUser.emailVerified);
        console.log("Provider data:", currentUser.providerData);

        setUser(currentUser);

        // Fetch user data from Firestore
        try {
          console.log("Fetching user data from Firestore...");
          const userDocRef = doc(firestore, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            console.log("User data found:", userDoc.data());
            setUserData(userDoc.data());
          } else {
            console.log(
              "No user data found in Firestore for UID:",
              currentUser.uid
            );
            setAuthError("User data not found in database");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setAuthError(`Error fetching user data: ${error.message}`);
        }
      } else {
        console.log("No user found in auth state");
        setUser(null);
        setUserData(null);

        // Check if we have a token in localStorage (from URL parameter)
        const storedToken = localStorage.getItem("firebase_token");
        if (storedToken) {
          console.log("Found stored token, attempting to use it...");
          try {
            // This is just for debugging - in a real implementation we'd use a proper backend verification
            console.log("Token available but not using it automatically");
          } catch (error) {
            console.error("Error using stored token:", error);
            setAuthError(`Error using stored token: ${error.message}`);
          }
        } else {
          console.log("No stored token found");
          // Wait a bit before redirecting to avoid immediate redirect loops
          setTimeout(() => {
            if (!auth.currentUser) {
              console.log("Redirecting to landing page login...");
            }
          }, 2000);
        }
      }

      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await signOut(auth);
      localStorage.removeItem("firebase_token"); // Clear stored token
      console.log("Logged out successfully");
      window.location.href = "https://landing-page-woad-eta.vercel.app/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Manual login function for debugging
  const attemptManualLogin = async () => {
    const storedToken = localStorage.getItem("firebase_token");
    if (storedToken) {
      try {
        console.log("Attempting manual login with stored token...");
        // In a real implementation, you'd verify this token on your backend
        // For now, we're just showing this for debugging
        alert(
          "Token found but manual login not implemented. This is just for debugging."
        );
      } catch (error) {
        console.error("Manual login error:", error);
        setAuthError(`Manual login error: ${error.message}`);
      }
    } else {
      alert("No authentication token found");
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950">
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Sidebar with responsive behavior */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar userData={userData} />
      </div>

      {/* Main content with responsive margin */}
      <div
        className={cn(
          "flex-1 overflow-auto transition-all duration-300 ease-in-out",
          isSidebarOpen ? "lg:ml-0" : "lg:ml-0",
          isMobile ? "ml-0 p-4 pt-16" : "ml-0"
        )}
      >
        {/* Header with user info and logout button */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 p-4 border-b flex justify-between items-center">
          <div>
            {userData && (
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                  {userData.fname ? userData.fname.charAt(0) : "U"}
                </div>
                <div>
                  <p className="font-medium">
                    {userData.fname} {userData.lname}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {userData.email}
                  </p>
                </div>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
