import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  company: string;
  image: string;
  description: string;
}

const ProductCard = ({ name, company, image, description }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:bg-card-hover transition-colors cursor-pointer group">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{name}</h3>
        <p className="text-sm text-primary mb-2">{company}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
