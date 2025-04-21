
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  influencerId: string;
  influencerName: string;
  campaignId?: string;
  amount: number;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  influencerId,
  influencerName,
  campaignId,
  amount,
}) => {
  const [upiId, setUpiId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!upiId) {
      toast({
        title: "Error",
        description: "Please enter a UPI ID",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from('payments').insert({
        influencer_id: influencerId,
        brand_id: user?.id,
        campaign_id: campaignId,
        amount_inr: amount,
        upi_id: upiId,
        status: 'pending'
      });

      if (error) throw error;

      toast({
        title: "Payment initiated",
        description: "Payment has been initiated successfully"
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: "There was an error initiating the payment",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay {influencerName}</DialogTitle>
          <DialogDescription>
            Enter UPI ID to process payment of ₹{amount.toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handlePayment} disabled={loading}>
              {loading ? "Processing..." : "Confirm Payment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
