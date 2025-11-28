import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Building2, Phone, Mail, MapPin, Clock, Percent, DollarSign, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import ReviewSection from "@/components/ReviewSection";
import ChatButton from "@/components/ChatButton";

interface Business {
  id: string;
  category: string;
  name_uz: string;
  name_en: string | null;
  description_uz: string | null;
  description_en: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  is_open: boolean;
}

interface Discount {
  id: string;
  title: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  end_date: string;
}

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBusiness();
      fetchDiscounts();
    }
  }, [id]);

  const fetchBusiness = async () => {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching business:", error);
    } else {
      setBusiness(data);
    }
    setLoading(false);
  };

  const fetchDiscounts = async () => {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("discounts")
      .select("*")
      .eq("business_id", id)
      .eq("is_active", true)
      .gte("end_date", now)
      .lte("start_date", now);

    if (error) {
      console.error("Error fetching discounts:", error);
    } else {
      setDiscounts(data || []);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Business not found</p>
      </div>
    );
  }

  const name = business.name_en || business.name_uz;
  const description = business.description_en || business.description_uz;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Evrika</span>
          </Link>
          <Link to="/work" className="text-muted-foreground hover:text-primary transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Business Info */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 bg-primary/20 rounded-xl flex items-center justify-center">
                <Building2 className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">{name}</h1>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{business.category}</Badge>
                      <span className={`flex items-center gap-1 text-sm ${business.is_open ? "text-green-500" : "text-red-500"}`}>
                        <Clock className="h-4 w-4" />
                        {business.is_open ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>
                  <ChatButton businessId={business.id} />
                </div>
                {description && <p className="text-muted-foreground mb-4">{description}</p>}
                <div className="flex flex-wrap gap-4 text-sm">
                  {business.phone && (
                    <a href={`tel:${business.phone}`} className="flex items-center gap-2 text-foreground hover:text-primary">
                      <Phone className="h-4 w-4" />
                      {business.phone}
                    </a>
                  )}
                  {business.email && (
                    <a href={`mailto:${business.email}`} className="flex items-center gap-2 text-foreground hover:text-primary">
                      <Mail className="h-4 w-4" />
                      {business.email}
                    </a>
                  )}
                  {business.address && (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {business.address}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Offers */}
        {discounts.length > 0 && (
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-primary" />
                Special Offers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {discounts.map((discount) => (
                <div key={discount.id} className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-foreground">{discount.title}</h4>
                    {discount.description && (
                      <p className="text-sm text-muted-foreground">{discount.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-primary font-bold text-lg">
                    {discount.discount_type === "percentage" ? (
                      <>
                        <Percent className="h-5 w-5" />
                        {discount.discount_value}
                      </>
                    ) : (
                      <>
                        <DollarSign className="h-5 w-5" />
                        {discount.discount_value}
                      </>
                    )}
                    <span className="text-sm font-normal ml-1">off</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Reviews Section */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <ReviewSection businessId={business.id} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BusinessDetail;
