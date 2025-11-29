import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CompanyCardProps {
  name: string;
  category: string;
  logo: string;
  description: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  onClick?: () => void;
}

const CompanyCard = ({
  name,
  category,
  logo,
  description,
  rating = 4.5,
  reviewCount = 0,
  tags = [],
  onClick,
}: CompanyCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group card-premium overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={logo}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          {reviewCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {reviewCount} reviews
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
