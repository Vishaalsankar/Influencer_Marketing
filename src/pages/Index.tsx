
import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();

  // If authenticated, redirect to the appropriate portal
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">PromoPULSE</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Connect brands with influencers for impactful marketing campaigns
        </p>
      </div>
      
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link to="/login">Sign In</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/signup">Create Account</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
