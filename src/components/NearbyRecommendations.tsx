import { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Business {
  id: string;
  name_uz: string;
  name_en: string | null;
  category: string;
  is_open: boolean;
  latitude: number | null;
  longitude: number | null;
  distance?: number;
}

const NearbyRecommendations = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchNearbyBusinesses = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name_uz, name_en, category, is_open, latitude, longitude");

      if (error) throw error;

      const nearby = (data || [])
        .filter((b) => b.latitude && b.longitude)
        .map((b) => ({
          ...b,
          distance: calculateDistance(lat, lng, Number(b.latitude), Number(b.longitude)),
        }))
        .filter((b) => b.distance <= 1)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      setBusinesses(nearby);
    } catch (err) {
      console.error("Error fetching businesses:", err);
    } finally {
      setLoading(false);
    }
  };

  const requestLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        fetchNearbyBusinesses(latitude, longitude);
      },
      (err) => {
        setError("Unable to get your location. Please enable location services.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  if (error) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={requestLocation} variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Enable Location
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Finding nearby places...</p>
        </CardContent>
      </Card>
    );
  }

  if (businesses.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No businesses found within 1 km</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Nearby Recommendations</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {businesses.map((business) => (
          <Card key={business.id} className="bg-card border-border hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-1">
                {business.name_en || business.name_uz}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">{business.category}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {business.distance?.toFixed(2)} km
                </span>
                <span className={`flex items-center gap-1 ${business.is_open ? "text-green-500" : "text-red-500"}`}>
                  <Clock className="h-3 w-3" />
                  {business.is_open ? "Open" : "Closed"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NearbyRecommendations;
