
import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, BarChart, Users } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-primary mb-6">PromoPULSE</h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Connect brands with influencers for impactful marketing campaigns
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 h-12 px-6">
              <Link to="/login">Sign In <ArrowRight size={18} /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6">
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Find Perfect Influencers</h3>
              <p className="text-muted-foreground">Discover influencers that match your brand's values and target audience</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Direct Communication</h3>
              <p className="text-muted-foreground">Chat directly with brands or influencers to discuss campaign details</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Performance Analytics</h3>
              <p className="text-muted-foreground">Track and analyze campaign performance with detailed insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join PromoPULSE today and transform your marketing strategy with influencer collaborations
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 h-12 px-8">
              <Link to="/signup">Sign Up Now <ArrowRight size={18} /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
