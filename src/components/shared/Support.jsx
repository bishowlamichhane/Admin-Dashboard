"use client";

import { SelectItem } from "@/components/ui/select";

import { SelectContent } from "@/components/ui/select";

import { SelectValue } from "@/components/ui/select";

import { SelectTrigger } from "@/components/ui/select";

import { Select } from "@/components/ui/select";

import { useState } from "react";
import {
  HelpCircle,
  Search,
  Mail,
  MessageSquare,
  FileText,
  Book,
  Video,
  ExternalLink,
  Send,
  Phone,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");

  // FAQ data
  const faqCategories = [
    {
      id: "general",
      title: "General",
      questions: [
        {
          id: "what-is-openshop",
          question: "What is OpenShop?",
          answer:
            "OpenShop is a comprehensive e-commerce platform that allows businesses to create, manage, and scale their online stores. It provides tools for inventory management, order processing, customer management, and analytics.",
        },
        {
          id: "how-to-get-started",
          question: "How do I get started with OpenShop?",
          answer:
            "To get started with OpenShop, sign up for an account, complete your store profile, add your products, configure payment methods, and customize your storefront. Our step-by-step setup wizard will guide you through the process.",
        },
        {
          id: "pricing-plans",
          question: "What pricing plans are available?",
          answer:
            "OpenShop offers several pricing tiers: Free (basic features, limited products), Starter ($29/month), Business ($79/month), and Enterprise (custom pricing). Each plan includes different features and capabilities to suit businesses of various sizes.",
        },
      ],
    },
    {
      id: "products",
      title: "Products & Inventory",
      questions: [
        {
          id: "add-products",
          question: "How do I add products to my store?",
          answer:
            "To add products, navigate to the Products section in your dashboard, click 'Add Product', and fill in the details including name, description, price, images, and inventory information. You can also import products in bulk using CSV files.",
        },
        {
          id: "manage-inventory",
          question: "How does inventory management work?",
          answer:
            "OpenShop's inventory management system automatically tracks stock levels as orders are placed. You can set low stock alerts, manage variants, and sync inventory across multiple sales channels if you're using our omnichannel features.",
        },
        {
          id: "product-categories",
          question: "Can I organize products into categories?",
          answer:
            "Yes, you can create custom categories and subcategories to organize your products. This helps customers navigate your store and find what they're looking for more easily. You can also tag products for additional filtering options.",
        },
      ],
    },
    {
      id: "orders",
      title: "Orders & Payments",
      questions: [
        {
          id: "process-order",
          question: "How do I process an order?",
          answer:
            "When a new order comes in, you'll receive a notification. Go to the Orders section, select the order, and follow the workflow to process it: verify payment, prepare for shipping, generate shipping labels, and mark as shipped. You can also add tracking information for customers.",
        },
        {
          id: "payment-methods",
          question: "What payment methods are supported?",
          answer:
            "OpenShop supports major payment gateways including Stripe, PayPal, Square, and Authorize.net. You can accept credit cards, digital wallets, and bank transfers. For Enterprise plans, we also support specialized payment methods for different regions.",
        },
        {
          id: "refund-policy",
          question: "How do I handle refunds and returns?",
          answer:
            "To process a refund, go to the specific order, click 'Create Return', select the items being returned, specify the refund amount, and choose whether to refund to the original payment method or store credit. You can also create a custom return policy for your store.",
        },
      ],
    },
    {
      id: "customers",
      title: "Customers & Marketing",
      questions: [
        {
          id: "customer-accounts",
          question: "Do customers need to create accounts?",
          answer:
            "You can choose whether to require customer accounts or allow guest checkout. Customer accounts provide benefits like order history, saved addresses, and wishlist functionality, while guest checkout can reduce friction in the purchasing process.",
        },
        {
          id: "email-marketing",
          question: "Can I send marketing emails to my customers?",
          answer:
            "Yes, OpenShop includes basic email marketing tools to send newsletters, promotional offers, and abandoned cart reminders. For advanced marketing automation, we integrate with popular email marketing platforms like Mailchimp, Klaviyo, and SendGrid.",
        },
        {
          id: "loyalty-program",
          question: "How do I set up a loyalty program?",
          answer:
            "To create a loyalty program, go to Marketing > Loyalty Program in your dashboard. You can configure point earning rules (e.g., points per dollar spent), redemption options, and special rewards for VIP customers. This feature is available on Business and Enterprise plans.",
        },
      ],
    },
  ];

  // Documentation links
  const documentationLinks = [
    {
      title: "Getting Started Guide",
      description:
        "Learn the basics of setting up and managing your OpenShop store",
      icon: Book,
      link: "#",
      category: "Beginner",
    },
    {
      title: "Product Management",
      description: "Detailed guide on adding and managing products",
      icon: FileText,
      link: "#",
      category: "Intermediate",
    },
    {
      title: "Order Processing",
      description: "Learn how to efficiently process and fulfill orders",
      icon: CheckCircle,
      link: "#",
      category: "Intermediate",
    },
    {
      title: "Payment Configuration",
      description: "Set up and manage payment gateways and methods",
      icon: FileText,
      link: "#",
      category: "Advanced",
    },
    {
      title: "Marketing Tools",
      description:
        "Leverage OpenShop's marketing features to grow your business",
      icon: FileText,
      link: "#",
      category: "Intermediate",
    },
    {
      title: "Analytics & Reporting",
      description:
        "Understand your store's performance with detailed analytics",
      icon: FileText,
      link: "#",
      category: "Advanced",
    },
  ];

  // Video tutorials
  const videoTutorials = [
    {
      title: "OpenShop Quick Start Guide",
      duration: "10:25",
      thumbnail: "/placeholder.svg?height=120&width=220",
      link: "#",
      category: "Beginner",
    },
    {
      title: "Setting Up Your Product Catalog",
      duration: "15:42",
      thumbnail: "/placeholder.svg?height=120&width=220",
      link: "#",
      category: "Beginner",
    },
    {
      title: "Advanced Inventory Management",
      duration: "12:18",
      thumbnail: "/placeholder.svg?height=120&width=220",
      link: "#",
      category: "Intermediate",
    },
    {
      title: "Customizing Your Storefront",
      duration: "18:05",
      thumbnail: "/placeholder.svg?height=120&width=220",
      link: "#",
      category: "Intermediate",
    },
    {
      title: "Marketing Automation Strategies",
      duration: "22:30",
      thumbnail: "/placeholder.svg?height=120&width=220",
      link: "#",
      category: "Advanced",
    },
    {
      title: "Optimizing for Mobile Shoppers",
      duration: "14:15",
      thumbnail: "/placeholder.svg?height=120&width=220",
      link: "#",
      category: "Intermediate",
    },
  ];

  // Support team members
  const supportTeam = [
    {
      name: "Sarah Johnson",
      role: "Customer Success Manager",
      avatar: "/placeholder.svg",
      status: "online",
    },
    {
      name: "Michael Chen",
      role: "Technical Support Specialist",
      avatar: "/placeholder.svg",
      status: "online",
    },
    {
      name: "Jessica Williams",
      role: "Account Manager",
      avatar: "/placeholder.svg",
      status: "offline",
    },
  ];

  // Filter FAQ based on search query
  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories;

  // Handle sending a message
  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to your support system
      alert("Message sent: " + messageText);
      setMessageText("");
    }
  };

  return (
    <div className="ml-56 p-6 max-w-[1200px]">
      <div className="flex flex-col space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Help & Support
            </h1>
            <p className="text-muted-foreground">
              Get help with OpenShop and learn how to use the platform
            </p>
          </div>

          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">How can we help you today?</h2>
              <p className="text-muted-foreground mt-1">
                Search our knowledge base or browse the categories below
              </p>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help, articles, and tutorials..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Support Tabs */}
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="faq">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="docs">
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="h-4 w-4 mr-2" />
              Video Tutorials
            </TabsTrigger>
            <TabsTrigger value="contact">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Us
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions about using OpenShop
                </CardDescription>
              </CardHeader>
              <CardContent>
                {searchQuery && filteredFAQs.length === 0 ? (
                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No results found
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We couldn't find any FAQs matching "{searchQuery}"
                    </p>
                    <Button className="mt-4" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredFAQs.map((category) => (
                      <div key={category.id}>
                        <h3 className="text-lg font-medium mb-4">
                          {category.title}
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((item) => (
                            <AccordionItem key={item.id} value={item.id}>
                              <AccordionTrigger className="text-left">
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-muted-foreground">
                                  {item.answer}
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="docs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  Comprehensive guides and reference materials for OpenShop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documentationLinks.map((doc, index) => {
                    const Icon = doc.icon;
                    return (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              <div className="mr-3 p-2 rounded-md bg-primary/10">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-base">
                                  {doc.title}
                                </CardTitle>
                                <Badge variant="outline" className="mt-1">
                                  {doc.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            {doc.description}
                          </p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="outline" className="w-full" asChild>
                            <a
                              href={doc.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Read Documentation
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Tutorials Tab */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Learn how to use OpenShop with step-by-step video guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoTutorials.map((video, index) => (
                    <div key={index} className="group">
                      <div className="relative rounded-lg overflow-hidden mb-3">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                            <Video className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <h3 className="font-medium">{video.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline">{video.category}</Badge>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto"
                          asChild
                        >
                          <a
                            href={video.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Watch Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Us Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Get in touch with our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary/10 mr-3">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">
                        support@openshop.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary/10 mr-3">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary/10 mr-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-muted-foreground">
                        Available 24/7
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary/10 mr-3">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9AM - 8PM EST
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Saturday: 10AM - 6PM EST
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below to get in touch with our support
                    team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select defaultValue="general">
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="billing">
                            Billing Question
                          </SelectItem>
                          <SelectItem value="feature">
                            Feature Request
                          </SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe your issue or question in detail..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="attachment">Attachments (Optional)</Label>
                      <Input id="attachment" type="file" />
                      <p className="text-xs text-muted-foreground">
                        Max file size: 10MB. Supported formats: JPG, PNG, PDF.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Support Team</CardTitle>
                <CardDescription>
                  Meet our dedicated support specialists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {supportTeam.map((member, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-4 border rounded-lg"
                    >
                      <div className="relative">
                        <Avatar className="h-20 w-20 mb-4">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-4 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                            member.status === "online"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        ></span>
                      </div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                      <Button variant="outline" size="sm" className="mt-4">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>
                  Check the current status of OpenShop services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">Core Platform</p>
                        <p className="text-sm text-muted-foreground">
                          All systems operational
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Operational
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">Payment Processing</p>
                        <p className="text-sm text-muted-foreground">
                          All payment gateways operational
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Operational
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="font-medium">Analytics Dashboard</p>
                        <p className="text-sm text-muted-foreground">
                          Experiencing minor delays
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      Degraded
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">API Services</p>
                        <p className="text-sm text-muted-foreground">
                          All API endpoints operational
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Operational
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      View Status Page
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Label component since it wasn't imported
const Label = ({ htmlFor, children, className, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Support;
