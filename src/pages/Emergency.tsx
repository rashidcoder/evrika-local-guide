import { Building2, Phone, MapPin, Shield, Flame, Heart, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const emergencyServices = [
  {
    id: 1,
    name: "Police (Militsiya)",
    nameQq: "Politsiya",
    phone: "102",
    address: "Nukus, Karakalpakstan",
    icon: Shield,
    color: "text-blue-400",
  },
  {
    id: 2,
    name: "Ambulance (Tez yordam)",
    nameQq: "Tez járdem",
    phone: "103",
    address: "Nukus Medical Center",
    icon: Heart,
    color: "text-red-400",
  },
  {
    id: 3,
    name: "Fire Department (Oʻt oʻchiruvchilar)",
    nameQq: "Ótshiriwshiler",
    phone: "101",
    address: "Nukus Fire Station",
    icon: Flame,
    color: "text-orange-400",
  },
  {
    id: 4,
    name: "Gas Emergency",
    nameQq: "Gaz qutqarıw",
    phone: "104",
    address: "Nukus Gas Service",
    icon: Flame,
    color: "text-yellow-400",
  },
  {
    id: 5,
    name: "Embassy of Russia",
    nameQq: "Rossiya elshiligi",
    phone: "+998 71 120 35 02",
    address: "Tashkent, Nukus str. 83",
    icon: Flag,
    color: "text-primary",
  },
  {
    id: 6,
    name: "Embassy of Kazakhstan",
    nameQq: "Qazaqstan elshiligi",
    phone: "+998 71 233 01 64",
    address: "Tashkent, Chilonzor-6",
    icon: Flag,
    color: "text-cyan-400",
  },
];

const Emergency = () => {
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Áhmietli Xizmetler
          </h1>
          <p className="text-muted-foreground">
            Emergency Services / Favqulodda xizmatlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {emergencyServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.id}
                className="hover:bg-card-hover transition-colors animate-fade-in"
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className={`p-3 rounded-lg bg-secondary ${service.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-foreground">
                      {service.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{service.nameQq}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href={`tel:${service.phone}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold">{service.phone}</span>
                  </a>
                  <div className="flex items-start gap-2 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{service.address}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Emergency;
