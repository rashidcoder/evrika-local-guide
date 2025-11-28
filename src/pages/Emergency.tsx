import { Link } from "react-router-dom";
import { Building2, Phone, MapPin, AlertTriangle, Ambulance, Flame, Shield, Flag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const emergencyServices = [
  {
    id: 1,
    name: "Police",
    nameUz: "Militsiya",
    phone: "102",
    address: "Nukus, Karakalpakstan",
    icon: Shield,
    description: "Law enforcement emergency services",
    color: "text-blue-500",
  },
  {
    id: 2,
    name: "Ambulance",
    nameUz: "Tez yordam",
    phone: "103",
    address: "Medical Emergency Response",
    icon: Ambulance,
    description: "Medical emergency services",
    color: "text-red-500",
  },
  {
    id: 3,
    name: "Fire Department",
    nameUz: "O't o'chirish xizmati",
    phone: "101",
    address: "Fire Emergency Response",
    icon: Flame,
    description: "Fire and rescue services",
    color: "text-orange-500",
  },
  {
    id: 4,
    name: "Emergency Services",
    nameUz: "Favqulodda vaziyatlar",
    phone: "1050",
    address: "General Emergency Line",
    icon: AlertTriangle,
    description: "General emergency coordination",
    color: "text-yellow-500",
  },
  {
    id: 5,
    name: "US Embassy",
    nameUz: "AQSh elchixonasi",
    phone: "+998 78 120 5450",
    address: "Tashkent, Uzbekistan",
    icon: Flag,
    description: "American citizens assistance",
    color: "text-primary",
  },
  {
    id: 6,
    name: "Russian Embassy",
    nameUz: "Rossiya elchixonasi",
    phone: "+998 71 120 3502",
    address: "Tashkent, Uzbekistan",
    icon: Flag,
    description: "Russian citizens assistance",
    color: "text-primary",
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

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/20 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Áhmietli Xizmetler</h1>
          <p className="text-xl text-muted-foreground">Emergency Services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {emergencyServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="bg-card border-border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-background ${service.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription>{service.nameUz}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <div className="flex items-center gap-2 text-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    <a
                      href={`tel:${service.phone}`}
                      className="font-semibold hover:text-primary transition-colors"
                    >
                      {service.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{service.address}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            In case of emergency, please call the appropriate service immediately.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Emergency;
