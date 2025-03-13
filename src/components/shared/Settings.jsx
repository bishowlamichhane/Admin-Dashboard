"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Mail,
  Phone,
  Lock,
  LogOut,
  Save,
  Trash2,
  AlertTriangle,
  Check,
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Badge } from "../ui/badge";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const theme = "light";
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Admin at OpenShop, managing e-commerce operations and customer service.",
    language: "english",
    timezone: "america-new_york",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    newCustomers: true,
    marketingEmails: false,
    securityAlerts: true,
    productUpdates: true,
    browserNotifications: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30min",
  });

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  // Handle notification toggle changes
  const handleNotificationToggle = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  // Handle security toggle changes
  const handleSecurityToggle = (setting) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: !securitySettings[setting],
    });
  };

  // Handle form submission
  const handleSaveSettings = () => {
    // Simulate saving settings
    setSaveSuccess(true);

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="ml-56 p-6 max-w-[1200px]">
      <div className="flex flex-col space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span>Your settings have been saved successfully.</span>
          </div>
        )}

        {/* Settings Tabs */}
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and public profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mb-2">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, GIF or PNG. Max size 1MB.
                    </p>
                  </div>

                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" value="Administrator" disabled />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={profileForm.language}
                      onValueChange={(value) =>
                        setProfileForm({ ...profileForm, language: value })
                      }
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={profileForm.timezone}
                      onValueChange={(value) =>
                        setProfileForm({ ...profileForm, timezone: value })
                      }
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-new_york">
                          Eastern Time (US & Canada)
                        </SelectItem>
                        <SelectItem value="america-chicago">
                          Central Time (US & Canada)
                        </SelectItem>
                        <SelectItem value="america-denver">
                          Mountain Time (US & Canada)
                        </SelectItem>
                        <SelectItem value="america-los_angeles">
                          Pacific Time (US & Canada)
                        </SelectItem>
                        <SelectItem value="europe-london">London</SelectItem>
                        <SelectItem value="europe-paris">Paris</SelectItem>
                        <SelectItem value="asia-tokyo">Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for important updates
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() =>
                          handleNotificationToggle("emailNotifications")
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Order Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about order status changes
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.orderUpdates}
                        onCheckedChange={() =>
                          handleNotificationToggle("orderUpdates")
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          New Customer Registrations
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new customers register
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.newCustomers}
                        onCheckedChange={() =>
                          handleNotificationToggle("newCustomers")
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional emails and newsletters
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={() =>
                          handleNotificationToggle("marketingEmails")
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about security-related events
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.securityAlerts}
                        onCheckedChange={() =>
                          handleNotificationToggle("securityAlerts")
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Product Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about product changes
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.productUpdates}
                        onCheckedChange={() =>
                          handleNotificationToggle("productUpdates")
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium">Browser Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.browserNotifications}
                      onCheckedChange={() =>
                        handleNotificationToggle("browserNotifications")
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div></div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button>Update Password</Button>
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium">
                    Two-Factor Authentication
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={() =>
                        handleSecurityToggle("twoFactorAuth")
                      }
                    />
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium">Login Alerts</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Login Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts for unusual login activity
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.loginAlerts}
                      onCheckedChange={() =>
                        handleSecurityToggle("loginAlerts")
                      }
                    />
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium">Session Management</h3>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <Select
                      value={securitySettings.sessionTimeout}
                      onValueChange={(value) =>
                        setSecuritySettings({
                          ...securitySettings,
                          sessionTimeout: value,
                        })
                      }
                    >
                      <SelectTrigger id="session-timeout">
                        <SelectValue placeholder="Select timeout period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15min">15 minutes</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                        <SelectItem value="4hours">4 hours</SelectItem>
                        <SelectItem value="1day">1 day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline">Sign Out All Devices</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark mode
                      </p>
                    </div>
                    <Switch
                      checked={theme === "dark"}
                      thumbIcon={theme === "dark" ? Moon : Sun}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer ${
                        theme === "light" ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className="h-20 bg-white border rounded-md mb-2 flex items-center justify-center">
                        <Sun className="h-8 w-8 text-yellow-500" />
                      </div>
                      <p className="font-medium text-center">Light</p>
                    </div>

                    <div
                      className={`border rounded-lg p-4 cursor-pointer ${
                        theme === "dark" ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className="h-20 bg-gray-900 border rounded-md mb-2 flex items-center justify-center">
                        <Moon className="h-8 w-8 text-blue-400" />
                      </div>
                      <p className="font-medium text-center">Dark</p>
                    </div>

                    <div
                      className={`border rounded-lg p-4 cursor-pointer ${
                        theme === "system" ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className="h-20 bg-gradient-to-r from-white to-gray-900 border rounded-md mb-2 flex items-center justify-center">
                        <div className="flex">
                          <Sun className="h-8 w-8 text-yellow-500" />
                          <Moon className="h-8 w-8 text-blue-400 ml-2" />
                        </div>
                      </div>
                      <p className="font-medium text-center">System</p>
                    </div>
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium">Layout</h3>

                  <div className="space-y-2">
                    <Label htmlFor="sidebar-position">Sidebar Position</Label>
                    <Select defaultValue="left">
                      <SelectTrigger id="sidebar-position">
                        <SelectValue placeholder="Select sidebar position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="density">Interface Density</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="density">
                        <SelectValue placeholder="Select interface density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your billing details and subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Current Plan</h3>

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-lg">Business Plan</h4>
                        <p className="text-sm text-muted-foreground">
                          $49.99/month
                        </p>
                      </div>
                      <Badge>Active</Badge>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">Unlimited products</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">Advanced analytics</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">24/7 customer support</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">Custom branding</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline">Change Plan</Button>
                      <Button
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium">Payment Method</h3>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-14 bg-blue-100 rounded flex items-center justify-center mr-4">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">
                          Expires 12/2025
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>

                  <Button variant="outline">Add Payment Method</Button>

                  <Separator />

                  <h3 className="text-lg font-medium">Billing History</h3>

                  <div className="rounded-md border">
                    <div className="flex items-center justify-between p-4 border-b">
                      <div>
                        <p className="font-medium">Invoice #INV-2023-001</p>
                        <p className="text-sm text-muted-foreground">
                          May 1, 2023
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Badge className="mr-4 bg-green-100 text-green-800 hover:bg-green-100">
                          Paid
                        </Badge>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border-b">
                      <div>
                        <p className="font-medium">Invoice #INV-2023-002</p>
                        <p className="text-sm text-muted-foreground">
                          June 1, 2023
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Badge className="mr-4 bg-green-100 text-green-800 hover:bg-green-100">
                          Paid
                        </Badge>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Invoice #INV-2023-003</p>
                        <p className="text-sm text-muted-foreground">
                          July 1, 2023
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Badge className="mr-4 bg-green-100 text-green-800 hover:bg-green-100">
                          Paid
                        </Badge>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Invoices
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader className="text-red-600">
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription className="text-red-600/80">
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium">Export and Delete Data</h4>
                <p className="text-sm text-muted-foreground">
                  Export all your data and then delete it from our servers
                </p>
              </div>
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
