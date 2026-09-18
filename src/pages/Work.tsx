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
    category: "Restaurants",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    description: "Cozy spot serving fresh, locally inspired dishes and great coffee.",
    rating: 4.3,
    reviewCount: 409,
    tags: ["WiFi", "Breakfast", "Family-friendly"],
  },
  {
    id: 2,
    name: "Italian Bistro",
    category: "Restaurants",
    logo: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
    description: "Cozy spot serving fresh, locally inspired dishes and great coffee.",
    rating: 4.8,
    reviewCount: 376,
    tags: ["Takeaway", "Family-friendly", "Coffee"],
  },
  {
    id: 3,
    name: "Chaykhona Navruz",
    category: "Restaurants",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    description: "Cozy spot serving fresh, locally inspired dishes and great coffee.",
    rating: 4.5,
    reviewCount: 45,
    tags: ["Coffee", "Breakfast", "Family-friendly"],
  },
  {
    id: 4,
    name: "Plov Markazi",
    category: "Restaurants",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    description: "Cozy spot serving fresh, locally inspired dishes and great coffee.",
    rating: 4.7,
    reviewCount: 317,
    tags: ["Breakfast", "Family-friendly", "Local"],
  },
  {
    id: 5,
    name: "Osiyo Grill",
    category: "Restaurants",
    logo: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
    description: "Cozy spot serving fresh, locally inspired dishes and great coffee.",
    rating: 4.6,
    reviewCount: 172,
    tags: ["Coffee", "Breakfast", "Local"],
  },
  {
    id: 6,
    name: "Tech Solutions Pro",
    category: "IT Services",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    description: "Professional IT support, web development, and cloud solutions for growing businesses.",
    rating: 4.4,
    reviewCount: 140,
    tags: ["Cloud", "Development", "Design"],
  },
  {
    id: 7,
    name: "CodeCraft Studio",
    category: "IT Services",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    description: "Professional IT support, web development, and cloud solutions for growing businesses.",
    rating: 4.3,
    reviewCount: 463,
    tags: ["Cloud", "Mobile", "Development"],
  },
  {
    id: 8,
    name: "NextGen IT",
    category: "IT Services",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    description: "Professional IT support, web development, and cloud solutions for growing businesses.",
    rating: 4.6,
    reviewCount: 223,
    tags: ["Development", "Cloud", "Design"],
  },
  {
    id: 9,
    name: "PixelForge Dev",
    category: "IT Services",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    description: "Professional IT support, web development, and cloud solutions for growing businesses.",
    rating: 4.7,
    reviewCount: 390,
    tags: ["Development", "Mobile", "Cloud"],
  },
  {
    id: 10,
    name: "CloudNine Systems",
    category: "IT Services",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400",
    description: "Professional IT support, web development, and cloud solutions for growing businesses.",
    rating: 4.8,
    reviewCount: 70,
    tags: ["Support", "Development", "Mobile"],
  },
  {
    id: 11,
    name: "Wellness Studio",
    category: "Healthcare",
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
    description: "Friendly, professional care with modern equipment and experienced staff.",
    rating: 4.6,
    reviewCount: 457,
    tags: ["Clinic", "Wellness", "Dental"],
  },
  {
    id: 12,
    name: "MedCare Clinic",
    category: "Healthcare",
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
    description: "Friendly, professional care with modern equipment and experienced staff.",
    rating: 4.4,
    reviewCount: 166,
    tags: ["Yoga", "Wellness", "Clinic"],
  },
  {
    id: 13,
    name: "Family Health Center",
    category: "Healthcare",
    logo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    description: "Friendly, professional care with modern equipment and experienced staff.",
    rating: 4.3,
    reviewCount: 224,
    tags: ["Clinic", "Wellness", "Therapy"],
  },
  {
    id: 14,
    name: "VitaLife Diagnostics",
    category: "Healthcare",
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
    description: "Friendly, professional care with modern equipment and experienced staff.",
    rating: 4.9,
    reviewCount: 427,
    tags: ["Yoga", "Wellness", "Therapy"],
  },
  {
    id: 15,
    name: "Karakalpak Dental",
    category: "Healthcare",
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
    description: "Friendly, professional care with modern equipment and experienced staff.",
    rating: 4.5,
    reviewCount: 63,
    tags: ["Wellness", "Clinic", "Yoga"],
  },
  {
    id: 16,
    name: "Learn Academy",
    category: "Education",
    logo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
    description: "Practical courses and workshops to help you build real skills fast.",
    rating: 4.5,
    reviewCount: 359,
    tags: ["Kids", "Skills", "Languages"],
  },
  {
    id: 17,
    name: "Bright Minds School",
    category: "Education",
    logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    description: "Practical courses and workshops to help you build real skills fast.",
    rating: 4.4,
    reviewCount: 317,
    tags: ["Languages", "Career", "Kids"],
  },
  {
    id: 18,
    name: "IT Academy Nukus",
    category: "Education",
    logo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
    description: "Practical courses and workshops to help you build real skills fast.",
    rating: 4.9,
    reviewCount: 234,
    tags: ["Career", "Skills", "Courses"],
  },
  {
    id: 19,
    name: "Language Hub Center",
    category: "Education",
    logo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
    description: "Practical courses and workshops to help you build real skills fast.",
    rating: 4.3,
    reviewCount: 54,
    tags: ["Courses", "Skills", "Career"],
  },
  {
    id: 20,
    name: "Future Skills Institute",
    category: "Education",
    logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    description: "Practical courses and workshops to help you build real skills fast.",
    rating: 4.8,
    reviewCount: 246,
    tags: ["Languages", "Courses", "Skills"],
  },
  {
    id: 21,
    name: "Green Grocers",
    category: "Retail",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    description: "Quality products, fair prices, and friendly service every visit.",
    rating: 4.7,
    reviewCount: 269,
    tags: ["Electronics", "Local", "Fashion"],
  },
  {
    id: 22,
    name: "Style Boutique",
    category: "Retail",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    description: "Quality products, fair prices, and friendly service every visit.",
    rating: 4.7,
    reviewCount: 88,
    tags: ["Electronics", "Local", "Fashion"],
  },
  {
    id: 23,
    name: "Home Essentials Store",
    category: "Retail",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    description: "Quality products, fair prices, and friendly service every visit.",
    rating: 4.3,
    reviewCount: 252,
    tags: ["Fresh", "Fashion", "Organic"],
  },
  {
    id: 24,
    name: "TechMart Electronics",
    category: "Retail",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    description: "Quality products, fair prices, and friendly service every visit.",
    rating: 5.0,
    reviewCount: 420,
    tags: ["Fresh", "Organic", "Local"],
  },
  {
    id: 25,
    name: "Fresh Market Plus",
    category: "Retail",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    description: "Quality products, fair prices, and friendly service every visit.",
    rating: 4.9,
    reviewCount: 289,
    tags: ["Electronics", "Fresh", "Organic"],
  },
  {
    id: 26,
    name: "AutoCare Express",
    category: "Automotive",
    logo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
    description: "Fast, reliable service and maintenance for all vehicle types.",
    rating: 4.8,
    reviewCount: 306,
    tags: ["Repair", "Fast", "Maintenance"],
  },
  {
    id: 27,
    name: "SpeedFix Garage",
    category: "Automotive",
    logo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
    description: "Fast, reliable service and maintenance for all vehicle types.",
    rating: 4.2,
    reviewCount: 215,
    tags: ["Fast", "Repair", "Detailing"],
  },
  {
    id: 28,
    name: "Wheel World Service",
    category: "Automotive",
    logo: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    description: "Fast, reliable service and maintenance for all vehicle types.",
    rating: 4.9,
    reviewCount: 70,
    tags: ["Repair", "Fast", "Maintenance"],
  },
  {
    id: 29,
    name: "PrimeAuto Detailing",
    category: "Automotive",
    logo: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    description: "Fast, reliable service and maintenance for all vehicle types.",
    rating: 5.0,
    reviewCount: 302,
    tags: ["Maintenance", "Repair", "Detailing"],
  },
  {
    id: 30,
    name: "RoadReady Motors",
    category: "Automotive",
    logo: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    description: "Fast, reliable service and maintenance for all vehicle types.",
    rating: 4.4,
    reviewCount: 476,
    tags: ["Detailing", "Repair", "Fast"],
  },
  {
    id: 31,
    name: "Nukus Homes Realty",
    category: "Real Estate",
    logo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
    description: "Helping you find, buy, or rent the right property with confidence.",
    rating: 4.5,
    reviewCount: 373,
    tags: ["Apartments", "Buy", "Commercial"],
  },
  {
    id: 32,
    name: "Prime Estate Group",
    category: "Real Estate",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
    description: "Helping you find, buy, or rent the right property with confidence.",
    rating: 4.4,
    reviewCount: 62,
    tags: ["Apartments", "Rent", "Commercial"],
  },
  {
    id: 33,
    name: "CityView Properties",
    category: "Real Estate",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
    description: "Helping you find, buy, or rent the right property with confidence.",
    rating: 4.2,
    reviewCount: 392,
    tags: ["Rent", "Commercial", "Apartments"],
  },
  {
    id: 34,
    name: "Golden Key Realty",
    category: "Real Estate",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
    description: "Helping you find, buy, or rent the right property with confidence.",
    rating: 4.9,
    reviewCount: 66,
    tags: ["Buy", "Commercial", "Apartments"],
  },
  {
    id: 35,
    name: "Skyline Real Estate",
    category: "Real Estate",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
    description: "Helping you find, buy, or rent the right property with confidence.",
    rating: 4.6,
    reviewCount: 400,
    tags: ["Commercial", "Rent", "Buy"],
  },
  {
    id: 36,
    name: "Silk Road Travel",
    category: "Travel",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400",
    description: "Curated trips and local tours across Uzbekistan and beyond.",
    rating: 4.4,
    reviewCount: 79,
    tags: ["Booking", "Adventure", "Guides"],
  },
  {
    id: 37,
    name: "Karakalpakstan Tours",
    category: "Travel",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400",
    description: "Curated trips and local tours across Uzbekistan and beyond.",
    rating: 4.6,
    reviewCount: 403,
    tags: ["Tours", "Guides", "Booking"],
  },
  {
    id: 38,
    name: "Wanderlust Agency",
    category: "Travel",
    logo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    description: "Curated trips and local tours across Uzbekistan and beyond.",
    rating: 4.5,
    reviewCount: 203,
    tags: ["Tours", "Booking", "Guides"],
  },
  {
    id: 39,
    name: "Horizon Travel Co",
    category: "Travel",
    logo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    description: "Curated trips and local tours across Uzbekistan and beyond.",
    rating: 4.6,
    reviewCount: 101,
    tags: ["Booking", "Tours", "Adventure"],
  },
  {
    id: 40,
    name: "Nomad Trails",
    category: "Travel",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400",
    description: "Curated trips and local tours across Uzbekistan and beyond.",
    rating: 4.4,
    reviewCount: 68,
    tags: ["Booking", "Guides", "Tours"],
  },
  {
    id: 41,
    name: "Design Hub Agency",
    category: "Consulting",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
    description: "Strategic advice and hands-on support to help your business grow.",
    rating: 4.7,
    reviewCount: 306,
    tags: ["Design", "Growth", "Strategy"],
  },
  {
    id: 42,
    name: "Growth Partners Consulting",
    category: "Consulting",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
    description: "Strategic advice and hands-on support to help your business grow.",
    rating: 4.5,
    reviewCount: 276,
    tags: ["Branding", "Growth", "Design"],
  },
  {
    id: 43,
    name: "Bright Path Advisory",
    category: "Consulting",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
    description: "Strategic advice and hands-on support to help your business grow.",
    rating: 4.5,
    reviewCount: 229,
    tags: ["Strategy", "Branding", "Growth"],
  },
  {
    id: 44,
    name: "Apex Business Solutions",
    category: "Consulting",
    logo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400",
    description: "Strategic advice and hands-on support to help your business grow.",
    rating: 4.8,
    reviewCount: 404,
    tags: ["Growth", "Design", "Strategy"],
  },
  {
    id: 45,
    name: "Strategy Works",
    category: "Consulting",
    logo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400",
    description: "Strategic advice and hands-on support to help your business grow.",
    rating: 4.4,
    reviewCount: 59,
    tags: ["Design", "Strategy", "Branding"],
  },
  {
    id: 46,
    name: "Sunshine Laundry",
    category: "Other",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    description: "Reliable local service you can count on, every time.",
    rating: 4.2,
    reviewCount: 274,
    tags: ["Reliable", "Local", "Service"],
  },
  {
    id: 47,
    name: "Pet Care Corner",
    category: "Other",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    description: "Reliable local service you can count on, every time.",
    rating: 4.9,
    reviewCount: 65,
    tags: ["Reliable", "Local", "Service"],
  },
  {
    id: 48,
    name: "EventPro Planners",
    category: "Other",
    logo: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400",
    description: "Reliable local service you can count on, every time.",
    rating: 4.3,
    reviewCount: 321,
    tags: ["Local", "Reliable", "Service"],
  },
  {
    id: 49,
    name: "FixIt Repair Shop",
    category: "Other",
    logo: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400",
    description: "Reliable local service you can count on, every time.",
    rating: 4.7,
    reviewCount: 319,
    tags: ["Reliable", "Service", "Local"],
  },
  {
    id: 50,
    name: "CleanHome Services",
    category: "Other",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    description: "Reliable local service you can count on, every time.",
    rating: 4.7,
    reviewCount: 190,
    tags: ["Local", "Service", "Reliable"],
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
