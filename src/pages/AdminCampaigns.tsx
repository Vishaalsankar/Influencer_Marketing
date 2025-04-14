
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import CampaignsList from "@/components/CampaignsList";
import { mockCampaigns } from "@/services/mockData";

const AdminCampaigns: React.FC = () => {
  return (
    <MainLayout requiredRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Management</h1>
          <p className="text-muted-foreground">
            Review and approve marketing campaigns
          </p>
        </div>
        
        <CampaignsList 
          campaigns={mockCampaigns} 
          title="All Campaigns" 
          description="Review and approve campaigns from all brands" 
        />
      </div>
    </MainLayout>
  );
};

export default AdminCampaigns;
