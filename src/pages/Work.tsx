import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Bell, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import CompanyCard from "@/components/CompanyCard";

const Work = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const products = [
    {
      id: 1,
      name: "Premium Coffee Blend",
      company: "Sunrise Cafe",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
      description: "Artisan roasted coffee beans",
    },
    {
      id: 2,
      name: "Laptop Repair Service",
      company: "Tech Solutions",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
      description: "Fast and reliable repairs",
    },
    {
      id: 3,
      name: "Yoga Classes",
      company: "Wellness Studio",
      image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400",
      description: "Morning and evening sessions",
    },
    {
      id: 4,
      name: "Pizza Margherita",
      company: "Italian Bistro",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
      description: "Traditional wood-fired pizza",
    },
  ];

  const companies = [
    {
      id: 1,
      name: "Sunrise Cafe",
      category: "Restaurant",
      logo: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200",
      description: "Cozy cafe with the best coffee in town",
    },
    {
      id: 2,
      name: "Tech Solutions",
      category: "IT Services",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200",
      description: "Professional IT support and repair",
    },
    {
      id: 3,
      name: "Wellness Studio",
      category: "Education",
      logo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200",
      description: "Yoga and meditation center",
    },
    {
      id: 4,
      name: "Italian Bistro",
      category: "Restaurant",
      logo: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=200",
      description: "Authentic Italian cuisine",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Evrika</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="w-full justify-center mb-8 bg-card border border-border">
            <TabsTrigger value="products" className="flex-1">
              Products
            </TabsTrigger>
            <TabsTrigger value="home" className="flex-1">
              Home
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex-1">
              Companies
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Welcome to Evrika
              </h1>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search products, companies, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Recommended for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Featured Companies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {companies.map((company) => (
                  <CompanyCard key={company.id} {...company} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6 animate-fade-in">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-card"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6 animate-fade-in">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                className="pl-10 bg-card"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companies.map((company) => (
                <CompanyCard key={company.id} {...company} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">Evrika</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Work;
