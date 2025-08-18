"use client";

import { useState, useMemo, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import {
  Search,
  UserPlus,
  Filter,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  CreditCard,
  MoreHorizontal,
  ArrowUpRight,
  Star,
  StarOff,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  StarHalf,
  Edit,
  Trash2,
  Eye,
  Download,
  Users,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Customer Statistics Card Component
const CustomerStatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  color,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend ? (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <ArrowUpRight className="h-3.5 w-3.5 mr-1 text-green-500" />
            <span className="text-green-500 font-medium">{trend}</span>
            <span className="ml-1">{description}</span>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

// Customer Rating Component
const CustomerRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star
          key={i + fullStars + (hasHalfStar ? 1 : 0)}
          className="h-4 w-4 text-gray-300"
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

// Order Status Badge Component
const OrderStatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800 border-gray-300";

    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    if (!status) return null;

    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      case "processing":
        return <Truck className="h-3.5 w-3.5 mr-1" />;
      case "pending":
        return <Clock className="h-3.5 w-3.5 mr-1" />;
      case "cancelled":
        return <AlertCircle className="h-3.5 w-3.5 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
        status
      )}`}
    >
      {getStatusIcon(status)}
      {status}
    </div>
  );
};

// Customer Detail Dialog Component
const CustomerDetailDialog = ({ customer, isOpen, setIsOpen }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Get customer orders
  const customerOrders = customer.orders || [];

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate customer metrics
  const totalItems = customerOrders.reduce((sum, order) => {
    return (
      sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0)
    );
  }, 0);

  const averageOrderValue =
    customer.totalOrders > 0
      ? (customer.totalSpent / customer.totalOrders).toFixed(2)
      : "0.00";

  // Get most purchased product
  const productPurchaseCount = {};
  customerOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productPurchaseCount[item.name]) {
        productPurchaseCount[item.name] = 0;
      }
      productPurchaseCount[item.name] += item.quantity;
    });
  });

  let mostPurchasedProduct = { name: "None", count: 0 };
  Object.entries(productPurchaseCount).forEach(([name, count]) => {
    if (count > mostPurchasedProduct.count) {
      mostPurchasedProduct = { name, count };
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Customer Details</DialogTitle>
          <DialogDescription>
            View and manage customer information and order history
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          {/* Customer Profile Section */}
          <div className="md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback className="text-lg">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Customer #{customer.id}
                  </p>
                  <Badge
                    variant="outline"
                    className={
                      customer.status === "Active"
                        ? "bg-green-100 text-green-800 border-green-300 mt-2"
                        : "bg-gray-100 text-gray-800 border-gray-300 mt-2"
                    }
                  >
                    {customer.status}
                  </Badge>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{customer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{customer.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      Joined {formatDate(customer.joinDate)}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Loyalty Points</span>
                    <span className="text-sm font-bold">
                      {customer.loyaltyPoints}
                    </span>
                  </div>
                  <Progress
                    value={(customer.loyaltyPoints / 1000) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {1000 - customer.loyaltyPoints} points until next reward
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Customer Rating</h4>
                  <CustomerRating rating={customer.customerRating} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Customer Details Tabs */}
          <div className="md:w-2/3">
            <Tabs
              defaultValue="overview"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="purchases">Purchases</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        Rs {customer.totalSpent.toFixed(2)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Lifetime value
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {customer.totalOrders}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Total orders placed
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Average Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        Rs {averageOrderValue}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Average order value
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Items Purchased</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalItems}</div>
                      <p className="text-xs text-muted-foreground">
                        Total items bought
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {customerOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-start">
                          <div className="mr-4 mt-0.5">
                            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Placed order{" "}
                              <span className="font-bold">{order.id}</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.orderDate)} • Rs
                              {order.orderSummary?.finalAmount || 0}
                            </p>
                            <OrderStatusBadge status={order.status} />
                          </div>
                        </div>
                      ))}

                      {customerOrders.length === 0 && (
                        <div className="text-center py-4 text-muted-foreground">
                          No recent activity found
                        </div>
                      )}
                    </div>
                  </CardContent>
                  {customerOrders.length > 0 && (
                    <CardFooter className="border-t px-6 py-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveTab("orders")}
                      >
                        View All Activity
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      Complete history of customer orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {customerOrders.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customerOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">
                                {order.id}
                              </TableCell>
                              <TableCell>{formatDate(order.orderDate)}</TableCell>
                              <TableCell>
                                <OrderStatusBadge status={order.status} />
                              </TableCell>
                              <TableCell>
                                {order.items.reduce(
                                  (sum, item) => sum + item.quantity,
                                  0
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                Rs {order.orderSummary?.finalAmount || 0}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="h-4 w-4 mr-2" />
                                      Download Invoice
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No orders found for this customer
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Purchases Tab */}
              <TabsContent value="purchases" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchase History</CardTitle>
                    <CardDescription>
                      Products purchased by this customer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {customerOrders.length > 0 ? (
                      <>
                        <div className="mb-6">
                          <h3 className="text-sm font-medium mb-2">
                            Most Purchased Product
                          </h3>
                          {mostPurchasedProduct.count > 0 ? (
                            <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center mr-3">
                                  <ShoppingBag className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {mostPurchasedProduct.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Purchased {mostPurchasedProduct.count} times
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-primary/10 text-primary border-primary/20"
                              >
                                Most Popular
                              </Badge>
                            </div>
                          ) : (
                            <p className="text-muted-foreground">
                              No purchases yet
                            </p>
                          )}
                        </div>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead className="text-right">
                                Total
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {customerOrders.flatMap((order) =>
                              order.items.map((item, index) => (
                                <TableRow
                                  key={`${order.id}-${item.id}-${index}`}
                                >
                                  <TableCell className="font-medium">
                                    {item.name}
                                  </TableCell>
                                  <TableCell>
                                    Rs {item.price.toFixed(2)}
                                  </TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell className="text-right">
                                    Rs {(item.price * item.quantity).toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No purchases found for this customer
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Fetch customers from Firestore
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        console.log("Customers: Fetching from users collection where role = customer");

        // Fetch from the users collection where role = "customer"
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        console.log("Customers: Found", usersSnapshot.size, "users.");

        // Fetch all orders to calculate customer statistics
        const ordersRef = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersRef);
        console.log("Customers: Found", ordersSnapshot.size, "orders.");

        // Create a map of customer orders
        const customerOrdersMap = {};
        ordersSnapshot.docs.forEach((orderDoc) => {
          const orderData = orderDoc.data();
          const userId = orderData.userId; // Changed from customerId to userId
          if (userId) {
            if (!customerOrdersMap[userId]) {
              customerOrdersMap[userId] = [];
            }
            customerOrdersMap[userId].push({
              id: orderDoc.id,
              ...orderData
            });
          }
        });

        // Filter users with role = "customer" and transform data
        const customersData = usersSnapshot.docs
          .map((doc) => {
            const data = doc.data();
            // Only include users with role = "customer"
            if (data.role === "customer") {
              const customerId = doc.id;
              const customerOrders = customerOrdersMap[customerId] || [];
              
              // Calculate real order statistics
              const totalOrders = customerOrders.length;
              const totalSpent = customerOrders.reduce((sum, order) => {
                return sum + (order.orderSummary?.finalAmount || 0);
              }, 0);
              
              // Get last order date
              let lastOrderDate = "N/A";
              if (customerOrders.length > 0) {
                const sortedOrders = customerOrders.sort((a, b) => {
                  return new Date(b.orderDate) - new Date(a.orderDate);
                });
                lastOrderDate = sortedOrders[0].orderDate || "N/A";
              }

              return {
                id: customerId,
                name: data.name || data.fname + " " + data.lname || "N/A",
                email: data.email || "N/A",
                phone: data.phone || "N/A",
                address: data.address || "N/A",
                totalSpent: totalSpent,
                totalOrders: totalOrders,
                lastOrderDate: lastOrderDate,
                status: data.status || "Active",
                loyaltyPoints: data.loyaltyPoints || 0,
                avatar: data.avatar || "/placeholder.svg",
                joinDate: data.createdAt || new Date().toISOString().split('T')[0],
                customerRating: data.customerRating || 4.0,
                orders: customerOrders, // Store actual orders for customer details
              };
            }
            return null;
          })
          .filter(customer => customer !== null); // Remove null entries

        console.log("Customers: Transformed data:", customersData);
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search query and status filter
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      // Search filter
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        customer.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  // Sort customers
  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "spent":
          return b.totalSpent - a.totalSpent;
        case "orders":
          return b.totalOrders - a.totalOrders;
        case "recent":
          return new Date(b.lastOrderDate) - new Date(a.lastOrderDate);
        default:
          return 0;
      }
    });
  }, [filteredCustomers, sortBy]);

  // Calculate customer statistics
  const customerStats = useMemo(() => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(
      (c) => c.status === "Active"
    ).length;
    const totalRevenue = customers.reduce(
      (sum, c) => sum + c.totalSpent,
      0
    );
    const totalOrders = customers.reduce(
      (sum, c) => sum + c.totalOrders,
      0
    );
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalCustomers,
      activeCustomers,
      totalRevenue,
      totalOrders,
      avgOrderValue,
    };
  }, [customers]);

  // Handle customer click
  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col space-y-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p>Loading customers...</p>
          </div>
        ) : (
          <>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
                <p className="text-muted-foreground">
                  Manage and analyze your customer base
                </p>
              </div>

              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>

            {/* Customer Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <CustomerStatCard
                title="Total Customers"
                value={customerStats.totalCustomers}
                icon={<Users className="h-4 w-4 text-blue-600" />}
                description="in your database"
                color="bg-blue-100"
              />

              <CustomerStatCard
                title="Active Customers"
                value={customerStats.activeCustomers}
                icon={<Users className="h-4 w-4 text-green-600" />}
                description="currently active"
                trend="+5.2%"
                color="bg-green-100"
              />

              <CustomerStatCard
                title="Total Revenue"
                value={`Rs ${customerStats.totalRevenue.toFixed(2)}`}
                icon={<CreditCard className="h-4 w-4 text-purple-600" />}
                description="from all customers"
                trend="+12.5%"
                color="bg-purple-100"
              />

              <CustomerStatCard
                title="Total Orders"
                value={customerStats.totalOrders}
                icon={<ShoppingBag className="h-4 w-4 text-orange-600" />}
                description="across all customers"
                trend="+8.1%"
                color="bg-orange-100"
              />

              <CustomerStatCard
                title="Avg. Order Value"
                value={`Rs ${customerStats.avgOrderValue.toFixed(2)}`}
                icon={<CreditCard className="h-4 w-4 text-indigo-600" />}
                description="per order"
                trend="+3.2%"
                color="bg-indigo-100"
              />
            </div>

            {/* Customers Table with Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>
                  View and manage your customer database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="relative w-full sm:w-[350px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search customers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0" align="end">
                        <div className="p-4 border-b">
                          <p className="font-medium">Sort by</p>
                        </div>
                        <div className="p-4 space-y-2">
                          <div
                            className="flex items-center"
                            onClick={() => setSortBy("name")}
                          >
                            <div
                              className={`w-4 h-4 rounded-full border mr-2 ${
                                sortBy === "name"
                                  ? "bg-primary border-primary"
                                  : "border-gray-300"
                              }`}
                            ></div>
                            <span>Name</span>
                          </div>
                          <div
                            className="flex items-center"
                            onClick={() => setSortBy("spent")}
                          >
                            <div
                              className={`w-4 h-4 rounded-full border mr-2 ${
                                sortBy === "spent"
                                  ? "bg-primary border-primary"
                                  : "border-gray-300"
                              }`}
                            ></div>
                            <span>Total Spent</span>
                          </div>
                          <div
                            className="flex items-center"
                            onClick={() => setSortBy("orders")}
                          >
                            <div
                              className={`w-4 h-4 rounded-full border mr-2 ${
                                sortBy === "orders"
                                  ? "bg-primary border-primary"
                                  : "border-gray-300"
                              }`}
                            ></div>
                            <span>Order Count</span>
                          </div>
                          <div
                            className="flex items-center"
                            onClick={() => setSortBy("recent")}
                          >
                            <div
                              className={`w-4 h-4 rounded-full border mr-2 ${
                                sortBy === "recent"
                                  ? "bg-primary border-primary"
                                  : "border-gray-300"
                              }`}
                            ></div>
                            <span>Most Recent</span>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedCustomers.length > 0 ? (
                        sortedCustomers.map((customer) => (
                          <TableRow
                            key={customer.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleCustomerClick(customer)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={customer.avatar}
                                    alt={customer.name}
                                  />
                                  <AvatarFallback>
                                    {customer.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{customer.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {customer.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  customer.status === "Active"
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : "bg-gray-100 text-gray-800 border-gray-300"
                                }
                              >
                                {customer.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{customer.totalOrders}</TableCell>
                            <TableCell>Rs {customer.totalSpent.toFixed(2)}</TableCell>
                            <TableCell>
                              {formatDate(customer.lastOrderDate)}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  asChild
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCustomerClick(customer);
                                    }}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Customer
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Customer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-6 text-muted-foreground"
                          >
                            No customers found matching your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-end space-x-2 py-4">
                  <div className="flex-1 text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium">{sortedCustomers.length}</span> of{" "}
                    <span className="font-medium">{customers.length}</span>{" "}
                    customers
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Customer Detail Dialog */}
      {selectedCustomer && (
        <CustomerDetailDialog
          customer={selectedCustomer}
          isOpen={isDetailOpen}
          setIsOpen={setIsDetailOpen}
        />
      )}
    </div>
  );
};

export default Customers;
