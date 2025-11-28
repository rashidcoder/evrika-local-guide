import { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Business = Tables<"businesses">;

interface BusinessWithDistance extends Business {
  distance: number;
}

const NearbyRecommendations = () => {
  const [nearbyBusinesses, setNearbyBusinesses] = useState<BusinessWithDistance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyBusinesses();
    }
  }, [userLocation]);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setError("Unable to get your location. Showing featured businesses instead.");
        fetchFeaturedBusinesses();
      }
    );
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchNearbyBusinesses = async () => {
    if (!userLocation) return;

    const { data } = await supabase
      .from("businesses")
      .select("*")
      .not("latitude", "is", null)
      .not("longitude", "is", null);

    if (data) {
      const withDistance = data
        .map((business) => ({
          ...business,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            business.latitude!,
            business.longitude!
          ),
        }))
        .filter((b) => b.distance <= 1) // Within 1 km
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      setNearbyBusinesses(withDistance);
    }
    setLoading(false);
  };

  const fetchFeaturedBusinesses = async () => {
    const { data } = await supabase
      .from("businesses")
      .select("*")
      .eq("is_open", true)
      .limit(3);

    if (data) {
      setNearbyBusinesses(data.map((b) => ({ ...b, distance: 0 })));
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Navigation className="h-4 w-4 animate-pulse" />
            <span>Finding nearby places...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Nearby Recommendations
        </CardTitle>
        {error && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {nearbyBusinesses.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No businesses found nearby
          </p>
        ) : (
          <div className="space-y-4">
            {nearbyBusinesses.map((business) => (
              <Link
                key={business.id}
                to={`/business/${business.id}`}
                className="block"
              >
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-card-hover transition-colors">
                  {business.logo_url ? (
                    <img
                      src={business.logo_url}
                      alt={business.name_uz}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">
                      {business.name_uz}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {business.category}
                      </Badge>
                      {business.distance > 0 && (
                        <span className="flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          {business.distance < 1
                            ? `${Math.round(business.distance * 1000)}m`
                            : `${business.distance.toFixed(1)}km`}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span
                      className={`text-xs ${
                        business.is_open ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {business.is_open ? "Open" : "Closed"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {userLocation && (
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={() => {
              setLoading(true);
              fetchNearbyBusinesses();
            }}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Refresh Location
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyRecommendations;
