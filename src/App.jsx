// In App.jsx of your admin dashboard
"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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

const App = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Auto-close sidebar on mobile
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      } else if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [isSidebarOpen]);

  // Handle overlay click to close sidebar on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Handle user authentication state
  useEffect(() => {
    console.log("Checking authentication state...");

    // Add a delay to ensure Firebase has time to initialize
    const timeoutId = setTimeout(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        console.log(
          "Auth state changed:",
          currentUser ? "User logged in" : "No user"
        );
        setLoading(true);

        if (currentUser) {
          setUser(currentUser);

          // Fetch user data from Firestore
          try {
            const userDocRef = doc(firestore, "users", currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              setUserData(userDoc.data());
            } else {
              console.log("No user data found in Firestore");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }

          setLoading(false);
        } else {
          // Only redirect if we've explicitly checked auth and no user is found
          setAuthChecked(true);
          setUser(null);
          setUserData(null);
          setLoading(false);

          // Add a small delay before redirecting to prevent immediate redirect
          setTimeout(() => {
            if (!auth.currentUser) {
              console.log("No user found, redirecting to landing page");
              window.location.href =
                "https://landing-page-woad-eta.vercel.app/login";
            }
          }, 1000);
        }
      });

      return () => {
        unsubscribe(); // Clean up on unmount
        clearTimeout(timeoutId);
      };
    }, 1000); // 1 second delay to ensure Firebase is initialized

    return () => clearTimeout(timeoutId);
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to landing page after logout
      window.location.href = "https://landing-page-woad-eta.vercel.app/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-2">Loading authentication state...</p>
      </div>
    );
  }

  // If we've checked auth and there's no user, show a message instead of redirecting immediately
  if (authChecked && !user) {
    return (
      <div className="flex h-screen items-center justify-center flex-col">
        <p className="text-xl mb-4">
          You need to be logged in to access this page
        </p>
        <Button
          onClick={() =>
            (window.location.href =
              "https://landing-page-woad-eta.vercel.app/login")
          }
        >
          Go to Login
        </Button>
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
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
