"use client";

import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import Sidebar from "./components/Sidebar";
import { LogOut, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "./lib/utils";
import { ModeToggle } from "./components/mode-toggle";

// Initialize Firebase (make sure to import your firebase config)
import { app } from "./firebase/firebaseConfig";
import { useAuth } from "./contexts/authContext";

const auth = getAuth(app);
const firestore = getFirestore(app);

const App = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState(null);

  const { currentUser, loading: authLoading } = useAuth();

  console.log("App - isSidebarOpen:", isSidebarOpen, "isMobile:", isMobile);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Only set isMobile based on width
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []); // Empty dependency array means it runs once on mount and cleanup on unmount

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

        const companyCollectionRef = collection(
          firestore,
          "users",
          userId,
          "company"
        );
        const companySnapshot = await getDocs(companyCollectionRef);

        const companyData = [];

        for (const companyDoc of companySnapshot.docs) {
          const company = {
            id: companyDoc.id,
            ...companyDoc.data(),
          };

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
            company.analytics = analyticsSnapshot.docs[0].data();
          } else {
            company.analytics = { revenue: 0, sales: 0 };
          }

          companyData.push(company);
        }

        const completeUserData = {
          ...userDoc.data(),
          company: companyData,
        };

        console.log("Complete user data with company:", completeUserData);
        setUserData(completeUserData);
        return completeUserData;
      }

      console.log("No user data found in Firestore for UID:", userId);
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  // Fetch user data when currentUser changes (authenticated)
  useEffect(() => {
    if (currentUser) {
      console.log("User from AuthContext:", currentUser.uid);
      if (!userData || userData.uid !== currentUser.uid) {
        fetchUserData(currentUser.uid);
      }
    } else {
      setUserData(null); // Clear user data if currentUser becomes null
    }
  }, [currentUser]); // Depend only on currentUser

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await signOut(auth);
      localStorage.removeItem("firebase_token"); // Clear stored token
      console.log("Logged out successfully");
      setUserData(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // App should only render content if currentUser is available
  if (!currentUser) {
    return null; // Should not happen often due to ProtectedRoute, but as a fallback
  }

  // For authenticated routes (dashboard and other admin pages)
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
          "h-screen transition-transform duration-300 ease-in-out border border-red-500",
          isMobile
            ? // Mobile: fixed positioning for slide-in/out
              isSidebarOpen
              ? "fixed inset-y-0 left-0 z-40 w-64 translate-x-0"
              : "fixed inset-y-0 left-0 z-40 w-64 -translate-x-full"
            : // Desktop: part of flex flow, hide if not open
            isSidebarOpen
            ? "w-64"
            : "w-0 overflow-hidden" // Hide sidebar by setting width to 0 and hiding overflow
        )}
      >
        <Sidebar userData={userData} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main content with responsive margin */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out border border-blue-500",
          isMobile ? "ml-0 p-4 pt-16" : "p-4"
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
          <div className="flex items-center gap-2">
            <ModeToggle />
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
        </div>

        <div className="p-4 flex-1">
          <Outlet context={userData} />
        </div>
      </div>
    </div>
  );
};

export default App;
