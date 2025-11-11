import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Store, Wrench, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProfileType = "seller" | "service" | "user" | null;

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [profileType, setProfileType] = useState<ProfileType>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    category: "",
    phone: "",
    location: "",
    serviceType: "",
    description: "",
    name: "",
    interests: "",
  });

  const handleProfileTypeSelect = (type: ProfileType) => {
    setProfileType(type);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration successful!",
      description: "Welcome to Evrika. Redirecting to your dashboard...",
    });
    setTimeout(() => navigate("/work"), 1500);
  };

  const handleInputChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Building2 className="h-10 w-10 text-primary" />
          <span className="text-3xl font-bold text-foreground">Evrika</span>
        </Link>

        {/* Registration Card */}
        <div className="bg-card border border-border rounded-lg p-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-6">
            {step === 1
              ? "Choose your profile type to get started"
              : "Complete your profile information"}
          </p>

          {/* Step 1: Profile Type Selection */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleProfileTypeSelect("seller")}
                className="bg-secondary border border-border rounded-lg p-6 text-center hover:bg-card-hover transition-colors group"
              >
                <Store className="h-12 w-12 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Seller</h3>
                <p className="text-sm text-muted-foreground">
                  List your products and reach more customers
                </p>
              </button>

              <button
                onClick={() => handleProfileTypeSelect("service")}
                className="bg-secondary border border-border rounded-lg p-6 text-center hover:bg-card-hover transition-colors group"
              >
                <Wrench className="h-12 w-12 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Service</h3>
                <p className="text-sm text-muted-foreground">
                  Offer your services to local community
                </p>
              </button>

              <button
                onClick={() => handleProfileTypeSelect("user")}
                className="bg-secondary border border-border rounded-lg p-6 text-center hover:bg-card-hover transition-colors group"
              >
                <User className="h-12 w-12 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-foreground mb-2">User</h3>
                <p className="text-sm text-muted-foreground">
                  Explore and discover local businesses
                </p>
              </button>
            </div>
          )}

          {/* Step 2: Profile Information */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-background"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="bg-background"
                    required
                  />
                </div>
              </div>

              {/* Seller-specific fields */}
              {profileType === "seller" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Your Company Name"
                      value={formData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      className="bg-background"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="market">Market</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-background"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="bg-background"
                      required
                    />
                  </div>
                </>
              )}

              {/* Service-specific fields */}
              {profileType === "service" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select
                      onValueChange={(value) => handleInputChange("serviceType", value)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="taxi">Taxi Service</SelectItem>
                        <SelectItem value="it">IT Services</SelectItem>
                        <SelectItem value="events">Event Organizer</SelectItem>
                        <SelectItem value="education">Education Center</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your service..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="bg-background min-h-24"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-background"
                      required
                    />
                  </div>
                </>
              )}

              {/* User-specific fields */}
              {profileType === "user" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests (optional)</Label>
                    <Input
                      id="interests"
                      placeholder="e.g., Dining, Technology, Education"
                      value={formData.interests}
                      onChange={(e) => handleInputChange("interests", e.target.value)}
                      className="bg-background"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Create Account
                </Button>
              </div>
            </form>
          )}

          {step === 1 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
