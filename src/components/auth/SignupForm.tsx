
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SignupFormProps {
  onSignupSuccess: (phone: string) => void;
}

// Improved: Display more helpful error messages, improve field UX
export const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>("influencer");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !phone || !password || !confirmPassword || !role) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "The passwords you entered do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Sign up with email and password
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!signUpData.user) throw new Error("Signup failed. Please try again.");

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: signUpData.user?.id,
          name,
          role,
          phone_number: phone,
        });

      if (profileError) throw profileError;

      // Initiate phone verification
      const { error: otpError } = await supabase.auth.signInWithOtp({
        phone,
      });

      if (otpError) throw otpError;

      onSignupSuccess(phone);

      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
      });
    } catch (error: any) {
      let errorMsg = "There was an error creating your account.";
      if (error?.message) errorMsg = error.message;
      toast({
        title: "Signup failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Account Type</Label>
          <Select
            value={role}
            onValueChange={(value: UserRole) => setRole(value)}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brand">Brand</SelectItem>
              <SelectItem value="influencer">Influencer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            minLength={6}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
};
