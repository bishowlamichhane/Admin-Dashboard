"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "./Header";
import Footer from "./Footer";
import {
  CheckIcon,
  ArrowRightIcon,
  BarChartIcon,
  ShoppingCartIcon,
  UsersIcon,
  PackageIcon,
  SettingsIcon,
  PlayIcon,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/authContext";

const LandingPage = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, loading, navigate]);

  const features = [
    {
      icon: <BarChartIcon className="h-12 w-12 text-rose-500" />,
      title: "Sales Analytics",
      description:
        "Track your sales performance with detailed analytics and reports to make data-driven decisions.",
    },
    {
      icon: <ShoppingCartIcon className="h-12 w-12 text-amber-500" />,
      title: "Order Management",
      description:
        "Efficiently manage orders from receipt to delivery with our streamlined workflow system.",
    },
    {
      icon: <UsersIcon className="h-12 w-12 text-emerald-500" />,
      title: "Customer Management",
      description:
        "Keep track of customer information, purchase history, and preferences in one place.",
    },
    {
      icon: <PackageIcon className="h-12 w-12 text-sky-500" />,
      title: "Product Management",
      description:
        "Easily add, edit, and organize your product catalog with our intuitive interface.",
    },
    {
      icon: <SettingsIcon className="h-12 w-12 text-purple-500" />,
      title: "Customizable Dashboard",
      description:
        "Personalize your dashboard to focus on the metrics that matter most to your business.",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small businesses just getting started",
      features: [
        "Dashboard analytics",
        "Product management (up to 100 products)",
        "Order management",
        "Customer database",
        "Email support",
      ],
    },

    {
      name: "Professional",
      price: "$79",
      description: "Ideal for growing businesses with more needs",
      features: [
        "Everything in Starter",
        "Unlimited products",
        "Advanced analytics",
        "Inventory management",
        "Priority support",
        "Multiple user accounts",
      ],
    },

    {
      name: "Enterprise",
      price: "$199",
      description: "For large businesses with complex requirements",
      features: [
        "Everything in Professional",
        "Custom reporting",
        "API access",
        "Dedicated account manager",
        "White-label options",
        "Advanced security features",
        "24/7 phone support",
      ],
    },
  ];

  const faqs = [
    {
      question: "What is Open Shop?",
      answer:
        "Open Shop is a comprehensive e-commerce admin dashboard that helps businesses manage their online stores efficiently. It provides tools for sales analytics, order management, customer management, product management, and more.",
    },
    {
      question: "How do I get started with Open Shop?",
      answer:
        "Getting started is easy! Simply sign up for an account, choose your subscription plan, and you'll have immediate access to your dashboard. We also offer onboarding assistance to help you set up your store.",
    },
    {
      question: "Can I upgrade or downgrade my subscription plan?",
      answer:
        "Yes, you can change your subscription plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, the new rate will apply at the start of your next billing cycle.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for all our subscription plans. No credit card is required to start your trial.",
    },
    {
      question:
        "Can I integrate Open Shop with my existing e-commerce platform?",
      answer:
        "Yes, Open Shop integrates seamlessly with popular e-commerce platforms like Shopify, WooCommerce, Magento, and more. If you need help with integration, our support team is ready to assist you.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 dark:from-rose-500 dark:via-purple-500 dark:to-indigo-500">
                  Supercharge Your E-commerce Business
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
                  Open Shop provides a powerful admin dashboard to help you
                  track sales, manage products, and grow your online business.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white shadow-lg shadow-rose-500/25 dark:shadow-rose-700/20"
                  >
                    <Link to="/signup">
                      Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setVideoModalOpen(true)}
                  >
                    <PlayIcon className="mr-2 h-4 w-4" /> Watch Demo
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link to="/">
                      Guest <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-500 opacity-30 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/images/openshop.png"
                    alt="Open Shop Dashboard Preview"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background" id="features">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground">
              Open Shop comes packed with all the tools you need to manage and
              grow your e-commerce business.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-card rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section
        className="py-24 bg-gradient-to-b from-background to-background/80"
        id="demo"
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              See Open Shop in Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Watch a quick demo to see how Open Shop can transform your
              e-commerce business.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-500 to-indigo-500 opacity-30 blur"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="aspect-video bg-muted relative">
                <img
                  src="/images/openshop.png"
                  alt="Open Shop Dashboard Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <PlayIcon className="h-8 w-8 text-primary" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-background" id="pricing">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that best fits your business needs. All plans
              include a 14-day free trial.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="relative p-8 bg-card rounded-3xl border border-border"
              >
                <h3 className="text-2xl font-bold mb-2 text-card-foreground">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold mb-4 text-card-foreground">
                  {plan.price}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-muted-foreground"
                    >
                      <CheckIcon className="h-5 w-5 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white"
                >
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background" id="faq">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about Open Shop.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-5xl mx-4">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Open Shop Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
