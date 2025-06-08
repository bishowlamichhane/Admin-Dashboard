"use client";

import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  UserRound,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { doSignOut } from "../firebase/auth";
import CustomersTab from "./dashboard/CustomersTab";
import SubscriptionsTab from "./dashboard/SubscriptionsTab";
import AnalyticsTab from "./dashboard/AnalyticsTab";
import SettingsTab from "./dashboard/SettingsTab";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { app } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/authContext";

export default function AdminDashboard() {
  const location = useLocation();
  const { currentUser, loading } = useAuth(); // Get currentUser and loading from AuthContext
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalCustomers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
  });
  const [planDistribution, setPlanDistribution] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard data from Firestore
  useEffect(() => {
    if (loading || !currentUser) return; // Only fetch if not loading and user is present

    const fetchDashboardData = async () => {
      try {
        const firestore = getFirestore(app);
        const usersRef = collection(firestore, "users");

        // First, try to get customers without ordering (this doesn't require an index)
        const customersQuery = query(usersRef, where("role", "==", "customer"));

        let querySnapshot;
        try {
          // Try to get customers with ordering (requires index)
          const orderedQuery = query(
            usersRef,
            where("role", "==", "customer"),
            orderBy("createdAt", "desc")
          );
          querySnapshot = await getDocs(orderedQuery);
        } catch (error) {
          // If index error occurs, fall back to unordered query
          console.warn(
            "Using unordered query because index is missing. To enable sorting, create the index using the link in the console error."
          );
          querySnapshot = await getDocs(customersQuery);
        }

        const customers = [];
        const plans = {};
        let activeCount = 0;
        let totalRevenue = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          customers.push(data);

          // Count active subscriptions
          if (data.subscription?.status === "active") {
            activeCount++;

            // Calculate revenue
            const price = data.subscription?.price || "$0";
            const numericPrice = Number.parseInt(price.replace(/[^0-9]/g, ""));
            if (!isNaN(numericPrice)) {
              totalRevenue += numericPrice;
            }
          }

          // Count plans for distribution
          const planName = data.subscription?.planName || "None";
          plans[planName] = (plans[planName] || 0) + 1;
        });

        // Calculate conversion rate (active / total)
        const conversionRate =
          customers.length > 0
            ? Math.round((activeCount / customers.length) * 100)
            : 0;

        // Format plan distribution for chart
        const planData = Object.keys(plans).map((plan) => ({
          name: plan,
          value: plans[plan],
        }));

        // Sort customers by createdAt if we didn't get ordered results
        const sortedCustomers = [...customers].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateB - dateA; // descending order
        });

        // Get recent activity (newest 3 customers)
        const recentCustomers = sortedCustomers.slice(0, 3).map((customer) => ({
          type: "new-customer",
          name: `${customer.fname} ${customer.lname}`,
          email: customer.email,
          date: customer.createdAt,
          plan: customer.subscription?.planName || "None",
        }));

        setDashboardStats({
          totalCustomers: customers.length,
          activeSubscriptions: activeCount,
          monthlyRevenue: totalRevenue,
          conversionRate: conversionRate,
        });

        setPlanDistribution(planData);
        setRecentActivity(recentCustomers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);

        // Show a helpful message if it's an index error
        if (error.message && error.message.includes("index")) {
          alert(
            "This query requires a Firestore index. Please check the console for a link to create it."
          );
        }
      }
    };

    fetchDashboardData();
  }, [currentUser, loading]); // Depend on currentUser and loading

  // Mock data for revenue trend (would be replaced with real data)
  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 5000 },
    { name: "Mar", revenue: 6000 },
    { name: "Apr", revenue: 8000 },
    { name: "May", revenue: 10000 },
    { name: "Jun", revenue: 12000 },
  ];

  // Professional color palette
  const COLORS = ["#4F46E5", "#EC4899", "#10B981", "#F59E0B", "#6366F1"];
  const CHART_COLORS = {
    primary: "#4F46E5",
    secondary: "#EC4899",
    tertiary: "#10B981",
    quaternary: "#F59E0B",
  };

  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate("/"); // Use navigate for SPA routing
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

      if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      } else {
        return "Just now";
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // If user is not authenticated or still loading, show loading or redirect to login
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center flex-col">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out shadow-sm`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div
            className={`flex items-center ${
              isSidebarCollapsed ? "justify-center w-full" : ""
            }`}
          >
            {/* Logo */}
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg ${
                isSidebarCollapsed ? "mr-0" : "mr-2"
              }`}
            >
              OS
            </div>
            {!isSidebarCollapsed && (
              <span className="font-bold text-xl">Open Shop</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`${isSidebarCollapsed ? "hidden" : ""}`}
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={activeTab === "overview" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            {!isSidebarCollapsed && "Overview"}
          </Button>
          <Button
            variant={activeTab === "customers" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("customers")}
          >
            <Users className="mr-3 h-5 w-5" />
            {!isSidebarCollapsed && "Customers"}
          </Button>
          <Button
            variant={activeTab === "subscriptions" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("subscriptions")}
          >
            <CreditCard className="mr-3 h-5 w-5" />
            {!isSidebarCollapsed && "Subscriptions"}
          </Button>
          <Button
            variant={activeTab === "analytics" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 className="mr-3 h-5 w-5" />
            {!isSidebarCollapsed && "Analytics"}
          </Button>
          <Button
            variant={activeTab === "settings" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-3 h-5 w-5" />
            {!isSidebarCollapsed && "Settings"}
          </Button>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            {!isSidebarCollapsed && "Log Out"}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                />
              </div>
              {/* User profile dropdown - could be a separate component */}
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {currentUser?.email
                    ? currentUser.email.charAt(0).toUpperCase()
                    : "U"}
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white hidden md:inline">
                  {currentUser?.email || "User"}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {activeTab === "overview" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Overview Cards */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? "Loading..." : dashboardStats.totalCustomers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Subscriptions
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading
                      ? "Loading..."
                      : dashboardStats.activeSubscriptions}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monthly Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${isLoading ? "Loading..." : dashboardStats.monthlyRevenue}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Conversion Rate
                  </CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? "Loading..." : dashboardStats.conversionRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>

              {/* Revenue Trend Chart */}
              <Card className="col-span-full lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>
                    Revenue over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill={CHART_COLORS.primary} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Plan Distribution Chart */}
              <Card className="col-span-full lg:col-span-2">
                <CardHeader>
                  <CardTitle>Plan Distribution</CardTitle>
                  <CardDescription>
                    Active subscriptions by plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={planDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {planDistribution.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest customer sign-ups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isLoading ? (
                      <p>Loading recent activity...</p>
                    ) : recentActivity.length > 0 ? (
                      recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                        >
                          <div className="flex-shrink-0 mr-3 text-primary">
                            {activity.type === "new-customer" && (
                              <UserRound className="h-5 w-5" />
                            )}
                            {activity.type === "new-order" && (
                              <Receipt className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {activity.type === "new-customer"
                                ? `${activity.name} signed up for the ${activity.plan} plan`
                                : `New order from ${activity.name}`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(activity.date)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">
                        No recent activity.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "customers" && <CustomersTab />}
          {activeTab === "subscriptions" && <SubscriptionsTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}
