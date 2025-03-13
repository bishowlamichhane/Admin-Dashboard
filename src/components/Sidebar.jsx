"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Receipt,
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
import { ScrollArea } from "./ui/scroll-area";

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
      <div
        className={cn(
          "fixed flex flex-col h-screen bg-slate-900 transition-all duration-300 z-30",
          isCollapsed ? "w-[70px]" : "w-64"
        )}
      >
        {/* Logo and brand */}
        <div
          className={cn(
            "flex h-16 items-center px-4 border-b border-slate-800",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-green-500" />
              <span className="font-bold text-xl text-white">OpenShop</span>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/">
              <BarChart3 className="h-6 w-6 text-green-500" />
            </Link>
          )}
        </div>

        {/* Search bar */}
        {!isCollapsed && (
          <div className="px-4 py-3">
            <div
              className={cn(
                "flex items-center h-9 rounded-md border border-slate-700 bg-slate-800 px-3 text-sm",
                isSearchFocused && "ring-1 ring-green-500"
              )}
            >
              <Search className="mr-2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent text-slate-300 placeholder:text-slate-500 focus:outline-none"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>
        )}

        {/* Navigation section */}
        <ScrollArea className="flex-1">
          <div className="py-2">
            <div className="px-3 py-2">
              {!isCollapsed && (
                <h3 className="mb-2 text-xs font-medium text-slate-500">
                  MAIN MENU
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
                                ? "bg-slate-800 text-white"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white",
                              isCollapsed ? "justify-center px-2" : ""
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-5 w-5",
                                active
                                  ? "text-green-500"
                                  : "text-slate-400 group-hover:text-green-500"
                              )}
                            />
                            {!isCollapsed && (
                              <>
                                <span>{item.title}</span>
                                {item.count && (
                                  <Badge
                                    variant="outline"
                                    className="ml-auto bg-slate-800 text-green-500 border-green-500/50 px-2 py-0 h-5"
                                  >
                                    {item.count}
                                  </Badge>
                                )}
                                {item.alert && !item.count && (
                                  <span className="ml-auto flex h-2 w-2 rounded-full bg-green-500"></span>
                                )}
                              </>
                            )}
                            {isCollapsed && item.count && (
                              <Badge
                                variant="outline"
                                className="absolute -top-1 -right-1 bg-slate-800 text-green-500 border-green-500/50 px-1.5 h-4 min-w-4 flex items-center justify-center"
                              >
                                {item.count}
                              </Badge>
                            )}
                            {isCollapsed && item.alert && !item.count && (
                              <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-green-500"></span>
                            )}
                          </Link>
                        </div>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent
                          side="right"
                          className="bg-slate-800 border-slate-700 text-white"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </nav>
            </div>

            <div className="my-4 h-[1px] bg-slate-800 mx-3"></div>

            {/* Support section */}
            <div className="px-3 py-2">
              {!isCollapsed && (
                <h3 className="mb-2 text-xs font-medium text-slate-500">
                  SUPPORT
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
                                ? "bg-slate-800 text-white"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white",
                              isCollapsed ? "justify-center px-2" : ""
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-5 w-5",
                                active
                                  ? "text-green-500"
                                  : "text-slate-400 group-hover:text-green-500"
                              )}
                            />
                            {!isCollapsed && <span>{item.title}</span>}
                          </Link>
                        </div>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent
                          side="right"
                          className="bg-slate-800 border-slate-700 text-white"
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
        </ScrollArea>

        {/* User and logout section */}
        <div className="mt-auto border-t border-slate-800 p-4">
          {!isCollapsed ? (
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-9 w-9 border border-slate-700">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-slate-800 text-green-500">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  John Doe
                </p>
                <p className="text-xs text-slate-400 truncate">
                  john.doe@example.com
                </p>
              </div>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center mb-3">
                  <Avatar className="h-9 w-9 border border-slate-700">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-slate-800 text-green-500">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-slate-800 border-slate-700 text-white"
              >
                John Doe
                <br />
                <span className="text-xs text-slate-400">
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
                    "flex items-center gap-2 w-full text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-all",
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
                className="bg-slate-800 border-slate-700 text-white"
              >
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
