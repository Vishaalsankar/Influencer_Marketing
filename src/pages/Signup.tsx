
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { useToast } from "@/hooks/use-toast";

const Signup: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();
  const { toast } = useToast();

  const handleSignupSuccess = () => {
    toast({
      title: "Signup successful",
      description: "Please check your email for confirmation instructions",
    });
    // Redirect to login page
    window.location.href = "/login";
  };

  // Redirect if already authenticated
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
    <AuthLayout
      title="Sign Up"
      description="Create your account"
      footerText="Already have an account?"
      footerLink={{ text: "Sign in", to: "/login" }}
    >
      <SignupForm onSignupSuccess={handleSignupSuccess} />
    </AuthLayout>
  );
};

export default Signup;
