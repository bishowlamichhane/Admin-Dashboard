"use client";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";

import {
  Search,
  Bell,
  MessageSquare,
  Package,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample products and orders data (would normally come from Redux)
const sampleProducts = [
  {
    id: 1,
    name: "OpenShop Premium T-Shirt",
    price: "29.99",
    image: "/images/tshirt.png",
    category: "Clothing",
    stock: 150,
    featured: true,
    status: "Active",
    sales: 42,
  },
  {
    id: 2,
    name: "OpenShop Wireless Earbuds",
    price: "89.99",
    image: "/images/earbuds.jpg",
    category: "Electronics",
    stock: 75,
    featured: true,
    status: "Active",
    sales: 28,
  },
  {
    id: 3,
    name: "OpenShop Coffee Mug",
    price: "14.99",
    image: "/images/mug.jpg",
    category: "Home",
    stock: 200,
    featured: false,
    status: "Active",
    sales: 35,
  },
  {
    id: 4,
    name: "OpenShop Laptop Sleeve",
    price: "24.99",
    image: "/images/laptop_sleeve.jpg",
    category: "Accessories",
    stock: 120,
    featured: false,
    status: "Active",
    sales: 19,
  },
  {
    id: 5,
    name: "OpenShop Smart Watch",
    price: "149.99",
    image: "/images/watch.jpg",
    category: "Electronics",
    stock: 50,
    featured: true,
    status: "Active",
    sales: 23,
  },
];

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
];

// Chart components
const SalesChart = () => {
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Sales Overview</h3>
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          +12.5%
        </Badge>
      </div>
      <div className="flex-1 flex items-end space-x-2">
        <div className="bg-blue-600 w-10 h-20 rounded-t-md"></div>
        <div className="bg-blue-500 w-10 h-28 rounded-t-md"></div>
        <div className="bg-blue-600 w-10 h-16 rounded-t-md"></div>
        <div className="bg-blue-500 w-10 h-32 rounded-t-md"></div>
        <div className="bg-blue-600 w-10 h-24 rounded-t-md"></div>
        <div className="bg-blue-500 w-10 h-40 rounded-t-md"></div>
        <div className="bg-blue-600 w-10 h-36 rounded-t-md"></div>
      </div>
      <div className="grid grid-cols-7 text-xs text-muted-foreground mt-2">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
    </div>
  );
};

const ExpensesChart = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Expenses</h3>
        <Badge
          variant="outline"
          className="bg-orange-50 text-orange-700 border-orange-200"
        >
          -3.2%
        </Badge>
      </div>
      <div className="flex-1 flex items-end space-x-2">
        <div className="bg-orange-500 w-10 h-24 rounded-t-md"></div>
        <div className="bg-orange-400 w-10 h-16 rounded-t-md"></div>
        <div className="bg-orange-500 w-10 h-20 rounded-t-md"></div>
        <div className="bg-orange-400 w-10 h-28 rounded-t-md"></div>
        <div className="bg-orange-500 w-10 h-18 rounded-t-md"></div>
        <div className="bg-orange-400 w-10 h-22 rounded-t-md"></div>
        <div className="bg-orange-500 w-10 h-26 rounded-t-md"></div>
      </div>
      <div className="grid grid-cols-7 text-xs text-muted-foreground mt-2">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
    </div>
  );
};

const NetProfitChart = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Net Profit</h3>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            +8.7%
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Time Period</DropdownMenuLabel>
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>This Quarter</DropdownMenuItem>
              <DropdownMenuItem>This Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 relative">
        {/* Line representing the profit trend */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-muted"></div>
        <svg className="w-full h-full" viewBox="0 0 100 40">
          <path
            d="M0,35 Q10,20 20,25 T40,15 T60,20 T80,10 T100,5"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          <path
            d="M0,35 Q10,20 20,25 T40,15 T60,20 T80,10 T100,5 V40 H0 Z"
            fill="hsl(var(--primary)/0.1)"
          />
        </svg>
        <div className="absolute bottom-2 left-0 w-full flex justify-between text-xs text-muted-foreground">
          <div>Jan</div>
          <div>Feb</div>
          <div>Mar</div>
          <div>Apr</div>
          <div>May</div>
          <div>Jun</div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const reduxProducts = useSelector((state) => state.items || []);
  const products = reduxProducts.length > 0 ? reduxProducts : sampleProducts;
  const { currentUser } = useAuth();
  const [totalProducts, setTotalProducts] = useState(0);
  const [companyData, setCompanyData] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeCustomers, setActiveCustomers] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [processingOrders, setProcessingOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch orders to calculate total revenue and total orders
        const ordersRef = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersRef);
        
        // Calculate total revenue from orderSummary.finalAmount
        const totalRevenueFromOrders = ordersSnapshot.docs.reduce((sum, doc) => {
          const orderData = doc.data();
          return sum + (orderData.orderSummary?.finalAmount || 0);
        }, 0);
        
        // Set total orders
        setTotalOrders(ordersSnapshot.size);
        // Set total revenue
        setTotalRevenue(totalRevenueFromOrders);

        // Calculate order status counts
        const orderStatusCounts = ordersSnapshot.docs.reduce((counts, doc) => {
          const orderData = doc.data();
          const status = orderData.status?.toLowerCase() || 'pending';
          
          switch (status) {
            case 'delivered':
              counts.delivered++;
              break;
            case 'processing':
              counts.processing++;
              break;
            case 'pending':
              counts.pending++;
              break;
            case 'cancelled':
              counts.cancelled++;
              break;
            default:
              counts.pending++;
          }
          return counts;
        }, { delivered: 0, processing: 0, pending: 0, cancelled: 0 });

        setDeliveredOrders(orderStatusCounts.delivered);
        setProcessingOrders(orderStatusCounts.processing);
        setPendingOrders(orderStatusCounts.pending);
        setCancelledOrders(orderStatusCounts.cancelled);

        // Fetch users with role = "customer" to get active customers count
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        
        const customerCount = usersSnapshot.docs.filter(doc => {
          const userData = doc.data();
          return userData.role === "customer";
        }).length;
        
        setActiveCustomers(customerCount);

        // Fetch company data if user is authenticated
        if (currentUser?.uid) {
          const companyRef = collection(db, "users", currentUser.uid, "company");
          const companySnapshot = await getDocs(companyRef);

          if (!companySnapshot.empty) {
            const companyDoc = companySnapshot.docs[0];
            setCompanyData(companyDoc.data());

            // Fetch products count
            const productsRef = collection(
              db,
              "users",
              currentUser.uid,
              "company",
              companyDoc.id,
              "products"
            );
            const productsSnapshot = await getDocs(productsRef);
            setTotalProducts(productsSnapshot.size);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setTotalProducts(0);
        setTotalOrders(0);
        setTotalRevenue(0);
        setActiveCustomers(0);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  // Calculate statistics
  const totalStock = products.reduce((sum, item) => sum + item.stock, 0);

  // Top selling products
  const topProducts = [...products]
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, 5);

  // Recent orders
  const recentOrders = [...sampleOrders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="p-4 md:p-6 max-w-[1200px] max-h-screen mx-auto">
      {/* Header with search and notifications */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your store performance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-full sm:w-[250px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>

            <Avatar className="h-9 w-9">
              <AvatarImage
                src="/placeholder.svg?height=36&width=36"
                alt="User"
              />
              <AvatarFallback>OS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {totalRevenue.toFixed(2)}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+4.3%</span>
              <span className="ml-1">new products</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowDownRight className="h-3.5 w-3.5 mr-1 text-red-500" />
              <span className="text-red-500 font-medium">-2.1%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order status overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Distribution of current orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Delivered</span>
                  </div>
                  <span className="text-sm font-medium">
                    {deliveredOrders} orders
                  </span>
                </div>
                <Progress
                  value={totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0}
                  className="h-2 bg-muted"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Processing</span>
                  </div>
                  <span className="text-sm font-medium">
                    {processingOrders} orders
                  </span>
                </div>
                <Progress
                  value={totalOrders > 0 ? (processingOrders / totalOrders) * 100 : 0}
                  className="h-2 bg-muted"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="text-sm font-medium">
                    {pendingOrders} orders
                  </span>
                </div>
                <Progress
                  value={totalOrders > 0 ? (pendingOrders / totalOrders) * 100 : 0}
                  className="h-2 bg-muted"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Cancelled</span>
                  </div>
                  <span className="text-sm font-medium">
                    {cancelledOrders} orders
                  </span>
                </div>
                <Progress
                  value={totalOrders > 0 ? (cancelledOrders / totalOrders) * 100 : 0}
                  className="h-2 bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Target</CardTitle>
            <CardDescription>Dynamic sales goal based on current performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">
                    {totalRevenue > 0 ? Math.min((totalRevenue / (totalRevenue * 10)) * 100, 100) : 0}%
                  </span>
                </div>
                <Progress 
                  value={totalRevenue > 0 ? Math.min((totalRevenue / (totalRevenue * 10)) * 100, 100) : 0} 
                  className="h-2" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Current</div>
                  <div className="text-2xl font-bold">
                    Rs {totalRevenue.toFixed(2)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Target</div>
                  <div className="text-2xl font-bold">Rs {(totalRevenue * 10).toFixed(2)}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Remaining</div>
                  <div className="text-2xl font-bold">
                    Rs {(totalRevenue * 9).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Target: 10x current revenue
                  </span>
                </div>
                <Button variant="link" className="p-0 h-auto">
                  View details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Sales</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <SalesChart />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Expenses</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ExpensesChart />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Net Profit</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <NetProfitChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders and top products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer purchases</CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => {
                    const getStatusColor = (status) => {
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

                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)}`}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          ${order.totalAmount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" size="sm">
              View All Orders
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>
              Best performing products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-12 w-12 rounded-md object-cover border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${product.price}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales || 0} sold
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" size="sm">
              <Link to={"/dashboard/products"}>View All Products</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
