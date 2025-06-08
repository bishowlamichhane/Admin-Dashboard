"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Bell,
  Search,
} from "lucide-react";

import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// Custom CSS for hiding scrollbars while maintaining scroll functionality
const noScrollbarStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const Sidebar = ({ userData, companyData, handleLogout, isSidebarOpen }) => {
  const location = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Navigation items with notification counts
  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      to: "/dashboard",
    },
    {
      title: "Products",
      icon: Package,
      to: "/dashboard/products",
      count: 12,
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      to: "/dashboard/orders",
      count: 5,
    },
    {
      title: "Customers",
      icon: Users,
      to: "/dashboard/customers",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      to: "/dashboard/analytics",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      to: "/dashboard/messages",
      count: 3,
      alert: true,
    },
    {
      title: "Notifications",
      icon: Bell,
      to: "/dashboard/notifications",
      count: 8,
    },
  ];

  // Support items
  const supportItems = [
    {
      title: "Settings",
      icon: Settings,
      to: "/dashboard/settings",
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      to: "/dashboard/support",
    },
  ];

  // Helper function to check if a route is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!userData) return "U";

    const fname = userData.fname || "";
    const lname = userData.lname || "";

    return `${fname.charAt(0)}${lname.charAt(0)}`.toUpperCase();
  };

  return (
    <TooltipProvider delayDuration={0}>
      <style>{noScrollbarStyles}</style>
      <div
        className={cn(
          "fixed flex flex-col h-screen bg-[#1a1f36] transition-all duration-300 z-30 shadow-lg",
          !isSidebarOpen ? "w-[70px]" : "w-64"
        )}
      >
        {/* Logo and brand */}
        <div
          className={cn(
            "flex h-16 items-center px-4 border-b border-[#2e3650]",
            !isSidebarOpen ? "justify-center" : "justify-between"
          )}
        >
          {isSidebarOpen && (
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#4f46e5]">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                {companyData?.name || "OpenShop"}
              </span>
            </Link>
          )}
          {!isSidebarOpen && (
            <Link to="/dashboard">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#4f46e5]">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
            </Link>
          )}
        </div>

        {/* Search bar */}
        {isSidebarOpen && (
          <div className="px-4 py-3">
            <div
              className={cn(
                "flex items-center h-9 rounded-md border border-[#2e3650] bg-[#252b43] px-3 text-sm",
                isSearchFocused && "ring-1 ring-[#4f46e5]"
              )}
            >
              <Search className="mr-2 h-4 w-4 text-[#94a3b8]" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent text-white placeholder:text-[#94a3b8] focus:outline-none"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>
        )}

        {/* Navigation section */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="py-2">
            <div className="px-3 py-2">
              {isSidebarOpen && (
                <h3 className="mb-2 text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Main Menu
                </h3>
              )}
              <nav className="space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.to);

                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className="relative group">
                          <Link
                            to={item.to}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                              active
                                ? "bg-[#252b43] text-white"
                                : "text-[#cbd5e1] hover:bg-[#252b43] hover:text-white",
                              !isSidebarOpen ? "justify-center px-2" : ""
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-5 w-5",
                                active
                                  ? "text-[#4f46e5]"
                                  : "text-[#94a3b8] group-hover:text-[#4f46e5]"
                              )}
                            />
                            {isSidebarOpen && (
                              <>
                                <span>{item.title}</span>
                                {item.count && (
                                  <Badge
                                    variant="outline"
                                    className="ml-auto bg-[#252b43] text-[#4f46e5] border-[#4f46e5]/50 px-2 py-0 h-5"
                                  >
                                    {item.count}
                                  </Badge>
                                )}
                                {item.alert && !item.count && (
                                  <span className="ml-auto flex h-2 w-2 rounded-full bg-[#4f46e5]"></span>
                                )}
                              </>
                            )}
                            {!isSidebarOpen && item.count && (
                              <Badge
                                variant="outline"
                                className="absolute -top-1 -right-1 bg-[#252b43] text-[#4f46e5] border-[#4f46e5]/50 px-1.5 h-4 min-w-4 flex items-center justify-center"
                              >
                                {item.count}
                              </Badge>
                            )}
                            {!isSidebarOpen && item.alert && !item.count && (
                              <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-[#4f46e5]"></span>
                            )}
                          </Link>
                        </div>
                      </TooltipTrigger>
                      {!isSidebarOpen && (
                        <TooltipContent
                          side="right"
                          className="bg-[#252b43] text-white"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </nav>
            </div>

            <div className="py-2">
              {isSidebarOpen && (
                <h3 className="mb-2 px-3 text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Support
                </h3>
              )}
              <nav className="space-y-1">
                {supportItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.to);

                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className="relative group">
                          <Link
                            to={item.to}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                              active
                                ? "bg-[#252b43] text-white"
                                : "text-[#cbd5e1] hover:bg-[#252b43] hover:text-white",
                              !isSidebarOpen ? "justify-center px-2" : ""
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-5 w-5",
                                active
                                  ? "text-[#4f46e5]"
                                  : "text-[#94a3b8] group-hover:text-[#4f46e5]"
                              )}
                            />
                            {isSidebarOpen && <span>{item.title}</span>}
                          </Link>
                        </div>
                      </TooltipTrigger>
                      {!isSidebarOpen && (
                        <TooltipContent
                          side="right"
                          className="bg-[#252b43] text-white"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* User profile section */}
        <div className="mt-auto p-4 border-t border-[#2e3650]">
          <div
            className={cn(
              "flex items-center gap-3",
              !isSidebarOpen ? "justify-center" : ""
            )}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={userData?.photoURL} alt="User Avatar" />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  {userData?.fname} {userData?.lname}
                </p>
                <p className="text-xs text-[#94a3b8] truncate">
                  {userData?.email}
                </p>
              </div>
            )}
            {isSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#94a3b8] hover:bg-[#252b43] hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
