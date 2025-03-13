"use client";

import { useState, useMemo } from "react";
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

// Sample order data
const sampleOrders = [
  {
    id: "ORD7823",
    customerName: "John Doe",
    status: "Delivered",
    date: "2023-05-15",
    totalAmount: 125.99,
  },
  {
    id: "ORD7824",
    customerName: "Jane Smith",
    status: "Processing",
    date: "2023-05-16",
    totalAmount: 89.5,
  },
  {
    id: "ORD7825",
    customerName: "Robert Johnson",
    status: "Pending",
    date: "2023-05-17",
    totalAmount: 210.75,
  },
  {
    id: "ORD7826",
    customerName: "Emily Davis",
    status: "Delivered",
    date: "2023-05-14",
    totalAmount: 45.25,
  },
  {
    id: "ORD7827",
    customerName: "Michael Brown",
    status: "Cancelled",
    date: "2023-05-13",
    totalAmount: 150.0,
  },
  {
    id: "ORD7828",
    customerName: "Sarah Wilson",
    status: "Processing",
    date: "2023-05-18",
    totalAmount: 75.5,
  },
  {
    id: "ORD7829",
    customerName: "David Taylor",
    status: "Pending",
    date: "2023-05-19",
    totalAmount: 320.99,
  },
  {
    id: "ORD7830",
    customerName: "Lisa Anderson",
    status: "Delivered",
    date: "2023-05-12",
    totalAmount: 95.75,
  },
  {
    id: "ORD7831",
    customerName: "Thomas Martinez",
    status: "Delivered",
    date: "2023-05-11",
    totalAmount: 145.5,
  },
  {
    id: "ORD7832",
    customerName: "Jessica Robinson",
    status: "Processing",
    date: "2023-05-10",
    totalAmount: 67.25,
  },
  {
    id: "ORD7833",
    customerName: "Daniel White",
    status: "Pending",
    date: "2023-05-09",
    totalAmount: 189.99,
  },
  {
    id: "ORD7834",
    customerName: "Jennifer Garcia",
    status: "Cancelled",
    date: "2023-05-08",
    totalAmount: 110.5,
  },
  {
    id: "ORD7835",
    customerName: "Christopher Lee",
    status: "Delivered",
    date: "2023-05-07",
    totalAmount: 78.25,
  },
  {
    id: "ORD7836",
    customerName: "Amanda Clark",
    status: "Processing",
    date: "2023-05-06",
    totalAmount: 245.75,
  },
  {
    id: "ORD7837",
    customerName: "Matthew Rodriguez",
    status: "Delivered",
    date: "2023-05-05",
    totalAmount: 56.99,
  },
  {
    id: "ORD7838",
    customerName: "Elizabeth Lewis",
    status: "Pending",
    date: "2023-05-04",
    totalAmount: 134.5,
  },
  {
    id: "ORD7839",
    customerName: "Andrew Walker",
    status: "Delivered",
    date: "2023-05-03",
    totalAmount: 89.25,
  },
  {
    id: "ORD7840",
    customerName: "Olivia Hall",
    status: "Cancelled",
    date: "2023-05-02",
    totalAmount: 167.75,
  },
  {
    id: "ORD7841",
    customerName: "James Allen",
    status: "Processing",
    date: "2023-05-01",
    totalAmount: 123.5,
  },
  {
    id: "ORD7842",
    customerName: "Sophia Young",
    status: "Delivered",
    date: "2023-04-30",
    totalAmount: 198.99,
  },
];

const OrderItems = ({ item }) => {
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
    <TableRow>
      <TableCell>
        <Button variant="ghost" size="sm">
          <ChevronDown className="h-4 w-4" />
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
        ${item.totalAmount.toFixed(2)}
      </TableCell>
    </TableRow>
  );
};

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

const OrdersTable = ({ orders, status }) => {
  const statusMessage = status
    ? `No ${status.toLowerCase()} orders found.`
    : "No orders found matching your filters.";

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
            orders.map((order) => <OrderItems key={order.id} item={order} />)
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
};

const Orders = () => {
  // Use hardcoded sample orders instead of relying on Redux store
  const orders = sampleOrders;

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

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
                  ${orderStats.totalRevenue.toFixed(2)}
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
                  $
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

              <OrdersTable orders={filteredOrders} status={statusFilter} />
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
