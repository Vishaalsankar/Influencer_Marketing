
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import InfluencerRecommendation from "@/components/InfluencerRecommendation";

const BrandInfluencerSearch: React.FC = () => {
  return (
    <MainLayout requiredRole="brand">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Influencer Search</h1>
          <p className="text-muted-foreground">
            Find the perfect influencers for your campaigns
          </p>
        </div>
        
        <InfluencerRecommendation />
      </div>
    </MainLayout>
  );
};

export default BrandInfluencerSearch;
