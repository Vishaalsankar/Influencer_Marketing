
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/types";

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>("influencer");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signup, isAuthenticated, userRole } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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
      await signup(name, email, password, role);
      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "There was an error creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to appropriate dashboard if already authenticated
  if (isAuthenticated) {
    if (userRole === "admin") {
      return <Navigate to="/admin" />;
    } else if (userRole === "brand") {
      return <Navigate to="/brand" />;
    } else if (userRole === "influencer") {
      return <Navigate to="/influencer" />;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-purple mb-2">PromoPULSE</h1>
          <p className="text-muted-foreground">Create Your Account</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
