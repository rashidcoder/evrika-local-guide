import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  Building2,
  Utensils,
  Laptop,
  Heart,
  GraduationCap,
  ShoppingBag,
  Car,
  Home,
  Plane,
  Briefcase,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import AIChatBubble from "@/components/AIChatBubble";
import CompanyModal from "@/components/CompanyModal";

const categories = [
  { id: 1, name: "Restaurants", icon: Utensils, count: 124 },
  { id: 2, name: "IT Services", icon: Laptop, count: 89 },
  { id: 3, name: "Healthcare", icon: Heart, count: 67 },
  { id: 4, name: "Education", icon: GraduationCap, count: 45 },
  { id: 5, name: "Retail", icon: ShoppingBag, count: 156 },
  { id: 6, name: "Automotive", icon: Car, count: 38 },
  { id: 7, name: "Real Estate", icon: Home, count: 72 },
  { id: 8, name: "Travel", icon: Plane, count: 29 },
  { id: 9, name: "Consulting", icon: Briefcase, count: 94 },
  { id: 10, name: "Other", icon: Building2, count: 200 },
];

const companies = [
  {
    id: 1,
    name: "Sunrise Cafe",
    category: "Restaurant",
    logo: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
    description: "Cozy cafe with the best artisan coffee and fresh pastries in town.",
    rating: 4.8,
    reviewCount: 234,
    tags: ["Coffee", "Breakfast", "WiFi"],
  },
  {
    id: 2,
    name: "Tech Solutions Pro",
    category: "IT Services",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400",
    description: "Professional IT support, web development, and cloud solutions.",
    rating: 4.9,
    reviewCount: 189,
    tags: ["Development", "Support", "Cloud"],
  },
  {
    id: 3,
    name: "Wellness Studio",
    category: "Healthcare",
    logo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    description: "Yoga, meditation, and holistic wellness programs for mind and body.",
    rating: 4.7,
    reviewCount: 156,
    tags: ["Yoga", "Meditation", "Wellness"],
  },
  {
    id: 4,
    name: "Italian Bistro",
    category: "Restaurant",
    logo: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400",
    description: "Authentic Italian cuisine with fresh ingredients and wood-fired pizzas.",
    rating: 4.6,
    reviewCount: 312,
    tags: ["Italian", "Pizza", "Pasta"],
  },
  {
    id: 5,
    name: "Design Hub Agency",
    category: "Consulting",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
    description: "Creative design solutions for brands that want to stand out.",
    rating: 4.8,
    reviewCount: 98,
    tags: ["Design", "Branding", "Creative"],
  },
  {
    id: 6,
    name: "AutoCare Express",
    category: "Automotive",
    logo: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    description: "Fast, reliable car service and maintenance for all vehicle types.",
    rating: 4.5,
    reviewCount: 276,
    tags: ["Repair", "Maintenance", "Fast"],
  },
  {
    id: 7,
    name: "Green Grocers",
    category: "Retail",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    description: "Fresh organic produce and locally sourced groceries daily.",
    rating: 4.7,
    reviewCount: 445,
    tags: ["Organic", "Fresh", "Local"],
  },
  {
    id: 8,
    name: "Learn Academy",
    category: "Education",
    logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    description: "Professional courses and workshops for career advancement.",
    rating: 4.9,
    reviewCount: 167,
    tags: ["Courses", "Skills", "Career"],
  },
];

const Work = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCompanyClick = (company: typeof companies[0]) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Local Businesses
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore top-rated companies in your area with AI-powered recommendations
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search companies, services, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 pr-4 text-base rounded-xl border-2 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-card"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Browse Categories</h2>
            {selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-primary"
              >
                Clear filter
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.name;

              return (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(isSelected ? null : category.name)
                  }
                  className={`group flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-glow"
                      : "bg-card hover:bg-card-hover border-border hover:border-primary/30 hover:shadow-soft"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-primary-foreground/20"
                        : "bg-primary/10 group-hover:bg-primary/15 group-hover:scale-110"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        isSelected ? "text-primary-foreground" : "text-primary"
                      }`}
                    />
                  </div>
                  <div className="text-center">
                    <p
                      className={`font-medium text-sm ${
                        isSelected ? "text-primary-foreground" : ""
                      }`}
                    >
                      {category.name}
                    </p>
                    <p
                      className={`text-xs ${
                        isSelected
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {category.count} listings
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Companies Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {selectedCategory ? `${selectedCategory} Companies` : "All Companies"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredCompanies.length} results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                onClick={() => handleCompanyClick(company)}
                className="group card-premium overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-1">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{company.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {company.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {company.reviewCount} reviews
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {company.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {company.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-16">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No companies found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Company Modal */}
      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        company={selectedCompany}
      />

      {/* AI Chat Bubble */}
      <AIChatBubble />
    </div>
  );
};

export default Work;
