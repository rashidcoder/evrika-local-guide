import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ArrowRight,
  Sparkles,
  Building2,
  Eye,
  BarChart3,
  GitCompare,
  Shield,
  Zap,
  Target,
  Bot,
  ChevronRight,
  Star,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find exactly what you need with our intelligent search engine",
    },
    {
      icon: Eye,
      title: "Detailed View",
      description: "Get comprehensive information about any business",
    },
    {
      icon: BarChart3,
      title: "AI Analysis",
      description: "Powered insights to help you make better decisions",
    },
    {
      icon: GitCompare,
      title: "Easy Compare",
      description: "Compare businesses side by side effortlessly",
    },
  ];

  const benefits = [
    { icon: Zap, title: "Lightning Fast", description: "Results in milliseconds" },
    { icon: Target, title: "Accurate Data", description: "Verified information" },
    { icon: Shield, title: "Trustworthy", description: "500+ companies listed" },
    { icon: Bot, title: "AI Powered", description: "Smart recommendations" },
  ];

  const featuredCompanies = [
    {
      id: 1,
      name: "Tech Solutions",
      category: "IT Services",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400",
    },
    {
      id: 2,
      name: "Sunrise Cafe",
      category: "Restaurant",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
    },
    {
      id: 3,
      name: "Wellness Studio",
      category: "Health",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    },
    {
      id: 4,
      name: "Design Hub",
      category: "Creative",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-300" />

        {/* Navbar */}
        <header className="relative z-10 container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold">Evrika</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="btn-glow">Get Started</Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              AI-Powered Business Discovery
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in">
              Find anything.
              <br />
              <span className="gradient-text">Anytime.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in animation-delay-100">
              Discover trusted local businesses with AI-powered insights. From cafes to
              tech services, find exactly what you need in seconds.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in animation-delay-200">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for companies, services, or categories..."
                  className="h-14 pl-14 pr-36 text-base rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-soft transition-all"
                />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl h-10 px-6">
                  Search
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in animation-delay-300">
              <Link to="/work">
                <Button size="lg" className="gap-2 btn-glow px-8">
                  Explore Companies
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 px-8">
                <Sparkles className="h-4 w-4" />
                Try AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple. Fast. Intelligent.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes discovering businesses effortless with AI-powered features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group card-premium p-6 text-center opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Evrika */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Why Evrika
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The smarter way to discover businesses
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                We combine cutting-edge AI technology with comprehensive business data
                to help you make informed decisions faster than ever before.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{benefit.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
              <div className="relative bg-card rounded-3xl border p-8 shadow-large">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold gradient-text mb-2">500+</div>
                  <p className="text-muted-foreground">Trusted Companies</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <div className="text-2xl font-bold">10K+</div>
                    <p className="text-xs text-muted-foreground">Active Users</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <div className="text-2xl font-bold">50K+</div>
                    <p className="text-xs text-muted-foreground">Reviews</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <div className="text-2xl font-bold">99%</div>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Rated 4.9 out of 5 by our users
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <Badge variant="outline" className="mb-3">
                Featured
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">
                Popular Companies
              </h2>
            </div>
            <Link to="/work">
              <Button variant="ghost" className="gap-2">
                View all
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCompanies.map((company, index) => (
              <Link
                key={company.id}
                to="/work"
                className="group card-premium overflow-hidden opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{company.rating}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {company.category}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-purple-600 opacity-90" />
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to discover amazing businesses?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Join thousands of users who trust Evrika for their business discovery needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90 px-8"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/work">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-primary-foreground hover:bg-white/10 px-8"
                  >
                    Explore Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold">Evrika</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                Discover trusted local businesses with AI-powered insights.
              </p>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/work" className="hover:text-primary transition-colors">Explore</Link></li>
                <li><Link to="/work" className="hover:text-primary transition-colors">Categories</Link></li>
                <li><Link to="/work" className="hover:text-primary transition-colors">AI Assistant</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Evrika. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <span className="text-red-500">♥</span>
              <span>for local businesses</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
