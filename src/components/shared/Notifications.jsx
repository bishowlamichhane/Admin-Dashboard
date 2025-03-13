"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  ShoppingCart,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Package,
  TrendingUp,
  Server,
  Settings,
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  X,
  Check,
  Eye,
  Trash2,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Sample notification data
const sampleNotifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #ORD7823 has been placed for $125.99",
    time: "10 minutes ago",
    isRead: false,
    isStarred: true,
    priority: "high",
    icon: ShoppingCart,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
    link: "/orders/ORD7823",
    user: {
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: 2,
    type: "customer",
    title: "New Customer Registration",
    message: "James Rodriguez has created a new account",
    time: "25 minutes ago",
    isRead: false,
    isStarred: false,
    priority: "medium",
    icon: Users,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
    link: "/customers/2",
    user: {
      name: "James Rodriguez",
      email: "james.rodriguez@example.com",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: 3,
    type: "alert",
    title: "Low Stock Alert",
    message: "OpenShop Coffee Mug is running low on stock (5 remaining)",
    time: "1 hour ago",
    isRead: false,
    isStarred: true,
    priority: "high",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-100",
    link: "/products/3",
  },
  {
    id: 4,
    type: "order",
    title: "Order Delivered",
    message: "Order #ORD7820 has been delivered successfully",
    time: "2 hours ago",
    isRead: true,
    isStarred: false,
    priority: "medium",
    icon: CheckCircle,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
    link: "/orders/ORD7820",
  },
  {
    id: 5,
    type: "system",
    title: "System Update Scheduled",
    message: "System maintenance scheduled for tonight at 2:00 AM",
    time: "3 hours ago",
    isRead: true,
    isStarred: false,
    priority: "medium",
    icon: Server,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100",
    link: "/settings/system",
  },
  {
    id: 6,
    type: "order",
    title: "Order Canceled",
    message: "Order #ORD7819 has been canceled by the customer",
    time: "5 hours ago",
    isRead: true,
    isStarred: false,
    priority: "medium",
    icon: ShoppingCart,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
    link: "/orders/ORD7819",
  },
  {
    id: 7,
    type: "alert",
    title: "Payment Failed",
    message:
      "Payment for order #ORD7822 has failed. Customer has been notified.",
    time: "6 hours ago",
    isRead: true,
    isStarred: true,
    priority: "high",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
    link: "/orders/ORD7822",
  },
  {
    id: 8,
    type: "system",
    title: "Backup Completed",
    message: "Daily system backup completed successfully",
    time: "12 hours ago",
    isRead: true,
    isStarred: false,
    priority: "low",
    icon: Server,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
    link: "/settings/backups",
  },
  {
    id: 9,
    type: "analytics",
    title: "Sales Milestone Reached",
    message: "Congratulations! Your store has reached 1,000 orders",
    time: "1 day ago",
    isRead: true,
    isStarred: true,
    priority: "medium",
    icon: TrendingUp,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
    link: "/analytics",
  },
  {
    id: 10,
    type: "product",
    title: "New Product Added",
    message: "OpenShop Wireless Earbuds has been added to your inventory",
    time: "1 day ago",
    isRead: true,
    isStarred: false,
    priority: "medium",
    icon: Package,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
    link: "/products/2",
  },
  {
    id: 11,
    type: "review",
    title: "New Product Review",
    message: "OpenShop Premium T-Shirt received a 5-star review",
    time: "2 days ago",
    isRead: true,
    isStarred: false,
    priority: "low",
    icon: Star,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-100",
    link: "/products/1/reviews",
  },
  {
    id: 12,
    type: "system",
    title: "API Rate Limit Warning",
    message:
      "You are approaching your API rate limit. Consider upgrading your plan.",
    time: "2 days ago",
    isRead: true,
    isStarred: false,
    priority: "medium",
    icon: AlertTriangle,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100",
    link: "/settings/api",
  },
];

// Notification settings
const notificationSettings = [
  {
    category: "Orders",
    settings: [
      {
        id: "new-order",
        name: "New orders",
        enabled: true,
        channels: ["email", "dashboard"],
      },
      {
        id: "order-status",
        name: "Order status changes",
        enabled: true,
        channels: ["email", "dashboard"],
      },
      {
        id: "order-canceled",
        name: "Order cancellations",
        enabled: true,
        channels: ["email", "dashboard", "sms"],
      },
    ],
  },
  {
    category: "Customers",
    settings: [
      {
        id: "new-customer",
        name: "New customer registrations",
        enabled: true,
        channels: ["dashboard"],
      },
      {
        id: "customer-activity",
        name: "Customer activity",
        enabled: false,
        channels: ["dashboard"],
      },
    ],
  },
  {
    category: "Products",
    settings: [
      {
        id: "low-stock",
        name: "Low stock alerts",
        enabled: true,
        channels: ["email", "dashboard", "sms"],
      },
      {
        id: "new-reviews",
        name: "New product reviews",
        enabled: true,
        channels: ["dashboard"],
      },
    ],
  },
  {
    category: "System",
    settings: [
      {
        id: "system-updates",
        name: "System updates",
        enabled: true,
        channels: ["email", "dashboard"],
      },
      {
        id: "security-alerts",
        name: "Security alerts",
        enabled: true,
        channels: ["email", "dashboard", "sms"],
      },
      {
        id: "api-usage",
        name: "API usage alerts",
        enabled: true,
        channels: ["email", "dashboard"],
      },
    ],
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  // Filter notifications based on active tab, search query, and filters
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by tab
    if (activeTab === "unread" && notification.isRead) return false;
    if (activeTab === "starred" && !notification.isStarred) return false;

    // Filter by search query
    if (
      searchQuery &&
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Filter by type
    if (typeFilter !== "all" && notification.type !== typeFilter) return false;

    // Filter by priority
    if (priorityFilter !== "all" && notification.priority !== priorityFilter)
      return false;

    return true;
  });

  // Sort notifications
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortBy === "newest") {
      // Simple sort by id (higher id = newer in our sample data)
      return b.id - a.id;
    } else if (sortBy === "oldest") {
      return a.id - b.id;
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  // Handle select all
  useEffect(() => {
    if (selectAll) {
      setSelectedNotifications(sortedNotifications.map((n) => n.id));
    } else if (selectedNotifications.length === sortedNotifications.length) {
      setSelectedNotifications([]);
    }
  }, [selectAll]);

  // Check if all visible notifications are selected
  useEffect(() => {
    if (
      sortedNotifications.length > 0 &&
      selectedNotifications.length === sortedNotifications.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedNotifications, sortedNotifications]);

  // Toggle notification selection
  const toggleNotificationSelection = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(
        selectedNotifications.filter((nId) => nId !== id)
      );
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  // Mark notifications as read
  const markAsRead = (ids) => {
    setNotifications(
      notifications.map((notification) => {
        if (ids.includes(notification.id)) {
          return { ...notification, isRead: true };
        }
        return notification;
      })
    );
    setSelectedNotifications([]);
  };

  // Mark notifications as unread
  const markAsUnread = (ids) => {
    setNotifications(
      notifications.map((notification) => {
        if (ids.includes(notification.id)) {
          return { ...notification, isRead: false };
        }
        return notification;
      })
    );
    setSelectedNotifications([]);
  };

  // Toggle star status
  const toggleStar = (id) => {
    setNotifications(
      notifications.map((notification) => {
        if (notification.id === id) {
          return { ...notification, isStarred: !notification.isStarred };
        }
        return notification;
      })
    );
  };

  // Delete notifications
  const deleteNotifications = (ids) => {
    setNotifications(
      notifications.filter((notification) => !ids.includes(notification.id))
    );
    setSelectedNotifications(
      selectedNotifications.filter((id) => !ids.includes(id))
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setSelectedNotifications([]);
    setConfirmClearAll(false);
  };

  // Refresh notifications
  const refreshNotifications = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setNotifications(sampleNotifications);
      setIsRefreshing(false);
    }, 1000);
  };

  // Get unread count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Get notification icon
  const getNotificationIcon = (notification) => {
    const IconComponent = notification.icon;
    return (
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${notification.iconBg}`}
      >
        <IconComponent className={`h-5 w-5 ${notification.iconColor}`} />
      </div>
    );
  };

  // Format notification time
  const formatNotificationTime = (time) => {
    return time;
  };

  return (
    <div className="ml-56 p-6 max-w-[1200px]">
      <div className="flex flex-col space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              Manage your notifications and alerts
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshNotifications}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <AlertDialog
              open={confirmClearAll}
              onOpenChange={setConfirmClearAll}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all notifications?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all your notifications.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearAllNotifications}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Notification Filters */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Notification Center</CardTitle>
                <CardDescription>
                  You have {unreadCount} unread notifications
                </CardDescription>
              </div>
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread
                    {unreadCount > 0 && (
                      <Badge className="ml-2 bg-primary text-primary-foreground">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="starred">Starred</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="relative w-full sm:w-[350px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="order">Orders</SelectItem>
                    <SelectItem value="customer">Customers</SelectItem>
                    <SelectItem value="product">Products</SelectItem>
                    <SelectItem value="alert">Alerts</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="review">Reviews</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Batch Actions */}
            {selectedNotifications.length > 0 && (
              <div className="flex items-center justify-between bg-muted p-2 rounded-md mb-4">
                <div className="text-sm">
                  {selectedNotifications.length} notification
                  {selectedNotifications.length !== 1 ? "s" : ""} selected
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(selectedNotifications)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsUnread(selectedNotifications)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Mark as Unread
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteNotifications(selectedNotifications)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}

            {/* Notifications List */}
            <div className="rounded-md border">
              {sortedNotifications.length > 0 ? (
                <div>
                  <div className="flex items-center p-4 border-b">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={(checked) => {
                        setSelectAll(checked);
                      }}
                      className="mr-4"
                    />
                    <div className="flex-1 font-medium">Notification</div>
                    <div className="w-24 text-center font-medium hidden sm:block">
                      Priority
                    </div>
                    <div className="w-32 text-center font-medium hidden sm:block">
                      Time
                    </div>
                    <div className="w-24 text-center font-medium">Actions</div>
                  </div>

                  <ScrollArea className="h-[500px]">
                    {sortedNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start p-4 border-b hover:bg-muted/50 transition-colors ${
                          !notification.isRead ? "bg-muted/30" : ""
                        }`}
                      >
                        <Checkbox
                          checked={selectedNotifications.includes(
                            notification.id
                          )}
                          onCheckedChange={() =>
                            toggleNotificationSelection(notification.id)
                          }
                          className="mr-4 mt-3"
                        />
                        <div className="mr-4">
                          {getNotificationIcon(notification)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-sm">
                                {notification.title}
                                {!notification.isRead && (
                                  <Badge className="ml-2 bg-primary text-primary-foreground">
                                    New
                                  </Badge>
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              {notification.user && (
                                <div className="flex items-center mt-2">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage
                                      src={notification.user.avatar}
                                      alt={notification.user.name}
                                    />
                                    <AvatarFallback>
                                      {notification.user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">
                                    {notification.user.name}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end">
                              <Badge
                                variant="outline"
                                className={`hidden sm:inline-flex ${
                                  notification.priority === "high"
                                    ? "bg-red-100 text-red-800 border-red-300"
                                    : notification.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                    : "bg-green-100 text-green-800 border-green-300"
                                }`}
                              >
                                {notification.priority}
                              </Badge>
                              <span className="text-xs text-muted-foreground mt-1 hidden sm:block">
                                {formatNotificationTime(notification.time)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleStar(notification.id)}
                            className="h-8 w-8"
                          >
                            <Star
                              className={`h-4 w-4 ${
                                notification.isStarred
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => markAsRead([notification.id])}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Mark as Read
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => markAsUnread([notification.id])}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Mark as Unread
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  deleteNotifications([notification.id])
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">
                    No notifications found
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {notifications.length === 0
                      ? "You have cleared all your notifications."
                      : "No notifications match your current filters."}
                  </p>
                  {notifications.length === 0 && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={refreshNotifications}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Notifications
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        {showSettings && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure which notifications you want to receive and how
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {notificationSettings.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-lg font-medium mb-4">
                      {category.category}
                    </h3>
                    <div className="space-y-4">
                      {category.settings.map((setting) => (
                        <div
                          key={setting.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md"
                        >
                          <div className="mb-2 sm:mb-0">
                            <div className="font-medium">{setting.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Channels:{" "}
                              {setting.channels.map((channel, index) => (
                                <span key={channel}>
                                  {channel}
                                  {index < setting.channels.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Switch
                              checked={setting.enabled}
                              onCheckedChange={() => {}}
                              className="mr-4"
                            />
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-6" />
                  </div>
                ))}

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Delivery Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </div>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <Select defaultValue="immediate">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">
                              Immediately
                            </SelectItem>
                            <SelectItem value="hourly">
                              Hourly Digest
                            </SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="off">Turn Off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md">
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive urgent notifications via SMS
                        </div>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <Select defaultValue="high-only">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              All Notifications
                            </SelectItem>
                            <SelectItem value="high-only">
                              High Priority Only
                            </SelectItem>
                            <SelectItem value="off">Turn Off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md">
                      <div>
                        <div className="font-medium">Browser Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications in your browser
                        </div>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <Switch
                          checked={true}
                          onCheckedChange={() => {}}
                          className="mr-4"
                        />
                        <Button variant="outline" size="sm">
                          Test
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Notifications;
