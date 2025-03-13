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

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768 && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [isCollapsed]);

  // Navigation items with notification counts
  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      to: "/",
    },
    {
      title: "Products",
      icon: Package,
      to: "/products",
      count: 12,
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      to: "/orders",
      count: 5,
    },
    {
      title: "Customers",
      icon: Users,
      to: "/customers",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      to: "/analytics",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      to: "/messages",
      count: 3,
      alert: true,
    },
    {
      title: "Notifications",
      icon: Bell,
      to: "/notifications",
      count: 8,
    },
  ];

  // Support items
  const supportItems = [
    {
      title: "Settings",
      icon: Settings,
      to: "/settings",
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      to: "/support",
    },
  ];

  // Helper function to check if a route is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <style>{noScrollbarStyles}</style>
      <div
        className={cn(
          "fixed flex flex-col h-screen bg-[#1a1f36] transition-all duration-300 z-30 shadow-lg",
          isCollapsed ? "w-[70px]" : "w-64"
        )}
      >
        {/* Logo and brand */}
        <div
          className={cn(
            "flex h-16 items-center px-4 border-b border-[#2e3650]",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#4f46e5]">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">OpenShop</span>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#4f46e5]">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
            </Link>
          )}
        </div>

        {/* Search bar */}
        {!isCollapsed && (
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
              {!isCollapsed && (
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
                              isCollapsed ? "justify-center px-2" : ""
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
                            {!isCollapsed && (
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
                            {isCollapsed && item.count && (
                              <Badge
                                variant="outline"
                                className="absolute -top-1 -right-1 bg-[#252b43] text-[#4f46e5] border-[#4f46e5]/50 px-1.5 h-4 min-w-4 flex items-center justify-center"
                              >
                                {item.count}
                              </Badge>
                            )}
                            {isCollapsed && item.alert && !item.count && (
                              <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-[#4f46e5]"></span>
                            )}
                          </Link>
                        </div>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent
                          side="right"
                          className="bg-[#252b43] border-[#2e3650] text-white"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </nav>
            </div>

            <div className="my-4 h-[1px] bg-[#2e3650] mx-3"></div>

            {/* Support section */}
            <div className="px-3 py-2">
              {!isCollapsed && (
                <h3 className="mb-2 text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Support
                </h3>
              )}
              <div className="space-y-1">
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
                              isCollapsed ? "justify-center px-2" : ""
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
                            {!isCollapsed && <span>{item.title}</span>}
                          </Link>
                        </div>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent
                          side="right"
                          className="bg-[#252b43] border-[#2e3650] text-white"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* User and logout section */}
        <div className="mt-auto border-t border-[#2e3650] p-4">
          {!isCollapsed ? (
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-9 w-9 border border-[#2e3650]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-[#252b43] text-[#4f46e5]">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  John Doe
                </p>
                <p className="text-xs text-[#94a3b8] truncate">
                  john.doe@example.com
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-[#94a3b8] hover:bg-[#252b43] hover:text-white md:hidden"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center mb-3">
                  <Avatar className="h-9 w-9 border border-[#2e3650]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-[#252b43] text-[#4f46e5]">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-[#252b43] border-[#2e3650] text-white"
              >
                John Doe
                <br />
                <span className="text-xs text-[#94a3b8]">
                  john.doe@example.com
                </span>
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative group">
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 w-full text-sm text-[#f87171] hover:bg-[#252b43] hover:text-[#ef4444] transition-all",
                    isCollapsed ? "justify-center px-2" : ""
                  )}
                >
                  <LogOut className="h-5 w-5" />
                  {!isCollapsed && <span>Logout</span>}
                </Button>
              </div>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent
                side="right"
                className="bg-[#252b43] border-[#2e3650] text-white"
              >
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Collapse button for desktop - only visible when sidebar is collapsed */}
        {isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-[#1a1f36] border border-[#2e3650] text-[#94a3b8] hover:text-white hidden md:flex"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        )}
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
