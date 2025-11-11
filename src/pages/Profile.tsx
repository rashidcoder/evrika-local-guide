import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock profile data - would come from auth in real app
  const [profileType] = useState<"seller" | "service" | "user">("seller");
  const [profileData, setProfileData] = useState({
    email: "john@example.com",
    companyName: "Tech Solutions",
    category: "it",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, USA",
    serviceType: "it",
    description: "Professional IT support and consulting services",
    name: "John Doe",
    interests: "Technology, Innovation",
  });

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/work" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Evrika</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-card border border-border rounded-lg p-8 animate-fade-in">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                My Profile
              </h1>
              <p className="text-muted-foreground capitalize">
                {profileType} Account
              </p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Email (common to all) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={!isEditing}
                className="bg-background disabled:opacity-50"
              />
            </div>

            {/* Seller-specific fields */}
            {profileType === "seller" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={profileData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    disabled={!isEditing}
                    className="bg-background disabled:opacity-50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={profileData.category}
                      onValueChange={(value) => handleChange("category", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-background disabled:opacity-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="it">IT Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className="bg-background disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    disabled={!isEditing}
                    className="bg-background disabled:opacity-50"
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
                    value={profileData.serviceType}
                    onValueChange={(value) => handleChange("serviceType", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-background disabled:opacity-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="taxi">Taxi Service</SelectItem>
                      <SelectItem value="it">IT Services</SelectItem>
                      <SelectItem value="events">Event Organizer</SelectItem>
                      <SelectItem value="education">Education Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={profileData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    disabled={!isEditing}
                    className="bg-background disabled:opacity-50 min-h-24"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="bg-background disabled:opacity-50"
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
                    value={profileData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    disabled={!isEditing}
                    className="bg-background disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests</Label>
                  <Input
                    id="interests"
                    value={profileData.interests}
                    onChange={(e) => handleChange("interests", e.target.value)}
                    disabled={!isEditing}
                    className="bg-background disabled:opacity-50"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
