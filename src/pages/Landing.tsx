import { Button } from "@/components/ui/button";
import { Building2, Users, Calendar, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Evrika</span>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-hero-from to-hero-to opacity-50" />
        <div className="container mx-auto px-4 py-24 relative z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Discover Trusted Local Businesses
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with the best restaurants, services, and companies in your city. 
            Find exactly what you need, all in one place.
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Evrika</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Evrika is your comprehensive directory for discovering and connecting with 
              local businesses. From restaurants and education centers to IT parks and 
              event organizers, we bring together the best of what your city has to offer.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 text-left">
              <h3 className="text-xl font-semibold text-foreground mb-3">Our Company</h3>
              <p className="text-muted-foreground">
                Founded with a mission to support local economies, Evrika provides a 
                platform where businesses can showcase their services and customers can 
                make informed decisions. We believe in transparency, quality, and 
                community growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-8 text-center hover:bg-card-hover transition-colors">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-foreground mb-2">500+</div>
              <div className="text-muted-foreground">Companies</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center hover:bg-card-hover transition-colors">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-foreground mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center hover:bg-card-hover transition-colors">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-foreground mb-2">3+</div>
              <div className="text-muted-foreground">Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 flex items-center gap-4">
                <Mail className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="text-foreground font-medium">support@evrika.com</div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 flex items-center gap-4">
                <Phone className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="text-foreground font-medium">+1 (555) 123-4567</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
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
            <div className="text-sm text-muted-foreground">
              © 2025 Evrika. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
