
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PhoneVerificationProps {
  phone: string;
  onVerified: () => void;
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({ phone, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const verifyOTP = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms'
      });

      if (error) {
        console.error('OTP verification error:', error);
        throw error;
      }

      toast({
        title: "Phone verified successfully",
        description: "Your phone number has been verified."
      });
      
      onVerified();
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Verification failed",
        description: error?.message || "Please check your OTP and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Verify your phone number</h3>
        <p className="text-sm text-muted-foreground">
          Enter the verification code sent to {phone}
        </p>
      </div>
      
      <div className="grid gap-2">
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button onClick={verifyOTP} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </div>
  );
};
