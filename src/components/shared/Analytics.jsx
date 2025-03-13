"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Download,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000, revenue: 24000, expenses: 18000 },
  { name: "Feb", sales: 3000, revenue: 18000, expenses: 14000 },
  { name: "Mar", sales: 5000, revenue: 30000, expenses: 20000 },
  { name: "Apr", sales: 2780, revenue: 16680, expenses: 12000 },
  { name: "May", sales: 1890, revenue: 11340, expenses: 9000 },
  { name: "Jun", sales: 2390, revenue: 14340, expenses: 10000 },
  { name: "Jul", sales: 3490, revenue: 20940, expenses: 14000 },
  { name: "Aug", sales: 4000, revenue: 24000, expenses: 16000 },
  { name: "Sep", sales: 2780, revenue: 16680, expenses: 12000 },
  { name: "Oct", sales: 1890, revenue: 11340, expenses: 8000 },
  { name: "Nov", sales: 2390, revenue: 14340, expenses: 9000 },
  { name: "Dec", sales: 3490, revenue: 20940, expenses: 13000 },
];

const weeklyData = [
  { name: "Mon", sales: 500, revenue: 3000, expenses: 2000 },
  { name: "Tue", sales: 600, revenue: 3600, expenses: 2400 },
  { name: "Wed", sales: 800, revenue: 4800, expenses: 3200 },
  { name: "Thu", sales: 1000, revenue: 6000, expenses: 4000 },
  { name: "Fri", sales: 1200, revenue: 7200, expenses: 4800 },
  { name: "Sat", sales: 1500, revenue: 9000, expenses: 6000 },
  { name: "Sun", sales: 1000, revenue: 6000, expenses: 4000 },
];

const categoryData = [
  { name: "Electronics", value: 40, color: "#8884d8" },
  { name: "Clothing", value: 25, color: "#82ca9d" },
  { name: "Home", value: 15, color: "#ffc658" },
  { name: "Accessories", value: 10, color: "#ff8042" },
  { name: "Other", value: 10, color: "#0088fe" },
];

const customerData = [
  { name: "Jan", new: 400, returning: 240 },
  { name: "Feb", new: 300, returning: 198 },
  { name: "Mar", new: 500, returning: 300 },
  { name: "Apr", new: 278, returning: 189 },
  { name: "May", new: 189, returning: 239 },
  { name: "Jun", new: 239, returning: 349 },
  { name: "Jul", new: 349, returning: 400 },
  { name: "Aug", new: 400, returning: 300 },
  { name: "Sep", new: 278, returning: 189 },
  { name: "Oct", new: 189, returning: 239 },
  { name: "Nov", new: 239, returning: 349 },
  { name: "Dec", new: 349, returning: 400 },
];

const hourlyData = [
  { hour: "00:00", orders: 12, revenue: 720 },
  { hour: "02:00", orders: 8, revenue: 480 },
  { hour: "04:00", orders: 5, revenue: 300 },
  { hour: "06:00", orders: 10, revenue: 600 },
  { hour: "08:00", orders: 25, revenue: 1500 },
  { hour: "10:00", orders: 45, revenue: 2700 },
  { hour: "12:00", orders: 60, revenue: 3600 },
  { hour: "14:00", orders: 48, revenue: 2880 },
  { hour: "16:00", orders: 50, revenue: 3000 },
  { hour: "18:00", orders: 70, revenue: 4200 },
  { hour: "20:00", orders: 55, revenue: 3300 },
  { hour: "22:00", orders: 30, revenue: 1800 },
];

const orderStatusData = [
  { name: "Delivered", value: 65, color: "#4ade80" },
  { name: "Processing", value: 20, color: "#60a5fa" },
  { name: "Pending", value: 10, color: "#facc15" },
  { name: "Cancelled", value: 5, color: "#f87171" },
];

const topProducts = [
  {
    id: 1,
    name: "OpenShop Premium T-Shirt",
    price: 29.99,
    sales: 420,
    revenue: 12597.8,
    growth: 12.5,
  },
  {
    id: 2,
    name: "OpenShop Wireless Earbuds",
    price: 89.99,
    sales: 280,
    revenue: 25197.2,
    growth: 8.3,
  },
  {
    id: 3,
    name: "OpenShop Coffee Mug",
    price: 14.99,
    sales: 350,
    revenue: 5246.5,
    growth: -2.1,
  },
  {
    id: 4,
    name: "OpenShop Laptop Sleeve",
    price: 24.99,
    sales: 190,
    revenue: 4748.1,
    growth: 5.7,
  },
  {
    id: 5,
    name: "OpenShop Smart Watch",
    price: 149.99,
    sales: 230,
    revenue: 34497.7,
    growth: 15.2,
  },
];

const regionData = [
  { name: "North America", value: 45, color: "#8884d8" },
  { name: "Europe", value: 30, color: "#82ca9d" },
  { name: "Asia", value: 15, color: "#ffc658" },
  { name: "Australia", value: 5, color: "#ff8042" },
  { name: "Other", value: 5, color: "#0088fe" },
];

const deviceData = [
  { name: "Desktop", value: 40, color: "#8884d8" },
  { name: "Mobile", value: 45, color: "#82ca9d" },
  { name: "Tablet", value: 15, color: "#ffc658" },
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md shadow-md p-3">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

// Metric Card Component
const MetricCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  description,
  color,
}) => {
  const isPositive = trendValue >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {isPositive ? (
            <ArrowUpRight className="h-3.5 w-3.5 mr-1 text-green-500" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 mr-1 text-red-500" />
          )}
          <span
            className={
              isPositive
                ? "text-green-500 font-medium"
                : "text-red-500 font-medium"
            }
          >
            {isPositive ? "+" : ""}
            {trendValue}%
          </span>
          <span className="ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("year");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Get data based on selected time range
  const getChartData = () => {
    switch (timeRange) {
      case "week":
        return weeklyData;
      case "year":
      default:
        return salesData;
    }
  };

  // Calculate total revenue
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalExpenses = salesData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;

  return (
    <div className="ml-56 p-6 max-w-[1200px]">
      <div className="flex flex-col space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Comprehensive overview of your store's performance
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4 text-green-600" />}
            trend="up"
            trendValue={12.5}
            description="from last period"
            color="bg-green-100"
          />

          <MetricCard
            title="Total Sales"
            value={totalSales.toLocaleString()}
            icon={<ShoppingBag className="h-4 w-4 text-blue-600" />}
            trend="up"
            trendValue={8.2}
            description="from last period"
            color="bg-blue-100"
          />

          <MetricCard
            title="Total Profit"
            value={`$${totalProfit.toLocaleString()}`}
            icon={<TrendingUp className="h-4 w-4 text-purple-600" />}
            trend="up"
            trendValue={15.3}
            description="from last period"
            color="bg-purple-100"
          />

          <MetricCard
            title="Conversion Rate"
            value="3.2%"
            icon={<Users className="h-4 w-4 text-orange-600" />}
            trend="down"
            trendValue={-0.8}
            description="from last period"
            color="bg-orange-100"
          />
        </div>

        {/* Sales Overview */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Revenue, sales, and expenses over time
                </CardDescription>
              </div>
              <Tabs defaultValue="revenue" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getChartData()}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="expenses" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>
                Distribution of sales across product categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Customer Acquisition */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>
                New vs returning customers over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={customerData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="new"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="returning"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>
                Distribution of orders by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {orderStatusData.map((status, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-sm">
                      {status.name}: {status.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hourly Sales */}
          <Card>
            <CardHeader>
              <CardTitle>Hourly Sales</CardTitle>
              <CardDescription>
                Sales distribution throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={hourlyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#8884d8" name="Orders" />
                    <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>
              Products with the highest sales and revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Units Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.sales.toLocaleString()}</TableCell>
                    <TableCell>${product.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {product.growth >= 0 ? (
                          <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" />
                        )}
                        <span
                          className={
                            product.growth >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {product.growth >= 0 ? "+" : ""}
                          {product.growth}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Sales distribution by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {regionData.map((region, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: region.color }}
                    ></div>
                    <span className="text-sm">{region.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>Sales by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: device.color }}
                    ></div>
                    <span className="text-sm">{device.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Key performance indicators for your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Conversion Rate</p>
                    <p className="text-xs text-muted-foreground">
                      Percentage of visitors who make a purchase
                    </p>
                  </div>
                  <div className="font-medium">3.2%</div>
                </div>
                <Progress value={32} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Average Order Value</p>
                    <p className="text-xs text-muted-foreground">
                      Average amount spent per order
                    </p>
                  </div>
                  <div className="font-medium">$85.42</div>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Cart Abandonment Rate</p>
                    <p className="text-xs text-muted-foreground">
                      Percentage of users who add items to cart but don't
                      checkout
                    </p>
                  </div>
                  <div className="font-medium">68.7%</div>
                </div>
                <Progress value={68.7} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Customer Retention Rate
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Percentage of customers who return to make another
                      purchase
                    </p>
                  </div>
                  <div className="font-medium">42.3%</div>
                </div>
                <Progress value={42.3} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
