import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  MessageCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: {
    id: number;
    name: string;
    category: string;
    logo: string;
    description: string;
    rating?: number;
    reviewCount?: number;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    hours?: string;
    tags?: string[];
  } | null;
}

const CompanyModal = ({ isOpen, onClose, company }: CompanyModalProps) => {
  if (!company) return null;

  const mockReviews = [
    { id: 1, author: "John D.", rating: 5, text: "Excellent service!", date: "2 days ago" },
    { id: 2, author: "Sarah M.", rating: 4, text: "Very professional team.", date: "1 week ago" },
    { id: 3, author: "Alex K.", rating: 5, text: "Highly recommended!", date: "2 weeks ago" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl bg-secondary overflow-hidden shrink-0">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-2xl font-bold mb-1">
                    {company.name}
                  </DialogTitle>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="secondary">{company.category}</Badge>
                    {company.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{company.rating || 4.5}</span>
                      <span className="text-muted-foreground">
                        ({company.reviewCount || 128} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <ScrollArea className="flex-1 px-6">
              <div className="space-y-6 pb-6">
                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {company.description} Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit. Sed do eiusmod tempor incididunt ut labore et 
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris.
                  </p>
                </div>

                <Separator />

                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                      <span className="text-sm">
                        {company.address || "123 Business St, City"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                      <span className="text-sm">
                        {company.phone || "+1 (555) 123-4567"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                      <span className="text-sm">
                        {company.email || "info@company.com"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
                      <span className="text-sm">
                        {company.hours || "Mon-Fri: 9AM - 6PM"}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Reviews Preview */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Recent Reviews</h4>
                    <Button variant="link" className="text-sm p-0 h-auto">
                      View all
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {mockReviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-3 rounded-xl bg-secondary/30 border border-border/50"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          {review.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Action Buttons */}
            <div className="p-4 border-t bg-card/50 flex gap-3">
              <Button className="flex-1 gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat with Business
              </Button>
              <Button variant="outline" className="gap-2">
                <Globe className="h-4 w-4" />
                Website
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="w-full lg:w-72 bg-secondary/30 border-t lg:border-t-0 lg:border-l p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-semibold">AI Insights</h4>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-card border">
                <p className="text-xs text-muted-foreground mb-1">Sentiment Score</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-green-500 rounded-full" />
                  </div>
                  <span className="text-sm font-semibold text-green-600">85%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-card border">
                <p className="text-xs text-muted-foreground mb-2">Key Highlights</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-xs">Quality Service</Badge>
                  <Badge variant="secondary" className="text-xs">Fast Response</Badge>
                  <Badge variant="secondary" className="text-xs">Fair Pricing</Badge>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-card border">
                <p className="text-xs text-muted-foreground mb-1">Best For</p>
                <p className="text-sm">Small businesses looking for reliable IT support</p>
              </div>

              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-xs text-primary font-medium mb-1">AI Recommendation</p>
                <p className="text-sm text-muted-foreground">
                  Based on your preferences, this business is a great match!
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyModal;
