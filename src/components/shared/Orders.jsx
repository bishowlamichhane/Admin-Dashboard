"use client";

import { useState, useMemo, useEffect, useCallback, memo, Fragment } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  Filter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
const OrderItems = memo(({ item, onToggle }) => {

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
  console.log(item)

  const getStatusIcon = (status) => {
    if (!status) return <Package className="h-4 w-4 mr-1" />;

    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "processing":
        return <Truck className="h-4 w-4 mr-1" />;
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return <Package className="h-4 w-4 mr-1" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (

    <TableRow className="w-full">
      <TableCell>
        <Button variant="ghost" size="md" onClick={onToggle}>
          <ChevronDown className="h-4 w-4"/>
        </Button>
      </TableCell>
      <TableCell className="font-medium">{item.id}</TableCell>
      <TableCell>{item.customerName}</TableCell>
      <TableCell>
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
            item.status
          )}`}
        >
          {getStatusIcon(item.status)}
          {item.status}
        </div>
      </TableCell>
      <TableCell>{formatDate(item.date)}</TableCell>
      <TableCell className="font-medium">
        Rs {item.totalAmount.toFixed(2)}
      </TableCell>
    </TableRow>

    
        
  );
});

const OrderStatusCard = ({ title, count, icon, description, color }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const OrdersTable = memo(({ orders, status, onChangeStatus }) => {
  const statusMessage = status
    ? `No ${status.toLowerCase()} orders found.`
    : "No orders found matching your filters.";
    const [expandedRowId, setExpandedRowId] = useState(null)
    const [updatingId, setUpdatingId] = useState(null)
    const handleToggle = useCallback((id) => {
      setExpandedRowId((prev) => (prev === id ? null : id));
    }, []);
    const handleChangeStatusClick = async (order) => {
      if (!onChangeStatus) return;
      try {
        setUpdatingId(order.id);
        await onChangeStatus(order.id, order.status);
      } finally {
        setUpdatingId(null);
      }
    };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Fragment key={order.id}>
                <OrderItems item={order} onToggle={() => handleToggle(order.id)} />
                {expandedRowId === order.id && (
                  <TableRow key={`${order.id}-details`}>
                    <TableCell colSpan={6}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm w-full">
                        <div>
                          <div className="font-medium mb-1">Items</div>
                          <div className="text-muted-foreground">
                            {typeof order.itemsCount === "number" ? order.itemsCount : (Array.isArray(order.items) ? order.items.length : 0)} item(s)
                          </div>
                        </div>
                        <div>
                          <div className="font-medium mb-1">Shipping Address</div>
                          <div className="text-muted-foreground">
                            {order.address ? (
                              typeof order.address === "string" ? (
                                order.address
                              ) : (
                                <>
                                  {order.address.name && <div>{order.address.name}</div>}
                                  {order.address.line1 && <div>{order.address.line1}</div>}
                                  {order.address.line2 && <div>{order.address.line2}</div>}
                                  {(order.address.city || order.address.state || order.address.postalCode) && (
                                    <div>
                                      {[order.address.city, order.address.state, order.address.postalCode].filter(Boolean).join(", ")}
                                    </div>
                                  )}
                                  {order.address.country && <div>{order.address.country}</div>}
                                  {order.address.phone && <div>Phone: {order.address.phone}</div>}
                                </>
                              )
                            ) : (
                              <span>No address available</span>
                            )}
                          </div>
                        </div>
                        <div className="flex md:justify-end items-start md:items-center">
                          {(order.status?.toLowerCase() === "pending" || order.status?.toLowerCase() === "processing") && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleChangeStatusClick(order)}
                              disabled={updatingId === order.id}
                            >
                              {updatingId === order.id
                                ? "Updating..."
                                : order.status?.toLowerCase() === "pending"
                                ? "Mark as Processing"
                                : "Mark as Delivered"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-muted-foreground"
              >
                {statusMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </div>
  );
});

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [savingStatusId, setSavingStatusId] = useState(null);

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        console.log("Orders: Fetching from root orders collection");

        // Fetch from the root orders collection
        const ordersRef = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersRef);
        console.log("Orders: Found", ordersSnapshot.size, "orders.");

        // Transform Firestore data to match our order structure
        const ordersData = ordersSnapshot.docs.map((doc, index) => {
          const data = doc.data();
          return {
            id: doc.id, // Use the actual Firestore document ID
            customerName: data.customerName || "N/A",
            status: data.status || "Pending",
            date: data.orderDate || new Date().toISOString().split('T')[0],
            totalAmount: data.orderSummary?.finalAmount || 0,
            // Try common item fields; fallback to empty
            items: data.items || data.orderItems || data.cartItems || data.products || [],
            // Capture any explicit count if present
            itemsCount:
              data.totalItems ||
              data.itemCount ||
              data.itemsCount ||
              (Array.isArray(data.items) ? data.items.length : undefined),
            // Try common address fields; fallback to null
            address:
              data.shippingAddress ||
              data.address ||
              data.deliveryAddress ||
              data.customerAddress ||
              null,
          };
        });
        console.log("Orders: Transformed data:", ordersData);

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleChangeStatus = useCallback(async (orderId, currentStatus) => {
    try {
      setSavingStatusId(orderId);
      const nextStatus = (currentStatus || "").toLowerCase() === "pending" ? "processing" : "delivered";
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: nextStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
      );
    } catch (e) {
      console.error("Failed to update order status", e);
    } finally {
      setSavingStatusId(null);
    }
  }, []);

  // Calculate order statistics
  const orderStats = useMemo(() => {
    const delivered = orders.filter(
      (order) => order?.status?.toLowerCase() === "delivered"
    ).length;
    const processing = orders.filter(
      (order) => order?.status?.toLowerCase() === "processing"
    ).length;
    const pending = orders.filter(
      (order) => order?.status?.toLowerCase() === "pending"
    ).length;
    const cancelled = orders.filter(
      (order) => order?.status?.toLowerCase() === "cancelled"
    ).length;

    const totalRevenue = orders
      .filter((order) => order?.status?.toLowerCase() === "delivered")
      .reduce((sum, order) => sum + (order?.totalAmount || 0), 0);

    return {
      total: orders.length,
      delivered,
      processing,
      pending,
      cancelled,
      totalRevenue,
    };
  }, [orders]);

  // Filter orders based on search query and status filter
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (!order) return false;

      // Search filter
      const matchesSearch =
        (order.customerName || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (order.id || "").toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        (order.status || "").toLowerCase() === statusFilter.toLowerCase();

      // Time filter (simplified for demo)
      let matchesTime = true;
      if (timeFilter === "today") {
        const today = new Date().toISOString().split("T")[0];
        matchesTime = order.date === today;
      } else if (timeFilter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesTime = new Date(order.date) >= weekAgo;
      } else if (timeFilter === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        matchesTime = new Date(order.date) >= monthAgo;
      }

      return matchesSearch && matchesStatus && matchesTime;
    });
  }, [orders, searchQuery, statusFilter, timeFilter]);

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col space-y-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p>Loading orders...</p>
          </div>
        ) : (
          <>
            {/* Order Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orderStats.total}</div>
                  <p className="text-xs text-muted-foreground">
                    All orders in system
                  </p>
                </CardContent>
              </Card>

              <OrderStatusCard
                title="Delivered"
                count={orderStats.delivered}
                icon={<CheckCircle className="h-4 w-4 text-green-600" />}
                description="Successfully delivered orders"
                color="bg-green-100"
              />

              <OrderStatusCard
                title="Processing"
                count={orderStats.processing}
                icon={<Truck className="h-4 w-4 text-blue-600" />}
                description="Orders being processed"
                color="bg-blue-100"
              />

              <OrderStatusCard
                title="Pending"
                count={orderStats.pending}
                icon={<Clock className="h-4 w-4 text-yellow-600" />}
                description="Orders awaiting processing"
                color="bg-yellow-100"
              />

              <OrderStatusCard
                title="Cancelled"
                count={orderStats.cancelled}
                icon={<AlertCircle className="h-4 w-4 text-red-600" />}
                description="Orders that were cancelled"
                color="bg-red-100"
              />
            </div>

            {/* Revenue Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Summary of revenue from delivered orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold">
                      Rs {orderStats.totalRevenue.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Delivered Orders
                    </p>
                    <p className="text-3xl font-bold">{orderStats.delivered}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Average Order Value
                    </p>
                    <p className="text-3xl font-bold">
                      Rs
                      {orderStats.delivered > 0
                        ? (orderStats.totalRevenue / orderStats.delivered).toFixed(
                            2
                          )
                        : "0.00"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table with Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Manage and track all customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <TabsList className="flex-wrap">
                      <TabsTrigger
                        value="all"
                        onClick={() => setStatusFilter("all")}
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="delivered"
                        onClick={() => setStatusFilter("delivered")}
                      >
                        Delivered
                      </TabsTrigger>
                      <TabsTrigger
                        value="processing"
                        onClick={() => setStatusFilter("processing")}
                      >
                        Processing
                      </TabsTrigger>
                      <TabsTrigger
                        value="pending"
                        onClick={() => setStatusFilter("pending")}
                      >
                        Pending
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="relative w-full sm:w-[250px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Search orders..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-full"
                        />
                      </div>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0" align="end">
                          <div className="p-4 border-b">
                            <p className="font-medium">Filter by</p>
                          </div>
                          <div className="p-4">
                            <Select
                              onValueChange={setTimeFilter}
                              defaultValue={timeFilter}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Time</SelectItem>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="week">Last Week</SelectItem>
                                <SelectItem value="month">Last Month</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <OrdersTable orders={filteredOrders} status={statusFilter} onChangeStatus={handleChangeStatus} />
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
