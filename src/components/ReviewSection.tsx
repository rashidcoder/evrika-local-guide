import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Review = Tables<"reviews">;

interface ReviewSectionProps {
  businessId: string;
  onReviewAdded?: () => void;
}

const ReviewSection = ({ businessId, onReviewAdded }: ReviewSectionProps) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchReviews();
  }, [businessId]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      checkUserReview(user.id);
    }
  };

  const checkUserReview = async (userId: string) => {
    const { data } = await supabase
      .from("reviews")
      .select("id")
      .eq("business_id", businessId)
      .eq("user_id", userId)
      .single();

    setHasReviewed(!!data);
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });

    if (data) setReviews(data);
  };

  const submitReview = async () => {
    if (!currentUserId) {
      toast({
        title: "Login required",
        description: "Please login to leave a review",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      business_id: businessId,
      user_id: currentUserId,
      rating,
      comment: comment.trim() || null,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
      setRating(0);
      setComment("");
      setHasReviewed(true);
      fetchReviews();
      onReviewAdded?.();
    }
    setSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Pikirler / Reviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Submit Review Form */}
        {currentUserId && !hasReviewed && (
          <div className="p-4 bg-secondary rounded-lg space-y-4">
            <h4 className="font-semibold text-foreground">Leave a Review</h4>
            
            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 ? `${rating}/5` : "Select rating"}
              </span>
            </div>

            {/* Comment */}
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review (optional)..."
              className="bg-background"
            />

            <Button onClick={submitReview} disabled={submitting}>
              <Send className="h-4 w-4 mr-2" />
              {submitting ? "Submitting..." : "Send Review"}
            </Button>
          </div>
        )}

        {hasReviewed && (
          <p className="text-muted-foreground text-center py-4">
            You have already reviewed this business
          </p>
        )}

        {!currentUserId && (
          <p className="text-muted-foreground text-center py-4">
            Please login to leave a review
          </p>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-foreground text-sm">{review.comment}</p>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
