
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import PerformanceAnalytics from "@/components/PerformanceAnalytics";
import { useAuth } from "@/contexts/AuthContext";
import { getBrandCampaigns, getCampaignPerformance } from "@/services/mockData";

const BrandAnalytics: React.FC = () => {
  const { user } = useAuth();
  const campaigns = getBrandCampaigns(user?.user_id || "");
  const metrics = campaigns.map(campaign => getCampaignPerformance(campaign.campaign_id));
  
  return (
    <MainLayout requiredRole="brand">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            View performance metrics and ROI for your campaigns
          </p>
        </div>
        
        <PerformanceAnalytics campaigns={campaigns} metrics={metrics} />
      </div>
    </MainLayout>
  );
};

export default BrandAnalytics;
