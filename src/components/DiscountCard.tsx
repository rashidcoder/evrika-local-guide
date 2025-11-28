import { Percent, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/integrations/supabase/types";

type Discount = Tables<"discounts">;

interface DiscountCardProps {
  discount: Discount;
}

const DiscountCard = ({ discount }: DiscountCardProps) => {
  const isPercentage = discount.discount_type === "percentage";
  const endDate = new Date(discount.end_date);
  const daysLeft = Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Percent className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{discount.title}</h4>
            <p className="text-2xl font-bold text-primary">
              {isPercentage ? `${discount.discount_value}%` : `$${discount.discount_value}`}
              <span className="text-sm font-normal text-muted-foreground ml-1">off</span>
            </p>
          </div>
        </div>
        {daysLeft > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {daysLeft} days left
          </Badge>
        )}
      </div>
      {discount.description && (
        <p className="text-sm text-muted-foreground">{discount.description}</p>
      )}
    </div>
  );
};

export default DiscountCard;
