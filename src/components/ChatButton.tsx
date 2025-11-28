import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ChatButtonProps {
  businessId: string;
}

const ChatButton = ({ businessId }: ChatButtonProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleChat = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to chat with this business.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    try {
      // Check if conversation exists
      const { data: existingConv } = await supabase
        .from("conversations")
        .select("id")
        .eq("business_id", businessId)
        .eq("user_id", user.id)
        .maybeSingle();

      let conversationId = existingConv?.id;

      if (!conversationId) {
        // Create new conversation
        const { data: newConv, error } = await supabase
          .from("conversations")
          .insert({
            business_id: businessId,
            user_id: user.id,
          })
          .select("id")
          .single();

        if (error) throw error;
        conversationId = newConv.id;
      }

      navigate(`/chat/${conversationId}`);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to start conversation.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleChat} variant="outline" className="gap-2">
      <MessageCircle className="h-4 w-4" />
      Chat with Business
    </Button>
  );
};

export default ChatButton;
