import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Building2, ArrowLeft, Save, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import MultilingualEditor from "@/components/MultilingualEditor";
import DiscountManager from "@/components/DiscountManager";

interface Business {
  id: string;
  category: string;
  name_uz: string;
  name_qq: string | null;
  name_ru: string | null;
  name_en: string | null;
  description_uz: string | null;
  description_qq: string | null;
  description_ru: string | null;
  description_en: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
}

const categories = [
  "Restaurant",
  "Education",
  "IT Services",
  "Hotel",
  "Taxi",
  "Market",
  "Events",
  "Healthcare",
  "Other",
];

const BusinessAdmin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    category: "Restaurant",
    name_uz: "",
    name_qq: "",
    name_ru: "",
    name_en: "",
    description_uz: "",
    description_qq: "",
    description_ru: "",
    description_en: "",
    phone: "",
    email: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchBusinesses();
    }
  }, [user, authLoading, navigate]);

  const fetchBusinesses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("owner_id", user!.id);

    if (error) {
      console.error("Error fetching businesses:", error);
    } else {
      setBusinesses(data || []);
      if (data && data.length > 0 && !selectedBusiness) {
        selectBusiness(data[0]);
      }
    }
    setLoading(false);
  };

  const selectBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setIsCreating(false);
    setFormData({
      category: business.category,
      name_uz: business.name_uz,
      name_qq: business.name_qq || "",
      name_ru: business.name_ru || "",
      name_en: business.name_en || "",
      description_uz: business.description_uz || "",
      description_qq: business.description_qq || "",
      description_ru: business.description_ru || "",
      description_en: business.description_en || "",
      phone: business.phone || "",
      email: business.email || "",
      address: business.address || "",
      latitude: business.latitude?.toString() || "",
      longitude: business.longitude?.toString() || "",
    });
  };

  const startCreating = () => {
    setIsCreating(true);
    setSelectedBusiness(null);
    setFormData({
      category: "Restaurant",
      name_uz: "",
      name_qq: "",
      name_ru: "",
      name_en: "",
      description_uz: "",
      description_qq: "",
      description_ru: "",
      description_en: "",
      phone: "",
      email: "",
      address: "",
      latitude: "",
      longitude: "",
    });
  };

  const handleSave = async () => {
    if (!formData.name_uz.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a business name in Uzbek.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        owner_id: user!.id,
        category: formData.category,
        name_uz: formData.name_uz,
        name_qq: formData.name_qq || null,
        name_ru: formData.name_ru || null,
        name_en: formData.name_en || null,
        description_uz: formData.description_uz || null,
        description_qq: formData.description_qq || null,
        description_ru: formData.description_ru || null,
        description_en: formData.description_en || null,
        phone: formData.phone || null,
        email: formData.email || null,
        address: formData.address || null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      };

      if (isCreating) {
        const { data, error } = await supabase.from("businesses").insert(payload).select().single();
        if (error) throw error;
        toast({ title: "Business Created", description: "Your business has been created successfully." });
        setIsCreating(false);
        fetchBusinesses();
      } else if (selectedBusiness) {
        const { error } = await supabase.from("businesses").update(payload).eq("id", selectedBusiness.id);
        if (error) throw error;
        toast({ title: "Business Updated", description: "Your changes have been saved." });
        fetchBusinesses();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save business.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/work")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Evrika</span>
          </Link>
          <span className="text-muted-foreground">Business Admin</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-4">
            <Button onClick={startCreating} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Business
            </Button>
            <div className="space-y-2">
              {businesses.map((business) => (
                <Card
                  key={business.id}
                  className={`cursor-pointer transition-all ${
                    selectedBusiness?.id === business.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => selectBusiness(business)}
                >
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground">{business.name_en || business.name_uz}</h4>
                    <p className="text-sm text-muted-foreground">{business.category}</p>
                  </CardContent>
                </Card>
              ))}
              {businesses.length === 0 && !isCreating && (
                <p className="text-center text-muted-foreground py-4">
                  No businesses yet. Create your first one!
                </p>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {(selectedBusiness || isCreating) ? (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>{isCreating ? "Create New Business" : "Edit Business"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="info" className="w-full">
                    <TabsList className="bg-background border border-border mb-6">
                      <TabsTrigger value="info">Basic Info</TabsTrigger>
                      <TabsTrigger value="multilingual">Languages</TabsTrigger>
                      {!isCreating && selectedBusiness && (
                        <TabsTrigger value="discounts">Discounts</TabsTrigger>
                      )}
                    </TabsList>

                    <TabsContent value="info" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                          >
                            <SelectTrigger className="bg-background">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+998 XX XXX XX XX"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="contact@business.com"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Street, City"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="latitude">Latitude</Label>
                          <Input
                            id="latitude"
                            type="number"
                            step="any"
                            value={formData.latitude}
                            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                            placeholder="42.4614"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="longitude">Longitude</Label>
                          <Input
                            id="longitude"
                            type="number"
                            step="any"
                            value={formData.longitude}
                            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                            placeholder="59.6063"
                            className="bg-background"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="multilingual">
                      <MultilingualEditor
                        data={{
                          name_uz: formData.name_uz,
                          name_qq: formData.name_qq,
                          name_ru: formData.name_ru,
                          name_en: formData.name_en,
                          description_uz: formData.description_uz,
                          description_qq: formData.description_qq,
                          description_ru: formData.description_ru,
                          description_en: formData.description_en,
                        }}
                        onChange={(data) => setFormData({ ...formData, ...data })}
                      />
                    </TabsContent>

                    {!isCreating && selectedBusiness && (
                      <TabsContent value="discounts">
                        <DiscountManager businessId={selectedBusiness.id} />
                      </TabsContent>
                    )}
                  </Tabs>

                  <div className="flex justify-end mt-6">
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                      {isCreating ? "Create Business" : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                Select a business or create a new one to get started
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessAdmin;
