import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, ArrowLeft, Languages, Percent, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DiscountForm from "@/components/DiscountForm";
import type { Tables } from "@/integrations/supabase/types";

type Business = Tables<"businesses">;
type Discount = Tables<"discounts">;

const BusinessAdmin = () => {
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [currentLang, setCurrentLang] = useState<"uz" | "qq" | "ru" | "en">("uz");
  const [showDiscountForm, setShowDiscountForm] = useState(false);

  const [formData, setFormData] = useState({
    name_uz: "",
    name_qq: "",
    name_ru: "",
    name_en: "",
    description_uz: "",
    description_qq: "",
    description_ru: "",
    description_en: "",
  });

  useEffect(() => {
    fetchMyBusiness();
  }, []);

  const fetchMyBusiness = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("businesses")
      .select("*")
      .eq("owner_id", user.id)
      .single();

    if (data) {
      setBusiness(data);
      setFormData({
        name_uz: data.name_uz || "",
        name_qq: data.name_qq || "",
        name_ru: data.name_ru || "",
        name_en: data.name_en || "",
        description_uz: data.description_uz || "",
        description_qq: data.description_qq || "",
        description_ru: data.description_ru || "",
        description_en: data.description_en || "",
      });
      fetchDiscounts(data.id);
    }
    setLoading(false);
  };

  const fetchDiscounts = async (businessId: string) => {
    const { data } = await supabase
      .from("discounts")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });

    if (data) setDiscounts(data);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!business) return;
    setSaving(true);

    const { error } = await supabase
      .from("businesses")
      .update(formData)
      .eq("id", business.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Business profile updated",
      });
    }
    setSaving(false);
  };

  const handleAutoTranslate = async () => {
    if (!formData.name_uz && !formData.description_uz) {
      toast({
        title: "Error",
        description: "Please enter Uzbek name and description first",
        variant: "destructive",
      });
      return;
    }

    setTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke("translate", {
        body: {
          name: formData.name_uz,
          description: formData.description_uz,
        },
      });

      if (error) throw error;

      if (data) {
        setFormData((prev) => ({
          ...prev,
          name_qq: data.name_qq || prev.name_qq,
          name_ru: data.name_ru || prev.name_ru,
          name_en: data.name_en || prev.name_en,
          description_qq: data.description_qq || prev.description_qq,
          description_ru: data.description_ru || prev.description_ru,
          description_en: data.description_en || prev.description_en,
        }));
        toast({
          title: "Translated",
          description: "Content has been auto-translated",
        });
      }
    } catch {
      toast({
        title: "Translation failed",
        description: "Could not auto-translate content",
        variant: "destructive",
      });
    }
    setTranslating(false);
  };

  const deleteDiscount = async (discountId: string) => {
    const { error } = await supabase.from("discounts").delete().eq("id", discountId);
    if (!error) {
      setDiscounts((prev) => prev.filter((d) => d.id !== discountId));
      toast({ title: "Discount deleted" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">No Business Found</h1>
          <p className="text-muted-foreground mb-4">You need to create a business profile first</p>
          <Link to="/work">
            <Button>Go Back</Button>
          </Link>
        </div>
      </div>
    );
  }

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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="multilingual" className="space-y-6">
          <TabsList className="w-full justify-start bg-card border border-border">
            <TabsTrigger value="multilingual" className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              Multilingual
            </TabsTrigger>
            <TabsTrigger value="discounts" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Discounts
            </TabsTrigger>
          </TabsList>

          {/* Multilingual Tab */}
          <TabsContent value="multilingual" className="animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-primary" />
                    4-Language Module
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={handleAutoTranslate}
                    disabled={translating}
                  >
                    {translating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Auto Translate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Language Tabs */}
                <div className="flex gap-2 mb-6">
                  {(["uz", "qq", "ru", "en"] as const).map((lang) => (
                    <Button
                      key={lang}
                      variant={currentLang === lang ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentLang(lang)}
                      className="uppercase"
                    >
                      {lang}
                    </Button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name ({currentLang.toUpperCase()})</Label>
                    <Input
                      id="name"
                      value={formData[`name_${currentLang}`]}
                      onChange={(e) => handleChange(`name_${currentLang}`, e.target.value)}
                      placeholder={`Enter name in ${currentLang.toUpperCase()}`}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description ({currentLang.toUpperCase()})</Label>
                    <Textarea
                      id="description"
                      value={formData[`description_${currentLang}`]}
                      onChange={(e) => handleChange(`description_${currentLang}`, e.target.value)}
                      placeholder={`Enter description in ${currentLang.toUpperCase()}`}
                      className="bg-background min-h-32"
                    />
                  </div>

                  <Button onClick={handleSave} disabled={saving} className="w-full">
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discounts Tab */}
          <TabsContent value="discounts" className="animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5 text-primary" />
                    Discounts & Offers
                  </CardTitle>
                  <Button onClick={() => setShowDiscountForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Discount
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showDiscountForm && (
                  <DiscountForm
                    businessId={business.id}
                    onSuccess={() => {
                      setShowDiscountForm(false);
                      fetchDiscounts(business.id);
                    }}
                    onCancel={() => setShowDiscountForm(false)}
                  />
                )}

                {discounts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No discounts yet. Create your first offer!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {discounts.map((discount) => (
                      <div
                        key={discount.id}
                        className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                      >
                        <div>
                          <h4 className="font-semibold text-foreground">{discount.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {discount.discount_type === "percentage"
                              ? `${discount.discount_value}% off`
                              : `$${discount.discount_value} off`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Valid until {new Date(discount.end_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteDiscount(discount.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BusinessAdmin;
