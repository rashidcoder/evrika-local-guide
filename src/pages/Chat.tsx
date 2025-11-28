import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Building2, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Message = Tables<"messages">;
type Business = Tables<"businesses">;

const Chat = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [business, setBusiness] = useState<Business | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchBusiness();
  }, [businessId]);

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      await getOrCreateConversation(user.id);
    } else {
      toast({
        title: "Authentication required",
        description: "Please login to chat with businesses",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const fetchBusiness = async () => {
    if (!businessId) return;
    const { data } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", businessId)
      .single();
    if (data) setBusiness(data);
  };

  const getOrCreateConversation = async (userId: string) => {
    if (!businessId) return;

    // Try to find existing conversation
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("user_id", userId)
      .eq("business_id", businessId)
      .single();

    if (existing) {
      setConversationId(existing.id);
      return;
    }

    // Create new conversation
    const { data: newConv, error } = await supabase
      .from("conversations")
      .insert({ user_id: userId, business_id: businessId })
      .select("id")
      .single();

    if (!error && newConv) {
      setConversationId(newConv.id);
    }
  };

  const fetchMessages = async () => {
    if (!conversationId) return;
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (data) setMessages(data);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId || !currentUserId) return;

    const { error } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: currentUserId,
      content: newMessage.trim(),
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } else {
      setNewMessage("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!currentUserId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Login Required</h1>
          <p className="text-muted-foreground mb-4">Please login to chat with businesses</p>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to={businessId ? `/business/${businessId}` : "/work"} className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            {business?.logo_url && (
              <img
                src={business.logo_url}
                alt={business.name_uz}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="font-semibold text-foreground">{business?.name_uz || "Chat"}</h1>
              <p className="text-xs text-muted-foreground">{business?.category}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender_id === currentUserId
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="border-t border-border bg-card p-4">
        <div className="container mx-auto flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-background"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
