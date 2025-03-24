"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "./lib/utils";

// Initialize Firebase (make sure to import your firebase config)
import { app } from "./firebase/firebaseConfig";
const auth = getAuth(app);
const firestore = getFirestore(app);

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

  // Function to fetch user data from Firestore
  const fetchUserData = async (userId) => {
    try {
      console.log("Fetching user data from Firestore for UID:", userId);
      const userDocRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("User data found:", userDoc.data());

        // Now fetch the company data
        const companyCollectionRef = collection(
          firestore,
          "users",
          userId,
          "company"
        );
        const companySnapshot = await getDocs(companyCollectionRef);

        const companyData = [];

        // Process each company document
        for (const companyDoc of companySnapshot.docs) {
          const company = {
            id: companyDoc.id,
            ...companyDoc.data(),
          };

          // Fetch analytics for this company
          const analyticsCollectionRef = collection(
            firestore,
            "users",
            userId,
            "company",
            companyDoc.id,
            "analytics"
          );

          const analyticsSnapshot = await getDocs(analyticsCollectionRef);

          if (!analyticsSnapshot.empty) {
            // Use the first analytics document
            company.analytics = analyticsSnapshot.docs[0].data();
          } else {
            company.analytics = { revenue: 0, sales: 0 };
          }

          companyData.push(company);
        }

        // Create the complete user data object with company information
        const completeUserData = {
          ...userDoc.data(),
          company: companyData,
        };

        console.log("Complete user data with company:", completeUserData);
        setUserData(completeUserData);
        return completeUserData;
      } else {
        console.log("No user data found in Firestore for UID:", userId);
        setAuthError("User data not found in database");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setAuthError(`Error fetching user data: ${error.message}`);
      return null;
    }
  };

  // Check for token in URL and use it to authenticate
  useEffect(() => {
    const authenticateWithToken = async () => {
      console.log("Checking for token in URL...");
      setLoading(true);

      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        console.log("Token found in URL, attempting to authenticate...");

        // Remove token from URL to prevent issues on refresh
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);

        // Store token in localStorage
        localStorage.setItem("firebase_token", token);

        try {
          // We need to manually verify the token and get user info
          // This is a workaround since Firebase doesn't automatically use the token

          // Option 1: Try to use the token with Firebase Admin SDK (requires backend)
          // This would be the proper way but requires a server component

          // Option 2: Use a Firebase REST API endpoint to verify the token
          // This is a client-side workaround
          const apiKey = "AIzaSyBtxdEUgH1PKDwniJy1vh_nVjI6YWsFOvw"; // Your Firebase API key

          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idToken: token,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to verify token");
          }

          const data = await response.json();
          console.log("Token verification response:", data);

          if (data.users && data.users.length > 0) {
            const userInfo = data.users[0];
            console.log("User info from token:", userInfo);

            // Now we have the user info, we can fetch the user data from Firestore
            const userData = await fetchUserData(userInfo.localId);

            if (userData) {
              // Set the user state manually since we're not using Firebase Auth's automatic state
              setUser({
                uid: userInfo.localId,
                email: userInfo.email,
                emailVerified: userInfo.emailVerified,
              });
            }
          } else {
            throw new Error("No user found for this token");
          }
        } catch (error) {
          console.error("Error authenticating with token:", error);
          setAuthError(`Authentication error: ${error.message}`);
        }
      } else {
        // No token in URL, check if we're already authenticated
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log("User already authenticated:", currentUser.uid);
          await fetchUserData(currentUser.uid);
          setUser(currentUser);
        } else {
          console.log("No token in URL and no authenticated user");
          // Check if we have a token in localStorage
          const storedToken = localStorage.getItem("firebase_token");
          if (storedToken) {
            console.log(
              "Found stored token in localStorage, attempting to use it..."
            );
            try {
              // Try to use the stored token
              const apiKey = "AIzaSyBtxdEUgH1PKDwniJy1vh_nVjI6YWsFOvw"; // Your Firebase API key

              const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    idToken: storedToken,
                  }),
                }
              );

              if (!response.ok) {
                throw new Error("Failed to verify stored token");
              }

              const data = await response.json();

              if (data.users && data.users.length > 0) {
                const userInfo = data.users[0];
                console.log("User info from stored token:", userInfo);

                // Now we have the user info, we can fetch the user data from Firestore
                const userData = await fetchUserData(userInfo.localId);

                if (userData) {
                  // Set the user state manually
                  setUser({
                    uid: userInfo.localId,
                    email: userInfo.email,
                    emailVerified: userInfo.emailVerified,
                  });
                }
              } else {
                throw new Error("No user found for this stored token");
              }
            } catch (error) {
              console.error("Error using stored token:", error);
              localStorage.removeItem("firebase_token"); // Clear invalid token
            }
          }
        }
      }

      setLoading(false);
    };

    authenticateWithToken();
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await signOut(auth);
      localStorage.removeItem("firebase_token"); // Clear stored token
      console.log("Logged out successfully");

      // Determine if we're in development or production
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      // Set the appropriate redirect URL
      const redirectUrl = isLocalhost
        ? "http://localhost:5173/" // Assuming landing page is on port 3000
        : "https://landing-page-woad-eta.vercel.app/";

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center flex-col">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p>Loading authentication state...</p>
        <p className="text-sm text-muted-foreground mt-2">
          This may take a moment
        </p>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="flex h-screen items-center justify-center flex-col p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Authentication Error</p>
          <p>{authError}</p>
        </div>
        <Button
          onClick={() => {
            const isLocalhost =
              window.location.hostname === "localhost" ||
              window.location.hostname === "127.0.0.1";
            const loginUrl = isLocalhost
              ? "http://localhost:5173/login"
              : "https://landing-page-woad-eta.vercel.app/";
            window.location.href = loginUrl;
          }}
        >
          Return to Login
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
        <p className="mb-6 text-center">
          You need to be logged in to access the admin dashboard
        </p>
        <Button
          onClick={() => {
            const isLocalhost =
              window.location.hostname === "localhost" ||
              window.location.hostname === "127.0.0.1";
            const loginUrl = isLocalhost
              ? "http://localhost:5173/login"
              : "https://landing-page-woad-eta.vercel.app/login";
            window.location.href = loginUrl;
          }}
        >
          Go to Login
        </Button>
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={() => {
              const token = localStorage.getItem("firebase_token");
              if (token) {
                alert(
                  `Token found in localStorage: ${token.substring(0, 10)}...`
                );
              } else {
                alert("No token found in localStorage");
              }
            }}
          >
            Debug: Check Token
          </Button>
        </div>
      </div>
    );
  }

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
          <Outlet context={userData} />
        </div>
      </div>
    </div>
  );
};

export default App;
