import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DiscountFormProps {
  businessId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const DiscountForm = ({ businessId, onSuccess, onCancel }: DiscountFormProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    discount_type: "percentage",
    discount_value: "",
    description: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.discount_value || !formData.end_date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("discounts").insert({
      business_id: businessId,
      title: formData.title,
      discount_type: formData.discount_type,
      discount_value: parseFloat(formData.discount_value),
      description: formData.description || null,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
      is_active: true,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create discount",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Discount created successfully",
      });
      onSuccess();
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-secondary rounded-lg mb-6">
      <h4 className="font-semibold text-foreground">Create New Discount</h4>

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Summer Sale"
          className="bg-background"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Discount Type</Label>
          <Select
            value={formData.discount_type}
            onValueChange={(value) => setFormData({ ...formData, discount_type: value })}
          >
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
              <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Value *</Label>
          <Input
            id="value"
            type="number"
            min="0"
            value={formData.discount_value}
            onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
            placeholder={formData.discount_type === "percentage" ? "e.g., 20" : "e.g., 50"}
            className="bg-background"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Optional description..."
          className="bg-background"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start">Start Date</Label>
          <Input
            id="start"
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end">End Date *</Label>
          <Input
            id="end"
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            className="bg-background"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Creating..." : "Create Discount"}
        </Button>
      </div>
    </form>
  );
};

export default DiscountForm;
