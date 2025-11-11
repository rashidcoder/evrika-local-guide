import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompanyCardProps {
  name: string;
  category: string;
  logo: string;
  description: string;
}

const CompanyCard = ({ name, category, logo, description }: CompanyCardProps) => {
  return (
    <Card className="overflow-hidden hover:bg-card-hover transition-colors cursor-pointer">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{name}</h3>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
