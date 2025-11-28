import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Building2, ArrowLeft, MessageCircle, MapPin, Phone, Mail, Clock, Star, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import ReviewSection from "@/components/ReviewSection";
import DiscountCard from "@/components/DiscountCard";
import type { Tables } from "@/integrations/supabase/types";

type Business = Tables<"businesses">;
type Discount = Tables<"discounts">;

const BusinessProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState<"uz" | "qq" | "ru" | "en">("uz");

  useEffect(() => {
    if (id) {
      fetchBusiness();
      fetchDiscounts();
      fetchReviewStats();
    }
  }, [id]);

  const fetchBusiness = async () => {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setBusiness(data);
    }
    setLoading(false);
  };

  const fetchDiscounts = async () => {
    const { data } = await supabase
      .from("discounts")
      .select("*")
      .eq("business_id", id)
      .eq("is_active", true)
      .gte("end_date", new Date().toISOString());

    if (data) {
      setDiscounts(data);
    }
  };

  const fetchReviewStats = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("rating")
      .eq("business_id", id);

    if (data && data.length > 0) {
      const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
      setAverageRating(Math.round(avg * 10) / 10);
      setReviewCount(data.length);
    }
  };

  const getName = () => {
    if (!business) return "";
    switch (currentLang) {
      case "uz": return business.name_uz;
      case "qq": return business.name_qq || business.name_uz;
      case "ru": return business.name_ru || business.name_uz;
      case "en": return business.name_en || business.name_uz;
    }
  };

  const getDescription = () => {
    if (!business) return "";
    switch (currentLang) {
      case "uz": return business.description_uz;
      case "qq": return business.description_qq || business.description_uz;
      case "ru": return business.description_ru || business.description_uz;
      case "en": return business.description_en || business.description_uz;
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
          <h1 className="text-2xl font-bold text-foreground mb-4">Business not found</h1>
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
          <div className="flex items-center gap-2">
            {(["uz", "qq", "ru", "en"] as const).map((lang) => (
              <Button
                key={lang}
                variant={currentLang === lang ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentLang(lang)}
                className="uppercase text-xs"
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Business Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {business.logo_url && (
                  <img
                    src={business.logo_url}
                    alt={getName() || ""}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">{getName()}</h1>
                      <Badge variant="secondary" className="mt-1">{business.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="font-semibold">{averageRating || "N/A"}</span>
                      <span className="text-muted-foreground text-sm">({reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{getDescription()}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {business.address && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{business.address}</span>
                      </div>
                    )}
                    {business.phone && (
                      <a href={`tel:${business.phone}`} className="flex items-center gap-1 hover:text-primary">
                        <Phone className="h-4 w-4" />
                        <span>{business.phone}</span>
                      </a>
                    )}
                    {business.email && (
                      <a href={`mailto:${business.email}`} className="flex items-center gap-1 hover:text-primary">
                        <Mail className="h-4 w-4" />
                        <span>{business.email}</span>
                      </a>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className={business.is_open ? "text-green-400" : "text-red-400"}>
                        {business.is_open ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <Link to={`/chat/${business.id}`} className="flex-1 md:flex-none">
                  <Button className="w-full md:w-auto">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with Business
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Special Offers */}
          {discounts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-primary" />
                  Special Offers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {discounts.map((discount) => (
                    <DiscountCard key={discount.id} discount={discount} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reviews */}
          <ReviewSection businessId={business.id} onReviewAdded={fetchReviewStats} />
        </div>
      </main>
    </div>
  );
};

export default BusinessProfile;
