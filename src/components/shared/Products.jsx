"use client";

import { useState, useEffect, useRef } from "react";
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
  const dispatch = useDispatch();

  // State for products, search, filters, and modals
  const products = useSelector((state) => state.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockStatusFilter, setStockStatusFilter] = useState("all");
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isUploadProductsModalOpen, setIsUploadProductsModalOpen] =
    useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  // Ref for the file input
  const fileInputRef = useRef(null);

  // Load sample products on mount
  useEffect(() => {
    dispatch(itemsAction.replaceItems(sampleProducts));
  }, [dispatch]);

  // Product data stats
  const totalProducts = products.length;
  const activeProducts = products.filter(
    (product) => product.status === "Active"
  ).length;
  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;
  const featuredProducts = products.filter(
    (product) => product.featured
  ).length;

  // Filtered and searched products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStockStatus =
      stockStatusFilter === "all" || product.status === stockStatusFilter;
    return matchesSearch && matchesCategory && matchesStockStatus;
  });

  // Handlers for product actions
  const handleDeleteProduct = (id) => {
    dispatch(itemsAction.deleteItem(id));
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const editProduct = (id, field, value) => {
    dispatch(itemsAction.editItem({ id, field, value }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    // Handle form submission logic here
  };

  const handleBulkDelete = () => {
    dispatch(itemsAction.bulkDeleteItems(Array.from(selectedProducts)));
    setSelectedProducts(new Set());
    setIsBulkDeleteModalOpen(false);
  };

  const handleProductSelect = (id) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAllProducts = (checked) => {
    if (checked) {
      const allProductIds = new Set(filteredProducts.map((p) => p.id));
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts(new Set());
    }
  };

  const allProductsSelected =
    selectedProducts.size === filteredProducts.length &&
    filteredProducts.length > 0;

  // Handle file upload for bulk products
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          // Assuming the JSON data is an array of products
          dispatch(itemsAction.addBulkItems(data));
          setIsUploadProductsModalOpen(false);
          alert("Products uploaded successfully!");
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Failed to upload products. Invalid JSON format.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col flex-1 p-4 bg-slate-100 dark:bg-slate-950">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <p className="text-muted-foreground mb-6">
        Manage your product inventory and offerings.
      </p>

      {/* Product Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <ProductStatCard
          title="Total Products"
          value={totalProducts}
          icon={<Package />}
          description="in your inventory"
          color="text-blue-500"
        />
        <ProductStatCard
          title="Active Products"
          value={activeProducts}
          icon={<Check />}
          description="currently available"
          color="text-green-500"
        />
        <ProductStatCard
          title="Out of Stock"
          value={outOfStockProducts}
          icon={<Trash2 />}
          description="items to reorder"
          color="text-red-500"
        />
        <ProductStatCard
          title="Featured Products"
          value={featuredProducts}
          icon={<Tag />}
          description="highlighted for customers"
          color="text-yellow-500"
        />
      </div>

      {/* Product Management Section */}
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Product Overview</CardTitle>
          <CardDescription>Manage your product listings.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-1">
          <Tabs defaultValue="all" className="flex flex-col flex-1">
            <div className="flex items-center mb-4">
              <div className="relative w-full max-w-sm items-center">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                  <Search className="size-4 text-muted-foreground" />
                </span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Category" />
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

                <Select
                  value={stockStatusFilter}
                  onValueChange={setStockStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Stock Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>

                {selectedProducts.size > 0 && (
                  <AlertDialog
                    open={isBulkDeleteModalOpen}
                    onOpenChange={setIsBulkDeleteModalOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete Selected ({selectedProducts.size})
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the selected products from your inventory.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBulkDelete}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                <AlertDialog
                  open={isUploadProductsModalOpen}
                  onOpenChange={setIsUploadProductsModalOpen}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" /> Upload Products
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Upload Products</AlertDialogTitle>
                      <AlertDialogDescription>
                        Upload a JSON file containing product data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        id="file"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".json"
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => fileInputRef.current.click()}
                      >
                        Select File
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  size="sm"
                  onClick={() => setIsNewProductModalOpen(true)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div>
            </div>

            <TabsList className="grid w-full grid-cols-2 lg:w-fit">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="flex flex-col flex-1">
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px] text-center">
                        <Input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={allProductsSelected}
                          onChange={(e) =>
                            handleSelectAllProducts(e.target.checked)
                          }
                        />
                      </TableHead>
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-center">Stock</TableHead>
                      <TableHead className="text-center">Featured</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Sales</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <ProductItems
                        key={product.id}
                        item={product}
                        isEdit={false}
                        setisEdit={() => {}}
                        editProduct={editProduct}
                        onDelete={handleDeleteProduct}
                        onSelect={handleProductSelect}
                        isSelected={selectedProducts.has(product.id)}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="active" className="flex flex-col flex-1">
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px] text-center">
                        <Input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={allProductsSelected}
                          onChange={(e) =>
                            handleSelectAllProducts(e.target.checked)
                          }
                        />
                      </TableHead>
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-center">Stock</TableHead>
                      <TableHead className="text-center">Featured</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Sales</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts
                      .filter((product) => product.status === "Active")
                      .map((product) => (
                        <ProductItems
                          key={product.id}
                          item={product}
                          isEdit={false}
                          setisEdit={() => {}}
                          editProduct={editProduct}
                          onDelete={handleDeleteProduct}
                          onSelect={handleProductSelect}
                          isSelected={selectedProducts.has(product.id)}
                        />
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* New Product Modal */}
      <AlertDialog
        open={isNewProductModalOpen}
        onOpenChange={setIsNewProductModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Product</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details for your new product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleOnSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Product Name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                defaultValue="99.99"
                type="number"
                step="0.01"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select defaultValue="Electronics">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                defaultValue="100"
                type="number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">
                Featured
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch id="featured" />
                <Label htmlFor="featured">Mark as featured product</Label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select defaultValue="Active">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" onClick={handleOnSubmit}>
              Add Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Products;
