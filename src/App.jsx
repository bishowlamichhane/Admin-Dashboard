"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "./lib/utils";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
        <Sidebar />
      </div>

      {/* Main content with responsive margin */}
      <div
        className={cn(
          "flex-1 overflow-auto transition-all duration-300 ease-in-out",
          isSidebarOpen ? "lg:ml-0" : "lg:ml-0",
          isMobile ? "ml-0 p-4 pt-16" : "ml-0"
        )}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default App;
