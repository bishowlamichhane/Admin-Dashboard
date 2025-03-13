"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  PlusCircle,
  Edit,
  Check,
  Trash2,
  Upload,
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  Tag,
  Package,
  Layers,
  DollarSign,
} from "lucide-react";
import { itemsAction } from "../../store/itemsSlice";

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
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
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

// Sample products for OpenShop
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
  {
    id: 6,
    name: "OpenShop Notebook Set",
    price: "19.99",
    image: "/images/notebook.jpg",
    category: "Office",
    stock: 180,
    featured: false,
    status: "Active",
  },
  {
    id: 7,
    name: "OpenShop Water Bottle",
    price: "12.99",
    image: "/images/bottle.jpg",
    category: "Accessories",
    stock: 250,
    featured: false,
    status: "Active",
  },
  {
    id: 8,
    name: "OpenShop Wireless Charger",
    price: "34.99",
    image: "/images/charger.jpg",
    category: "Electronics",
    stock: 85,
    featured: true,
    status: "Active",
  },
  {
    id: 9,
    name: "OpenShop Backpack",
    price: "59.99",
    image: "/images/bag.jpg",
    category: "Accessories",
    stock: 70,
    featured: true,
    status: "Active",
  },
  {
    id: 10,
    name: "OpenShop Desk Lamp",
    price: "39.99",
    image: "/images/lamp.jpg",
    category: "Home",
    stock: 60,
    featured: false,
    status: "Low Stock",
  },
  {
    id: 11,
    name: "OpenShop Bluetooth Speaker",
    price: "79.99",
    image: "/images/speaker.jpg",
    category: "Electronics",
    stock: 45,
    featured: true,
    status: "Low Stock",
  },
  {
    id: 12,
    name: "OpenShop Wireless Mouse",
    price: "24.99",
    image: "/images/mouse.jpg",
    category: "Electronics",
    stock: 0,
    featured: false,
    status: "Out of Stock",
  },
];

// OpenShop product categories
const openShopCategories = [
  "Electronics",
  "Clothing",
  "Home",
  "Office",
  "Accessories",
  "Wearables",
  "Audio",
  "Mobile",
  "Computing",
];

const ProductItems = ({ item, isEdit, setisEdit, editProduct, onDelete }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // Use the removeItems action from the slice
    dispatch(itemsAction.removeItems(id));
    onDelete(id);
  };

  const getStockStatus = (stock) => {
    if (stock <= 0)
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-800 border-red-300",
      };
    if (stock < 50)
      return {
        label: "Low Stock",
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
      };
    return {
      label: "In Stock",
      color: "bg-green-100 text-green-800 border-green-300",
    };
  };

  const stockStatus = getStockStatus(item.stock);

  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{item.id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <img
            src={item.image || "/placeholder.svg?height=50&width=50"}
            alt={item.name}
            className="h-12 w-12 object-cover rounded-md border"
          />
          <div>
            <p className="font-medium">{item.name}</p>
            {item.featured && (
              <Badge
                variant="outline"
                className="mt-1 bg-blue-50 text-blue-700 border-blue-200"
              >
                Featured
              </Badge>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${stockStatus.color}`}
        >
          {stockStatus.label}
          <span className="ml-1.5 text-xs font-normal">({item.stock})</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">${item.price}</TableCell>
      <TableCell>
        {isEdit ? (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Check className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{item.name}"? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(item.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View details</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit product</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className="text-red-600"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete product</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{item.name}"? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(item.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

const ProductStatCard = ({ title, value, icon, description, color }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  // Use sample products if Redux store is empty
  const reduxItems = useSelector((state) => state.items || []);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const [isEdit, setisEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  // Initialize with sample products if Redux store is empty
  useEffect(() => {
    if (reduxItems.length === 0) {
      setItems(sampleProducts);
      dispatch(itemsAction.addItems(sampleProducts));
    } else {
      setItems(reduxItems);
    }
  }, [reduxItems, dispatch]);

  // Handle product deletion
  const handleDeleteProduct = (id) => {
    // Update local state to reflect the deletion
    setItems(items.filter((item) => item.id !== id));
  };

  // Filter items based on search query and filters
  const filterItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    if (stockFilter === "all") return matchesSearch && matchesCategory;
    if (stockFilter === "in-stock")
      return matchesSearch && matchesCategory && item.stock > 50;
    if (stockFilter === "low-stock")
      return (
        matchesSearch && matchesCategory && item.stock > 0 && item.stock <= 50
      );
    if (stockFilter === "out-of-stock")
      return matchesSearch && matchesCategory && item.stock <= 0;

    return matchesSearch && matchesCategory;
  });

  // State variables for form inputs
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productFeatured, setProductFeatured] = useState(false);

  const editProduct = () => {
    setisEdit(!isEdit);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      id: items.length + 1,
      name: productName,
      price: productPrice,
      image: imagePreview || "/placeholder.svg?height=100&width=100",
      category: productCategory,
      stock: Number.parseInt(productQuantity),
      featured: productFeatured,
      status:
        Number.parseInt(productQuantity) > 50
          ? "Active"
          : Number.parseInt(productQuantity) > 0
          ? "Low Stock"
          : "Out of Stock",
    };

    // Create a new array with the new product
    const updatedItems = [...items, newProduct];

    // Dispatch action to add the new product
    dispatch(itemsAction.addItems(updatedItems));
    setItems(updatedItems);

    // Reset form fields
    setProductName("");
    setProductCategory("");
    setProductPrice("");
    setProductQuantity("");
    setProductImage(null);
    setImagePreview(null);
    setProductFeatured(false);
  };

  // Calculate product statistics
  const totalProducts = items.length;
  const totalStock = items.reduce((sum, item) => sum + item.stock, 0);
  const lowStockCount = items.filter(
    (item) => item.stock > 0 && item.stock <= 50
  ).length;
  const outOfStockCount = items.filter((item) => item.stock <= 0).length;
  const featuredCount = items.filter((item) => item.featured).length;

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            OpenShop Products
          </h1>
          <p className="text-muted-foreground">
            Manage your product inventory, add new products, and track stock
            levels.
          </p>
        </div>

        {/* Product Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProductStatCard
            title="Total Products"
            value={totalProducts}
            icon={<Package className="h-4 w-4 text-blue-600" />}
            description="Products in your inventory"
            color="bg-blue-100"
          />

          <ProductStatCard
            title="Total Stock"
            value={totalStock}
            icon={<Layers className="h-4 w-4 text-green-600" />}
            description="Items available for sale"
            color="bg-green-100"
          />

          <ProductStatCard
            title="Low Stock Items"
            value={lowStockCount}
            icon={<Tag className="h-4 w-4 text-yellow-600" />}
            description="Products with low inventory"
            color="bg-yellow-100"
          />

          <ProductStatCard
            title="Featured Products"
            value={featuredCount}
            icon={<DollarSign className="h-4 w-4 text-purple-600" />}
            description="Products highlighted in store"
            color="bg-purple-100"
          />
        </div>

        {/* Header with search and edit button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={isEdit ? "default" : "outline"}
              onClick={editProduct}
              className="shrink-0"
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEdit ? "Done Editing" : "Edit Products"}
            </Button>
            <Button className="shrink-0">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <CardTitle>OpenShop Product Inventory</CardTitle>
                <CardDescription>
                  Showing {filterItems.length} of {items.length} products
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {openShopCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by stock" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stock Levels</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">
                      <div className="flex items-center">
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="w-[100px] text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterItems.length > 0 ? (
                    filterItems.map((item) => (
                      <ProductItems
                        item={item}
                        key={item.id}
                        isEdit={isEdit}
                        setisEdit={setisEdit}
                        editProduct={editProduct}
                        onDelete={handleDeleteProduct}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-6 text-muted-foreground"
                      >
                        No products found. Add a new product below.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add New Product Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add New OpenShop Product
            </CardTitle>
            <CardDescription>
              Fill in the details below to add a new product to your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="media">Media & Visibility</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>

              <form onSubmit={handleOnSubmit}>
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        type="text"
                        placeholder="Enter product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productCategory">Product Category</Label>
                      <Select
                        value={productCategory}
                        onValueChange={setProductCategory}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {openShopCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Product Price ($)</Label>
                      <Input
                        id="productPrice"
                        type="text"
                        placeholder="Enter product price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productQuantity">
                        Initial Stock Quantity
                      </Label>
                      <Input
                        id="productQuantity"
                        type="number"
                        placeholder="Enter product quantity"
                        value={productQuantity}
                        onChange={(e) => setProductQuantity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="media" className="space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="imageUpload">Product Image</Label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-32 h-32 rounded-md overflow-hidden border">
                          <img
                            src={
                              imagePreview ||
                              "/placeholder.svg?height=128&width=128" ||
                              "/placeholder.svg"
                            }
                            alt="Product Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 w-full">
                          <Label
                            htmlFor="imageUpload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                PNG, JPG or WEBP (max. 2MB)
                              </p>
                            </div>
                            <Input
                              id="imageUpload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setProductImage(file);
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    setImagePreview(reader.result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="featured">Featured Product</Label>
                        <Switch
                          id="featured"
                          checked={productFeatured}
                          onCheckedChange={setProductFeatured}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Featured products are displayed prominently in the
                        OpenShop storefront
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="inventory" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                      <Input
                        id="sku"
                        type="text"
                        placeholder="Enter product SKU"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="barcode">
                        Barcode (ISBN, UPC, GTIN, etc.)
                      </Label>
                      <Input
                        id="barcode"
                        type="text"
                        placeholder="Enter product barcode"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="trackInventory">Track Inventory</Label>
                        <Switch id="trackInventory" defaultChecked={true} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enable inventory tracking for this product
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="allowBackorders">
                          Allow Backorders
                        </Label>
                        <Switch id="allowBackorders" defaultChecked={false} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Allow customers to purchase this product when out of
                        stock
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button type="submit">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;
