"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Phone,
  Video,
  Info,
  MoreVertical,
  Paperclip,
  ImageIcon,
  Smile,
  Send,
  Check,
  CheckCheck,
  Star,
  StarOff,
  Clock,
  X,
  User,
  ShoppingBag,
  Calendar,
  Mail,
  MapPin,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

// Sample user data with conversations
const sampleUsers = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    avatar: "/placeholder.svg",
    status: "online",
    lastSeen: "Just now",
    isStarred: true,
    unreadCount: 3,
    lastMessage: "Do you have this in a different color?",
    lastMessageTime: "10:42 AM",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    customerSince: "Jan 15, 2022",
    totalOrders: 8,
    totalSpent: "$1,245.75",
    messages: [
      {
        id: 1,
        content:
          "Hi there! I recently purchased the OpenShop Premium T-Shirt and I love it!",
        time: "10:30 AM",
        sender: "user",
        status: "read",
      },
      {
        id: 2,
        content: "Thank you for your purchase! We're glad you like it.",
        time: "10:32 AM",
        sender: "admin",
        status: "read",
      },
      {
        id: 3,
        content: "I was wondering if you have it in blue color as well?",
        time: "10:35 AM",
        sender: "user",
        status: "read",
      },
      {
        id: 4,
        content:
          "Yes, we do have it in blue! Would you like to place an order for that?",
        time: "10:38 AM",
        sender: "admin",
        status: "read",
      },
      {
        id: 5,
        content: "That would be great! Is it the same price?",
        time: "10:40 AM",
        sender: "user",
        status: "read",
      },
      {
        id: 6,
        content: "Do you have this in a different color?",
        time: "10:42 AM",
        sender: "user",
        status: "unread",
      },
    ],
  },
  {
    id: 2,
    name: "James Rodriguez",
    email: "james.rodriguez@example.com",
    avatar: "/placeholder.svg",
    status: "offline",
    lastSeen: "2 hours ago",
    isStarred: false,
    unreadCount: 0,
    lastMessage: "Thanks for your help with my order!",
    lastMessageTime: "Yesterday",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, San Francisco, CA 94102",
    customerSince: "Mar 22, 2022",
    totalOrders: 5,
    totalSpent: "$890.50",
    messages: [
      {
        id: 1,
        content: "Hello, I have a question about my recent order #ORD7824.",
        time: "Yesterday, 2:15 PM",
        sender: "user",
        status: "read",
      },
      {
        id: 2,
        content:
          "Hi James, I'd be happy to help. What would you like to know about your order?",
        time: "Yesterday, 2:20 PM",
        sender: "admin",
        status: "read",
      },
      {
        id: 3,
        content:
          "I was wondering when it will be shipped? The status still shows as 'Processing'.",
        time: "Yesterday, 2:25 PM",
        sender: "user",
        status: "read",
      },
      {
        id: 4,
        content:
          "I've checked your order and it's being packed right now. It should ship by tomorrow morning, and you'll receive a tracking number via email.",
        time: "Yesterday, 2:30 PM",
        sender: "admin",
        status: "read",
      },
      {
        id: 5,
        content: "Thanks for your help with my order!",
        time: "Yesterday, 2:35 PM",
        sender: "user",
        status: "read",
      },
    ],
  },
  {
    id: 3,
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    avatar: "/placeholder.svg",
    status: "online",
    lastSeen: "Just now",
    isStarred: true,
    unreadCount: 1,
    lastMessage: "Is there a warranty on the Smart Watch?",
    lastMessageTime: "Yesterday",
    phone: "+1 (555) 234-5678",
    address: "789 Pine Rd, Chicago, IL 60601",
    customerSince: "Nov 5, 2021",
    totalOrders: 12,
    totalSpent: "$2,100.25",
    messages: [
      {
        id: 1,
        content: "Hello, I'm interested in the OpenShop Smart Watch.",
        time: "Yesterday, 11:00 AM",
        sender: "user",
        status: "read",
      },
      {
        id: 2,
        content:
          "Hi Sophia! The Smart Watch is one of our best-selling items. What would you like to know about it?",
        time: "Yesterday, 11:05 AM",
        sender: "admin",
        status: "read",
      },
      {
        id: 3,
        content:
          "I'm wondering about the battery life and if it's compatible with both Android and iOS?",
        time: "Yesterday, 11:10 AM",
        sender: "user",
        status: "read",
      },
      {
        id: 4,
        content:
          "The battery lasts up to 5 days on a single charge with normal use, and yes, it's fully compatible with both Android and iOS devices!",
        time: "Yesterday, 11:15 AM",
        sender: "admin",
        status: "read",
      },
      {
        id: 5,
        content: "That sounds great! Is there a warranty on the Smart Watch?",
        time: "Yesterday, 11:20 AM",
        sender: "user",
        status: "unread",
      },
    ],
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "/placeholder.svg",
    status: "offline",
    lastSeen: "3 days ago",
    isStarred: false,
    unreadCount: 0,
    lastMessage: "I'll check and get back to you.",
    lastMessageTime: "Monday",
    phone: "+1 (555) 345-6789",
    address: "321 Maple Dr, Boston, MA 02108",
    customerSince: "Jun 10, 2022",
    totalOrders: 3,
    totalSpent: "$450.25",
    messages: [
      {
        id: 1,
        content: "Hi, I need to return an item from my last order.",
        time: "Monday, 9:00 AM",
        sender: "user",
        status: "read",
      },
      {
        id: 2,
        content:
          "I'm sorry to hear that. May I know which item you want to return and the reason?",
        time: "Monday, 9:15 AM",
        sender: "admin",
        status: "read",
      },
      {
        id: 3,
        content:
          "It's the OpenShop Wireless Earbuds. One of the earbuds isn't working properly.",
        time: "Monday, 9:30 AM",
        sender: "user",
        status: "read",
      },
      {
        id: 4,
        content:
          "I understand. I'll need to check if we can troubleshoot first or if we should proceed with a return. Let me check our policy for this specific case.",
        time: "Monday, 9:45 AM",
        sender: "admin",
        status: "read",
      },
      {
        id: 5,
        content: "I'll check and get back to you.",
        time: "Monday, 10:00 AM",
        sender: "user",
        status: "read",
      },
    ],
  },
  {
    id: 5,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    avatar: "/placeholder.svg",
    status: "online",
    lastSeen: "Just now",
    isStarred: false,
    unreadCount: 2,
    lastMessage: "When will you restock the Coffee Mugs?",
    lastMessageTime: "2 days ago",
    phone: "+1 (555) 456-7890",
    address: "654 Cedar Ln, Seattle, WA 98101",
    customerSince: "Sep 18, 2021",
    totalOrders: 9,
    totalSpent: "$1,500.00",
    messages: [
      {
        id: 1,
        content:
          "Hello, I've been trying to purchase the OpenShop Coffee Mug but it's out of stock.",
        time: "2 days ago, 3:00 PM",
        sender: "user",
        status: "read",
      },
      {
        id: 2,
        content:
          "Hi Olivia, thank you for your interest in our Coffee Mugs. They've been very popular lately!",
        time: "2 days ago, 3:10 PM",
        sender: "admin",
        status: "read",
      },
      {
        id: 3,
        content:
          "Do you know when they'll be back in stock? I'd like to get a few for my office.",
        time: "2 days ago, 3:15 PM",
        sender: "user",
        status: "read",
      },
      {
        id: 4,
        content:
          "We're expecting a new shipment next week. Would you like me to notify you when they're available?",
        time: "2 days ago, 3:20 PM",
        sender: "admin",
        status: "read",
      },
      {
        id: 5,
        content: "Yes, please! That would be great.",
        time: "2 days ago, 3:25 PM",
        sender: "user",
        status: "read",
      },
      {
        id: 6,
        content: "When will you restock the Coffee Mugs?",
        time: "2 days ago, 3:30 PM",
        sender: "user",
        status: "unread",
      },
    ],
  },
  {
    id: 6,
    name: "David Wilson",
    email: "david.wilson@example.com",
    avatar: "/placeholder.svg",
    status: "offline",
    lastSeen: "1 week ago",
    isStarred: false,
    unreadCount: 0,
    lastMessage: "Thank you for the discount code!",
    lastMessageTime: "1 week ago",
    phone: "+1 (555) 567-8901",
    address: "987 Birch St, Austin, TX 78701",
    customerSince: "Apr 30, 2022",
    totalOrders: 4,
    totalSpent: "$750.50",
    messages: [
      {
        id: 1,
        content:
          "Hi, I was wondering if you offer any discounts for first-time customers?",
        time: "1 week ago, 11:00 AM",
        sender: "user",
        status: "read",
      },
      {
        id: 2,
        content:
          "Hello David! Yes, we do offer a 10% discount for first-time customers. Would you like me to send you a discount code?",
        time: "1 week ago, 11:15 AM",
        sender: "admin",
        status: "read",
      },
      {
        id: 3,
        content: "That would be great, thank you!",
        time: "1 week ago, 11:20 AM",
        sender: "user",
        status: "read",
      },
      {
        id: 4,
        content:
          "Here's your discount code: WELCOME10. It's valid for the next 7 days and can be used on any product in our store.",
        time: "1 week ago, 11:25 AM",
        sender: "admin",
        status: "read",
      },
      {
        id: 5,
        content: "Thank you for the discount code!",
        time: "1 week ago, 11:30 AM",
        sender: "user",
        status: "read",
      },
    ],
  },
];

// Quick reply templates
const quickReplies = [
  "Thank you for contacting us. How can I help you today?",
  "I'll check that for you right away.",
  "We apologize for the inconvenience. Let me resolve this for you.",
  "Your order has been shipped and should arrive within 3-5 business days.",
  "Is there anything else I can help you with?",
  "Thank you for your feedback! We appreciate your support.",
];

const Messages = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [filter, setFilter] = useState("all");
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const messagesEndRef = useRef(null);
  const [quickReplyText, setQuickReplyText] = useState("");

  // Get selected user
  const selectedUser = users.find((user) => user.id === selectedUserId);

  // Filter users based on search query and filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "unread") return matchesSearch && user.unreadCount > 0;
    if (filter === "starred") return matchesSearch && user.isStarred;

    return matchesSearch;
  });

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedUser]);

  // Mark messages as read when selecting a user
  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);

    // Mark messages as read
    setUsers(
      users.map((user) => {
        if (user.id === userId && user.unreadCount > 0) {
          return {
            ...user,
            unreadCount: 0,
            messages: user.messages.map((message) => ({
              ...message,
              status: "read",
            })),
          };
        }
        return user;
      })
    );
  };

  // Send a new message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: selectedUser.messages.length + 1,
      content: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "admin",
      status: "sent",
    };

    setUsers(
      users.map((user) => {
        if (user.id === selectedUserId) {
          return {
            ...user,
            lastMessage: messageText,
            lastMessageTime: "Just now",
            messages: [...user.messages, newMessage],
          };
        }
        return user;
      })
    );

    setMessageText("");

    // Scroll to bottom after sending
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Toggle star status for a user
  const toggleStar = (userId, e) => {
    e.stopPropagation();
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isStarred: !user.isStarred,
          };
        }
        return user;
      })
    );
  };

  // Use a quick reply
  const useQuickReply = (reply) => {
    setMessageText(reply);
    setShowQuickReplies(false);
  };

  // Format message time
  const formatMessageTime = (time) => {
    if (time.includes("Just now")) return "Just now";
    if (time.includes("Yesterday")) return "Yesterday";
    if (time.includes("Monday")) return "Monday";
    if (time.includes("days ago")) return time.split(",")[0];
    if (time.includes("week ago")) return "1w ago";
    return time;
  };

  return (
    <div className="ml-56 h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Conversations */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="p-2 border-b">
            <Tabs defaultValue="all" onValueChange={setFilter}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="flex-1">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-3 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedUserId === user.id ? "bg-muted" : ""
                  }`}
                  onClick={() => handleSelectUser(user.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          user.status === "online"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{user.name}</h3>
                        <div className="flex items-center">
                          <button
                            onClick={(e) => toggleStar(user.id, e)}
                            className="text-muted-foreground hover:text-yellow-400 transition-colors"
                          >
                            {user.isStarred ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground flex items-center">
                          {user.status === "online" ? (
                            "Online"
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              {user.lastSeen}
                            </>
                          )}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {formatMessageTime(user.lastMessageTime)}
                          </span>
                          {user.unreadCount > 0 && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary">
                              {user.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No conversations found
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Main chat area */}
        {selectedUser ? (
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedUser.status === "online" ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      `Last seen ${selectedUser.lastSeen}`
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Call</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Video Call</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowUserInfo(!showUserInfo)}
                      >
                        <Info className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>User Info</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                    <DropdownMenuItem>Archive conversation</DropdownMenuItem>
                    <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Block user
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-auto p-4 bg-muted/30">
              <div className="space-y-4">
                {selectedUser.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "admin"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "admin"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div
                        className={`flex items-center justify-end mt-1 text-xs ${
                          message.sender === "admin"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        <span>{message.time}</span>
                        {message.sender === "admin" && (
                          <span className="ml-1">
                            {message.status === "read" ? (
                              <CheckCheck className="h-3 w-3" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat input */}
            <div className="p-4 border-t">
              <div className="relative">
                <div className="absolute left-0 bottom-0 flex items-center p-2 gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Attach File</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ImageIcon className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Attach Image</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="relative">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setShowQuickReplies(!showQuickReplies)
                            }
                          >
                            <Smile className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Quick Replies</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {showQuickReplies && (
                      <Card className="absolute bottom-10 left-0 w-80 z-10">
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">
                            Quick Replies
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <ScrollArea className="h-60">
                            <div className="p-3 space-y-2">
                              {quickReplies.map((reply, index) => (
                                <div
                                  key={index}
                                  className="p-2 rounded-md hover:bg-muted cursor-pointer"
                                  onClick={() => {
                                    setQuickReplyText(reply);
                                    useQuickReply(reply);
                                  }}
                                >
                                  {reply}
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="pl-28 pr-14 py-6"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />

                <div className="absolute right-0 bottom-0 p-2">
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}

        {/* User info sidebar */}
        {showUserInfo && selectedUser && (
          <div className="w-80 border-l flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-medium">User Information</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUserInfo(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 text-center">
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarImage
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback className="text-lg">
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold mt-2">{selectedUser.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedUser.email}
                </p>
                <div className="flex justify-center mt-2 gap-2">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Orders
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="p-4">
                <h4 className="text-sm font-medium mb-3">
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{selectedUser.email}</p>
                      <p className="text-xs text-muted-foreground">Email</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{selectedUser.phone}</p>
                      <p className="text-xs text-muted-foreground">Phone</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{selectedUser.address}</p>
                      <p className="text-xs text-muted-foreground">Address</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="p-4">
                <h4 className="text-sm font-medium mb-3">
                  Customer Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{selectedUser.customerSince}</p>
                      <p className="text-xs text-muted-foreground">
                        Customer Since
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShoppingBag className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{selectedUser.totalOrders}</p>
                      <p className="text-xs text-muted-foreground">
                        Total Orders
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{selectedUser.totalSpent}</p>
                      <p className="text-xs text-muted-foreground">
                        Total Spent
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="p-4">
                <h4 className="text-sm font-medium mb-3">Recent Orders</h4>
                <div className="space-y-2">
                  <div className="rounded-md border p-3">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Order #ORD7823</p>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 border-green-300"
                      >
                        Delivered
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      May 15, 2023
                    </p>
                    <p className="text-sm mt-1">3 items • $125.99</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Order #ORD7824</p>
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800 border-blue-300"
                      >
                        Processing
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Apr 20, 2023
                    </p>
                    <p className="text-sm mt-1">1 item • $89.99</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  View All Orders
                </Button>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
